// components/exams/SavedOpportunitiesTracker.tsx
'use client';

import { useState, useEffect } from 'react';
import { Bookmark, CheckCircle2, Clock, Trash2, ExternalLink, AlertCircle, Plus, Edit2, ShieldAlert } from 'lucide-react';

interface TrackedItem {
  id: string;
  title: string;
  type: 'College' | 'Entrance Exam' | 'Competitive Exam' | 'Job / Apprenticeship';
  status: 'Interested' | 'Checking Eligibility' | 'Application Started' | 'Applied' | 'Counselling' | 'Exam Completed' | 'Selected';
  notes: string;
  portalUrl: string;
  updatedAt: string;
}

export function SavedOpportunitiesTracker() {
  const [items, setItems] = useState<TrackedItem[]>([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemType, setNewItemType] = useState<TrackedItem['type']>('College');
  const [newItemPortal, setNewItemPortal] = useState('');
  const [newItemNotes, setNewItemNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('student_rso_tracked_opportunities');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Sample starter items
        const defaultItems: TrackedItem[] = [
          {
            id: 'track-1',
            title: 'TNEA Engineering Single Window (Anna University)',
            type: 'Entrance Exam',
            status: 'Interested',
            notes: 'Need to get Community Certificate and First Graduate declaration ready.',
            portalUrl: 'https://www.tneaonline.org/',
            updatedAt: '2026-11-06',
          },
          {
            id: 'track-2',
            title: 'College of Engineering, Guindy (CEG)',
            type: 'College',
            status: 'Checking Eligibility',
            notes: 'Target cutoff: 195+ for Computer Science and Engineering.',
            portalUrl: 'https://ceg.annauniv.edu/',
            updatedAt: '2026-11-06',
          },
        ];
        setItems(defaultItems);
        localStorage.setItem('student_rso_tracked_opportunities', JSON.stringify(defaultItems));
      }
    } catch (e) {}
  }, []);

  function saveItems(updated: TrackedItem[]) {
    setItems(updated);
    try {
      localStorage.setItem('student_rso_tracked_opportunities', JSON.stringify(updated));
    } catch (e) {}
  }

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: TrackedItem = {
      id: `track-${Date.now()}`,
      title: newItemTitle.trim(),
      type: newItemType,
      status: 'Interested',
      notes: newItemNotes.trim(),
      portalUrl: newItemPortal.trim() || 'https://www.tneaonline.org/',
      updatedAt: new Date().toISOString().split('T')[0],
    };

    saveItems([newItem, ...items]);
    setNewItemTitle('');
    setNewItemNotes('');
    setNewItemPortal('');
    setIsAdding(false);
  }

  function handleStatusChange(id: string, newStatus: TrackedItem['status']) {
    saveItems(
      items.map((it) => (it.id === id ? { ...it, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : it))
    );
  }

  function handleDeleteItem(id: string) {
    saveItems(items.filter((it) => it.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 font-mono text-[11px] font-bold mb-2">
              <Bookmark size={13} /> CONFIDENTIAL LOCAL TRACKER
            </div>
            <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
              Saved Colleges &amp; Opportunity Tracker
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a] mt-1 max-w-2xl">
              Keep private track of your target colleges, entrance applications, and recruitment milestones. All information is stored securely in your browser session without sharing personal credentials.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold shadow-xs transition inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus size={14} /> {isAdding ? 'Close Form' : '+ Track New Opportunity'}
          </button>
        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[12px] font-sans flex items-start gap-2.5">
          <ShieldAlert size={16} className="text-amber-800 shrink-0 mt-0.5" />
          <p className="text-amber-900 leading-relaxed">
            <strong>Mandatory Verification Notice:</strong> Student-reported status – not independently verified. Student RSO does not collect your application passwords, Aadhaar OTPs, or submission credentials. You must submit your official applications directly on authorized government or university portals.
          </p>
        </div>
      </div>

      {/* Add New Item Form */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-[16px] font-bold text-[#2b2118]">Add Target College or Opportunity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-[12px]">
            <div>
              <label className="block text-[11px] font-bold text-[#7a6a5a] uppercase mb-1">Title / Institution</label>
              <input
                type="text"
                placeholder="e.g. PSG Tech CSE / TNPSC Group 4"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7a6a5a] uppercase mb-1">Type</label>
              <select
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value as TrackedItem['type'])}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              >
                <option value="College">College / University</option>
                <option value="Entrance Exam">Entrance Examination</option>
                <option value="Competitive Exam">Government Competitive Exam</option>
                <option value="Job / Apprenticeship">Apprenticeship / Job</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7a6a5a] uppercase mb-1">Official Portal URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={newItemPortal}
                onChange={(e) => setNewItemPortal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#7a6a5a] uppercase mb-1">Personal Target Notes</label>
            <input
              type="text"
              placeholder="e.g. Cutoff goal, required documents, deadline reminder..."
              value={newItemNotes}
              onChange={(e) => setNewItemNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#efe3cc] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-xl border border-[#efe3cc] text-[12px] font-sans font-semibold text-[#7a6a5a]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#8c2f39] text-white text-[12px] font-sans font-bold hover:bg-[#6d1824]"
            >
              Save to Tracker
            </button>
          </div>
        </form>
      )}

      {/* Tracked Items List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#efe3cc] bg-white p-8 text-center text-[#7a6a5a]">
            No opportunities currently saved in your tracker. Shortlist colleges from the directory or add an entrance exam above.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#efe3cc] bg-white p-4 sm:p-5 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-[12px]"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 uppercase">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-[#7a6a5a]">
                    Last updated: {item.updatedAt}
                  </span>
                </div>

                <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">
                  {item.title}
                </h4>

                {item.notes && (
                  <p className="text-[#5c4a3a] text-[12px] italic">
                    &ldquo;{item.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#7a6a5a]">Status:</span>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as TrackedItem['status'])}
                    className="px-2.5 py-1 rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-[11px] font-bold text-[#8c2f39] focus:outline-none"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Checking Eligibility">Checking Eligibility</option>
                    <option value="Application Started">Application Started</option>
                    <option value="Applied">Applied</option>
                    <option value="Counselling">In Counselling</option>
                    <option value="Exam Completed">Exam Completed</option>
                    <option value="Selected">Selected</option>
                  </select>
                </div>

                <a
                  href={item.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-[#8c2f39] hover:bg-[#fbf5e9] transition"
                  title="Open Portal"
                >
                  <ExternalLink size={15} />
                </a>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-red-700 hover:bg-red-50 transition"
                  title="Remove"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
