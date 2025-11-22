import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export type Pillar = 'money' | 'ego' | 'relationships' | 'discipline';

export type MoodScore = 1 | 2 | 3 | 4 | 5;

export type BlockType = 'prompt' | 'freeform' | 'morning-intent' | 'evening-audit' | 'dichotomy';

// Block-based entry structure (new)
export interface EntryBlock {
  id: string;
  type: BlockType;
  content: string;
  // For dichotomy blocks
  inControl?: string;
  notInControl?: string;
}

// New block-based journal entry (v2)
export interface JournalEntry {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format (one entry per day)
  pillar: Pillar;
  dayInTrack: number; // which day (1-30) in the pillar track
  blocks: EntryBlock[];
  mood: MoodScore | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type JournalEntryInput = Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

// Pillar track prompts
export interface DayPrompt {
  day: number;
  stoicQuote: string;
  quoteAuthor: string;
  broTranslation: string;
  todaysChallenge: string;
  challengeType: 'reflection' | 'action' | 'meditation';
  todaysIntention: string;
  eveningPrompts: string[];
}

export interface PillarTrack {
  pillar: Pillar;
  theme: string; // "Let Results Talk", "Your Wealth Isn't Your Worth", etc.
  days: DayPrompt[];
}

// User profile pillar progress
export interface PillarProgress {
  money: number;    // current day (1-30, 0 = not started)
  ego: number;
  relationships: number;
  discipline: number;
}

// Default entry layout saved by user
export interface DefaultEntryLayout {
  blocks: Omit<EntryBlock, 'content' | 'inControl' | 'notInControl'>[];
}

// Legacy types - keeping for compatibility
export type JournalTemplate = 'morning-intent' | 'evening-audit' | 'dichotomy' | 'free-form';
export type Mood = 'awful' | 'bad' | 'ok' | 'good' | 'great';

export type Virtue = {
  name: 'Wisdom' | 'Justice' | 'Courage' | 'Temperance';
  icon: LucideIcon;
  value: number;
  description: string;
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type DailyStoicQuote = {
  quote: string;
  author: string;
  source: string;
}
