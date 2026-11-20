// components/admissions/AdmissionDocumentsSection.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { REQUIRED_DOCUMENTS_DIRECTORY, RequiredDocumentItem } from '@/lib/admissions-data';

export function AdmissionDocumentsSection() {
  const [filterStage, setFilterStage] = useState<string>('All');

  const stages = ['All', 'Class 10', 'Class 12', 'Diploma / Polytechnic', 'Undergraduate', 'Postgraduate'];

  const filteredDocs =
    filterStage === 'All'
      ? REQUIRED_DOCUMENTS_DIRECTORY
      : REQUIRED_DOCUMENTS_DIRECTORY.filter(
          (d) => d.applicableStages.includes('All Stages') || d.applicableStages.includes(filterStage as any)
        );

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Module 03 Inter-link Banner */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            Admission Documents Guidance &amp; Verification Rules
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Understand mandatory documents, issuing authorities, format requirements (e-Sanad / DigiLocker), and replacement procedures.
          </p>
        </div>

        {/* Link to Module 03 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#fdfbf6] via-[#fbf5e9] to-[#efe3cc]/50 border border-[#efe3cc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d3e2e] text-white flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5 text-[#e0a526]" />
            </div>
            <div>
              <strong className="text-[#2b2118] font-bold text-sm block">
                Need to apply for or download official certificates?
              </strong>
              <p className="text-xs text-[#7a6a5a]">
                Visit <strong>Module 03 – Certificate &amp; Document Service</strong> for e-District, e-Sevai, and DigiLocker application guides for Community, Income, Nativity, and First Graduate certificates.
              </p>
            </div>
          </div>
          <Link
            href="/certificates"
            className="px-4 py-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span>Open Certificate Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {stages.map((stg) => (
            <button
              key={stg}
              type="button"
              onClick={() => setFilterStage(stg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                filterStage === stg
                  ? 'bg-[#0d3e2e] text-white shadow-xs'
                  : 'bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-base font-bold text-[#0d3e2e] leading-snug">
                  {doc.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#7a6a5a] shrink-0">
                  {doc.formatRequired}
                </span>
              </div>

              <div className="text-xs text-[#7a6a5a]">
                <strong className="text-[#2b2118]">Purpose: </strong>
                <span>{doc.purpose}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5 text-xs">
                <div>
                  <span className="font-bold text-[#2b2118]">Issuing Authority: </span>
                  <span className="text-[#0d3e2e] font-medium">{doc.issuingAuthority}</span>
                </div>
                <div>
                  <span className="font-bold text-[#2b2118]">Applicable Stages: </span>
                  <span className="text-[#7a6a5a]">{doc.applicableStages.join(', ')}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> What to do if missing or lost:
                </span>
                <p className="leading-relaxed">{doc.replacementProcedureIfMissing}</p>
              </div>
            </div>

            {/* Inter-link to Module 03 if available */}
            {doc.relatedModule03Link && (
              <div className="pt-2 border-t border-[#efe3cc] flex justify-end">
                <Link
                  href={doc.relatedModule03Link}
                  className="text-xs font-bold text-[#0d3e2e] hover:underline flex items-center gap-1"
                >
                  <span>Apply on Module 03</span> &rarr;
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
