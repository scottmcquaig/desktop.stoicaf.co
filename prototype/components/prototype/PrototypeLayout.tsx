
import React from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  LineChart, 
  MessageSquare, 
  Settings, 
  Edit3, 
  Search, 
  Bell, 
  CircleUser, 
  Edit 
} from 'lucide-react';
import { StoicLogo } from '../StoicLogo';

const PrototypeLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-white font-bold">
             <StoicLogo className="w-full h-full" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">STOIC.AF</span>
        </div>

        <div className="px-4 mb-6">
           <Link to="/app/journal/new" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 transition-all group">
             <Edit3 size={20} className="group-hover:scale-110 transition-transform" /> <span>Quick Entry</span>
           </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <NavItem to="/app" icon={<LayoutDashboard size={22} />} label="Home" end />
          <NavItem to="/app/journal" icon={<BookOpen size={22} />} label="Journal" />
          <NavItem to="/app/insights" icon={<LineChart size={22} />} label="Insights" />
          <NavItem to="/app/chat" icon={<MessageSquare size={22} />} label="Coach" />
          
          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System</p>
            <NavItem to="/app/settings" icon={<Settings size={22} />} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-stoic-blue group-hover:text-white transition-colors">
                    <CircleUser size={24} />
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate text-slate-700 group-hover:text-slate-900">Marcus Aurelius</p>
                    <p className="text-xs text-slate-500 truncate">Pro Member</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                <StoicLogo className="w-full h-full" />
            </div>
            <span className="font-bold text-lg text-slate-900">Stoic.AF</span>
         </div>
         <div className="flex gap-4 items-center">
             <Search className="text-slate-600" size={24} />
             <Bell className="text-slate-600" size={24} />
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex justify-around items-center z-20 px-2 pb-safe">
          <MobileNavItem to="/app" icon={<LayoutDashboard size={24} />} label="Home" end />
          <MobileNavItem to="/app/journal" icon={<BookOpen size={24} />} label="Journal" />
          <div className="relative -top-5">
              <Link to="/app/journal/new" className="w-14 h-14 bg-stoic-blue rounded-full flex items-center justify-center text-white shadow-lg border-4 border-slate-50">
                  <Edit size={24} />
              </Link>
          </div>
          <MobileNavItem to="/app/insights" icon={<LineChart size={24} />} label="Insights" />
          <MobileNavItem to="/app/settings" icon={<Settings size={24} />} label="Settings" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, end }: any) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
      ${isActive 
        ? 'bg-stoic-blue/10 text-stoic-blue font-bold' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
    `}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const MobileNavItem = ({ to, icon, label, end }: any) => (
    <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      flex flex-col items-center justify-center w-16 py-1
      ${isActive ? 'text-stoic-blue' : 'text-slate-400'}
    `}
  >
    {({ isActive }) => (
      <>
        {/* Clone element to force specific props or styles if needed, or just render */}
        {React.cloneElement(icon, { 
            strokeWidth: isActive ? 2.5 : 2,
            className: "transition-all"
        })}
        <span className="text-[10px] font-bold mt-1">{label}</span>
      </>
    )}
  </NavLink>
)

export default PrototypeLayout;
