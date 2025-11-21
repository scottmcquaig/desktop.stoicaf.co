'use client'

import { useAppStore } from '@/lib/store'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart3,
  TrendingUp,
  Flame,
  Target,
  Calendar,
  Wallet,
  Brain,
  Heart
} from 'lucide-react'
import { getPillarColor } from '@/lib/mock-data'

export default function InsightsPage() {
  const { user, entries } = useAppStore()

  // Calculate pillar distribution
  const pillarCounts = entries.reduce((acc, entry) => {
    acc[entry.pillar] = (acc[entry.pillar] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalEntries = entries.length

  // Mock weekly data
  const weeklyMood = [3, 4, 4, 3, 5, 4, 4]
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground">Track your Stoic journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stoic-blue/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-stoic-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user?.stats.totalEntries || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Entries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user?.stats.currentStreak || 0}</p>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user?.stats.longestStreak || 0}</p>
                  <p className="text-xs text-muted-foreground">Longest Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ego/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-ego" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">Pillars Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyMood.map((mood, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-stoic-blue rounded-t-lg transition-all"
                    style={{ height: `${(mood / 5) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{weekDays[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                Overall trend: Improving
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pillar Distribution */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Pillar Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'money', label: 'Money', icon: Wallet },
                { id: 'ego', label: 'Ego', icon: Brain },
                { id: 'relationships', label: 'Relationships', icon: Heart },
                { id: 'discipline', label: 'Discipline', icon: Target },
              ].map((pillar) => {
                const count = pillarCounts[pillar.id] || 0
                const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0
                const Icon = pillar.icon
                return (
                  <div key={pillar.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ color: getPillarColor(pillar.id as any) }}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">{pillar.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {count} entries ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: getPillarColor(pillar.id as any),
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Summary Placeholder */}
        <Card className="bg-gradient-to-br from-stoic-blue/5 to-stoic-blue/10 border-stoic-blue/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stoic-blue flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">AI</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Weekly AI Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your journal entries this week, you&apos;ve shown strong progress in
                  discipline and self-reflection. Your entries reveal a pattern of
                  morning routine improvements. Consider exploring the relationships pillar
                  more - it accounts for only {((pillarCounts['relationships'] || 0) / Math.max(totalEntries, 1) * 100).toFixed(0)}% of
                  your entries.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Coming soon: Full AI-powered insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
