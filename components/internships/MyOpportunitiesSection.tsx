'use client';

import React, { useState } from 'react';
import {
  Bookmark,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus
} from 'lucide-react';
import { SavedApplicationRecord, ApplicationStage } from '@/lib/internship-data';

interface MyOpportunitiesSectionProps {
  trackedRecords: SavedApplicationRecord[];
  onUpdateStage: (id: string, stage: ApplicationStage, refNo?: string, interviewDate?: string, notes?: string) => void;
  onRemoveRecord: (id: string) => void;
  onOpenOfficialUrl: (url: string) => void;
}

export function MyOpportunitiesSection({
  trackedRecords,
  onUpdateStage,
  onRemoveRecord,
  onOpenOfficialUrl,
}: MyOpportunitiesSectionProps) {
  const [filterStage, setFilterStage] = useState<ApplicationStage | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRefNo, setEditRefNo] = useState('');
  const [editInterviewDate, setEditInterviewDate] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const stages: ApplicationStage[] = [
    'Saved',
    'Applied',
    'Under Review',
    'Interview Scheduled',
    'Selected',
    'Closed',
  ];

  const filtered = trackedRecords.filter((rec) => {
    if (filterStage === 'all') return true;
    return rec.stage === filterStage;
  });

  const handleStartEdit = (rec: SavedApplicationRecord) => {
    setEditingId(rec.id);
    setEditRefNo(rec.referenceNumber || '');
    setEditInterviewDate(rec.interviewDate || '');
    setEditNotes(rec.notes || '');
  };

  const handleSaveEdit = (rec: SavedApplicationRecord) => {
    onUpdateStage(rec.id, rec.stage, editRefNo, editInterviewDate, editNotes);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Bookmark size={14} /> APPLICANT WORKSPACE &amp; APPLICATION TIMELINE
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              My Applications &amp; Saved Tracker
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Track all your government internships, corporate drives, NATS apprenticeships and job applications in one private workspace.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#8c2f39] bg-[#fbf5e9] border border-[#efe3cc] px-3 py-1 rounded-full">
            {trackedRecords.length} Saved Opportunities
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#efe3cc]">
          <button
            onClick={() => setFilterStage('all')}
            className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
              filterStage === 'all'
                ? 'bg-[#8c2f39] text-white shadow-2xs'
                : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
            }`}
          >
            All Applications ({trackedRecords.length})
          </button>
          {stages.map((stg) => {
            const count = trackedRecords.filter((r) => r.stage === stg).length;
            return (
              <button
                key={stg}
                onClick={() => setFilterStage(stg)}
                className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                  filterStage === stg
                    ? 'bg-[#8c2f39] text-white shadow-2xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                }`}
              >
                {stg} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tracker Records List */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] text-center space-y-3">
          <Bookmark size={32} className="mx-auto text-[#7a6a5a]/50" />
          <h3 className="font-serif text-lg font-bold text-[#8c2f39]">
            No applications found in this stage.
          </h3>
          <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-md mx-auto">
            Click &quot;Track&quot; on any internship, apprenticeship or job card to add it to your tracking dashboard.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] space-y-4 text-left transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] px-2 py-0.5 rounded-full bg-[#8c2f39]/10 border border-[#8c2f39]/20">
                        {item.category.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-[#7a6a5a]">
                        Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                      {item.opportunityTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#7a6a5a]">{item.organisation}</p>
                  </div>

                  {/* Stage Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={item.stage}
                      onChange={(e) =>
                        onUpdateStage(item.id, e.target.value as ApplicationStage)
                      }
                      className="rounded-lg border border-[#d8c7ad] bg-white px-3 py-1.5 font-sans text-xs font-bold text-[#8c2f39] outline-none focus:border-[#8c2f39]"
                    >
                      {stages.map((stg) => (
                        <option key={stg} value={stg}>
                          {stg}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => onRemoveRecord(item.id)}
                      className="rounded-lg p-1.5 text-[#7a6a5a] hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                      title="Remove from tracker"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Tracking Details / Edit Mode */}
                {isEditing ? (
                  <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-[#7a6a5a]">Application / Reference Number:</label>
                        <input
                          type="text"
                          value={editRefNo}
                          onChange={(e) => setEditRefNo(e.target.value)}
                          placeholder="e.g. AICTE-2026-9812 or TNPSC-REG-77"
                          className="w-full rounded-lg border border-[#d8c7ad] bg-white p-2 text-[#2b2118] outline-none focus:border-[#8c2f39]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-[#7a6a5a]">Scheduled Interview / Exam Date:</label>
                        <input
                          type="date"
                          value={editInterviewDate}
                          onChange={(e) => setEditInterviewDate(e.target.value)}
                          className="w-full rounded-lg border border-[#d8c7ad] bg-white p-2 text-[#2b2118] outline-none focus:border-[#8c2f39]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-[#7a6a5a]">Notes &amp; Follow-up Details:</label>
                      <textarea
                        rows={2}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="e.g. Uploaded NOC on March 2nd. Next status check on Monday."
                        className="w-full rounded-lg border border-[#d8c7ad] bg-white p-2 text-[#2b2118] outline-none focus:border-[#8c2f39]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-[#d8c7ad] bg-white px-3 py-1.5 font-sans text-xs font-semibold text-[#7a6a5a] hover:bg-[#fbf5e9] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item)}
                        className="rounded-lg bg-[#8c2f39] px-4 py-1.5 font-sans text-xs font-bold text-white hover:bg-[#6d1824] cursor-pointer"
                      >
                        Save Tracking Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      {item.referenceNumber && (
                        <div>
                          <span className="text-[#7a6a5a] block text-[10px]">Reference No:</span>
                          <span className="font-mono font-bold text-[#2b2118]">{item.referenceNumber}</span>
                        </div>
                      )}
                      {item.interviewDate && (
                        <div>
                          <span className="text-[#7a6a5a] block text-[10px]">Interview / Exam:</span>
                          <span className="font-bold text-[#8c2f39]">{item.interviewDate}</span>
                        </div>
                      )}
                      {item.notes && (
                        <div className="max-w-md">
                          <span className="text-[#7a6a5a] block text-[10px]">Notes:</span>
                          <span className="text-[#2b2118] italic">{item.notes}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="inline-flex items-center gap-1 font-sans text-xs text-[#8c2f39] font-semibold hover:underline cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>{item.referenceNumber ? 'Edit Notes' : 'Add Ref No / Interview Date'}</span>
                    </button>
                  </div>
                )}

                {/* Footer Link */}
                <div className="flex items-center justify-between pt-1 text-xs border-t border-[#efe3cc]">
                  <span className="text-[#7a6a5a] flex items-center gap-1">
                    <Calendar size={13} /> Closing Deadline: <strong className="text-[#2b2118]">{item.deadline}</strong>
                  </span>
                  <button
                    onClick={() => onOpenOfficialUrl(item.officialPortalUrl)}
                    className="inline-flex items-center gap-1 font-sans font-bold text-[#8c2f39] hover:underline cursor-pointer"
                  >
                    <span>Open Official Portal</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
