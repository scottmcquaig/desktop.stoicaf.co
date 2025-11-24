'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft, Mail, MessageCircle, Book, Bug } from 'lucide-react';
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
              <MessageCircle className="w-6 h-6 text-stoic-dark" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">In-App Chat</h3>
            <p className="text-slate-600">
              Pro members can access priority chat support directly from the app.
            </p>
            <Link href="/dashboard" className="inline-flex items-center text-stoic-dark font-medium hover:underline">
              Go to Dashboard →
            </Link>
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

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How do I upgrade to Pro?</h3>
              <p className="text-slate-600">
                Go to Settings → Subscription and click "Upgrade to Pro." You can start with a 7-day free trial.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Can I cancel my Pro subscription?</h3>
              <p className="text-slate-600">
                Yes, anytime. Go to Settings → Subscription → Cancel. You'll keep Pro access until the end of
                your billing period.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How do I export my journal entries?</h3>
              <p className="text-slate-600">
                Go to Settings → Data & Privacy → Export Data. You'll receive a JSON file with all your entries.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Is my data secure?</h3>
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can I access Stoic AF from multiple devices?
              </h3>
              <p className="text-slate-600">
                Yes! Your entries sync automatically across all devices when you're logged in.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What happens if I delete my account?</h3>
              <p className="text-slate-600">
                All your data will be permanently deleted within 30 days. Make sure to export your entries first
                if you want to keep them!
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does ChadGPT work?</h3>
              <p className="text-slate-600">
                ChadGPT uses Google Gemini AI to analyze your entries and provide insights. Your data is
                processed securely and not used to train AI models.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Do you offer student discounts?</h3>
              <p className="text-slate-600">
                Not yet, but we're working on it! Email us at{' '}
                <a href="mailto:support@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                  support@stoicaf.co
                </a>{' '}
                if you're interested.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                My question isn't answered here. What should I do?
              </h3>
              <p className="text-slate-600">
                Email us at{' '}
                <a href="mailto:support@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                  support@stoicaf.co
                </a>
                . We respond to every message.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Support CTA */}
        <section className="mt-16 p-8 bg-stoic-dark/5 rounded-2xl border border-stoic-dark/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Priority Support?</h2>
          <p className="text-slate-600 mb-6">
            Upgrade to Pro for faster response times, in-app chat, and direct access to our team.
          </p>
          <Link href="/">
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
