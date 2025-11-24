'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { StoicLogo } from '@/components/StoicLogo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Zap,
  TrendingUp,
  Sparkles,
  ShieldOff,
  DollarSign,
  User,
  Heart,
  Target,
  Sun,
  Columns,
  Moon,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type ChadTone = 'gentle' | 'reality-check' | 'drill-sergeant' | 'roast-me';

const CHAD_TONES: { id: ChadTone; label: string; description: string; messages: string[] }[] = [
  {
    id: 'gentle',
    label: 'Gentle',
    description: 'Supportive and encouraging',
    messages: [
      "You're making progress, even if it doesn't feel like it. The fact that you're here journaling shows you care about growth.",
      "I see you're working through some challenges. Remember, every small step counts toward building the life you want.",
    ],
  },
  {
    id: 'reality-check',
    label: 'Reality Check',
    description: 'Honest and direct',
    messages: [
      "Your last 3 entries show you're avoiding the hard convo. Stop delaying. One message. Today.",
      "Discipline looks good this week. Keep the streak alive. Small wins compound.",
    ],
  },
  {
    id: 'drill-sergeant',
    label: 'Drill Sergeant',
    description: 'Tough and demanding',
    messages: [
      "Zero excuses. You said you'd handle it Monday. It's Thursday. What's the hold-up?",
      "Three days of missed workouts. Three days of choosing comfort over commitment. Do better.",
    ],
  },
  {
    id: 'roast-me',
    label: 'Roast Mode',
    description: 'Brutally honest (you asked for it)',
    messages: [
      "Oh look, another entry about 'starting Monday.' Your Mondays have Mondays at this point. Just start today, coward.",
      "You're spending more time journaling about discipline than actually being disciplined. The irony is almost impressive.",
    ],
  },
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const [selectedTone, setSelectedTone] = useState<ChadTone>('reality-check');

  // Redirect if authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const navigateTone = (direction: 'prev' | 'next') => {
    const currentIndex = CHAD_TONES.findIndex((t) => t.id === selectedTone);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : CHAD_TONES.length - 1;
      setSelectedTone(CHAD_TONES[newIndex].id);
    } else {
      const newIndex = currentIndex < CHAD_TONES.length - 1 ? currentIndex + 1 : 0;
      setSelectedTone(CHAD_TONES[newIndex].id);
    }
  };

  const currentTone = CHAD_TONES.find((t) => t.id === selectedTone) || CHAD_TONES[1];

  // Show nothing while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse">
          <StoicLogo className="w-16 h-16" />
        </div>
      </div>
    );
  }

  // Don't show landing page if user is logged in (will redirect)
  if (user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#4B90C8] to-[#3A7AB5] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Copy */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-6xl lg:text-7xl font-black tracking-tight">
                    STOIC AF
                  </h1>
                  <p className="text-2xl lg:text-3xl font-bold text-white/90">
                    Your daily life hack.
                  </p>
                  <p className="text-xl text-white/80">
                    Ancient wisdom. Modern roast. Eternal gains.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Start your Stoic era.</h2>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Track discipline, ego, money, and relationships with one clean, fast-as-hell journal.
                    <br />
                    AI-powered prompts. Zero fluff. Built for everyday use.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => openAuthModal('signup')}
                    className="bg-white text-[#4B90C8] hover:bg-white/90 text-lg font-bold h-14 px-8 shadow-xl"
                  >
                    Get Started
                  </Button>
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="text-white/90 hover:text-white font-medium underline underline-offset-4"
                  >
                    Already have an account? Sign in →
                  </button>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Now with ChadGPT</span>
                </div>
              </div>

              {/* Right: Phone Mockup Placeholder */}
              <div className="relative lg:ml-auto">
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <StoicLogo className="w-10 h-10" />
                        <span className="font-bold text-xl text-slate-900">STOIC AF</span>
                      </div>
                      <div className="space-y-4">
                        <div className="h-24 bg-slate-100 rounded-lg animate-pulse" />
                        <div className="h-16 bg-slate-50 rounded-lg" />
                        <div className="h-16 bg-slate-50 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Stoic AF */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                  Journaling shouldn't feel like homework.
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Stoic AF removes the friction so you can write, reflect, and move on with your day.
                  <br />
                  <strong className="text-slate-900">Fast. Offline-friendly. Minimal. Actually useful.</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 space-y-3 border-2 hover:border-[#4B90C8] transition-colors">
                  <Zap className="w-10 h-10 text-[#4B90C8]" />
                  <h3 className="font-bold text-lg">Lightning-fast local editor</h3>
                </Card>
                <Card className="p-6 space-y-3 border-2 hover:border-[#4B90C8] transition-colors">
                  <TrendingUp className="w-10 h-10 text-[#4B90C8]" />
                  <h3 className="font-bold text-lg">Daily scorecards & trend tracking</h3>
                </Card>
                <Card className="p-6 space-y-3 border-2 hover:border-[#4B90C8] transition-colors">
                  <Sparkles className="w-10 h-10 text-[#4B90C8]" />
                  <h3 className="font-bold text-lg">Prompts tailored to your entries</h3>
                </Card>
                <Card className="p-6 space-y-3 border-2 hover:border-[#4B90C8] transition-colors">
                  <ShieldOff className="w-10 h-10 text-[#4B90C8]" />
                  <h3 className="font-bold text-lg">Zero ads. Zero dopamine traps.</h3>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Four Pillars */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                The Four Pillars
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every entry starts with what matters most
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 space-y-4 text-center hover:shadow-xl transition-shadow border-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Money</h3>
                <p className="text-slate-600">Track decisions, stressors, habits</p>
              </Card>

              <Card className="p-8 space-y-4 text-center hover:shadow-xl transition-shadow border-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Ego</h3>
                <p className="text-slate-600">Spot patterns that kill progress</p>
              </Card>

              <Card className="p-8 space-y-4 text-center hover:shadow-xl transition-shadow border-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Relationships</h3>
                <p className="text-slate-600">Reflect without oversharing</p>
              </Card>

              <Card className="p-8 space-y-4 text-center hover:shadow-xl transition-shadow border-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Discipline</h3>
                <p className="text-slate-600">Measure the reps, not your feelings</p>
              </Card>
            </div>

            <p className="text-center text-lg text-slate-600 mt-12 max-w-2xl mx-auto">
              Stoic AF adapts around your pattern so your prompts get better over time.
            </p>
          </div>
        </section>

        {/* Daily Templates */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                Templates that don't make you cringe
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Sun, name: 'Morning Intent', color: 'amber' },
                { icon: Columns, name: 'Dichotomy of Control', color: 'purple' },
                { icon: Moon, name: 'Evening Balance', color: 'indigo' },
                { icon: Target, name: 'The Audit', color: 'slate' },
              ].map((template) => (
                <Card key={template.name} className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                  <template.icon className={`w-8 h-8 text-${template.color}-600`} />
                  <h3 className="font-bold text-lg">{template.name}</h3>
                </Card>
              ))}
            </div>

            <p className="text-center text-lg text-slate-600 mt-12 max-w-2xl mx-auto">
              Add one per day—or stack multiple into your "living notebook."
            </p>
          </div>
        </section>

        {/* AI / ChadGPT */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#4B90C8]/10 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#4B90C8]" />
                  <span className="text-sm font-bold text-[#4B90C8]">AI-POWERED</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                  Meet ChadGPT—your AI mentor with adjustable personality.
                </h2>

                <p className="text-xl text-slate-600 leading-relaxed">
                  Choose your coaching style. From gentle encouragement to brutal honesty, ChadGPT adapts to
                  what you need.
                </p>

                {/* Tone Selector */}
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateTone('prev')}
                      className="p-2 rounded-full hover:bg-white transition-colors"
                      aria-label="Previous tone"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>

                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-slate-900">{currentTone.label}</div>
                      <div className="text-sm text-slate-500">{currentTone.description}</div>
                    </div>

                    <button
                      onClick={() => navigateTone('next')}
                      className="p-2 rounded-full hover:bg-white transition-colors"
                      aria-label="Next tone"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    {CHAD_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          tone.id === selectedTone ? 'bg-[#4B90C8] w-8' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Select ${tone.label} tone`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  <strong>Fast, cheap, private.</strong> Your entries stay yours.
                </p>
              </div>

              <div className="relative">
                <Card className="p-8 space-y-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#4B90C8] flex items-center justify-center text-white font-bold text-xl">
                      C
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">ChadGPT</p>
                      <p className="text-xs text-slate-500">{currentTone.label} Mode</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentTone.messages.map((message, index) => (
                      <div key={index} className="bg-[#4B90C8]/5 rounded-lg p-4 animate-fadeIn">
                        <p className="text-slate-700">{message}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                People building their Stoic era
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Best journaling experience I've ever used.",
                'Templates feel tailor-made, not generic.',
                'ChadGPT is the only AI that actually motivates me.',
              ].map((testimonial, i) => (
                <Card key={i} className="p-8 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 italic">"{testimonial}"</p>
                  <p className="text-sm text-slate-500 font-medium">— Stoic AF User</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                Simple. Affordable. No ads.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free */}
              <Card className="p-8 space-y-6 border-2">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Free</h3>
                  <div className="text-4xl font-black">$0</div>
                  <p className="text-slate-600">Forever free</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>1 entry per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>All templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Basic prompts</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full h-12 font-bold"
                  onClick={() => openAuthModal('signup')}
                >
                  Get Started Free
                </Button>
              </Card>

              {/* Pro */}
              <Card className="p-8 space-y-6 border-4 border-[#4B90C8] relative shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4B90C8] text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Stoic AF Pro</h3>
                  <div className="text-4xl font-black">$5<span className="text-lg text-slate-600">/mo</span></div>
                  <p className="text-slate-600">7-day free trial</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Unlimited entries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">All templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Advanced AI prompts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Weekly insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4B90C8] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Priority updates</span>
                  </li>
                </ul>

                <Button
                  className="w-full h-12 font-bold bg-[#4B90C8] hover:bg-[#3A7AB5] text-white"
                  onClick={() => openAuthModal('signup')}
                >
                  Start Free Trial
                </Button>
              </Card>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              No credit card required for free trial
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <StoicLogo className="w-10 h-10" />
                <div>
                  <div className="font-black text-xl">STOIC AF</div>
                  <div className="text-sm text-slate-400">Ancient wisdom. Modern roast.</div>
                </div>
              </div>

              <div className="flex gap-8 text-sm">
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors">
                  Support
                </Link>
              </div>
            </div>

            <div className="text-center text-sm text-slate-500 mt-8 pt-8 border-t border-slate-800">
              © {new Date().getFullYear()} Stoic AF. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultMode={authModalMode} />
    </>
  );
}
