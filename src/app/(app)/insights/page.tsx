'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Share2,
  Download,
  Bot,
  Loader2,
  TrendingUp,
  Flame,
  DollarSign,
  User,
  Heart,
  Target,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
  getMoodDataForDays,
  getPillarDistribution,
  calculateStreak,
  getEntryCount,
  getEntriesForLastNDays,
} from '@/lib/firebase/journal';
import type { Pillar } from '@/lib/types';

const PILLAR_CONFIG: Record<Pillar, { icon: React.ElementType; label: string; color: string; bgColor: string }> = {
  money: { icon: DollarSign, label: 'Money', color: 'bg-emerald-500', bgColor: 'bg-emerald-100' },
  ego: { icon: User, label: 'Ego', color: 'bg-purple-500', bgColor: 'bg-purple-100' },
  relationships: { icon: Heart, label: 'Relationships', color: 'bg-pink-500', bgColor: 'bg-pink-100' },
  discipline: { icon: Target, label: 'Discipline', color: 'bg-amber-500', bgColor: 'bg-amber-100' },
};

const InsightsPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState<{ date: string; mood: number | null }[]>([]);
  const [pillarDistribution, setPillarDistribution] = useState<Record<string, number>>({
    money: 0,
    ego: 0,
    relationships: 0,
    discipline: 0,
  });
  const [streak, setStreak] = useState(0);
  const [entryCount, setEntryCount] = useState(0);
  const [avgMood, setAvgMood] = useState<number | null>(null);
  const [topPillar, setTopPillar] = useState<Pillar | null>(null);

  const loadInsightsData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [moods, distribution, streakData, count] = await Promise.all([
        getMoodDataForDays(user.uid, 30),
        getPillarDistribution(user.uid),
        calculateStreak(user.uid),
        getEntryCount(user.uid),
      ]);

      setMoodData(moods);
      setPillarDistribution(distribution);
      setStreak(streakData);
      setEntryCount(count);

      // Calculate average mood
      const moodsWithValue = moods.filter((m) => m.mood !== null);
      if (moodsWithValue.length > 0) {
        const total = moodsWithValue.reduce((acc, m) => acc + (m.mood || 0), 0);
        setAvgMood(total / moodsWithValue.length);
      }

      // Find top pillar
      const maxPillar = Object.entries(distribution).reduce(
        (max, [pillar, count]) => (count > max.count ? { pillar, count } : max),
        { pillar: '', count: 0 }
      );
      if (maxPillar.count > 0) {
        setTopPillar(maxPillar.pillar as Pillar);
      }
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadInsightsData();
  }, [loadInsightsData]);

  // Get mood color for heatmap
  const getMoodColor = (mood: number | null) => {
    if (mood === null) return 'bg-slate-100';
    if (mood <= 1) return 'bg-red-500';
    if (mood <= 2) return 'bg-red-400';
    if (mood <= 3) return 'bg-amber-400';
    if (mood <= 4) return 'bg-emerald-400';
    return 'bg-emerald-500';
  };

  // Get mood label
  const getMoodLabel = (mood: number | null) => {
    if (mood === null) return 'No entry';
    if (mood <= 1) return 'Awful';
    if (mood <= 2) return 'Bad';
    if (mood <= 3) return 'Okay';
    if (mood <= 4) return 'Good';
    return 'Great';
  };

  // Calculate pillar percentages
  const totalPillarEntries = Object.values(pillarDistribution).reduce((a, b) => a + b, 0);
  const pillarPercentages = Object.entries(pillarDistribution).map(([pillar, count]) => ({
    pillar: pillar as Pillar,
    count,
    percentage: totalPillarEntries > 0 ? Math.round((count / totalPillarEntries) * 100) : 0,
  }));

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-500">Loading your insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Insights</h1>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 flex items-center">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 flex items-center">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className={streak > 0 ? 'text-orange-500' : 'text-slate-400'} size={24} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{streak}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{entryCount}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Total Entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 text-sm">☺</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {avgMood !== null ? avgMood.toFixed(1) : '-'}
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Avg Mood</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            {topPillar ? (
              <>
                <div className="flex items-center justify-center mb-2">
                  {React.createElement(PILLAR_CONFIG[topPillar].icon, {
                    size: 24,
                    className: `text-${PILLAR_CONFIG[topPillar].color.replace('bg-', '')}`
                  })}
                </div>
                <p className="text-2xl font-bold text-slate-900 capitalize">{topPillar}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Top Pillar</p>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full bg-slate-100 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-400">-</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Top Pillar</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mood Heatmap */}
        <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">30-Day Mood Heatmap</h3>
            <div className="flex gap-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-slate-100 rounded-sm"></div> No Data
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded-sm"></div> Low
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> High
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Calculate first day offset */}
          {(() => {
            const firstDate = moodData.length > 0 ? new Date(moodData[0].date) : new Date();
            const firstDayOffset = firstDate.getDay(); // 0 = Sunday, adjust to Monday-start
            const adjustedOffset = firstDayOffset === 0 ? 6 : firstDayOffset - 1;

            return (
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for offset */}
                {Array.from({ length: adjustedOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}

                {/* Mood cells */}
                {moodData.map((day, i) => {
                  const date = new Date(day.date);
                  const dayNum = date.getDate();

                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-md ${getMoodColor(day.mood)} hover:scale-110 transition-transform cursor-pointer relative group`}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: {getMoodLabel(day.mood)}
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-600 font-medium opacity-0 hover:opacity-100">
                        {dayNum}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Pillar Breakdown */}
        <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Pillar Focus</h3>

          {totalPillarEntries === 0 ? (
            <div className="flex-grow flex items-center justify-center text-center">
              <div>
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-slate-400" size={32} />
                </div>
                <p className="text-slate-500 text-sm">No pillar data yet</p>
                <p className="text-slate-400 text-xs mt-1">Start journaling to see your focus</p>
              </div>
            </div>
          ) : (
            <>
              {/* Donut Chart Visual */}
              <div className="flex-grow flex items-center justify-center relative mb-6">
                <div className="w-40 h-40 rounded-full relative" style={{
                  background: `conic-gradient(
                    #10B981 0deg ${pillarPercentages[0]?.percentage * 3.6}deg,
                    #8B5CF6 ${pillarPercentages[0]?.percentage * 3.6}deg ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage) * 3.6}deg,
                    #EC4899 ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage) * 3.6}deg ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage + pillarPercentages[2]?.percentage) * 3.6}deg,
                    #F59E0B ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage + pillarPercentages[2]?.percentage) * 3.6}deg 360deg
                  )`
                }}>
                  <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                    {topPillar && (
                      <>
                        <span className="text-2xl font-black text-slate-900 capitalize">{topPillar}</span>
                        <span className="text-sm font-medium text-slate-500">{pillarPercentages.find(p => p.pillar === topPillar)?.percentage}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Pillar Legend */}
              <div className="space-y-3">
                {pillarPercentages.map(({ pillar, count, percentage }) => {
                  const config = PILLAR_CONFIG[pillar];
                  return (
                    <div key={pillar} className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <div className={`w-3 h-3 ${config.color} rounded-full`}></div>
                        {config.label}
                      </span>
                      <span className="font-bold">
                        {percentage}% <span className="text-slate-400 font-normal">({count})</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Weekly Summary Card */}
        <div className="md:col-span-12 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm flex-shrink-0">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Weekly Summary</h3>
              {entryCount === 0 ? (
                <p className="text-indigo-100 leading-relaxed max-w-3xl text-lg">
                  Start journaling to get personalized insights about your Stoic journey. We&apos;ll analyze your entries and help you identify patterns in your emotional resilience.
                </p>
              ) : (
                <p className="text-indigo-100 leading-relaxed mb-6 max-w-3xl text-lg">
                  You&apos;ve written <strong>{entryCount}</strong> journal entries and maintained a <strong>{streak}-day streak</strong>.
                  {topPillar && (
                    <> Your primary focus has been on <strong className="capitalize">{topPillar}</strong> ({pillarPercentages.find(p => p.pillar === topPillar)?.percentage}% of entries).</>
                  )}
                  {avgMood !== null && (
                    <> Your average mood score is <strong>{avgMood.toFixed(1)}/5</strong>.</>
                  )}
                </p>
              )}
              {entryCount > 0 && (
                <p className="text-indigo-200 text-sm">
                  AI-powered deep insights coming soon...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
