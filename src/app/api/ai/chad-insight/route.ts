import { NextRequest, NextResponse } from 'next/server';
import { generateChadInsight } from '@/ai/flows';
import { isAIConfigured } from '@/ai/genkit';

export async function POST(request: NextRequest) {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json(
        {
          error: 'AI not configured. Please add GOOGLE_GENAI_API_KEY to your .env.local file.',
          configured: false
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate Chad insight: ${errorMessage}` },
      { status: 500 }
    );
  }
}
