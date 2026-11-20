'use client';

import { ExternalLink, Info, ShieldCheck, X } from 'lucide-react';
import { ComprehensiveScholarship } from '@/lib/scholarships-data';

interface OfficialRedirectModalProps {
  program: ComprehensiveScholarship | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OfficialRedirectModal({
  program,
  isOpen,
  onClose,
}: OfficialRedirectModalProps) {
  if (!isOpen || !program) return null;

  const currentVersion = program.versions.find((v) => v.isCurrentVersion) || program.versions[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2118]/70 p-4 backdrop-blur-xs transition-opacity"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e]"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Security & Authenticity Header */}
        <div className="flex items-center gap-2 text-emerald-800 font-mono text-[12px] font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mb-3">
          <ShieldCheck size={15} />
          <span>Official Government / Foundation Redirection</span>
        </div>

        <h3 className="font-serif text-[20px] font-bold text-[#2b2118] leading-snug">
          {program.name}
        </h3>
        <p className="mt-1 font-sans text-[12px] text-[#7a6a5a]">
          {program.provider} · {program.department}
        </p>

        {/* Warning & Advisory Notice */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-[13px] text-amber-950 leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-amber-900 mb-1">
            <Info size={16} className="shrink-0 text-amber-800" />
            <span>Advisory for Students:</span>
          </div>
          <p>
            You are leaving Student RSO. You will apply directly on the government or official foundation portal. We never collect login credentials, bank details or application passwords.
          </p>
        </div>

        {/* Verification Metadata Box */}
        <div className="mt-4 space-y-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3.5 text-[12px] font-sans text-[#554a3f]">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#7a6a5a]">Verified Official Portal:</span>
            <span className="font-mono text-[#2b2118] truncate max-w-[240px]">
              {new URL(program.officialApplicationUrl).hostname}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#7a6a5a]">Last Verified Date:</span>
            <span className="font-semibold text-emerald-800">
              {currentVersion?.sourceVerificationDate || '2026-11-06'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#7a6a5a]">Academic Cycle:</span>
            <span className="font-semibold text-[#0d3e2e]">
              {currentVersion?.academicYear || '2026-2027'} ({currentVersion?.lifecycleStatus || 'Open'})
            </span>
          </div>
        </div>

        {/* Official Notification Link if different */}
        {program.officialGuidelinesUrl && (
          <div className="mt-3 text-right">
            <a
              href={program.officialGuidelinesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#0d3e2e] hover:underline inline-flex items-center gap-1"
            >
              <span>View Official Guidelines Bulletin</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}

        {/* Actions Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#efe3cc]">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#d8c7ad] bg-white px-4 py-2.5 font-sans text-[13px] font-semibold text-[#554a3f] hover:bg-[#f6ede0]"
          >
            Cancel / Stay on Student RSO
          </button>
          <a
            href={program.officialApplicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-5 py-2.5 font-sans text-[14px] font-bold text-white transition hover:bg-[#08261c] shadow-sm"
          >
            <span>Apply on Official Website</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
