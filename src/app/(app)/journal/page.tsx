
'use client';
import React from 'react';
import Link from 'next/link';
import { Plus, Search, Smile, Meh, Frown, ChevronLeft, ChevronRight, List, Grid, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const JournalListPage: React.FC = () => {
  return (
    <div className="bg-slate-50 p-4 md:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Journal</h1>
            <p className="text-slate-500">47 entries • Last entry yesterday</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
              <Button size="icon" variant="secondary" className="bg-slate-100">
                <List size={18} />
              </Button>
              <Button size="icon" variant="ghost">
                <Grid size={18} />
              </Button>
              <Button size="icon" variant="ghost">
                <Calendar size={18} />
              </Button>
            </div>
            <Button asChild>
              <Link href="/journal/new">
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

        {/* List */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="hover:border-primary/50 transition-all group cursor-pointer">
              <CardContent className="p-5 flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Nov {17 - i}, 2025
                    </span>
                    <Badge variant={i % 2 === 0 ? 'default' : 'secondary'} className={i % 2 === 0 ? 'bg-sky-100 text-primary border-sky-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}>
                      {i % 2 === 0 ? 'Morning Intent' : 'Evening Audit'}
                    </Badge>
                    <span className="text-lg">
                      {i % 3 === 0 ? (
                        <Meh size={18} className="text-amber-500" />
                      ) : (
                        <Smile size={18} className="text-emerald-500" />
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {i % 2 === 0 ? 'Focusing on what I can control today' : 'Reflecting on the argument with Dave'}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                    Today started chaotic but I managed to pause and breathe before responding to the email. The dichotomy
                    of control really helped when...
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="font-normal border-0">#work</Badge>
                    <Badge variant="secondary" className="font-normal border-0">#patience</Badge>
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
      </div>
    </div>
  );
};

export default JournalListPage;
