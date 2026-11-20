'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Building,
  CheckCircle2,
  Edit2,
  RotateCcw,
} from 'lucide-react';
import { ExternalTrackerRecord } from '@/lib/certificates-data';

export function MyApplicationTracker() {
  const [records, setRecords] = useState<ExternalTrackerRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [certTitle, setCertTitle] = useState('Community Certificate (REV-101)');
  const [refNumber, setRefNumber] = useState('');
  const [authority, setAuthority] = useState('Tamil Nadu Revenue Department (e-Sevai)');
  const [appDate, setAppDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<ExternalTrackerRecord['status']>('Applied');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('student_rso_cert_tracker');
      if (saved) {
        setRecords(JSON.parse(saved));
      } else {
        // Initial sample
        const initialSample: ExternalTrackerRecord[] = [
          {
            id: 'sample-1',
            certificateName: 'Community Certificate (REV-101)',
            issuingAuthority: 'Tamil Nadu Revenue Department (e-Sevai)',
            externalReferenceNumber: 'TN-7202610892014',
            applicationDate: '2026-11-01',
            status: 'Under Review',
            personalNotes: 'VAO field verification conducted on Wednesday.',
            createdAt: '2026-11-01T10:00:00.000Z',
            updatedAt: '2026-11-01T10:00:00.000Z',
          },
        ];
        setRecords(initialSample);
        localStorage.setItem('student_rso_cert_tracker', JSON.stringify(initialSample));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecords = (newRecords: ExternalTrackerRecord[]) => {
    setRecords(newRecords);
    try {
      localStorage.setItem('student_rso_cert_tracker', JSON.stringify(newRecords));
    } catch {
      // ignore
    }
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber.trim() || !certTitle.trim()) return;

    const now = new Date().toISOString();
    const newRecord: ExternalTrackerRecord = {
      id: `track-${Date.now()}`,
      certificateName: certTitle,
      issuingAuthority: authority,
      externalReferenceNumber: refNumber.trim(),
      applicationDate: appDate,
      status,
      personalNotes: notes.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    saveRecords([newRecord, ...records]);
    setRefNumber('');
    setNotes('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    saveRecords(records.filter((r) => r.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: ExternalTrackerRecord['status']) => {
    const updated = records.map((r) =>
      r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r
    );
    saveRecords(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-[#0d3e2e]/10 border border-[#0d3e2e]/20 mb-1.5">
          <Search size={12} /> REFERENCE MANAGEMENT SYSTEM
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          External Application Tracker
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Consolidate your official e-Sevai, DGE duplicate, or university application acknowledgement numbers in one place for easy tracking.
        </p>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-amber-950 leading-relaxed">
          <strong className="font-serif text-[14px] font-bold block mb-0.5">Student-Reported Status Notice:</strong>
          All records here are <strong>Student-reported status – not independently verified.</strong> To view live statutory government ledger updates, click the direct portal link on any recorded item.
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
          Active Tracked Applications ({records.length})
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold flex items-center gap-1.5 transition shadow-xs"
        >
          <Plus size={15} />
          {isAdding ? 'Cancel' : 'Track New Application'}
        </button>
      </div>

      {/* Add New Record Form */}
      {isAdding && (
        <form
          onSubmit={handleAddRecord}
          className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4 animate-fade-in"
        >
          <h4 className="font-serif text-[17px] font-bold text-[#2b2118]">
            Record New Government Application Reference
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                Certificate Title / Service
              </label>
              <select
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
              >
                <option value="Community Certificate (REV-101)">Community Certificate (REV-101)</option>
                <option value="Nativity Certificate (REV-102)">Nativity Certificate (REV-102)</option>
                <option value="Income Certificate (REV-103)">Income Certificate (REV-103)</option>
                <option value="First Graduate Certificate (REV-104)">First Graduate Certificate (REV-104)</option>
                <option value="OBC-NCL Certificate (REV-115)">OBC-NCL Certificate (REV-115)</option>
                <option value="Residence Certificate (REV-116)">Residence Certificate (REV-116)</option>
                <option value="UDID Disability Card">UDID Disability Card</option>
                <option value="DGE Duplicate Marksheet">DGE Duplicate Marksheet</option>
                <option value="University Degree / Provisional">University Degree / Provisional</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                Application / Acknowledgement Reference *
              </label>
              <input
                type="text"
                placeholder="e.g., TN-7202610123456"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                required
                className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                Issuing Department / Authority
              </label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                Application Date
              </label>
              <input
                type="date"
                value={appDate}
                onChange={(e) => setAppDate(e.target.value)}
                className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
                Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
              >
                <option value="Preparing">Preparing</option>
                <option value="Ready to Apply">Ready to Apply</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Additional Information Requested">Additional Information Requested</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Downloaded">Downloaded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-sans text-[11px] font-semibold text-[#5c4a3a] mb-1">
              Personal Notes / Follow-up Details
            </label>
            <input
              type="text"
              placeholder="e.g., Visited Taluk office on Friday; submitted physical ration card photocopy."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#efe3cc]">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] text-[#5c4a3a] font-sans text-[12px] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold shadow-xs"
            >
              Save Application Reference
            </button>
          </div>
        </form>
      )}

      {/* Tracker Records List */}
      <div className="space-y-3">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-2xs hover:border-[#0d3e2e]/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">{rec.certificateName}</h4>
                <span className="font-mono text-[10px] font-bold bg-[#fbf5e9] text-[#7a6a5a] border border-[#efe3cc] px-2.5 py-0.5 rounded-full">
                  {rec.externalReferenceNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                    rec.status === 'Approved' || rec.status === 'Downloaded'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : rec.status === 'Rejected'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {rec.status}
                </span>
              </div>

              <div className="font-sans text-[12px] text-[#7a6a5a] flex flex-wrap items-center gap-3">
                <span>Authority: <strong className="text-[#2b2118]">{rec.issuingAuthority}</strong></span>
                <span>Applied: <strong className="text-[#2b2118]">{rec.applicationDate}</strong></span>
              </div>

              {rec.personalNotes && (
                <p className="font-sans text-[11px] text-[#5c4a3a] italic bg-[#fbf5e9] p-2 rounded-lg border border-[#efe3cc]">
                  Notes: {rec.personalNotes}
                </p>
              )}

              <p className="font-mono text-[10px] text-[#7a6a5a]">
                Student-reported status – not independently verified.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <select
                value={rec.status}
                onChange={(e) => handleStatusChange(rec.id, e.target.value as any)}
                className="bg-[#fbf5e9] border border-[#efe3cc] rounded-lg px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118]"
              >
                <option value="Preparing">Preparing</option>
                <option value="Ready to Apply">Ready to Apply</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Additional Information Requested">Info Requested</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Downloaded">Downloaded</option>
              </select>

              <a
                href="https://edistricts.tn.gov.in/revenue/status.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold flex items-center gap-1 transition shadow-2xs"
              >
                Official Tracker <ExternalLink size={12} />
              </a>

              <button
                onClick={() => handleDelete(rec.id)}
                className="p-1.5 text-[#7a6a5a] hover:text-red-700 rounded-lg hover:bg-[#fbf5e9] transition"
                aria-label="Delete record"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {records.length === 0 && (
          <div className="p-8 text-center font-sans text-[13px] text-[#7a6a5a] bg-[#fdfbf6] rounded-2xl border border-[#efe3cc]">
            No application references tracked yet. Click "Track New Application" to add your e-Sevai or DGE reference.
          </div>
        )}
      </div>
    </div>
  );
}
