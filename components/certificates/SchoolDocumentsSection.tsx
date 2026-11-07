'use client';

import React from 'react';
import {
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import { SCHOOL_DOCUMENTS, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface SchoolDocumentsSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function SchoolDocumentsSection({
  onOpenDocModal,
}: SchoolDocumentsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <GraduationCap size={14} /> DIRECTORATE OF GOVERNMENT EXAMINATIONS (DGE TN)
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              School Education Documents (Class 10 to 12)
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Official credentials for secondary and higher secondary school students in Tamil Nadu: SSLC, HSC (+1 &amp; +2), Transfer Certificate (TC), and EMIS student profiles.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            State Board &amp; DGE Verification
          </span>
        </div>
      </div>

      {/* DGE / DigiLocker Information Note */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fbf5e9] p-4 flex items-start gap-3 text-[#2b2118]">
        <ShieldCheck size={18} className="text-[#8c2f39] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
          <strong className="text-[#2b2118] font-bold block mb-0.5">Digital Marksheet Availability:</strong>
          Tamil Nadu State Board Class 10 (SSLC) and Class 12 (HSC) marksheets from 2016 onwards are available on <strong>DigiLocker</strong>. Under Rule 9A of the IT Rules 2016, DigiLocker digital marksheets are legally equivalent to the original paper marksheet for college counseling and admissions.
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCHOOL_DOCUMENTS.map((doc) => (
          <CertificateCard
            key={doc.id}
            document={doc}
            onOpenDocModal={onOpenDocModal}
          />
        ))}
      </div>
    </div>
  );
}
