'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  LineChart,
  Settings,
  Edit,
  Search,
  Bell,
  CircleUser,
  Home,
  BarChart3,
} from 'lucide-react';
import { StoicLogo } from '@/components/StoicLogo';
import { AppSidebar } from '@/components/app-sidebar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

const PrototypeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans md:flex">
        {/* Desktop Sidebar */}
        <AppSidebar isCollapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />

        <div className="flex flex-col flex-1">
          {/* Header for mobile only */}
          <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                <StoicLogo className="w-full h-full" />
              </div>
              <span className="font-bold text-lg text-slate-900">STOIC AF</span>
            </div>
            <div className="flex gap-2 items-center">
              <Search className="text-slate-600" size={24} />
              <Bell className="text-slate-600" size={24} />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto md:h-screen pb-20 md:pb-0">{children}</main>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex justify-around items-center z-20 px-2 pb-safe">
          <MobileNavItem href="/dashboard" icon={<Home size={24} />} label="Home" />
          <MobileNavItem href="/journal" icon={<BookOpen size={24} />} label="Journal" />
          <div className="relative -top-5">
            <Link
              href="/journal/new"
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg border-4 border-slate-50"
            >
              <Edit size={24} />
            </Link>
          </div>
          <MobileNavItem href="/insights" icon={<BarChart3 size={24} />} label="Insights" />
          <MobileNavItem href="/settings" icon={<CircleUser size={24} />} label="Profile" />
        </nav>
      </div>
    </TooltipProvider>
  );
};

const MobileNavItem = ({ href, icon, label }: { href: string; icon: React.ReactElement; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`
            flex flex-col items-center justify-center w-16 py-1
            ${isActive ? 'text-primary' : 'text-slate-400'}
        `}
    >
      {React.cloneElement(icon, {
        strokeWidth: isActive ? 2.5 : 2,
        className: 'transition-all',
      })}
      <span className="text-[10px] font-bold mt-1">{label}</span>
    </Link>
  );
};

export default PrototypeLayout;
