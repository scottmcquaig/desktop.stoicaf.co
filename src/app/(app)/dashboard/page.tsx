'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Flame,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Loader2,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Target,
  Lightbulb,
  ArrowUpRight,
  Edit3,
  Calendar,
  Trophy,
  Zap,
  Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';
import { useAuth } from '@/contexts/AuthContext';
import {
  calculateStreak,
  getRecentEntries,
  getRecentEntriesForProgress,
  getEntryCount,
} from '@/lib/firebase/journal';
import { getDailyQuote } from '@/lib/dailyQuote';
import { toast } from 'sonner';
import type { JournalEntry, MoodScore, Pillar } from '@/lib/types';
import { useSubscription } from '@/hooks/use-subscription';
import { UpgradePrompt } from '@/components/UpgradePrompt';

interface DailyQuoteData {
  quote: string;
  author: string;
  pillar: Pillar;
  broTranslation: string;
  todaysChallenge?: string;
}

interface WeeklyReflectionData {
  summary: string;
  keyThemes: string[];
  insights: string[];
  growthAreas: string[];
  recommendations: string[];
}

// Chad's personalized greetings based on streak
const getChadGreeting = (streak: number, firstName: string, hour: number): string => {
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  if (streak === 0) {
    const messages = [
      `Hey ${firstName}! Ready to start your Stoic journey? One day at a time, bro.`,
      `${firstName}! Today's the day. Let's build something powerful together.`,
      `Welcome back, ${firstName}. The best time to start was yesterday. Second best? Right now.`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  if (streak === 1) {
    return `One day down, ${firstName}! That first entry is the hardest. Keep the momentum going! 💪`;
  }

  if (streak < 7) {
    return `${streak} days strong, ${firstName}! You're building something real here. Don't stop now.`;
  }

  if (streak < 14) {
    return `A week+ streak?! ${firstName}, you're becoming a Stoic machine. Marcus would be proud.`;
  }

  if (streak < 30) {
    return `${streak} days! ${firstName}, you're not just journaling—you're transforming. This is the work.`;
  }

  if (streak < 60) {
    return `${streak} days of consistent Stoic practice. ${firstName}, you're in the top 1% now. Absolute legend.`;
  }

  return `${streak} DAYS?! ${firstName}, you're not playing games. You ARE the game. Seneca would bow. 👑`;
};

// Get motivational subtext based on time of day
const getTimeBasedSubtext = (hour: number): string => {
  if (hour < 6) return "Early bird catches the wisdom. Let's go.";
  if (hour < 12) return "Morning reflections hit different.";
  if (hour < 17) return "Perfect time for a midday reset.";
  if (hour < 21) return "Evening audit time. How'd you show up today?";
  return "Night owl journaling. The quiet hours bring clarity.";
};

const DashboardPage: React.FC = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const { access, usage, isSubscribed } = useSubscription();
  const [streak, setStreak] = useState<number>(0);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [entryCount, setEntryCount] = useState<number>(0);
  const [pillarProgress, setPillarProgress] = useState<Record<Pillar, number>>({
    money: 0,
    ego: 0,
    relationships: 0,
    discipline: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState<DailyQuoteData | null>(null);

  // Weekly reflection state
  const [weeklyReflection, setWeeklyReflection] = useState<WeeklyReflectionData | null>(null);
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [reflectionError, setReflectionError] = useState<string | null>(null);

  // Upgrade prompt state
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Time for personalized greeting
  const [currentHour] = useState(new Date().getHours());

  const PROGRESS_WINDOW = 30;

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [streakData, entries, count, progressEntries] = await Promise.all([
        calculateStreak(user.uid),
        getRecentEntries(user.uid, 5),
        getEntryCount(user.uid),
        getRecentEntriesForProgress(user.uid, PROGRESS_WINDOW),
      ]);

      setStreak(streakData);
      setRecentEntries(entries);
      setEntryCount(count);

      // Calculate pillar progress from the most recent 30 entries
      const pillarCounts: Record<Pillar, number> = {
        money: 0,
        ego: 0,
        relationships: 0,
        discipline: 0,
      };

      progressEntries.forEach((entry) => {
        if (entry.pillar) {
          pillarCounts[entry.pillar]++;
        }
      });

      // Convert to percentages based on the sampled window so values remain within 0-100
      const totalEntries = progressEntries.length || 1;
      setPillarProgress({
        money: Math.round((pillarCounts.money / totalEntries) * 100),
        ego: Math.round((pillarCounts.ego / totalEntries) * 100),
        relationships: Math.round((pillarCounts.relationships / totalEntries) * 100),
        discipline: Math.round((pillarCounts.discipline / totalEntries) * 100),
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Load daily quote
  useEffect(() => {
    getDailyQuote().then(setDailyQuote).catch(console.error);
  }, []);

  // Generate weekly reflection
  const generateWeeklyReflection = useCallback(async () => {
    if (!user || !userProfile?.pillarFocus) return;

    // Check subscription access for weekly reflections
    if (!access.canUseWeeklyReflection) {
      setShowUpgradePrompt(true);
      return;
    }

    setIsLoadingReflection(true);
    setReflectionError(null);

    try {
      // Use recentEntries that are already loaded, or fetch if needed
      let entries = recentEntries;
      if (entries.length === 0) {
        const { getEntriesForLastNDays } = await import('@/lib/firebase/journal');
        entries = await getEntriesForLastNDays(user.uid, 7);
      }

      if (entries.length === 0) {
        setReflectionError('Not enough entries this week for a reflection.');
        return;
      }

      // Format entries for AI processing
      const formattedEntries = entries.map(entry => {
        // Extract content from blocks
        const content = entry.blocks
          ?.map((block) => {
            if (block.type === 'dichotomy') {
              const parts: string[] = [];
              if (block.inControl) parts.push(`In my control: ${block.inControl}`);
              if (block.notInControl) parts.push(`Not in my control: ${block.notInControl}`);
              return parts.join('\n');
            }
            return block.content || '';
          })
          .filter(Boolean)
          .join('\n\n') || '';

        return {
          content,
          date: entry.date || entry.createdAt.toDate().toISOString().split('T')[0],
          mood: entry.mood ? String(entry.mood) : undefined,
        };
      }).filter(e => e.content.trim());

      if (formattedEntries.length === 0) {
        setReflectionError('Not enough entries with content this week.');
        return;
      }

      const response = await fetch('/api/ai/weekly-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entries: formattedEntries,
          track: userProfile.pillarFocus,
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate reflection');
      }

      const result = await response.json();
      setWeeklyReflection(result);
    } catch (error) {
      console.error('Error generating weekly reflection:', error);
      setReflectionError('Unable to generate reflection right now.');
      toast.error('Failed to generate weekly reflection');
    } finally {
      setIsLoadingReflection(false);
    }
  }, [user, userProfile?.pillarFocus, recentEntries, access.canUseWeeklyReflection]);

  // Get greeting based on time of day
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get first name from display name
  const firstName = userProfile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Stoic';

  // Check if user wrote today
  const hasWrittenToday = recentEntries.length > 0 &&
    recentEntries[0].createdAt.toDate().toDateString() === new Date().toDateString();

  // Build mood data for chart from recent entries
  const moodData = recentEntries
    .slice(0, 5)
    .reverse()
    .map((entry) => {
      const date = entry.createdAt.toDate();
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      return {
        day: dayName,
        value: entry.mood || 3,
      };
    });

  // Pad with empty data if less than 5 entries
  while (moodData.length < 5) {
    moodData.unshift({ day: '-', value: 3 });
  }

  // Format date for recent entries
  const formatEntryDate = (entry: JournalEntry) => {
    const date = entry.createdAt.toDate();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  // Get mood icon
  const getMoodIcon = (mood: MoodScore | null) => {
    if (!mood) return <Meh size={16} className="text-slate-400" />;
    if (mood <= 2) return <Frown size={16} className="text-red-500" />;
    if (mood <= 3) return <Meh size={16} className="text-amber-500" />;
    return <Smile size={16} className="text-emerald-500" />;
  };

  // Get display label for entry
  const getEntryLabel = (entry: JournalEntry) => {
    const blockTypes = entry.blocks?.map(b => b.type) || [];
    if (blockTypes.includes('morning-intent')) return 'Morning Intent';
    if (blockTypes.includes('evening-audit')) return 'Evening Audit';
    if (blockTypes.includes('dichotomy')) return 'Dichotomy';

    const pillarLabels: Record<Pillar, string> = {
      money: 'Money',
      ego: 'Ego',
      relationships: 'Relationships',
      discipline: 'Discipline',
    };
    return pillarLabels[entry.pillar] || 'Journal Entry';
  };

  // Get preview text from entry blocks
  const getEntryPreview = (entry: JournalEntry) => {
    if (!entry.blocks || entry.blocks.length === 0) return '';

    for (const block of entry.blocks) {
      if (block.content?.trim()) {
        return block.content.trim().slice(0, 100);
      }
      if (block.inControl?.trim()) {
        return `In control: ${block.inControl.trim().slice(0, 80)}`;
      }
      if (block.notInControl?.trim()) {
        return `Not in control: ${block.notInControl.trim().slice(0, 80)}`;
      }
    }
    return '';
  };

  // Get streak milestone info
  const getStreakMilestone = (streak: number) => {
    if (streak >= 100) return { label: 'Philosopher', icon: Trophy, color: 'text-yellow-500' };
    if (streak >= 60) return { label: 'Master', icon: Star, color: 'text-purple-500' };
    if (streak >= 30) return { label: 'Warrior', icon: Zap, color: 'text-blue-500' };
    if (streak >= 14) return { label: 'Practitioner', icon: Target, color: 'text-emerald-500' };
    if (streak >= 7) return { label: 'Apprentice', icon: Flame, color: 'text-orange-500' };
    return null;
  };

  const milestone = getStreakMilestone(streak);

  // Show skeleton while initial data is loading
  if (isLoading && !dailyQuote) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - The First Impression
      ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stoic-blue/20 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 pt-8 pb-12 md:pt-12 md:pb-16">
          {/* Greeting + Streak */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            {/* Left: Greeting */}
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-400 mb-1 flex items-center gap-2">
                <Calendar size={14} />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {getGreeting()}, {firstName}
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                {getTimeBasedSubtext(currentHour)}
              </p>
            </div>

            {/* Right: Streak Counter */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-4 md:p-6 text-center min-w-[140px] shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className={streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-600'} size={24} />
                  {milestone && (
                    <milestone.icon className={`${milestone.color}`} size={20} />
                  )}
                </div>
                <div className="text-5xl md:text-6xl font-black text-white leading-none mb-1">
                  {isLoading ? (
                    <Loader2 className="h-12 w-12 animate-spin mx-auto" />
                  ) : (
                    streak
                  )}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {streak === 1 ? 'Day Streak' : 'Day Streak'}
                </p>
                {milestone && (
                  <Badge variant="secondary" className="mt-2 bg-slate-700 text-slate-300 text-[10px]">
                    {milestone.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* ChadGPT Message */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 relative">
                <ChadGPTSvg className="w-12 h-12 md:w-14 md:h-14" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">ChadGPT</span>
                  <Badge className="bg-stoic-blue/20 text-stoic-blue border-0 text-[10px]">AI Coach</Badge>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {getChadGreeting(streak, firstName, currentHour)}
                </p>
              </div>
            </div>
          </div>

          {/* Today's Action Card */}
          <Card className="bg-gradient-to-r from-stoic-blue/10 to-purple-500/10 border-stoic-blue/30 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Left: Today's Challenge */}
                <div className="flex-1 p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="text-stoic-blue" size={18} />
                    <span className="text-xs font-bold text-stoic-blue uppercase tracking-wider">
                      Today&apos;s Challenge
                    </span>
                  </div>
                  {dailyQuote ? (
                    <>
                      <blockquote className="text-lg md:text-xl font-medium text-white mb-2 leading-relaxed">
                        &ldquo;{dailyQuote.quote}&rdquo;
                      </blockquote>
                      <p className="text-sm text-slate-400">— {dailyQuote.author}</p>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading today&apos;s wisdom...
                    </div>
                  )}
                </div>

                {/* Right: CTA */}
                <div className="flex items-center justify-center p-5 md:p-6 border-t md:border-t-0 md:border-l border-slate-700/50 bg-slate-800/30">
                  {hasWrittenToday ? (
                    <div className="text-center">
                      <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Smile className="text-emerald-400" size={28} />
                      </div>
                      <p className="text-sm font-medium text-emerald-400 mb-1">Done for Today!</p>
                      <Link href="/journal" className="text-xs text-slate-400 hover:text-white transition-colors">
                        View Entry →
                      </Link>
                    </div>
                  ) : (
                    <Link href="/journal/new" className="block">
                      <Button size="lg" className="bg-stoic-blue hover:bg-stoic-blue/90 text-white h-14 px-8 text-base font-bold shadow-lg shadow-stoic-blue/25 group">
                        <Edit3 className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                        Start Writing
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
          MAIN CONTENT - Stats, Insights, Progress
      ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-50 rounded-t-[2rem] -mt-4 pt-8 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Main Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Total Entries */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Entries</span>
                      <Calendar className="text-stoic-blue" size={18} />
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900">
                      {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : entryCount}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Lifetime reflections</p>
                  </CardContent>
                </Card>

                {/* Mood Trend */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">5-Day Mood</span>
                      <TrendingUp className="text-emerald-500" size={18} />
                    </div>
                    {recentEntries.length === 0 ? (
                      <div className="text-center py-2">
                        <Meh size={24} className="text-slate-300 mx-auto mb-1" />
                        <p className="text-xs text-slate-400">No data yet</p>
                      </div>
                    ) : (
                      <>
                        {/* Mini Line Chart */}
                        <div className="relative h-12">
                          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path
                              d={`M0,${40 - (moodData[0].value / 5) * 35} L25,${40 - (moodData[1].value / 5) * 35} L50,${40 - (moodData[2].value / 5) * 35} L75,${40 - (moodData[3].value / 5) * 35} L100,${40 - (moodData[4].value / 5) * 35}`}
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {moodData.map((point, i) => (
                              <circle
                                key={i}
                                cx={i * 25}
                                cy={40 - (point.value / 5) * 35}
                                r="3"
                                fill="white"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                              />
                            ))}
                          </svg>
                        </div>
                        <p className="text-xs text-slate-400 text-right">
                          Avg: {(moodData.reduce((a, b) => a + b.value, 0) / moodData.length).toFixed(1)}/5
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quote of the Day Card */}
              <Card className="border-0 shadow-sm bg-white overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-stoic-blue to-purple-500" />
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0">
                      Daily Stoic Quote
                    </Badge>
                  </div>
                  {dailyQuote ? (
                    <>
                      <blockquote className="text-xl md:text-2xl font-serif text-slate-800 italic mb-4 leading-relaxed">
                        &ldquo;{dailyQuote.quote}&rdquo;
                      </blockquote>
                      <p className="text-sm font-bold text-slate-900 mb-6">&mdash; {dailyQuote.author}</p>

                      {/* ChadGPT Speech Bubble */}
                      <div className="relative">
                        <div className="flex items-start gap-3 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
                          <ChadGPTSvg className="w-10 h-10 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-stoic-blue uppercase tracking-wider mb-1">Chad&apos;s Take</p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {dailyQuote.broTranslation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Weekly AI Reflection */}
              <Card className="border-0 shadow-sm bg-white overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-purple-500" size={20} />
                      <h3 className="font-bold text-slate-900">Weekly Reflection</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-0 text-[10px]">
                        AI Powered
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={generateWeeklyReflection}
                      disabled={isLoadingReflection}
                      className="text-xs min-h-11"
                    >
                      {isLoadingReflection ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span className="ml-1.5 hidden sm:inline">
                        {weeklyReflection ? 'Refresh' : 'Generate'}
                      </span>
                    </Button>
                  </div>

                  {isLoadingReflection ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                      <p className="text-sm text-slate-500">Analyzing your week...</p>
                    </div>
                  ) : reflectionError ? (
                    <div className="text-center py-6">
                      <p className="text-sm text-slate-500 mb-3">{reflectionError}</p>
                      <Button asChild variant="outline" size="sm" className="min-h-11">
                        <Link href="/journal/new">
                          Write an Entry
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : weeklyReflection ? (
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="bg-purple-50 p-4 rounded-xl">
                        <p className="text-sm text-slate-700 leading-relaxed">{weeklyReflection.summary}</p>
                      </div>

                      {/* Key Themes */}
                      {weeklyReflection.keyThemes && weeklyReflection.keyThemes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {weeklyReflection.keyThemes.slice(0, 4).map((theme, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Insights */}
                      {weeklyReflection.insights && weeklyReflection.insights.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Lightbulb size={14} />
                            Key Insights
                          </h4>
                          <ul className="space-y-1">
                            {weeklyReflection.insights.slice(0, 3).map((insight, index) => (
                              <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommendations */}
                      {weeklyReflection.recommendations && weeklyReflection.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Target size={14} />
                            Focus Areas
                          </h4>
                          <ul className="space-y-1">
                            {weeklyReflection.recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                <ArrowUpRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <ChadGPTSvg className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm text-slate-500 mb-3">
                        Get AI-powered insights from your journal entries
                      </p>
                      <Button
                        onClick={generateWeeklyReflection}
                        disabled={isLoadingReflection || !userProfile?.pillarFocus}
                        size="sm"
                        className="min-h-11 bg-purple-600 hover:bg-purple-700"
                      >
                        <Sparkles size={16} className="mr-2" />
                        Generate Reflection
                      </Button>
                      {!userProfile?.pillarFocus && (
                        <p className="text-xs text-slate-400 mt-2">
                          Complete onboarding to unlock AI reflections
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Entries */}
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-900">Recent Entries</h3>
                    <Button variant="ghost" className="text-xs" asChild>
                      <Link href="/journal">View All</Link>
                    </Button>
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : recentEntries.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Edit3 className="text-slate-400" size={24} />
                      </div>
                      <p className="text-slate-500 mb-4">No entries yet. Start your Stoic journey!</p>
                      <Button asChild>
                        <Link href="/journal/new">Write Your First Entry</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentEntries.slice(0, 3).map((entry) => (
                        <Link
                          href={`/journal/${entry.id}`}
                          key={entry.id}
                          className="block p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">{formatEntryDate(entry)}</span>
                            <span className="text-sm text-slate-400">{getMoodIcon(entry.mood)}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                            {getEntryLabel(entry)}
                          </h4>
                          <p className="text-sm text-slate-500 truncate">{getEntryPreview(entry)}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Subscription Banner */}
              {!isSubscribed && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-stoic-blue to-purple-600 text-white overflow-hidden">
                  <CardContent className="p-5 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <Badge className="bg-white/20 text-white border-0 mb-3 text-[10px]">Free Plan</Badge>
                      <p className="text-2xl font-bold mb-2">
                        {access.entriesRemaining === 'unlimited' ? '∞' : access.entriesRemaining}
                        <span className="text-sm font-normal opacity-80"> entries left</span>
                      </p>
                      <p className="text-sm opacity-80 mb-4">
                        {access.aiInsightsRemaining === 'unlimited' ? '∞' : access.aiInsightsRemaining} AI insights remaining
                      </p>
                      <Button className="w-full bg-white text-stoic-blue hover:bg-white/90 font-bold" asChild>
                        <Link href="/settings?tab=Subscription">
                          Upgrade to Pro
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Pillar Progress */}
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-6">Pillar Progress</h3>
                  <div className="space-y-5">
                    {[
                      { label: 'Money', key: 'money' as Pillar, color: 'bg-emerald-500', lightColor: 'bg-emerald-100' },
                      { label: 'Ego', key: 'ego' as Pillar, color: 'bg-purple-500', lightColor: 'bg-purple-100' },
                      { label: 'Relationships', key: 'relationships' as Pillar, color: 'bg-pink-500', lightColor: 'bg-pink-100' },
                      { label: 'Discipline', key: 'discipline' as Pillar, color: 'bg-amber-500', lightColor: 'bg-amber-100' },
                    ].map((v) => (
                      <div key={v.label}>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                          <span>{v.label}</span>
                          <span>{pillarProgress[v.key]}%</span>
                        </div>
                        <div className={`h-2.5 ${v.lightColor} rounded-full overflow-hidden`}>
                          <div
                            style={{ width: `${pillarProgress[v.key]}%` }}
                            className={`h-full rounded-full ${v.color} transition-all duration-700 ease-out`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {entryCount === 0 && (
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      Tag entries with pillars to track progress
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Tip Card */}
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="text-amber-600" size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Pro Tip</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Try the &quot;Dichotomy of Control&quot; block to separate what you can and can&apos;t control. It&apos;s Stoicism 101.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Prompt */}
      <UpgradePrompt
        open={showUpgradePrompt}
        onOpenChange={setShowUpgradePrompt}
        feature="weekly-reflection"
      />
    </div>
  );
};

export default DashboardPage;
