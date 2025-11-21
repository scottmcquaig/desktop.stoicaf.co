import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  mockUser,
  mockEntries,
  type User,
  type JournalEntry,
  type Pillar,
  type Mood
} from './mock-data'

interface AppState {
  // Auth state
  isAuthenticated: boolean
  hasCompletedOnboarding: boolean
  user: User | null

  // Journal state
  entries: JournalEntry[]

  // Actions
  login: (email: string, password: string) => void
  signup: (email: string, password: string, displayName: string) => void
  logout: () => void
  completeOnboarding: (pillar: Pillar, reminderTime?: string) => void
  addEntry: (entry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void
  deleteEntry: (id: string) => void
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      user: null,
      entries: [],

      // Auth actions
      login: (email: string, _password: string) => {
        // Mock login - in production this would validate with Firebase
        set({
          isAuthenticated: true,
          hasCompletedOnboarding: true, // Assume returning user
          user: { ...mockUser, email },
          entries: mockEntries,
        })
      },

      signup: (email: string, _password: string, displayName: string) => {
        // Mock signup - creates new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          displayName,
          createdAt: new Date(),
          preferences: {
            dailyReminderEnabled: true,
            theme: 'auto',
          },
          stats: {
            totalEntries: 0,
            currentStreak: 0,
            longestStreak: 0,
          },
        }
        set({
          isAuthenticated: true,
          hasCompletedOnboarding: false,
          user: newUser,
          entries: [],
        })
      },

      logout: () => {
        set({
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          user: null,
          entries: [],
        })
      },

      completeOnboarding: (pillar: Pillar, reminderTime?: string) => {
        const { user } = get()
        if (user) {
          set({
            hasCompletedOnboarding: true,
            user: {
              ...user,
              preferences: {
                ...user.preferences,
                defaultPillar: pillar,
                dailyReminderTime: reminderTime,
                dailyReminderEnabled: !!reminderTime,
              },
            },
          })
        }
      },

      // Journal actions
      addEntry: (entry) => {
        const { user, entries } = get()
        if (!user) return

        const newEntry: JournalEntry = {
          ...entry,
          id: `entry-${Date.now()}`,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set({
          entries: [newEntry, ...entries],
          user: {
            ...user,
            stats: {
              ...user.stats,
              totalEntries: user.stats.totalEntries + 1,
              currentStreak: user.stats.currentStreak + 1,
              longestStreak: Math.max(user.stats.longestStreak, user.stats.currentStreak + 1),
            },
          },
        })
      },

      updateEntry: (id, updates) => {
        const { entries } = get()
        set({
          entries: entries.map((entry) =>
            entry.id === id
              ? { ...entry, ...updates, updatedAt: new Date() }
              : entry
          ),
        })
      },

      deleteEntry: (id) => {
        const { entries, user } = get()
        set({
          entries: entries.filter((entry) => entry.id !== id),
          user: user
            ? {
                ...user,
                stats: {
                  ...user.stats,
                  totalEntries: Math.max(0, user.stats.totalEntries - 1),
                },
              }
            : null,
        })
      },

      updateUserPreferences: (preferences) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              preferences: {
                ...user.preferences,
                ...preferences,
              },
            },
          })
        }
      },
    }),
    {
      name: 'stoic-app-storage',
    }
  )
)
