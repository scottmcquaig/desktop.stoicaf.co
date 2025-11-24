'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Settings,
  Zap,
  Sun,
  Moon,
  Columns,
  DollarSign,
  Heart,
  Shield,
  Target,
  Keyboard,
  Download,
  Sparkles,
  Calendar,
  BarChart3,
  Grip,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <StoicLogo className="w-10 h-10" />
              <span className="font-black text-xl text-slate-900">STOIC AF</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Documentation</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know to get the most out of Stoic AF.
          </p>
        </div>

        {/* Quick Start */}
        <section id="getting-started" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Getting Started</h2>
          </div>

          <div className="prose prose-slate max-w-none">
            <Card className="p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Start Guide</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stoic-dark text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900">Create your account</strong> — Sign up with Google or
                    email. Takes less than 30 seconds.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stoic-dark text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900">Complete onboarding</strong> — Choose your pillar focus,
                    set Chad's coaching tone, and describe what you're working on.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stoic-dark text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900">Write your first entry</strong> — Click "New Entry" on
                    your dashboard. Choose a pillar and start journaling.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stoic-dark text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900">Build your streak</strong> — Come back daily to maintain
                    your streak and build the habit of reflection.
                  </div>
                </li>
              </ol>
            </Card>
          </div>
        </section>

        {/* Four Pillars */}
        <section id="pillars" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">The Four Pillars</h2>
          </div>

          <p className="text-lg text-slate-600 mb-8">
            Stoic AF organizes your journaling around four fundamental life areas. Each pillar includes a 30-day
            program with daily prompts, challenges, and Stoic wisdom.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Money</h3>
              </div>
              <p className="text-slate-600 mb-3">
                <em>"Your Wealth Isn't Your Worth"</em>
              </p>
              <p className="text-slate-600 text-sm">
                Examine your relationship with money, abundance, and scarcity. Learn to separate your self-worth
                from your net worth and make peace with finances.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Ego</h3>
              </div>
              <p className="text-slate-600 mb-3">
                <em>"Let Results Talk"</em>
              </p>
              <p className="text-slate-600 text-sm">
                Confront pride, insecurity, and the need for validation. Build genuine confidence that doesn't
                depend on others' approval.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-pink-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Relationships</h3>
              </div>
              <p className="text-slate-600 mb-3">
                <em>"Lead With Respect"</em>
              </p>
              <p className="text-slate-600 text-sm">
                Strengthen connections with others. Work on communication, boundaries, empathy, and building
                meaningful relationships.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-amber-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Discipline</h3>
              </div>
              <p className="text-slate-600 mb-3">
                <em>"Small Reps, Big Gains"</em>
              </p>
              <p className="text-slate-600 text-sm">
                Build willpower and consistency. Master habits, overcome procrastination, and develop the
                self-control that leads to lasting change.
              </p>
            </Card>
          </div>
        </section>

        {/* Journal Templates */}
        <section id="templates" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Journal Templates</h2>
          </div>

          <p className="text-lg text-slate-600 mb-8">
            Use our block-based templates to structure your journaling. Mix and match blocks to create your
            perfect entry format.
          </p>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Morning Intent</h3>
                  <p className="text-sm text-slate-500">Start your day with clarity</p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                The Morning Intent block helps you set your focus for the day. Write about what you want to
                accomplish, how you want to show up, and what mindset you're bringing to your challenges.
              </p>
              <div className="bg-amber-50 rounded-lg p-4 text-sm text-slate-700">
                <strong>Prompt example:</strong> "Today I will focus on... The person I want to be today is..."
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Evening Audit</h3>
                  <p className="text-sm text-slate-500">Reflect on your day</p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                The Evening Audit helps you review your day. Acknowledge wins, examine where you fell short, and
                extract lessons to carry forward.
              </p>
              <div className="bg-indigo-50 rounded-lg p-4 text-sm text-slate-700">
                <strong>Prompt example:</strong> "What went well today? Where did I fall short? What will I do
                differently tomorrow?"
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Columns className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Dichotomy of Control</h3>
                  <p className="text-sm text-slate-500">Focus on what matters</p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                Based on Epictetus' core teaching, this two-column block helps you separate what you can control
                from what you can't. Release anxiety by focusing energy only on what's within your power.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>In my control:</strong>
                    <br />
                    My effort, attitude, responses...
                  </div>
                  <div>
                    <strong>Not in my control:</strong>
                    <br />
                    Others' opinions, outcomes...
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Freeform</h3>
                  <p className="text-sm text-slate-500">Write without structure</p>
                </div>
              </div>
              <p className="text-slate-600">
                Sometimes you just need a blank page. Use freeform blocks for stream-of-consciousness writing,
                processing emotions, or capturing thoughts that don't fit a template.
              </p>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <Grip className="w-5 h-5 text-slate-600" />
              <h4 className="font-bold text-slate-900">Pro Tip: Drag to Reorder</h4>
            </div>
            <p className="text-slate-600">
              Use the grip handle on each block to drag and reorder them. Create your perfect layout, then click
              "Save Layout" to make it your default for future entries.
            </p>
          </div>
        </section>

        {/* ChadGPT */}
        <section id="chadgpt" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">ChadGPT AI Coach</h2>
          </div>

          <p className="text-lg text-slate-600 mb-8">
            ChadGPT is your AI-powered Stoic coach. He reads your entries and provides insights, challenges, and
            encouragement based on your writing.
          </p>

          <Card className="p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How to Use ChadGPT</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <Sparkles className="w-5 h-5 text-stoic-dark flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Get Entry Insights</strong> — After writing, click the
                  sparkles button or press <kbd className="px-2 py-0.5 bg-slate-100 rounded text-xs">Cmd+Enter</kbd> to save and
                  get Chad's take on your entry.
                </div>
              </li>
              <li className="flex gap-3">
                <Calendar className="w-5 h-5 text-stoic-dark flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Weekly Reflections</strong> — Visit your Dashboard and click
                  "Generate Reflection" for a summary of your week's patterns and progress.
                </div>
              </li>
              <li className="flex gap-3">
                <BarChart3 className="w-5 h-5 text-stoic-dark flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Pattern Recognition</strong> — The more you journal, the
                  better Chad understands your patterns and can offer relevant insights.
                </div>
              </li>
            </ul>
          </Card>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Chad's Coaching Tones</h3>
          <p className="text-slate-600 mb-6">
            During onboarding (or in Settings), choose how you want Chad to communicate with you:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-bold text-slate-900 mb-2">Gentle</h4>
              <p className="text-sm text-slate-600">
                Supportive and encouraging. Good for when you need compassion and understanding.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold text-slate-900 mb-2">Reality Check</h4>
              <p className="text-sm text-slate-600">
                Balanced honesty. Chad will point out what you might be avoiding while staying constructive.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold text-slate-900 mb-2">Drill Sergeant</h4>
              <p className="text-sm text-slate-600">
                Direct and demanding. For when you need a push and accountability without excuses.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-bold text-slate-900 mb-2">Roast Me</h4>
              <p className="text-sm text-slate-600">
                Humorous tough love. Chad will call you out with wit. Not for the faint of heart.
              </p>
            </Card>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="shortcuts" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Keyboard className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Keyboard Shortcuts</h2>
          </div>

          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-slate-900">Shortcut</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">Cmd/Ctrl + K</kbd>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Open Quick Capture (from anywhere in the app)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">Cmd/Ctrl + S</kbd>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Save current entry</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">Cmd/Ctrl + Enter</kbd>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Save entry and get ChadGPT insight</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">Escape</kbd>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Go back to journal list (from editor)</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        {/* Settings & Customization */}
        <section id="settings" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Settings & Customization</h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Profile Settings</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Update your display name</li>
                <li>• Upload a profile photo</li>
                <li>• Change your pillar focus</li>
                <li>• Adjust Chad's coaching tone</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Notification Preferences</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Enable/disable email reminders</li>
                <li>• Set up browser notifications</li>
                <li>• Choose reminder time (morning, evening, or custom)</li>
                <li>• Select which days to receive reminders</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Default Entry Layout</h3>
              <p className="text-slate-600 mb-3">
                When you're in the journal editor, arrange your blocks how you like them, then click "Save
                Layout" in the toolbar. New entries will start with your saved layout.
              </p>
            </Card>
          </div>
        </section>

        {/* Data & Export */}
        <section id="export" className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-stoic-dark" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Your Data</h2>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Export Your Data</h3>
            <p className="text-slate-600 mb-4">
              Your journal entries belong to you. Export everything anytime from{' '}
              <strong>Settings → Data & Privacy → Export Data</strong>.
            </p>
            <p className="text-slate-600 mb-4">You'll receive a JSON file containing:</p>
            <ul className="space-y-2 text-slate-600 mb-6">
              <li>• All journal entries with full content</li>
              <li>• Mood scores and pillar selections</li>
              <li>• Entry dates and timestamps</li>
              <li>• Your profile settings</li>
            </ul>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-900 mb-2">Deleting Your Account</h4>
              <p className="text-sm text-red-800">
                You can delete your account from Settings. This permanently removes all your data within 30
                days. Export your entries first if you want to keep them!
              </p>
            </div>
          </Card>
        </section>

        {/* Need Help */}
        <section className="p-8 bg-stoic-dark/5 rounded-2xl border border-stoic-dark/10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Still Have Questions?</h2>
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button className="bg-stoic-dark hover:bg-stoic-dark/90">Visit Support</Button>
            </Link>
            <a href="mailto:support@stoicaf.co">
              <Button variant="outline">Email Us</Button>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>© {new Date().getFullYear()} SwgSzn LLC. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link href="/privacy" className="hover:text-slate-900">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-900">
                Terms
              </Link>
              <Link href="/support" className="hover:text-slate-900">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
