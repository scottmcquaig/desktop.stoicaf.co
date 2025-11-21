'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Brain, Flame, Scale, Gavel, Loader2 } from 'lucide-react';

type VirtueFocus = 'wisdom' | 'courage' | 'temperance' | 'justice';
type ChadTone = 'gentle' | 'reality-check' | 'drill-sergeant' | 'roast-me';

const virtues = [
  {
    id: 'wisdom' as VirtueFocus,
    label: 'Wisdom',
    description: 'Understanding and sound judgments',
    icon: Brain,
  },
  {
    id: 'courage' as VirtueFocus,
    label: 'Courage',
    description: 'Facing challenges with bravery',
    icon: Flame,
  },
  {
    id: 'temperance' as VirtueFocus,
    label: 'Temperance',
    description: 'Moderation and self-control',
    icon: Scale,
  },
  {
    id: 'justice' as VirtueFocus,
    label: 'Justice',
    description: 'Fairness and doing what is right',
    icon: Gavel,
  },
];

const tones = [
  {
    id: 'gentle' as ChadTone,
    label: 'Gentle',
    description: 'Focuses on empathy and encouragement.',
  },
  {
    id: 'reality-check' as ChadTone,
    label: 'Reality Check',
    description: 'Direct, honest, but supportive.',
  },
  {
    id: 'drill-sergeant' as ChadTone,
    label: 'Drill Sergeant',
    description: 'No excuses. Pure discipline.',
  },
  {
    id: 'roast-me' as ChadTone,
    label: 'Roast Me',
    description: 'Make me laugh while improving.',
  },
];

const reminderTimes = [
  { id: 'morning', label: 'Morning', time: '8:00 AM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM' },
  { id: 'evening', label: 'Evening', time: '6:00 PM' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [virtueFocus, setVirtueFocus] = useState<VirtueFocus | null>(null);
  const [chadTone, setChadTone] = useState<ChadTone>('reality-check');
  const [currentStruggle, setCurrentStruggle] = useState('');
  const [reminderTime, setReminderTime] = useState('evening');
  const [emailReminders, setEmailReminders] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateUserProfile } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        virtueFocus: virtueFocus || undefined,
        chadTone,
        currentStruggle: currentStruggle || undefined,
        reminderTime: reminderTimes.find((r) => r.id === reminderTime)?.time,
        emailReminders,
        browserNotifications,
        onboardingComplete: true,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return virtueFocus !== null;
      case 2:
        return true; // chadTone always has a default
      case 3:
        return true; // currentStruggle is optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
        <CardContent className="pt-6 flex-1 flex flex-col">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-1 rounded-full transition-colors ${
                    s <= step ? 'bg-stoic-blue' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Step {step}/4</span>
          </div>

          {/* Step content */}
          <div className="flex-1">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Virtue Focus</h2>
                <p className="text-slate-500 mb-8">What do you want to cultivate this month?</p>

                <div className="grid grid-cols-2 gap-4">
                  {virtues.map((virtue) => {
                    const Icon = virtue.icon;
                    return (
                      <button
                        key={virtue.id}
                        onClick={() => setVirtueFocus(virtue.id)}
                        className={`p-6 border-2 rounded-xl text-left transition-all group hover:border-stoic-blue hover:bg-sky-50 ${
                          virtueFocus === virtue.id
                            ? 'border-stoic-blue bg-sky-50'
                            : 'border-slate-100'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-stoic-blue" />
                        </div>
                        <span className="font-bold text-slate-900 block">{virtue.label}</span>
                        <span className="text-xs text-slate-500">{virtue.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose CHAD&apos;s Tone</h2>
                <p className="text-slate-500 mb-8">How should CHAD coach you?</p>

                <RadioGroup value={chadTone} onValueChange={(v) => setChadTone(v as ChadTone)}>
                  <div className="space-y-3">
                    {tones.map((tone) => (
                      <div
                        key={tone.id}
                        className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${
                          chadTone === tone.id ? 'border-2 border-stoic-blue bg-sky-50' : 'border-slate-200'
                        }`}
                        onClick={() => setChadTone(tone.id)}
                      >
                        <RadioGroupItem value={tone.id} id={tone.id} />
                        <Label htmlFor={tone.id} className="flex-1 cursor-pointer">
                          <span className="font-bold text-slate-900 block">{tone.label}</span>
                          <span className="text-sm text-slate-500">{tone.description}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  What&apos;s Your Current Struggle?
                </h2>
                <p className="text-slate-500 mb-8">Help us personalize your experience</p>

                <Textarea
                  value={currentStruggle}
                  onChange={(e) => setCurrentStruggle(e.target.value)}
                  placeholder="Describe what you're working on right now..."
                  className="min-h-[150px] border-slate-300 focus:ring-2 focus:ring-stoic-blue focus:border-transparent"
                  maxLength={500}
                />
                <p className="text-xs text-slate-400 mt-2 text-right">
                  {currentStruggle.length}/500 characters
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Set Your Reminders</h2>
                <p className="text-slate-500 mb-8">When should we nudge you?</p>

                <RadioGroup value={reminderTime} onValueChange={setReminderTime}>
                  <div className="space-y-3 mb-8">
                    {reminderTimes.map((time) => (
                      <div
                        key={time.id}
                        className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${
                          reminderTime === time.id
                            ? 'border-2 border-stoic-blue bg-sky-50'
                            : 'border-slate-200'
                        }`}
                        onClick={() => setReminderTime(time.id)}
                      >
                        <RadioGroupItem value={time.id} id={time.id} />
                        <Label htmlFor={time.id} className="flex-1 cursor-pointer">
                          <span className="font-bold text-slate-900">{time.label}</span>
                          <span className="text-sm text-slate-500 ml-2">({time.time})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-900 block">Email reminders</span>
                      <span className="text-sm text-slate-500">Get daily journaling prompts</span>
                    </div>
                    <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-900 block">Browser notifications</span>
                      <span className="text-sm text-slate-500">Desktop push notifications</span>
                    </div>
                    <Switch
                      checked={browserNotifications}
                      onCheckedChange={setBrowserNotifications}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="text-slate-500"
            >
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-stoic-blue hover:bg-sky-600 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={loading}
                className="bg-stoic-blue hover:bg-sky-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Complete'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
