'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft, Mail, Book, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Support</h1>
        <p className="text-xl text-slate-600 mb-12">
          We're here to help. Choose the option that works best for you.
        </p>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-stoic-dark" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Email Support</h3>
            <p className="text-slate-600">
              Send us an email and we'll respond within 24 hours (usually much faster).
            </p>
            <a
              href="mailto:support@stoicaf.co"
              className="inline-flex items-center text-stoic-dark font-medium hover:underline"
            >
              support@stoicaf.co →
            </a>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Book className="w-6 h-6 text-stoic-dark" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Documentation</h3>
            <p className="text-slate-600">
              Browse guides and tutorials for getting the most out of Stoic AF.
            </p>
            <Link href="/docs" className="inline-flex items-center text-stoic-dark font-medium hover:underline">
              View Docs →
            </Link>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-stoic-dark/10 flex items-center justify-center">
              <Bug className="w-6 h-6 text-stoic-dark" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Report a Bug</h3>
            <p className="text-slate-600">Found a bug? Let us know so we can fix it quickly.</p>
            <a
              href="mailto:bugs@stoicaf.co"
              className="inline-flex items-center text-stoic-dark font-medium hover:underline"
            >
              bugs@stoicaf.co →
            </a>
          </Card>
        </div>

        {/* FAQ Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>

          {/* Getting Started */}
          <div>
            <h3 className="text-lg font-bold text-stoic-dark mb-4 uppercase tracking-wide">Getting Started</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What are the four pillars?</h4>
                <p className="text-slate-600">
                  The four pillars are core life areas for Stoic reflection: <strong>Money</strong> (your
                  relationship with wealth), <strong>Ego</strong> (pride, confidence, and validation),{' '}
                  <strong>Relationships</strong> (connections with others), and <strong>Discipline</strong>{' '}
                  (habits and self-control). Each has a 30-day guided program.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Can I change my pillar focus later?</h4>
                <p className="text-slate-600">
                  Yes! Go to Settings or the Explore page to switch to a different pillar program anytime. Your
                  progress in completed programs is saved.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What are journal templates?</h4>
                <p className="text-slate-600">
                  Templates are pre-structured blocks to guide your writing: <strong>Morning Intent</strong> (set
                  daily focus), <strong>Evening Audit</strong> (reflect on the day), <strong>Dichotomy of
                  Control</strong> (separate what you can and can't control), and <strong>Freeform</strong>{' '}
                  (blank space). Mix and match them!
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">How does the streak system work?</h4>
                <p className="text-slate-600">
                  Write at least one entry per day to maintain your streak. Your streak counter shows on the
                  Dashboard. Miss a day? Your streak resets, but all your entries are preserved. It's about
                  building consistency.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Can I save my preferred layout?</h4>
                <p className="text-slate-600">
                  Yes! Arrange your blocks how you like them in the editor, then click "Save Layout" in the
                  toolbar. New entries will start with your saved configuration.
                </p>
              </div>
            </div>
          </div>

          {/* ChadGPT & AI */}
          <div>
            <h3 className="text-lg font-bold text-stoic-dark mb-4 uppercase tracking-wide">ChadGPT & AI Features</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">How does ChadGPT work?</h4>
                <p className="text-slate-600">
                  ChadGPT uses Google Gemini AI to analyze your entries and provide insights. Your data is
                  processed securely and is not used to train AI models.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Can I change Chad's coaching tone?</h4>
                <p className="text-slate-600">
                  Yes! Choose from four tones in Settings: <strong>Gentle</strong> (supportive),{' '}
                  <strong>Reality Check</strong> (balanced honesty), <strong>Drill Sergeant</strong> (direct),
                  or <strong>Roast Me</strong> (humorous tough love).
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Are my entries used to train AI?</h4>
                <p className="text-slate-600">
                  No. Your journal content is processed in real-time for insights but is never used to train AI
                  models. See our{' '}
                  <Link href="/privacy" className="text-stoic-dark underline hover:no-underline">
                    Privacy Policy
                  </Link>{' '}
                  for full details on AI processing.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What are weekly reflections?</h4>
                <p className="text-slate-600">
                  Weekly reflections are AI-generated summaries of your journaling patterns, mood trends, and
                  progress. Click "Generate Reflection" on your Dashboard to see yours.
                </p>
              </div>
            </div>
          </div>

          {/* Account & Billing */}
          <div>
            <h3 className="text-lg font-bold text-stoic-dark mb-4 uppercase tracking-wide">Account & Billing</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">How do I upgrade to Pro?</h4>
                <p className="text-slate-600">
                  Go to Settings → Subscription and click "Upgrade to Pro." You can start with a 7-day free trial.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Can I cancel my Pro subscription?</h4>
                <p className="text-slate-600">
                  Yes, anytime. Go to Settings → Subscription → Cancel. You'll keep Pro access until the end of
                  your billing period.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What happens if I downgrade to Free?</h4>
                <p className="text-slate-600">
                  Your existing entries are never deleted. You'll keep access to all your past journals, but new
                  entries will be limited to 1 per day and some AI features will be restricted.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Do you offer student discounts?</h4>
                <p className="text-slate-600">
                  Not yet, but we're working on it! Email us at{' '}
                  <a href="mailto:support@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                    support@stoicaf.co
                  </a>{' '}
                  if you're interested.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Do you offer refunds?</h4>
                <p className="text-slate-600">
                  We don't offer refunds for partial months, but you can cancel anytime and keep access until
                  your billing period ends. If you have a special circumstance, email us.
                </p>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <h3 className="text-lg font-bold text-stoic-dark mb-4 uppercase tracking-wide">Data & Privacy</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Is my data secure?</h4>
                <p className="text-slate-600">
                  Yes. Your data is encrypted in transit and at rest. We use Firebase Security Rules to ensure
                  only you can access your entries. Read our{' '}
                  <Link href="/privacy" className="text-stoic-dark underline hover:no-underline">
                    Privacy Policy
                  </Link>{' '}
                  for details.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">How do I export my journal entries?</h4>
                <p className="text-slate-600">
                  Go to Settings → Data & Privacy → Export Data. You'll receive a JSON file with all your
                  entries, moods, and settings.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Can I access Stoic AF from multiple devices?
                </h4>
                <p className="text-slate-600">
                  Yes! Your entries sync automatically across all devices when you're logged in with the same
                  account.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What happens if I delete my account?</h4>
                <p className="text-slate-600">
                  All your data will be permanently deleted within 30 days. Make sure to export your entries
                  first if you want to keep them!
                </p>
              </div>
            </div>
          </div>

          {/* Technical */}
          <div>
            <h3 className="text-lg font-bold text-stoic-dark mb-4 uppercase tracking-wide">Technical</h3>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What browsers are supported?</h4>
                <p className="text-slate-600">
                  Stoic AF works best on modern browsers: Chrome, Firefox, Safari, and Edge. We recommend
                  keeping your browser up to date for the best experience.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">Is there a mobile app?</h4>
                <p className="text-slate-600">
                  Not yet, but our web app is fully responsive and works great on mobile browsers. A native app
                  is on our roadmap!
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">What keyboard shortcuts are available?</h4>
                <p className="text-slate-600">
                  <strong>Cmd/Ctrl + K</strong>: Quick Capture | <strong>Cmd/Ctrl + S</strong>: Save entry |{' '}
                  <strong>Cmd/Ctrl + Enter</strong>: Save + AI insight | <strong>Escape</strong>: Go back. See
                  our{' '}
                  <Link href="/docs#shortcuts" className="text-stoic-dark underline hover:no-underline">
                    Docs
                  </Link>{' '}
                  for the full list.
                </p>
              </div>

              <div className="pb-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  My question isn't answered here. What should I do?
                </h4>
                <p className="text-slate-600">
                  Email us at{' '}
                  <a href="mailto:support@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                    support@stoicaf.co
                  </a>
                  . We respond to every message, usually within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Support CTA */}
        <section className="mt-16 p-8 bg-stoic-dark/5 rounded-2xl border border-stoic-dark/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Priority Support?</h2>
          <p className="text-slate-600 mb-6">
            Upgrade to Pro for faster response times and direct access to our team.
          </p>
          <Link href="/pro">
            <Button className="bg-stoic-dark hover:bg-stoic-dark/90">Learn About Pro</Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
