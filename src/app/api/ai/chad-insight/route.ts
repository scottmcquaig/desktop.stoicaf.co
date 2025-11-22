import { NextRequest, NextResponse } from 'next/server';
import { generateChadInsight } from '@/ai/flows';
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
    const { entry, track, previousInsights } = body;

    if (!entry || !track) {
      return NextResponse.json(
        { error: 'Entry and track are required' },
        { status: 400 }
      );
    }

    // Generate Chad insight using AI flow
    const result = await generateChadInsight({
      entry,
      track,
      previousInsights: previousInsights || [],
      userId: user.uid,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating Chad insight:', error);
    return NextResponse.json(
      { error: 'Failed to generate Chad insight' },
      { status: 500 }
    );
  }
}