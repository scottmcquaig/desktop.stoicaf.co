'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft, BookOpen, Lightbulb, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
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
            Learn how to get the most out of Stoic AF. Guides, tutorials, and best practices.
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="max-w-2xl mx-auto mb-16 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-stoic-dark" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Documentation Coming Soon</h2>
          <p className="text-slate-600 mb-6">
            We're working on comprehensive guides and tutorials to help you master Stoic AF. Check back soon!
          </p>
          <p className="text-sm text-slate-500">
            In the meantime, feel free to{' '}
            <Link href="/support" className="text-stoic-dark underline hover:no-underline">
              contact support
            </Link>{' '}
            with any questions.
          </p>
        </div>

        {/* Planned Topics */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">What's Coming</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-3">
              <Zap className="w-8 h-8 text-stoic-dark" />
              <h3 className="text-xl font-bold text-slate-900">Getting Started</h3>
              <p className="text-slate-600">
                Quick start guide, account setup, and your first journal entry
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <BookOpen className="w-8 h-8 text-stoic-dark" />
              <h3 className="text-xl font-bold text-slate-900">Journaling Best Practices</h3>
              <p className="text-slate-600">
                How to use the four pillars, templates, and build consistent habits
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <Lightbulb className="w-8 h-8 text-stoic-dark" />
              <h3 className="text-xl font-bold text-slate-900">Using ChadGPT</h3>
              <p className="text-slate-600">
                Getting the most out of AI insights and choosing the right tone
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <Settings className="w-8 h-8 text-stoic-dark" />
              <h3 className="text-xl font-bold text-slate-900">Advanced Features</h3>
              <p className="text-slate-600">
                Keyboard shortcuts, auto-save, exporting data, and customization
              </p>
            </Card>
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
