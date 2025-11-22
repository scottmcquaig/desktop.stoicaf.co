'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Smile, Meh, ChevronLeft, ChevronRight, List, Grid, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type ViewMode = 'list' | 'grid' | 'calendar';

// Sample entries data
const entriesData = [
  { id: 1, date: 'Nov 16, 2025', dayNum: 16, type: 'Morning Intent', mood: 'good', title: 'Focusing on what I can control today', excerpt: 'Today started chaotic but I managed to pause and breathe before responding to the email. The dichotomy of control really helped when...', tags: ['#work', '#patience'] },
  { id: 2, date: 'Nov 15, 2025', dayNum: 15, type: 'Evening Audit', mood: 'neutral', title: 'Reflecting on the argument with Dave', excerpt: 'Had a difficult conversation but stayed calm. Need to remember that I can only control my own reactions...', tags: ['#relationships', '#discipline'] },
  { id: 3, date: 'Nov 14, 2025', dayNum: 14, type: 'Morning Intent', mood: 'good', title: 'Setting intentions for the week', excerpt: 'This week I want to focus on being present in conversations and not checking my phone...', tags: ['#mindfulness'] },
  { id: 4, date: 'Nov 13, 2025', dayNum: 13, type: 'Evening Audit', mood: 'good', title: 'Grateful for small wins today', excerpt: 'Finished the project ahead of deadline. Took time to appreciate the accomplishment before moving on...', tags: ['#gratitude', '#work'] },
];

const JournalListPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025

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

  // Check if a day has an entry
  const getEntryForDay = (day: number) => entriesData.find(e => e.dayNum === day);

  return (
    <div className="bg-slate-50 p-4 md:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Journal</h1>
            <p className="text-slate-500">47 entries • Last entry yesterday</p>
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
              <Input type="text" placeholder="Search entries..." className="w-full pl-10 bg-slate-50 border-slate-200" />
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="outline" className="bg-white">
                All Moods <span className="ml-2 text-slate-400">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                All Tags <span className="ml-2 text-slate-400">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Templates <span className="ml-2 text-slate-400">▼</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List View */}
        {viewMode === 'list' && (
          <>
            <div className="space-y-4">
              {entriesData.map((entry) => (
                <Card key={entry.id} className="hover:border-primary/50 transition-all group cursor-pointer">
                  <CardContent className="p-5 flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                          {entry.date}
                        </span>
                        <Badge variant="secondary" className={entry.type === 'Morning Intent' ? 'bg-sky-100 text-primary border-sky-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}>
                          {entry.type}
                        </Badge>
                        <span className="text-lg">
                          {entry.mood === 'neutral' ? (
                            <Meh size={18} className="text-amber-500" />
                          ) : (
                            <Smile size={18} className="text-emerald-500" />
                          )}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {entry.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                        {entry.excerpt}
                      </p>
                      <div className="flex gap-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal border-0">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft size={18} />
              </Button>
              <Button variant="default" size="icon" className="bg-slate-900 text-white">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight size={18} />
              </Button>
            </div>
          </>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entriesData.map((entry) => (
              <Card key={entry.id} className="hover:border-primary/50 transition-all group cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      {entry.date}
                    </span>
                    {entry.mood === 'neutral' ? (
                      <Meh size={18} className="text-amber-500" />
                    ) : (
                      <Smile size={18} className="text-emerald-500" />
                    )}
                  </div>
                  <Badge variant="secondary" className={`mb-3 ${entry.type === 'Morning Intent' ? 'bg-sky-100 text-primary border-sky-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                    {entry.type}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-3">
                    {entry.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal border-0 text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  const entry = getEntryForDay(day);
                  const isToday = day === 22; // Simulating today as Nov 22

                  return (
                    <div
                      key={day}
                      className={`aspect-square p-1 rounded-lg transition-colors cursor-pointer ${
                        entry ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-slate-100'
                      } ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                    >
                      <div className="h-full flex flex-col items-center justify-center">
                        <span className={`text-sm font-medium ${entry ? 'text-primary' : 'text-slate-700'} ${isToday ? 'font-bold' : ''}`}>
                          {day}
                        </span>
                        {entry && (
                          <div className="mt-1">
                            {entry.mood === 'neutral' ? (
                              <Meh size={12} className="text-amber-500" />
                            ) : (
                              <Smile size={12} className="text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
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
