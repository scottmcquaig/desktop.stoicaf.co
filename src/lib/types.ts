import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export type Pillar = 'money' | 'ego' | 'relationships' | 'discipline';

export type MoodScore = 1 | 2 | 3 | 4 | 5;

export type JournalTemplate = 'morning-intent' | 'evening-audit' | 'dichotomy' | 'free-form';

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: MoodScore | null;
  pillar: Pillar | null;
  tags: string[];
  template: JournalTemplate;
  // For dichotomy template
  notInControl?: string;
  inControl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type JournalEntryInput = Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

// Legacy type - keeping for compatibility
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
