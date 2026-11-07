import { NextRequest, NextResponse } from 'next/server';
import {
  CERTIFICATES_CATALOGUE,
  IDENTITY_DOCUMENTS,
  SCHOOL_DOCUMENTS,
  HIGHER_ED_DOCUMENTS,
  ALL_DOCUMENTS,
  OFFICIAL_SERVICE_DIRECTORY,
  CERTIFICATE_FAQS,
  EducationStage,
  DocumentCategory,
} from '@/lib/certificates-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const stage = searchParams.get('stage');
    const query = searchParams.get('q')?.toLowerCase();

    let documents = ALL_DOCUMENTS;

    if (category) {
      documents = documents.filter((doc) => doc.category === (category as DocumentCategory));
    }

    if (stage) {
      documents = documents.filter((doc) =>
        doc.relevantEducationStages.includes(stage as EducationStage)
      );
    }

    if (query) {
      documents = documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.purpose.toLowerCase().includes(query) ||
          (doc.code && doc.code.toLowerCase().includes(query)) ||
          doc.issuingAuthority.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      totalCount: documents.length,
      allTotalCount: ALL_DOCUMENTS.length,
      governmentCertificatesCount: CERTIFICATES_CATALOGUE.length,
      identityDocumentsCount: IDENTITY_DOCUMENTS.length,
      schoolDocumentsCount: SCHOOL_DOCUMENTS.length,
      higherEdDocumentsCount: HIGHER_ED_DOCUMENTS.length,
      directorySourcesCount: OFFICIAL_SERVICE_DIRECTORY.length,
      faqsCount: CERTIFICATE_FAQS.length,
      documents,
      officialDirectory: OFFICIAL_SERVICE_DIRECTORY,
      lastAuditTimestamp: '2026-11-06T20:00:00.000Z',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch certificate records';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
