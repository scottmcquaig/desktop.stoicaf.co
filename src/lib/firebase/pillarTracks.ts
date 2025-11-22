import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firestore';
import type { Pillar, PillarTrack, DayPrompt } from '@/lib/types';

const TRACKS_COLLECTION = 'pillarTracks';

// Track themes
export const PILLAR_THEMES: Record<Pillar, string> = {
  money: 'Your Wealth Isn\'t Your Worth',
  ego: 'Let Results Talk',
  relationships: 'Lead With Respect',
  discipline: 'Small Reps, Big Gains',
};

/**
 * Get a pillar track from Firestore
 */
export async function getPillarTrack(pillar: Pillar): Promise<PillarTrack | null> {
  const docRef = doc(db, TRACKS_COLLECTION, pillar);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as PillarTrack;
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
