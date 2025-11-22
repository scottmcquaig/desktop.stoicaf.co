'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import {
  ChevronLeft,
  Sun,
  Moon,
  Columns,
  DollarSign,
  User,
  Heart,
  Target,
  Save,
  Trash2,
  Layout,
  GripVertical,
  Plus,
  X,
  Smile,
  Meh,
  Frown,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';
import { useAuth } from '@/contexts/AuthContext';
import { getTodaysPrompt, PILLAR_THEMES } from '@/lib/firebase/pillarTracks';
import { createEntry, updateEntry, getEntryByDate, getPillarProgress } from '@/lib/firebase/journal';
import type { Pillar, MoodScore, EntryBlock, DayPrompt, BlockType, JournalEntryInput } from '@/lib/types';

const PILLAR_CONFIG: Record<Pillar, { icon: React.ElementType; color: string; activeColor: string }> = {
  money: { icon: DollarSign, color: 'text-slate-400', activeColor: 'text-emerald-500 bg-emerald-50' },
  ego: { icon: User, color: 'text-slate-400', activeColor: 'text-purple-500 bg-purple-50' },
  relationships: { icon: Heart, color: 'text-slate-400', activeColor: 'text-pink-500 bg-pink-50' },
  discipline: { icon: Target, color: 'text-slate-400', activeColor: 'text-amber-500 bg-amber-50' },
};

const BLOCK_TYPES: { type: BlockType; icon: React.ElementType; label: string }[] = [
  { type: 'morning-intent', icon: Sun, label: 'Morning Intent' },
  { type: 'evening-audit', icon: Moon, label: 'Evening Audit' },
  { type: 'dichotomy', icon: Columns, label: 'Dichotomy' },
];

