'use client';

import { AppIcon } from '@/components/AppIcon';
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
    'w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] px-4 font-sans text-[13px] sm:text-[14px] font-bold text-white shadow-xs transition-colors cursor-pointer text-center';

  return (
    <div className="group bg-[#f8fbf9] rounded-2xl p-6 border border-[#d8e5dd] shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left h-full">
      <div className="flex-1 flex flex-col">
        {/* Top Bar: Icon, Number & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <AppIcon name={module.icon} className="text-[22px]" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c6d23] block">
                MODULE {module.number}
              </span>
              <span className="font-sans text-[11px] font-semibold text-[#57534e]">
                {module.category}
              </span>
            </div>
          </div>
          {module.isFullyImplemented ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] border border-[#c8e6c9] font-mono text-[10px] font-bold text-[#2e7d32]">
              LIVE
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-[#edf5f0] border border-[#d8e5dd] font-mono text-[10px] font-semibold text-[#57534e]">
              OFFICIAL
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif text-[22px] sm:text-[24px] leading-[28px] sm:leading-[32px] font-bold text-[#111814] group-hover:text-[#0d3e2e] mb-1 transition-colors">
          {module.title}
        </h3>
        {module.subtitle && (
          <p className="font-serif text-[14.5px] italic text-[#8c6d23] mb-2.5">
            {module.subtitle}
          </p>
        )}

        {/* Golden accent divider */}
        <div className="w-12 h-0.5 bg-[#c59b27] rounded-full mb-3" />

        {/* Short Description */}
        <p className="font-sans text-[14px] text-[#4a4a4a] leading-[22px] mb-4 flex-1">
          {module.description}
        </p>

        {/* Official Source Badge (if applicable) */}
        {module.officialSource && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#edf5f0] border border-[#d8e5dd] text-[#57534e] font-mono text-[11px] mb-4 self-start">
            <AppIcon name="verified" className="text-[15px] text-[#0d3e2e]" />
            <span className="text-[#111814] font-medium truncate max-w-[240px]">
              {module.officialSource}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Bar — Exactly ONE full-width primary button: Open Module → */}
      <div className="pt-4 border-t border-[#d8e5dd] mt-auto">
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
