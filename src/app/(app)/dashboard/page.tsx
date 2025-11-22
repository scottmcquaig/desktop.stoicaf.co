'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Flame,
  TrendingUp,
  MoreHorizontal,
  Smile,
  Meh,
  Frown,
  Search,
  Bell,
  Loader2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';
import { useAuth } from '@/contexts/AuthContext';
import { calculateStreak, getRecentEntries, getEntryCount } from '@/lib/firebase/journal';
import type { JournalEntry, MoodScore, Pillar } from '@/lib/types';

const DashboardPage: React.FC = () => {
  const { user, userProfile } = useAuth();
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

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [streakData, entries, count] = await Promise.all([
        calculateStreak(user.uid),
        getRecentEntries(user.uid, 5),
        getEntryCount(user.uid),
      ]);

      setStreak(streakData);
      setRecentEntries(entries);
      setEntryCount(count);

      // Calculate pillar progress from recent entries (last 30 entries)
      const pillarCounts: Record<Pillar, number> = {
        money: 0,
        ego: 0,
        relationships: 0,
        discipline: 0,
      };

      entries.forEach((entry) => {
        if (entry.pillar) {
          pillarCounts[entry.pillar]++;
        }
      });

      // Convert to percentages (based on having at least 1 entry per pillar being "progress")
      const total = Object.values(pillarCounts).reduce((a, b) => a + b, 0) || 1;
      setPillarProgress({
        money: Math.min(100, Math.round((pillarCounts.money / total) * 100 * 4)),
        ego: Math.min(100, Math.round((pillarCounts.ego / total) * 100 * 4)),
        relationships: Math.min(100, Math.round((pillarCounts.relationships / total) * 100 * 4)),
        discipline: Math.min(100, Math.round((pillarCounts.discipline / total) * 100 * 4)),
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

  // Get template label
  const getTemplateLabel = (template: string) => {
    const labels: Record<string, string> = {
      'morning-intent': 'Morning Intent',
      'evening-audit': 'Evening Audit',
      'dichotomy': 'Dichotomy',
      'free-form': 'Free-Form',
    };
    return labels[template] || template;
  };

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
                  {moodData.map((point) => (
                    <span key={point.day} className="text-[10px] text-slate-400 font-medium">{point.day}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">Avg: {(moodData.reduce((a, b) => a + b.value, 0) / moodData.length).toFixed(1)}/5</p>
              </CardContent>
            </Card>
          </div>

          {/* Quote of the Day */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="border-0">
                  Daily Stoic Quote
                </Badge>
                <MoreHorizontal className="text-slate-400 cursor-pointer" size={20} />
              </div>
              <blockquote className="text-xl font-serif text-slate-800 italic mb-4 leading-relaxed">
                "The impediment to action advances action. What stands in the way becomes the way."
              </blockquote>
              <p className="text-sm font-bold text-slate-900 mb-6">— Marcus Aurelius</p>

              {/* ChadGPT Speech Bubble */}
              <div className="relative -mx-2 -mb-2">
                <div className="flex items-start gap-3">
                  {/* ChadGPT Avatar */}
                  <div className="relative -mt-1 flex-shrink-0">
                    <ChadGPTSvg className="w-11 h-11" />
                  </div>

                  {/* Speech Bubble */}
                  <div className="relative flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-sm border border-dashed border-slate-300">
                    {/* Speech bubble pointer */}
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-300"></div>
                    <div className="absolute -left-[6px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-50"></div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-bold text-stoic-dark">ChadGPT says:</span> This reminds us that obstacles aren&apos;t
                      stop signs—they&apos;re training grounds. The difficult coworker is patience training. The lost deal is
                      resilience training.
                    </p>
                  </div>
                </div>
              </div>
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
                        {getTemplateLabel(entry.template)}
                      </h4>
                      <p className="text-sm text-slate-500 truncate">{entry.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Trial Banner */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
            <p className="text-xs font-bold text-primary uppercase mb-1">Pro Trial Active</p>
            <p className="text-sm text-slate-700 mb-3">5 days left to explore all features.</p>
            <Button className="w-full py-1.5 text-xs">Upgrade Now</Button>
          </div>
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
    </div>
  );
};

export default DashboardPage;
