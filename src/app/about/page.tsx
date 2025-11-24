'use client';

import Link from 'next/link';
import { StoicLogo } from '@/components/StoicLogo';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
        <h1 className="text-4xl font-black text-slate-900 mb-8">About Stoic AF</h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF combines ancient Stoic philosophy with modern technology to help you build emotional
              resilience through guided journaling. We believe that daily reflection, rooted in timeless wisdom,
              is the key to navigating modern life's challenges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Built</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF is a desktop journaling platform designed to make philosophical practice accessible and
              practical. We've stripped away the fluff and built a tool that helps you:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Track progress across four life pillars: Money, Ego, Relationships, and Discipline</li>
              <li>Receive daily prompts based on Stoic teachings</li>
              <li>Get honest, actionable insights from ChadGPT (our AI coach)</li>
              <li>Build sustainable habits through consistent reflection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Philosophy</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              We're inspired by the Stoics—Marcus Aurelius, Epictetus, Seneca—who believed that virtue and
              wisdom come from understanding what you can control and letting go of what you can't.
            </p>
            <blockquote className="border-l-4 border-stoic-dark pl-4 italic text-slate-700 my-6">
              "You have power over your mind—not outside events. Realize this, and you will find strength."
              <br />
              <span className="text-sm not-italic text-slate-500">— Marcus Aurelius</span>
            </blockquote>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF brings this philosophy into the 21st century with tools designed for the realities of
              modern life.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stoic AF is built by SwgSzn LLC, a small team passionate about personal development and practical
              philosophy. We're not here to sell you courses or convince you to quit your job and meditate in
              the mountains. We're here to give you a tool that helps you show up better every day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy First</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Your journal entries are yours. We take privacy seriously. Your data is encrypted, never sold, and
              only used to provide you with better insights. Read our{' '}
              <Link href="/privacy" className="text-stoic-dark underline hover:no-underline">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Have questions or feedback? We'd love to hear from you.{' '}
              <Link href="/support" className="text-stoic-dark underline hover:no-underline">
                Visit our Support page
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
