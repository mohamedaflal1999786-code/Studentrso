// app/api/admissions/records/route.ts
import { NextResponse } from 'next/server';
import {
  ADMISSION_PATHWAYS,
  OFFICIAL_PORTALS_DIRECTORY,
  TRANSFER_REGULATIONS,
  REENTRY_PROTOCOLS,
  CREDIT_MOBILITY_GUIDES,
  REQUIRED_DOCUMENTS_DIRECTORY,
  searchPathways,
  EducationStage
} from '@/lib/admissions-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const stage = (searchParams.get('stage') as EducationStage) || 'All Stages';
    const category = searchParams.get('category');

    let pathways = searchPathways(query, stage);

    if (category) {
      pathways = pathways.filter((p) => p.category === category);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      totalPathways: pathways.length,
      pathways,
      officialPortals: OFFICIAL_PORTALS_DIRECTORY,
      transferRegulations: TRANSFER_REGULATIONS,
      reEntryProtocols: REENTRY_PROTOCOLS,
      creditMobility: CREDIT_MOBILITY_GUIDES,
      requiredDocuments: REQUIRED_DOCUMENTS_DIRECTORY,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admission records', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
