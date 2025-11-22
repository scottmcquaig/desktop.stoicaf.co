import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyReflection } from '@/ai/flows';
import { auth } from '@/lib/firebase/auth';
import { getJournalEntries } from '@/lib/firebase/journal';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';

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
    const { track, weekOffset = 0 } = body;

    if (!track) {
      return NextResponse.json(
        { error: 'Track is required' },
        { status: 400 }
      );
    }

    // Get the week's date range
    const targetDate = weekOffset ? subWeeks(new Date(), weekOffset) : new Date();
    const weekStart = startOfWeek(targetDate);
    const weekEnd = endOfWeek(targetDate);

    // Fetch journal entries for the week
    const entries = await getJournalEntries(user.uid, {
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
    });

    if (entries.length === 0) {
      return NextResponse.json(
        { error: 'No entries found for this week' },
        { status: 404 }
      );
    }

    // Format entries for AI processing
    const formattedEntries = entries.map(entry => ({
      content: entry.content,
      date: entry.createdAt,
      mood: entry.mood || undefined,
    }));

    // Generate weekly reflection using AI flow
    const result = await generateWeeklyReflection({
      entries: formattedEntries,
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