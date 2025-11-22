'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Settings,
  Edit,
  CircleUser,
  ChevronLeft,
  LogOut,
  Home,
  BarChart3,
} from 'lucide-react';
import { StoicLogo } from './StoicLogo';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from './ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const NavItem = ({
  href,
  icon,
  label,
  isCollapsed,
  end,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  end?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = end ? pathname === href : pathname.startsWith(href);

  const linkContent = (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium',
        isActive ? 'text-primary font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        isCollapsed && 'justify-center'
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'flex-shrink-0' })}
      <span className={cn('transition-opacity whitespace-nowrap', isCollapsed ? 'sr-only opacity-0' : 'opacity-100')}>
        {label}
      </span>
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
};

export function AppSidebar({
  isCollapsed,
  setCollapsed,
}: {
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}) {
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const displayName = userProfile?.displayName || user?.displayName || 'User';
  const isPro = userProfile?.onboardingComplete; // For now, treat onboarding complete as "Pro"

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className={cn('p-4 flex items-center justify-between')}>
        <button
          onClick={() => {
            if (isCollapsed) setCollapsed(false);
          }}
          className={cn('flex items-center gap-3 w-full', isCollapsed ? 'justify-center' : 'justify-start')}
        >
          <div className="w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
            <StoicLogo className="w-full h-full" />
          </div>
          <span
            className={cn(
              'font-extrabold text-xl tracking-tight text-slate-900 transition-opacity whitespace-nowrap',
              isCollapsed ? 'sr-only opacity-0' : 'opacity-100'
            )}
          >
            STOIC AF
          </span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!isCollapsed)}
          className={cn('transition-opacity', isCollapsed ? 'sr-only opacity-0 w-0' : 'opacity-100 w-auto')}
        >
          <ChevronLeft size={20} />
          <span className="sr-only">Collapse sidebar</span>
        </Button>
      </div>

      <div className="px-4 mb-4">
        <Separator />
      </div>


      <div className="px-4 mb-4">
        <Link
          href="/journal/new"
          className={cn(
            'w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 transition-all group'
          )}
        >
          <Edit size={20} className="group-hover:scale-110 transition-transform flex-shrink-0" />
          <span
            className={cn(
              'transition-opacity whitespace-nowrap',
              isCollapsed ? 'sr-only opacity-0' : 'opacity-100'
            )}
          >
            Quick Entry
          </span>
        </Link>
      </div>
      
      <div className="px-4 mb-4">
        <Separator />
      </div>


      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <NavItem href="/dashboard" icon={<Home size={20} className="flex-shrink-0"/>} label="Home" isCollapsed={isCollapsed} end />
        <NavItem href="/journal" icon={<BookOpen size={20} className="flex-shrink-0"/>} label="Journal" isCollapsed={isCollapsed} />
        <NavItem href="/insights" icon={<BarChart3 size={20} className="flex-shrink-0"/>} label="Insights" isCollapsed={isCollapsed} />
      </nav>

      <div className="px-4 mb-4">
        <Separator />
      </div>
      <div className="p-4 pt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group',
                isCollapsed && 'justify-center'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0'
                )}
              >
                <CircleUser size={24} />
              </div>
              <div className={cn('overflow-hidden transition-opacity', isCollapsed ? 'sr-only opacity-0' : 'opacity-100')}>
                <p className="text-sm font-bold truncate text-slate-700 group-hover:text-slate-900">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500 truncate">{isPro ? 'Pro Member' : 'Free'}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
