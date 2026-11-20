'use client';

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

const REPORTING_STEPS = [
  {
    stepNumber: '01',
    title: 'Understand the Nature of the Concern',
    description:
      'Categorize the situation clearly: Does it concern ragging, sexual or gender harassment, caste discrimination, staff misconduct, examination irregularities, cybercrime, or child protection? Clear categorization determines the legal framework that applies.',
  },
  {
    stepNumber: '02',
    title: 'Identify Whether Immediate Emergency Support is Needed',
    description:
      'If you or anyone else is facing immediate physical danger, severe violence, or medical distress, dial 112 immediately. Emergency response always comes before writing complaint drafts or collecting non-urgent evidence.',
  },
  {
    stepNumber: '03',
    title: 'Identify the Relevant Institution or Government Authority',
    description:
      'Match your concern with the proper statutory jurisdiction: College Internal Committee (IC) for gender harassment, National Anti-Ragging Portal for ragging, Cyber Crime Portal for online fraud, or UGC e-Samadhaan for university governance.',
  },
  {
    stepNumber: '04',
    title: 'Read the Official Reporting Instructions',
    description:
      'Visit the original government portal or institutional circular. Note required petition formats, submission windows (e.g. 3 months for IC complaints), and whether identity can be kept confidential.',
  },
  {
    stepNumber: '05',
    title: 'Prepare the Factual Information Requested',
    description:
      'Draft a chronological, objective narrative stating exact dates, times, campus locations, words spoken, and names of individuals involved. Keep language factual and dignified.',
  },
  {
    stepNumber: '06',
    title: 'Use the Original Official Portal or Authorized Channel',
    description:
      'Submit directly via the government portal (antiragging.in, samadhaan.ugc.ac.in, cybercrime.gov.in) or by hand-delivered letter to the College Principal/IC with a stamped acknowledgment receipt.',
  },
  {
    stepNumber: '07',
    title: 'Save the Official Acknowledgement or Reference Number',
    description:
      'Immediately record your official docket number, ticket ID, or stamped copy. This reference is mandatory for follow-ups and serves as proof of timely submission under statutory limitation periods.',
  },
  {
    stepNumber: '08',
    title: 'Follow the Official Tracking or Follow-up Process',
    description:
      'Track status using the official portal query feature. Give the enquiry panel the statutory time window to complete their investigation (e.g. 24 hours for ragging preliminary reports, 90 days for IC inquiry).',
  },
  {
    stepNumber: '09',
    title: 'Identify the Appropriate Escalation Authority If Unresolved',
    description:
      'If the college fails to act, withholds findings, or protects perpetrators, escalate through official statutory oversight: University Ombudsperson, UGC e-Samadhaan, State Department of Collegiate Education, or Statutory Commissions.',
  },
];

export function ReportingStepsGuide() {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
          <FileCheck size={15} /> OFFICIAL PROTOCOL
        </div>
        <h3 className="font-serif text-[24px] font-bold text-[#2b2118]">
          Step-by-Step Student Reporting Guidance
        </h3>
        <p className="font-sans text-[14px] text-[#7a6a5a] max-w-3xl leading-relaxed">
          Follow this 9-step statutory guidance framework to prepare, register, and track an educational grievance or
          safety concern safely, effectively, and with full compliance under Indian higher education regulations.
        </p>
      </div>

      {/* 9 Steps Visual Timeline */}
      <div className="space-y-4">
        {REPORTING_STEPS.map((s, idx) => (
          <div
            key={s.stepNumber}
            className="rounded-2xl border border-[#efe3cc] bg-white p-5 sm:p-6 shadow-xs hover:border-[#0d3e2e]/30 transition flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[#0d3e2e] flex items-center justify-center shrink-0 font-mono text-[16px] font-bold">
              {s.stepNumber}
            </div>
            <div className="flex-1 space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase text-[#e0a526] tracking-wider block">
                PHASE {idx < 3 ? '1: INTAKE & SAFETY' : idx < 6 ? '2: PREPARATION & LODGING' : '3: TRACKING & ESCALATION'}
              </span>
              <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#2b2118]">
                {s.title}
              </h4>
              <p className="font-sans text-[13px] text-[#554a3f] leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Important Safety Principles & Legal Guardrails */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-3">
          <h4 className="font-serif text-[17px] font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-700" />
            Safety Best Practices
          </h4>
          <ul className="space-y-2 text-[13px] text-emerald-900/90 font-sans">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>Prioritize personal physical safety over paperwork at all times.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>Preserve unedited original screenshots, message logs, and official fee receipts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>Always request and securely store the official stamped acknowledgment or token ID.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>Confide in a trusted faculty member, parent, or registered student counsellor.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 space-y-3">
          <h4 className="font-serif text-[17px] font-bold text-amber-950 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-700" />
            Crucial Student Guardrails
          </h4>
          <ul className="space-y-2 text-[13px] text-amber-900/90 font-sans">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
              <span><strong>Do not confront an alleged offender</strong> directly in private or hostel rooms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
              <span><strong>Do not post unverified allegations on social media</strong>, which may compromise statutory enquiry.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
              <span>Never wait to collect "complete evidence" before calling 112 if you are in danger.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
              <span>Do not pay any fee or commercial agent for complaint registration; all government portals are free.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
