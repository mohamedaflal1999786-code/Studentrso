'use client';

import React from 'react';
import {
  ExternalLink,
  ShieldCheck,
  PhoneCall,
  GraduationCap,
  Building2,
  FileText,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import {
  OFFICIAL_CYBER_RESOURCES,
  OfficialCyberResource,
} from '@/lib/digital-safety-data';

export function CyberResourcesDirectorySection() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe3cc] pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <ShieldCheck size={13} /> OFFICIAL DIRECTORY
            </div>
            <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1.5">
              Verified Government Portals &amp; Statutory Resources ({OFFICIAL_CYBER_RESOURCES.length})
            </h2>
            <p className="font-sans text-[13.5px] text-[#7a6a5a]">
              Direct access to verified Government of India portals, emergency reporting channels, and national cyber defense centres.
            </p>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_CYBER_RESOURCES.map((resource) => {
            const isHelpline = resource.isEmergencyHelpline;

            return (
              <article
                key={resource.id}
                className="flex flex-col justify-between rounded-xl border border-[#efe3cc] bg-white p-5 transition hover:border-[#0d3e2e]/50 hover:shadow-sm"
              >
                <div>
                  {/* Badge & Authority */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                        isHelpline
                          ? 'bg-rose-100 border border-rose-300 text-rose-800'
                          : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#0d3e2e]'
                      }`}
                    >
                      {resource.badge}
                    </span>

                    <span className="font-mono text-[10.5px] text-[#7a6a5a]">
                      Verified Govt Portal
                    </span>
                  </div>

                  <h3 className="font-serif text-[17px] font-bold text-[#2b2118] leading-snug">
                    {resource.name}
                  </h3>

                  <div className="mt-1 font-mono text-[11px] text-[#0d3e2e] font-medium">
                    {resource.authority}
                  </div>

                  <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-[#554a3f]">
                    {resource.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-5 pt-3 border-t border-[#efe3cc]">
                  {isHelpline ? (
                    <a
                      href={resource.portalUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-700 px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-rose-800 transition shadow-xs"
                    >
                      <PhoneCall size={14} />
                      <span>Call {resource.contactNumber || '1930'}</span>
                    </a>
                  ) : (
                    <a
                      href={resource.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] transition shadow-xs"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
