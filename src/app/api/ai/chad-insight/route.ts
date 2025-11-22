import { NextRequest, NextResponse } from 'next/server';
import { generateChadInsight } from '@/ai/flows';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entry, track, previousInsights, userId } = body;

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
      userId: userId || 'anonymous',
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
