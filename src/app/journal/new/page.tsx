'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Save,
  Wallet,
  Brain,
  Heart,
  Target,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import { getPromptForPillar, getPillarColor, getTodayQuote } from '@/lib/mock-data'
import type { Pillar, Mood } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const pillarOptions: { id: Pillar; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'money', label: 'Money', icon: Wallet },
  { id: 'ego', label: 'Ego', icon: Brain },
  { id: 'relationships', label: 'Relationships', icon: Heart },
  { id: 'discipline', label: 'Discipline', icon: Target },
]

const moodOptions: { id: Mood; label: string; emoji: string }[] = [
  { id: 'great', label: 'Great', emoji: '😊' },
  { id: 'good', label: 'Good', emoji: '🙂' },
  { id: 'okay', label: 'Okay', emoji: '😐' },
  { id: 'bad', label: 'Bad', emoji: '😔' },
  { id: 'terrible', label: 'Terrible', emoji: '😢' },
]

export default function NewEntryPage() {
  const router = useRouter()
  const { user, addEntry } = useAppStore()
  const [selectedPillar, setSelectedPillar] = useState<Pillar>(
    user?.preferences.defaultPillar || 'discipline'
  )
  const [selectedMood, setSelectedMood] = useState<Mood>('good')
  const [content, setContent] = useState('')
  const [prompt, setPrompt] = useState(getPromptForPillar(selectedPillar))
  const [saving, setSaving] = useState(false)

  const quote = getTodayQuote()

  const handlePillarChange = (pillar: Pillar) => {
    setSelectedPillar(pillar)
    setPrompt(getPromptForPillar(pillar))
  }

  const refreshPrompt = () => {
    setPrompt(getPromptForPillar(selectedPillar))
  }

  const handleSave = async () => {
    if (!content.trim()) return

    setSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    addEntry({
      date: new Date(),
      content: content.trim(),
      mood: selectedMood,
      pillar: selectedPillar,
      prompt,
    })

    router.push('/dashboard')
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-lg font-semibold">New Entry</h1>
          <Button
            onClick={handleSave}
            disabled={!content.trim() || saving}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>

        {/* Date */}
        <p className="text-muted-foreground text-sm mb-6">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Pillar Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Pillar</label>
          <div className="flex gap-2 flex-wrap">
            {pillarOptions.map((pillar) => {
              const Icon = pillar.icon
              const isSelected = selectedPillar === pillar.id
              return (
                <button
                  key={pillar.id}
                  onClick={() => handlePillarChange(pillar.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                  style={isSelected ? { backgroundColor: getPillarColor(pillar.id) } : {}}
                >
                  <Icon className="h-4 w-4" />
                  {pillar.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Prompt Card */}
        <Card className="mb-6 bg-stoic-blue/5 border-stoic-blue/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-stoic-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-stoic-blue mb-1">Today&apos;s Prompt</p>
                  <p className="text-sm">{prompt}</p>
                </div>
              </div>
              <button
                onClick={refreshPrompt}
                className="p-2 hover:bg-stoic-blue/10 rounded-full transition-colors"
                title="Get new prompt"
              >
                <RefreshCw className="h-4 w-4 text-stoic-blue" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <div className="mb-6">
          <Textarea
            placeholder="What's on your mind? Reflect on the prompt above, or write freely..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] text-base resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {content.length} characters
          </p>
        </div>

        {/* Mood Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">How are you feeling?</label>
          <div className="flex gap-2 justify-between">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  'flex flex-col items-center gap-1 p-3 rounded-xl transition-all flex-1',
                  selectedMood === mood.id
                    ? 'bg-stoic-blue/10 ring-2 ring-stoic-blue'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wisdom Card */}
        <Card className="bg-gray-50 dark:bg-gray-800/50">
          <CardContent className="pt-4 pb-4">
            <blockquote className="quote text-sm">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <p className="quote-author text-xs mt-2">— {quote.author}</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
