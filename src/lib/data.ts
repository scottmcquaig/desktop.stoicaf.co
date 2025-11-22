import type { JournalEntry, Mood, NavLink, Virtue, MoodScore } from '@/lib/types';
import {
  Brain,
  Scale,
  Shield,
  Droplets,
  Home,
  BookText,
  BarChart3,
  Settings,
  PenSquare,
  MessageSquare,
} from 'lucide-react';
import { subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: BookText },
  { href: '/reflections', label: 'Insights', icon: BarChart3 },
  { href: '/chadgpt', label: 'ChadGPT', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const quickCaptureLink: NavLink = {
  href: '#',
  label: 'Quick Entry',
  icon: PenSquare,
};

export const virtues: Virtue[] = [
  { name: 'Wisdom', icon: Brain, value: 75, description: "Understanding the world and making sound judgments." },
  { name: 'Justice', icon: Scale, value: 60, description: "Treating others with fairness and kindness." },
];

export const virtuesFull: Virtue[] = [
    { name: 'Wisdom', icon: Brain, value: 75, description: "Understanding the world and making sound judgments." },
    { name: 'Justice', icon: Scale, value: 60, description: "Treating others with fairness and kindness." },
    { name: 'Courage', icon: Shield, value: 85, description: "Facing challenges with bravery and resilience." },
    { name: 'Temperance', icon: Droplets, value: 70, description: "Practicing moderation and self-control." },
]

// Helper to create mock Timestamp
const createMockTimestamp = (date: Date): Timestamp => {
  return {
    toDate: () => date,
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: 0,
  } as Timestamp;
};

// Mock journal entries using the new block-based format
export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    userId: 'mock-user',
    date: subDays(new Date(), 1).toISOString().split('T')[0],
    pillar: 'discipline',
    dayInTrack: 1,
    blocks: [
      { id: 'b1', type: 'morning-intent', content: 'Focusing on what I can control today.' }
    ],
    mood: 4 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 1)),
    updatedAt: createMockTimestamp(subDays(new Date(), 1)),
  },
  {
    id: '2',
    userId: 'mock-user',
    date: subDays(new Date(), 2).toISOString().split('T')[0],
    pillar: 'ego',
    dayInTrack: 1,
    blocks: [
      { id: 'b2', type: 'freeform', content: "A colleague took credit for my work. Instead of anger, I practiced magnanimity. I'll address it calmly and privately, focusing on the principle of justice, not personal grievance." }
    ],
    mood: 3 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 2)),
    updatedAt: createMockTimestamp(subDays(new Date(), 2)),
  },
  {
    id: '3',
    userId: 'mock-user',
    date: subDays(new Date(), 3).toISOString().split('T')[0],
    pillar: 'discipline',
    dayInTrack: 2,
    blocks: [
      { id: 'b3', type: 'freeform', content: "Felt overwhelmed by my to-do list. Practiced 'premeditatio malorum' by imagining the worst outcomes. Realized most were unlikely or manageable. Felt a sense of calm and tackled one task at a time." }
    ],
    mood: 4 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 3)),
    updatedAt: createMockTimestamp(subDays(new Date(), 3)),
  },
  {
    id: '4',
    userId: 'mock-user',
    date: subDays(new Date(), 4).toISOString().split('T')[0],
    pillar: 'ego',
    dayInTrack: 2,
    blocks: [
      { id: 'b4', type: 'evening-audit', content: 'A tough day. Everything seemed to go wrong. It was hard to find the silver lining, but I reminded myself that this too shall pass. Grateful for a warm meal and a bed.' }
    ],
    mood: 2 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 4)),
    updatedAt: createMockTimestamp(subDays(new Date(), 4)),
  },
  {
    id: '5',
    userId: 'mock-user',
    date: subDays(new Date(), 5).toISOString().split('T')[0],
    pillar: 'relationships',
    dayInTrack: 1,
    blocks: [
      { id: 'b5', type: 'freeform', content: "Had a wonderful conversation with an old friend. It's the simple connections that bring the most joy. Remember to cherish these moments." }
    ],
    mood: 5 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 5)),
    updatedAt: createMockTimestamp(subDays(new Date(), 5)),
  },
  {
    id: '6',
    userId: 'mock-user',
    date: subDays(new Date(), 6).toISOString().split('T')[0],
    pillar: 'discipline',
    dayInTrack: 3,
    blocks: [
      { id: 'b6', type: 'freeform', content: 'Woke up feeling awful. A headache and low energy. Accepted the feeling without judgment and allowed myself to rest. Not every day has to be a productive one.' }
    ],
    mood: 1 as MoodScore,
    createdAt: createMockTimestamp(subDays(new Date(), 6)),
    updatedAt: createMockTimestamp(subDays(new Date(), 6)),
  },
];

export const streak = {
  days: 15,
  startDate: 'July 12, 2024',
};

export const moodDistribution: { mood: Mood, count: number }[] = [
  { mood: 'great', count: 2 },
  { mood: 'good', count: 5 },
  { mood: 'ok', count: 3 },
  { mood: 'bad', count: 1 },
  { mood: 'awful', count: 1 },
];

export const stoicPrompts: string[] = [
  "What is truly within my control today? What is not?",
  "How can I practice courage in a small way today?",
  "Reflect on a recent challenge. How did it help me grow?",
  "What is one thing I take for granted? How can I practice gratitude for it?",
  "How can I act with justice and fairness towards others today?",
];

export const dailyStoicQuote = {
  quote: "The impediment to action advances action. What stands in the way becomes the way.",
  author: "Marcus Aurelius",
  source: "MEDITATIONS, BOOK 5.20"
}
