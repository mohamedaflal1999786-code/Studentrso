'use client';

import React from 'react';
import {
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Building,
  FileCheck,
  Award,
} from 'lucide-react';
import { COLLEGE_DOCUMENTS, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface CollegeDocumentsSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function CollegeDocumentsSection({
  onOpenDocModal,
}: CollegeDocumentsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <GraduationCap size={14} /> UNIVERSITY &amp; AFFILIATED COLLEGES
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Undergraduate College Documents
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Core degree credentials, provisional certificates, consolidated marksheets, and official transcripts issued by Anna University, University of Madras, Bharathiar, Madurai Kamaraj, and autonomous institutions.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            State &amp; Central Universities
          </span>
        </div>
      </div>

      {/* Provisional vs Original Degree Clarification */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fbf5e9] p-4 flex items-start gap-3 text-[#2b2118]">
        <Award size={18} className="text-[#8c2f39] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
          <strong className="text-[#2b2118] font-bold block mb-0.5">Provisional vs Convocation Degree:</strong>
          A <strong>Provisional Degree Certificate</strong> is issued immediately upon publication of final semester results and remains valid until the official university convocation ceremony awards the <strong>Original Degree Certificate</strong>. For all recruitment drives, competitive exams, and PG counseling, the Provisional Certificate is legally accepted.
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COLLEGE_DOCUMENTS.map((doc) => (
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
