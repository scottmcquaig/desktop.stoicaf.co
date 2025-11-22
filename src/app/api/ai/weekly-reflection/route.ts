import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyReflection } from '@/ai/flows';
import { auth } from '@/lib/firebase/auth';
import { getEntriesForLastNDays } from '@/lib/firebase/journal';
import type { JournalEntry } from '@/lib/types';

// Helper to extract content from entry blocks
function getEntryContent(entry: JournalEntry): string {
  if (!entry.blocks || entry.blocks.length === 0) return '';

  return entry.blocks
    .map((block) => {
      if (block.type === 'dichotomy') {
        const parts = [];
        if (block.inControl) parts.push(`In my control: ${block.inControl}`);
        if (block.notInControl) parts.push(`Not in my control: ${block.notInControl}`);
        return parts.join('\n');
      }
      return block.content || '';
    })
    .filter(Boolean)
    .join('\n\n');
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await auth.currentUser;
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { track } = body;

    if (!track) {
      return NextResponse.json(
        { error: 'Track is required' },
        { status: 400 }
      );
    }

    // Fetch journal entries for the last 7 days
    const entries = await getEntriesForLastNDays(user.uid, 7);

    if (entries.length === 0) {
      return NextResponse.json(
        { error: 'No entries found for this week' },
        { status: 404 }
      );
    }

    // Format entries for AI processing
    const formattedEntries = entries.map(entry => ({
      content: getEntryContent(entry),
      date: entry.date || entry.createdAt.toDate().toISOString().split('T')[0],
      mood: entry.mood ? String(entry.mood) : undefined,
    }));

    // Filter out entries with no content
    const validEntries = formattedEntries.filter(e => e.content.trim());

    if (validEntries.length === 0) {
      return NextResponse.json(
        { error: 'No entries with content found for this week' },
        { status: 404 }
      );
    }

    // Generate weekly reflection using AI flow
    const result = await generateWeeklyReflection({
      entries: validEntries,
      track,
      userId: user.uid,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating weekly reflection:', error);
    return NextResponse.json(
      { error: 'Failed to generate weekly reflection' },
      { status: 500 }
    );
  }
}
