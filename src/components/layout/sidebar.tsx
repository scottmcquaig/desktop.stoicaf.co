'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  Home,
  BookOpen,
  BarChart3,
  MessageSquare,
  Settings,
  Plus,
  LogOut,
  Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '/chat', label: 'ChadGPT', icon: MessageSquare, badge: 'AI' },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAppStore()

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-gray-900 border-r h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="block">
          <h1 className="text-2xl font-bold text-stoic-blue">Stoic.af</h1>
        </Link>

        {/* User info */}
        {user && (
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stoic-blue/10 flex items-center justify-center">
              <span className="text-stoic-blue font-semibold">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.displayName}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span>{user.stats.currentStreak} day streak</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-stoic-blue/10 text-stoic-blue border-l-3 border-stoic-blue'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-xs bg-stoic-blue/10 text-stoic-blue px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t space-y-3">
        <Link href="/journal/new">
          <Button className="w-full rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </Link>

        <button
          onClick={() => {
            logout()
            window.location.href = '/login'
          }}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

// Mobile bottom navigation
export function MobileNav() {
  const pathname = usePathname()

  const mobileNavItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/journal', label: 'Journal', icon: BookOpen },
    { href: '/journal/new', label: 'Write', icon: Plus, isCenter: true },
    { href: '/insights', label: 'Insights', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-stoic-blue text-white shadow-lg"
              >
                <Icon className="h-6 w-6" />
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full',
                isActive ? 'text-stoic-blue' : 'text-gray-500'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
