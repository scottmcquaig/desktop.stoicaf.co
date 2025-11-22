'use client';
import React, { useState, useEffect } from 'react';
import { User, Sliders, Bell, CreditCard, LogOut, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

const settingsNav = [
  { id: 'Profile', icon: <User size={20} /> },
  { id: 'Preferences', icon: <Sliders size={20} /> },
  { id: 'Notifications', icon: <Bell size={20} /> },
  { id: 'Subscription', icon: <CreditCard size={20} /> },
];

type ChadTone = 'gentle' | 'reality-check' | 'drill-sergeant' | 'roast-me';
type PillarFocus = 'money' | 'ego' | 'relationships' | 'discipline';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Preferences');
  const [saving, setSaving] = useState(false);
  const [chadTone, setChadTone] = useState<ChadTone>('reality-check');
  const [pillarFocus, setPillarFocus] = useState<PillarFocus>('money');
  const [dailyPrompt, setDailyPrompt] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useIsMobile();
  const { user, userProfile, signOut, updateUserProfile } = useAuth();
  const router = useRouter();

  // Load user preferences
  useEffect(() => {
    if (userProfile) {
      setChadTone(userProfile.chadTone || 'reality-check');
      setPillarFocus(userProfile.pillarFocus || 'money');
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        chadTone,
        pillarFocus,
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderNav = () => {
    if (isMobile) {
      return (
        <div className="col-span-1 md:col-span-12">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center justify-around shadow-inner">
            {settingsNav.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 transition-all ${activeTab === item.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                aria-label={item.id}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="md:col-span-4 lg:col-span-3 space-y-1">
        {settingsNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === item.id
                ? 'bg-white text-stoic-blue shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {item.icon}
            {item.id}
          </button>
        ))}
        <div className="pt-4 mt-4 border-t border-slate-200">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  const tones: { id: ChadTone; label: string; description: string }[] = [
    { id: 'gentle', label: 'Gentle', description: 'Focuses on empathy and encouragement.' },
    { id: 'reality-check', label: 'Reality Check', description: 'Direct, honest, but supportive.' },
    { id: 'drill-sergeant', label: 'Drill Sergeant', description: 'No excuses. Pure discipline.' },
    { id: 'roast-me', label: 'Roast Me', description: 'Make me laugh while improving.' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {renderNav()}

        {/* Content Area */}
        <div className="col-span-1 md:col-span-12 lg:col-span-9">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">{activeTab}</h2>

            {activeTab === 'Profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-stoic-blue/10 flex items-center justify-center">
                    <User size={32} className="text-stoic-blue" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">
                      {userProfile?.displayName || user?.displayName || 'User'}
                    </p>
                    <p className="text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Account created</span>
                    <span className="text-slate-900">
                      {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Pillar focus</span>
                    <span className="text-slate-900 capitalize">{userProfile?.pillarFocus || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Onboarding</span>
                    <span className={`font-medium ${userProfile?.onboardingComplete ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {userProfile?.onboardingComplete ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Preferences' && (
              <div className="space-y-8">
                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    ChadGPT Tone
                  </label>
                  <div className="grid gap-3">
                    {tones.map((tone) => (
                      <label
                        key={tone.id}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          chadTone === tone.id
                            ? 'border-2 border-stoic-blue bg-sky-50/50'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setChadTone(tone.id)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            chadTone === tone.id ? 'border-[5px] border-stoic-blue' : 'border-slate-300'
                          }`}
                        />
                        <div>
                          <div className="font-bold text-slate-900">{tone.label}</div>
                          <div className="text-sm text-slate-500">{tone.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pillar Focus */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Monthly Pillar Focus
                  </label>
                  <div className="relative">
                    <select
                      value={pillarFocus}
                      onChange={(e) => setPillarFocus(e.target.value as PillarFocus)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none font-bold text-slate-700 focus:ring-2 focus:ring-stoic-blue outline-none"
                    >
                      <option value="money">Money</option>
                      <option value="ego">Ego</option>
                      <option value="relationships">Relationships</option>
                      <option value="discipline">Discipline</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Daily Prompt on Dashboard</div>
                      <div className="text-sm text-slate-500">Show writing prompts on the home screen</div>
                    </div>
                    <Switch checked={dailyPrompt} onCheckedChange={setDailyPrompt} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Dark Mode</div>
                      <div className="text-sm text-slate-500">Switch app appearance</div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button
                    onClick={handleSavePreferences}
                    disabled={saving}
                    className="bg-slate-900 hover:bg-slate-800"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900">Email Reminders</div>
                    <div className="text-sm text-slate-500">Daily journaling prompts via email</div>
                  </div>
                  <Switch
                    checked={userProfile?.emailReminders ?? true}
                    onCheckedChange={(checked) => updateUserProfile({ emailReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900">Browser Notifications</div>
                    <div className="text-sm text-slate-500">Desktop push notifications</div>
                  </div>
                  <Switch
                    checked={userProfile?.browserNotifications ?? false}
                    onCheckedChange={(checked) => updateUserProfile({ browserNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-bold text-slate-900">Reminder Time</div>
                    <div className="text-sm text-slate-500">When to send daily reminders</div>
                  </div>
                  <span className="font-medium text-slate-900">{userProfile?.reminderTime || '6:00 PM'}</span>
                </div>
              </div>
            )}

            {activeTab === 'Subscription' && (
              <div>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 mb-8 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-stoic-blue uppercase mb-1">Current Plan</p>
                    <h3 className="text-2xl font-black text-slate-900">
                      {userProfile?.onboardingComplete ? 'Stoic Pro' : 'Free Trial'}
                    </h3>
                    <p className="text-slate-600 font-medium">
                      {userProfile?.onboardingComplete ? '$9.99 / month' : 'Upgrade to unlock all features'}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
                      userProfile?.onboardingComplete
                        ? 'bg-white text-emerald-600 border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}
                  >
                    {userProfile?.onboardingComplete ? 'Active' : 'Trial'}
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
