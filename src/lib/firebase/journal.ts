import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  getCountFromServer,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firestore';
import type { JournalEntry, JournalEntryInput } from '@/lib/types';

const ENTRIES_COLLECTION = 'entries';

/**
 * Create a new journal entry
 */
export async function createEntry(
  userId: string,
  data: JournalEntryInput
): Promise<string> {
  const entriesRef = collection(db, ENTRIES_COLLECTION);

  const docRef = await addDoc(entriesRef, {
    ...data,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Get a single entry by ID
 */
export async function getEntry(entryId: string): Promise<JournalEntry | null> {
  const docRef = doc(db, ENTRIES_COLLECTION, entryId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as JournalEntry;
}

/**
 * Update an existing entry
 */
export async function updateEntry(
  entryId: string,
  data: Partial<JournalEntryInput>
): Promise<void> {
  const docRef = doc(db, ENTRIES_COLLECTION, entryId);

  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete an entry
 */
export async function deleteEntry(entryId: string): Promise<void> {
  const docRef = doc(db, ENTRIES_COLLECTION, entryId);
  await deleteDoc(docRef);
}

/**
 * Get all entries for a user (paginated)
 */
export async function getEntries(
  userId: string,
  options: {
    pageSize?: number;
    lastDoc?: QueryDocumentSnapshot;
  } = {}
): Promise<{
  entries: JournalEntry[];
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
}> {
  const { pageSize = 10, lastDoc } = options;

  try {
    // Try the indexed query first
    let q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(pageSize + 1)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;

    const entries = docs.slice(0, pageSize).map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];

    return {
      entries,
      lastDoc: docs.length > 0 ? docs[Math.min(docs.length - 1, pageSize - 1)] : null,
      hasMore,
    };
  } catch (error) {
    // Fallback: fetch without ordering (works without composite index)
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);

    // Sort client-side by createdAt descending
    const allEntries = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JournalEntry[];

    allEntries.sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
      const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime;
    });

    const entries = allEntries.slice(0, pageSize);
    const hasMore = allEntries.length > pageSize;

    return {
      entries,
      lastDoc: null, // Pagination won't work with fallback
      hasMore,
    };
  }
}

/**
 * Get entries for a specific month (for calendar view)
 */
export async function getEntriesForMonth(
  userId: string,
  year: number,
  month: number // 0-indexed
): Promise<JournalEntry[]> {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      where('createdAt', '<=', Timestamp.fromDate(endDate)),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];
  } catch (error) {
    // Fallback: fetch all and filter client-side
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const allEntries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];

    // Filter by month using date field or createdAt
    return allEntries.filter((entry) => {
      let entryDate: Date;
      if (entry.date) {
        const [y, m, d] = entry.date.split('-').map(Number);
        entryDate = new Date(y, m - 1, d);
      } else if (entry.createdAt?.toDate) {
        entryDate = entry.createdAt.toDate();
      } else {
        return false;
      }
      return entryDate >= startDate && entryDate <= endDate;
    }).sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
      const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime;
    });
  }
}

/**
 * Get recent entries (for dashboard)
 */
export async function getRecentEntries(
  userId: string,
  count: number = 5
): Promise<JournalEntry[]> {
  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(count)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];
  } catch (error) {
    // Fallback: fetch all and sort client-side
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const allEntries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];

    allEntries.sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
      const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime;
    });

    return allEntries.slice(0, count);
  }
}

/**
 * Get recent entries for pillar progress (larger window)
 */
export async function getRecentEntriesForProgress(
  userId: string,
  count: number = 30
): Promise<JournalEntry[]> {
  return getRecentEntries(userId, count);
}

/**
 * Get entry count for a user
 */
export async function getEntryCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting entry count:', error);
    throw error;
  }
}

/**
 * Calculate streak (consecutive days with entries)
 */
