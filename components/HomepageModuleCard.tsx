'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceData } from '@/lib/data';

export interface HomepageModuleCardProps {
  module: ServiceData;
  onModuleClick?: (module: ServiceData) => void;
}

/**
 * Reusable Homepage Module Card Component
 * Enforces the unified single-button design specification across all Student RSO modules:
 * 1. Module number
 * 2. Module title
 * 3. Short description
 * 4. Official verification/source information (if applicable)
 * 5. LIVE status badge (if applicable)
 * 6. Exactly ONE full-width primary action button: "Open Module →"
 */
export function HomepageModuleCard({ module, onModuleClick }: HomepageModuleCardProps) {
  const hasDedicatedRoute = Boolean(module.route && module.route.startsWith('/'));

  const buttonClasses =
    'w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] px-4 font-sans text-[13px] sm:text-[14px] font-bold text-white shadow-xs transition-colors cursor-pointer text-center';

  return (
    <div className="group bg-[#fdfbf6] rounded-2xl p-6 border border-[#efe3cc] shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left h-full">
      <div className="flex-1 flex flex-col">
        {/* Top Bar: Icon, Number & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">{module.icon}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block">
                MODULE {module.number}
              </span>
              <span className="font-sans text-[11px] font-semibold text-[#7a6a5a]">
                {module.category}
              </span>
            </div>
          </div>
          {module.isFullyImplemented ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] font-bold text-emerald-800">
              LIVE
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-semibold text-[#7a6a5a]">
              OFFICIAL
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif text-[22px] sm:text-[24px] leading-[28px] sm:leading-[32px] font-bold text-[#8c2f39] mb-1 transition-colors">
          {module.title}
        </h3>
        {module.subtitle && (
          <p className="font-serif text-[15px] italic text-[#8c2f39]/90 mb-2.5">
            {module.subtitle}
          </p>
        )}

        {/* Golden accent divider */}
        <div className="w-12 h-0.5 bg-[#cfa052] rounded-full mb-3" />

        {/* Short Description */}
        <p className="font-sans text-[14px] text-[#7a6a5a] leading-[22px] mb-4 flex-1">
          {module.description}
        </p>

        {/* Official Source Badge (if applicable) */}
        {module.officialSource && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] font-mono text-[11px] mb-4 self-start">
            <span className="material-symbols-outlined text-[15px] text-[#5e8b7e]">verified</span>
            <span className="text-[#2b2118] font-medium truncate max-w-[240px]">
              {module.officialSource}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Bar — Exactly ONE full-width primary button: Open Module → */}
      <div className="pt-4 border-t border-[#efe3cc] mt-auto">
        {hasDedicatedRoute ? (
          <Link href={module.route!} className={buttonClasses}>
            <span>Open Module →</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onModuleClick?.(module)}
            className={buttonClasses}
          >
            <span>Open Module →</span>
          </button>
        )}
      </div>
    </div>
  );
}
