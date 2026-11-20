'use client';

import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  CheckCircle2,
  FileText,
  Clock,
  HelpCircle,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { TN_VELAIVAAIPPU_GUIDE, TNEmploymentExchangeGuide } from '@/lib/internship-data';

export function EmploymentExchangeSection() {
  const [selectedCohort, setSelectedCohort] = useState<string>('class10');

  const cohortGuidance: Record<string, { title: string; advice: string; documents: string[] }> = {
    class10: {
      title: 'Class 10 (SSLC) Pass Outs',
      advice: 'Students should register immediately upon publication of SSLC board results. This establishes the earliest state seniority date for Group 4, VAO, Forest Guard, and clerical vacancies.',
      documents: ['SSLC Marksheet', 'Transfer Certificate (TC)', 'Community Certificate', 'Aadhaar Card'],
    },
    class12: {
      title: 'Class 12 (Higher Secondary) Pass Outs',
      advice: 'Log in using your existing SSLC registration number and add your HSC qualification within the statutory grace window to preserve your baseline seniority date.',
      documents: ['HSC Marksheet', 'TC from Higher Secondary School', 'Existing Employment ID Card'],
    },
    diploma: {
      title: 'Polytechnic & Diploma Holders',
      advice: 'Register your technical branch and DOTE diploma under the Technician category. Qualifies you for junior engineer, technician and state power utility opportunities.',
      documents: ['DOTE Diploma Certificate', 'All Semester Marksheets', 'NOC/Conduct Certificate'],
    },
    ug: {
      title: 'Undergraduate Degree Holders (B.A. / B.Sc / B.Com / B.E.)',
      advice: 'Add your provisional or convocation degree certificate along with consolidated marksheets. Specify if studied under Tamil Medium (PSTM) to claim statutory quota in government recruitments.',
      documents: ['Provisional / Degree Certificate', 'Consolidated Marksheet', 'PSTM Certificate (if Tamil medium)'],
    },
    pg: {
      title: 'Postgraduate & Professional Degree Holders (M.Sc / M.E. / MBA / Ph.D)',
      advice: 'Update specialized master degree qualifications and research credentials. Priority consideration for assistant professor, scientific officer and state research assistant lists.',
      documents: ['Postgraduate Degree Certificate', 'Research / Thesis Abstract', 'NET / SLET scorecard if qualified'],
    },
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Layers size={14} /> STATE SENIORITY REGISTRATION &amp; ASSISTANCE
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Tamil Nadu Employment Exchange (TN Velaivaaippu)
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Statutory guidance and online registration procedures under the Directorate of Employment and Training, Government of Tamil Nadu.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Official State Seniority Registration
          </span>
        </div>

        {/* Portal Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#efe3cc]">
          <a
            href="https://tnvelaivaaippu.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 hover:border-[#0d3e2e] transition group flex items-start justify-between"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">OFFICIAL STATE PORTAL</span>
              <h3 className="font-serif text-base font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">
                tnvelaivaaippu.gov.in
              </h3>
              <p className="text-xs text-[#7a6a5a]">
                New user registration, renewal every 3 years, qualification upgrades, and Unemployment Assistance.
              </p>
            </div>
            <ExternalLink size={16} className="text-[#0d3e2e] shrink-0 mt-1" />
          </a>

          <a
            href="https://www.ncs.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 hover:border-[#0d3e2e] transition group flex items-start justify-between"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">NATIONAL CAREER SERVICE</span>
              <h3 className="font-serif text-base font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">
                ncs.gov.in
              </h3>
              <p className="text-xs text-[#7a6a5a]">
                Ministry of Labour &amp; Employment national jobseeker card, verified employer directory and career fairs.
              </p>
            </div>
            <ExternalLink size={16} className="text-[#0d3e2e] shrink-0 mt-1" />
          </a>
        </div>
      </div>

      {/* Cohort-Wise Guidance Container */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
          Guidance by Qualification Cohort
        </h3>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'class10', label: 'Class 10 (SSLC)' },
            { id: 'class12', label: 'Class 12 (HSC)' },
            { id: 'diploma', label: 'Diploma / Polytechnic' },
            { id: 'ug', label: 'Undergraduate (UG)' },
            { id: 'pg', label: 'Postgraduate & PhD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCohort(tab.id)}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedCohort === tab.id
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-3">
          <h4 className="font-serif text-base font-bold text-[#0d3e2e]">
            {cohortGuidance[selectedCohort].title}
          </h4>
          <p className="text-xs sm:text-sm text-[#2b2118] leading-relaxed">
            {cohortGuidance[selectedCohort].advice}
          </p>

          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-[#7a6a5a] uppercase tracking-wider">
              Mandatory Documents for this Cohort:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {cohortGuidance[selectedCohort].documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[#2b2118]">
                  <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Registration & Maintenance Steps */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
            Step-by-Step TN Velaivaaippu Lifecycle Procedures
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Maintain continuous registration status, record fresh degrees, and protect employment seniority
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TN_VELAIVAAIPPU_GUIDE.map((step) => (
            <article
              key={step.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#0d3e2e] text-white font-bold font-mono text-xs flex items-center justify-center">
                    0{step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-[#7a6a5a]">Step {step.stepNumber} of 6</span>
                </div>

                <h4 className="font-serif text-[17px] font-bold text-[#2b2118]">
                  {step.title}
                </h4>

                <p className="text-xs text-[#7a6a5a] leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-1 text-xs text-[#2b2118] pt-1 border-t border-[#efe3cc]">
                  {step.details.slice(0, 3).map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-[#0d3e2e] font-bold">•</span>
                      <span className="line-clamp-2">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-[#efe3cc] pt-3">
                <a
                  href={step.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#0d3e2e] transition-colors hover:bg-[#f6ede0] cursor-pointer"
                >
                  <span>Open on TN Velaivaaippu</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
