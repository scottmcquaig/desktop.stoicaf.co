'use client';
import React, { useState, useEffect } from 'react';
import { User, Sliders, Bell, CreditCard, LogOut, Loader2, Download, Trash2, Upload, Edit2, Camera, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { getRecentEntries } from '@/lib/firebase/journal';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [editingName, setEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  const handleUpdateDisplayName = async () => {
    if (!user || !newDisplayName.trim()) return;

    setSaving(true);
    try {
      await updateProfile(user, {
        displayName: newDisplayName.trim()
      });
      await updateUserProfile({
        displayName: newDisplayName.trim()
      });
      setEditingName(false);
      toast.success('Display name updated successfully');
    } catch (error) {
      console.error('Error updating display name:', error);
      toast.error('Failed to update display name');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Photo must be less than 5MB');
      return;
    }

    setUploadingPhoto(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}`);

      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL });
      await updateUserProfile({ photoURL });

      toast.success('Profile photo updated successfully');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    setExporting(true);
    try {
      // Fetch all journal entries (using a high limit to get all)
      const entries = await getRecentEntries(user.uid, 1000);

      // Prepare export data
      const exportData = {
        exportDate: new Date().toISOString(),
        user: {
          email: user.email,
          displayName: userProfile?.displayName || user.displayName,
          uid: user.uid,
          createdAt: user.metadata.creationTime,
        },
        profile: userProfile,
        journalEntries: entries,
        metadata: {
          totalEntries: entries.length,
          exportVersion: '1.0',
        }
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stoicaf-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setDeleting(true);
    try {
      // Delete user data from Firestore
      // This would typically be handled by a Cloud Function
      await user.delete();
      toast.success('Account deleted successfully');
      router.push('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please sign in again before deleting your account');
        await signOut();
        router.push('/auth/signin');
      } else {
        toast.error('Failed to delete account');
      }
    } finally {
      setDeleting(false);
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
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-stoic-blue/10 flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-stoic-blue" />
                      )}
                    </div>
                    <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-slate-50">
                      <Camera size={16} className="text-slate-700" />
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={uploadingPhoto}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={newDisplayName}
                          onChange={(e) => setNewDisplayName(e.target.value)}
                          placeholder="Enter new name"
                          className="max-w-xs"
                        />
                        <Button
                          size="sm"
                          onClick={handleUpdateDisplayName}
                          disabled={saving}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingName(false);
                            setNewDisplayName('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-slate-900">
                          {userProfile?.displayName || user?.displayName || 'User'}
                        </p>
                        <button
                          onClick={() => {
                            setEditingName(true);
                            setNewDisplayName(userProfile?.displayName || user?.displayName || '');
                          }}
                          className="p-1 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          <Edit2 size={16} className="text-slate-600" />
                        </button>
                      </div>
                    )}
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

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      disabled={exporting}
                      className="flex-1"
                    >
                      {exporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Export My Data
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                      <h3 className="font-bold text-red-900 mb-2">Danger Zone</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove all of your data from our servers, including
                              all journal entries, preferences, and progress.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              disabled={deleting}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {deleting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                'Yes, delete my account'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
              <div className="space-y-6">
                {/* Toggle switches */}
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
                      onCheckedChange={async (checked) => {
                        if (checked && 'Notification' in window) {
                          const permission = await Notification.requestPermission();
                          if (permission !== 'granted') {
                            toast.error('Please enable notifications in your browser settings');
                            return;
                          }
                        }
                        updateUserProfile({ browserNotifications: checked });
                      }}
                    />
                  </div>
                </div>

                {/* Reminder Time Selection */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    <Clock size={16} className="inline mr-2" />
                    Reminder Time
                  </label>
                  <Select
                    value={userProfile?.reminderTime || '18:00'}
                    onValueChange={(value) => updateUserProfile({ reminderTime: value })}
                  >
                    <SelectTrigger className="w-full min-h-11">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM - Early bird</SelectItem>
                      <SelectItem value="08:00">8:00 AM - Morning</SelectItem>
                      <SelectItem value="12:00">12:00 PM - Noon</SelectItem>
                      <SelectItem value="17:00">5:00 PM - After work</SelectItem>
                      <SelectItem value="18:00">6:00 PM - Evening</SelectItem>
                      <SelectItem value="20:00">8:00 PM - Night owl</SelectItem>
                      <SelectItem value="21:00">9:00 PM - Before bed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reminder Days Selection */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Reminder Days
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { id: 'sun', label: 'S' },
                      { id: 'mon', label: 'M' },
                      { id: 'tue', label: 'T' },
                      { id: 'wed', label: 'W' },
                      { id: 'thu', label: 'T' },
                      { id: 'fri', label: 'F' },
                      { id: 'sat', label: 'S' },
                    ].map((day) => {
                      const reminderDays = userProfile?.reminderDays || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                      const isSelected = reminderDays.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          onClick={() => {
                            const newDays = isSelected
                              ? reminderDays.filter((d) => d !== day.id)
                              : [...reminderDays, day.id];
                            updateUserProfile({ reminderDays: newDays });
                          }}
                          className={`min-h-11 min-w-11 rounded-full font-bold text-sm transition-all ${
                            isSelected
                              ? 'bg-primary text-white'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {(userProfile?.reminderDays || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']).length === 7
                      ? 'Every day'
                      : `${(userProfile?.reminderDays || []).length} days selected`}
                  </p>
                </div>

                {/* Info box */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mt-6">
                  <p className="text-sm text-sky-800">
                    <strong>Note:</strong> Email reminders require a verified email address.
                    Browser notifications require permission from your browser.
                  </p>
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
