'use client';

import { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Info,
  ListTodo,
  Plus,
  PlusCircle,
  RotateCcw,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import { ScholarshipProgram } from '@/lib/scholarships-data';

export type TrackerApplicationStatus =
  | 'Not Applied'
  | 'Preparing Documents'
  | 'Submitted'
  | 'Institution Verification'
  | 'Department Verification'
  | 'Approved'
  | 'Rejected'
  | 'Payment Processing'
  | 'Amount Received';

export interface ApplicationRecord {
  id: string;
  scholarshipId: string;
  status: TrackerApplicationStatus;
  externalReference?: string;
  submissionDate?: string;
  academicYear: string;
  isSelfReported: boolean;
  institutionVerifiedSelfReport?: boolean;
  paymentStatusNote?: string;
  disbursedAmount?: number | null;
  notes?: string;
  createdAt?: string;
}

interface ApplicationTrackerSectionProps {
  programs: any[];
  applications: ApplicationRecord[];
  onAddApplication: (app: Omit<ApplicationRecord, 'id' | 'isSelfReported'>) => void;
  onUpdateApplication: (id: string, patch: Partial<ApplicationRecord>) => void;
  onDeleteApplication: (id: string) => void;
  onOpenDetails: (program: any) => void;
}

export const TRACKER_STATUSES: TrackerApplicationStatus[] = [
  'Not Applied',
  'Preparing Documents',
  'Submitted',
  'Institution Verification',
  'Department Verification',
  'Approved',
  'Rejected',
  'Payment Processing',
  'Amount Received',
];

export function ApplicationTrackerSection({
  programs,
  applications,
  onAddApplication,
  onUpdateApplication,
  onDeleteApplication,
  onOpenDetails,
}: ApplicationTrackerSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [status, setStatus] = useState<TrackerApplicationStatus>('Preparing Documents');
  const [reference, setReference] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [notes, setNotes] = useState('');
  const [paymentNote, setPaymentNote] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchemeId) return;

    onAddApplication({
      scholarshipId: selectedSchemeId,
      status,
      externalReference: reference,
      submissionDate,
      academicYear,
      notes,
      paymentStatusNote: paymentNote,
      institutionVerifiedSelfReport: false,
    });

    // Reset
    setShowAddForm(false);
    setSelectedSchemeId('');
    setStatus('Preparing Documents');
    setReference('');
    setSubmissionDate('');
    setNotes('');
    setPaymentNote('');
  };

  const getStatusBadge = (st: TrackerApplicationStatus) => {
    switch (st) {
      case 'Amount Received':
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Payment Processing':
      case 'Department Verification':
      case 'Institution Verification':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Submitted':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-[#f6ede0] text-[#7a6a5a] border-[#efe3cc]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Important Self-Reported Disclaimer */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-amber-950 flex items-start gap-3">
        <Info size={20} className="shrink-0 text-amber-800 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block text-amber-900">
            Self-Reported Application Journey
          </strong>
          All statuses, references, and notes entered here are private student self-reports for personal organisation.
          This tool does not connect directly to government database backend nodes; check your official portal (NSP / UMIS / State Portal)
          for legally binding verification and PFMS disbursement status.
        </div>
      </div>

      {/* Header and Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
            My Application Tracker ({applications.length})
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Organise and monitor your submitted government and foundation scholarship applications.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#8c2f39] px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#6d1824] shadow-xs"
        >
          <Plus size={16} />
          <span>{showAddForm ? 'Cancel' : 'Track New Application'}</span>
        </button>
      </div>

      {/* New Application Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-sm space-y-4"
        >
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
            Add Scholarship Application to Tracker
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Select Scholarship Program *
              </label>
              <select
                required
                value={selectedSchemeId}
                onChange={(e) => setSelectedSchemeId(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="">Choose scholarship scheme...</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Application Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TrackerApplicationStatus)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                {TRACKER_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                External Application Reference ID
              </label>
              <input
                type="text"
                placeholder="e.g. NSP Application ID, UMIS ID, or token"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Submission Date
              </label>
              <input
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              Personal Journal / Follow-up Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Documents submitted at college scholarship desk on Monday. Waiting for principal sign-off."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-[#d8c7ad] px-4 py-2 font-sans text-[13px] font-semibold text-[#7a6a5a] hover:bg-[#f6ede0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#8c2f39] px-5 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#6d1824]"
            >
              Save Application to Tracker
            </button>
          </div>
        </form>
      )}

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center">
          <ListTodo size={36} className="mx-auto text-[#a08f7e] mb-3" />
          <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
            No Applications in Tracker Yet
          </h3>
          <p className="mx-auto mt-2 max-w-md font-sans text-[13px] leading-relaxed text-[#7a6a5a]">
            Keep track of your official scholarship submissions, reference IDs, verification stages, and renewal milestones.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#8c2f39] px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#6d1824]"
          >
            <Plus size={16} />
            <span>Add First Application</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const program = programs.find((p) => p.id === app.scholarshipId);
            if (!program) return null;

            return (
              <div
                key={app.id}
                className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#8c2f39]">
                      {program.category}
                    </span>
                    <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                      {program.name}
                    </h3>
                    <p className="font-sans text-[12px] text-[#7a6a5a]">
                      {program.provider}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 font-sans text-[12px] font-bold ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                    <button
                      onClick={() => onDeleteApplication(app.id)}
                      className="rounded-lg p-2 text-[#7a6a5a] hover:bg-red-50 hover:text-red-700"
                      title="Remove from tracker"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Edit Controls Grid */}
                <div className="grid gap-3 sm:grid-cols-3 pt-2">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1">
                      Update Stage
                    </label>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        onUpdateApplication(app.id, {
                          status: e.target.value as TrackerApplicationStatus,
                        })
                      }
                      className="w-full rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                    >
                      {TRACKER_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1">
                      External Reference ID
                    </label>
                    <input
                      type="text"
                      value={app.externalReference || ''}
                      placeholder="e.g. NSP2026TN00123"
                      onChange={(e) =>
                        onUpdateApplication(app.id, { externalReference: e.target.value })
                      }
                      className="w-full rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1">
                      Submission Date
                    </label>
                    <input
                      type="date"
                      value={app.submissionDate || ''}
                      onChange={(e) =>
                        onUpdateApplication(app.id, { submissionDate: e.target.value })
                      }
                      className="w-full rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                    />
                  </div>
                </div>

                {/* Notes & Institution Verification Self-Report */}
                <div className="space-y-2">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1">
                      Self-Reported Notes
                    </label>
                    <input
                      type="text"
                      value={app.notes || ''}
                      placeholder="Add reminders or follow-up notes"
                      onChange={(e) => onUpdateApplication(app.id, { notes: e.target.value })}
                      className="w-full rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#efe3cc] text-[11px] text-[#7a6a5a]">
                    <label className="flex items-center gap-2 cursor-pointer font-sans">
                      <input
                        type="checkbox"
                        checked={Boolean(app.institutionVerifiedSelfReport)}
                        onChange={(e) =>
                          onUpdateApplication(app.id, {
                            institutionVerifiedSelfReport: e.target.checked,
                          })
                        }
                        className="h-3.5 w-3.5 accent-[#8c2f39] rounded"
                      />
                      <span>Institution scholarship nodal desk has endorsed application (Self-Reported)</span>
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenDetails(program)}
                        className="font-sans font-bold text-[#8c2f39] hover:underline"
                      >
                        Inspect Scheme Details
                      </button>
                      <a
                        href={program.officialApplicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans font-bold text-[#8c2f39] hover:underline"
                      >
                        <span>Official Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
