'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeft,
  MoreVertical,
  Ban,
  CheckCircle2,
  Tag,
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
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getEntry, updateEntry, deleteEntry } from '@/lib/firebase/journal';
import type { JournalEntry, JournalTemplate, MoodScore, Pillar } from '@/lib/types';

const TEMPLATE_LABELS: Record<JournalTemplate, string> = {
  'morning-intent': 'Morning Intent',
  'evening-audit': 'Evening Audit',
  'dichotomy': 'Dichotomy of Control',
  'free-form': 'Free Form',
};

const TEMPLATE_COLORS: Record<JournalTemplate, string> = {
  'morning-intent': 'bg-sky-100 text-primary border-sky-200',
  'evening-audit': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'dichotomy': 'bg-purple-100 text-purple-700 border-purple-200',
  'free-form': 'bg-slate-100 text-slate-700 border-slate-200',
};

const PILLAR_COLORS: Record<Pillar, string> = {
  money: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ego: 'bg-purple-100 text-purple-700 border-purple-200',
  relationships: 'bg-pink-100 text-pink-700 border-pink-200',
  discipline: 'bg-amber-100 text-amber-700 border-amber-200',
};

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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodScore | null>(null);
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notInControl, setNotInControl] = useState('');
  const [inControl, setInControl] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [showPillarSelect, setShowPillarSelect] = useState(false);

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
          setTitle(loadedEntry.title);
          setContent(loadedEntry.content);
          setMood(loadedEntry.mood);
          setPillar(loadedEntry.pillar);
          setTags(loadedEntry.tags);
          setNotInControl(loadedEntry.notInControl || '');
          setInControl(loadedEntry.inControl || '');
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

  // Handle tag input
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag.startsWith('#') ? tag : `#${tag}`]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Handle save
  const handleSave = async () => {
    if (!entry) return;

    setIsSaving(true);
    try {
      await updateEntry(entry.id, {
        title,
        content,
        mood,
        pillar,
        tags,
        notInControl: entry.template === 'dichotomy' ? notInControl : undefined,
        inControl: entry.template === 'dichotomy' ? inControl : undefined,
      });

      // Update local state
      setEntry({
        ...entry,
        title,
        content,
        mood,
        pillar,
        tags,
        notInControl,
        inControl,
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
      setTitle(entry.title);
      setContent(entry.content);
      setMood(entry.mood);
      setPillar(entry.pillar);
      setTags(entry.tags);
      setNotInControl(entry.notInControl || '');
      setInControl(entry.inControl || '');
    }
    setIsEditing(false);
  };

  // Format date
  const formatDate = (entry: JournalEntry) => {
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

  // Word count
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

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
              {isEditing ? 'Edit Entry' : 'View Entry'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Badge variant="secondary" className={TEMPLATE_COLORS[entry.template]}>
                {TEMPLATE_LABELS[entry.template]}
              </Badge>
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
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
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

          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry title"
              className="w-full text-2xl font-bold text-slate-900 placeholder-slate-300 outline-none mb-6 bg-transparent border-b border-slate-200 pb-2 focus:border-primary"
            />
          ) : (
            <h1 className="text-2xl font-bold text-slate-900 mb-6">{entry.title}</h1>
          )}

          {/* Mood & Pillar & Tags display (view mode) */}
          {!isEditing && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {entry.mood && (
                <div className="flex items-center gap-1 text-sm">
                  {entry.mood <= 2 && <Frown size={18} className="text-red-500" />}
                  {entry.mood === 3 && <Meh size={18} className="text-amber-500" />}
                  {entry.mood >= 4 && <Smile size={18} className="text-emerald-500" />}
                  <span className="text-slate-500">Mood: {entry.mood}/5</span>
                </div>
              )}
              {entry.pillar && (
                <Badge variant="outline" className={PILLAR_COLORS[entry.pillar]}>
                  {entry.pillar.charAt(0).toUpperCase() + entry.pillar.slice(1)}
                </Badge>
              )}
              {entry.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Dichotomy Template Blocks */}
          {entry.template === 'dichotomy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-red-50/50 border-red-100">
                <CardContent className="p-4">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Ban size={16} className="text-red-600" /> Not in my control
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={notInControl}
                      onChange={(e) => setNotInControl(e.target.value)}
                      className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[150px]"
                      placeholder="What's not in your control..."
                    />
                  ) : (
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {entry.notInControl || 'Nothing noted'}
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-emerald-50/50 border-emerald-100">
                <CardContent className="p-4">
                  <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <CheckCircle2 size={16} className="text-emerald-600" /> In my control
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={inControl}
                      onChange={(e) => setInControl(e.target.value)}
                      className="w-full bg-transparent outline-none text-slate-700 resize-none leading-relaxed min-h-[150px]"
                      placeholder="What's in your control..."
                    />
                  ) : (
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {entry.inControl || 'Nothing noted'}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[300px] resize-none outline-none text-lg text-slate-800 placeholder-slate-300 font-serif leading-loose"
              placeholder="Your reflection..."
            />
          ) : (
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-800 font-serif leading-loose whitespace-pre-wrap">
                {entry.content || 'No content'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer (edit mode only) */}
      {isEditing && (
        <footer className="bg-white border-t border-slate-200 p-3 md:p-4 sticky bottom-0 z-10">
          <div className="max-w-3xl mx-auto">
            {/* Tags display */}
            {(tags.length > 0 || showTagInput) && (
              <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-normal cursor-pointer hover:bg-slate-200"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} <X size={12} className="ml-1" />
                  </Badge>
                ))}
                {showTagInput && (
                  <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      } else if (e.key === 'Escape') {
                        setShowTagInput(false);
                        setTagInput('');
                      }
                    }}
                    onBlur={() => {
                      if (tagInput) addTag();
                      setShowTagInput(false);
                    }}
                    placeholder="Add tag..."
                    className="w-24 h-6 text-xs"
                    autoFocus
                  />
                )}
              </div>
            )}

            {/* Pillar selector */}
            {showPillarSelect && (
              <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500 mr-2">Pillar:</span>
                {(['money', 'ego', 'relationships', 'discipline'] as Pillar[]).map((p) => (
                  <Badge
                    key={p}
                    variant="outline"
                    className={`cursor-pointer capitalize ${
                      pillar === p ? PILLAR_COLORS[p] : 'hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      setPillar(pillar === p ? null : p);
                      setShowPillarSelect(false);
                    }}
                  >
                    {p}
                  </Badge>
                ))}
              </div>
            )}

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
                <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setShowTagInput(true)}
                    className="text-slate-500 hover:text-stoic-blue text-sm font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                  >
                    <Tag size={16} /> Tags
                  </button>
                  <button
                    onClick={() => setShowPillarSelect(!showPillarSelect)}
                    className={`text-sm font-bold flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                      pillar
                        ? PILLAR_COLORS[pillar]
                        : 'text-slate-500 hover:text-stoic-blue hover:bg-slate-50'
                    }`}
                  >
                    {pillar ? pillar.charAt(0).toUpperCase() + pillar.slice(1) : 'Pillar'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
                <span className="hidden md:inline">{wordCount} words</span>
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

export default JournalEntryPage;
