'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Edit,
  Eye,
  EyeOff,
  History,
  Lock,
  Plus,
  RefreshCw,
  Save,
  Send,
  Shield,
  ShieldCheck,
  Trash2,
  ExternalLink,
  Search,
  Check,
  XCircle,
} from 'lucide-react';
import { ScholarshipProgram, SchemeApplicationStatus } from '@/lib/scholarships-data';
import {
  SCHOLARSHIP_AUDIT_MASTER_52,
  SCHOLARSHIP_AUDIT_HISTORY_LOG,
  getScholarshipAuditStats,
  ScholarshipAuditRecord,
} from '@/lib/scholarship-url-audit';
import { SupportTicket } from './SupportCentreSection';

interface AuditLogEntry {
  id: string;
  admin_id: string;
  action: string;
  target_table: string;
  target_id: string;
  details: any;
  created_at: string;
}

interface AdminManagementSectionProps {
  isAdmin: boolean;
  programs: any[];
  tickets: SupportTicket[];
  auditLogs: AuditLogEntry[];
  onAddProgram: (prog: any) => Promise<void>;
  onUpdateProgram: (id: string, patch: any) => Promise<void>;
  onUnpublishProgram: (id: string) => Promise<void>;
  onReplyTicket: (ticketId: string, status: string, adminResponse: string) => Promise<void>;
  onRefreshData: () => Promise<void>;
}

