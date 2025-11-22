import { NextRequest, NextResponse } from 'next/server';
import { generateDailyPrompt } from '@/ai/flows';
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
    const { track, recentTopics, userId } = body;

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
      userId: userId || 'anonymous',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating daily prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate daily prompt: ${errorMessage}` },
      { status: 500 }
    );
  }
}