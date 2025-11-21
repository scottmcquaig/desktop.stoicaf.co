'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  User,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Wallet,
  Brain,
  Heart,
  Target,
  Moon,
  Sun,
  Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Pillar } from '@/lib/mock-data'
import { getPillarColor } from '@/lib/mock-data'

const pillarOptions: { id: Pillar; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'money', label: 'Money', icon: Wallet },
  { id: 'ego', label: 'Ego', icon: Brain },
  { id: 'relationships', label: 'Relationships', icon: Heart },
  { id: 'discipline', label: 'Discipline', icon: Target },
]

const themeOptions = [
  { id: 'light' as const, label: 'Light', icon: Sun },
  { id: 'dark' as const, label: 'Dark', icon: Moon },
  { id: 'auto' as const, label: 'System', icon: Monitor },
]

export default function SettingsPage() {
  const { user, updateUserPreferences, logout } = useAppStore()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [reminderTime, setReminderTime] = useState(user?.preferences.dailyReminderTime || '08:00')
  const [reminderEnabled, setReminderEnabled] = useState(user?.preferences.dailyReminderEnabled ?? true)
  const [selectedPillar, setSelectedPillar] = useState<Pillar | undefined>(user?.preferences.defaultPillar)
  const [selectedTheme, setSelectedTheme] = useState(user?.preferences.theme || 'auto')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateUserPreferences({
      dailyReminderTime: reminderTime,
      dailyReminderEnabled: reminderEnabled,
      defaultPillar: selectedPillar,
      theme: selectedTheme,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSignOut = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stoic-blue/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-stoic-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <CardDescription>Your personal information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="bg-gray-50 dark:bg-gray-800" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stoic-blue/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-stoic-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Reminders</CardTitle>
                  <CardDescription>Daily journaling reminders</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reminder</p>
                  <p className="text-sm text-muted-foreground">Get reminded to journal</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={reminderEnabled}
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    reminderEnabled ? 'bg-stoic-blue' : 'bg-gray-300 dark:bg-gray-600'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      reminderEnabled ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {reminderEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder Time</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Default Pillar Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stoic-blue/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-stoic-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Default Pillar</CardTitle>
                  <CardDescription>Your primary focus area</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {pillarOptions.map((pillar) => {
                  const Icon = pillar.icon
                  const isSelected = selectedPillar === pillar.id
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setSelectedPillar(pillar.id)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                        isSelected
                          ? 'ring-2'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${getPillarColor(pillar.id)}15`,
                              borderColor: getPillarColor(pillar.id),
                              '--tw-ring-color': getPillarColor(pillar.id),
                            } as React.CSSProperties
                          : {}
                      }
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isSelected ? getPillarColor(pillar.id) : '#9ca3af40' }}
                      >
                        <Icon className={cn('h-4 w-4', isSelected ? 'text-white' : 'text-gray-500')} />
                      </div>
                      <span
                        className="font-medium"
                        style={isSelected ? { color: getPillarColor(pillar.id) } : {}}
                      >
                        {pillar.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Theme Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stoic-blue/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-stoic-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Appearance</CardTitle>
                  <CardDescription>Customize how Stoic.af looks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {themeOptions.map((theme) => {
                  const Icon = theme.icon
                  const isSelected = selectedTheme === theme.id
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={cn(
                        'flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all',
                        isSelected
                          ? 'bg-stoic-blue/10 ring-2 ring-stoic-blue'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', isSelected ? 'text-stoic-blue' : 'text-gray-500')} />
                      <span className={cn('text-sm font-medium', isSelected && 'text-stoic-blue')}>
                        {theme.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>

          {/* Other Links */}
          <Card>
            <CardContent className="py-0 divide-y">
              <button className="flex items-center justify-between w-full py-4 text-left hover:text-stoic-blue transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="flex items-center justify-between w-full py-4 text-left hover:text-stoic-blue transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-between w-full py-4 text-left text-error hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Stoic.af v1.0.0</p>
            <p className="mt-1">Build Stoic Strength</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
