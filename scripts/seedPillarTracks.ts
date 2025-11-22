/**
 * Script to seed pillar tracks to Firestore
 *
 * Run with: npx tsx scripts/seedPillarTracks.ts
 *
 * Note: Requires Firebase Admin SDK or running from a context
 * where Firebase is already initialized.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Firebase config - you'll need to set these env vars
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const PILLAR_THEMES = {
  money: "Your Wealth Isn't Your Worth",
  ego: 'Let Results Talk',
  relationships: 'Lead With Respect',
  discipline: 'Small Reps, Big Gains',
};

type Pillar = 'money' | 'ego' | 'relationships' | 'discipline';

interface RawDay {
  day: number;
  daily_theme: string;
  stoic_quote: string;
  quote_author: string;
  bro_translation: string;
  todays_challenge: string;
  challenge_type: string;
  todays_intention: string;
  evening_reflection_prompts: string[];
}

interface RawTrack {
  track_id: string;
  days: RawDay[];
}

function transformTrack(rawData: RawTrack, pillar: Pillar) {
  return {
    pillar,
    theme: PILLAR_THEMES[pillar],
    days: rawData.days.map((day) => ({
      day: day.day,
      stoicQuote: day.stoic_quote,
      quoteAuthor: day.quote_author,
      broTranslation: day.bro_translation,
      todaysChallenge: day.todays_challenge,
      challengeType: day.challenge_type,
      todaysIntention: day.todays_intention,
      eveningPrompts: day.evening_reflection_prompts,
    })),
  };
}

async function seedTracks() {
  const tracks: { file: string; pillar: Pillar }[] = [
    { file: 'money-track.json', pillar: 'money' },
    { file: 'ego-track.json', pillar: 'ego' },
    { file: 'relationships-track.json', pillar: 'relationships' },
    { file: 'discipline-track.json', pillar: 'discipline' },
  ];

  console.log('Starting to seed pillar tracks...\n');

  for (const { file, pillar } of tracks) {
    try {
      const filePath = path.join(process.cwd(), file);
      const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RawTrack;
      const transformedTrack = transformTrack(rawData, pillar);

      console.log(`Seeding ${pillar} track (${transformedTrack.days.length} days)...`);

      const docRef = doc(db, 'pillarTracks', pillar);
      await setDoc(docRef, transformedTrack);

      console.log(`✓ ${pillar} track seeded successfully\n`);
    } catch (error) {
      console.error(`✗ Failed to seed ${pillar} track:`, error);
    }
  }

  console.log('Done seeding pillar tracks!');
}

seedTracks().catch(console.error);
