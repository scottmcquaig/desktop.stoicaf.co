
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Activity, 
  Edit3, 
  MessageCircle, 
  MoreHorizontal, 
  ChevronRight, 
  Hand, 
  Bot,
  Smile,
  Meh
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                Good Morning, Marcus! 
                <Hand className="text-amber-400 animate-pulse" size={32} strokeWidth={2.5} />
            </h1>
            <p className="text-slate-500 mt-1">Let's focus on what's within your control today.</p>
        </div>
        <Link to="/" className="hidden md:block text-xs font-bold text-slate-400 hover:text-stoic-blue uppercase tracking-widest">Exit Demo</Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {/* Streak */}
         <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Flame size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                    <Flame size={16} fill="currentColor" /> Current Streak
                </div>
                <div className="text-5xl font-black mb-1">15</div>
                <div className="text-slate-400 text-sm font-medium">days in a row</div>
            </div>
         </div>

         {/* Mood */}
         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-stoic-blue/30 transition-all">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mood Trend</span>
                <Activity className="text-stoic-blue" size={20} />
            </div>
            <div className="h-20 flex items-end justify-between gap-2 px-2">
                {[40, 60, 45, 70, 85, 60, 75].map((h, i) => (
                 <div key={i} className="w-full bg-sky-50 rounded-t-sm relative group">
                    <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-stoic-blue rounded-t-sm transition-all group-hover:bg-sky-600"></div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-3 text-xs font-medium text-slate-500">
                <span>7 days ago</span>
                <span className="text-slate-900 font-bold">Avg: 4.2</span>
            </div>
         </div>

         {/* Quick Actions */}
         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center gap-3">
            <Link to="/app/journal/new" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-stoic-blue">
                    <Edit3 size={18} />
                </div>
                New Journal Entry
            </Link>
            <Link to="/app/chat" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-stoic-blue">
                    <MessageCircle size={18} />
                </div>
                Chat with Coach
            </Link>
         </div>
      </div>

      {/* Quote */}
      <div className="bg-white rounded-2xl border-l-8 border-stoic-blue p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Daily Stoic</span>
                 <button className="text-slate-400 hover:text-slate-600">
                     <MoreHorizontal size={24} />
                 </button>
              </div>
              <blockquote className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-normal mb-6">
                "The impediment to action advances action. What stands in the way becomes the way."
              </blockquote>
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                      {/* Placeholder for Marcus face */}
                      <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white font-bold">MA</div>
                  </div>
                  <div>
                      <p className="font-bold text-slate-900">Marcus Aurelius</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Meditations, Book 5.20</p>
                  </div>
              </div>
              
              {/* AI Insight */}
              <div className="mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex gap-4">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-indigo-600">
                    <Bot size={20} />
                 </div>
                 <div>
                     <p className="text-sm font-bold text-indigo-900 mb-1">MARC's Insight</p>
                     <p className="text-sm text-indigo-800/80 leading-relaxed">
                         You've been mentioning feeling "stuck" at work lately. Marcus is reminding you that the obstacle isn't a stop sign—it's the training ground. Use the difficulty to practice patience and creativity today.
                     </p>
                 </div>
              </div>
          </div>
      </div>

      {/* Recent Entries Section */}
      <div>
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Recent Entries</h3>
              <Link to="/app/journal" className="text-sm font-bold text-stoic-blue hover:underline">View Journal</Link>
          </div>
          <div className="space-y-3">
              {[
                  { date: "Yesterday", title: "Morning Intent", preview: "Focusing on what I can control today...", mood: <Smile className="text-emerald-500" size={20} /> },
                  { date: "Nov 15", title: "Free-Form Reflection", preview: "Feeling stuck on this project but I know...", mood: <Meh className="text-amber-500" size={20} /> },
                  { date: "Nov 14", title: "Evening Audit", preview: "Wins: Finished the presentation. Fail: Ate...", mood: <Smile className="text-emerald-500" size={20} /> }
              ].map((entry, i) => (
                  <Link key={i} to={`/app/journal`} className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-stoic-blue hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{entry.date}</span>
                                  {entry.mood}
                              </div>
                              <h4 className="font-bold text-slate-900 group-hover:text-stoic-blue transition-colors">{entry.title}</h4>
                              <p className="text-sm text-slate-500 line-clamp-1">{entry.preview}</p>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-stoic-blue mt-2" size={24} />
                      </div>
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
