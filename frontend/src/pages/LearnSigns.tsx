import { useState } from 'react';
import { Mic, Send, Type, FileAudio, Play, Pause, RotateCcw, Box, Layers, MonitorPlay } from 'lucide-react';

import { SignAvatar } from '../components/SignAvatar';

const LearnSigns = () => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSign, setCurrentSign] = useState("");

  const startAnimation = async () => {
    if (!inputText) return;
    setIsAnimating(true);
    setCurrentSign(inputText);
    
    try {
      const response = await fetch("http://localhost:8000/api/text-to-sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      console.log("Animation sequence:", data.animations);
      
      // Simulate the time the animation takes to play
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentSign("");
      }, 3000);
    } catch (e) {
      console.error(e);
      setIsAnimating(false);
      setCurrentSign("");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">Synthesis AI</span>
          <h2 className="text-4xl font-heading font-extrabold mb-2">Learn Sign Language</h2>
          <p className="text-gray-500 font-medium">Enter text or audio to see our intelligent avatar perform signs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-light border border-white/10 text-white font-bold hover:bg-surface transition-all">
             <Box className="w-4 h-4" />
             View Models
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
             <Layers className="w-4 h-4" />
             Asset Lab
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-8">
        {/* Avatar Viewport (Left) */}
        <div className="col-span-3 space-y-8">
          <div className="glass-card overflow-hidden bg-black/40 border-secondary/20 aspect-square flex flex-col items-center justify-center relative">
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
               <div className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                 <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Avatar Active</span>
               </div>
               <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-gray-300">
                 GLB 3D v1.2
               </div>
            </div>
            
            <div className="absolute top-6 right-6 z-10 flex gap-2">
               <button className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all">
                  <RotateCcw className="w-4 h-4" />
               </button>
               <button className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all">
                  <MonitorPlay className="w-4 h-4" />
               </button>
            </div>

            {/* Advanced 3D Avatar */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-transparent to-secondary/10">
            {/* 3D Avatar Rendering Here */}
            <SignAvatar isAnimating={isAnimating} textToSign={currentSign} />
            </div>
            
            {/* Animation Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 glass-card bg-black/60 border-white/10">
               <button 
                 onClick={startAnimation}
                 disabled={isAnimating}
                 className="p-3 rounded-full bg-secondary text-white shadow-lg shadow-secondary/25 hover:scale-110 active:scale-95 disabled:opacity-50 transition-all"
               >
                 {isAnimating ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
               </button>
               <div className="w-px h-6 bg-white/10 mx-2" />
               <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Playback Speed</span>
                  <span className="text-xs text-white font-mono font-bold">1.0x (Real-time)</span>
               </div>
            </div>
          </div>
        </div>

        {/* Input Controls (Right) */}
        <div className="col-span-2 space-y-8">
          <div className="glass-card p-8 border-l-4 border-l-secondary">
            <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2">
              <Type className="w-5 h-5 text-secondary" />
              Text Input
            </h3>
            <div className="relative mb-6">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type text to convert to signs..."
                className="w-full bg-surface/50 border border-white/10 rounded-2xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 transition-all text-sm font-medium resize-none"
              />
              <button 
                onClick={startAnimation}
                disabled={!inputText || isAnimating}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-secondary text-white shadow-lg shadow-secondary/25 hover:scale-105 active:scale-95 disabled:opacity-30 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="h-px bg-white/10 mb-8" />

            <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2">
              <Mic className="w-5 h-5 text-secondary" />
              Audio Input
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={toggleRecording}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                  isRecording 
                    ? "bg-red-500/10 border-red-500 text-red-500" 
                    : "bg-surface-light border-white/10 text-white hover:bg-surface"
                }`}
              >
                <Mic className={`w-6 h-6 ${isRecording ? "animate-pulse" : ""}`} />
                <span className="text-xs font-bold uppercase">{isRecording ? "Recording..." : "Live Mic"}</span>
              </button>
              <button className="p-4 rounded-2xl bg-surface-light border border-white/10 text-white hover:bg-surface transition-all flex flex-col items-center gap-3">
                <FileAudio className="w-6 h-6" />
                <span className="text-xs font-bold uppercase">Upload File</span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 bg-secondary/5 border-secondary/20">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Synthesis Queue</h3>
             <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5">
                   <div className="w-2 h-2 rounded-full bg-green-500" />
                   <span className="text-xs font-medium text-gray-300">"Hello, how are you?"</span>
                   <span className="text-[10px] text-gray-600 font-mono ml-auto">DONE</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 opacity-50">
                   <div className="w-2 h-2 rounded-full bg-gray-600" />
                   <span className="text-xs font-medium text-gray-300">"Welcome to the lab."</span>
                   <span className="text-[10px] text-gray-600 font-mono ml-auto">QUEUED</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSigns;
