import { User, Mail, Shield, Key, Bell, CreditCard, ArrowRight, Github } from 'lucide-react';

const Profile = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Developer Settings</span>
          <h2 className="text-4xl font-heading font-extrabold mb-2">Profile & Security</h2>
          <p className="text-gray-500 font-medium">Manage your account settings, API keys, and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
             <div className="relative mb-4 group cursor-pointer">
               <div className="w-24 h-24 rounded-full bg-surface-light border-2 border-primary/50 overflow-hidden relative">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[10px] font-bold text-white uppercase">Change</span>
                  </div>
               </div>
               <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-background" />
             </div>
             <h3 className="text-lg font-heading font-bold text-white mb-1">Researcher User</h3>
             <p className="text-sm text-gray-400 font-medium mb-4">SignHack Lab</p>
             <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase rounded-full border border-primary/20">Pro Tier</span>
                <span className="px-3 py-1 bg-surface-light text-gray-400 text-[10px] font-bold uppercase rounded-full border border-white/10">Active</span>
             </div>
          </div>

          <div className="glass-card p-4 space-y-2">
            {[
              { icon: User, label: "Personal Info", active: true },
              { icon: Shield, label: "Security & Keys" },
              { icon: Bell, label: "Notifications" },
              { icon: CreditCard, label: "Billing" },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                <item.icon className={`w-4 h-4 ${item.active ? "text-primary" : ""}`} />
                <span className="font-medium text-sm">{item.label}</span>
                {item.active && <ArrowRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-2 space-y-6">
          <div className="glass-card p-8">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Primary Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] text-gray-500 font-bold uppercase px-1">Full Name</label>
                 <input type="text" defaultValue="Researcher User" className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-white" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-gray-500 font-bold uppercase px-1">Role/Title</label>
                 <input type="text" defaultValue="ML Engineer" className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-white" />
               </div>
               <div className="space-y-2 col-span-2">
                 <label className="text-[10px] text-gray-500 font-bold uppercase px-1">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                   <input type="email" readOnly defaultValue="researcher@signhack.ai" className="w-full bg-surface/30 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-400 cursor-not-allowed" />
                 </div>
               </div>
               <div className="space-y-2 col-span-2">
                 <label className="text-[10px] text-gray-500 font-bold uppercase px-1">Connected Accounts</label>
                 <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-surface-light border border-white/10 hover:bg-surface transition-colors">
                    <div className="flex items-center gap-3">
                       <Github className="w-5 h-5" />
                       <span className="text-sm font-medium text-white">GitHub connected</span>
                    </div>
                    <span className="text-xs text-secondary font-bold hover:underline">Disconnect</span>
                 </button>
               </div>
            </div>
          </div>

          <div className="glass-card p-8 border-l-4 border-l-secondary relative overflow-hidden">
             {/* Gradient splash */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
             
             <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
               <Key className="w-5 h-5 text-secondary" />
               API Access
             </h3>
             <p className="text-sm text-gray-400 font-medium mb-6">Your secret API keys are used to authenticate requests to our real-time inference endpoints.</p>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                   <div>
                     <div className="text-sm font-bold text-white mb-1">Production Key</div>
                     <div className="text-[10px] font-mono text-gray-500">sk_live_***********89x2</div>
                   </div>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-md border border-green-500/20 mr-4">Last used 2m ago</span>
                     <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Reveal</button>
                     <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Revoke</button>
                   </div>
                </div>
                <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/40 transition-all flex items-center justify-center gap-2">
                   + Generate New Key
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
