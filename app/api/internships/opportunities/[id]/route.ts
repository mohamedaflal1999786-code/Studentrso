// app/api/internships/opportunities/[id]/route.ts
import { NextResponse } from 'next/server';
import { VERIFIED_OPPORTUNITIES } from '@/lib/internship-data';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const item = VERIFIED_OPPORTUNITIES.find((opp) => opp.id === id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Opportunity not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      opportunity: item,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching opportunity detail:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
