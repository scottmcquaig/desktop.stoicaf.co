'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-black text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: November 24, 2025</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Stoic AF, your privacy is sacred. Your journal entries are personal, and we treat them with the
              respect they deserve. This policy explains what data we collect, how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Account Information</h3>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Email address (for authentication and account recovery)</li>
              <li>Display name (optional)</li>
              <li>Profile photo (optional)</li>
              <li>Authentication provider (Google, email/password)</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Journal Content</h3>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Journal entries and blocks (text content)</li>
              <li>Mood scores and pillar selections</li>
              <li>Entry dates and timestamps</li>
              <li>Saved layouts and preferences</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">Usage Data</h3>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Login history and session data</li>
              <li>Feature usage patterns (for product improvement)</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Provide the Service:</strong> Store your entries, generate AI insights, sync across
                devices
              </li>
              <li>
                <strong>Improve Features:</strong> Analyze usage patterns to make the app better (aggregated,
                anonymized data only)
              </li>
              <li>
                <strong>Communicate:</strong> Send important updates, respond to support requests, deliver
                optional email reminders
              </li>
              <li>
                <strong>Security:</strong> Protect against fraud, abuse, and unauthorized access
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">AI Processing</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              When you use AI features (ChadGPT insights, weekly reflections), your journal content is processed
              by Google Gemini AI. This processing happens in real-time and is not used to train AI models. Your
              data is sent securely and is not retained by Google beyond the immediate processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Sharing</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              <strong>We do not sell your data. Period.</strong>
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We only share data with trusted service providers necessary to operate the service:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Firebase (Google):</strong> Hosting, authentication, database storage
              </li>
              <li>
                <strong>Stripe:</strong> Payment processing (Pro subscriptions only)
              </li>
              <li>
                <strong>Google Gemini:</strong> AI processing (when you use AI features)
              </li>
            </ul>
            <p className="text-lg text-slate-600 leading-relaxed mt-4">
              All service providers are contractually required to protect your data and use it only for providing
              their services to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Your data is encrypted in transit (HTTPS/TLS) and at rest (AES-256). We use Firebase Security
              Rules to ensure users can only access their own data. While no system is 100% secure, we follow
              industry best practices to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Access:</strong> View all data we have about you
              </li>
              <li>
                <strong>Export:</strong> Download all your journal entries (Settings → Export Data)
              </li>
              <li>
                <strong>Delete:</strong> Permanently delete your account and all associated data (Settings →
                Delete Account)
              </li>
              <li>
                <strong>Correct:</strong> Update your profile information at any time
              </li>
              <li>
                <strong>Opt-Out:</strong> Disable email reminders and notifications
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We retain your account data as long as your account is active. If you delete your account, all
              data is permanently deleted within 30 days. Backup copies are retained for up to 90 days for
              disaster recovery purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We use essential cookies for authentication and session management. We do not use tracking cookies
              or third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF is not intended for users under 13 years old. We do not knowingly collect information
              from children under 13. If you believe we have collected data from a child, please contact us
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">International Users</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF is operated from the United States. If you're accessing from outside the US, your data
              may be transferred to and stored in the US. By using the service, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We may update this policy occasionally. We'll notify you of significant changes via email or an
              in-app notification. Continued use of the service after changes constitutes acceptance.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Questions about this policy? Email us at{' '}
              <a href="mailto:privacy@stoicaf.co" className="text-stoic-dark underline hover:no-underline">
                privacy@stoicaf.co
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
