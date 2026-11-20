'use client';

import React from 'react';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building,
  Award,
  BookOpen,
} from 'lucide-react';
import { POSTGRADUATE_DOCUMENTS, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface PostgraduateDocumentsSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function PostgraduateDocumentsSection({
  onOpenDocModal,
}: PostgraduateDocumentsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Sparkles size={14} /> HIGHER RESEARCH &amp; POSTGRADUATE STUDIES
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Postgraduate &amp; Research Documents
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Dedicated guidance for Master’s students, Ph.D scholars, Junior Research Fellows (JRF), and Postdoctoral candidates in Tamil Nadu universities and national research institutes.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            UGC, CSIR &amp; University Research
          </span>
        </div>
      </div>

      {/* Research Guidance Note */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fbf5e9] p-4 flex items-start gap-3 text-[#2b2118]">
        <BookOpen size={18} className="text-[#0d3e2e] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
          <strong className="text-[#2b2118] font-bold block mb-0.5">Research Fellowship Continuity:</strong>
          Junior Research Fellowship (JRF) award letters carry a statutory validity of <strong>3 years</strong> from the date of issuance to register for a Ph.D program. Once registered, tenure upgrade to Senior Research Fellowship (SRF) requires a university Doctoral Committee assessment report.
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {POSTGRADUATE_DOCUMENTS.map((doc) => (
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
