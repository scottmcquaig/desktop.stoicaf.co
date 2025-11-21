'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Sidebar, MobileNav } from './sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, hasCompletedOnboarding } = useAppStore()

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Redirect users who haven't completed onboarding
    if (!hasCompletedOnboarding && pathname !== '/onboarding') {
      router.push('/onboarding')
      return
    }
  }, [isAuthenticated, hasCompletedOnboarding, pathname, router])

  // Don't render layout for unauthenticated users
  if (!isAuthenticated) {
    return null
  }

  // Don't render layout for onboarding
  if (!hasCompletedOnboarding) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
