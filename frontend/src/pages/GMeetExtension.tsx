import React from 'react';
import { Video, Chrome, Download, ShieldCheck, Zap, Globe, MessageSquare, HandMetal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GMeetExtension = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-secondary mx-auto mb-8 flex items-center justify-center shadow-xl shadow-accent/20">
              <Video className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-heading font-black mb-6 leading-tight">
              SignHack for <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">Google Meet</span>.
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Bring real-time sign language interpretation to every online meeting. Our lightweight Chrome extension converts meeting audio into fluid avatar animations in real-time.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-accent to-secondary text-white font-bold shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all active:scale-95 flex items-center gap-3 group">
                <Chrome className="w-5 h-5" />
                Add to Chrome
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 rounded-2xl bg-surface-light border border-white/10 text-white font-bold hover:bg-surface transition-all active:scale-95 flex items-center gap-3">
                <Download className="w-5 h-5" />
                Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-3 gap-8">
        <div className="glass-card p-10 border-t-4 border-t-accent hover:glow-teal transition-all">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-heading font-bold mb-4">Ultra-Low Latency</h3>
          <p className="text-gray-400 font-medium">
            Proprietary streaming technology ensures animations are perfectly synced with the meeting audio in under 100ms.
          </p>
        </div>
        <div className="glass-card p-10 border-t-4 border-t-secondary hover:glow-cyan transition-all">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-heading font-bold mb-4">Cross-Platform</h3>
          <p className="text-gray-400 font-medium">
            Works seamlessly across Windows, macOS, and Linux within the Chrome browser. No extra software required.
          </p>
        </div>
        <div className="glass-card p-10 border-t-4 border-t-primary hover:glow-purple transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-heading font-bold mb-4">Privacy Focused</h3>
          <p className="text-gray-400 font-medium">
            All audio processing is done locally or via encrypted streams. We never store or record your private conversations.
          </p>
        </div>
      </section>

      {/* Mockup Preview */}
      <section className="glass-card p-4 bg-black/40 overflow-hidden">
        <div className="rounded-xl border border-white/10 overflow-hidden relative aspect-video bg-surface">
           {/* Mock Google Meet Interface */}
           <div className="absolute top-0 inset-x-0 h-12 bg-black/60 border-b border-white/5 flex items-center px-6 justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">SignHack Live</span>
              </div>
              <div className="text-[10px] text-gray-500 font-mono">Meeting ID: lab-ai-signhack</div>
           </div>
           
           <div className="h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full h-full p-16 pt-24">
                 <div className="rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-white/10" />
                 </div>
                 <div className="rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-white/10" />
                 </div>
              </div>
           </div>

           {/* Floating Extension Window */}
           <motion.div 
             animate={{ scale: [1, 1.02, 1] }}
             transition={{ repeat: Infinity, duration: 4 }}
             className="absolute bottom-12 right-12 w-64 h-80 glass-card bg-black/80 border-accent/40 shadow-2xl shadow-accent/20 overflow-hidden flex flex-col"
           >
              <div className="p-3 border-b border-white/10 flex justify-between items-center bg-accent/10">
                 <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Interpreter</span>
                 <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                 </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-b from-transparent to-accent/5">
                 <HandMetal className="w-20 h-20 text-accent/20 mb-4 animate-float" />
                 <div className="text-[10px] font-mono text-accent/60 font-bold uppercase tracking-widest">Processing Audio...</div>
              </div>
              <div className="p-4 bg-black/40 border-t border-white/10">
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["0%", "80%", "30%", "100%", "50%"] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                      className="h-full bg-accent"
                    />
                 </div>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GMeetExtension;
