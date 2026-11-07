import { NextResponse } from 'next/server';
import {
  MULTI_MODULE_AUDIT_REGISTRY,
  getMultiModuleAuditSummary,
  ModuleLinkAuditRecord,
} from '@/lib/multi-module-link-audit';
import { getScholarshipAuditStats } from '@/lib/scholarship-url-audit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const moduleId = searchParams.get('moduleId');

  const mod01Stats = getScholarshipAuditStats();
  const multiModuleSummary = getMultiModuleAuditSummary();

  // Combine with Module 01
  const completeSummary = {
    'mod-01': {
      moduleId: 'mod-01',
      moduleName: 'Module 01 – Scholarship & Fellowship Hub',
      totalLinks: mod01Stats.totalScholarships,
      verifiedCount: mod01Stats.verifiedDestinations,
      redirectedCount: mod01Stats.redirectedDestinations,
      manualReviewCount: mod01Stats.manualVerificationRequired,
      brokenCount: 0,
      lastAuditDate: mod01Stats.lastCompleteAuditDate,
    },
    ...multiModuleSummary,
  };

  let records = MULTI_MODULE_AUDIT_REGISTRY;
  if (moduleId) {
    records = records.filter((r) => r.moduleId === moduleId);
  }

  return NextResponse.json({
    platform: 'Student RSO 2.0',
    auditType: 'Full 10-Module Official URL & Government Source Integrity Audit',
    auditTimestamp: new Date().toISOString(),
    totalModulesCovered: 10,
    summary: completeSummary,
    records,
  });
}
