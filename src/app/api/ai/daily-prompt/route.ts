import { NextRequest, NextResponse } from 'next/server';
import { generateDailyPrompt } from '@/ai/flows';
import { auth } from '@/lib/firebase/auth';

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
    const { track, recentTopics } = body;

    if (!track) {
      return NextResponse.json(
        { error: 'Track is required' },
        { status: 400 }
      );
    }

    // Generate daily prompt using AI flow
    const result = await generateDailyPrompt({
      track,
      recentTopics: recentTopics || [],
      userId: user.uid,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating daily prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily prompt' },
      { status: 500 }
    );
  }
}