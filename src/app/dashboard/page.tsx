'use client'

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Flame,
  TrendingUp,
  PenLine,
  Mic,
  ChevronRight,
  Wallet,
  Brain,
  Heart,
  Target
} from 'lucide-react'
import { getTodayQuote, formatDate, getMoodColor, getPillarColor } from '@/lib/mock-data'
import type { Pillar } from '@/lib/mock-data'

const pillarIcons: Record<Pillar, React.ComponentType<{ className?: string }>> = {
  money: Wallet,
  ego: Brain,
  relationships: Heart,
  discipline: Target,
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function DashboardPage() {
  const { user, entries } = useAppStore()
  const quote = getTodayQuote()
  const recentEntries = entries.slice(0, 3)
  const todayPillar: Pillar = user?.preferences.defaultPillar || 'discipline'
  const PillarIcon = pillarIcons[todayPillar]

  // Mock mood data for sparkline
  const moodTrend = [3, 4, 4, 3, 5, 4, 4] // 1-5 scale

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <header className="mb-6">
          <p className="text-muted-foreground">{getGreeting()}, {user?.displayName || 'Stoic'}</p>
          <h1 className="text-2xl lg:text-3xl font-bold">{formatCurrentDate()}</h1>
        </header>

        {/* Daily Quote */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-stoic-blue bg-stoic-blue/10 px-2.5 py-1 rounded-md mb-3">
              Daily Wisdom
            </span>
            <blockquote className="quote text-lg lg:text-xl">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <p className="quote-author mt-3">— {quote.author}</p>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Streak Card */}
          <Card className="bg-gradient-to-br from-stoic-blue to-stoic-blue-dark text-white overflow-hidden">
            <CardContent className="pt-6">
              <Flame className="h-6 w-6 text-yellow-300 mb-2" />
              <p className="text-4xl font-bold">{user?.stats.currentStreak || 0}</p>
              <p className="text-white/80 text-sm">Day Streak</p>
            </CardContent>
          </Card>

          {/* Mood Trend Card */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                This Week
              </p>
              {/* Simple sparkline visualization */}
              <div className="flex items-end gap-1 h-10 mb-2">
                {moodTrend.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-stoic-blue/20 rounded-sm"
                    style={{ height: `${(value / 5) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-sm font-medium text-success">Mostly Calm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Theme */}
        <Card className="mb-6 bg-gray-50 dark:bg-gray-800/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: getPillarColor(todayPillar) }}
              >
                <PillarIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold capitalize">Focus: {todayPillar}</span>
            </div>
            <p className="text-muted-foreground">
              What small action today will strengthen your {todayPillar === 'ego' ? 'humility' : todayPillar}?
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-8">
          <Link href="/journal/new" className="flex-1">
            <Button size="lg" className="w-full rounded-full">
              <PenLine className="h-5 w-5 mr-2" />
              Start Writing
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
        </div>

        {/* Recent Entries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Entries</h2>
            <Link href="/journal" className="text-stoic-blue text-sm font-medium hover:underline">
              View All
            </Link>
          </div>

          {recentEntries.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <PenLine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No entries yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your Stoic journey by writing your first entry.
                </p>
                <Link href="/journal/new">
                  <Button>Write First Entry</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => {
                const EntryIcon = pillarIcons[entry.pillar]
                return (
                  <Link key={entry.id} href={`/journal/${entry.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(entry.date)}
                          </span>
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getMoodColor(entry.mood) }}
                          />
                        </div>
                        <p className="text-sm line-clamp-2 mb-3">
                          {entry.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-5 h-5 rounded flex items-center justify-center"
                              style={{ backgroundColor: `${getPillarColor(entry.pillar)}20` }}
                            >
                              <span style={{ color: getPillarColor(entry.pillar) }}>
                                <EntryIcon className="h-3 w-3" />
                              </span>
                            </div>
                            <span
                              className="text-xs font-medium capitalize"
                              style={{ color: getPillarColor(entry.pillar) }}
                            >
                              {entry.pillar}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  )
}
