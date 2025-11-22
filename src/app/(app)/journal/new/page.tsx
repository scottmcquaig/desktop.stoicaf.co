'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Frown,
  Trash2,
  History,
  Share2,
  Copy,
  Loader2,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { createEntry } from '@/lib/firebase/journal';
import type { JournalTemplate, MoodScore, Pillar } from '@/lib/types';

const TEMPLATE_MAP: Record<string, JournalTemplate> = {
  'Dichotomy of Control': 'dichotomy',
  'Morning Intent': 'morning-intent',
  'Evening Audit': 'evening-audit',
  'Free Form': 'free-form',
};

const PILLAR_COLORS: Record<Pillar, string> = {
  money: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ego: 'bg-purple-100 text-purple-700 border-purple-200',
  relationships: 'bg-pink-100 text-pink-700 border-pink-200',
  discipline: 'bg-amber-100 text-amber-700 border-amber-200',
};

const DRAFT_KEY = 'journal-draft';

const JournalNewPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [template, setTemplate] = useState('Dichotomy of Control');
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('unsaved');

  // Word count
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setTemplate(parsed.template || 'Dichotomy of Control');
        setTitle(parsed.title || '');
        setContent(parsed.content || '');
        setMood(parsed.mood || null);
        setPillar(parsed.pillar || null);
        setTags(parsed.tags || []);
        setNotInControl(parsed.notInControl || '');
        setInControl(parsed.inControl || '');
      } catch {
        // Invalid draft, ignore
      }
    }
  }, []);

  // Auto-save draft to localStorage
  const saveDraft = useCallback(() => {
    const draft = {
      template,
      title,
      content,
      mood,
      pillar,
      tags,
      notInControl,
      inControl,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setSaveStatus('saved');
  }, [template, title, content, mood, pillar, tags, notInControl, inControl]);

  useEffect(() => {
    setSaveStatus('unsaved');
    const timer = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timer);
  }, [template, title, content, mood, pillar, tags, notInControl, inControl, saveDraft]);

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

  // Handle publish
  const handlePublish = async () => {
    if (!user) {
      alert('You must be logged in to save entries');
      return;
    }

    if (!content.trim() && !notInControl.trim() && !inControl.trim()) {
      alert('Please write something before publishing');
      return;
    }

    setIsSaving(true);
    try {
      const entryTitle = title.trim() || generateTitle();

      await createEntry(user.uid, {
        title: entryTitle,
        content,
        mood,
        pillar,
        tags,
        template: TEMPLATE_MAP[template],
        notInControl: template === 'Dichotomy of Control' ? notInControl : undefined,
        inControl: template === 'Dichotomy of Control' ? inControl : undefined,
      });

      // Clear draft
      localStorage.removeItem(DRAFT_KEY);

      // Redirect to journal list
      router.push('/journal');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate title from content if not provided
  const generateTitle = () => {
    const text = content || notInControl || inControl;
    if (!text) return 'Untitled Entry';

    const firstLine = text.split('\n')[0].trim();
    if (firstLine.length <= 50) return firstLine;
    return firstLine.slice(0, 47) + '...';
  };

  return (
    <div className="h-full flex flex-col bg-white md:bg-slate-50">
      {/* Editor Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/journal"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors flex items-center"
          >
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
          <span className="text-xs font-bold text-slate-300 uppercase hidden md:inline">
            {saveStatus === 'saved' ? 'Draft saved' : saveStatus === 'saving' ? 'Saving...' : ''}
          </span>
          <Button onClick={handlePublish} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Publish'
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy />
                <span>Duplicate Entry</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 />
                <span>Share / Export</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History />
                <span>View History</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 />
                <span>Delete Entry</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title (optional)"
            className="w-full text-2xl font-bold text-slate-900 placeholder-slate-300 outline-none mb-6 bg-transparent"
          />

          {/* Dichotomy Template Blocks */}
          {template === 'Dichotomy of Control' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 min-h-[200px] focus-within:ring-2 focus-within:ring-red-200 transition-all">
                <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Ban size={16} className="text-red-600" /> ON GOD (Not in my control)
                </h3>
                <textarea
                  value={notInControl}
                  onChange={(e) => setNotInControl(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-red-300 resize-none leading-relaxed"
                  placeholder="• Other people's opinions&#10;• The outcome of the project&#10;• Traffic..."
                  rows={6}
                />
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 min-h-[200px] focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <CheckCircle2 size={16} className="text-emerald-600" /> ON ME (In my control)
                </h3>
                <textarea
                  value={inControl}
                  onChange={(e) => setInControl(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-emerald-300 resize-none leading-relaxed"
                  placeholder="• My effort&#10;• My preparation&#10;• My attitude..."
                  rows={6}
                />
              </div>
            </div>
          )}

          {/* Main Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[400px] resize-none outline-none text-lg text-slate-800 placeholder-slate-300 font-serif leading-loose"
            placeholder="Start writing your reflection..."
          />
        </div>
      </div>

      {/* Editor Footer */}
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
    </div>
  );
};

export default JournalNewPage;
