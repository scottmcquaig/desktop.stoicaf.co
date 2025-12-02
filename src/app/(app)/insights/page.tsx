'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Share2,
  Download,
  Loader2,
  TrendingUp,
  Flame,
  DollarSign,
  User,
  Heart,
  Target,
  Calendar,
  Trophy,
  Zap,
  Star,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';
import { useAuth } from '@/contexts/AuthContext';
import {
  getMoodDataForDays,
  getPillarDistribution,
  calculateStreak,
  getEntryCount,
} from '@/lib/firebase/journal';
import type { Pillar } from '@/lib/types';

const PILLAR_CONFIG: Record<Pillar, { icon: React.ElementType; label: string; color: string; bgColor: string; textColor: string }> = {
  money: { icon: DollarSign, label: 'Money', color: 'bg-emerald-500', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' },
  ego: { icon: User, label: 'Ego', color: 'bg-purple-500', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
  relationships: { icon: Heart, label: 'Relationships', color: 'bg-pink-500', bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
  discipline: { icon: Target, label: 'Discipline', color: 'bg-amber-500', bgColor: 'bg-amber-100', textColor: 'text-amber-600' },
};

// Achievement badges based on stats
const getAchievements = (streak: number, entryCount: number) => {
  const achievements = [];

  if (streak >= 7) achievements.push({ label: 'Week Warrior', icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-100' });
  if (streak >= 30) achievements.push({ label: 'Monthly Master', icon: Star, color: 'text-purple-500', bgColor: 'bg-purple-100' });
  if (streak >= 100) achievements.push({ label: 'Centurion', icon: Trophy, color: 'text-yellow-500', bgColor: 'bg-yellow-100' });
  if (entryCount >= 10) achievements.push({ label: 'First Ten', icon: Award, color: 'text-emerald-500', bgColor: 'bg-emerald-100' });
  if (entryCount >= 50) achievements.push({ label: 'Fifty Strong', icon: CheckCircle2, color: 'text-indigo-500', bgColor: 'bg-indigo-100' });

  return achievements;
};

const InsightsPage: React.FC = () => {
  const { user, userProfile } = useAuth();
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

  const firstName = userProfile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Stoic';

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

  const achievements = getAchievements(streak, entryCount);

  if (isLoading) {
    return (
      <div className="min-h-full bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Analyzing your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Your Insights
              </h1>
              <p className="text-slate-400">
                Track your progress on the path to emotional resilience
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Streak */}
            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 backdrop-blur-sm">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Flame className={streak > 0 ? 'text-orange-400 animate-pulse' : 'text-slate-500'} size={28} />
                </div>
                <p className="text-4xl font-black text-white mb-1">{streak}</p>
                <p className="text-xs font-bold text-orange-300/80 uppercase tracking-wider">Day Streak</p>
              </CardContent>
            </Card>

            {/* Total Entries */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Calendar className="text-blue-400" size={28} />
                </div>
                <p className="text-4xl font-black text-white mb-1">{entryCount}</p>
                <p className="text-xs font-bold text-blue-300/80 uppercase tracking-wider">Entries</p>
              </CardContent>
            </Card>

            {/* Avg Mood */}
            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30 backdrop-blur-sm">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="text-emerald-400" size={28} />
                </div>
                <p className="text-4xl font-black text-white mb-1">
                  {avgMood !== null ? avgMood.toFixed(1) : '—'}
                </p>
                <p className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider">Avg Mood</p>
              </CardContent>
            </Card>

            {/* Top Pillar */}
            <Card className={`bg-gradient-to-br ${topPillar ? 'from-purple-500/20 to-pink-500/20 border-purple-500/30' : 'from-slate-700/50 to-slate-800/50 border-slate-600'} backdrop-blur-sm`}>
              <CardContent className="p-5 text-center">
                {topPillar ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      {React.createElement(PILLAR_CONFIG[topPillar].icon, {
                        size: 28,
                        className: 'text-purple-400'
                      })}
                    </div>
                    <p className="text-lg font-black text-white mb-1 capitalize">{topPillar}</p>
                    <p className="text-xs font-bold text-purple-300/80 uppercase tracking-wider">Top Pillar</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <Target className="text-slate-500" size={28} />
                    </div>
                    <p className="text-lg font-black text-slate-400 mb-1">—</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Pillar</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-50 rounded-t-[2rem] -mt-4 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* Achievements Section (if any) */}
          {achievements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                Achievements Unlocked
              </h2>
              <div className="flex flex-wrap gap-3">
                {achievements.map((achievement, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className={`${achievement.bgColor} ${achievement.color} border-0 py-2 px-4 text-sm font-bold`}
                  >
                    <achievement.icon size={16} className="mr-2" />
                    {achievement.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Mood Heatmap */}
            <Card className="lg:col-span-8 border-0 shadow-sm bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900">30-Day Mood Journey</h3>
                  <div className="flex gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-slate-100 rounded-sm"></div> None
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-400 rounded-sm"></div> Low
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-amber-400 rounded-sm"></div> Mid
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> High
                    </span>
                  </div>
                </div>

                {moodData.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-slate-400" size={28} />
                    </div>
                    <p className="text-slate-500 font-medium mb-2">No mood data yet</p>
                    <p className="text-slate-400 text-sm">Start journaling to see your mood patterns</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                        <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {d}
                        </div>
                      ))}
                    </div>

                    {(() => {
                      const firstDate = moodData.length > 0 ? new Date(moodData[0].date) : new Date();
                      const firstDayOffset = firstDate.getDay();
                      const adjustedOffset = firstDayOffset === 0 ? 6 : firstDayOffset - 1;

                      return (
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: adjustedOffset }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square"></div>
                          ))}

                          {moodData.map((day, i) => {
                            const date = new Date(day.date);
                            const dayNum = date.getDate();
                            const isToday = new Date().toDateString() === date.toDateString();

                            return (
                              <div
                                key={i}
                                className={`aspect-square rounded-lg ${getMoodColor(day.mood)} hover:scale-105 transition-all cursor-pointer relative group ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                              >
                                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-lg">
                                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: {getMoodLabel(day.mood)}
                                </div>
                                <span className="absolute inset-0 flex items-center justify-center text-[11px] text-white/70 font-bold">
                                  {dayNum}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* Mood summary */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        {moodData.filter(m => m.mood !== null).length} days with entries
                      </span>
                      {avgMood !== null && (
                        <span className="font-bold text-slate-700">
                          Average: {avgMood.toFixed(1)}/5 ({getMoodLabel(avgMood)})
                        </span>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Pillar Distribution */}
            <Card className="lg:col-span-4 border-0 shadow-sm bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500" />
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="font-bold text-slate-900 mb-6">Pillar Focus</h3>

                {totalPillarEntries === 0 ? (
                  <div className="flex-grow flex items-center justify-center text-center py-8">
                    <div>
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="text-slate-400" size={28} />
                      </div>
                      <p className="text-slate-500 font-medium mb-2">No pillar data yet</p>
                      <p className="text-slate-400 text-sm">Tag entries with pillars to track focus</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Donut Chart */}
                    <div className="flex-grow flex items-center justify-center relative mb-6">
                      <div className="w-44 h-44 rounded-full relative shadow-lg" style={{
                        background: `conic-gradient(
                          #10B981 0deg ${pillarPercentages[0]?.percentage * 3.6}deg,
                          #8B5CF6 ${pillarPercentages[0]?.percentage * 3.6}deg ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage) * 3.6}deg,
                          #EC4899 ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage) * 3.6}deg ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage + pillarPercentages[2]?.percentage) * 3.6}deg,
                          #F59E0B ${(pillarPercentages[0]?.percentage + pillarPercentages[1]?.percentage + pillarPercentages[2]?.percentage) * 3.6}deg 360deg
                        )`
                      }}>
                        <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                          {topPillar && (
                            <>
                              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Top Focus</span>
                              <span className="text-xl font-black text-slate-900 capitalize">{topPillar}</span>
                              <span className="text-lg font-bold text-primary">{pillarPercentages.find(p => p.pillar === topPillar)?.percentage}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                      {pillarPercentages.map(({ pillar, count, percentage }) => {
                        const config = PILLAR_CONFIG[pillar];
                        const Icon = config.icon;
                        return (
                          <div key={pillar} className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                              <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                                <Icon size={16} className={config.textColor} />
                              </div>
                              {config.label}
                            </span>
                            <span className="text-sm">
                              <span className="font-bold text-slate-900">{percentage}%</span>
                              <span className="text-slate-400 ml-1">({count})</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* ChadGPT Weekly Summary */}
            <Card className="lg:col-span-12 border-0 shadow-lg bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
              <CardContent className="p-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                <div className="flex flex-col md:flex-row">
                  {/* Left: ChadGPT Analysis */}
                  <div className="flex-1 p-6 md:p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <ChadGPTSvg className="w-12 h-12" />
                      <div>
                        <h3 className="text-xl font-bold">Chad&apos;s Analysis</h3>
                        <Badge className="bg-white/20 text-white border-0 text-[10px]">AI Powered</Badge>
                      </div>
                    </div>

                    {entryCount === 0 ? (
                      <p className="text-indigo-100 leading-relaxed text-lg">
                        Hey {firstName}! Start journaling and I&apos;ll break down your patterns, call out what&apos;s working, and keep you accountable on your Stoic path. Let&apos;s get after it!
                      </p>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-indigo-100 leading-relaxed text-lg">
                          {firstName}, you&apos;ve logged <strong className="text-white">{entryCount} entries</strong> and built a <strong className="text-white">{streak}-day streak</strong>.
                          {streak >= 7 && " That's real discipline right there."}
                          {topPillar && (
                            <> You&apos;ve been grinding on <strong className="text-white capitalize">{topPillar}</strong> ({pillarPercentages.find(p => p.pillar === topPillar)?.percentage}% focus).</>
                          )}
                          {avgMood !== null && (
                            <> Your mood&apos;s averaging <strong className="text-white">{avgMood.toFixed(1)}/5</strong> — {avgMood >= 4 ? "you're crushing it!" : avgMood >= 3 ? "solid baseline, room to grow." : "let's work on that together."}</>
                          )}
                        </p>

                        {streak < 7 && (
                          <div className="bg-white/10 rounded-xl p-4 flex items-start gap-3">
                            <ArrowUpRight className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-indigo-200">
                              <strong className="text-white">Next Goal:</strong> Hit a 7-day streak to unlock the &quot;Week Warrior&quot; badge. You got this!
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Quick Stats */}
                  <div className="md:w-64 p-6 md:p-8 bg-white/5 border-t md:border-t-0 md:border-l border-white/10">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-4">Quick Stats</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-200 text-sm">Best Streak</span>
                        <span className="text-white font-bold">{streak} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-200 text-sm">Total Entries</span>
                        <span className="text-white font-bold">{entryCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-200 text-sm">Avg Mood</span>
                        <span className="text-white font-bold">{avgMood !== null ? `${avgMood.toFixed(1)}/5` : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-200 text-sm">Badges</span>
                        <span className="text-white font-bold">{achievements.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
