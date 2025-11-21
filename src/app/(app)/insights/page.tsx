'use client';
import React from 'react';
import { Share2, Download, Bot } from 'lucide-react';

const InsightsPage: React.FC = () => {
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
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              // Generate random mock data
              const val = Math.random();
              let color = 'bg-slate-100';
              if (val > 0.8) color = 'bg-emerald-500';
              else if (val > 0.6) color = 'bg-emerald-400';
              else if (val > 0.4) color = 'bg-amber-400';
              else if (val > 0.2) color = 'bg-red-400';

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md ${color} hover:scale-110 transition-transform cursor-pointer relative group`}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10">
                    Nov {i + 1}: Good
                  </div>
                </div>
              );
            })}
            {/* Fill empty slots for grid */}
            <div className="aspect-square"></div>
            <div className="aspect-square"></div>
            <div className="aspect-square"></div>
            <div className="aspect-square"></div>
            <div className="aspect-square"></div>
          </div>
        </div>

        {/* Virtue Breakdown */}
        <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6 self-start w-full">Virtue Focus</h3>
          <div className="flex-grow flex items-center justify-center relative">
            {/* CSS Donut Chart Mockup */}
            <div className="w-48 h-48 rounded-full border-[24px] border-slate-100 relative">
              <div className="absolute inset-0 border-[24px] border-stoic-blue rounded-full border-l-transparent border-b-transparent border-r-transparent transform rotate-45 opacity-80"></div>
              <div className="absolute inset-0 border-[24px] border-indigo-500 rounded-full border-l-transparent border-t-transparent border-r-transparent transform -rotate-12 opacity-80"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900">Top</span>
                <span className="text-sm font-bold text-stoic-blue uppercase tracking-wider">Wisdom</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-8">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 font-medium">
                <div className="w-3 h-3 bg-stoic-blue rounded-full"></div> Wisdom
              </span>
              <span className="font-bold">42%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 font-medium">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div> Courage
              </span>
              <span className="font-bold">28%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 font-medium">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div> Others
              </span>
              <span className="font-bold text-slate-400">30%</span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="md:col-span-12 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm flex-shrink-0">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Weekly AI Analysis</h3>
              <p className="text-indigo-100 leading-relaxed mb-6 max-w-3xl text-lg">
                "This week you've shown a clear pattern: <strong>Work stress triggers your anxiety</strong> (mentioned 5
                times), but your mood consistently improves when you practice <strong>Gratitude</strong> in the
                evening. You're developing better control over your reactions to management feedback—that's a big win for
                Temperance."
              </p>
              <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
