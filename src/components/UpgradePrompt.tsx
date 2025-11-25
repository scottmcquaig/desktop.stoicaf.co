'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles, Crown, Zap, BookOpen, Brain, Download } from 'lucide-react';
import { FEATURE_LIMITS } from '@/hooks/use-subscription';

interface UpgradePromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: 'entries' | 'ai-insights' | 'weekly-reflection' | 'programs' | 'export';
  currentUsage?: number;
}

const featureInfo = {
  entries: {
    icon: BookOpen,
    title: 'Entry Limit Reached',
    description: "You've used all your free journal entries this month.",
    benefit: 'Unlimited journal entries',
  },
  'ai-insights': {
    icon: Brain,
    title: 'AI Insights Limit Reached',
    description: "You've used all your free AI insights this month.",
    benefit: 'Unlimited AI-powered insights from ChadGPT',
  },
  'weekly-reflection': {
    icon: Sparkles,
    title: 'Pro Feature',
    description: 'Weekly reflection summaries are a Pro feature.',
    benefit: 'AI-generated weekly reflection summaries',
  },
  programs: {
    icon: Zap,
    title: 'Pro Feature',
    description: 'Access to all pillar programs requires Pro.',
    benefit: 'All 4 pillar programs (30 days each)',
  },
  export: {
    icon: Download,
    title: 'Pro Feature',
    description: 'Data export is a Pro feature.',
    benefit: 'Export your data anytime',
  },
};

export function UpgradePrompt({
  open,
  onOpenChange,
  feature,
  currentUsage,
}: UpgradePromptProps) {
  const router = useRouter();
  const info = featureInfo[feature];
  const Icon = info.icon;
  const limit = FEATURE_LIMITS.free[
    feature === 'entries' ? 'entriesPerMonth' :
    feature === 'ai-insights' ? 'aiInsightsPerMonth' :
    feature === 'weekly-reflection' ? 'weeklyReflections' :
    feature === 'programs' ? 'allPillarPrograms' : 'exportData'
  ];

  const handleUpgrade = () => {
    onOpenChange(false);
    router.push('/settings?tab=Subscription');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Icon className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-center">{info.title}</DialogTitle>
          <DialogDescription className="text-center">
            {info.description}
            {typeof limit === 'number' && currentUsage !== undefined && (
              <span className="block mt-2 text-sm font-medium text-slate-700">
                Used: {currentUsage} / {limit} this month
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl p-4 my-4 border border-sky-100">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-slate-900">Upgrade to Pro</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500" />
              {info.benefit}
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Unlimited journal entries
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500" />
              All 4 pillar programs
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Weekly AI reflections
            </li>
          </ul>
          <p className="text-center text-lg font-bold text-slate-900 mt-4">
            Only $4.99/month
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600"
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Inline banner version for showing in pages
interface UpgradeBannerProps {
  feature: 'entries' | 'ai-insights';
  remaining: number | 'unlimited';
  className?: string;
}

export function UpgradeBanner({ feature, remaining, className = '' }: UpgradeBannerProps) {
  const router = useRouter();

  if (remaining === 'unlimited' || remaining > 3) return null;

  const isEntries = feature === 'entries';
  const label = isEntries ? 'journal entries' : 'AI insights';

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg border ${
        remaining === 0
          ? 'bg-red-50 border-red-200 text-red-800'
          : 'bg-amber-50 border-amber-200 text-amber-800'
      } ${className}`}
    >
      <div className="flex items-center gap-2 text-sm">
        {remaining === 0 ? (
          <span className="font-medium">No {label} remaining this month</span>
        ) : (
          <span>
            <span className="font-bold">{remaining}</span> {label} remaining
          </span>
        )}
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push('/settings?tab=Subscription')}
        className="shrink-0 border-current text-current hover:bg-white/50"
      >
        <Crown className="mr-1 h-3 w-3" />
        Upgrade
      </Button>
    </div>
  );
}
