import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firestore';
import type { Pillar, PillarTrack, DayPrompt } from '@/lib/types';

const TRACKS_COLLECTION = 'pillarTracks';

// Track themes
export const PILLAR_THEMES: Record<Pillar, string> = {
  money: "Your Wealth Isn't Your Worth",
  ego: 'Let Results Talk',
  relationships: 'Lead With Respect',
  discipline: 'Small Reps, Big Gains',
};

// Cache for loaded tracks
const trackCache: Partial<Record<Pillar, PillarTrack>> = {};

/**
 * Transform raw JSON data to our PillarTrack format
 */
export function transformRawTrack(
  rawData: {
    track_id: string;
    days: Array<{
      day: number;
      daily_theme: string;
      stoic_quote: string;
      quote_author: string;
      bro_translation: string;
      todays_challenge: string;
      challenge_type: string;
      todays_intention: string;
      evening_reflection_prompts: string[];
    }>;
  },
  pillar: Pillar
): PillarTrack {
  return {
    pillar,
    theme: PILLAR_THEMES[pillar],
    days: rawData.days.map((day) => ({
      day: day.day,
      stoicQuote: day.stoic_quote,
      quoteAuthor: day.quote_author,
      broTranslation: day.bro_translation,
      todaysChallenge: day.todays_challenge,
      challengeType: day.challenge_type as 'reflection' | 'action' | 'meditation',
      todaysIntention: day.todays_intention,
      eveningPrompts: day.evening_reflection_prompts,
    })),
  };
}

/**
 * Fetch track from public JSON files (fallback)
 */
async function fetchTrackFromPublic(pillar: Pillar): Promise<PillarTrack | null> {
  try {
    const response = await fetch(`/data/${pillar}-track.json`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${pillar} track from public folder`);
      return null;
    }
    const rawData = await response.json();
    return transformRawTrack(rawData, pillar);
  } catch (error) {
    console.error(`Error fetching ${pillar} track:`, error);
    return null;
  }
}

/**
 * Get a pillar track - tries Firestore first, falls back to local JSON
 */
export async function getPillarTrack(pillar: Pillar): Promise<PillarTrack | null> {
  // Check cache first
  if (trackCache[pillar]) {
    return trackCache[pillar]!;
  }

  // Try Firestore first
  try {
    const docRef = doc(db, TRACKS_COLLECTION, pillar);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const track = docSnap.data() as PillarTrack;
      trackCache[pillar] = track;
      return track;
    }
  } catch (error) {
    console.warn(`Firestore fetch failed for ${pillar} track, using fallback:`, error);
  }

  // Fallback to public JSON files
  const track = await fetchTrackFromPublic(pillar);
  if (track) {
    trackCache[pillar] = track;
  }
  return track;
}

/**
 * Get today's prompt for a user based on their progress
 */
export async function getTodaysPrompt(
  pillar: Pillar,
  dayInTrack: number
): Promise<DayPrompt | null> {
  const track = await getPillarTrack(pillar);
  if (!track) return null;

  // dayInTrack is 1-indexed
  const prompt = track.days.find((d) => d.day === dayInTrack);
  return prompt || null;
}

/**
 * Save a pillar track to Firestore (for seeding)
 */
export async function savePillarTrack(track: PillarTrack): Promise<void> {
  const docRef = doc(db, TRACKS_COLLECTION, track.pillar);
  await setDoc(docRef, track);
}
