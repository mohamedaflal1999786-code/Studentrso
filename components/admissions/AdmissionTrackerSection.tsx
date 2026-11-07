// components/admissions/AdmissionTrackerSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Layers,
  Building,
  Save,
  X,
  ShieldCheck,
  Info
} from 'lucide-react';
import { ApplicationStatus } from '@/lib/admissions-data';
import { AdmissionApplicationItem } from '@/app/api/admissions/tracker/route';

const TRACKER_STORAGE_KEY = 'student_rso_admission_tracker_v2';

const APPLICATION_STATUSES: ApplicationStatus[] = [
  'Not Started',
  'Preparing Documents',
  'Application Started',
  'Submitted',
  'Awaiting Verification',
  'Eligible',
  'Counselling Pending',
  'Allotment Received',
  'Admission Confirmed',
  'Not Selected',
  'Withdrawn',
  'Closed',
];

export function AdmissionTrackerSection() {
  const [applications, setApplications] = useState<AdmissionApplicationItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [processName, setProcessName] = useState('');
  const [authority, setAuthority] = useState('');
  const [courseApplied, setCourseApplied] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Submitted');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [counsellingDate, setCounsellingDate] = useState('');
  const [documentStatus, setDocumentStatus] = useState<AdmissionApplicationItem['documentStatus']>('Pending Verification');
  const [nextAction, setNextAction] = useState('');
  const [notes, setNotes] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TRACKER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setApplications(parsed);
          return;
        }
      }

      // Initial sample record for student reference
      const sampleItem: AdmissionApplicationItem = {
        id: 'sample-app-1',
        processName: 'Tamil Nadu Engineering Admissions (TNEA)',
        authority: 'DOTE / Anna University',
        courseApplied: 'B.E. Computer Science and Engineering',
        referenceNumber: 'TNEA-2026-849102',
        submissionDate: '2026-05-18',
        status: 'Submitted',
        deadlineDate: '2026-06-08',
        counsellingDate: '2026-07-05',
        documentStatus: 'Documents Verified',
        nextAction: 'Download rank list and prepare choice order list',
        notes: 'Applied for CEG Guindy, MIT Chromepet, and GCT Coimbatore.',
        updatedAt: new Date().toISOString(),
      };
      setApplications([sampleItem]);
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify([sampleItem]));
    } catch (e) {
      console.warn('Failed to load application tracker items:', e);
    }
  }, []);

  function saveApplications(items: AdmissionApplicationItem[]) {
    setApplications(items);
    try {
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist admission applications:', e);
    }
  }

  function handleCreateApplication(e: React.FormEvent) {
    e.preventDefault();
    if (!processName.trim() || !courseApplied.trim()) return;

    const newItem: AdmissionApplicationItem = {
      id: 'app-' + Date.now(),
      processName: processName.trim(),
      authority: authority.trim() || 'Statutory Authority',
      courseApplied: courseApplied.trim(),
      referenceNumber: referenceNumber.trim() || 'Pending Assignment',
      submissionDate: submissionDate || new Date().toISOString().split('T')[0],
      status,
      deadlineDate: deadlineDate || 'Refer to Official Portal',
      counsellingDate: counsellingDate || 'Awaiting Notification',
      documentStatus,
      nextAction: nextAction.trim() || 'Monitor official portal for merit list',
      notes: notes.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };

    saveApplications([newItem, ...applications]);
    resetForm();
    setIsAdding(false);
  }

  function handleDelete(id: string) {
    saveApplications(applications.filter((a) => a.id !== id));
  }

  function handleStatusChange(id: string, newStatus: ApplicationStatus) {
    saveApplications(
      applications.map((a) => (a.id === id ? { ...a, status: newStatus, updatedAt: new Date().toISOString() } : a))
    );
  }

  function resetForm() {
    setProcessName('');
    setAuthority('');
    setCourseApplied('');
    setReferenceNumber('');
    setSubmissionDate('');
    setStatus('Application Started');
    setDeadlineDate('');
    setCounsellingDate('');
    setDocumentStatus('Pending Verification');
    setNextAction('');
    setNotes('');
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            My Admission Applications Tracker
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Privately track your application references, status progression, counselling dates, and next actions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setIsAdding(!isAdding);
          }}
          className="px-4 py-2.5 rounded-2xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Cancel' : 'Track New Application'}</span>
        </button>
      </div>

      {/* Security & Privacy Banner */}
      <div className="p-3.5 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] flex items-center gap-2.5 text-xs text-[#7a6a5a]">
        <ShieldCheck className="w-4 h-4 text-[#5e8b7e] shrink-0" />
        <span>
          <strong>Student Data Privacy Guarantee:</strong> Application records are stored private to your browser/account. This tracker will never ask for passwords or OTPs.
        </span>
      </div>

      {/* Add New Application Form */}
      {isAdding && (
        <form
          onSubmit={handleCreateApplication}
          className="p-5 sm:p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-sm space-y-4 animate-slide-up"
        >
          <h3 className="font-serif text-base font-bold text-[#8c2f39]">Add Application to Tracker</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Admission Process Name *</label>
              <input
                type="text"
                required
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                placeholder="e.g. TNEA Engineering 2026, TNGASA Arts"
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>

            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Course Applied *</label>
              <input
                type="text"
                required
                value={courseApplied}
                onChange={(e) => setCourseApplied(e.target.value)}
                placeholder="e.g. B.E. CSE, B.Com General"
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>

            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Authority / Institution</label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="e.g. Anna University, DCE"
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>

            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Application Reference No.</label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. TNEA-2026-102938"
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>

            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Current Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              >
                {APPLICATION_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-[#2b2118] block mb-1">Counselling / Verification Date</label>
              <input
                type="text"
                value={counsellingDate}
                onChange={(e) => setCounsellingDate(e.target.value)}
                placeholder="e.g. 2026-07-15"
                className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#2b2118] block mb-1 text-xs">Immediate Next Action</label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="e.g. Download tentative allotment order and report to college"
              className="w-full px-3 py-2 rounded-xl border border-[#efe3cc] text-xs focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl border border-[#efe3cc] text-xs font-semibold text-[#7a6a5a] hover:bg-[#fbf5e9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] shadow-xs"
            >
              Save Application
            </button>
          </div>
        </form>
      )}

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-dashed border-[#efe3cc] text-center space-y-2">
          <FileText className="w-8 h-8 text-[#d8c7ad] mx-auto mb-1" />
          <h3 className="font-serif text-base font-bold text-[#2b2118]">No Applications Saved Yet</h3>
          <p className="text-xs text-[#7a6a5a]">
            Click "Track New Application" above to add your admission reference numbers and counselling schedules.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 transition hover:border-[#d8c7ad]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8c2f39]">
                      Ref: {app.referenceNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#7a6a5a]">
                      {app.documentStatus}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2b2118]">{app.processName}</h3>
                  <div className="text-xs text-[#7a6a5a] flex items-center gap-3">
                    <span className="font-medium text-[#2b2118]">{app.courseApplied}</span>
                    <span>•</span>
                    <span>{app.authority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                    className="px-3 py-1.5 rounded-xl border border-[#efe3cc] bg-[#fdfbf6] text-xs font-bold text-[#8c2f39] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
                  >
                    {APPLICATION_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-xl text-[#7a6a5a] hover:bg-[#efe3cc]/50 hover:text-[#8c2f39] transition"
                    title="Remove record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Next Action Box */}
              <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[#2b2118]">Next Action: </span>
                  <span className="text-[#8c2f39] font-medium">{app.nextAction}</span>
                </div>
                <div className="flex items-center gap-3 text-[#7a6a5a] text-[11px]">
                  <span>Counselling: <strong>{app.counsellingDate}</strong></span>
                  <span>•</span>
                  <span>Deadline: <strong>{app.deadlineDate}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
