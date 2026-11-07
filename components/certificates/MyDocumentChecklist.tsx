'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Printer,
  RotateCcw,
  Sparkles,
  Download,
} from 'lucide-react';
import { EducationStage } from '@/lib/certificates-data';

interface ChecklistItem {
  id: string;
  name: string;
  stage: string;
  isCollected: boolean;
  inDigiLocker: boolean;
  notes?: string;
}

const DEFAULT_TEMPLATES: Record<string, string[]> = {
  class_12: [
    'Aadhaar Card (Linked with Mobile)',
    'Class 10 (SSLC) Original Marksheet',
    'Class 11 (+1) Marksheet',
    'Class 12 (+2) Marksheet / Provisional',
    'Transfer Certificate (TC) & Conduct Certificate',
    'Community Certificate (e-Sevai REV-101)',
    'Nativity Certificate (REV-102)',
    'Income Certificate (REV-103)',
    'First Graduate Certificate (REV-104 - If applicable)',
    'Recent Passport Size Photographs (10 copies)',
  ],
  ug: [
    'Aadhaar Card',
    'Class 10 (SSLC) Marksheet',
    'Class 12 (HSC) Marksheet',
    'UG Degree Certificate / Provisional',
    'Semester Marksheets (Semesters 1 to 8)',
    'Consolidated Grade Sheet (CGS)',
    'College Transfer & Conduct Certificate',
    'Community Certificate',
    'Income Certificate (Current Year for Scholarship)',
    'PAN Card (for Internships/Stipend)',
  ],
  diploma: [
    'Aadhaar Card',
    'SSLC Marksheet',
    'Diploma Consolidated Marksheet',
    'Provisional Diploma Certificate',
    'DoTE Diploma Convocation Certificate',
    'Polytechnic Transfer & Conduct Certificate',
    'Community Certificate (REV-101)',
    'Nativity Certificate (for Lateral Entry Engg)',
  ],
  pg_phd: [
    'Aadhaar Card',
    'UG Degree & Consolidated Marksheets',
    'PG Degree & Provisional Certificate',
    'Ph.D Research Registration Order',
    'JRF / SRF Award Letter',
    'Coursework Completion Certificate',
    'PAN Card & Active Bank Account Details',
    'Community Certificate / Central OBC-NCL',
  ],
};

export function MyDocumentChecklist() {
  const [stageTemplate, setStageTemplate] = useState<string>('class_12');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [customDocName, setCustomDocName] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('student_rso_cert_checklist');
      if (saved) {
        setItems(JSON.parse(saved));
        return;
      }
    } catch {
      // ignore
    }
    loadTemplate('class_12');
  }, []);

  // Save to local storage whenever items change
  const saveItems = (newItems: ChecklistItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('student_rso_cert_checklist', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const loadTemplate = (tmplKey: string) => {
    setStageTemplate(tmplKey);
    const templateDocs = DEFAULT_TEMPLATES[tmplKey] || DEFAULT_TEMPLATES['class_12'];
    const newItems: ChecklistItem[] = templateDocs.map((name, idx) => ({
      id: `${tmplKey}-${idx}-${Date.now()}`,
      name,
      stage: tmplKey,
      isCollected: false,
      inDigiLocker: false,
    }));
    saveItems(newItems);
  };

  const toggleCollected = (id: string) => {
    const updated = items.map((it) =>
      it.id === id ? { ...it, isCollected: !it.isCollected } : it
    );
    saveItems(updated);
  };

  const toggleDigiLocker = (id: string) => {
    const updated = items.map((it) =>
      it.id === id ? { ...it, inDigiLocker: !it.inDigiLocker } : it
    );
    saveItems(updated);
  };

  const addCustomDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDocName.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      name: customDocName.trim(),
      stage: stageTemplate,
      isCollected: false,
      inDigiLocker: false,
    };
    saveItems([...items, newItem]);
    setCustomDocName('');
  };

  const deleteItem = (id: string) => {
    saveItems(items.filter((it) => it.id !== id));
  };

  const collectedCount = items.filter((i) => i.isCollected).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((collectedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 border border-[#8c2f39]/20 mb-1.5">
          <FileCheck size={12} /> STUDENT VAULT &amp; PERSONAL PORTFOLIO
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          My Document Checklist
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Interactive personal checklist saved securely on your device. Pre-load standard bundles for college admissions, diploma lateral entry, or postgraduate research.
        </p>
      </div>

      {/* Template Selector & Stats */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <label className="font-sans text-[12px] font-semibold text-[#5c4a3a] block">
            Load Pre-Configured Template:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'class_12', label: 'Class 12 / College Admission' },
              { id: 'diploma', label: 'Diploma / Lateral Entry' },
              { id: 'ug', label: 'UG Graduate / Job Ready' },
              { id: 'pg_phd', label: 'Postgraduate & Research' },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => loadTemplate(tmpl.id)}
                className={`px-3 py-1.5 rounded-xl font-sans text-[12px] font-semibold transition ${
                  stageTemplate === tmpl.id
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'bg-white border border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
                }`}
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex items-center justify-between font-sans text-[12px] text-[#2b2118] font-semibold">
            <span>Collected: {collectedCount} / {totalCount}</span>
            <span className="font-mono text-[#8c2f39]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#efe3cc] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8c2f39] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Custom Document Form */}
      <form onSubmit={addCustomDoc} className="flex gap-2">
        <input
          type="text"
          placeholder="Add custom document or certificate (e.g., Sports Quota Certificate)..."
          value={customDocName}
          onChange={(e) => setCustomDocName(e.target.value)}
          className="flex-1 px-4 py-2 bg-white border border-[#efe3cc] rounded-xl font-sans text-[12px] text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-1 focus:ring-[#8c2f39] focus:border-[#8c2f39]"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold flex items-center gap-1.5 transition shrink-0 shadow-xs"
        >
          <Plus size={15} /> Add Item
        </button>
      </form>

      {/* Checklist Items */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
              item.isCollected
                ? 'bg-[#fbf5e9] border-emerald-300'
                : 'bg-white border-[#efe3cc] shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCollected(item.id)}
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  item.isCollected
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-[#efe3cc] bg-white hover:border-[#8c2f39]'
                }`}
                aria-label={`Toggle ${item.name}`}
              >
                {item.isCollected && <Check size={14} className="stroke-[3]" />}
              </button>

              <span
                className={`font-sans text-[13px] font-semibold ${
                  item.isCollected ? 'text-[#7a6a5a] line-through' : 'text-[#2b2118]'
                }`}
              >
                {item.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleDigiLocker(item.id)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition flex items-center gap-1 ${
                  item.inDigiLocker
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] border-[#efe3cc] hover:text-[#2b2118]'
                }`}
              >
                <ShieldCheck size={12} />
                {item.inDigiLocker ? 'In DigiLocker' : 'Save to DigiLocker'}
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="p-1.5 text-[#7a6a5a] hover:text-red-700 rounded-lg hover:bg-[#fbf5e9] transition"
                aria-label="Delete item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-8 text-center font-sans text-[13px] text-[#7a6a5a] bg-[#fdfbf6] rounded-2xl border border-[#efe3cc]">
            No items in your checklist. Click a template above or add a custom document to begin!
          </div>
        )}
      </div>
    </div>
  );
}
