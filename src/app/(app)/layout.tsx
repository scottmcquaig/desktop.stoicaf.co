'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  BookOpen,
  Edit,
  Search,
  Bell,
  CircleUser,
  Home,
  BarChart3,
} from 'lucide-react';
import { StoicLogo } from '@/components/StoicLogo';
import { AppSidebar } from '@/components/app-sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { QuickCapture } from '@/components/QuickCapture';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const PrototypeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);
  const [quickCaptureOpen, setQuickCaptureOpen] = useState(false);
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  // Protected route check
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    } else if (!loading && user && userProfile && !userProfile.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [user, userProfile, loading, router]);

  // Keyboard shortcut for QuickCapture
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickCaptureOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stoic-blue"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans md:flex">
        {/* Desktop Sidebar */}
        <AppSidebar isCollapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />

        <div className="flex flex-col flex-1">
          {/* Header for mobile only */}
          <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <StoicLogo className="w-8 h-8" />
              </div>
              <span className="font-bold text-lg text-slate-900">STOIC AF</span>
            </div>
            <div className="flex gap-1 items-center">
              <button
                onClick={() => setQuickCaptureOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Search className="text-slate-600" size={22} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="text-slate-600" size={22} />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto md:h-screen pb-20 md:pb-0">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </div>

        {/* Mobile Bottom Nav - hidden on journal entry edit page which has its own toolbar */}
        <MobileBottomNav />

        {/* QuickCapture Modal */}
        <QuickCapture open={quickCaptureOpen} onOpenChange={setQuickCaptureOpen} />
      </div>
    </TooltipProvider>
  );
};

const MobileBottomNav = () => {
  const pathname = usePathname();

  // Hide on journal entry edit pages which have their own toolbar
  const isJournalEntryPage = pathname === '/journal/new' || pathname.match(/^\/journal\/[^/]+$/);

  if (isJournalEntryPage) {
    return null;
  }

  return (
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
