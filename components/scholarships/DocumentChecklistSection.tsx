'use client';

import { useState } from 'react';
import {
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  Filter,
  HeartHandshake,
  Info,
  Lock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { MASTER_DOCUMENT_CHECKLIST, ScholarshipProgram } from '@/lib/scholarships-data';

interface DocumentChecklistSectionProps {
  programs: any[];
  checklistState: Record<string, boolean>;
  onToggleDocument: (docName: string) => void;
  onResetChecklist: () => void;
  selectedProgramFilter?: any | null;
}

export function DocumentChecklistSection({
  programs,
  checklistState,
  onToggleDocument,
  onResetChecklist,
  selectedProgramFilter = null,
}: DocumentChecklistSectionProps) {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(
    selectedProgramFilter ? selectedProgramFilter.id : 'ALL'
  );

  const activeProgram = programs.find((p) => p.id === selectedSchemeId);

  // List of documents to display
  const documentsToDisplay = activeProgram
    ? (activeProgram.documents || []).map((docName: string) => {
        const found = MASTER_DOCUMENT_CHECKLIST.find((m: any) => m.name.toLowerCase().includes(docName.toLowerCase()) || docName.toLowerCase().includes(m.name.toLowerCase()));
        return {
          id: docName,
          name: docName,
          authority: found ? found.authority : 'Designated Authority / Institution',
          description: found ? found.description : 'Official verification copy required by the scheme rules.',
        };
      })
    : MASTER_DOCUMENT_CHECKLIST;

  const totalCount = documentsToDisplay.length;
  const readyCount = documentsToDisplay.filter((d: any) => Boolean(checklistState[d.name])).length;
  const percentComplete = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Privacy and Document Safety Strip */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-950 flex items-start gap-3">
        <ShieldCheck size={22} className="shrink-0 text-emerald-700 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block text-emerald-900">
            Document Safety & Privacy First
          </strong>
          This checklist helps you track document preparation offline and in your account.
          Never share banking passwords, OTPs, Aadhaar OTPs, or government portal passwords with anyone.
          Only upload official documents directly on verified government domains (.gov.in / .nic.in) or verified foundation portals.
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Checklist Column */}
        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
                Document Readiness Checklist
              </h2>
              <p className="font-sans text-[13px] text-[#7a6a5a]">
                Mark certificates and documents as ready before starting your application.
              </p>
            </div>

            <button
              onClick={onResetChecklist}
              className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-[#7a6a5a] hover:text-[#8c2f39]"
            >
              <RotateCcw size={14} />
              Reset All
            </button>
          </div>

          {/* Scheme Filter Dropdown */}
          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5 flex items-center gap-1.5">
              <Filter size={13} /> Filter Checklist By Specific Scheme:
            </label>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full rounded-lg border border-[#d8c7ad] bg-white px-3 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            >
              <option value="ALL">Master Document Checklist (All Common Documents)</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[11px] font-bold uppercase text-[#7a6a5a]">
              <span>Readiness Progress</span>
              <span>
                {readyCount} of {totalCount} Marked Ready ({percentComplete}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#f6ede0] overflow-hidden">
              <div
                className="h-full bg-[#8c2f39] transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Document Items List */}
          <div className="space-y-2.5 pt-2">
            {documentsToDisplay.map((doc: any) => {
              const isChecked = Boolean(checklistState[doc.name]);

              return (
                <label
                  key={doc.name}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    isChecked
                      ? 'border-emerald-200 bg-white/70 shadow-2xs'
                      : 'border-[#efe3cc] bg-white hover:border-[#d8c7ad]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleDocument(doc.name)}
                    className="mt-1 h-4 w-4 accent-[#8c2f39] rounded"
                  />
                  <div className="flex-1 space-y-0.5">
                    <span
                      className={`font-sans text-[14px] font-semibold block ${
                        isChecked ? 'text-emerald-950 line-through' : 'text-[#2b2118]'
                      }`}
                    >
                      {doc.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#7a6a5a] block">
                      Issuing Authority: {doc.authority}
                    </span>
                    <p className="font-sans text-[12px] text-[#7a6a5a] pt-0.5">
                      {doc.description}
                    </p>
                  </div>
                  {isChecked && (
                    <span className="rounded-full bg-emerald-100 p-1 text-emerald-800 shrink-0">
                      <Check size={14} />
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Guidelines Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-serif text-[18px] font-bold text-[#2b2118]">
              <HeartHandshake size={20} className="text-[#8c2f39]" />
              Submission Essentials
            </div>

            <ul className="space-y-3 font-sans text-[13px] leading-[22px] text-[#554a3f]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8c2f39] mt-2 shrink-0" />
                <span>
                  <strong>Aadhaar Seeding on NPCI:</strong> For Central and State DBT scholarships, your bank
                  account must be mapped with Aadhaar on the NPCI mapper. Having an Aadhaar-linked account is not
                  always the same as NPCI mapper seeding.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8c2f39] mt-2 shrink-0" />
                <span>
                  <strong>Income Certificate Validity:</strong> In Tamil Nadu, revenue income certificates are generally
                  valid for 1 year from the date of issue. Ensure your certificate is current and digitally signed.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8c2f39] mt-2 shrink-0" />
                <span>
                  <strong>Bonafide Certificate:</strong> Always request a bonafide with your current year of study,
                  fee particulars, and roll number on the institution’s official letterhead.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8c2f39] mt-2 shrink-0" />
                <span>
                  <strong>EMIS School Verification:</strong> For Pudhumai Penn and Tamil Pudhalvan, your school
                  study from Class 6 to 12 in a Tamil Nadu Government school is electronically verified via the EMIS portal.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
