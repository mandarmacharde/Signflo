import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HandMetal, 
  GraduationCap, 
  Video, 
  ArrowUpRight, 
  Github, 
  TrendingUp, 
  Cpu, 
  Layers, 
  Zap,
  BarChart,
  LineChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Card = ({ 
  title, 
  description, 
  icon: Icon, 
  tags, 
  onClick, 
  variant = "purple",
  metrics
}: { 
  title: string; 
  description: string; 
  icon: any; 
  tags: string[]; 
  onClick: () => void;
  variant?: "purple" | "cyan" | "teal";
  metrics?: { accuracy: string; f1: string }
}) => {
  const glowClass = variant === "purple" ? "hover:glow-purple" : variant === "cyan" ? "hover:glow-cyan" : "hover:glow-teal";
  const iconColor = variant === "purple" ? "text-primary" : variant === "cyan" ? "text-secondary" : "text-accent";

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className={`glass-card p-6 cursor-pointer group transition-all duration-300 ${glowClass} relative overflow-hidden`}
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 blur-3xl opacity-10 rounded-full transition-opacity group-hover:opacity-30 ${variant === "purple" ? "bg-primary" : variant === "cyan" ? "bg-secondary" : "bg-accent"}`} />
      
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl ${variant === "purple" ? "bg-primary/10" : variant === "cyan" ? "bg-secondary/10" : "bg-accent/10"} border border-white/5 shadow-inner`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
            <Github className="w-4 h-4" />
          </button>
          <div className="p-2 rounded-lg bg-white/5 text-gray-400">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mb-6 line-clamp-2 font-medium">
        {description}
      </p>

      {metrics && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Accuracy</div>
            <div className="text-lg font-mono font-bold text-white">{metrics.accuracy}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">F1 Score</div>
            <div className="text-lg font-mono font-bold text-white">{metrics.f1}</div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-tight group-hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
              <Zap className="w-3 h-3 fill-primary" />
              Revolutionizing Accessibility
            </span>
            <h1 className="text-5xl font-heading font-extrabold mb-6 leading-tight">
              Bridging Silence with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Intelligent Sign</span> Interpretation.
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10">
              Welcome to the SignHack Research Lab. We're developing next-generation AI models to bridge the gap between sign language and spoken words. Our vision is to create a seamless world where everyone can communicate, regardless of the language they speak or sign.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2 group">
                Explore Our Vision
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="px-8 py-3 rounded-xl bg-surface-light border border-white/10 text-white font-bold hover:bg-surface transition-all active:scale-95">
                Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Widgets Grid */}
      <section className="grid grid-cols-4 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-green-500">+12.5%</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Inference Speed</div>
          <div className="text-2xl font-mono font-extrabold text-white">42ms</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-secondary">
          <div className="flex items-center justify-between mb-4">
            <LineChart className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold text-green-500">+2.1%</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Model Accuracy</div>
          <div className="text-2xl font-mono font-extrabold text-white">98.4%</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-accent">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold text-gray-500">Stable</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Datasets Size</div>
          <div className="text-2xl font-mono font-extrabold text-white">1.2 TB</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-gray-500">
          <div className="flex items-center justify-between mb-4">
            <Cpu className="w-5 h-5 text-gray-400" />
            <span className="text-xs font-bold text-gray-500">Live</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Model Status</div>
          <div className="text-2xl font-mono font-extrabold text-white">READY</div>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Research Models</h2>
            <p className="text-gray-500 font-medium">Select a model to begin inference or learning.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-light text-white border border-white/5">
              <BarChart className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-surface-light text-white border border-white/5">
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <Card 
            title="Get Text from Signs" 
            description="Convert real-time hand signs from video or camera into text instantly using our custom CNN-Transformer model."
            icon={HandMetal}
            tags={["CNN", "Vision", "Real-time"]}
            variant="purple"
            metrics={{ accuracy: "98.2%", f1: "0.96" }}
            onClick={() => navigate('/sign-to-text')}
          />
          <Card 
            title="Learn Sign Language" 
            description="Enter text or audio to see our intelligent avatar perform the corresponding signs in a fluid, natural way."
            icon={GraduationCap}
            tags={["NLP", "3D Avatar", "Animation"]}
            variant="cyan"
            metrics={{ accuracy: "96.5%", f1: "0.94" }}
            onClick={() => navigate('/learn')}
          />
          <Card 
            title="GMeet Extension" 
            description="Our browser extension brings accessibility to every meeting by providing live sign translations in the corner of your screen."
            icon={Video}
            tags={["Chrome Ext", "Audio to Sign", "GLB"]}
            variant="teal"
            metrics={{ accuracy: "94.8%", f1: "0.91" }}
            onClick={() => navigate('/gmeet')}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
