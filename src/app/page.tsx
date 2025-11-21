'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun, Mail, Lock } from 'lucide-react'

export default function ComponentShowcase() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-stoic-blue">Stoic.af Component Showcase</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Heading 1</h1>
            <h2 className="text-4xl font-bold">Heading 2</h2>
            <h3 className="text-3xl font-bold">Heading 3</h3>
            <h4 className="text-2xl font-bold">Heading 4</h4>
            <h5 className="text-xl font-bold">Heading 5</h5>
            <h6 className="text-lg font-bold">Heading 6</h6>
            <p className="text-lg">Body Large</p>
            <p className="text-base">Body Medium</p>
            <p className="text-sm">Body Small</p>
            <blockquote className="quote">
              "The happiness of your life depends upon the quality of your thoughts."
            </blockquote>
            <p className="quote-author">— Marcus Aurelius</p>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Primary" color="bg-stoic-blue" hex="#4B90C8" />
            <ColorSwatch name="Success" color="bg-success" hex="#10B981" />
            <ColorSwatch name="Warning" color="bg-warning" hex="#F59E0B" />
            <ColorSwatch name="Error" color="bg-error" hex="#EF4444" />
          </div>
          <h3 className="text-xl font-semibold mt-8">Pillar Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Money" color="bg-money" hex="#10B981" />
            <ColorSwatch name="Ego" color="bg-ego" hex="#8B5CF6" />
            <ColorSwatch name="Relationships" color="bg-relationships" hex="#EC4899" />
            <ColorSwatch name="Discipline" color="bg-discipline" hex="#F59E0B" />
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Buttons</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <h3 className="text-xl font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>

            <h3 className="text-xl font-semibold">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Secure
              </Button>
            </div>

            <h3 className="text-xl font-semibold">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button className="cursor-wait">Loading...</Button>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Form Inputs</h2>

          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="journal">Journal Entry</Label>
              <Textarea
                id="journal"
                placeholder="Write your thoughts..."
                rows={5}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Cards</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>This is a standard card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cards are used to group related content and actions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-stoic-blue">
              <CardHeader>
                <CardTitle>Highlighted Card</CardTitle>
                <CardDescription>With custom border color</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can customize card styling with Tailwind classes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stoic-blue text-white">
              <CardHeader>
                <CardTitle>Primary Card</CardTitle>
                <CardDescription className="text-white/80">With primary background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/90">
                  Cards can have different background colors.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Spacing Scale</h2>
          <div className="space-y-4">
            <SpacingDemo label="Space 1 (4px)" spacing="w-1" />
            <SpacingDemo label="Space 2 (8px)" spacing="w-2" />
            <SpacingDemo label="Space 3 (12px)" spacing="w-3" />
            <SpacingDemo label="Space 4 (16px)" spacing="w-4" />
            <SpacingDemo label="Space 6 (24px)" spacing="w-6" />
            <SpacingDemo label="Space 8 (32px)" spacing="w-8" />
          </div>
        </section>
      </main>
    </div>
  )
}

function ColorSwatch({ name, color, hex }: { name: string; color: string; hex: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-24 rounded-lg ${color} border`} />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500 font-mono">{hex}</p>
      </div>
    </div>
  )
}

function SpacingDemo({ label, spacing }: { label: string; spacing: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`${spacing} h-8 bg-stoic-blue rounded`} />
      <span className="text-sm">{label}</span>
    </div>
  )
}
