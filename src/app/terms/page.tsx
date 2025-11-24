'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
        <h1 className="text-4xl font-black text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: November 24, 2025</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              By accessing or using Stoic AF ("the Service"), you agree to be bound by these Terms of Service
              ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Description of Service</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF is a web-based journaling platform that provides:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Daily journaling tools with guided prompts based on Stoic philosophy</li>
              <li>AI-powered insights and coaching (ChadGPT)</li>
              <li>Progress tracking across four life pillars</li>
              <li>Optional Pro subscription with additional features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Accounts</h2>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Account Creation</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              To use the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Keep your password secure and confidential</li>
              <li>Be responsible for all activity under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Age Requirements</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              You must be at least 13 years old to use the Service. If you are under 18, you must have
              permission from a parent or guardian.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptable Use</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Violate the rights of others, including intellectual property rights</li>
              <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) to access the Service</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Upload viruses, malware, or malicious code</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Subscription and Payments</h2>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Free Tier</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              The Free tier includes basic journaling features with limitations (1 entry per day, basic prompts).
              We may change Free tier limitations at any time with notice.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Pro Subscription</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              The Pro subscription ($5/month) provides unlimited entries, advanced AI features, and priority
              support. By subscribing:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>You authorize us to charge your payment method monthly until canceled</li>
              <li>Subscriptions auto-renew unless canceled before the renewal date</li>
              <li>You can cancel anytime from your account settings</li>
              <li>Cancellations take effect at the end of the current billing period</li>
              <li>No refunds for partial months or unused features</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Price Changes</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              We may change subscription prices with 30 days' notice. Existing subscribers will be notified
              before any price increase takes effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Your Content</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              You own all journal entries and content you create ("Your Content"). You grant us a license to
              use, store, and process Your Content solely to provide the Service (including AI processing).
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Our Content</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              The Service, including all prompts, UI, code, and branding, is owned by SwgSzn LLC. You may not
              copy, modify, distribute, or create derivative works without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">AI Features and Limitations</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              AI features (ChadGPT, insights) are provided "as is" and should not be considered professional
              advice. They are for informational and motivational purposes only. Do not rely on AI outputs for
              medical, legal, financial, or other professional decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimers</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong>
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>We do not guarantee the Service will be uninterrupted, error-free, or secure</li>
              <li>We are not responsible for data loss (though we make regular backups)</li>
              <li>We are not liable for damages arising from use of the Service</li>
              <li>The Service is not a substitute for professional mental health care</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, SwgSzn LLC shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of the Service. Our total
              liability shall not exceed the amount you paid us in the past 12 months (or $100 if greater).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We may terminate or suspend your account immediately, without notice, for violations of these
              Terms. You may terminate your account at any time from Settings. Upon termination, your right to
              use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We may modify these Terms at any time. We'll notify you of significant changes via email or
              in-app notification. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              These Terms are governed by the laws of the State of Texas, United States, without regard
              to conflict of law provisions. Any disputes shall be resolved in the courts of Texas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Severability</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain
              in full force and effect.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:legal@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                legal@stoicaf.co
              </a>{' '}
              or visit our{' '}
              <Link href="/support" className="text-stoic-dark underline hover:no-underline">
                Support page
              </Link>
              .
            </p>
          </section>
        </div>
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
