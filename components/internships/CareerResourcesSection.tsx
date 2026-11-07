'use client';

import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  FileText,
  Lock,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ANTI_FRAUD_GUIDELINES } from '@/lib/internship-data';

export function CareerResourcesSection() {
  const helplines = [
    { title: 'National Cyber Crime Helpline', number: '1930', desc: 'Report fake job deposit scams & financial fraud' },
    { title: 'Naan Mudhalvan Toll-Free', number: '1800-425-6226', desc: 'Tamil Nadu Government Skilling & Placements' },
    { title: 'NATS BOAT Southern Region', number: '044-22542234', desc: 'Apprenticeship contracts & stipend support (Chennai)' },
    { title: 'TNPSC Candidate Helpdesk', number: '1800-419-0958', desc: 'State public service examinations support' },
    { title: 'TN Employment Exchange HQ', number: '044-22500135', desc: 'Velaivaaippu registration & seniority records' },
    { title: 'National Career Service', number: '1800-425-1514', desc: 'Ministry of Labour & Employment toll-free' },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <ShieldAlert size={14} /> FRAUD PREVENTION &amp; VERIFIED HELPLINES
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Career Resources &amp; Student Safety Safeguards
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Essential anti-fraud guidelines, official verification protocols, and verified helpline contacts across Tamil Nadu and Central departments.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#8c2f39] bg-[#fbf5e9] border border-[#efe3cc] px-3 py-1 rounded-full">
            100% Zero Fee Verification Standard
          </span>
        </div>
      </div>

      {/* Anti-Fraud Protections Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-[22px] font-bold text-[#2b2118] flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-600" />
            <span>Student Anti-Fraud Protection Rules</span>
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Strict indicators to detect and report predatory fake employment agents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ANTI_FRAUD_GUIDELINES.map((guide) => (
            <article
              key={guide.ruleNumber}
              className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] space-y-3 transition hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                  {guide.ruleNumber}
                </span>
                <h4 className="font-serif text-[17px] font-bold text-[#2b2118]">
                  {guide.title}
                </h4>
              </div>

              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                {guide.description}
              </p>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 font-medium">
                <strong>Action Advice:</strong> {guide.actionAdvice}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Official Helplines Directory */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-[20px] font-bold text-[#2b2118] flex items-center gap-2">
            <PhoneCall size={20} className="text-[#8c2f39]" />
            <span>Official Employment &amp; Grievance Helplines</span>
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Direct institutional telephone lines for employment reporting, scam complaints, and statutory guidance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 border-t border-[#efe3cc]">
          {helplines.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                {item.title}
              </span>
              <p className="font-mono text-base font-bold text-[#8c2f39]">{item.number}</p>
              <p className="text-xs text-[#2b2118] leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume & Preparation Toolkit */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-[20px] font-bold text-[#2b2118] flex items-center gap-2">
            <FileText size={20} className="text-[#8c2f39]" />
            <span>Fresher Preparation &amp; Documentation Checklist</span>
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Essential documentation required before attending verified campus recruitment drives and government internships
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#2b2118] pt-2 border-t border-[#efe3cc]">
          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#8c2f39]">1. Bonafide &amp; College NOC</h4>
            <p className="text-[#7a6a5a] leading-relaxed">
              Required for all active students applying to AICTE, ISRO, DRDO and corporate internships. Must contain student roll number, college seal, and semester approval.
            </p>
          </div>

          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#8c2f39]">2. 1-Page ATS Fresher Resume</h4>
            <p className="text-[#7a6a5a] leading-relaxed">
              Include academic aggregate, programming or laboratory skills, key projects with live GitHub links, and co-curricular achievements. Avoid generic objective statements.
            </p>
          </div>

          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#8c2f39]">3. Aadhaar-Seeded Bank Account</h4>
            <p className="text-[#7a6a5a] leading-relaxed">
              Essential for receiving government Direct Benefit Transfer (DBT) stipends under NATS and NAPS apprenticeships. Ensure your bank account is active and mapped with NPCI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
