// components/academic-support/AccessibilitySupportSection.tsx
'use client';

import React from 'react';
import {
  Accessibility,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Building,
  GraduationCap,
  Eye,
  Ear,
  Brain
} from 'lucide-react';
import { ACCESSIBILITY_SUPPORT_RESOURCES } from '@/lib/academic-data';

export function AccessibilitySupportSection() {
  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-800 font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> RPWD ACT 2016 STATUTORY RIGHTS
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Special Learning Support, Inclusion &amp; Accessibility Directory
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          Statutory educational accommodations for students with visual, hearing, physical, or specific learning disabilities (Dyslexia, Dyscalculia). Official university disability cells, accessible software, and scribe guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACCESSIBILITY_SUPPORT_RESOURCES.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold">
                {item.category}
              </span>

              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] leading-tight">
                {item.title}
              </h3>

              <p className="text-[11px] text-[#7a6a5a] font-medium bg-[#fbf5e9] p-2.5 rounded-xl border border-[#efe3cc]">
                Statutory Basis: {item.statutoryNorm}
              </p>

              {/* Accommodations */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-[#0d3e2e] uppercase tracking-wider block">
                  Guaranteed Academic Accommodations
                </span>
                <ul className="space-y-1.5">
                  {item.accommodationsOffered.map((acc, aIdx) => (
                    <li key={aIdx} className="text-xs text-[#2b2118] flex items-start gap-1.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessible Tools */}
              <div className="space-y-1.5 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                  Accessible Software &amp; Repositories
                </span>
                <div className="space-y-1.5">
                  {item.accessibleSoftwareTools.map((tool, tIdx) => (
                    <a
                      key={tIdx}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e] transition flex items-center justify-between text-xs font-semibold text-[#2b2118]"
                    >
                      <span>{tool.name}</span>
                      <ExternalLink className="w-3 h-3 text-[#0d3e2e]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Helpline Footnote */}
            <div className="pt-3 border-t border-[#efe3cc] space-y-1 text-xs">
              <span className="text-[11px] font-bold text-[#0d3e2e] flex items-center gap-1">
                <Phone className="w-3 h-3" /> Official Government Support Cell:
              </span>
              <p className="text-[#2b2118] font-mono text-[11px]">{item.statutoryHelpline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
