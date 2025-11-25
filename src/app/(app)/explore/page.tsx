'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  Trophy,
  Heart,
  Target,
  Compass,
  Sparkles,
  BookOpen,
  Lock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/use-subscription';
import { UpgradePrompt } from '@/components/UpgradePrompt';

const programs = [
  {
    id: 'money',
    title: 'Money',
    theme: 'Your Wealth Isn\'t Your Worth',
    description: 'Reframe your relationship with money through Stoic wisdom. 30 days of journaling to separate self-worth from net worth.',
    icon: DollarSign,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'ego',
    title: 'Ego',
    theme: 'Let Results Talk',
    description: 'Quiet the inner voice that seeks validation. 30 days of exercises to find confidence without arrogance.',
    icon: Trophy,
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    theme: 'Lead With Respect',
    description: 'Build stronger connections through understanding. 30 days to improve how you relate to others.',
    icon: Heart,
    color: 'pink',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200',
  },
  {
    id: 'discipline',
    title: 'Discipline',
    theme: 'Small Reps, Big Gains',
    description: 'Master the art of consistency. 30 days of building unshakeable habits and mental toughness.',
    icon: Target,
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
];

const additionalPrograms = [
  {
    id: 'freestyle',
    title: 'Freestyle',
    theme: 'Your Journey, Your Way',
    description: 'No structured prompts - journal freely with AI-suggested topics based on your patterns.',
    icon: Sparkles,
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-600',
    borderColor: 'border-slate-200',
    available: true,
  },
  {
    id: 'workbook',
    title: 'Stoic AF Workbook',
    theme: 'The Complete Program',
    description: 'Follow along with the official Stoic AF workbook. Requires book purchase or Pro subscription.',
    icon: BookOpen,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    locked: true,
  },
];

export default function ExplorePage() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { access, isPro } = useSubscription();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const currentProgram = userProfile?.pillarFocus || null;

  const handleProgramSelect = (programId: string) => {
    // Check if user can access all programs (Pro only after they've used their free one)
    if (!access.canAccessAllPrograms && currentProgram && currentProgram !== programId) {
      setShowUpgradePrompt(true);
      return;
    }
    // TODO: Actually select program - for now just navigate to settings
    router.push(`/settings?tab=Preferences`);
  };

  const handleWorkbookUnlock = () => {
    setShowUpgradePrompt(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-8 h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Explore Programs</h1>
        </div>
        <p className="text-slate-600">
          Choose a 30-day program to guide your journaling journey. Each program focuses on a different aspect of Stoic philosophy.
        </p>
      </div>

      {/* Current Program Banner */}
      {currentProgram && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Current Program
                </Badge>
                <span className="font-medium capitalize">{currentProgram}</span>
              </div>
              <Button variant="outline" size="sm">
                View Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Programs Grid */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program) => {
            const Icon = program.icon;
            const isActive = currentProgram === program.id;

            return (
              <Card
                key={program.id}
                className={`transition-all hover:shadow-md cursor-pointer ${program.borderColor} ${isActive ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${program.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${program.textColor}`} />
                    </div>
                    {isActive && (
                      <Badge className="bg-primary text-white">Active</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-3">{program.title}</CardTitle>
                  <CardDescription className={`${program.textColor} font-medium`}>
                    {program.theme}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">30 days</span>
                    <Button
                      variant={isActive ? "secondary" : "default"}
                      size="sm"
                      disabled={isActive}
                      onClick={() => handleProgramSelect(program.id)}
                    >
                      {isActive ? 'Current' : 'Select Program'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Programs */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">More Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalPrograms.map((program) => {
            const Icon = program.icon;

            return (
              <Card
                key={program.id}
                className={`transition-all hover:shadow-md ${program.borderColor} ${program.locked ? 'opacity-75' : 'cursor-pointer'}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${program.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${program.textColor}`} />
                    </div>
                    {program.locked && (
                      <Badge variant="outline" className="gap-1">
                        <Lock className="w-3 h-3" />
                        Pro
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-3">{program.title}</CardTitle>
                  <CardDescription className={`${program.textColor} font-medium`}>
                    {program.theme}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {program.locked ? 'Requires Pro' : 'Flexible'}
                    </span>
                    <Button
                      variant={program.locked ? "outline" : "default"}
                      size="sm"
                      onClick={() => program.locked ? handleWorkbookUnlock() : handleProgramSelect(program.id)}
                    >
                      {program.locked ? 'Unlock' : 'Select'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="mt-12 text-center py-8 border-t border-slate-200">
        <p className="text-slate-500 text-sm">
          More programs coming soon! Have a suggestion?{' '}
          <a href="/support" className="text-primary hover:underline">Let us know</a>
        </p>
      </div>

      {/* Upgrade Prompt */}
      <UpgradePrompt
        open={showUpgradePrompt}
        onOpenChange={setShowUpgradePrompt}
        feature="programs"
      />
    </div>
  );
}
