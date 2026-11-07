'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, Info, Lock } from 'lucide-react';
import { TRUSTED_OFFICIAL_RESOURCES, OfficialResource } from '@/lib/skill-lab-data';

export function TrustedResourcesSection() {
  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-7 shadow-[0_4px_20px_rgba(43,33,24,0.05)]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#efe3cc]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
              AUTHENTIC PUBLIC INVENTORIES
            </span>
            <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
              6 VERIFIED SOURCES
            </span>
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
            Trusted &amp; Official Learning Resources
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Direct authorized access to state and central government portals. No third-party commercial paywalls, no commission proxies.
          </p>
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="my-5 p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] flex items-start gap-3 text-[13px] font-sans text-[#554a3f]">
        <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#2b2118]">
            Official Government &amp; Institutional Verification Guarantee:
          </p>
          <p className="text-[#7a6a5a] text-[12px] leading-relaxed">
            All resources listed below route exclusively to authorized government domains (<code className="font-mono text-[11px] text-[#8c2f39]">.gov.in</code>, <code className="font-mono text-[11px] text-[#8c2f39]">.education.gov.in</code>). Student RSO does not collect Aadhaar OTPs, banking passwords, or personal credentials.
          </p>
        </div>
      </div>

      {/* 6 Official Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRUSTED_OFFICIAL_RESOURCES.map((res) => (
          <article
            key={res.id}
            className="rounded-xl border border-[#efe3cc] bg-white p-5 flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39]">
                  {res.badge}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 size={11} /> {res.isFree ? 'FREE ACCESS' : 'VERIFIED'}
                </span>
              </div>

              <span className="font-mono text-[11px] text-[#7a6a5a] block mb-1">
                {res.organization}
              </span>
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118] leading-snug">
                {res.title}
              </h3>
              <p className="mt-2 font-sans text-[12px] text-[#7a6a5a] leading-relaxed">
                {res.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#efe3cc]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#2b2118] block mb-1.5">
                  WHAT STUDENTS LEARN:
                </span>
                <ul className="space-y-1 font-sans text-[12px] text-[#554a3f]">
                  {res.topicsCovered.map((topic, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#e0a526] font-bold shrink-0">•</span>
                      <span className="line-clamp-1">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#efe3cc] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#7a6a5a]">
                <span>{res.pricingNote}</span>
                {res.registrationRequired && (
                  <span className="text-amber-800 font-semibold flex items-center gap-0.5">
                    <Lock size={10} /> Free Reg Required
                  </span>
                )}
              </div>

              <a
                href={res.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Open Official Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
