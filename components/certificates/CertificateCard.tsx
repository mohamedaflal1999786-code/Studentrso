'use client';

import React from 'react';
import {
  Building,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { DocumentItem } from '@/lib/certificates-data';

interface CertificateCardProps {
  document: DocumentItem;
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function CertificateCard({
  document,
  onOpenDocModal,
}: CertificateCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-[#0d3e2e]/20 bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            {document.code || 'STATUTORY'}
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
            {document.feeInfo}
          </span>
          {document.isDigiLockerAvailable && (
            <span className="rounded-full border border-[#d8c7ad] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#554a3f] flex items-center gap-1">
              <ShieldCheck size={11} className="text-[#0d3e2e]" /> DigiLocker
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        onClick={() => onOpenDocModal(document)}
        className="mt-3 font-serif text-[18px] font-bold leading-snug text-[#2b2118] line-clamp-2 hover:text-[#0d3e2e] transition-colors cursor-pointer"
      >
        {document.title}
      </h3>
      <p className="mt-1 font-sans text-[12px] font-medium text-[#7a6a5a] line-clamp-1 flex items-center gap-1.5">
        <Building size={13} className="text-[#0d3e2e] shrink-0" />
        <span className="truncate">{document.issuingAuthority}</span>
        {document.governingDepartment && (
          <>
            <span className="text-[#efe3cc]">·</span>
            <span className="truncate">{document.governingDepartment}</span>
          </>
        )}
      </p>

      {/* Summary / Purpose */}
      <p className="mt-3 flex-1 font-sans text-[13px] leading-[22px] text-[#554a3f] line-clamp-3">
        {document.purpose}
      </p>

      {/* Metadata Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[10px] text-[#7a6a5a] flex items-center gap-1">
          <Clock size={11} className="text-[#0d3e2e]" /> {document.turnaroundTime}
        </span>
        <span
          className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-sans text-[11px] font-medium text-[#554a3f] truncate max-w-[200px]"
          title={document.validityRule}
        >
          {document.validityClassification}
        </span>
      </div>

      {/* Bottom Action Section */}
      <div className="mt-4 border-t border-[#efe3cc] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[#7a6a5a] mb-3">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-800">
            <ShieldCheck size={12} />
            {document.verificationStatus}
          </span>
          <span className="font-mono text-[10px] text-[#7a6a5a]">
            Verified {document.lastVerified}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenDocModal(document)}
            className="flex-1 rounded-lg bg-[#0d3e2e] px-3 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#08261c] shadow-xs cursor-pointer text-center"
          >
            View Details
          </button>
          {document.applicationPortalUrl && (
            <a
              href={document.applicationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3.5 py-2 font-sans text-[13px] font-semibold text-[#0d3e2e] transition-colors hover:bg-[#f6ede0] cursor-pointer"
            >
              <span>Apply</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
