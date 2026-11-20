'use client';

import React from 'react';
import {
  Layers,
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { DIPLOMA_DOCUMENTS, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface DiplomaDocumentsSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function DiplomaDocumentsSection({
  onOpenDocModal,
}: DiplomaDocumentsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Layers size={14} /> DIRECTORATE OF TECHNICAL EDUCATION (DOTE TN)
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Diploma &amp; Polytechnic Documents
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Official academic credentials for polytechnic diploma students and ITI trainees in Tamil Nadu. Essential for direct second-year lateral entry B.E/B.Tech admissions and technical employment.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            DOTE Board Verified
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DIPLOMA_DOCUMENTS.map((doc) => (
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
