'use client';

import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Clock,
  IndianRupee,
  AlertTriangle,
  FileText,
  FileCheck,
  CheckCircle2,
  Building,
  Info,
  Calendar,
} from 'lucide-react';
import { DocumentItem } from '@/lib/certificates-data';

interface CertificateDetailModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (action: 'apply' | 'verify' | 'readiness' | 'checklist', doc: DocumentItem) => void;
}

function safeHostname(url?: string): string {
  if (!url) return 'Official Portal';
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function CertificateDetailModal({
  document,
  isOpen,
  onClose,
  onSelectAction,
}: CertificateDetailModalProps) {
  if (!isOpen || !document) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2b2118]/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Category, Validity & Verification Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
            {document.category}
          </span>
          {document.code && (
            <span className="font-mono text-[11px] text-[#7a6a5a]">
              CODE: {document.code}
            </span>
          )}
          <span className="rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-700">
            {document.validityClassification}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 ml-auto mr-8">
            <ShieldCheck size={14} />
            Verified {document.lastVerified}
          </span>
        </div>

        {/* Certificate Title */}
        <h2 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight text-[#2b2118] pr-8">
          {document.title}
        </h2>

        {/* Issuing Authority & Governing Department */}
        <p className="mt-1 font-sans text-[14px] text-[#7a6a5a]">
          <strong className="text-[#2b2118] font-medium">{document.issuingAuthority}</strong>
          {document.governingDepartment && document.governingDepartment !== document.issuingAuthority && ` · ${document.governingDepartment}`}
        </p>

        {/* Metadata Banner Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 font-sans text-[13px] text-[#554a3f]">
          <div className="flex items-center gap-1.5 font-semibold text-[#2b2118]">
            <Clock size={15} className="text-[#8c2f39]" />
            Turnaround: {document.turnaroundTime}
          </div>
          <div>
            Official Fee:{' '}
            <span className="font-semibold text-emerald-800">{document.feeInfo}</span>
          </div>
          <div>
            Validity:{' '}
            <span className="font-medium text-[#2b2118]">{document.validityClassification}</span>
          </div>
          {document.isDigiLockerAvailable && (
            <div className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck size={14} />
              DigiLocker Supported
            </div>
          )}
        </div>

        {/* Overview & Purpose */}
        <div className="mt-5 space-y-3 font-sans text-[14px] leading-[24px] text-[#554a3f]">
          <p>{document.purpose}</p>
        </div>

        {/* Statutory Validity Intelligence & Fees Box (Module 01 Highlight Box Style) */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <div className="flex items-center gap-2 font-serif text-[16px] font-bold text-emerald-950">
            <ShieldCheck size={18} className="text-emerald-700" />
            Statutory Validity Intelligence &amp; Official Fees
          </div>
          <p className="mt-2 font-sans text-[14px] text-emerald-900 leading-relaxed font-semibold">
            {document.validityRule}
          </p>
          <p className="mt-1 font-sans text-[13px] text-emerald-800 leading-normal">
            {document.renewalOrFreshIssueGuidance}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 pt-3 border-t border-emerald-200/70 text-[12px] font-mono text-emerald-900">
            <span>Official Application Fee: <strong>{document.feeInfo}</strong></span>
            <span>•</span>
            <span>Issuing Turnaround: <strong>{document.turnaroundTime}</strong></span>
            {document.isDigiLockerAvailable && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                  <ShieldCheck size={12} /> DigiLocker Parity (Rule 9A, IT Rules 2016)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Eligibility & Target Applicants Grid */}
        <div className="mt-6 rounded-xl border border-[#efe3cc] bg-white p-5 space-y-4">
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#8c2f39]" />
            Eligibility &amp; Target Applicants
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 text-[13px]">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Who May Apply
              </span>
              <div className="flex flex-wrap gap-1">
                {document.whoMayApply.map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[11px] text-[#2b2118]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Relevant Education Stages
              </span>
              <div className="flex flex-wrap gap-1">
                {document.relevantEducationStages.map((stage) => (
                  <span
                    key={stage}
                    className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[11px] text-[#2b2118]"
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Eligibility Summary
              </span>
              <p className="font-medium text-[#2b2118] text-[13px] leading-relaxed">
                {document.eligibilitySummary}
              </p>
            </div>

            {document.commonPurposes && document.commonPurposes.length > 0 && (
              <div className="sm:col-span-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                  Common Academic &amp; Official Purposes
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {document.commonPurposes.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] text-[#8c2f39] font-sans text-[12px] font-medium border border-[#d8c7ad]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[18px] font-bold text-[#2b2118] flex items-center gap-2">
              <FileText size={18} className="text-[#8c2f39]" />
              Mandatory Enclosures &amp; Supporting Documents
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {document.supportingDocuments.map((doc: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1.5 font-sans text-[12px] text-[#2b2118]"
              >
                <FileCheck size={14} className="text-[#8c2f39]" />
                {doc}
              </span>
            ))}
          </div>

          {document.familyDocuments && document.familyDocuments.length > 0 && (
            <div className="mt-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1.5">
                Family &amp; Conditional Documents
              </span>
              <div className="flex flex-wrap gap-2">
                {document.familyDocuments.map((fDoc: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-sans text-[12px] text-[#554a3f]"
                  >
                    <FileText size={14} className="text-[#7a6a5a]" />
                    {fDoc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step-by-Step Official Application Procedure */}
        {document.applicationProcedure && document.applicationProcedure.length > 0 && (
          <div className="mt-6 rounded-xl border border-[#efe3cc] bg-white p-5 space-y-3">
            <h3 className="font-serif text-[18px] font-bold text-[#2b2118] flex items-center gap-2">
              <Building size={18} className="text-[#8c2f39]" />
              Official Step-by-Step Procedure
            </h3>
            <ol className="space-y-2.5 font-sans text-[13px] text-[#554a3f]">
              {document.applicationProcedure.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Lost / Duplicate Procedure Callout */}
        {document.duplicateProcedure && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4 font-sans text-[13px] text-blue-950">
            <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-1">
              <AlertTriangle size={15} />
              Lost / Damaged Certificate or Correction Guidelines:
            </div>
            <p className="text-blue-900 leading-relaxed">{document.duplicateProcedure}</p>
            {document.correctionProcedure && (
              <p className="text-blue-900/90 mt-1.5 pt-1.5 border-t border-blue-200/60 text-[12px]">
                <strong>Correction Procedure:</strong> {document.correctionProcedure}
              </p>
            )}
          </div>
        )}

        {/* Official Source Verification Notice */}
        <div className="mt-6 rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-4 text-[12px] text-[#7a6a5a] leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-[#2b2118] mb-1">
            <ShieldCheck size={16} className="text-emerald-700" />
            Official Source Verification &amp; Gazette Parity
          </div>
          <p>
            Verified on <strong className="text-[#2b2118]">{document.lastVerified}</strong> directly against official department portal:{' '}
            <a
              href={document.applicationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8c2f39] underline font-medium"
            >
              {safeHostname(document.applicationPortalUrl)}
            </a>
            . Verification Status: <strong className="text-emerald-800">{document.verificationStatus}</strong>.
            {document.isDigiLockerAvailable && ' Recognized on DigiLocker under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016.'}
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="mt-6 pt-4 border-t border-[#efe3cc] flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <a
              href={document.applicationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#8c2f39] px-4 py-2.5 font-sans text-[14px] font-semibold text-white transition hover:bg-[#6d1824] shadow-xs cursor-pointer"
            >
              <span>Apply on {document.applicationPortalName || 'Official Website'}</span>
              <ExternalLink size={15} />
            </a>

            {document.verificationPortalUrl && (
              <a
                href={document.verificationPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#d8c7ad] bg-white px-4 py-2.5 font-sans text-[14px] font-semibold text-[#2b2118] transition hover:bg-[#f6ede0] cursor-pointer"
              >
                <ShieldCheck size={15} className="text-[#8c2f39]" />
                <span>Verify Certificate</span>
                <ExternalLink size={15} />
              </a>
            )}

            {document.downloadPortalUrl && document.downloadPortalUrl !== document.applicationPortalUrl && (
              <a
                href={document.downloadPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#d8c7ad] bg-white px-4 py-2.5 font-sans text-[14px] font-semibold text-[#2b2118] transition hover:bg-[#f6ede0] cursor-pointer"
              >
                <span>Download Portal</span>
                <ExternalLink size={15} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSelectAction) {
                  onSelectAction('checklist', document);
                } else if (typeof window !== 'undefined') {
                  window.location.href = '/certificates?tab=checklist';
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#8c2f39] transition hover:bg-[#f6ede0] cursor-pointer"
            >
              <FileText size={16} />
              Checklist
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSelectAction) {
                  onSelectAction('readiness', document);
                } else if (typeof window !== 'undefined') {
                  window.location.href = '/certificates?tab=readiness';
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#8c2f39] bg-[#8c2f39]/10 px-3.5 py-2.5 font-sans text-[13px] font-bold text-[#8c2f39] transition hover:bg-[#8c2f39] hover:text-white cursor-pointer"
            >
              <CheckCircle2 size={16} />
              Check Readiness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
