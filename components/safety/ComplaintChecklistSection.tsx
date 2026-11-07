'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, FileCheck, RefreshCw, Shield, Sparkles } from 'lucide-react';
import { COMPLAINT_CHECKLIST } from '@/lib/safety-data';

const STORAGE_KEY = 'student_rso_safety_checklist';

export function ComplaintChecklistSection() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCheckedIds(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const progressPercent = Math.round((checkedIds.length / COMPLAINT_CHECKLIST.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview & Progress Bar */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
              <FileCheck size={14} /> ACTIONABLE PREPARATION TOOL
            </div>
            <h3 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Complaint Preparation Checklist
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Ensure your complaint has all factual elements, legal identifiers, and safety safeguards before official submission.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetChecklist}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-sans text-[12px] font-semibold text-[#8c2f39] hover:bg-[#f6ede0] transition"
            >
              <RefreshCw size={13} />
              <span>Reset Checklist</span>
            </button>
          </div>
        </div>

        {/* Progress Strip */}
        <div className="space-y-1.5 pt-2 border-t border-[#efe3cc]">
          <div className="flex items-center justify-between text-[12px] font-mono font-bold">
            <span className="text-[#2b2118]">
              Readiness Progress: {checkedIds.length} of {COMPLAINT_CHECKLIST.length} completed
            </span>
            <span className="text-[#8c2f39]">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#efe3cc] overflow-hidden">
            <div
              className="h-full bg-[#8c2f39] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Advisory Notice */}
        <div className="rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-3 text-[12px] font-sans text-[#7a6a5a]">
          <strong className="text-[#2b2118] font-semibold">Privacy Safeguard: </strong>
          This checklist operates locally on your personal device. You are not required to submit personal incident details or narrative descriptions to Student RSO.
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {COMPLAINT_CHECKLIST.map((item) => {
          const isDone = checkedIds.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left rounded-2xl p-5 border transition-all flex items-start gap-4 cursor-pointer ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-[#efe3cc] hover:border-[#8c2f39]/30 shadow-xs'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 size={22} className="text-emerald-700" />
                ) : (
                  <Circle size={22} className="text-[#a08f7e]" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-serif text-[16px] sm:text-[17px] font-bold ${
                      isDone ? 'text-emerald-950 line-through opacity-85' : 'text-[#2b2118]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a]">
                    {item.category}
                  </span>
                </div>
                <p
                  className={`font-sans text-[13px] leading-relaxed ${
                    isDone ? 'text-emerald-900/80' : 'text-[#7a6a5a]'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
