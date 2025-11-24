'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { AuthModal } from '@/components/AuthModal';
import { ArrowLeft, Check, Sparkles, Zap, TrendingUp, Calendar, Download, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ProPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
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

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#4B90C8] to-[#3A7AB5] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-bold">STOIC AF PRO</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Unlock Your Full Potential</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Everything in Free, plus unlimited entries, advanced AI features, and priority support. Just $5/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setAuthModalOpen(true)}
                className="bg-white text-[#4B90C8] hover:bg-white/90 text-lg font-bold h-14 px-8 shadow-xl"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-4">No credit card required for trial</p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-slate-900 text-center mb-12">Free vs Pro</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Tier */}
              <Card className="p-8 space-y-6 border-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Free</h3>
                  <div className="text-4xl font-black mt-2">$0</div>
                  <p className="text-slate-600 mt-2">Forever free</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>1 entry per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>All four pillars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>All templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Basic prompts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Mood tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Streak counter</span>
                  </li>
                </ul>
              </Card>

              {/* Pro Tier */}
              <Card className="p-8 space-y-6 border-4 border-[#4B90C8] relative shadow-xl bg-gradient-to-br from-white to-[#4B90C8]/5">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4B90C8] text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Stoic AF Pro</h3>
                  <div className="text-4xl font-black mt-2">
                    $5<span className="text-lg text-slate-600">/mo</span>
                  </div>
                  <p className="text-slate-600 mt-2">7-day free trial</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Unlimited entries per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Advanced AI insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Weekly AI summaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Full history & search</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Export all data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Early access to new features</span>
                  </li>
                </ul>

                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full h-12 font-bold bg-[#4B90C8] hover:bg-[#3A7AB5] text-white"
                >
                  Start Free Trial
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-slate-900 text-center mb-12">
              Why Upgrade to Pro?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Advanced AI Features</h3>
                <p className="text-slate-600">
                  Get deeper insights from ChadGPT, weekly summaries, and personalized coaching based on your
                  patterns.
                </p>
              </Card>

              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Limits</h3>
                <p className="text-slate-600">
                  Journal as much as you want. Multiple entries per day, unlimited templates, full creative
                  freedom.
                </p>
              </Card>

              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Track Your Progress</h3>
                <p className="text-slate-600">
                  Access your complete history, search all entries, and see your growth over months and years.
                </p>
              </Card>

              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Weekly Summaries</h3>
                <p className="text-slate-600">
                  AI-generated weekly reflections that highlight patterns, progress, and areas for focus.
                </p>
              </Card>

              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <Download className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Export Everything</h3>
                <p className="text-slate-600">
                  Your data is yours. Export all entries, insights, and stats anytime in multiple formats.
                </p>
              </Card>

              <Card className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4B90C8]/10 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#4B90C8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Priority Support</h3>
                <p className="text-slate-600">
                  Get faster responses and direct access to our team when you need help.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-slate-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">How does the free trial work?</h3>
                <p className="text-slate-600">
                  Start with a 7-day free trial of Pro. No credit card required. After the trial, you can
                  upgrade to Pro or continue with the free plan.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-slate-600">
                  Yes! Cancel anytime from your account settings. You'll keep Pro access until the end of your
                  billing period.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">What happens to my data if I downgrade?</h3>
                <p className="text-slate-600">
                  Your data is never deleted. If you downgrade to Free, you'll keep all existing entries but
                  new entries will be limited to 1 per day.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Do you offer discounts?</h3>
                <p className="text-slate-600">
                  We're working on student and annual discounts. Email{' '}
                  <a href="mailto:support@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                    support@stoicaf.co
                  </a>{' '}
                  if you're interested.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to upgrade?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Start your 7-day free trial and unlock the full power of Stoic AF.
            </p>
            <Button
              size="lg"
              onClick={() => setAuthModalOpen(true)}
              className="bg-[#4B90C8] hover:bg-[#3A7AB5] text-white text-lg font-bold h-14 px-8"
            >
              Start Free Trial
            </Button>
            <p className="text-sm text-slate-500 mt-4">No credit card required</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200">
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

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultMode="signup" />
    </>
  );
}
