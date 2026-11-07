'use client';

import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Lock,
  AlertTriangle,
  CreditCard,
  FileText,
  UserCheck,
  Globe,
} from 'lucide-react';
import { IDENTITY_DOCUMENTS, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface IdentityDocumentsSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function IdentityDocumentsSection({
  onOpenDocModal,
}: IdentityDocumentsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <ShieldCheck size={14} /> NATIONAL PROOF OF IDENTITY &amp; CITIZENSHIP
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              National Identity Documents
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Official statutory guidance for essential national identity documents required for college admissions, scholarship disbursement, examinations, and internships.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            UIDAI &amp; Official Statutory Bodies
          </span>
        </div>
      </div>

      {/* Aadhaar Privacy & Fraud Protection Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fbf5e9] p-5 sm:p-6 flex items-start gap-4 text-[#2b2118]">
        <Lock size={22} className="text-[#8c2f39] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed space-y-1.5">
          <strong className="font-serif text-[15px] font-bold text-[#2b2118] block">
            Aadhaar Lifetime Validity &amp; Zero-Data-Collection Principle
          </strong>
          <p>
            • <strong>No Annual Expiry:</strong> Aadhaar has permanent lifetime validity and never expires annually. Mandatory biometric updates occur only at ages 5 and 15 (free at official Aadhaar Seva Kendras).
          </p>
          <p>
            • <strong>Privacy Guarantee:</strong> Student RSO strictly never collects or stores your 12-digit Aadhaar number, OTPs, or biometric records. For general identity proofs, always use <strong>Masked Aadhaar</strong> (where only the last 4 digits are visible) downloaded from <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#8c2f39] underline font-semibold">myaadhaar.uidai.gov.in</a>.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {IDENTITY_DOCUMENTS.map((doc) => (
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
