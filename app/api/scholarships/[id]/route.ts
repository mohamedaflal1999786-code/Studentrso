import { NextResponse } from 'next/server';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from '@/lib/scholarships-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const program = GENUINE_SCHOLARSHIP_CATALOGUE.find((p) => p.id === id);
  if (!program) {
    return NextResponse.json({ error: 'Scholarship scheme not found in verified catalogue.' }, { status: 404 });
  }
  return NextResponse.json({ program });
}
