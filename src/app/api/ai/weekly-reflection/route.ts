import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyReflection } from '@/ai/flows';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entries, track, userId } = body;

    if (!track) {
      return NextResponse.json(
        { error: 'Track is required' },
        { status: 400 }
      );
    }

    if (!entries || entries.length === 0) {
      return NextResponse.json(
        { error: 'No entries provided for reflection' },
        { status: 400 }
      );
    }

    // Generate weekly reflection using AI flow
    const result = await generateWeeklyReflection({
      entries,
      track,
      userId: userId || 'anonymous',
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
