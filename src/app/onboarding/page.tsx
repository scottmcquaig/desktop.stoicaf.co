'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wallet, Brain, Heart, Target, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Pillar } from '@/lib/mock-data'

const pillars = [
  {
    id: 'money' as Pillar,
    name: 'Money',
    icon: Wallet,
    color: 'bg-money',
    textColor: 'text-money',
    borderColor: 'border-money',
    description: 'Master your relationship with wealth. Learn to want less, save wisely, and find freedom from financial anxiety.',
  },
  {
    id: 'ego' as Pillar,
    name: 'Ego',
    icon: Brain,
    color: 'bg-ego',
    textColor: 'text-ego',
    borderColor: 'border-ego',
    description: 'Tame your ego. Accept criticism gracefully, celebrate others\' success, and find strength in humility.',
  },
  {
    id: 'relationships' as Pillar,
    name: 'Relationships',
    icon: Heart,
    color: 'bg-relationships',
    textColor: 'text-relationships',
    borderColor: 'border-relationships',
    description: 'Build meaningful connections. Practice patience, presence, and unconditional support for those you love.',
  },
  {
    id: 'discipline' as Pillar,
    name: 'Discipline',
    icon: Target,
    color: 'bg-discipline',
    textColor: 'text-discipline',
    borderColor: 'border-discipline',
    description: 'Strengthen your willpower. Build habits that serve your higher self and resist the pull of comfort.',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null)
  const [reminderTime, setReminderTime] = useState('08:00')
  const [enableReminder, setEnableReminder] = useState(true)
  const router = useRouter()
  const { user, completeOnboarding } = useAppStore()

  const handleComplete = () => {
    if (selectedPillar) {
      completeOnboarding(selectedPillar, enableReminder ? reminderTime : undefined)
      router.push('/dashboard')
    }
  }

  const canProceed = () => {
    if (step === 2) return selectedPillar !== null
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Progress indicator */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                  s === step
                    ? 'bg-stoic-blue text-white'
                    : s < step
                    ? 'bg-stoic-blue/20 text-stoic-blue'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-stoic-blue transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Welcome{user?.displayName ? `, ${user.displayName}` : ''}!</h1>
                <p className="text-muted-foreground text-lg">
                  You&apos;re about to begin a transformative journey.
                </p>
              </div>

              <Card className="text-left">
                <CardContent className="pt-6 space-y-4">
                  <blockquote className="quote text-lg">
                    &ldquo;We suffer more often in imagination than in reality.&rdquo;
                  </blockquote>
                  <p className="quote-author">— Seneca</p>
                </CardContent>
              </Card>

              <div className="space-y-3 text-left">
                <p className="text-muted-foreground">Stoic.af helps you:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-stoic-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-stoic-blue" />
                    </div>
                    <span>Build emotional resilience through daily journaling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-stoic-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-stoic-blue" />
                    </div>
                    <span>Apply ancient Stoic wisdom to modern challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-stoic-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-stoic-blue" />
                    </div>
                    <span>Track progress across four key life pillars</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Pillar Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Choose your focus</h1>
                <p className="text-muted-foreground">
                  Which area of life would you like to strengthen first?
                </p>
              </div>

              <div className="grid gap-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon
                  const isSelected = selectedPillar === pillar.id
                  return (
                    <Card
                      key={pillar.id}
                      className={cn(
                        'cursor-pointer transition-all hover:shadow-md',
                        isSelected && `ring-2 ${pillar.borderColor}`
                      )}
                      onClick={() => setSelectedPillar(pillar.id)}
                    >
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', pillar.color)}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={cn('font-semibold', isSelected && pillar.textColor)}>
                            {pillar.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pillar.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', pillar.color)}>
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Don&apos;t worry, you can explore all pillars. This just sets your starting point.
              </p>
            </div>
          )}

          {/* Step 3: Reminder Setup */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Set your reminder</h1>
                <p className="text-muted-foreground">
                  When would you like to journal each day?
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Daily reminder</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a gentle nudge to reflect
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enableReminder}
                      onClick={() => setEnableReminder(!enableReminder)}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        enableReminder ? 'bg-stoic-blue' : 'bg-gray-300 dark:bg-gray-600'
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          enableReminder ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  </div>

                  {enableReminder && (
                    <div className="space-y-2">
                      <Label htmlFor="time">Reminder time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Many Stoics journaled in the morning or evening. Choose what works for you.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-stoic-blue/5 border-stoic-blue/20">
                <CardContent className="pt-6">
                  <blockquote className="quote text-base">
                    &ldquo;Begin at once to live, and count each separate day as a separate life.&rdquo;
                  </blockquote>
                  <p className="quote-author mt-2">— Seneca</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-t bg-white dark:bg-gray-900">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="flex-1"
            >
              Start Journaling
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