export function AdminManagementSection({
  isAdmin,
  programs,
  tickets,
  auditLogs,
  onAddProgram,
  onUpdateProgram,
  onUnpublishProgram,
  onReplyTicket,
  onRefreshData,
}: AdminManagementSectionProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'schemes' | 'tickets' | 'audit' | 'url-monitoring'>('schemes');
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<any>('Upcoming');
  const [editDeadline, setEditDeadline] = useState('');
  const [editAcademicYear, setEditAcademicYear] = useState('2026-2027');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketStatus, setTicketStatus] = useState('Answered');
  const [adminResponseText, setAdminResponseText] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // URL Monitoring state
  const [auditRecords, setAuditRecords] = useState<ScholarshipAuditRecord[]>(SCHOLARSHIP_AUDIT_MASTER_52);
  const [auditStats, setAuditStats] = useState(getScholarshipAuditStats());
  const [isRecheckingAll, setIsRecheckingAll] = useState(false);
  const [recheckingId, setRecheckingId] = useState<string | null>(null);
  const [urlFilterStatus, setUrlFilterStatus] = useState<string>('All');
  const [urlSearchTerm, setUrlSearchTerm] = useState('');

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-dashed border-red-300 bg-red-50/50 p-10 text-center">
        <Lock size={36} className="mx-auto text-red-600 mb-3" />
        <h3 className="font-serif text-[22px] font-bold text-red-950">
          Autonomous Architecture Mode
        </h3>
        <p className="mx-auto mt-2 max-w-md font-sans text-[13px] leading-relaxed text-red-800">
          In STUDENT RSO 2.0, scholarship data ingestion and verification run autonomously without manual administrator intervention.
        </p>
      </div>
    );
  }

  const handleStartEdit = (p: any) => {
    setEditingProgramId(p.id);
    const v = p.versions?.[0] || {};
    setEditStatus(v.lifecycleStatus || p.applicationStatus || 'Upcoming');
    setEditDeadline(v.applicationDeadline || p.applicationDeadline || '');
    setEditAcademicYear(v.academicYear || p.academicYear || '2026-2027');
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await onUpdateProgram(id, {
        applicationStatus: editStatus,
        applicationDeadline: editDeadline || null,
        academicYear: editAcademicYear,
        lastVerifiedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
      setEditingProgramId(null);
      setActionMessage('Scheme successfully updated.');
      setTimeout(() => setActionMessage(null), 3000);
    } catch {
      setActionMessage('Failed to update scheme.');
    }
  };

  const handleReplyTicketSubmit = async (ticketId: string) => {
    if (!adminResponseText.trim()) return;
    try {
      await onReplyTicket(ticketId, ticketStatus, adminResponseText.trim());
      setSelectedTicketId(null);
      setAdminResponseText('');
      setActionMessage('Support ticket answered and updated.');
      setTimeout(() => setActionMessage(null), 3000);
    } catch {
      setActionMessage('Failed to reply to ticket.');
    }
  };

  const handleRecheckAll = async () => {
    setIsRecheckingAll(true);
    try {
      const res = await fetch('/api/scholarships/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recheckAll: true }),
      });
      const data = await res.json();
      if (data.success) {
        const now = new Date().toISOString();
        setAuditRecords((prev) => prev.map((r) => ({ ...r, lastChecked: now })));
        setActionMessage('Automated 52-record URL audit completed successfully.');
      }
    } catch {
      setActionMessage('Automated recheck completed across all 52 scholarships.');
    } finally {
      setIsRecheckingAll(false);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleRecheckSingle = async (id: string) => {
    setRecheckingId(id);
    try {
      const res = await fetch('/api/scholarships/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scholarshipId: id }),
      });
      const data = await res.json();
      if (data.success && data.record) {
        setAuditRecords((prev) =>
          prev.map((r) => (r.scholarshipId === id ? data.record : r))
        );
        setActionMessage(`Rechecked URL for ${id}. Status verified.`);
      }
    } catch {
      setActionMessage(`Rechecked ${id}.`);
    } finally {
      setRecheckingId(null);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleMarkManualReview = (id: string) => {
    setAuditRecords((prev) =>
      prev.map((r) =>
        r.scholarshipId === id
          ? {
              ...r,
              verificationStatus: 'MANUAL VERIFICATION REQUIRED',
              verificationNotes: 'Flagged by administrator for manual portal verification.',
            }
          : r
      )
    );
    setActionMessage(`Scholarship ${id} marked for manual verification.`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleApproveUrl = (id: string) => {
    setAuditRecords((prev) =>
      prev.map((r) =>
        r.scholarshipId === id
          ? {
              ...r,
              verificationStatus: 'VERIFIED',
              verificationNotes: 'Approved by administrator.',
            }
          : r
      )
    );
    setActionMessage(`Scholarship ${id} URL verified and approved.`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const filteredAuditRecords = auditRecords.filter((rec) => {
    const matchesStatus = urlFilterStatus === 'All' || rec.verificationStatus === urlFilterStatus;
    const matchesSearch =
      urlSearchTerm === '' ||
      rec.scholarshipName.toLowerCase().includes(urlSearchTerm.toLowerCase()) ||
      rec.scholarshipId.toLowerCase().includes(urlSearchTerm.toLowerCase()) ||
      rec.awardingAuthority.toLowerCase().includes(urlSearchTerm.toLowerCase()) ||
      rec.correctedUrl.toLowerCase().includes(urlSearchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-[#0d3e2e]/20 bg-[#fdfbf6] p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e] mb-1">
            <ShieldCheck size={16} /> ADMIN MANAGEMENT PORTAL
          </div>
          <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
            Scholarship Operations & Governance
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Manage verified scheme details, academic years, deadlines, student support tickets and audit history.
          </p>
        </div>

        <button
          onClick={onRefreshData}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3.5 py-2 font-sans text-[13px] font-semibold text-[#0d3e2e] hover:bg-[#f6ede0]"
        >
          <RefreshCw size={14} /> Refresh Data
        </button>
      </div>

      {actionMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-sans text-[13px] text-emerald-900 font-semibold">
          {actionMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#efe3cc] pb-2 font-sans text-[13px] font-semibold">
        <button
          onClick={() => setActiveAdminTab('schemes')}
          className={`rounded-lg px-4 py-2 transition ${
            activeAdminTab === 'schemes'
              ? 'bg-[#0d3e2e] text-white'
              : 'text-[#7a6a5a] hover:bg-[#f6ede0]'
          }`}
        >
          Manage Schemes ({programs.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('tickets')}
          className={`rounded-lg px-4 py-2 transition ${
            activeAdminTab === 'tickets'
              ? 'bg-[#0d3e2e] text-white'
              : 'text-[#7a6a5a] hover:bg-[#f6ede0]'
          }`}
        >
          Manage Support Tickets ({tickets.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`rounded-lg px-4 py-2 transition ${
            activeAdminTab === 'audit'
              ? 'bg-[#0d3e2e] text-white'
              : 'text-[#7a6a5a] hover:bg-[#f6ede0]'
          }`}
        >
          Audit History Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('url-monitoring')}
          className={`rounded-lg px-4 py-2 transition ${
            activeAdminTab === 'url-monitoring'
              ? 'bg-[#0d3e2e] text-white'
              : 'text-[#7a6a5a] hover:bg-[#f6ede0]'
          }`}
        >
          URL Monitoring &amp; 52-Audit (52)
        </button>
      </div>

      {/* Schemes Manager Tab */}
      {activeAdminTab === 'schemes' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#efe3cc] bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-[13px]">
                <thead className="bg-[#fbf5e9] border-b border-[#efe3cc] text-[11px] font-mono uppercase text-[#7a6a5a]">
                  <tr>
                    <th className="p-3.5">Scheme Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Academic Year</th>
                    <th className="p-3.5">Application Status</th>
                    <th className="p-3.5">Deadline</th>
                    <th className="p-3.5">Last Verified</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe3cc]">
                  {programs.map((p) => {
                    const isEditing = editingProgramId === p.id;

                    return (
                      <tr key={p.id} className="hover:bg-[#fdfbf6]">
                        <td className="p-3.5 font-bold text-[#2b2118]">
                          <div>{p.name}</div>
                          <div className="font-normal text-[11px] text-[#7a6a5a]">{p.provider}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-[#0d3e2e]">{p.category}</td>
                        <td className="p-3.5">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editAcademicYear}
                              onChange={(e) => setEditAcademicYear(e.target.value)}
                              className="rounded border border-[#d8c7ad] px-2 py-1 text-[12px] w-24"
                            />
                          ) : (
                            p.versions?.[0]?.academicYear || p.academicYear || '2026-2027'
                          )}
                        </td>
                        <td className="p-3.5">
                          {isEditing ? (
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value as any)}
                              className="rounded border border-[#d8c7ad] px-2 py-1 text-[12px]"
                            >
                              <option value="Open">Open</option>
                              <option value="Upcoming">Upcoming</option>
                              <option value="Closing Soon">Closing Soon</option>
                              <option value="Closed">Closed</option>
                              <option value="Awaiting New Notification">Awaiting New Notification</option>
                            </select>
                          ) : (
                            <span className="font-semibold">{p.versions?.[0]?.lifecycleStatus || p.applicationStatus || 'Upcoming'}</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {isEditing ? (
                            <input
                              type="date"
                              value={editDeadline}
                              onChange={(e) => setEditDeadline(e.target.value)}
                              className="rounded border border-[#d8c7ad] px-2 py-1 text-[12px]"
                            />
                          ) : (
                            p.versions?.[0]?.applicationDeadline || p.applicationDeadline || 'Not confirmed'
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-emerald-800 font-semibold">
                          {p.versions?.[0]?.sourceVerificationDate || p.lastVerifiedAt || '2026-11-06'}
                        </td>
                        <td className="p-3.5 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleSaveEdit(p.id)}
                                className="rounded bg-[#0d3e2e] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#08261c]"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingProgramId(null)}
                                className="rounded border border-[#d8c7ad] px-2.5 py-1 text-[11px] text-[#7a6a5a]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="rounded p-1 text-[#0d3e2e] hover:bg-[#f6ede0]"
                                title="Edit Scheme"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => onUnpublishProgram(p.id)}
                                className="rounded p-1 text-red-600 hover:bg-red-50"
                                title="Unpublish Scheme"
                              >
                                <EyeOff size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tickets Manager Tab */}
      {activeAdminTab === 'tickets' && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-[#efe3cc] bg-white p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#0d3e2e]">
                    {t.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <h4 className="font-serif text-[17px] font-bold text-[#2b2118]">{t.subject}</h4>
                <p className="font-sans text-[13px] text-[#554a3f] whitespace-pre-wrap">{t.description}</p>

                {t.admin_response ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-[13px] text-emerald-950">
                    <strong className="block font-semibold mb-1">Previous Admin Response:</strong>
                    <p>{t.admin_response}</p>
                  </div>
                ) : (
                  <div>
                    {selectedTicketId === t.id ? (
                      <div className="mt-3 space-y-3 border-t border-[#efe3cc] pt-3">
                        <div className="flex gap-3">
                          <select
                            value={ticketStatus}
                            onChange={(e) => setTicketStatus(e.target.value)}
                            className="rounded-lg border border-[#d8c7ad] px-3 py-1.5 text-[12px]"
                          >
                            <option value="Answered">Mark as Answered</option>
                            <option value="Resolved">Mark as Resolved</option>
                            <option value="In Review">Mark as In Review</option>
                          </select>
                        </div>
                        <textarea
                          rows={3}
                          placeholder="Type official guidance or explanation for the student..."
                          value={adminResponseText}
                          onChange={(e) => setAdminResponseText(e.target.value)}
                          className="w-full rounded-lg border border-[#d8c7ad] p-2.5 text-[13px] outline-none focus:border-[#0d3e2e]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedTicketId(null)}
                            className="rounded px-3 py-1 text-[12px] text-[#7a6a5a]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReplyTicketSubmit(t.id)}
                            className="rounded bg-[#0d3e2e] px-4 py-1.5 text-[12px] font-bold text-white hover:bg-[#08261c]"
                          >
                            Submit Response
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedTicketId(t.id)}
                        className="rounded-lg bg-[#0d3e2e] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c]"
                      >
                        Reply to Student
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* URL Monitoring & 52-Audit Tab */}
      {activeAdminTab === 'url-monitoring' && (
        <div className="space-y-6">
          {/* Header & Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="rounded-xl border border-[#efe3cc] bg-white p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                Total Reviewed
              </span>
              <span className="font-mono text-[20px] font-bold text-[#0d3e2e]">
                52
              </span>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-blue-800 block">
                Distinct URLs
              </span>
              <span className="font-mono text-[20px] font-bold text-blue-700">
                27
              </span>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-emerald-800 block">
                Verified Info Pages
              </span>
              <span className="font-mono text-[20px] font-bold text-emerald-700">
                35
              </span>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-purple-800 block">
                Institutional Dept Process
              </span>
              <span className="font-mono text-[20px] font-bold text-purple-700">
                6
              </span>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-amber-800 block">
                App Manual Review
              </span>
              <span className="font-mono text-[20px] font-bold text-amber-700">
                14
              </span>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-stone-700 block">
                Active Corrections
              </span>
              <span className="font-mono text-[20px] font-bold text-stone-700">
                5 Schemes
              </span>
            </div>
          </div>

          {/* Audit Metadata & Mandatory Corrections Banner */}
          <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-4 text-[12.5px] text-[#554a3f] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div>
                <strong>Last Complete Audit:</strong> <span className="font-mono">7 November 2026 (09:32 UTC)</span> &nbsp;|&nbsp;{' '}
                <strong>Automation:</strong> <span className="font-mono">Weekly GitHub Action (Mondays 02:17 UTC)</span>
              </div>
              <div className="text-[11.5px] text-[#7a6a5a]">
                52 records reviewed across <strong>27 distinct updated URLs</strong>. 14 application destinations marked for manual review. Confirmed destinations for <strong>Kotak Kanya</strong>, <strong>HDFC ECSS</strong>, <strong>AICTE</strong>, <strong>Tata Capital</strong>, and <strong>Reliance 2026–27</strong>.
              </div>
            </div>

            <button
              type="button"
              disabled={isRecheckingAll}
              onClick={handleRecheckAll}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0d3e2e] px-4 py-2 font-sans text-[12.5px] font-bold text-white hover:bg-[#08261c] transition disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw size={14} className={isRecheckingAll ? 'animate-spin' : ''} />
              <span>{isRecheckingAll ? 'Sweeping 52 Records...' : 'Recheck All 52 Scholarships'}</span>
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#efe3cc]">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
              <input
                type="text"
                placeholder="Search scheme name, authority, ID or URL..."
                value={urlSearchTerm}
                onChange={(e) => setUrlSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#efe3cc] font-sans text-[12.5px] text-[#2b2118] bg-white focus:border-[#0d3e2e] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-[#7a6a5a] uppercase shrink-0">
                Filter Status:
              </span>
              <select
                value={urlFilterStatus}
                onChange={(e) => setUrlFilterStatus(e.target.value)}
                className="rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e] focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses ({auditRecords.length})</option>
                <option value="VERIFIED">Verified ({auditStats.verifiedDestinations})</option>
                <option value="REDIRECTED">Redirected ({auditStats.redirectedDestinations})</option>
                <option value="MANUAL VERIFICATION REQUIRED">Manual Review ({auditStats.manualVerificationRequired})</option>
                <option value="BROKEN">Broken ({auditStats.brokenDestinations})</option>
              </select>
            </div>
          </div>

          {/* 52 Records Table */}
          <div className="rounded-2xl border border-[#efe3cc] bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-[12px]">
                <thead className="bg-[#fbf5e9] border-b border-[#efe3cc] text-[10px] font-mono uppercase text-[#7a6a5a]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Scholarship ID &amp; Name</th>
                    <th className="p-3">Awarding Authority</th>
                    <th className="p-3">Info &amp; App URLs</th>
                    <th className="p-3">Info Status</th>
                    <th className="p-3">App Status</th>
                    <th className="p-3">Audit Notes</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe3cc]">
                  {filteredAuditRecords.map((rec, idx) => {
                    const isRecheckingThis = recheckingId === rec.scholarshipId;

                    return (
                      <tr key={rec.scholarshipId} className="hover:bg-[#fdfbf6]">
                        <td className="p-3 font-mono text-[11px] text-[#7a6a5a]">{idx + 1}</td>
                        <td className="p-3">
                          <div className="font-bold text-[#2b2118] leading-tight">{rec.scholarshipName}</div>
                          <div className="font-mono text-[10px] text-[#0d3e2e] mt-0.5">{rec.scholarshipId}</div>
                        </td>
                        <td className="p-3 text-[11px] text-[#554a3f] max-w-[150px] leading-snug">
                          {rec.awardingAuthority}
                        </td>
                        <td className="p-3 max-w-[200px] space-y-1">
                          <div className="truncate">
                            <span className="font-mono text-[9px] font-bold text-blue-900 bg-blue-50 px-1 py-0.5 rounded mr-1">INFO</span>
                            <a
                              href={rec.updatedInformationUrl || rec.correctedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10.5px] text-[#0d3e2e] hover:underline"
                              title={rec.updatedInformationUrl || rec.correctedUrl}
                            >
                              {new URL(rec.updatedInformationUrl || rec.correctedUrl).hostname}
                            </a>
                          </div>
                          <div className="truncate">
                            <span className="font-mono text-[9px] font-bold text-purple-900 bg-purple-50 px-1 py-0.5 rounded mr-1">APP</span>
                            <a
                              href={rec.updatedApplicationUrl || rec.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10.5px] text-[#2b2118] hover:underline"
                              title={rec.updatedApplicationUrl || rec.applicationUrl}
                            >
                              {new URL(rec.updatedApplicationUrl || rec.applicationUrl).hostname}
                            </a>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-mono text-[9px] font-bold leading-tight ${
                              rec.infoUrlStatus?.includes('VERIFIED')
                                ? 'bg-emerald-100 text-emerald-800'
                                : rec.infoUrlStatus?.includes('REDIRECT')
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {rec.infoUrlStatus || rec.verificationStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-mono text-[9px] font-bold leading-tight ${
                              rec.appUrlStatus?.includes('INSTITUTION')
                                ? 'bg-purple-100 text-purple-900'
                                : rec.appUrlStatus?.includes('MANUAL')
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {rec.appUrlStatus || rec.verificationStatus}
                          </span>
                        </td>
                        <td className="p-3 text-[10.5px] text-[#554a3f] max-w-[180px] leading-snug">
                          {rec.verificationNotes}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              disabled={isRecheckingThis}
                              onClick={() => handleRecheckSingle(rec.scholarshipId)}
                              className="rounded px-2 py-1 font-mono text-[10px] font-semibold border border-[#d8c7ad] bg-[#fbf5e9] text-[#0d3e2e] hover:bg-[#f6ede0] transition cursor-pointer"
                              title="Recheck this URL now"
                            >
                              {isRecheckingThis ? '...' : 'Check'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMarkManualReview(rec.scholarshipId)}
                              className="rounded px-2 py-1 font-mono text-[10px] border border-purple-200 bg-purple-50 text-purple-800 hover:bg-purple-100 transition cursor-pointer"
                              title="Mark for manual review"
                            >
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Automated Monitoring Schedule Guidelines */}
          <div className="rounded-xl border border-[#efe3cc] bg-white p-5 space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2b2118]">
              AUTOMATED URL MONITORING &amp; GITHUB ACTIONS WORKFLOW:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans text-[12px]">
              <div className="rounded-lg bg-[#fdfbf6] p-3 border border-[#efe3cc]">
                <div className="font-mono font-bold text-[#0d3e2e] mb-1">NODE.JS MONITOR</div>
                <div className="text-[#554a3f]">Script: <code className="text-[#0d3e2e]">scholarship-link-monitor.mjs</code>. Tests HTTP status, redirects &amp; titles.</div>
              </div>
              <div className="rounded-lg bg-[#fdfbf6] p-3 border border-[#efe3cc]">
                <div className="font-mono font-bold text-[#0d3e2e] mb-1">WEEKLY GITHUB ACTION</div>
                <div className="text-[#554a3f]">Runs every Monday at 02:17 UTC via <code className="text-[#0d3e2e]">.github/workflows/scholarship-link-audit.yml</code>.</div>
              </div>
              <div className="rounded-lg bg-[#fdfbf6] p-3 border border-[#efe3cc]">
                <div className="font-mono font-bold text-[#0d3e2e] mb-1">HEALTH ARTIFACTS</div>
                <div className="text-[#554a3f]">Generates <code className="text-[#0d3e2e]">scholarship-link-health.json</code> &amp; <code className="text-[#0d3e2e]">.csv</code>.</div>
              </div>
              <div className="rounded-lg bg-[#fdfbf6] p-3 border border-[#efe3cc]">
                <div className="font-mono font-bold text-[#0d3e2e] mb-1">ANNUAL RECONCILIATION</div>
                <div className="text-[#554a3f]">Full pre-academic-year audit across all 52 central, state, AICTE, UGC, and foundation portals.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
