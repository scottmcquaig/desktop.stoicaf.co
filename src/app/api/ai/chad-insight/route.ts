import { NextRequest, NextResponse } from 'next/server';
import { generateChadInsight } from '@/ai/flows';
import { isAIConfigured } from '@/ai/genkit';

export async function POST(request: NextRequest) {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      console.error('AI not configured - GOOGLE_GENAI_API_KEY missing or invalid');
      return NextResponse.json(
        {
          error: 'AI not configured. Please add GOOGLE_GENAI_API_KEY to environment variables.',
          configured: false,
          hasKey: !!process.env.GOOGLE_GENAI_API_KEY,
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { entry, track, previousInsights, userId } = body;

    if (!entry || !track) {
      return NextResponse.json(
        { error: 'Entry and track are required' },
        { status: 400 }
      );
    }

    console.log('Generating Chad insight for track:', track, 'entry length:', entry.length);

    // Generate Chad insight using AI flow
    const result = await generateChadInsight({
      entry,
      track,
      previousInsights: previousInsights || [],
      userId: userId || 'anonymous',
    });

    console.log('Successfully generated insight');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating Chad insight:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      {
        error: `Failed to generate Chad insight: ${errorMessage}`,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}
