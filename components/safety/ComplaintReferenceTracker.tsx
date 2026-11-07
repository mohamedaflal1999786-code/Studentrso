'use client';

import { useState, useEffect } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  Lock,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { ExternalComplaintRecord } from '@/lib/safety-data';
import { useAuth } from '@/lib/auth-context';

const STORAGE_KEY = 'student_rso_external_complaint_tracker';

const COMPLAINT_STATUSES = [
  'Preparing',
  'Submitted',
  'Acknowledged',
  'Under Review',
  'Additional Information Requested',
  'Resolved',
  'Closed',
] as const;

export function ComplaintReferenceTracker() {
  const { user } = useAuth();
  const [records, setRecords] = useState<ExternalComplaintRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [authorityName, setAuthorityName] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('Ragging / Senior Intimidation');
  const [externalReferenceNumber, setExternalReferenceNumber] = useState('');
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<ExternalComplaintRecord['status']>('Submitted');
  const [followUpDate, setFollowUpDate] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');

  // Load records from local storage and remote if signed in
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRecords(parsed);
      }
    } catch {
      // ignore
    }

    if (user) {
      fetch('/api/safety/tracker')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && Array.isArray(data.records) && data.records.length > 0) {
            setRecords((prev) => {
              const combined = [...data.records, ...prev];
              const unique = Array.from(new Map(combined.map((r: any) => [r.id || r.externalReferenceNumber, r])).values());
              return unique as ExternalComplaintRecord[];
            });
          }
        })
        .catch(() => {});
    }
  }, [user]);

  // Persist locally
  const saveRecordsLocally = (updated: ExternalComplaintRecord[]) => {
    setRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorityName.trim() || !externalReferenceNumber.trim()) return;

    const newRecord: ExternalComplaintRecord = {
      id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      authorityName: authorityName.trim(),
      complaintCategory,
      externalReferenceNumber: externalReferenceNumber.trim(),
      submissionDate,
      status,
      followUpDate: followUpDate || undefined,
      personalNotes: personalNotes.trim() ? personalNotes.trim() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...records];
    saveRecordsLocally(updated);

    // Sync to Supabase if authenticated
    if (user) {
      try {
        await fetch('/api/safety/tracker', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        });
      } catch {
        // saved locally
      }
    }

    // Reset form
    setAuthorityName('');
    setExternalReferenceNumber('');
    setPersonalNotes('');
    setFollowUpDate('');
    setIsAdding(false);
  };

  const handleDeleteRecord = async (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    saveRecordsLocally(updated);

    if (user) {
      try {
        await fetch(`/api/safety/tracker?id=${id}`, { method: 'DELETE' });
      } catch {
        // deleted locally
      }
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to delete all personal external complaint records? This cannot be undone.')) {
      return;
    }
    saveRecordsLocally([]);

    if (user) {
      try {
        await fetch('/api/safety/tracker?clearAll=true', { method: 'DELETE' });
      } catch {
        // cleared locally
      }
    }
  };

  const getStatusBadge = (st: ExternalComplaintRecord['status']) => {
    switch (st) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Under Review':
      case 'Acknowledged':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Additional Information Requested':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Closed':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'Preparing':
      case 'Submitted':
      default:
        return 'bg-[#f6ede0] text-[#8c2f39] border-[#d8c7ad]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Privacy Notice */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Lock size={14} /> PRIVACY-PRESERVED STUDENT LOG
            </div>
            <h3 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              External Complaint Reference Tracker
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Maintain an optional, private log of ticket numbers and dates issued to you by external government authorities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {records.length > 0 && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 font-sans text-[12px] font-semibold text-red-700 hover:bg-red-50 transition"
              >
                <Trash2 size={13} />
                <span>Clear All Records</span>
              </button>
            )}
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] px-4 py-2 font-sans text-[13px] font-bold text-white shadow-2xs transition"
            >
              <PlusCircle size={15} />
              <span>{isAdding ? 'Cancel Entry' : 'Log New External Reference'}</span>
            </button>
          </div>
        </div>

        {/* Privacy Safeguards Strip */}
        <div className="rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-4 text-[12px] font-sans text-[#7a6a5a] space-y-1.5">
          <div className="flex items-center gap-2 text-[#2b2118] font-bold font-mono uppercase text-[11px]">
            <ShieldCheck size={14} className="text-[#5e8b7e]" /> Strict Student Privacy Protection
          </div>
          <p className="leading-relaxed">
            • Student RSO <strong>does not collect sensitive complaint narratives, passwords, OTPs, or private photographs</strong>.<br />
            • All statuses shown are <strong>student-reported personal reminders</strong> and do not represent verified external authority decisions.<br />
            • Records are stored in your private local browser storage and can be deleted anytime.
          </p>
        </div>
      </div>

      {/* Add New Record Form */}
      {isAdding && (
        <form
          onSubmit={handleAddRecord}
          className="rounded-2xl border border-[#efe3cc] bg-white p-6 shadow-sm space-y-4 animate-in fade-in-50 duration-200"
        >
          <h4 className="font-serif text-[18px] font-bold text-[#2b2118] pb-2 border-b border-[#efe3cc]">
            Log External Government Docket / Reference
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                Authority Name / Portal *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. National Anti-Ragging Portal / UGC e-Samadhaan / 112 / CM Helpline"
                value={authorityName}
                onChange={(e) => setAuthorityName(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                Complaint Category *
              </label>
              <select
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="Ragging / Senior Intimidation">Ragging / Senior Intimidation</option>
                <option value="Bullying & Peer Aggression">Bullying &amp; Peer Aggression</option>
                <option value="Harassment & Gender Safety">Harassment &amp; Gender Safety</option>
                <option value="Discrimination & Equal Opportunity">Discrimination &amp; Equal Opportunity</option>
                <option value="Staff Misconduct & Administrative Abuse">Staff Misconduct &amp; Administrative Abuse</option>
                <option value="Threats & Physical Intimidation">Threats &amp; Physical Intimidation</option>
                <option value="Unfair Academic & Examination Treatment">Unfair Academic &amp; Examination Treatment</option>
                <option value="Cyberbullying & Digital Safety">Cyberbullying &amp; Digital Safety</option>
                <option value="Child & Minor Student Protection">Child &amp; Minor Student Protection</option>
                <option value="Hostel & Campus Welfare Grievance">Hostel &amp; Campus Welfare Grievance</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                External Reference / Docket Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AR-TN-2026-8821 or 2026/CYBER/491823"
                value={externalReferenceNumber}
                onChange={(e) => setExternalReferenceNumber(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                Submission Date
              </label>
              <input
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                Self-Reported Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                {COMPLAINT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-bold text-[#2b2118]">
                Follow-up Target Date (Optional)
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-sans text-[12px] font-bold text-[#2b2118]">
              Personal Reminder Note (Non-sensitive, e.g. "Called inquiry cell on 4th Nov")
            </label>
            <textarea
              rows={2}
              maxLength={300}
              placeholder="Keep brief factual reminders only. Do not store sensitive confidential details here."
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#efe3cc]">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl border border-[#d8c7ad] bg-white px-4 py-2 font-sans text-[13px] font-semibold text-[#7a6a5a] hover:bg-[#fbf5e9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] px-5 py-2 font-sans text-[13px] font-bold text-white shadow-2xs"
            >
              Save to My Log
            </button>
          </div>
        </form>
      )}

      {/* List of Tracked External References */}
      {records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center space-y-3">
          <FileCheck2 size={36} className="mx-auto text-[#a08f7e]" />
          <h4 className="font-serif text-[18px] font-bold text-[#2b2118]">
            No External Complaint Records Logged
          </h4>
          <p className="font-sans text-[13px] text-[#7a6a5a] max-w-md mx-auto">
            When you register a complaint on an official portal (such as antiragging.in or samadhaan.ugc.ac.in),
            you can save your reference number here to keep track of follow-up dates.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] px-4 py-2 font-sans text-[13px] font-bold text-white shadow-2xs"
          >
            <PlusCircle size={15} />
            <span>Add First Reference</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#e0a526] uppercase">
                    {rec.complaintCategory}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      rec.status
                    )}`}
                  >
                    {rec.status} (Self-Reported)
                  </span>
                </div>

                <h4 className="font-serif text-[18px] font-bold text-[#2b2118]">
                  {rec.authorityName}
                </h4>

                <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-[#554a3f]">
                  <span>
                    Ref Number: <strong className="text-[#8c2f39]">{rec.externalReferenceNumber}</strong>
                  </span>
                  <span className="text-[#efe3cc] hidden sm:inline">|</span>
                  <span className="flex items-center gap-1 text-[#7a6a5a]">
                    <Calendar size={13} /> Submitted: {rec.submissionDate}
                  </span>
                  {rec.followUpDate && (
                    <>
                      <span className="text-[#efe3cc] hidden sm:inline">|</span>
                      <span className="flex items-center gap-1 text-amber-800 font-semibold">
                        <Clock size={13} /> Follow-up Target: {rec.followUpDate}
                      </span>
                    </>
                  )}
                </div>

                {rec.personalNotes && (
                  <p className="font-sans text-[12px] text-[#7a6a5a] pt-1">
                    <em>Note:</em> {rec.personalNotes}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDeleteRecord(rec.id)}
                className="text-[#a08f7e] hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition shrink-0"
                title="Delete this record"
              >
                <Trash2 size={16} />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
