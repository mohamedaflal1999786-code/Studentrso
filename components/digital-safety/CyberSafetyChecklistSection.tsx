'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Filter,
  Shield,
  Layers,
} from 'lucide-react';
import {
  STUDENT_CYBER_CHECKLIST,
  ChecklistItem,
} from '@/lib/digital-safety-data';

export function CyberSafetyChecklistSection() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('studentrso_cyber_checklist');
        if (saved) {
          setCheckedIds(JSON.parse(saved));
        }
      } catch {
        // Fallback gracefully
      }
    }
  }, []);

  function handleToggle(id: string) {
    setCheckedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('studentrso_cyber_checklist', JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  }

  function handleSelectAll() {
    const allIds = STUDENT_CYBER_CHECKLIST.map((c) => c.id);
    setCheckedIds(allIds);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('studentrso_cyber_checklist', JSON.stringify(allIds));
      } catch {}
    }
  }

  function handleReset() {
    setCheckedIds([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('studentrso_cyber_checklist');
      } catch {}
    }
  }

  const categories = ['All', 'Accounts', 'Payments', 'Devices', 'Privacy', 'Emergency'];

  const filteredItems = STUDENT_CYBER_CHECKLIST.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const totalItems = STUDENT_CYBER_CHECKLIST.length;
  const completedCount = checkedIds.length;
  const completionPercentage = Math.round((completedCount / totalItems) * 100);

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe3cc] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            <Shield size={13} /> STUDENT ACTION CHECKLIST
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1.5">
            Student Cyber Safety Checklist
          </h2>
          <p className="font-sans text-[13.5px] text-[#7a6a5a]">
            10 mandatory digital hygiene habits every student should enable on their devices and accounts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-sans text-[12px] font-semibold text-[#0d3e2e] hover:bg-[#fbf5e9] transition cursor-pointer"
          >
            Mark All Done
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-[#efe3cc] bg-white p-2 text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#0d3e2e] transition cursor-pointer"
            title="Reset Checklist"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Live Meter */}
      <div className="mt-5 rounded-xl bg-white p-4 border border-[#efe3cc]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[12px] font-bold text-[#2b2118]">
              Protection Readiness:
            </span>
            <span className="font-mono text-[13px] font-bold text-[#0d3e2e]">
              {completedCount} of {totalItems} habits enabled
            </span>
          </div>
          <span className="font-mono text-[12px] font-bold text-[#e0a526]">
            {completionPercentage}% Protected
          </span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#efe3cc]">
          <div
            className="h-full bg-[#0d3e2e] transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-medium transition cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#0d3e2e] text-white shadow-xs'
                : 'bg-white border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="mt-5 space-y-2.5">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`flex items-start gap-3.5 rounded-xl border p-4 transition cursor-pointer select-none ${
                isChecked
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : 'border-[#efe3cc] bg-white hover:border-[#0d3e2e]/40 hover:bg-[#fdfbf6]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare size={19} className="text-emerald-700" />
                ) : (
                  <Square size={19} className="text-[#d8c7ad]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-sans text-[14px] font-bold ${
                      isChecked ? 'text-emerald-950 line-through' : 'text-[#2b2118]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-[#fbf5e9] border border-[#efe3cc] px-2 py-0.2 font-mono text-[9.5px] font-semibold text-[#7a6a5a]">
                    {item.category}
                  </span>
                </div>
                <p
                  className={`mt-1 font-sans text-[13px] leading-relaxed ${
                    isChecked ? 'text-emerald-800' : 'text-[#554a3f]'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
