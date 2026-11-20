'use client';

import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Bell,
  Info,
} from 'lucide-react';
import { CERTIFICATES_CATALOGUE, DocumentItem } from '@/lib/certificates-data';

export function ValidityRenewalAssistant() {
  const [selectedDocId, setSelectedDocId] = useState<string>('rev-103-income');
  const [reminderTarget, setReminderTarget] = useState<string>('scholarship_renewal');
  const [reminderSavedNotice, setReminderSavedNotice] = useState<boolean>(false);

  const selectedDoc = CERTIFICATES_CATALOGUE.find((d) => d.id === selectedDocId) || CERTIFICATES_CATALOGUE[2];

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setReminderSavedNotice(true);
    setTimeout(() => setReminderSavedNotice(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-[#0d3e2e]/10 border border-[#0d3e2e]/20 mb-1.5">
          <Clock size={12} /> PRECISE STATUTORY INTELLIGENCE
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Validity &amp; Renewal Assistant
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Eliminate misinformation regarding certificate expiration. We distinguish between permanent lifetime credentials and scheme-tied or financial-year-dependent certificates.
        </p>
      </div>

      {/* 4 Statutory Validity Classifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#efe3cc] bg-white p-4 shadow-2xs space-y-1.5">
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
            Permanent Lifetime
          </span>
          <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">Permanent Credentials</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Community (REV-101), Nativity (for bona fide state natives), SSLC, HSC, Degree, Aadhaar, Birth Certificate. Routine annual renewals are NOT required.
          </p>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-white p-4 shadow-2xs space-y-1.5">
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
            Scheme / Purpose Dependent
          </span>
          <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">Income Certificate (REV-103)</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Validity is governed by the receiving scheme (e.g., NSP / Post-Matric scholarships require certificates issued on or after April 1st of the current academic year).
          </p>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-white p-4 shadow-2xs space-y-1.5">
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 uppercase">
            Financial Year Bound
          </span>
          <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">Central OBC-NCL (REV-115)</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Valid exclusively for the specific financial year of issuance (April 1 to March 31) because non-creamy layer income eligibility fluctuates annually.
          </p>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-white p-4 shadow-2xs space-y-1.5">
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200 uppercase">
            Tenure &amp; Age Tied
          </span>
          <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">Temporary UDID &amp; JRF</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Temporary disability UDID (1 to 5 years until permanent re-assessment); JRF fellowship awards (3 years to register for Ph.D); Passport (10 years).
          </p>
        </div>
      </div>

      {/* Interactive Renewal Intelligence Inspector */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-5">
        <div>
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
            Interactive Validity Rule Inspector
          </h3>
          <p className="font-sans text-[12px] text-[#7a6a5a] mt-1">
            Select any government certificate to review official Tamil Nadu Government rules and renewal requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block font-sans text-[12px] font-semibold text-[#5c4a3a]">
              Select Certificate to Inspect
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full bg-white border border-[#efe3cc] rounded-xl px-3.5 py-2.5 font-sans text-[13px] text-[#2b2118] focus:outline-none focus:ring-1 focus:ring-[#0d3e2e] focus:border-[#0d3e2e]"
            >
              {CERTIFICATES_CATALOGUE.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title} {doc.code ? `(${doc.code})` : ''}
                </option>
              ))}
            </select>

            <div className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-2 text-[12px] font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[#7a6a5a]">Statutory Classification:</span>
                <span className="text-[#2b2118] font-semibold">
                  {selectedDoc.validityClassification}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7a6a5a]">Annual Renewal Required:</span>
                <span className={`font-semibold ${selectedDoc.validityClassification !== 'No routine expiry specified by source' ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {selectedDoc.validityClassification !== 'No routine expiry specified by source' ? 'Scheme / Periodic Dependent' : 'No (Permanent Lifetime)'}
                </span>
              </div>
              <div className="text-[#2b2118] pt-2 border-t border-[#efe3cc]">
                <strong>Specific Rule:</strong> {selectedDoc.validityRule}
              </div>
              <div className="text-[#5c4a3a] text-[11px] pt-1">
                <strong>Renewal Guidance:</strong> {selectedDoc.renewalOrFreshIssueGuidance}
              </div>
            </div>
          </div>

          {/* Reminder Generator */}
          <div className="rounded-xl border border-[#efe3cc] bg-white p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#0d3e2e] mb-1.5">
                <Bell size={16} />
                <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">
                  Smart Renewal / Fresh Procurement Reminder
                </h4>
              </div>
              <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed mb-4">
                Planning to apply for upcoming state counseling or scholarship renewals in July? Set a reminder to obtain your fresh certificate in advance before portal deadlines.
              </p>

              <form onSubmit={handleSetReminder} className="space-y-3">
                <div>
                  <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                    Upcoming Purpose
                  </label>
                  <select
                    value={reminderTarget}
                    onChange={(e) => setReminderTarget(e.target.value)}
                    className="w-full bg-[#fbf5e9] border border-[#efe3cc] rounded-lg px-3 py-2 font-sans text-[12px] text-[#2b2118]"
                  >
                    <option value="scholarship_renewal">Academic Year Scholarship (April - July)</option>
                    <option value="tnea_counseling">Engineering / Medical Counseling (May - June)</option>
                    <option value="upsc_obc_cycle">Central UPSC / SSC Exam (New Financial Year)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold transition shadow-2xs"
                >
                  Activate Renewal Reminder
                </button>
              </form>

              {reminderSavedNotice && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-sans text-[12px] flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  Reminder configured! Check off in My Document Checklist.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
