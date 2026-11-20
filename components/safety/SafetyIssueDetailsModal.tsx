'use client';

import * as Dialog from '@radix-ui/react-dialog';
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  FileText,
  Info,
  PhoneCall,
  Scale,
  Shield,
  ShieldCheck,
  X,
} from 'lucide-react';
import { SafetyCategory } from '@/lib/safety-data';

interface SafetyIssueDetailsModalProps {
  category: SafetyCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChecklist?: () => void;
}

export function SafetyIssueDetailsModal({
  category,
  isOpen,
  onClose,
  onOpenChecklist,
}: SafetyIssueDetailsModalProps) {
  if (!category) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#2b2118]/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-3xl max-h-[92vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0">
          {/* Close button */}
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#f6ede0] hover:text-[#0d3e2e] focus:outline-none">
            <X size={20} />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          {/* Header Metadata */}
          <div className="space-y-3 pb-5 border-b border-[#efe3cc]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] bg-[#f6ede0] border border-[#d8c7ad] px-2.5 py-0.5 rounded-full">
                CATEGORY {category.number}
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-white border border-[#efe3cc] px-2.5 py-0.5 rounded-full">
                {category.badge}
              </span>
              <span className="font-mono text-[10px] text-[#5e8b7e] font-semibold flex items-center gap-1 bg-[#fbf5e9] px-2.5 py-0.5 rounded-full border border-[#efe3cc]">
                <ShieldCheck size={12} /> {category.verificationStatus}
              </span>
            </div>

            <Dialog.Title className="font-serif text-[24px] sm:text-[28px] font-bold text-[#2b2118] leading-tight">
              {category.title}
            </Dialog.Title>
            <p className="font-serif text-[16px] italic text-[#0d3e2e]">
              {category.subtitle}
            </p>
            <p className="font-sans text-[14px] text-[#7a6a5a] leading-relaxed">
              {category.shortDescription}
            </p>
          </div>

          <div className="space-y-6 pt-5">
            {/* 1. Examples of situations covered */}
            <div className="rounded-xl border border-[#efe3cc] bg-white p-5 space-y-3">
              <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center gap-2">
                <Info size={17} className="text-[#0d3e2e]" />
                Examples of Situations Covered Under This Category
              </h4>
              <ul className="space-y-2">
                {category.scopeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-sans text-[13px] text-[#554a3f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d3e2e] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Official Authorities & Complaint Portals */}
            <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-5 space-y-4">
              <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center gap-2">
                <Scale size={17} className="text-[#0d3e2e]" />
                Authorized Government Reporting Authorities &amp; Portals
              </h4>

              <div className="flex flex-wrap gap-2">
                {category.primaryAuthorities.map((auth, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg bg-white border border-[#efe3cc] text-[#2b2118]"
                  >
                    {auth}
                  </span>
                ))}
              </div>

              {/* Direct Portal Links */}
              <div className="space-y-2.5 pt-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] block">
                  Official Complaint Portals (No Third-Party Intermediaries):
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {category.officialPortals.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.complaintUrl || p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-[#d8c7ad] hover:border-[#0d3e2e] hover:bg-[#fdfbf6] transition group shadow-2xs"
                    >
                      <div className="min-w-0">
                        <span className="font-sans text-[13px] font-bold text-[#0d3e2e] block truncate group-hover:underline">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-emerald-800 font-medium">Official Government Portal</span>
                      </div>
                      <ExternalLink size={15} className="text-[#7a6a5a] group-hover:text-[#0d3e2e] shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Helplines */}
              {category.helplines.length > 0 && (
                <div className="pt-2 border-t border-[#efe3cc] space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] block">
                    Statutory Helplines for this Category:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.helplines.map((hl, idx) => (
                      <a
                        key={idx}
                        href={hl.telUrl}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#efe3cc] px-3 py-1.5 font-mono text-[12px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0] transition"
                      >
                        <PhoneCall size={13} />
                        <span>{hl.name}: {hl.number}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Step-by-Step Reporting Guidance */}
            <div className="rounded-xl border border-[#efe3cc] bg-white p-5 space-y-3">
              <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center gap-2">
                <FileCheck size={17} className="text-[#0d3e2e]" />
                Step-by-Step Official Reporting Guidance
              </h4>
              <div className="space-y-2.5">
                {category.stepByStepGuidance.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-[#fdfbf6] border border-[#efe3cc]">
                    <span className="font-mono text-[11px] font-bold text-[#e0a526] bg-[#fbf5e9] px-2 py-0.5 rounded border border-[#d8c7ad] shrink-0">
                      STEP {idx + 1}
                    </span>
                    <p className="font-sans text-[13px] text-[#554a3f] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Requested Information & Acknowledgement to Save */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#efe3cc] bg-white p-4 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block">
                  Commonly Requested Information:
                </span>
                <ul className="space-y-1.5">
                  {category.requestedInformation.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-sans text-[12px] text-[#7a6a5a]">
                      <span className="w-1 h-1 rounded-full bg-[#7a6a5a] mt-2 shrink-0" />
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#efe3cc] bg-white p-4 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block">
                  Official Acknowledgement to Save:
                </span>
                <p className="font-sans text-[12px] text-[#554a3f] leading-relaxed">
                  {category.acknowledgementToSave}
                </p>

                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block pt-2">
                  How to Follow Up:
                </span>
                <p className="font-sans text-[12px] text-[#554a3f] leading-relaxed">
                  {category.followUpProcess}
                </p>
              </div>
            </div>

            {/* 5. Alternative Escalation & Jurisdiction */}
            <div className="rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-4 space-y-2 text-[12px]">
              <div>
                <strong className="text-[#2b2118] font-bold font-mono uppercase text-[11px] block">
                  Alternative Statutory Escalation Route:
                </strong>
                <p className="font-sans text-[#7a6a5a] mt-0.5">{category.alternativeEscalation}</p>
              </div>
              <div className="pt-2 border-t border-[#d8c7ad]/60">
                <strong className="text-[#2b2118] font-bold font-mono uppercase text-[11px] block">
                  Jurisdiction &amp; Legal Scope Limitations:
                </strong>
                <p className="font-sans text-[#7a6a5a] mt-0.5">{category.jurisdictionLimitations}</p>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#efe3cc] font-mono text-[11px] text-[#7a6a5a]">
              <span>Last Source Verification: {category.lastVerified}</span>
              <span className="text-[#5e8b7e] font-semibold">{category.verificationStatus}</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
