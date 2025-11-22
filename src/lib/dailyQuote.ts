import type { Pillar } from './types';

interface DailyQuote {
  quote: string;
  author: string;
  pillar: Pillar;
  broTranslation: string;
}

interface TrackDay {
  day: number;
  stoic_quote: string;
  quote_author: string;
  bro_translation: string;
}

interface TrackData {
  track_id: string;
  days: TrackDay[];
}

const PILLARS: Pillar[] = ['money', 'ego', 'relationships', 'discipline'];

// Cache for track data
let trackDataCache: Record<Pillar, TrackData> | null = null;

async function loadTrackData(): Promise<Record<Pillar, TrackData>> {
  if (trackDataCache) return trackDataCache;

  const trackFiles: Record<Pillar, string> = {
    money: '/data/money-track.json',
    ego: '/data/ego-track.json',
    relationships: '/data/relationships-track.json',
    discipline: '/data/discipline-track.json',
  };

  const results: Record<Pillar, TrackData> = {} as Record<Pillar, TrackData>;

  for (const pillar of PILLARS) {
    try {
      const response = await fetch(trackFiles[pillar]);
      if (response.ok) {
        results[pillar] = await response.json();
      }
    } catch (error) {
      console.error(`Error loading ${pillar} track:`, error);
    }
  }

  trackDataCache = results;
  return results;
}

/**
 * Get the daily quote based on day of year
 * Rotates through all pillars and days across the year
 */
export async function getDailyQuote(): Promise<DailyQuote> {
  const tracks = await loadTrackData();

  // Get day of year (1-365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Total quotes: 4 pillars x 30 days = 120
  // Cycle through all quotes based on day of year
  const totalQuotes = 4 * 30;
  const quoteIndex = dayOfYear % totalQuotes;

  const pillarIndex = Math.floor(quoteIndex / 30);
  const dayIndex = quoteIndex % 30;

  const pillar = PILLARS[pillarIndex];
  const track = tracks[pillar];

  if (!track || !track.days || !track.days[dayIndex]) {
    // Fallback quote
    return {
      quote: "The impediment to action advances action. What stands in the way becomes the way.",
      author: "Marcus Aurelius",
      pillar: 'discipline',
      broTranslation: "Obstacles aren't stop signs - they're training grounds. The difficult coworker is patience training. The lost deal is resilience training.",
    };
  }

  const day = track.days[dayIndex];

  return {
    quote: day.stoic_quote,
    author: day.quote_author,
    pillar,
    broTranslation: day.bro_translation,
  };
}

/**
 * Get a random quote from any pillar (for fallback/variety)
 */
export async function getRandomQuote(): Promise<DailyQuote> {
  const tracks = await loadTrackData();

  const pillar = PILLARS[Math.floor(Math.random() * PILLARS.length)];
  const track = tracks[pillar];

  if (!track || !track.days) {
    return getDailyQuote();
  }

  const dayIndex = Math.floor(Math.random() * track.days.length);
  const day = track.days[dayIndex];

  return {
    quote: day.stoic_quote,
    author: day.quote_author,
    pillar,
    broTranslation: day.bro_translation,
  };
}