// Helper to get today's date in YYYY-MM-DD format
function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function JournalNewPage() {
  const router = useRouter();
  const { user, userProfile } = useAuth();

  // Get user's active pillar from profile, default to 'ego'
  const defaultPillar = (userProfile?.pillarFocus as Pillar) || 'ego';

  const [pillar, setPillar] = useState<Pillar>(defaultPillar);
  const [dayInTrack, setDayInTrack] = useState(1);
  const [todaysPrompt, setTodaysPrompt] = useState<DayPrompt | null>(null);
  const [blocks, setBlocks] = useState<EntryBlock[]>([
    { id: nanoid(), type: 'freeform', content: '' },
  ]);
  const [mood, setMood] = useState<MoodScore | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPillarWarning, setShowPillarWarning] = useState(false);
  const [pendingPillar, setPendingPillar] = useState<Pillar | null>(null);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [existingEntryId, setExistingEntryId] = useState<string | null>(null);
  const [isLoadingEntry, setIsLoadingEntry] = useState(true);
  const [todayDate] = useState(getTodayDateString());

  // Check for existing entry and load pillar progress on mount
  useEffect(() => {
    const loadExistingEntry = async () => {
      if (!user) return;
      setIsLoadingEntry(true);
      try {
        // Check if there's already an entry for today
        const existingEntry = await getEntryByDate(user.uid, todayDate);

        if (existingEntry) {
          // Load existing entry data
          setExistingEntryId(existingEntry.id);
          setPillar(existingEntry.pillar);
          setDayInTrack(existingEntry.dayInTrack);
          setBlocks(existingEntry.blocks);
          setMood(existingEntry.mood);
        } else {
          // Load pillar progress to determine next day
          const progress = await getPillarProgress(user.uid, defaultPillar);
          setDayInTrack(Math.min(progress + 1, 30)); // Next day, max 30
        }
      } catch (error) {
        console.error('Error loading entry:', error);
      } finally {
        setIsLoadingEntry(false);
      }
    };
    loadExistingEntry();
  }, [user, todayDate, defaultPillar]);

  // Update dayInTrack when pillar changes (for new entries only)
  useEffect(() => {
    const updateDayForPillar = async () => {
      if (!user || existingEntryId || isLoadingEntry) return;
      try {
        const progress = await getPillarProgress(user.uid, pillar);
        setDayInTrack(Math.min(progress + 1, 30));
      } catch (error) {
        console.error('Error loading pillar progress:', error);
      }
    };
    updateDayForPillar();
  }, [user, pillar, existingEntryId, isLoadingEntry]);

  // Load today's prompt when pillar or dayInTrack changes
  useEffect(() => {
    const loadPrompt = async () => {
      setIsLoadingPrompt(true);
      try {
        const prompt = await getTodaysPrompt(pillar, dayInTrack);
        setTodaysPrompt(prompt);
      } catch (error) {
        console.error('Error loading prompt:', error);
        setTodaysPrompt(null);
      } finally {
        setIsLoadingPrompt(false);
      }
    };
    loadPrompt();
  }, [pillar, dayInTrack]);

  // Handle pillar change with warning
  const handlePillarChange = (newPillar: Pillar) => {
    if (newPillar === pillar) return;

    const hasContent = blocks.some(
      (b) => b.content.trim() || b.inControl?.trim() || b.notInControl?.trim()
    );

    if (hasContent) {
      setPendingPillar(newPillar);
      setShowPillarWarning(true);
    } else {
      setPillar(newPillar);
    }
  };

  const confirmPillarChange = () => {
    if (pendingPillar) {
      setPillar(pendingPillar);
      setBlocks([{ id: nanoid(), type: 'freeform', content: '' }]);
    }
    setShowPillarWarning(false);
    setPendingPillar(null);
  };

  const addBlock = (type: BlockType) => {
    const newBlock: EntryBlock = {
      id: nanoid(),
      type,
      content: '',
      ...(type === 'dichotomy' ? { inControl: '', notInControl: '' } : {}),
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<EntryBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((b) => b.id !== id));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    // Check if there's any content to save
    const hasContent = blocks.some(
      (b) => b.content.trim() || b.inControl?.trim() || b.notInControl?.trim()
    );

    if (!hasContent) {
      alert('Please write something before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const entryData: JournalEntryInput = {
        date: todayDate,
        pillar,
        dayInTrack,
        blocks,
        mood,
      };

      if (existingEntryId) {
        // Update existing entry
        await updateEntry(existingEntryId, entryData);
      } else {
        // Create new entry
        await createEntry(user.uid, entryData);
      }

      router.push('/journal');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    router.push('/journal');
  };

  const handleSaveDefaultLayout = () => {
    // TODO: Save to user profile
    alert('Default layout saved!');
  };

  // Show loading state while checking for existing entry
  if (isLoadingEntry) {
    return (
      <div className="h-full flex flex-col bg-slate-50 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-slate-500">Loading your journal...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Sticky Toolbar */}
      <header className="bg-white border-b border-slate-200 px-4 py-2 sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Back + Templates */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/journal"
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <div className="flex items-center gap-0.5">
              {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => addBlock(type)}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Icon size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add {label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Center: Date + Pillar icons */}
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-xs font-medium text-slate-400">
              {new Date(todayDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
              {existingEntryId && (
                <span className="ml-2 text-primary">(editing)</span>
              )}
            </span>
            <div className="flex items-center gap-0.5 bg-slate-50 rounded-lg p-1">
              {(Object.keys(PILLAR_CONFIG) as Pillar[]).map((p) => {
                const { icon: Icon, color, activeColor } = PILLAR_CONFIG[p];
                const isActive = pillar === p;
                return (
                  <Tooltip key={p}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handlePillarChange(p)}
                        className={`p-1.5 md:p-2 rounded-lg transition-all ${
                          isActive ? activeColor : `${color} hover:bg-slate-100`
                        }`}
                      >
                        <Icon size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="capitalize">{p}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-0.5 md:gap-1">
            <div className="flex items-center gap-0.5 mr-1 md:mr-2">
              {[
                { score: 1 as MoodScore, icon: Frown, color: 'text-red-400', activeColor: 'text-red-600 bg-red-50' },
                { score: 3 as MoodScore, icon: Meh, color: 'text-amber-400', activeColor: 'text-amber-600 bg-amber-50' },
                { score: 5 as MoodScore, icon: Smile, color: 'text-emerald-400', activeColor: 'text-emerald-600 bg-emerald-50' },
              ].map(({ score, icon: Icon, color, activeColor }) => (
                <button
                  key={score}
                  onClick={() => setMood(mood === score ? null : score)}
                  className={`p-1.5 rounded-lg transition-all ${
                    mood === score ? activeColor : `${color} hover:bg-slate-100`
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSaveDefaultLayout}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors hidden md:block"
                >
                  <Layout size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Save as Default Layout</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Discard</TooltipContent>
            </Tooltip>

            <Button onClick={handleSave} disabled={isSaving} size="sm" className="ml-1 md:ml-2">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}
              <span className="ml-1.5 hidden md:inline">Save</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          {/* Daily Prompt Card */}
          <Card className="mb-6 border-l-4 border-l-primary bg-gradient-to-r from-sky-50 to-white">
            <CardContent className="p-5 md:p-6">
              {isLoadingPrompt ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : todaysPrompt ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Day {dayInTrack} • {PILLAR_THEMES[pillar]}
                    </span>
                  </div>

                  <blockquote className="text-lg font-serif text-slate-800 italic mb-2 leading-relaxed">
                    &ldquo;{todaysPrompt.stoicQuote}&rdquo;
                  </blockquote>
                  <p className="text-sm font-bold text-slate-600 mb-4">
                    — {todaysPrompt.quoteAuthor}
                  </p>

                  <div className="flex items-start gap-3 mt-4 pt-4 border-t border-slate-100">
                    <ChadGPTSvg className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-900">Chad says:</span>{' '}
                        {todaysPrompt.broTranslation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Today&apos;s Challenge</p>
                    <p className="text-sm text-slate-700">{todaysPrompt.todaysChallenge}</p>
                  </div>
                </>
              ) : (
                <p className="text-slate-500 text-center py-4">
                  No prompt loaded yet. Start writing freely below!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Blocks */}
          <div className="space-y-4">
            {blocks.map((block) => (
              <BlockEditor
                key={block.id}
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onDelete={() => deleteBlock(block.id)}
                canDelete={blocks.length > 1}
              />
            ))}
          </div>

          {/* Add Block Button */}
          <button
            onClick={() => addBlock('freeform')}
            className="mt-4 w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add Section</span>
          </button>
        </div>
      </div>

      {/* Pillar Change Warning Dialog */}
      <AlertDialog open={showPillarWarning} onOpenChange={setShowPillarWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              Change Pillar?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Changing pillars will load a different prompt and clear your current entry content.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Current</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPillarChange}>
              Change Pillar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Block Editor Component
function BlockEditor({
  block,
  onUpdate,
  onDelete,
  canDelete,
}: {
  block: EntryBlock;
  onUpdate: (updates: Partial<EntryBlock>) => void;
  onDelete: () => void;
  canDelete: boolean;
}) {
  if (block.type === 'dichotomy') {
    return (
      <div className="group relative">
        <div className="absolute -left-8 md:-left-10 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
          <button className="p-1 text-slate-300 hover:text-slate-500">
            <GripVertical size={16} />
          </button>
          {canDelete && (
            <button onClick={onDelete} className="p-1 text-slate-300 hover:text-red-500">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 min-h-[150px]">
            <h3 className="font-bold text-red-900 mb-2 text-sm uppercase tracking-wide">
              Not in my control
            </h3>
            <textarea
              value={block.notInControl || ''}
              onChange={(e) => onUpdate({ notInControl: e.target.value })}
              className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed"
              placeholder="• Other people's opinions&#10;• The outcome..."
              rows={5}
            />
          </div>
          <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 min-h-[150px]">
            <h3 className="font-bold text-emerald-900 mb-2 text-sm uppercase tracking-wide">
              In my control
            </h3>
            <textarea
              value={block.inControl || ''}
              onChange={(e) => onUpdate({ inControl: e.target.value })}
              className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed"
              placeholder="• My effort&#10;• My attitude..."
              rows={5}
            />
          </div>
        </div>
      </div>
    );
  }

  if (block.type === 'morning-intent') {
    return (
      <div className="group relative">
        <div className="absolute -left-8 md:-left-10 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
          <button className="p-1 text-slate-300 hover:text-slate-500">
            <GripVertical size={16} />
          </button>
          {canDelete && (
            <button onClick={onDelete} className="p-1 text-slate-300 hover:text-red-500">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
          <h3 className="font-bold text-amber-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
            <Sun size={16} /> Morning Intent
          </h3>
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
            placeholder="What do I intend to focus on today? What one thing would make today a success?"
          />
        </div>
      </div>
    );
  }

  if (block.type === 'evening-audit') {
    return (
      <div className="group relative">
        <div className="absolute -left-8 md:-left-10 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
          <button className="p-1 text-slate-300 hover:text-slate-500">
            <GripVertical size={16} />
          </button>
          {canDelete && (
            <button onClick={onDelete} className="p-1 text-slate-300 hover:text-red-500">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
            <Moon size={16} /> Evening Audit
          </h3>
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
            placeholder="What went well today? What could have gone better? What did I learn?"
          />
        </div>
      </div>
    );
  }

  // Freeform block
  return (
    <div className="group relative">
      <div className="absolute -left-8 md:-left-10 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button className="p-1 text-slate-300 hover:text-slate-500">
          <GripVertical size={16} />
        </button>
        {canDelete && (
          <button onClick={onDelete} className="p-1 text-slate-300 hover:text-red-500">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <textarea
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full bg-transparent outline-none text-slate-800 resize-none leading-relaxed min-h-[150px] text-lg font-serif"
          placeholder="Start writing your reflection..."
        />
      </div>
    </div>
  );
}
