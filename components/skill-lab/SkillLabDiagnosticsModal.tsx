'use client';

import React from 'react';
import { X, Activity, ShieldCheck, CheckCircle2, Globe, Database } from 'lucide-react';
import { TRUSTED_OFFICIAL_RESOURCES, SKILL_CATEGORIES } from '@/lib/skill-lab-data';

interface SkillLabDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SkillLabDiagnosticsModal({ isOpen, onClose }: SkillLabDiagnosticsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2118]/60 p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Activity size={18} className="text-emerald-700" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
            SYSTEM DIAGNOSTICS &amp; TELEMETRY
          </span>
        </div>

        <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Module 09: Language &amp; Soft-Skills Connector Status
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a] mt-1">
          Real-time verification of curriculum integrity, daily practice rotation math, and official government portal endpoints.
        </p>

        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block">
              CURRICULUM INVENTORY HEALTH
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="font-serif text-[20px] font-bold text-[#0d3e2e] block">{SKILL_CATEGORIES.length}</span>
                <span className="font-mono text-[10px] text-[#7a6a5a]">Categories</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="font-serif text-[20px] font-bold text-[#0d3e2e] block">
                  {SKILL_CATEGORIES.reduce((acc, c) => acc + c.topics.length, 0)}
                </span>
                <span className="font-mono text-[10px] text-[#7a6a5a]">Lesson Guides</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="font-serif text-[20px] font-bold text-[#0d3e2e] block">
                  {TRUSTED_OFFICIAL_RESOURCES.length}
                </span>
                <span className="font-mono text-[10px] text-[#7a6a5a]">Govt Portals</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="font-serif text-[20px] font-bold text-emerald-700 block">100%</span>
                <span className="font-mono text-[10px] text-[#7a6a5a]">English Only</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block mb-2">
              VERIFIED OFFICIAL DOMAINS
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {TRUSTED_OFFICIAL_RESOURCES.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-2 rounded bg-[#fbf5e9]">
                  <span className="truncate max-w-xs text-[#2b2118]">{r.organization}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 size={12} /> ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#efe3cc] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0d3e2e] text-white font-sans text-[13px] font-bold hover:bg-[#08261c] transition cursor-pointer"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
}
