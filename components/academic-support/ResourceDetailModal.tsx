// components/academic-support/ResourceDetailModal.tsx
'use client';

import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap,
  BookOpen,
  Globe,
  Tag,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { VerifiedLearningResource } from '@/lib/academic-data';

interface ResourceDetailModalProps {
  resource: VerifiedLearningResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceDetailModal({
  resource,
  isOpen,
  onClose,
}: ResourceDetailModalProps) {
  if (!isOpen || !resource) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-[#efe3cc] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#efe3cc] bg-[#fdfbf6] flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                {resource.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                OFFICIAL SOURCE
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#2b2118] leading-snug">
              {resource.title}
            </h2>
            <p className="text-xs text-[#7a6a5a] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#8c2f39]" />
              <span>{resource.organisation}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#efe3cc]/50 transition cursor-pointer shrink-0"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-[#2b2118]">
          <div className="space-y-2">
            <h3 className="font-bold text-[#8c2f39] uppercase text-xs tracking-wider">
              About This Learning Resource
            </h3>
            <p className="text-[#2b2118] leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-[#8c2f39] uppercase text-xs tracking-wider">
              Key Academic Features &amp; Offerings
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {resource.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] space-y-1">
              <span className="text-[11px] font-bold text-[#7a6a5a] uppercase">Applicable Stages</span>
              <p className="text-xs font-semibold text-[#2b2118]">
                {resource.applicableStages.join(', ')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] space-y-1">
              <span className="text-[11px] font-bold text-[#7a6a5a] uppercase">Cost Status</span>
              <p className="text-xs font-semibold text-emerald-700">
                {resource.cost}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] space-y-1">
              <span className="text-[11px] font-bold text-[#7a6a5a] uppercase">Medium of Instruction</span>
              <p className="text-xs font-semibold text-[#2b2118]">
                {resource.languages.join(', ')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] space-y-1">
              <span className="text-[11px] font-bold text-[#7a6a5a] uppercase">Authority Tier</span>
              <p className="text-xs font-semibold text-[#8c2f39]">
                {resource.governingBody}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#7a6a5a] pt-2 border-t border-[#efe3cc]/60">
            <span>Last Source Verification: {resource.lastVerified}</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticity Confirmed
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#efe3cc] bg-[#fdfbf6] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#efe3cc] text-xs font-bold text-[#7a6a5a] hover:bg-[#efe3cc]/30 transition cursor-pointer"
          >
            Close
          </button>

          <a
            href={resource.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition text-xs font-bold shadow-xs"
          >
            <span>Visit Official Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
