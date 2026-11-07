// components/admissions/TransferAndReentryCentre.tsx
'use client';

import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Building,
  GraduationCap,
  Calendar,
  FileCheck2,
  HelpCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import {
  TRANSFER_REGULATIONS,
  REENTRY_PROTOCOLS,
  TransferRegulation,
  ReEntryProtocol
} from '@/lib/admissions-data';

export function TransferAndReentryCentre() {
  const [activeSubTab, setActiveSubTab] = useState<'transfer' | 'branch-change' | 're-entry' | 'dropout-recovery'>('transfer');

  return (
    <div className="space-y-6 font-sans">
      {/* Title & Sub-Navigation */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            Inter-College Transfer, Branch Change &amp; Re-entry Centre
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Statutory mobility regulations, branch sliding rules, study break condonation, and dropout prevention guidance.
          </p>
        </div>

        {/* Sub-Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'transfer', label: 'Inter-College Transfer Norms' },
            { id: 'branch-change', label: 'Course & Branch Transfer' },
            { id: 're-entry', label: 'Break of Study & Re-entry' },
            { id: 'dropout-recovery', label: 'Dropout Prevention & Recovery' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-[#8c2f39] text-white shadow-xs'
                  : 'bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. INTER-COLLEGE TRANSFERS */}
      {activeSubTab === 'transfer' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-900 font-bold block">Statutory Non-Guarantee Disclaimer:</strong>
              <p>
                Inter-college transfer is NOT an automatic right. Transfers depend strictly on mutual institutional consent,
                documented vacant seats within sanctioned intake, syllabus compatibility, and formal orders issued by
                university authorities (Anna University / DCE / DOTE).
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {TRANSFER_REGULATIONS.map((reg) => (
              <div key={reg.id} className="p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#8c2f39]">
                      {reg.scope}
                    </span>
                    <span className="text-xs font-medium text-[#7a6a5a]">{reg.governingNorm}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2b2118]">{reg.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#7a6a5a]">
                    <Building className="w-3.5 h-3.5 text-[#8c2f39]" />
                    <span>{reg.authority}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block">
                      ELIGIBILITY CONDITIONS
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside text-[#2b2118]">
                      {reg.eligibilityConditions.map((ec, i) => (
                        <li key={i}>{ec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block">
                      MANDATORY PREREQUISITES
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside text-[#2b2118]">
                      {reg.mandatoryPrerequisites.map((mp, i) => (
                        <li key={i}>{mp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] block">
                    STEP-BY-STEP TRANSFER PROCESS
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {reg.procedureSteps.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] text-[#2b2118]">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] space-y-1.5 text-xs">
                  <span className="font-bold text-[#2b2118] block">Mandatory Documentation &amp; NOCs:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {reg.requiredNocAndCertificates.map((cert, ci) => (
                      <span key={ci} className="px-2 py-0.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[#2b2118]">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. COURSE & BRANCH CHANGE */}
      {activeSubTab === 'branch-change' && (
        <div className="p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-5 text-xs sm:text-sm text-[#2b2118]">
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8c2f39]">
              Engineering Branch Sliding &amp; Academic Course Change Guidelines
            </h3>
            <p className="text-xs text-[#7a6a5a] leading-relaxed">
              Rules governing students wishing to change their engineering branch (e.g. Mechanical to CSE/ECE) or undergraduate course within the same institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block">
                WHEN IS BRANCH CHANGE PERMITTED?
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-[#2b2118]">
                <li>Strictly at the end of the 1st Year (commencement of 3rd Semester).</li>
                <li>Branch changes are NEVER permitted during the 1st semester or after the 3rd semester begins.</li>
                <li>The candidate must have cleared all 1st and 2nd semester examinations in the first attempt with zero arrears.</li>
                <li>Minimum CGPA requirement (ordinarily 8.0 or 8.5+ depending on college and branch popularity).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block">
                STATUTORY INTAKE CAPS &amp; SEAT LIMITS
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-[#2b2118]">
                <li>Branch change cannot exceed the AICTE sanctioned intake of the receiving department.</li>
                <li>The strength of the relieving branch must not fall below 75% of its original sanctioned intake.</li>
                <li>Students admitted under supernumerary quotas (e.g. 7.5% Govt School Quota, TFW) are ordinarily non-transferable.</li>
              </ul>
            </div>
          </div>

          {/* Procedure */}
          <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] space-y-2 text-xs">
            <h4 className="font-serif text-base font-bold text-[#2b2118]">Standard Branch Change Application Process:</h4>
            <ol className="space-y-1 list-decimal list-inside text-[#7a6a5a]">
              <li>College administration issues Branch Sliding Notification immediately following 2nd semester results.</li>
              <li>Eligible students submit preferences in writing to the Principal / Dean (Academic Courses).</li>
              <li>Institutional merit list compiled strictly in descending order of CGPA.</li>
              <li>Vacant seats re-allocated in a transparent open counselling session.</li>
              <li>College sends revised student enrollment list to Anna University / Directorate for permanent roll number update.</li>
            </ol>
          </div>
        </div>
      )}

      {/* 3. BREAK OF STUDY & RE-ENTRY */}
      {activeSubTab === 're-entry' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-emerald-900 font-bold block">Statutory Protection for Education Continuity:</strong>
              <p>
                Under UGC and Anna University statutes, students who temporarily discontinued studies for valid reasons
                have a formal legal right to resume education provided they apply within the maximum permissible duration ceiling (7 years for regular B.E., 5 years for B.A./B.Sc).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {REENTRY_PROTOCOLS.map((proto) => (
              <div key={proto.id} className="p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#8c2f39]">{proto.title}</h3>
                  <p className="text-xs text-[#7a6a5a]">{proto.situation}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                      MAXIMUM ALLOWABLE COURSE DURATION
                    </span>
                    <p className="font-bold text-[#2b2118]">{proto.maximumDurationRule}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                      CREDIT VALIDITY STATUS
                    </span>
                    <p className="font-bold text-emerald-800">{proto.creditValidity}</p>
                  </div>
                </div>

                {/* 8-Step Re-entry Protocol */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] block">
                    STEP-BY-STEP RE-ADMISSION PROTOCOL
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {proto.stepByStepProtocol.map((stp, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] text-[#2b2118]">
                        {stp}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] text-xs text-[#7a6a5a] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-[#2b2118]">Scholarship &amp; Fee Concession Continuity: </span>
                    <span>{proto.financialAndConcessionContinuity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DROPOUT PREVENTION & RECOVERY */}
      {activeSubTab === 'dropout-recovery' && (
        <div className="p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-6 text-xs sm:text-sm text-[#2b2118]">
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8c2f39]">
              Dropout Prevention &amp; Education Recovery Options
            </h3>
            <p className="text-xs text-[#7a6a5a]">
              Practical, compassionate options available to help you complete your education without compromising your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block">
                1. FINANCIAL DIFFICULTIES
              </span>
              <p className="text-[#2b2118] leading-relaxed">
                Apply for Tamil Nadu Government Post-Matric Scholarships, First Graduate Fee Concessions, or educational loans through the Central Government Vidya Lakshmi Portal (vidyalakshmi.co.in) which provides collateral-free interest subvention loans.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block">
                2. ACADEMIC ARREARS
              </span>
              <p className="text-[#2b2118] leading-relaxed">
                Under UGC guidelines, students have up to N+2 years to clear arrears while continuing employment. Attend remedial classes and specialized supplementary examinations conducted by state universities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block">
                3. DISTANCE / OPEN RE-ENTRY
              </span>
              <p className="text-[#2b2118] leading-relaxed">
                If regular college attendance is no longer feasible, transfer your passed credits directly into Tamil Nadu Open University (TNOU) or University of Madras IDE to earn a 100% recognized statutory degree.
              </p>
            </div>
          </div>

          {/* Tele-MANAS Hotline */}
          <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#8c2f39] shrink-0" />
              <div>
                <strong className="text-[#2b2118] font-bold block">Need confidential guidance or mental health support?</strong>
                <span className="text-[#7a6a5a]">Free National Tele-MANAS Helpline: <strong>14416</strong> (Available 24x7 in English and Tamil).</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
