'use client';

import React from 'react';
import {
  X,
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Bookmark,
  Share2
} from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';

interface OpportunityDetailModalProps {
  opportunity: OpportunityListing | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (opportunity: OpportunityListing) => void;
  isSaved?: boolean;
}

export function OpportunityDetailModal({
  opportunity,
  isOpen,
  onClose,
  onSave,
  isSaved = false,
}: OpportunityDetailModalProps) {
  if (!isOpen || !opportunity) return null;

  const isClosed = opportunity.isClosed || new Date(opportunity.applicationClosingDate) < new Date();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#fdfbf6] rounded-2xl border border-[#efe3cc] shadow-2xl overflow-hidden font-sans my-auto"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between p-5 sm:p-6 bg-[#fbf5e9] border-b border-[#efe3cc]">
          <div className="space-y-1 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-[#8c2f39] text-white">
                {opportunity.organisationType.toUpperCase()}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold border ${
                  opportunity.verificationStatus === 'Official Source Verified'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : opportunity.verificationStatus === 'Employer Source Verified'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {opportunity.verificationStatus}
              </span>
              {isClosed ? (
                <span className="px-2 py-0.5 rounded-full font-mono text-[11px] font-bold bg-stone-200 text-stone-800">
                  APPLICATION CLOSED
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full font-mono text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118] pt-1 leading-snug">
              {opportunity.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7a6a5a] font-medium">
              <Building size={15} className="text-[#8c2f39]" />
              <span>{opportunity.organisation}</span>
              <span>•</span>
              <MapPin size={15} className="text-[#8c2f39]" />
              <span>{opportunity.location}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#efe3cc] transition cursor-pointer"
            title="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-[#2b2118]">
          {/* Key Parameters Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc] space-y-1">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                <Clock size={13} className="text-[#8c2f39]" /> Work Mode
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#2b2118]">{opportunity.workMode}</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc] space-y-1">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                <Clock size={13} className="text-[#8c2f39]" /> Duration
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#2b2118]">{opportunity.duration}</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc] space-y-1">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                <DollarSign size={13} className="text-[#8c2f39]" /> Compensation
              </span>
              <p className="text-xs sm:text-sm font-bold text-emerald-800">
                {opportunity.isPaid ? 'Paid Opportunity' : 'Unpaid Training'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc] space-y-1">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                <Calendar size={13} className="text-[#8c2f39]" /> Deadline
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#8c2f39]">
                {opportunity.applicationClosingDate}
              </p>
            </div>
          </div>

          {/* Disclosed Stipend/Salary */}
          <div className="p-3.5 rounded-xl bg-[#fbf5e9] border border-[#d8c7ad] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7a6a5a]">Stipend / Disclosed Compensation:</span>
            <span className="text-sm font-bold text-[#2b2118] font-mono">{opportunity.stipendOrSalary}</span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#8c2f39]">About this Opportunity</h3>
            <p className="text-xs sm:text-sm text-[#2b2118] leading-relaxed">{opportunity.description}</p>
          </div>

          {/* Eligibility & Qualifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#8c2f39]">Eligible Qualifications</h4>
              <ul className="space-y-1 text-xs text-[#2b2118]">
                {opportunity.qualification.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#e0a526] font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#8c2f39]">Eligible Degrees & Courses</h4>
              <ul className="space-y-1 text-xs text-[#2b2118]">
                {opportunity.eligibleCourses.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#e0a526] font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Skills */}
          {opportunity.requiredSkills && opportunity.requiredSkills.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-[#8c2f39]">Skills & Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.requiredSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg bg-white border border-[#efe3cc] text-xs font-semibold text-[#2b2118]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents Checklist */}
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2.5">
            <h3 className="font-serif text-base font-bold text-[#8c2f39] flex items-center gap-1.5">
              <FileText size={16} /> Required Documents Checklist
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {opportunity.requiredDocuments.map((doc, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2 text-[#2b2118]">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Selection Procedure */}
          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#8c2f39]">Selection Procedure</h3>
            <p className="text-xs sm:text-sm text-[#7a6a5a] bg-white p-3.5 rounded-xl border border-[#efe3cc] leading-relaxed">
              {opportunity.selectionProcedure}
            </p>
          </div>

          {/* Step-by-Step How to Apply */}
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2.5">
            <h3 className="font-serif text-base font-bold text-[#8c2f39]">Step-by-Step Application Guide</h3>
            <ol className="space-y-2 text-xs sm:text-sm text-[#2b2118]">
              {opportunity.applicationInstructions.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* After Completion & Outcome */}
          <div className="p-3.5 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              Outcome & Career Impact
            </span>
            <p className="text-xs sm:text-sm text-[#2b2118] leading-relaxed">{opportunity.whatHappensAfter}</p>
          </div>

          {/* Anti-Fraud Notice */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Fee Protection Warning:</strong> Student RSO strictly verifies that this opportunity does not require any payment. If anyone requests application charges or guaranteed placement deposits, do not pay and report to <strong>1930</strong>.
            </span>
          </div>

          {/* Official Verification Metadata */}
          <div className="pt-2 text-[11px] text-[#7a6a5a] flex flex-wrap items-center justify-between border-t border-[#efe3cc]">
            <span className="text-emerald-800 font-medium">Status: {opportunity.verificationStatus}</span>
            <span>Last Verified: {opportunity.lastVerifiedDate}</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 p-4 sm:p-5 bg-[#fbf5e9] border-t border-[#efe3cc]">
          <button
            type="button"
            onClick={() => onSave?.(opportunity)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-sans text-xs sm:text-sm font-semibold transition cursor-pointer ${
              isSaved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-[#2b2118] border-[#efe3cc] hover:bg-[#f6ede0]'
            }`}
          >
            <Bookmark size={16} className={isSaved ? 'fill-emerald-700 text-emerald-700' : ''} />
            <span>{isSaved ? 'Saved to Tracker' : 'Save Opportunity'}</span>
          </button>

          <a
            href={opportunity.officialApplicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold text-white shadow-xs transition cursor-pointer ${
              isClosed
                ? 'bg-stone-500 hover:bg-stone-600'
                : 'bg-[#8c2f39] hover:bg-[#6d1824]'
            }`}
          >
            <span>{isClosed ? 'View Official Source (Closed)' : 'Apply on Official Website'}</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
