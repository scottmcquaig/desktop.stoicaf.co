// Mock data for Stoic.af prototype
// This will be replaced with Firebase data later

export type Pillar = 'money' | 'ego' | 'relationships' | 'discipline'
export type Mood = 'great' | 'good' | 'okay' | 'bad' | 'terrible'

export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  createdAt: Date
  preferences: {
    dailyReminderTime?: string
    dailyReminderEnabled: boolean
    theme: 'light' | 'dark' | 'auto'
    defaultPillar?: Pillar
  }
  stats: {
    totalEntries: number
    currentStreak: number
    longestStreak: number
  }
}

export interface JournalEntry {
  id: string
  userId: string
  date: Date
  content: string
  mood: Mood
  pillar: Pillar
  prompt?: string
  createdAt: Date
  updatedAt: Date
}

export interface DailyQuote {
  text: string
  author: string
  pillar?: Pillar
}

// Mock user data
export const mockUser: User = {
  id: 'user-1',
  email: 'stoic@example.com',
  displayName: 'Marcus',
  createdAt: new Date('2024-10-01'),
  preferences: {
    dailyReminderTime: '08:00',
    dailyReminderEnabled: true,
    theme: 'auto',
    defaultPillar: 'discipline',
  },
  stats: {
    totalEntries: 47,
    currentStreak: 12,
    longestStreak: 23,
  },
}

// Mock journal entries
export const mockEntries: JournalEntry[] = [
  {
    id: 'entry-1',
    userId: 'user-1',
    date: new Date(),
    content: 'Today I practiced restraint when faced with an unnecessary purchase. The Stoics remind us that true wealth lies not in having many possessions, but in having few wants. I felt a moment of temptation but paused, reflected, and walked away feeling stronger.',
    mood: 'great',
    pillar: 'money',
    prompt: 'What unnecessary desire did you resist today?',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'entry-2',
    userId: 'user-1',
    date: new Date(Date.now() - 86400000), // Yesterday
    content: 'A colleague criticized my work in front of others. My initial reaction was defensive anger, but I caught myself. I asked: "Is there truth in this feedback?" There was. I thanked them for the insight. My ego wanted to fight, but wisdom chose growth.',
    mood: 'good',
    pillar: 'ego',
    prompt: 'How did you handle criticism today?',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'entry-3',
    userId: 'user-1',
    date: new Date(Date.now() - 172800000), // 2 days ago
    content: 'Called my mother today, just to listen. Not to solve her problems or offer advice, but simply to be present. The Stoics taught that we cannot control others, only our response. I chose patience and love.',
    mood: 'great',
    pillar: 'relationships',
    prompt: 'Who did you show genuine presence to today?',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
  {
    id: 'entry-4',
    userId: 'user-1',
    date: new Date(Date.now() - 259200000), // 3 days ago
    content: 'Woke up at 5:30 AM despite wanting to sleep in. The comfort of the bed was powerful, but I remembered: "At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work — as a human being." - Marcus Aurelius. I rose.',
    mood: 'good',
    pillar: 'discipline',
    prompt: 'What comfort did you sacrifice for growth today?',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: 'entry-5',
    userId: 'user-1',
    date: new Date(Date.now() - 345600000), // 4 days ago
    content: 'Reviewed my budget and found areas of mindless spending. Subscriptions I never use, impulse purchases that brought no lasting joy. I cancelled three services today. Financial freedom begins with awareness.',
    mood: 'okay',
    pillar: 'money',
    prompt: 'What financial habit needs your attention?',
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000),
  },
]

// Mock daily quotes
export const mockQuotes: DailyQuote[] = [
  {
    text: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
  },
  {
    text: 'We suffer more often in imagination than in reality.',
    author: 'Seneca',
  },
  {
    text: 'Man is not worried by real problems so much as by his imagined anxieties about real problems.',
    author: 'Epictetus',
  },
  {
    text: 'Wealth consists not in having great possessions, but in having few wants.',
    author: 'Epictetus',
    pillar: 'money',
  },
  {
    text: 'It is not the man who has too little, but the man who craves more, that is poor.',
    author: 'Seneca',
    pillar: 'money',
  },
  {
    text: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.',
    author: 'Marcus Aurelius',
    pillar: 'ego',
  },
  {
    text: 'No man is free who is not master of himself.',
    author: 'Epictetus',
    pillar: 'discipline',
  },
  {
    text: 'Associate with people who are likely to improve you.',
    author: 'Seneca',
    pillar: 'relationships',
  },
]

// Mock prompts by pillar
export const mockPrompts: Record<Pillar, string[]> = {
  money: [
    'What unnecessary desire did you resist today?',
    'How can you simplify your financial life?',
    'What purchase would the wisest version of you make?',
    'Where does your money reflect your values?',
    'What financial fear can you examine rationally?',
  ],
  ego: [
    'How did you handle criticism today?',
    'What assumption about yourself might be wrong?',
    'When did pride cloud your judgment recently?',
    'What would you do if no one was watching?',
    'Whose opinion do you value too much?',
  ],
  relationships: [
    'Who did you show genuine presence to today?',
    'What relationship needs your attention?',
    'How can you better understand someone you disagree with?',
    'What boundary do you need to set or respect?',
    'Who has shaped who you are today?',
  ],
  discipline: [
    'What comfort did you sacrifice for growth today?',
    'What habit would your future self thank you for?',
    'Where did you take the easy path when the hard path was right?',
    'What small action today builds toward your larger goals?',
    'How did you practice self-control?',
  ],
}

// Helper functions
export function getTodayQuote(): DailyQuote {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return mockQuotes[dayOfYear % mockQuotes.length]
}

export function getPromptForPillar(pillar: Pillar): string {
  const prompts = mockPrompts[pillar]
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export function getMoodColor(mood: Mood): string {
  const colors: Record<Mood, string> = {
    great: '#10B981',
    good: '#4B90C8',
    okay: '#F59E0B',
    bad: '#F97316',
    terrible: '#EF4444',
  }
  return colors[mood]
}

export function getPillarColor(pillar: Pillar): string {
  const colors: Record<Pillar, string> = {
    money: '#10B981',
    ego: '#8B5CF6',
    relationships: '#EF4444',
    discipline: '#F59E0B',
  }
  return colors[pillar]
}

export function getPillarIcon(pillar: Pillar): string {
  const icons: Record<Pillar, string> = {
    money: 'Wallet',
    ego: 'Brain',
    relationships: 'Heart',
    discipline: 'Target',
  }
  return icons[pillar]
}

export function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) {
    return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}
