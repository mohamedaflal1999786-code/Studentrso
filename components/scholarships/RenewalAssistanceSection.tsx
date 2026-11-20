'use client';

import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  History,
  Info,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { ApplicationRecord } from './ApplicationTrackerSection';
import {
  RenewalStatus,
  NormalizedRenewalInfo,
  normalizeRenewalData,
} from '@/lib/scholarship-renewals';

export type { RenewalStatus, NormalizedRenewalInfo };
export { normalizeRenewalData };

export interface RenewalAssistanceSectionProps {
  programs: any[];
  applications: ApplicationRecord[];
  onOpenDetails: (program: any) => void;
  onOpenTracker: () => void;
  onBrowseAll?: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function RenewalAssistanceSection({
  programs = [],
  applications = [],
  onOpenDetails,
  onOpenTracker,
  onBrowseAll,
  isLoading = false,
  errorMessage = null,
}: RenewalAssistanceSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Safe normalization of all programs
  const normalizedSchemes = useMemo(() => {
    if (!Array.isArray(programs)) return [];
    return programs
      .map((prog) => {
        const renewal = normalizeRenewalData(prog);
        return { program: prog, renewal };
      })
      .filter((item) => item.renewal.isRenewable);
  }, [programs]);

  // Tracked applications matching renewable programs
  const renewableTrackedApps = useMemo(() => {
    if (!Array.isArray(applications) || !Array.isArray(programs)) return [];
    return applications
      .map((app) => {
        const prog = programs.find((p) => p && p.id === app.scholarshipId);
        if (!prog) return null;
        const renewal = normalizeRenewalData(prog);
        if (!renewal.isRenewable) return null;
        return { app, prog, renewal };
      })
      .filter(Boolean) as { app: ApplicationRecord; prog: any; renewal: NormalizedRenewalInfo }[];
  }, [applications, programs]);

  // Filter schemes based on search query and status filter
  const filteredSchemes = useMemo(() => {
    return normalizedSchemes.filter(({ program, renewal }) => {
      if (statusFilter !== 'All' && renewal.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const text = `${program.name || ''} ${program.provider || ''} ${program.department || ''} ${program.category || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [normalizedSchemes, statusFilter, searchQuery]);

  // Status Badge Colors
  const getStatusBadge = (status: RenewalStatus) => {
    switch (status) {
      case 'Renewal Available':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-800">
            <CheckCircle2 size={13} /> Renewal Available
          </span>
        );
      case 'Upcoming Renewal':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-800">
            <Clock size={13} /> Upcoming Renewal
          </span>
        );
      case 'Awaiting Official Notification':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-800">
            <HelpCircle size={13} /> Awaiting Official Notification
          </span>
        );
      case 'Renewal Closed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 font-mono text-[11px] font-bold text-stone-700">
            <XCircle size={13} /> Renewal Closed
          </span>
        );
      case 'Verification Required':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-purple-800">
            <AlertCircle size={13} /> Verification Required
          </span>
        );
      case 'Renewal Not Applicable':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-600">
            Renewal Not Applicable
          </span>
        );
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-12 text-center space-y-3">
        <RefreshCw size={36} className="mx-auto animate-spin text-[#0d3e2e]" />
        <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
          Loading Renewal Assistance Data...
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Retrieving verified academic renewal guidelines and portal statuses.
        </p>
      </div>
    );
  }

  // 2. Error State
  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center space-y-3">
        <ShieldAlert size={36} className="mx-auto text-red-600" />
        <h3 className="font-serif text-[20px] font-bold text-red-950">
          Unable to Load Renewal Data
        </h3>
        <p className="font-sans text-[13px] text-red-800 max-w-md mx-auto">
          {errorMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c]"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] mb-2">
          <RefreshCw size={15} /> CONTINUING SCHOLARS ASSISTANCE
        </div>
        <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
          Scholarship Renewal Assistance
        </h2>
        <p className="mt-1 font-sans text-[14px] leading-relaxed text-[#7a6a5a] max-w-3xl">
          If you received an educational scholarship in your previous academic year, you do not need to register
          as a fresh applicant. Continuing scholars apply through dedicated renewal windows with priority processing.
          Always confirm your academic marks and submission deadlines before applying.
        </p>
      </div>

      {/* Tracked Applications Eligible for Renewal */}
      {renewableTrackedApps.length > 0 && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-[18px] font-bold text-blue-950 flex items-center gap-2">
              <History size={18} className="text-blue-700" />
              Your Tracked Applications Eligible for Renewal ({renewableTrackedApps.length})
            </h3>
            <button
              onClick={onOpenTracker}
              className="font-sans text-[12px] font-bold text-blue-800 hover:underline inline-flex items-center gap-1"
            >
              <span>View in Application Tracker</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {renewableTrackedApps.map(({ app, prog, renewal }) => (
              <div
                key={app.id}
                className="rounded-xl border border-blue-200 bg-white p-4 space-y-2.5 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-blue-800">
                    {prog.category || 'Government Scheme'}
                  </span>
                  {getStatusBadge(renewal.status)}
                </div>

                <h4 className="font-serif text-[16px] font-bold text-[#2b2118] line-clamp-1">
                  {prog.name}
                </h4>

                <div className="text-[12px] text-[#554a3f] space-y-1 bg-[#fbf5e9] rounded-lg p-2.5 border border-[#efe3cc]">
                  <p>
                    <strong>Previous Reference ID:</strong>{' '}
                    <span className="font-mono text-[#2b2118] font-semibold">
                      {app.externalReference || 'Self-reported (No Ref ID)'}
                    </span>
                  </p>
                  <p>
                    <strong>Recorded Cycle:</strong> {app.academicYear || 'Previous Year'} ·{' '}
                    <strong>Status:</strong> {app.status}
                  </p>
                  <p>
                    <strong>Next Renewal Cycle:</strong>{' '}
                    <span className="font-semibold text-[#0d3e2e]">{renewal.academicYear}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenDetails(prog)}
                    className="font-sans text-[12px] font-bold text-[#0d3e2e] hover:underline"
                  >
                    View Guidelines →
                  </button>

                  {renewal.hasReliablePortalLink && renewal.portalUrl ? (
                    <a
                      href={renewal.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#0d3e2e] px-3 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c]"
                    >
                      <span>Open Renewal Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="font-sans text-[11px] text-stone-500 italic">
                      Check college notice board
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Renewal Guidelines by Scheme */}
      <div className="space-y-4">
        {/* Search & Filter Header */}
        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
                Renewal Conditions & Official Portals
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Showing {filteredSchemes.length} verified schemes supporting annual renewal and continuation benefits.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                {normalizedSchemes.length} Renewable Schemes
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
              <input
                type="text"
                placeholder="Search renewal schemes by name, department, or provider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2 pl-9 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {(
                [
                  'All',
                  'Renewal Available',
                  'Upcoming Renewal',
                  'Awaiting Official Notification',
                  'Renewal Closed',
                ] as const
              ).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-lg px-2.5 py-1.5 font-sans text-[12px] font-semibold whitespace-nowrap transition ${
                    statusFilter === st
                      ? 'bg-[#0d3e2e] text-white'
                      : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center space-y-3">
            <BookOpen size={36} className="mx-auto text-[#a08f7e]" />
            <h4 className="font-serif text-[18px] font-bold text-[#2b2118]">
              No renewal opportunities currently match your profile.
            </h4>
            <p className="font-sans text-[13px] text-[#7a6a5a] max-w-md mx-auto">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search terms or filter selection to see other verified renewal guidelines.'
                : 'None of the available schemes currently match your active parameters or need renewal registration.'}
            </p>
            {onBrowseAll && (
              <button
                onClick={onBrowseAll}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] shadow-2xs"
              >
                <span>Browse All Scholarships</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSchemes.map(({ program: prog, renewal }) => (
              <div
                key={prog.id}
                className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Category & Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f6ede0] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
                      {prog.category || 'Government Scheme'}
                    </span>
                    {getStatusBadge(renewal.status)}
                  </div>

                  {/* Title & Provider */}
                  <div>
                    <h4 className="font-serif text-[17px] font-bold leading-snug text-[#2b2118]">
                      {prog.name}
                    </h4>
                    <p className="font-sans text-[12px] text-[#7a6a5a] mt-0.5">
                      {prog.provider} {prog.department && prog.department !== prog.provider ? `· ${prog.department}` : ''}
                    </p>
                  </div>

                  {/* Academic Cycle & Deadline */}
                  <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#efe3cc] bg-[#fbf5e9] p-2.5 font-sans text-[12px] text-[#554a3f]">
                    <div className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#0d3e2e]" />
                      <span>
                        <strong>Eligible Cycle:</strong> {renewal.academicYear}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Deadline:</strong>{' '}
                        {renewal.deadline ? (
                          <span className="font-semibold text-[#2b2118]">{renewal.deadline}</span>
                        ) : (
                          <span className="text-[#7a6a5a]">Not officially announced</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Academic Performance Requirement */}
                  <div className="rounded-xl border border-[#efe3cc] bg-white p-3 space-y-1 text-[12px]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#2b2118]">
                      <GraduationCap size={15} className="text-[#0d3e2e]" />
                      <span>Required Academic Performance:</span>
                    </div>
                    <p className="text-[#554a3f] pl-5">{renewal.academicRequirement}</p>
                  </div>

                  {/* Mandatory Renewal Conditions */}
                  <div className="rounded-xl border border-[#efe3cc] bg-white p-3 space-y-1.5 text-[12px]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#2b2118]">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      <span>Renewal Conditions:</span>
                    </div>
                    <ul className="list-disc pl-5 text-[#554a3f] space-y-0.5">
                      {renewal.conditions.map((cond: string, idx: number) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Renewal Proofs */}
                  <div className="text-[12px] text-[#554a3f]">
                    <span className="font-semibold text-[#2b2118] block mb-1.5">
                      Required Renewal Documents:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {renewal.documents.map((doc: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 text-[11px] text-[#554a3f]"
                        >
                          <FileText size={11} className="text-[#0d3e2e]" />
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar & Official Links */}
                <div className="pt-3 border-t border-[#efe3cc] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenDetails(prog)}
                      className="font-sans text-[12px] font-bold text-[#0d3e2e] hover:underline"
                    >
                      View Complete Scheme Rules →
                    </button>

                    {renewal.notificationUrl && (
                      <a
                        href={renewal.notificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[12px] font-semibold text-[#7a6a5a] hover:text-[#0d3e2e] inline-flex items-center gap-1"
                      >
                        <span>Official Notification</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div>
                    {renewal.hasReliablePortalLink && renewal.portalUrl ? (
                      <a
                        href={renewal.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0d3e2e] py-2 font-sans text-[13px] font-bold text-white transition hover:bg-[#08261c] shadow-2xs"
                      >
                        <span>Official Renewal Portal</span>
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <div className="rounded-lg bg-[#fbf5e9] border border-[#efe3cc] p-2 text-center text-[11px] text-[#7a6a5a]">
                        Please check the official scholarship portal for renewal instructions.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
