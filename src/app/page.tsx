'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, hasCompletedOnboarding } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    } else if (!hasCompletedOnboarding) {
      router.replace('/onboarding')
    } else {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, hasCompletedOnboarding, router])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-stoic-blue mb-2">Stoic.af</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
