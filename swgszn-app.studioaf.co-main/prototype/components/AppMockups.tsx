
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StoicLogo } from './StoicLogo';
import { 
  Brain, 
  Flame, 
  Scale, 
  Gavel, 
  Activity, 
  MoreHorizontal, 
  Edit3, 
  MessageCircle, 
  LineChart, 
  List, 
  Grid, 
  Calendar, 
  Plus, 
  Search, 
  Edit, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Lightbulb, 
  RefreshCcw, 
  Ban, 
  CheckCircle2, 
  Mic, 
  Tag, 
  User, 
  Sliders, 
  Bell, 
  CreditCard, 
  Share2, 
  Download, 
  Bot, 
  Smile, 
  Meh, 
  Frown 
} from 'lucide-react';

// --- SHARED UI ELEMENTS ---
const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-stoic-blue text-white hover:bg-sky-600 shadow-sm hover:shadow-md",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border border-slate-300 text-slate-600 hover:border-stoic-blue hover:text-stoic-blue bg-white",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
  };
  return <button className={`${base} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, color = 'blue' }: any) => {
  const colors = {
    blue: "bg-sky-100 text-stoic-blue border-sky-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    gray: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${colors[color as keyof typeof colors]}`}>{children}</span>;
};

// --- 1. AUTH MOCKUP ---
export const AuthMockup = () => (
  <div className="flex items-center justify-center min-h-[600px] bg-slate-50 p-4">
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            <StoicLogo className="w-full h-full" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
        <p className="text-slate-500 mt-2">Sign in to continue your practice.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
          <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-stoic-blue focus:border-transparent outline-none transition-all" placeholder="marcus@rome.com" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700 uppercase">Password</label>
            <a href="#" className="text-xs text-stoic-blue hover:underline">Forgot?</a>
          </div>
          <input type="password" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-stoic-blue focus:border-transparent outline-none transition-all" placeholder="••••••••" />
        </div>
        <Button className="w-full py-3">Sign In</Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Or</span></div>
        </div>
        
        <p className="text-center text-sm text-slate-600">
          Don't have an account? <a href="#" className="text-stoic-blue font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </Card>
  </div>
);

