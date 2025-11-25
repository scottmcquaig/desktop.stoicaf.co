'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Flame,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Search,
  Bell,
  Loader2,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Target,
  Lightbulb,
  ArrowUpRight,
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
}

interface WeeklyReflectionData {
  summary: string;
  keyThemes: string[];
  insights: string[];
  growthAreas: string[];
  recommendations: string[];
}

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
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get first name from display name
  const firstName = userProfile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Stoic';

  // Get last entry text
  const getLastEntryText = () => {
    if (recentEntries.length === 0) return 'No entries yet';
    const lastEntry = recentEntries[0];
    const date = lastEntry.createdAt.toDate();
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Last entry: Today';
    if (diffDays === 1) return 'Last entry: Yesterday';
    return `Last entry: ${diffDays} days ago`;
  };

  // Build mood data for chart from recent entries
  const moodData = recentEntries
    .slice(0, 5)
    .reverse()
    .map((entry) => {
      const date = entry.createdAt.toDate();
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      return {
        day: dayName,
        value: entry.mood || 3, // Default to 3 if no mood
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

  // Get display label for entry (based on pillar or block types)
  const getEntryLabel = (entry: JournalEntry) => {
    // Try to get a meaningful label from blocks
    const blockTypes = entry.blocks?.map(b => b.type) || [];
    if (blockTypes.includes('morning-intent')) return 'Morning Intent';
    if (blockTypes.includes('evening-audit')) return 'Evening Audit';
    if (blockTypes.includes('dichotomy')) return 'Dichotomy';

    // Fall back to pillar name
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

    // Find first block with content
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

  // Show skeleton while initial data is loading
  if (isLoading && !dailyQuote) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="bg-slate-50 p-4 md:p-8 min-h-full font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Header */}
        <div className="lg:col-span-12 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{getGreeting()}, {firstName}</h1>
            <p className="text-slate-500">Focus on what is within your control.</p>
          </div>
          <div className="hidden md:flex gap-2 items-center">
            <Button variant="ghost" size="icon">
              <Search className="text-slate-600" size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="text-slate-600" size={24} />
            </Button>
          </div>
        </div>

        {/* Main Widgets */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Streak</span>
                  <Flame className={streak > 0 ? 'text-orange-500' : 'text-slate-600'} size={20} />
                </div>
                <div className="text-4xl font-extrabold mb-1">
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <>
                      {streak} <span className="text-lg font-medium text-slate-400">{streak === 1 ? 'day' : 'days'}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400">{getLastEntryText()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">5-Day Mood Trend</span>
                  <TrendingUp className="text-primary" size={20} />
                </div>
                {recentEntries.length === 0 ? (
                  <div className="h-[120px] flex flex-col items-center justify-center text-center">
                    <Meh size={32} className="text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">No mood data yet</p>
                    <p className="text-xs text-slate-300">Start journaling to track your mood</p>
                  </div>
                ) : (
                  <>
                    {/* Line Chart */}
                    <div className="relative h-20">
                      <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="200" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                        <line x1="0" y1="40" x2="200" y2="40" stroke="#e2e8f0" strokeWidth="1" />
                        <line x1="0" y1="60" x2="200" y2="60" stroke="#e2e8f0" strokeWidth="1" />

                        {/* Area fill */}
                        <path
                          d={`M0,${80 - (moodData[0].value / 5) * 70} L50,${80 - (moodData[1].value / 5) * 70} L100,${80 - (moodData[2].value / 5) * 70} L150,${80 - (moodData[3].value / 5) * 70} L200,${80 - (moodData[4].value / 5) * 70} L200,80 L0,80 Z`}
                          fill="url(#moodGradient)"
                        />

                        {/* Line */}
                        <path
                          d={`M0,${80 - (moodData[0].value / 5) * 70} L50,${80 - (moodData[1].value / 5) * 70} L100,${80 - (moodData[2].value / 5) * 70} L150,${80 - (moodData[3].value / 5) * 70} L200,${80 - (moodData[4].value / 5) * 70}`}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {moodData.map((point, i) => (
                          <circle
                            key={i}
                            cx={i * 50}
                            cy={80 - (point.value / 5) * 70}
                            r="4"
                            fill="white"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                          />
                        ))}

                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="moodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Day labels */}
                    <div className="flex justify-between mt-2">
                      {moodData.map((point, i) => (
                        <span key={`${point.day}-${i}`} className="text-[10px] text-slate-400 font-medium">{point.day}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-right">Avg: {(moodData.reduce((a, b) => a + b.value, 0) / moodData.length).toFixed(1)}/5</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quote of the Day */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge variant="secondary" className="border-0">
                  Daily Stoic Quote
                </Badge>
              </div>
              {dailyQuote ? (
                <>
                  <blockquote className="text-xl font-serif text-slate-800 italic mb-4 leading-relaxed">
                    &ldquo;{dailyQuote.quote}&rdquo;
                  </blockquote>
                  <p className="text-sm font-bold text-slate-900 mb-6">&mdash; {dailyQuote.author}</p>

                  {/* ChadGPT Speech Bubble */}
                  <div className="relative -mx-2 -mb-2">
                    <div className="flex items-start gap-3">
                      {/* ChadGPT Avatar */}
                      <div className="relative -mt-1 flex-shrink-0">
                        <ChadGPTSvg className="w-11 h-11" />
                      </div>

                      {/* Speech Bubble */}
                      <div className="relative flex-1 bg-slate-50 p-4 rounded-2xl" style={{ borderStyle: 'dashed', borderWidth: '1px', borderColor: '#cbd5e1', borderSpacing: '8px' }}>
                        {/* Speech bubble pointer */}
                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-300"></div>
                        <div className="absolute -left-[6px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-50"></div>

                        <p className="text-sm text-slate-700 leading-relaxed">
                          <span className="font-bold text-stoic-dark">ChadGPT says:</span> {dailyQuote.broTranslation}
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
          <Card className="border-l-4 border-l-purple-500 overflow-hidden">
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
          <Card>
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
                  <p className="text-slate-500 mb-4">No entries yet. Start your Stoic journey!</p>
                  <Button asChild>
                    <Link href="/journal/new">Write Your First Entry</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentEntries.slice(0, 3).map((entry) => (
                    <Link
                      href={`/journal/${entry.id}`}
                      key={entry.id}
                      className="block p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-all cursor-pointer group"
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

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Subscription Banner */}
          {!isSubscribed && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
              <p className="text-xs font-bold text-primary uppercase mb-1">Free Plan</p>
              <p className="text-sm text-slate-700 mb-1">
                {access.entriesRemaining === 'unlimited' ? 'Unlimited' : access.entriesRemaining} entries remaining
              </p>
              <p className="text-xs text-slate-500 mb-3">
                {access.aiInsightsRemaining === 'unlimited' ? 'Unlimited' : access.aiInsightsRemaining} AI insights remaining
              </p>
              <Button className="w-full py-1.5 text-xs" asChild>
                <Link href="/settings?tab=Subscription">Upgrade to Pro</Link>
              </Button>
            </div>
          )}
          {/* Pillar Progress */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-6">Pillar Progress</h3>
              <div className="space-y-5">
                {[
                  { label: 'Money', key: 'money' as Pillar, color: 'bg-emerald-500' },
                  { label: 'Ego', key: 'ego' as Pillar, color: 'bg-purple-500' },
                  { label: 'Relationships', key: 'relationships' as Pillar, color: 'bg-pink-500' },
                  { label: 'Discipline', key: 'discipline' as Pillar, color: 'bg-amber-500' },
                ].map((v) => (
                  <div key={v.label}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{v.label}</span>
                      <span>{pillarProgress[v.key]}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pillarProgress[v.key]}%` }}
                        className={`h-full rounded-full ${v.color} transition-all duration-500`}
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
