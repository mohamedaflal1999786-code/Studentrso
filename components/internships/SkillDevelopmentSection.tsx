'use client';

import React, { useState } from 'react';
import { Award, ExternalLink, CheckCircle2, Clock, BookOpen, ShieldCheck } from 'lucide-react';
import { VERIFIED_SKILL_PROGRAMS, SkillProgram } from '@/lib/internship-data';

export function SkillDevelopmentSection() {
  const [selectedInitiative, setSelectedInitiative] = useState<string>('all');

  const filtered = VERIFIED_SKILL_PROGRAMS.filter((p) => {
    if (selectedInitiative === 'all') return true;
    return p.initiative === selectedInitiative;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Award size={14} /> FREE GOVERNMENT TECHNICAL CERTIFICATIONS
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Skill Development Centre
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Government-subsidized and 100% free technical certification programs from Naan Mudhalvan, TNSDC, and Skill India Digital.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            100% Free / Government Subsidised
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#efe3cc]">
          {[
            { id: 'all', label: 'All Programmes' },
            { id: 'Naan Mudhalvan', label: 'Naan Mudhalvan (Tamil Nadu)' },
            { id: 'Skill India Digital', label: 'Skill India Digital (National)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedInitiative(item.id)}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedInitiative === item.id
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((program) => (
          <article
            key={program.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-[#0d3e2e]/20 bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
                  {program.initiative}
                </span>
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                  {program.feeStatus}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[18px] font-bold leading-snug text-[#2b2118]">
                  {program.name}
                </h3>
                <p className="mt-1 font-sans text-[12px] font-medium text-[#7a6a5a]">
                  Provided by: {program.trainingProvider}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-2.5">
                  <span className="text-[#7a6a5a] block text-[11px]">Duration &amp; Mode</span>
                  <span className="font-semibold text-[#2b2118]">{program.duration} ({program.mode})</span>
                </div>
                <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-2.5">
                  <span className="text-[#7a6a5a] block text-[11px]">Target Audience</span>
                  <span className="font-semibold text-[#2b2118] truncate block">{program.targetQualification}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-xs font-bold text-[#0d3e2e]">Key Curriculum Modules:</span>
                <ul className="space-y-1 text-xs text-[#2b2118]">
                  {program.curriculumHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2.5 text-xs text-emerald-900">
                <strong>Certification:</strong> {program.certificationOffered}
              </div>
            </div>

            <div className="mt-4 border-t border-[#efe3cc] pt-3">
              <a
                href={program.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0d3e2e] px-3 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#08261c] shadow-xs cursor-pointer"
              >
                <span>Enroll on Official Portal ({program.initiative})</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