// --- 2. ONBOARDING MOCKUP ---
export const OnboardingMockup = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="flex items-center justify-center min-h-[600px] bg-slate-50 p-4">
      <Card className="w-full max-w-xl min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-stoic-blue' : 'bg-slate-200'}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Step {step}/4</span>
        </div>

        <div className="flex-grow text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Virtue Focus</h2>
          <p className="text-slate-500 mb-8">What do you want to cultivate this month?</p>

          <div className="grid grid-cols-2 gap-4">
            {['Wisdom', 'Courage', 'Temperance', 'Justice'].map((virtue) => (
              <button key={virtue} className="p-6 rounded-xl border-2 border-slate-100 hover:border-stoic-blue hover:bg-sky-50 transition-all group text-left">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-stoic-blue">
                   {virtue === 'Wisdom' && <Brain size={20} />}
                   {virtue === 'Courage' && <Flame size={20} />}
                   {virtue === 'Temperance' && <Scale size={20} />}
                   {virtue === 'Justice' && <Gavel size={20} />}
                </div>
                <span className="font-bold text-slate-900 block">{virtue}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
          <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Button>
          <Button onClick={() => setStep(Math.min(4, step + 1))}>
            {step === 4 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

// --- 3. DASHBOARD MOCKUP ---
export const DashboardMockup = () => (
  <div className="bg-slate-50 p-4 md:p-8 min-h-[800px] font-sans">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Header */}
      <div className="md:col-span-12 mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Good Morning, Marcus! 👋</h1>
        <p className="text-slate-500">Let's focus on what's within your control today.</p>
      </div>

      {/* Main Widgets */}
      <div className="md:col-span-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Streak</span>
              <Flame className="text-orange-500" size={20} />
            </div>
            <div className="text-4xl font-extrabold mb-1">15 <span className="text-lg font-medium text-slate-400">days</span></div>
            <p className="text-xs text-slate-400">Last entry: Yesterday</p>
          </Card>
          <Card>
             <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mood Trend</span>
              <Activity className="text-stoic-blue" size={20} />
            </div>
            <div className="h-16 flex items-end gap-1">
               {[40, 60, 45, 70, 80, 60, 75].map((h, i) => (
                 <div key={i} className="flex-1 bg-sky-100 rounded-t-sm relative group">
                    <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-stoic-blue rounded-t-sm transition-all group-hover:bg-sky-600"></div>
                 </div>
               ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">Avg: 4.2/5</p>
          </Card>
        </div>

        {/* Quote of the Day */}
        <Card className="border-l-4 border-l-stoic-blue">
          <div className="flex justify-between items-start mb-4">
             <Badge color="gray">Daily Stoic Quote</Badge>
             <MoreHorizontal className="text-slate-400 cursor-pointer" size={20} />
          </div>
          <blockquote className="text-xl font-serif text-slate-800 italic mb-4 leading-relaxed">
            "The impediment to action advances action. What stands in the way becomes the way."
          </blockquote>
          <p className="text-sm font-bold text-slate-900 mb-4">— Marcus Aurelius</p>
          
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold flex-shrink-0">
               <Bot size={16} />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">MARC says:</span> This reminds us that obstacles aren't stop signs—they're training grounds. The difficult coworker is patience training. The lost deal is resilience training.
            </p>
          </div>
        </Card>

        {/* Recent Entries */}
        <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Recent Entries</h3>
              <Button variant="ghost" className="text-xs">View All</Button>
            </div>
            <div className="space-y-4">
                {[
                    { date: "Nov 16", title: "Morning Intent", mood: <Smile size={16} />, text: "Today I want to focus on being present..." },
                    { date: "Nov 15", title: "Free-Form Reflection", mood: <Meh size={16} />, text: "Feeling stuck on this project, but I know..." },
                    { date: "Nov 14", title: "Evening Audit", mood: <Smile size={16} />, text: "What went well today: finished the..." }
                ].map((entry, i) => (
                    <div key={i} className="p-4 rounded-lg border border-slate-100 hover:border-stoic-blue/30 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">{entry.date}</span>
                            <span className="text-sm text-slate-400">{entry.mood}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-stoic-blue transition-colors">{entry.title}</h4>
                        <p className="text-sm text-slate-500 truncate">{entry.text}</p>
                    </div>
                ))}
            </div>
        </Card>
      </div>

      {/* Sidebar Widgets */}
      <div className="md:col-span-4 space-y-6">
        {/* Virtue Progress */}
        <Card>
          <h3 className="font-bold text-slate-900 mb-6">Virtue Progress</h3>
          <div className="space-y-5">
             {[
                 { label: 'Wisdom', val: 80, color: 'bg-indigo-500' },
                 { label: 'Courage', val: 45, color: 'bg-red-500' },
                 { label: 'Temperance', val: 60, color: 'bg-emerald-500' },
                 { label: 'Justice', val: 30, color: 'bg-amber-500' }
             ].map((v) => (
                 <div key={v.label}>
                     <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                         <span>{v.label}</span>
                         <span>{v.val}%</span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div style={{width: `${v.val}%`}} className={`h-full rounded-full ${v.color}`}></div>
                     </div>
                 </div>
             ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
           <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
           <div className="space-y-2">
             <Button className="w-full justify-start bg-slate-900 text-white hover:bg-slate-800">
                 <Edit3 size={18} /> New Entry
             </Button>
             <Button variant="outline" className="w-full justify-start">
                 <MessageCircle size={18} /> Chat with CHAD
             </Button>
             <Button variant="outline" className="w-full justify-start">
                 <LineChart size={18} /> View Insights
             </Button>
           </div>
        </Card>
        
        {/* Trial Banner */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
            <p className="text-xs font-bold text-stoic-blue uppercase mb-1">Pro Trial Active</p>
            <p className="text-sm text-slate-700 mb-3">5 days left to explore AI features.</p>
            <Button className="w-full py-1.5 text-xs">Upgrade Now</Button>
        </div>
      </div>
    </div>
  </div>
);

// --- 4. JOURNAL LIST MOCKUP ---
export const JournalListMockup = () => (
    <div className="bg-slate-50 p-4 md:p-8 min-h-[800px]">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Your Journal</h1>
                    <p className="text-slate-500">47 entries • Last entry yesterday</p>
                </div>
                <div className="flex gap-2">
                     <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
                         <button className="p-2 bg-slate-100 rounded text-slate-900"><List size={18} /></button>
                         <button className="p-2 text-slate-400 hover:text-slate-600"><Grid size={18} /></button>
                         <button className="p-2 text-slate-400 hover:text-slate-600"><Calendar size={18} /></button>
                     </div>
                     <Button><Plus size={18} /> New Entry</Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
                <div className="relative flex-grow md:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search entries..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-stoic-blue outline-none" />
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex gap-2 overflow-x-auto">
                    <Badge color="gray">All Moods ▼</Badge>
                    <Badge color="gray">All Tags ▼</Badge>
                    <Badge color="gray">Templates ▼</Badge>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="hover:border-stoic-blue/50 transition-all group">
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nov {17-i}, 2025</span>
                                    <Badge color={i % 2 === 0 ? 'blue' : 'green'}>{i % 2 === 0 ? 'Morning Intent' : 'Evening Audit'}</Badge>
                                    <span className="text-lg">{i % 3 === 0 ? <Meh size={18} className="text-amber-500" /> : <Smile size={18} className="text-emerald-500" />}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-stoic-blue transition-colors">
                                    {i % 2 === 0 ? 'Focusing on what I can control today' : 'Reflecting on the argument with Dave'}
                                </h3>
                                <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                                    Today started chaotic but I managed to pause and breathe before responding to the email. The dichotomy of control really helped when...
                                </p>
                                <div className="flex gap-2">
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#work</span>
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#patience</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" className="p-2 h-auto"><Edit size={16} /></Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
                 <Button variant="outline" className="w-10 h-10 p-0"><ChevronLeft size={18} /></Button>
                 <Button variant="primary" className="w-10 h-10 p-0 bg-slate-900 text-white">1</Button>
                 <Button variant="outline" className="w-10 h-10 p-0">2</Button>
                 <Button variant="outline" className="w-10 h-10 p-0">3</Button>
                 <Button variant="outline" className="w-10 h-10 p-0"><ChevronRight size={18} /></Button>
            </div>
        </div>
    </div>
);

// --- 5. NEW ENTRY MOCKUP ---
export const JournalNewMockup = () => (
    <div className="bg-slate-50 p-4 md:p-8 min-h-[800px]">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
            {/* Editor Toolbar */}
            <div className="border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="p-2 h-auto text-slate-400"><ChevronLeft size={24} /></Button>
                    <span className="font-bold text-slate-900">New Entry</span>
                    <Badge color="blue">Dichotomy of Control ▼</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 uppercase font-bold">Saved</span>
                    <Button className="px-6">Publish</Button>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreVertical size={20} /></button>
                </div>
            </div>

            {/* Editor Content */}
            <div className="p-8 flex-grow overflow-y-auto">
                {/* Prompt */}
                <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 mb-8 flex gap-4 items-start">
                     <div className="bg-white p-2 rounded-full shadow-sm text-amber-400">
                         <Lightbulb size={20} fill="currentColor" />
                     </div>
                     <div>
                         <p className="text-sm font-bold text-stoic-blue uppercase mb-1">Daily Prompt</p>
                         <p className="text-slate-800 font-medium">What is one thing stressing you out right now, and is it completely within your control?</p>
                     </div>
                     <Button variant="ghost" className="ml-auto h-auto p-1 text-slate-400 hover:text-stoic-blue"><RefreshCcw size={16} /></Button>
                </div>

                {/* Dichotomy Template Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-red-50 rounded-xl p-4 border border-red-100 min-h-[200px]">
                        <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                            <Ban size={18} /> ON GOD (Not in my control)
                        </h3>
                        <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
                            <li>The client's budget decision</li>
                            <li>Traffic on the way to the meeting</li>
                            <li>My coworker's mood today</li>
                        </ul>
                        <textarea className="w-full bg-transparent mt-2 outline-none text-sm text-slate-600 placeholder-red-300" placeholder="Add item..." rows={2}></textarea>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 min-h-[200px]">
                        <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} /> ON ME (In my control)
                        </h3>
                        <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
                            <li>The quality of my proposal</li>
                            <li>Leaving 15 minutes early</li>
                            <li>My patience and response</li>
                        </ul>
                        <textarea className="w-full bg-transparent mt-2 outline-none text-sm text-slate-600 placeholder-emerald-300" placeholder="Add item..." rows={2}></textarea>
                    </div>
                </div>

                {/* Free writing area */}
                <textarea className="w-full outline-none text-lg text-slate-800 placeholder-slate-300 resize-none font-serif leading-relaxed" placeholder="Start writing your reflections here..." rows={6}></textarea>
            </div>

            {/* Footer Meta */}
            <div className="border-t border-slate-100 p-4 flex justify-between items-center bg-slate-50 rounded-b-xl">
                <div className="flex items-center gap-4">
                     <div className="flex gap-1">
                        {[<Frown size={18} />, <Meh size={18} />, <Smile size={18} />].map((icon, i) => (
                            <button key={i} className="w-8 h-8 rounded bg-white border border-slate-200 text-slate-400 hover:border-stoic-blue hover:text-stoic-blue transition-colors flex items-center justify-center">{icon}</button>
                        ))}
                     </div>
                     <div className="h-6 w-px bg-slate-200"></div>
                     <div className="flex gap-2">
                         <span className="bg-white px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 flex items-center gap-1">#work <button>×</button></span>
                         <button className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase flex items-center gap-1"><Tag size={12} /> Tag</button>
                     </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                     <Mic className="cursor-pointer hover:text-slate-600" size={20} />
                     <span className="text-xs font-mono">0 words</span>
                </div>
            </div>
        </div>
    </div>
);

// --- 6. INSIGHTS MOCKUP ---
export const InsightsMockup = () => (
    <div className="bg-slate-50 p-4 md:p-8 min-h-[800px]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12 flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-slate-900">Your Insights</h1>
                <Button variant="outline">Export Data</Button>
            </div>

            {/* Heatmap */}
            <div className="md:col-span-8">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">30-Day Mood Heatmap</h3>
                        <div className="flex gap-2 text-xs">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm"></div> Low</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-400 rounded-sm"></div> Okay</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Good</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {['M','T','W','T','F','S','S'].map(d => <div key={d} className="text-center text-xs font-bold text-slate-400 mb-2">{d}</div>)}
                        {Array.from({length: 28}).map((_, i) => {
                            const colors = ['bg-slate-100', 'bg-red-400', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-600'];
                            const color = colors[Math.floor(Math.random() * colors.length)];
                            return <div key={i} className={`aspect-square rounded-md ${color} hover:opacity-80 cursor-pointer transition-opacity`}></div>
                        })}
                    </div>
                </Card>
            </div>

            {/* Virtue Ring (Simulated) */}
            <div className="md:col-span-4">
                <Card className="h-full flex flex-col justify-center items-center">
                    <h3 className="font-bold text-slate-900 mb-6 self-start w-full">Virtue Focus</h3>
                    <div className="relative w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
                         {/* This is a hacky CSS donut for mock purposes */}
                         <div className="absolute inset-0 border-[16px] border-stoic-blue rounded-full border-l-transparent border-b-transparent transform rotate-45"></div>
                         <div className="text-center">
                             <div className="text-3xl font-bold text-slate-900">Wisdom</div>
                             <div className="text-xs text-slate-500">Top Virtue</div>
                         </div>
                    </div>
                    <div className="mt-8 w-full space-y-2">
                        <div className="flex justify-between text-sm"><span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-stoic-blue"></div> Wisdom</span> <span className="font-bold">45%</span></div>
                        <div className="flex justify-between text-sm"><span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Courage</span> <span className="font-bold text-slate-400">25%</span></div>
                    </div>
                </Card>
            </div>

            {/* AI Summary */}
            <div className="md:col-span-12">
                <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                           <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Weekly AI Reflection</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                "I notice you've been focusing heavily on <strong>'work stress'</strong> this week (mentioned 5 entries). However, your mood actually improved mid-week when you shifted focus to <strong>gratitude</strong>. You're developing better control over your reactions to management feedback. Keep leaning into that Temperance."
                            </p>
                            <Button className="bg-white text-slate-900 hover:bg-slate-200 border-none text-xs">View Detailed Analysis</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

// --- 7. SETTINGS MOCKUP ---
export const SettingsMockup = () => (
    <div className="bg-slate-50 p-4 md:p-8 min-h-[800px]">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Nav */}
                <div className="md:col-span-1">
                    <nav className="space-y-1">
                        {[
                          {name: 'Profile', icon: <User size={16} />}, 
                          {name: 'Preferences', icon: <Sliders size={16} />}, 
                          {name: 'Notifications', icon: <Bell size={16} />}, 
                          {name: 'Subscription', icon: <CreditCard size={16} />}, 
                        ].map((item, i) => (
                            <button key={item.name} className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-2 ${i === 1 ? 'bg-white text-stoic-blue shadow-sm border border-slate-100' : 'text-slate-600 hover:bg-slate-100'}`}>
                                {item.icon}
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Preferences</h2>
                        
                        <div className="space-y-8">
                            {/* Chad Tone */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-3">CHAD's Coaching Tone</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-700">Gentle (Compassionate)</div>
                                            <div className="text-xs text-slate-500">Focuses on empathy and encouragement.</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border-2 border-stoic-blue bg-sky-50 rounded-lg cursor-pointer">
                                        <div className="w-5 h-5 rounded-full border-4 border-stoic-blue"></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-900">Reality Check (Balanced)</div>
                                            <div className="text-xs text-slate-600">Direct, honest, but supportive.</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-700">Drill Sergeant (Tough Love)</div>
                                            <div className="text-xs text-slate-500">No excuses. Pure discipline.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Virtue Focus */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-3">Current Virtue Focus</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-stoic-blue">
                                    <option>Wisdom</option>
                                    <option>Courage</option>
                                    <option>Justice</option>
                                    <option>Temperance</option>
                                </select>
                                <p className="text-xs text-slate-500 mt-2">This determines your daily prompts and quote selection.</p>
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">Daily Prompts</div>
                                        <div className="text-xs text-slate-500">Show writing prompts on the new entry screen</div>
                                    </div>
                                    <div className="w-12 h-6 bg-stoic-blue rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">MARC Insights (Pro)</div>
                                        <div className="text-xs text-slate-500">Get AI commentary after saving entries</div>
                                    </div>
                                    <div className="w-12 h-6 bg-stoic-blue rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                                </div>
                                <div className="flex items-center justify-between opacity-50">
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">Dark Mode</div>
                                        <div className="text-xs text-slate-500">Switch app appearance</div>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </Card>
                    
                    <Card>
                         <h2 className="text-xl font-bold text-slate-900 mb-4">Subscription</h2>
                         <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
                             <div>
                                 <div className="font-bold text-slate-900">Stoic Pro</div>
                                 <div className="text-xs text-slate-500">$9.99 / month</div>
                             </div>
                             <Badge color="green">Active</Badge>
                         </div>
                         <div className="text-right">
                             <a href="#" className="text-sm text-stoic-blue font-bold hover:underline">Manage Subscription</a>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
);

export default {
  AuthMockup,
  OnboardingMockup,
  DashboardMockup,
  JournalListMockup,
  JournalNewMockup,
  InsightsMockup,
  SettingsMockup
};
