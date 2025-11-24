'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { nanoid } from 'nanoid';
import {
  ChevronLeft,
  MoreVertical,
  Sun,
  Moon,
  Columns,
  Smile,
  Meh,
  Frown,
  Trash2,
  Edit3,
  Save,
  Loader2,
  X,
  Calendar,
  Clock,
  DollarSign,
  User,
  Heart,
  Target,
  Plus,
  GripVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getEntry, updateEntry, deleteEntry } from '@/lib/firebase/journal';
import type { JournalEntry, MoodScore, Pillar, EntryBlock, BlockType } from '@/lib/types';

const PILLAR_CONFIG: Record<Pillar, { icon: React.ElementType; label: string; color: string }> = {
  money: { icon: DollarSign, label: 'Money', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  ego: { icon: User, label: 'Ego', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  relationships: { icon: Heart, label: 'Relationships', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  discipline: { icon: Target, label: 'Discipline', color: 'bg-amber-100 text-amber-700 border-amber-200' },
};

const BLOCK_TYPES: { type: BlockType; icon: React.ElementType; label: string }[] = [
  { type: 'morning-intent', icon: Sun, label: 'Morning' },
  { type: 'evening-audit', icon: Moon, label: 'Evening' },
  { type: 'dichotomy', icon: Columns, label: 'Dichotomy' },
];

const JournalEntryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const entryId = params.id as string;

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit form state
  const [blocks, setBlocks] = useState<EntryBlock[]>([]);
  const [mood, setMood] = useState<MoodScore | null>(null);
  const [pillar, setPillar] = useState<Pillar>('ego');
  const [dayInTrack, setDayInTrack] = useState(1);

  // Load entry
  useEffect(() => {
    const loadEntry = async () => {
      if (!entryId) return;

      setIsLoading(true);
      try {
        const loadedEntry = await getEntry(entryId);
        if (loadedEntry) {
          // Verify user owns this entry
          if (user && loadedEntry.userId !== user.uid) {
            router.push('/journal');
            return;
          }
          setEntry(loadedEntry);
          // Initialize edit form state
          setBlocks(loadedEntry.blocks || [{ id: nanoid(), type: 'freeform', content: '' }]);
          setMood(loadedEntry.mood);
          setPillar(loadedEntry.pillar || 'ego');
          setDayInTrack(loadedEntry.dayInTrack || 1);
        } else {
          router.push('/journal');
        }
      } catch (error) {
        console.error('Error loading entry:', error);
        router.push('/journal');
      } finally {
        setIsLoading(false);
      }
    };

    loadEntry();
  }, [entryId, user, router]);

  // Block management
  const updateBlock = (id: string, updates: Partial<EntryBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((b) => b.id !== id));
    }
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

  // Handle save
  const handleSave = async () => {
    if (!entry) return;

    setIsSaving(true);
    try {
      await updateEntry(entry.id, {
        blocks,
        mood,
        pillar,
        dayInTrack,
      });

      // Update local state
      setEntry({
        ...entry,
        blocks,
        mood,
        pillar,
        dayInTrack,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!entry) return;

    setIsDeleting(true);
    try {
      await deleteEntry(entry.id);
      router.push('/journal');
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (entry) {
      setBlocks(entry.blocks || [{ id: nanoid(), type: 'freeform', content: '' }]);
      setMood(entry.mood);
      setPillar(entry.pillar || 'ego');
      setDayInTrack(entry.dayInTrack || 1);
    }
    setIsEditing(false);
  };

  // Format date
  const formatDate = (entry: JournalEntry) => {
    if (entry.date) {
      const [year, month, day] = entry.date.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    const date = entry.createdAt.toDate();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (entry: JournalEntry) => {
    const date = entry.createdAt.toDate();
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Get entry title
  const getEntryTitle = (entry: JournalEntry) => {
    // Legacy entries have title
    const legacyEntry = entry as JournalEntry & { title?: string };
    if (legacyEntry.title) return legacyEntry.title;

    // New entries: generate title from pillar and day
    if (entry.pillar && entry.dayInTrack) {
      const pillarLabel = PILLAR_CONFIG[entry.pillar]?.label || entry.pillar;
      return `Day ${entry.dayInTrack} - ${pillarLabel}`;
    }

    return 'Journal Entry';
  };

  // Get word count
  const getWordCount = () => {
    let count = 0;
    for (const block of blocks) {
      if (block.content) {
        count += block.content.trim().split(/\s+/).filter(Boolean).length;
      }
      if (block.inControl) {
        count += block.inControl.trim().split(/\s+/).filter(Boolean).length;
      }
      if (block.notInControl) {
        count += block.notInControl.trim().split(/\s+/).filter(Boolean).length;
      }
    }
    return count;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-slate-500">Loading entry...</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return null;
  }

  const PillarIcon = PILLAR_CONFIG[pillar]?.icon || User;

  return (
    <div className="h-full flex flex-col bg-white md:bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/journal"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors flex items-center"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h2 className="font-bold text-slate-900 leading-tight">
              {isEditing ? 'Edit Entry' : getEntryTitle(entry)}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Badge variant="secondary" className={PILLAR_CONFIG[entry.pillar || 'ego']?.color}>
                <PillarIcon size={12} className="mr-1" />
                {PILLAR_CONFIG[entry.pillar || 'ego']?.label}
              </Badge>
              {entry.dayInTrack && (
                <span>Day {entry.dayInTrack}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit3 />
                    <span>Edit Entry</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 />
                    <span>Delete Entry</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${isEditing ? 'pb-24 md:pb-8' : ''}`}>
        <div className="max-w-3xl mx-auto bg-white md:min-h-[600px] md:p-8 md:shadow-sm md:rounded-xl md:border md:border-slate-200">
          {/* Date/Time */}
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(entry)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatTime(entry)}
            </span>
          </div>

          {/* Mood display (view mode) */}
          {!isEditing && entry.mood && (
            <div className="flex items-center gap-2 mb-6">
              {entry.mood <= 2 && <Frown size={24} className="text-red-500" />}
              {entry.mood === 3 && <Meh size={24} className="text-amber-500" />}
              {entry.mood >= 4 && <Smile size={24} className="text-emerald-500" />}
              <span className="text-slate-500 text-sm">Mood: {entry.mood}/5</span>
            </div>
          )}

          {/* Blocks */}
          <div className="space-y-4">
            {(isEditing ? blocks : entry.blocks || []).map((block) => (
              <BlockDisplay
                key={block.id}
                block={block}
                isEditing={isEditing}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onDelete={() => deleteBlock(block.id)}
                canDelete={blocks.length > 1}
              />
            ))}
          </div>

          {/* Add block buttons (edit mode) - Desktop only */}
          {isEditing && (
            <div className="mt-6 hidden md:flex items-center gap-2">
              <span className="text-xs text-slate-400">Add:</span>
              <button
                onClick={() => addBlock('freeform')}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                + Text
              </button>
              <button
                onClick={() => addBlock('morning-intent')}
                className="px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1"
              >
                <Sun size={12} /> Morning
              </button>
              <button
                onClick={() => addBlock('evening-audit')}
                className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
              >
                <Moon size={12} /> Evening
              </button>
              <button
                onClick={() => addBlock('dichotomy')}
                className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1"
              >
                <Columns size={12} /> Dichotomy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== MOBILE BOTTOM BAR (edit mode) ===== */}
      {isEditing && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 z-20 safe-area-bottom">
          <div className="flex items-center justify-between gap-1">
            {/* Block type buttons */}
            <div className="flex items-center bg-slate-50 rounded-lg p-0.5">
              <button
                onClick={() => addBlock('freeform')}
                className="min-h-11 min-w-11 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Add text block"
              >
                <Plus size={20} />
              </button>
              {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="min-h-11 min-w-11 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={`Add ${label}`}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>

            {/* Mood selector */}
            <div className="flex items-center bg-slate-50 rounded-lg p-0.5">
              {[
                { score: 1 as MoodScore, icon: Frown, color: 'text-red-400', activeColor: 'text-red-600 bg-red-50' },
                { score: 3 as MoodScore, icon: Meh, color: 'text-amber-400', activeColor: 'text-amber-600 bg-amber-50' },
                { score: 5 as MoodScore, icon: Smile, color: 'text-emerald-400', activeColor: 'text-emerald-600 bg-emerald-50' },
              ].map(({ score, icon: Icon, color, activeColor }) => (
                <button
                  key={score}
                  onClick={() => setMood(mood === score ? null : score)}
                  className={`min-h-11 min-w-11 flex items-center justify-center rounded-lg transition-all ${
                    mood === score ? activeColor : `${color} hover:bg-slate-100`
                  }`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            {/* Delete button */}
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="min-h-11 min-w-11 flex items-center justify-center hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Footer (edit mode only) */}
      {isEditing && (
        <footer className="hidden md:block bg-white border-t border-slate-200 p-3 md:p-4 sticky bottom-0 z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Mood Selector */}
                <div className="flex gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
                  {[
                    { score: 1 as MoodScore, icon: <Frown size={20} className={mood === 1 ? 'text-red-600' : 'text-red-400'} /> },
                    { score: 3 as MoodScore, icon: <Meh size={20} className={mood === 3 ? 'text-amber-600' : 'text-amber-400'} /> },
                    { score: 5 as MoodScore, icon: <Smile size={20} className={mood === 5 ? 'text-emerald-600' : 'text-emerald-400'} /> },
                  ].map(({ score, icon }) => (
                    <button
                      key={score}
                      onClick={() => setMood(mood === score ? null : score)}
                      className={`w-8 h-8 flex items-center justify-center rounded transition-all ${
                        mood === score ? 'bg-white shadow-sm' : 'hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
                <span>{getWordCount()} words</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Block Display/Editor Component
function BlockDisplay({
  block,
  isEditing,
  onUpdate,
  onDelete,
  canDelete,
}: {
  block: EntryBlock;
  isEditing: boolean;
  onUpdate: (updates: Partial<EntryBlock>) => void;
  onDelete: () => void;
  canDelete: boolean;
}) {
  if (block.type === 'dichotomy') {
    return (
      <div className="group relative">
        {isEditing && (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-red-50/50 border-red-100">
            <CardContent className="p-4">
              <h3 className="font-bold text-red-900 mb-2 text-sm uppercase tracking-wide">
                Not in my control
              </h3>
              {isEditing ? (
                <textarea
                  value={block.notInControl || ''}
                  onChange={(e) => onUpdate({ notInControl: e.target.value })}
                  className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
                  placeholder="• Other people's opinions..."
                />
              ) : (
                <p className="text-slate-700 whitespace-pre-wrap">
                  {block.notInControl || 'Nothing noted'}
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-emerald-50/50 border-emerald-100">
            <CardContent className="p-4">
              <h3 className="font-bold text-emerald-900 mb-2 text-sm uppercase tracking-wide">
                In my control
              </h3>
              {isEditing ? (
                <textarea
                  value={block.inControl || ''}
                  onChange={(e) => onUpdate({ inControl: e.target.value })}
                  className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
                  placeholder="• My effort..."
                />
              ) : (
                <p className="text-slate-700 whitespace-pre-wrap">
                  {block.inControl || 'Nothing noted'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (block.type === 'morning-intent') {
    return (
      <div className="group relative">
        {isEditing && (
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
        )}

        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
          <h3 className="font-bold text-amber-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
            <Sun size={16} /> Morning Intent
          </h3>
          {isEditing ? (
            <textarea
              value={block.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
              placeholder="What do I intend to focus on today?"
            />
          ) : (
            <p className="text-slate-700 whitespace-pre-wrap">
              {block.content || 'No content'}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (block.type === 'evening-audit') {
    return (
      <div className="group relative">
        {isEditing && (
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
        )}

        <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
            <Moon size={16} /> Evening Audit
          </h3>
          {isEditing ? (
            <textarea
              value={block.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[100px]"
              placeholder="What went well today? What could have gone better?"
            />
          ) : (
            <p className="text-slate-700 whitespace-pre-wrap">
              {block.content || 'No content'}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Freeform block
  return (
    <div className="group relative">
      {isEditing && (
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
      )}

      {isEditing ? (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full bg-transparent outline-none text-slate-800 resize-none leading-relaxed min-h-[150px] text-lg font-serif"
            placeholder="Write your reflection..."
          />
        </div>
      ) : (
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-800 font-serif leading-loose whitespace-pre-wrap">
            {block.content || 'No content'}
          </p>
        </div>
      )}
    </div>
  );
}

export default JournalEntryPage;
