import { NextResponse } from 'next/server';
import { DiscoveryEngine } from '@/lib/discovery-engine';
import { GENUINE_SCHOLARSHIP_CATALOGUE, OFFICIAL_TRUSTED_SOURCES } from '@/lib/scholarships-data';

export async function GET() {
  const engine = DiscoveryEngine.getInstance();
  const { expiredCount, extendedCount } = engine.processLifecycles(GENUINE_SCHOLARSHIP_CATALOGUE);

  const breakdown = {
    totalSchemes: GENUINE_SCHOLARSHIP_CATALOGUE.length,
    tamilNaduGovt: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'Tamil Nadu Government').length,
    centralGovt: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'Central Government').length,
    aicte: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'AICTE').length,
    ugc: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'UGC').length,
    icar: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'ICAR').length,
    researchCouncil: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'Research Council').length,
    foundations: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.category === 'Institution / Foundation').length,
    schoolSchemes: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) =>
      p.educationStages.some((s) => s === 'Class 10' || s === 'Class 11' || s === 'Class 12')
    ).length,
    diplomaAndUgSchemes: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) =>
      p.educationStages.some((s) => s === 'Diploma' || s === 'Undergraduate' || s === 'Professional degree' || s === 'ITI')
    ).length,
    pgSchemes: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) => p.educationStages.includes('Postgraduate')).length,
    researchFellowships: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) =>
      p.educationStages.some((s) => s === 'PhD' || s === 'Junior Research Fellowship' || s === 'Senior Research Fellowship' || s === 'Postdoctoral research')
    ).length,
    completedPgOpportunities: GENUINE_SCHOLARSHIP_CATALOGUE.filter((p) =>
      p.educationStages.includes('Completed PG') ||
      p.educationStages.includes('PhD') ||
      p.educationStages.includes('Junior Research Fellowship') ||
      p.educationStages.includes('Postdoctoral research')
    ).length,
  };

  return NextResponse.json({
    platform: 'Student RSO 2.0 Tamil Nadu Scholarship Intelligence',
    automationStatus: 'Operational',
    lastChecked: new Date().toISOString(),
    breakdown,
    sourcesCount: OFFICIAL_TRUSTED_SOURCES.length,
    sources: OFFICIAL_TRUSTED_SOURCES,
    deadlinesExpired: expiredCount,
    deadlinesExtended: extendedCount,
    operatingNotice: 'Operates continuously without manual administrator intervention. Scheduled connectors run daily.',
  });
}
