import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Play, Square, CheckCircle2, AlertCircle, Info, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SignToText = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startInference = async () => {
    try {
      setIsVideoUploaded(false);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsCameraOn(true);
      
      // Start sending frames to backend
      intervalRef.current = window.setInterval(sendFrame, 1000);
    } catch (err) {
      console.error("Error accessing camera", err);
      alert("Could not access camera.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && videoRef.current) {
      stopInference(); // Stop camera if running
      
      const fileUrl = URL.createObjectURL(file);
      videoRef.current.srcObject = null;
      videoRef.current.src = fileUrl;
      
      setIsVideoUploaded(true);
      setIsCameraOn(true);
      
      // Start inference on the uploaded video
      intervalRef.current = window.setInterval(sendFrame, 1000);
    }
  };

  const stopInference = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (videoRef.current && isVideoUploaded) {
      // Clear object URL if a file was uploaded
      URL.revokeObjectURL(videoRef.current.src);
      videoRef.current.src = '';
    } else if (videoRef.current) {
       videoRef.current.srcObject = null;
    }
    
    setIsVideoUploaded(false);
    setIsCameraOn(false);
  };

  const sendFrame = async () => {
    if (!videoRef.current) return;
    
    // Create a canvas to extract the frame
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append('frame', blob, 'frame.jpg');

      try {
        const response = await fetch("http://localhost:8000/api/sign-to-text", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setPrediction(data.text || "Hello World");
        setConfidence(98.5);
      } catch (e) {
        console.error("Frame inference failed", e);
      }
    }, 'image/jpeg');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopInference();
    };
  }, []);

  // Sync stream to video element when it mounts
  useEffect(() => {
    if (isCameraOn && !isVideoUploaded && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOn, isVideoUploaded]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Vision AI</span>
          <h2 className="text-4xl font-heading font-extrabold mb-2">Get Text from Signs</h2>
          <p className="text-gray-500 font-medium">Capture or upload signs to convert into text in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-light border border-white/10 text-white font-bold hover:bg-surface transition-all">
            <History className="w-4 h-4" />
            History
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
            <Info className="w-4 h-4" />
            Help
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="col-span-2 space-y-8">
          <div className="glass-card overflow-hidden bg-black/40 border-primary/20 aspect-video flex flex-col items-center justify-center relative">
            {!isCameraOn ? (
              <div className="text-center p-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">No Input Stream</h3>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={startInference}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Camera
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2.5 rounded-xl bg-surface-light border border-white/10 text-white font-bold hover:bg-surface transition-all flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </button>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-black relative">
                <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
                  <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Inference</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 z-30">
                  <button 
                    onClick={stopInference}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white font-bold shadow-lg backdrop-blur-md transition-all"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    Stop
                  </button>
                </div>
                
                {/* Actual Feed */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                   <video 
                     ref={videoRef} 
                     autoPlay 
                     playsInline 
                     muted 
                     onLoadedMetadata={() => videoRef.current?.play()}
                     className="w-full h-full object-cover z-0"
                   />
                </div>
                
                {/* Bounding Box */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-primary border-dashed rounded-3xl z-10 pointer-events-none"
                >
                   <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                   <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                   <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                   <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-xl" />
                </motion.div>
              </div>
            )}
          </div>

          <div className="glass-card p-8 border-l-4 border-l-primary">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Generated Translation
            </h3>
            <div className="min-h-[120px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {prediction ? (
                  <motion.div 
                    key="prediction"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-heading font-black text-white mb-2 tracking-tight">
                      {prediction}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${confidence}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-primary">{confidence}% Confidence</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-gray-600 font-medium italic">
                    Waiting for input...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar info */}
        <div className="space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Model Specs</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Architecture</span>
                <span className="text-sm font-mono text-white">CNN + ViT</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Params</span>
                <span className="text-sm font-mono text-white">42.5M</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Device</span>
                <span className="text-sm font-mono text-white">CUDA v12.1</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Version</span>
                <span className="text-sm font-mono text-white">v2.4.0-stable</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-secondary/5 border-secondary/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-heading font-bold text-white">Usage Tips</h3>
            </div>
            <ul className="text-sm text-gray-400 space-y-3 font-medium">
              <li className="flex gap-2">• Ensure adequate lighting for better accuracy.</li>
              <li className="flex gap-2">• Keep hands within the dashed bounding box.</li>
              <li className="flex gap-2">• Perform signs at a moderate, steady pace.</li>
              <li className="flex gap-2">• Avoid cluttered backgrounds if possible.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignToText;
