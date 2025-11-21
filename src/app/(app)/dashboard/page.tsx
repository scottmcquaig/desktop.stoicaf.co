'use client';
import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Activity,
  MessageCircle,
  MoreHorizontal,
  Smile,
  Meh,
  Search,
  Bell,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-slate-50 p-4 md:p-8 min-h-full font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Header */}
        <div className="lg:col-span-12 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Good Morning, Marcus! 👋</h1>
            <p className="text-slate-500">Let's focus on what's within your control today.</p>
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
                  <Flame className="text-orange-500" size={20} />
                </div>
                <div className="text-4xl font-extrabold mb-1">
                  15 <span className="text-lg font-medium text-slate-400">days</span>
                </div>
                <p className="text-xs text-slate-400">Last entry: Yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mood Trend</span>
                  <Activity className="text-primary" size={20} />
                </div>
                <div className="h-16 flex items-end gap-1">
                  {[40, 60, 45, 70, 80, 60, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-sky-100 rounded-t-sm relative group">
                      <div
                        style={{ height: `${h}%` }}
                        className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all group-hover:bg-sky-600"
                      ></div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">Avg: 4.2/5</p>
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
              <p className="text-sm font-bold text-slate-900 mb-4">— Marcus Aurelius</p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold flex-shrink-0">
                  <ChadGPTSvg className="w-8 h-8" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">ChadGPT says:</span> This reminds us that obstacles aren't
                  stop signs—they're training grounds. The difficult coworker is patience training. The lost deal is
                  resilience training.
                </p>
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
              <div className="space-y-4">
                {[
                  { date: 'NOV 16', title: 'Morning Intent', mood: <Smile size={16} />, text: 'Today I want to focus on being present...' },
                  { date: 'NOV 15', title: 'Free-Form Reflection', mood: <Meh size={16} />, text: 'Feeling stuck on this project, but I know...' },
                  { date: 'NOV 14', title: 'Evening Audit', mood: <Smile size={16} />, text: 'What went well today: finished the...' },
                ].map((entry, i) => (
                  <Link
                    href="/journal"
                    key={i}
                    className="block p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">{entry.date}</span>
                      <span className="text-sm text-slate-400">{entry.mood}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                      {entry.title}
                    </h4>
                    <p className="text-sm text-slate-500 truncate">{entry.text}</p>
                  </Link>
                ))}
              </div>
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
          {/* Virtue Progress */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-6">Virtue Progress</h3>
              <div className="space-y-5">
                {[
                  { label: 'Wisdom', val: 80, color: 'bg-indigo-500' },
                  { label: 'Courage', val: 45, color: 'bg-red-500' },
                  { label: 'Temperance', val: 60, color: 'bg-emerald-500' },
                  { label: 'Justice', val: 30, color: 'bg-amber-500' },
                ].map((v) => (
                  <div key={v.label}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{v.label}</span>
                      <span>{v.val}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div style={{ width: `${v.val}%` }} className={`h-full rounded-full ${v.color}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
