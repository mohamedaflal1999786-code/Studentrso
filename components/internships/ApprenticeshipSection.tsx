'use client';

import React from 'react';
import {
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  DollarSign,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface ApprenticeshipSectionProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function ApprenticeshipSection({
  opportunities,
  onSelectOpportunity,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: ApprenticeshipSectionProps) {
  const apprenticeships = opportunities.filter((o) => o.category === 'apprenticeship');

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <GraduationCap size={14} /> APPRENTICES ACT 1961 STATUTORY TRAINING
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              National Apprenticeship Centre
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Statutory 1-year training contracts connecting engineering graduates, polytechnic diploma holders, and ITI technicians with PSUs and leading industries.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Direct DBT Government Stipends
          </span>
        </div>

        {/* NATS vs NAPS Quick Comparison Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#efe3cc]">
          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8c2f39]">NATS 2.0 (Higher Education)</span>
              <a
                href="https://nats.education.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8c2f39] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>nats.education.gov.in</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-[#2b2118] leading-relaxed">
              For <strong>B.E./B.Tech graduates</strong> and <strong>Polytechnic Diploma holders</strong>. Government of India sets statutory minimum monthly stipends (INR 9,000 for Degree, INR 8,000 for Diploma) paid directly via DBT.
            </p>
          </div>

          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8c2f39]">NAPS (Trade &amp; Vocational)</span>
              <a
                href="https://www.apprenticeshipindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8c2f39] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>apprenticeshipindia.gov.in</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-[#2b2118] leading-relaxed">
              For <strong>ITI certificate holders</strong>, Class 10/12 school leavers, and non-engineering general streams. Regulated under MSDE with National Apprenticeship Certificates (NAC).
            </p>
          </div>
        </div>
      </div>

      {/* Apprenticeship Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apprenticeships.map((item) => (
          <OpportunityCard
            key={item.id}
            item={item}
            isBookmarked={savedIds.has(item.id)}
            onToggleBookmark={onSaveOpportunity}
            onViewDetails={onSelectOpportunity}
            onApplyOfficial={onApplyOfficial}
          />
        ))}
      </div>
    </div>
  );
}
