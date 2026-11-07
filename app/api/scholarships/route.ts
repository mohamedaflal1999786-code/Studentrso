import { NextResponse } from 'next/server';
import {
  GENUINE_SCHOLARSHIP_CATALOGUE,
  ComprehensiveScholarship,
  EducationStage,
  SchemeCategory,
  SchemeType,
} from '@/lib/scholarships-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase().trim() || '';
    const category = searchParams.get('category') || 'All';
    const stage = searchParams.get('stage') || 'All';
    const schemeType = searchParams.get('schemeType') || 'All';
    const status = searchParams.get('status') || 'All';
    const sortBy = searchParams.get('sortBy') || 'verified'; // 'verified' | 'deadline' | 'name'

    const programs: ComprehensiveScholarship[] = GENUINE_SCHOLARSHIP_CATALOGUE;

    // Filter
    let filtered = programs.filter((p) => {
      const curVersion = p.versions.find((v) => v.isCurrentVersion) || p.versions[0];

      if (category !== 'All' && p.category !== category) return false;
      if (schemeType !== 'All' && p.schemeType !== schemeType) return false;
      if (stage !== 'All' && !p.educationStages.includes(stage as EducationStage)) return false;
      if (status !== 'All' && curVersion.lifecycleStatus !== status) return false;

      if (query) {
        const haystack = `${p.name} ${p.tamilName || ''} ${p.provider} ${p.department} ${p.audience} ${p.summary} ${p.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    // Sort
    if (sortBy === 'deadline') {
      filtered = filtered.sort((a, b) => {
        const vA = a.versions.find((v) => v.isCurrentVersion) || a.versions[0];
        const vB = b.versions.find((v) => v.isCurrentVersion) || b.versions[0];
        if (!vA.applicationDeadline) return 1;
        if (!vB.applicationDeadline) return -1;
        return new Date(vA.applicationDeadline).getTime() - new Date(vB.applicationDeadline).getTime();
      });
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: recently verified
      filtered = filtered.sort((a, b) => {
        const vA = a.versions.find((v) => v.isCurrentVersion) || a.versions[0];
        const vB = b.versions.find((v) => v.isCurrentVersion) || b.versions[0];
        return new Date(vB.sourceVerificationDate).getTime() - new Date(vA.sourceVerificationDate).getTime();
      });
    }

    // Dynamic Database Statistics (strictly calculated from verified dataset, never fabricated!)
    const stats = {
      totalCount: programs.length,
      tamilNaduCount: programs.filter((p) => p.category === 'Tamil Nadu Government').length,
      centralGovtCount: programs.filter((p) => p.category === 'Central Government').length,
      aicteCount: programs.filter((p) => p.category === 'AICTE').length,
      ugcCount: programs.filter((p) => p.category === 'UGC').length,
      icarCount: programs.filter((p) => p.category === 'ICAR').length,
      researchCouncilCount: programs.filter((p) => p.category === 'Research Council').length,
      foundationCount: programs.filter((p) => p.category === 'Institution / Foundation').length,
      schoolCount: programs.filter((p) =>
        p.educationStages.some((s) => s === 'Class 10' || s === 'Class 11' || s === 'Class 12')
      ).length,
      diplomaAndUgCount: programs.filter((p) =>
        p.educationStages.some((s) => s === 'Diploma' || s === 'Undergraduate' || s === 'Professional degree' || s === 'ITI')
      ).length,
      pgCount: programs.filter((p) => p.educationStages.includes('Postgraduate')).length,
      researchFellowshipsCount: programs.filter((p) =>
        p.educationStages.some((s) => s === 'PhD' || s === 'Junior Research Fellowship' || s === 'Senior Research Fellowship' || s === 'Postdoctoral research')
      ).length,
      completedPgCount: programs.filter((p) =>
        p.educationStages.includes('Completed PG') ||
        p.educationStages.includes('PhD') ||
        p.educationStages.includes('Junior Research Fellowship') ||
        p.educationStages.includes('Postdoctoral research')
      ).length,
    };

    return NextResponse.json({
      programs: filtered,
      totalCount: filtered.length,
      stats,
      disclaimer: 'Official source first. Applications, guidelines and dates are subject to official Government and Provider notifications.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching scholarship catalogue' },
      { status: 500 }
    );
  }
}
