
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HandMetal, 
  GraduationCap, 
  Video, 
  Settings, 
  Box, 
  Database,
  BarChart3,
  Search
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active 
}: { 
  icon: any; 
  label: string; 
  to: string; 
  active?: boolean 
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-primary/10 text-primary shadow-[0_0_10px_rgba(147,51,234,0.1)]" 
        : "text-gray-400 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon className={cn(
      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
      active ? "text-primary" : "text-gray-500 group-hover:text-white"
    )} />
    <span className="font-medium">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
  </Link>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background text-gray-300 font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-72 glass-panel flex flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <HandMetal className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            SignHack AI
          </h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Main</div>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <SidebarItem 
            icon={HandMetal} 
            label="Sign to Text" 
            to="/sign-to-text" 
            active={location.pathname === '/sign-to-text'} 
          />
          <SidebarItem 
            icon={GraduationCap} 
            label="Learn Signs" 
            to="/learn" 
            active={location.pathname === '/learn'} 
          />
          <SidebarItem 
            icon={Video} 
            label="GMeet Extension" 
            to="/gmeet" 
            active={location.pathname === '/gmeet'} 
          />

          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mt-8 mb-2">Resources</div>
          <SidebarItem 
            icon={Box} 
            label="Models" 
            to="#" 
          />
          <SidebarItem 
            icon={Database} 
            label="Datasets" 
            to="#" 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            to="#" 
          />
          
          <div className="mt-auto pt-10">
            <SidebarItem 
              icon={Settings} 
              label="Settings" 
              to="/profile" 
              active={location.pathname === '/profile'}
            />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-white/5">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search models, documentation..." 
              className="w-full bg-surface/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>
          
          <Link to="/profile" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">Researcher User</span>
              <span className="text-[10px] text-gray-500">SignHack Lab</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-light border border-white/10 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </Link>
        </header>

        {/* Canvas Area */}
        <div className="p-10 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