export async function calculateStreak(userId: string): Promise<number> {
  let entries: Timestamp[] = [];

  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 0;
    }

    entries = snapshot.docs.map((doc) => {
      const data = doc.data();
      return data.createdAt as Timestamp;
    });
  } catch (error) {
    // Fallback: fetch all and sort client-side
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 0;
    }

    entries = snapshot.docs
      .map((doc) => doc.data().createdAt as Timestamp)
      .filter(Boolean)
      .sort((a, b) => b.toDate().getTime() - a.toDate().getTime())
      .slice(0, 100);
  }

  if (entries.length === 0) {
    return 0;
  }

  // Get unique dates (YYYY-MM-DD format)
  const uniqueDates = [...new Set(
    entries.map((ts) => {
      const date = ts.toDate();
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    })
  )].sort().reverse();

  if (uniqueDates.length === 0) {
    return 0;
  }

  // Check if most recent entry is today or yesterday
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
    return 0; // Streak broken
  }

  // Count consecutive days
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i - 1]);
    const prevDate = new Date(uniqueDates[i]);

    const diffTime = currentDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get mood data for the last N entries (for dashboard chart)
 */
export async function getMoodTrend(
  userId: string,
  count: number = 5
): Promise<{ date: Date; mood: number }[]> {
  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      where('mood', '!=', null),
      orderBy('mood'),
      orderBy('createdAt', 'desc'),
      limit(count)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          date: (data.createdAt as Timestamp).toDate(),
          mood: data.mood as number,
        };
      })
      .reverse();
  } catch (error) {
    // Fallback: fetch all and filter/sort client-side
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const entriesWithMood = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          date: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
          mood: data.mood as number | null,
        };
      })
      .filter((e) => e.mood !== null && e.mood !== undefined)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count) as { date: Date; mood: number }[];

    return entriesWithMood.reverse();
  }
}

/**
 * Get entry for a specific date (one entry per day)
 */
export async function getEntryByDate(
  userId: string,
  date: string // YYYY-MM-DD format
): Promise<JournalEntry | null> {
  const q = query(
    collection(db, ENTRIES_COLLECTION),
    where('userId', '==', userId),
    where('date', '==', date),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as JournalEntry;
}

/**
 * Get user's progress in a specific pillar track
 */
export async function getPillarProgress(
  userId: string,
  pillar: string
): Promise<number> {
  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      where('pillar', '==', pillar),
      orderBy('dayInTrack', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 0;
    }

    const data = snapshot.docs[0].data();
    return data.dayInTrack as number;
  } catch (error) {
    // Fallback: fetch all entries for this pillar and find max dayInTrack
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const pillarEntries = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.pillar === pillar);

    if (pillarEntries.length === 0) {
      return 0;
    }

    return Math.max(...pillarEntries.map((e) => (e.dayInTrack as number) || 0));
  }
}

/**
 * Get entries for the last N days (for insights)
 */
export async function getEntriesForLastNDays(
  userId: string,
  days: number = 30
): Promise<JournalEntry[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  try {
    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];
  } catch (error) {
    // Fallback: fetch all and filter client-side
    console.warn('Composite index may be missing, using fallback query:', error);

    const q = query(
      collection(db, ENTRIES_COLLECTION),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const allEntries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JournalEntry[];

    // Filter by date range
    return allEntries
      .filter((entry) => {
        const entryDate = entry.createdAt?.toDate?.();
        return entryDate && entryDate >= startDate;
      })
      .sort((a, b) => {
        const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
        const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
        return bTime - aTime;
      });
  }
}

/**
 * Get pillar distribution for user
 */
export async function getPillarDistribution(
  userId: string
): Promise<Record<string, number>> {
  const q = query(
    collection(db, ENTRIES_COLLECTION),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(q);

  const distribution: Record<string, number> = {
    money: 0,
    ego: 0,
    relationships: 0,
    discipline: 0,
  };

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.pillar && distribution[data.pillar] !== undefined) {
      distribution[data.pillar]++;
    }
  });

  return distribution;
}

/**
 * Get mood data for last N days (for insights chart)
 */
export async function getMoodDataForDays(
  userId: string,
  days: number = 30
): Promise<{ date: string; mood: number | null }[]> {
  const entries = await getEntriesForLastNDays(userId, days);

  // Create a map of date -> mood
  const moodByDate: Record<string, number | null> = {};

  entries.forEach((entry) => {
    const dateStr = entry.date || entry.createdAt.toDate().toISOString().split('T')[0];
    if (!moodByDate[dateStr]) {
      moodByDate[dateStr] = entry.mood;
    }
  });

  // Fill in all days in the range
  const result: { date: string; mood: number | null }[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      mood: moodByDate[dateStr] ?? null,
    });
  }

  return result;
}
