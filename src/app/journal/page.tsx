'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  Wallet,
  Brain,
  Heart,
  Target,
  Filter,
  ChevronRight
} from 'lucide-react'
import { formatDate, getMoodColor, getPillarColor } from '@/lib/mock-data'
import type { Pillar } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const pillarIcons: Record<Pillar, React.ComponentType<{ className?: string }>> = {
  money: Wallet,
  ego: Brain,
  relationships: Heart,
  discipline: Target,
}

const pillars: { id: Pillar | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'money', label: 'Money' },
  { id: 'ego', label: 'Ego' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'discipline', label: 'Discipline' },
]

export default function JournalPage() {
  const { entries } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'all'>('all')

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPillar = selectedPillar === 'all' || entry.pillar === selectedPillar
    return matchesSearch && matchesPillar
  })

  // Group entries by date
  const groupedEntries = filteredEntries.reduce((groups, entry) => {
    const dateKey = entry.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(entry)
    return groups
  }, {} as Record<string, typeof entries>)

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Journal</h1>
            <p className="text-muted-foreground">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <Link href="/journal/new">
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Pillar Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedPillar === pillar.id
                    ? 'bg-stoic-blue text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {pillar.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No entries found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedPillar !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start your Stoic journey by writing your first entry'}
              </p>
              <Link href="/journal/new">
                <Button>Write Entry</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEntries).map(([date, dateEntries]) => (
              <div key={date}>
                <h2 className="text-sm font-medium text-muted-foreground mb-3">{date}</h2>
                <div className="space-y-3">
                  {dateEntries.map((entry) => {
                    const EntryIcon = pillarIcons[entry.pillar]
                    return (
                      <Link key={entry.id} href={`/journal/${entry.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="pt-4 pb-4">
                            <div className="flex items-start gap-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${getPillarColor(entry.pillar)}20` }}
                              >
                                <span style={{ color: getPillarColor(entry.pillar) }}>
                                  <EntryIcon className="h-5 w-5" />
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-muted-foreground">
                                    {entry.date.toLocaleTimeString('en-US', {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: getMoodColor(entry.mood) }}
                                  />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {entry.mood}
                                  </span>
                                </div>
                                {entry.prompt && (
                                  <p className="text-xs text-stoic-blue mb-1 italic">
                                    {entry.prompt}
                                  </p>
                                )}
                                <p className="text-sm line-clamp-2">{entry.content}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
