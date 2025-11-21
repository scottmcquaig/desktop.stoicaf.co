
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Sliders, 
  Bell, 
  CreditCard, 
  LogOut 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Preferences');

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1">
            {[
                { id: 'Profile', icon: <User size={20} /> },
                { id: 'Preferences', icon: <Sliders size={20} /> },
                { id: 'Notifications', icon: <Bell size={20} /> },
                { id: 'Subscription', icon: <CreditCard size={20} /> },
            ].map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === item.id ? 'bg-white text-stoic-blue shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    {item.icon}
                    {item.id}
                </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-200">
                <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all">
                    <LogOut size={20} />
                    Sign Out
                </Link>
            </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">{activeTab}</h2>

                {activeTab === 'Preferences' && (
                    <div className="space-y-8">
                        {/* Tone Selection */}
                        <div>
                            <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Coach Tone</label>
                            <div className="grid gap-3">
                                <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-stoic-blue"></div>
                                    <div>
                                        <div className="font-bold text-slate-900">Gentle (Compassionate)</div>
                                        <div className="text-sm text-slate-500">Focuses on empathy and encouragement.</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border-2 border-stoic-blue bg-sky-50/50 rounded-xl cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border-[5px] border-stoic-blue"></div>
                                    <div>
                                        <div className="font-bold text-slate-900">Reality Check (Balanced)</div>
                                        <div className="text-sm text-slate-600">Direct, honest, but supportive. Recommended.</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-stoic-blue"></div>
                                    <div>
                                        <div className="font-bold text-slate-900">Drill Sergeant (Tough Love)</div>
                                        <div className="text-sm text-slate-500">No excuses. Pure discipline.</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Virtue Focus */}
                        <div>
                            <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Monthly Focus</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none font-bold text-slate-700 focus:ring-2 focus:ring-stoic-blue outline-none">
                                    <option>Wisdom</option>
                                    <option>Courage</option>
                                    <option>Justice</option>
                                    <option>Temperance</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-slate-900">Daily Prompt on Dashboard</div>
                                    <div className="text-sm text-slate-500">Show writing prompts on the home screen</div>
                                </div>
                                <div className="w-12 h-7 bg-stoic-blue rounded-full relative cursor-pointer transition-colors"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-slate-900">Dark Mode</div>
                                    <div className="text-sm text-slate-500">Switch app appearance</div>
                                </div>
                                <div className="w-12 h-7 bg-slate-200 rounded-full relative cursor-pointer transition-colors hover:bg-slate-300"><div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors">Save Changes</button>
                        </div>
                    </div>
                )}

                {activeTab === 'Subscription' && (
                    <div>
                         <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 mb-8 flex justify-between items-center">
                             <div>
                                 <p className="text-xs font-bold text-stoic-blue uppercase mb-1">Current Plan</p>
                                 <h3 className="text-2xl font-black text-slate-900">Stoic Pro</h3>
                                 <p className="text-slate-600 font-medium">$9.99 / month</p>
                             </div>
                             <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-emerald-600 border border-emerald-100 shadow-sm">Active</div>
                         </div>
                         
                         <div className="space-y-4">
                             <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                 <span className="font-medium text-slate-700">Next billing date</span>
                                 <span className="font-bold text-slate-900">Dec 18, 2025</span>
                             </div>
                             <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                 <span className="font-medium text-slate-700">Payment Method</span>
                                 <span className="font-bold text-slate-900 flex items-center gap-2">Visa •••• 4242</span>
                             </div>
                         </div>

                         <div className="mt-8 flex gap-4">
                             <button className="text-stoic-blue font-bold hover:underline">Update Payment</button>
                             <button className="text-red-500 font-bold hover:underline ml-auto">Cancel Subscription</button>
                         </div>
                    </div>
                )}

                {(activeTab === 'Profile' || activeTab === 'Notifications') && (
                    <div className="text-center py-20 text-slate-400">
                        <p>This section is under construction in the prototype.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
