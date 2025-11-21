
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Smile, 
  Meh, 
  Frown 
} from 'lucide-react';

const JournalList: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Journal</h1>
              <p className="text-slate-500">47 entries • Last updated yesterday</p>
          </div>
          <Link to="/app/journal/new" className="bg-stoic-blue hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105">
              <Plus size={20} /> New Entry
          </Link>
       </div>

       {/* Filters */}
       <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-2">
           <div className="relative flex-grow">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input type="text" placeholder="Search entries..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-stoic-blue outline-none transition-all text-sm" />
           </div>
           <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-all">
               <Filter size={20} />
           </button>
           <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-all">
               <Calendar size={20} />
           </button>
       </div>

       {/* List */}
       <div className="space-y-4 pb-20">
           {[1,2,3,4,5,6].map((i) => (
               <Link key={i} to={`/app/journal`} className="block bg-white p-5 rounded-xl border border-slate-200 hover:border-stoic-blue hover:shadow-md transition-all group cursor-pointer">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex-grow">
                           <div className="flex items-center gap-3 mb-2">
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nov {18-i}, 2025</span>
                               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${i % 2 === 0 ? 'bg-sky-50 text-stoic-blue border-sky-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                   {i % 2 === 0 ? 'Morning Intent' : 'Evening Audit'}
                               </span>
                               <span className="text-lg">
                                  {i % 3 === 0 ? <Meh size={20} className="text-amber-500" /> : <Smile size={20} className="text-emerald-500" />}
                               </span>
                           </div>
                           <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-stoic-blue transition-colors">
                               {i % 2 === 0 ? 'Focusing on what I can control today' : 'Reflecting on the argument with Dave'}
                           </h3>
                           <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                               Today started chaotic but I managed to pause and breathe before responding to the email. The dichotomy of control really helped when...
                           </p>
                       </div>
                       <div className="flex gap-2">
                           <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#work</span>
                           <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#patience</span>
                       </div>
                   </div>
               </Link>
           ))}
       </div>
    </div>
  );
};

export default JournalList;
