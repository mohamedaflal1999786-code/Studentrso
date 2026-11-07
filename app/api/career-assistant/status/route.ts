// app/api/career-assistant/status/route.ts
import { NextResponse } from 'next/server';
import { verifyGeminiConnection } from '@/lib/ai/gemini-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const statusResult = await verifyGeminiConnection();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      configured: statusResult.configured,
      status: statusResult.status,
      message: statusResult.message,
    });
  } catch (error: any) {
    console.error('Error verifying Gemini connection status:', error);
    return NextResponse.json(
      {
        success: false,
        configured: false,
        status: 'UNAVAILABLE',
        message: 'Unable to connect to the AI service. Please try again.',
      },
      { status: 500 }
    );
  }
}
