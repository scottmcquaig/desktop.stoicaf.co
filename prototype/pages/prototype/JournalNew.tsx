
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  MoreVertical, 
  Lightbulb, 
  RefreshCcw, 
  Ban, 
  CheckCircle2, 
  Mic, 
  Tag,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

const JournalNew: React.FC = () => {
  const [template, setTemplate] = useState('Dichotomy of Control');

  return (
    <div className="h-full flex flex-col bg-white md:bg-slate-50">
      {/* Editor Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
         <div className="flex items-center gap-3">
             <Link to="/app/journal" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors flex items-center">
                 <ChevronLeft size={24} />
             </Link>
             <div>
                 <h2 className="font-bold text-slate-900 leading-tight">New Entry</h2>
                 <div className="flex items-center gap-1 text-xs text-slate-500">
                     <span>Template:</span>
                     <select 
                       value={template} 
                       onChange={(e) => setTemplate(e.target.value)}
                       className="bg-transparent font-bold text-stoic-blue outline-none cursor-pointer"
                     >
                         <option>Dichotomy of Control</option>
                         <option>Morning Intent</option>
                         <option>Evening Audit</option>
                         <option>Free Form</option>
                     </select>
                 </div>
             </div>
         </div>
         <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-slate-300 uppercase hidden md:inline">Saved</span>
             <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">Publish</button>
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg flex items-center">
               <MoreVertical size={20} />
             </button>
         </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto bg-white md:min-h-[800px] md:p-8 md:shadow-sm md:rounded-xl md:border md:border-slate-200">
              
              {/* Daily Prompt */}
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-8 flex gap-4 animate-in slide-in-from-top-2 duration-500">
                 <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-amber-400">
                    <Lightbulb size={20} fill="currentColor" />
                 </div>
                 <div>
                     <p className="text-xs font-bold text-stoic-blue uppercase tracking-wider mb-1">Daily Prompt</p>
                     <p className="text-slate-800 font-medium leading-relaxed">
                        "What is one thing stressing you out right now, and is it completely within your control?"
                     </p>
                 </div>
                 <button className="ml-auto text-slate-400 hover:text-stoic-blue p-1 self-start flex items-center">
                    <RefreshCcw size={16} />
                 </button>
              </div>

              {/* Dichotomy Template Blocks */}
              {template === 'Dichotomy of Control' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 min-h-[200px] focus-within:ring-2 focus-within:ring-red-200 transition-all">
                          <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                              <Ban size={16} className="text-red-600" /> ON GOD (Not in my control)
                          </h3>
                          <textarea className="w-full bg-transparent outline-none text-slate-700 placeholder-red-300 resize-none leading-relaxed" placeholder="• Other people's opinions&#10;• The outcome of the project&#10;• Traffic..." rows={6}></textarea>
                      </div>
                      <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 min-h-[200px] focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
                          <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                              <CheckCircle2 size={16} className="text-emerald-600" /> ON ME (In my control)
                          </h3>
                          <textarea className="w-full bg-transparent outline-none text-slate-700 placeholder-emerald-300 resize-none leading-relaxed" placeholder="• My effort&#10;• My preparation&#10;• My attitude..." rows={6}></textarea>
                      </div>
                  </div>
              )}

              {/* Main Text Area */}
              <textarea 
                className="w-full h-[400px] resize-none outline-none text-lg text-slate-800 placeholder-slate-300 font-serif leading-loose"
                placeholder="Start writing your reflection..."
              ></textarea>

          </div>
      </div>

      {/* Editor Footer */}
      <footer className="bg-white border-t border-slate-200 p-3 md:p-4 sticky bottom-0 z-10">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
               <div className="flex items-center gap-4">
                   {/* Mood Selector */}
                   <div className="flex gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
                       {[
                         <Frown size={20} className="text-red-500" />,
                         <Meh size={20} className="text-amber-500" />,
                         <Smile size={20} className="text-emerald-500" />
                       ].map((icon, idx) => (
                           <button key={idx} className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded transition-all">
                               {icon}
                           </button>
                       ))}
                   </div>
                   <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                   <div className="hidden md:flex items-center gap-2">
                       <button className="text-slate-500 hover:text-stoic-blue text-sm font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-50 transition-colors">
                           <Tag size={16} /> Tags
                       </button>
                   </div>
               </div>
               
               <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
                   <button className="hover:text-slate-600 flex items-center">
                    <Mic size={18} />
                   </button>
                   <span className="hidden md:inline">0 words</span>
               </div>
          </div>
      </footer>
    </div>
  );
};

export default JournalNew;
