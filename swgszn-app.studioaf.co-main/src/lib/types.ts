import type { LucideIcon } from 'lucide-react';

export type JournalEntry = {
  id: string;
  date: string; // ISO string
  content: string;
  mood: Mood;
  tags: string[];
};

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
