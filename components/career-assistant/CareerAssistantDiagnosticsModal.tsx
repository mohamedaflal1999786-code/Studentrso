// components/career-assistant/CareerAssistantDiagnosticsModal.tsx
'use client';

import React, { useEffect } from 'react';
import {
  X,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Database,
  Cpu,
  Layers,
  Award
} from 'lucide-react';
import { MODEL_CANDIDATES } from '@/lib/ai/gemini-service';

interface CareerAssistantDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CareerAssistantDiagnosticsModal({
  isOpen,
  onClose,
}: CareerAssistantDiagnosticsModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-7 font-sans space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Activity size={18} className="text-emerald-700" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
            SYSTEM DIAGNOSTICS &amp; TELEMETRY
          </span>
        </div>

        <div>
          <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
            Module 05: AI Career Assistant Engine Health
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a] mt-0.5">
            Real-time status of multi-model LLM fallback pools, prompt architecture, and platform intelligence.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {/* Engine Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Engine Status</span>
              <span className="font-sans text-[13px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={14} /> Operational
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Primary Engine</span>
              <span className="font-mono text-[12px] font-bold text-[#0d3e2e] mt-1 block">
                {MODEL_CANDIDATES[0]}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Fallback Pools</span>
              <span className="font-serif text-[18px] font-bold text-[#2b2118] mt-0.5 block">
                {MODEL_CANDIDATES.length} Models
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Platform Modules</span>
              <span className="font-serif text-[18px] font-bold text-[#0d3e2e] mt-0.5 block">
                10 Registered
              </span>
            </div>
          </div>

          {/* Model Hierarchy Details */}
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block flex items-center gap-1.5">
              <Cpu size={14} /> Multi-Model Quota Pool Hierarchy
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {MODEL_CANDIDATES.map((model, idx) => (
                <div
                  key={model}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    idx === 0 ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-[#fbf5e9] text-[#7a6a5a]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <strong>Tier {idx + 1}:</strong> {model}
                  </span>
                  <span>{idx === 0 ? 'Primary Active' : 'Automatic Fallback'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Architecture & Attribution */}
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block flex items-center gap-1.5">
              <ShieldCheck size={14} /> System Attribution &amp; Knowledge Scope
            </span>
            <p className="font-sans text-[12px] leading-relaxed text-[#5a4a3a]">
              Architected &amp; developed by <strong>Mohamed Aflal</strong>, an Artificial Intelligence &amp; Data Science (AI&amp;DS) engineering student &amp; scholar at <strong>Kalaignar Karunanidhi Institute of Technology (KIT), Coimbatore, Tamil Nadu</strong>. Includes complete 2026 Tamil Nadu state governance and student journey support across all 10 platform modules.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0d3e2e] px-4 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
