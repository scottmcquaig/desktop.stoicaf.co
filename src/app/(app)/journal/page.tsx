'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Smile,
  Meh,
  Frown,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
  Calendar,
  Loader2,
  BookOpen,
  DollarSign,
  User,
  Heart,
  Target,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { getEntries, getEntriesForMonth, getEntryCount } from '@/lib/firebase/journal';
import type { JournalEntry, MoodScore, Pillar } from '@/lib/types';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

type ViewMode = 'list' | 'grid' | 'calendar';

const PILLAR_CONFIG: Record<Pillar, { icon: React.ElementType; label: string; color: string }> = {
  money: { icon: DollarSign, label: 'Money', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  ego: { icon: User, label: 'Ego', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  relationships: { icon: Heart, label: 'Relationships', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  discipline: { icon: Target, label: 'Discipline', color: 'bg-amber-100 text-amber-700 border-amber-200' },
};

const MoodIcon = ({ mood }: { mood: MoodScore | null }) => {
  if (!mood) return null;
  if (mood <= 2) return <Frown size={18} className="text-red-500" />;
  if (mood <= 3) return <Meh size={18} className="text-amber-500" />;
  return <Smile size={18} className="text-emerald-500" />;
};

const JournalListPage: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [calendarEntries, setCalendarEntries] = useState<JournalEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load entries for list/grid view
  const loadEntries = useCallback(async (reset = false) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const result = await getEntries(user.uid, {
        pageSize: 10,
        lastDoc: reset ? undefined : lastDoc ?? undefined,
      });

      if (reset) {
        setEntries(result.entries);
      } else {
        setEntries((prev) => [...prev, ...result.entries]);
      }
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, lastDoc]);

  // Load entries for calendar view
  const loadCalendarEntries = useCallback(async () => {
    if (!user) return;

    try {
      const result = await getEntriesForMonth(
        user.uid,
        currentMonth.getFullYear(),
        currentMonth.getMonth()
      );
      setCalendarEntries(result);
    } catch (error) {
      console.error('Error loading calendar entries:', error);
    }
  }, [user, currentMonth]);

  // Load entry count
  const loadCount = useCallback(async () => {
    if (!user) return;
    try {
      const count = await getEntryCount(user.uid);
      setTotalCount(count);
    } catch (error) {
      console.error('Error loading count:', error);
    }
  }, [user]);

  // Initial load
  useEffect(() => {
    if (user) {
      loadEntries(true);
      loadCount();
    }
  }, [user]);

  // Load calendar entries when month changes or view changes to calendar
  useEffect(() => {
    if (viewMode === 'calendar' && user) {
      loadCalendarEntries();
    }
  }, [viewMode, currentMonth, user, loadCalendarEntries]);

  // Get days in month for calendar
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Check if a day has an entry (using date field in YYYY-MM-DD format)
  const getEntriesForDay = (day: number) => {
    const targetDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEntries.filter((e) => e.date === targetDate);
  };

  // Format date for display
  const formatDate = (entry: JournalEntry) => {
    // Use date field if available, otherwise fall back to createdAt
    if (entry.date) {
      const [year, month, day] = entry.date.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const date = entry.createdAt.toDate();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get last entry info
  const getLastEntryText = () => {
    if (entries.length === 0) return 'No entries yet';
    const lastEntry = entries[0];

    // Use date field if available
    let entryDate: Date;
    if (lastEntry.date) {
      const [year, month, day] = lastEntry.date.split('-');
      entryDate = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      entryDate = lastEntry.createdAt.toDate();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    entryDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Last entry today';
    if (diffDays === 1) return 'Last entry yesterday';
    return `Last entry ${diffDays} days ago`;
  };

  // Get excerpt from entry blocks
  const getExcerpt = (entry: JournalEntry) => {
    // Handle new block-based entries
    if (entry.blocks && entry.blocks.length > 0) {
      for (const block of entry.blocks) {
        if (block.type === 'dichotomy') {
          const text = block.inControl || block.notInControl || '';
          if (text) {
            return text.length > 150 ? text.slice(0, 147) + '...' : text;
          }
        } else if (block.content) {
          return block.content.length > 150 ? block.content.slice(0, 147) + '...' : block.content;
        }
      }
    }

    // Legacy entries fallback
    const legacyEntry = entry as JournalEntry & { content?: string; inControl?: string; notInControl?: string };
    const text = legacyEntry.content || legacyEntry.inControl || legacyEntry.notInControl || '';
    if (text.length <= 150) return text;
    return text.slice(0, 147) + '...';
  };

  // Get title from entry (generates from pillar/day for new entries)
  const getEntryTitle = (entry: JournalEntry) => {
    // Legacy entries have title
    const legacyEntry = entry as JournalEntry & { title?: string };
    if (legacyEntry.title) return legacyEntry.title;

    // New entries: generate title from pillar and day
    if (entry.pillar && entry.dayInTrack) {
      const pillarLabel = PILLAR_CONFIG[entry.pillar]?.label || entry.pillar;
      return `Day ${entry.dayInTrack} - ${pillarLabel}`;
    }

    return 'Journal Entry';
  };

  // Filter entries by search (searches blocks content)
  const filteredEntries = entries.filter((entry) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    // Search in pillar name
    if (entry.pillar && entry.pillar.toLowerCase().includes(query)) return true;

    // Search in blocks content
    if (entry.blocks) {
      for (const block of entry.blocks) {
        if (block.content?.toLowerCase().includes(query)) return true;
        if (block.inControl?.toLowerCase().includes(query)) return true;
        if (block.notInControl?.toLowerCase().includes(query)) return true;
      }
    }

    // Legacy: search in title, content, tags
    const legacyEntry = entry as JournalEntry & { title?: string; content?: string; tags?: string[] };
    if (legacyEntry.title?.toLowerCase().includes(query)) return true;
    if (legacyEntry.content?.toLowerCase().includes(query)) return true;
    if (legacyEntry.tags?.some((tag) => tag.toLowerCase().includes(query))) return true;

    return false;
  });

  // Render pillar badge
  const PillarBadge = ({ pillar }: { pillar?: Pillar }) => {
    if (!pillar) return null;
    const config = PILLAR_CONFIG[pillar];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <Badge variant="secondary" className={config.color}>
        <Icon size={12} className="mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="bg-slate-50 p-4 md:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Journal</h1>
            <p className="text-slate-500">
              {totalCount} {totalCount === 1 ? 'entry' : 'entries'} • {getLastEntryText()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Calendar size={18} />
              </button>
            </div>
            <Button asChild className="h-[42px]">
              <Link href="/journal/new" className="flex items-center gap-2">
                <Plus size={18} /> New Entry
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-slate-50 border-slate-200"
              />
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="outline" className="bg-white">
                All Moods <span className="ml-2 text-slate-400">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                All Pillars <span className="ml-2 text-slate-400">▼</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-slate-500">Loading your entries...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && entries.length === 0 && (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No entries yet</h3>
              <p className="text-slate-500 mb-6 max-w-md">
                Start your Stoic journey by writing your first journal entry. Reflect on what you can control and build emotional resilience.
              </p>
              <Button asChild>
                <Link href="/journal/new" className="flex items-center gap-2">
                  <Plus size={18} /> Write Your First Entry
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* List View */}
        {viewMode === 'list' && !isLoading && entries.length > 0 && (
          <>
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                  <Card className="hover:border-primary/50 transition-all group cursor-pointer">
                    <CardContent className="p-5 flex justify-between items-start">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            {formatDate(entry)}
                          </span>
                          <PillarBadge pillar={entry.pillar} />
                          {entry.dayInTrack && (
                            <span className="text-xs text-slate-400">Day {entry.dayInTrack}</span>
                          )}
                          <span className="text-lg">
                            <MoodIcon mood={entry.mood} />
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                          {getEntryTitle(entry)}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {getExcerpt(entry)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => loadEntries(false)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && !isLoading && entries.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map((entry) => (
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                  <Card className="hover:border-primary/50 transition-all group cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                          {formatDate(entry)}
                        </span>
                        <MoodIcon mood={entry.mood} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <PillarBadge pillar={entry.pillar} />
                        {entry.dayInTrack && (
                          <span className="text-xs text-slate-400">Day {entry.dayInTrack}</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {getEntryTitle(entry)}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {getExcerpt(entry)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => loadEntries(false)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <Card>
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                <h2 className="text-xl font-bold text-slate-900">{monthName}</h2>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square p-1"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEntries = getEntriesForDay(day);
                  const hasEntry = dayEntries.length > 0;
                  const today = new Date();
                  const isToday =
                    day === today.getDate() &&
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear();

                  // Get the mood of the first entry if exists
                  const firstEntryMood = hasEntry ? dayEntries[0].mood : null;

                  return (
                    <Link
                      key={day}
                      href={hasEntry ? `/journal/${dayEntries[0].id}` : '/journal/new'}
                      className={`aspect-square p-1 rounded-lg transition-colors cursor-pointer ${
                        hasEntry ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-slate-100'
                      } ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                    >
                      <div className="h-full flex flex-col items-center justify-center">
                        <span className={`text-sm font-medium ${hasEntry ? 'text-primary' : 'text-slate-700'} ${isToday ? 'font-bold' : ''}`}>
                          {day}
                        </span>
                        {hasEntry && (
                          <div className="mt-1 flex items-center gap-0.5">
                            {firstEntryMood && firstEntryMood <= 2 && <Frown size={12} className="text-red-500" />}
                            {firstEntryMood && firstEntryMood === 3 && <Meh size={12} className="text-amber-500" />}
                            {firstEntryMood && firstEntryMood >= 4 && <Smile size={12} className="text-emerald-500" />}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary/20"></div>
                  <span className="text-xs text-slate-500">Has entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded ring-2 ring-primary"></div>
                  <span className="text-xs text-slate-500">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JournalListPage;
