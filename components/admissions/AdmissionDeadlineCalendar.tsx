// components/admissions/AdmissionDeadlineCalendar.tsx
'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter
} from 'lucide-react';
import { ADMISSION_DEADLINES_CALENDAR, AdmissionDeadlineItem } from '@/lib/admissions-data';

export function AdmissionDeadlineCalendar() {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered =
    filterStatus === 'All'
      ? ADMISSION_DEADLINES_CALENDAR
      : ADMISSION_DEADLINES_CALENDAR.filter((d) => d.status === filterStatus);

  function getStatusBadge(status: AdmissionDeadlineItem['status']) {
    switch (status) {
      case 'Open':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Closing Soon':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Upcoming':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Schedule Awaited':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      default:
        return 'bg-[#fbf5e9] text-[#7a6a5a] border-[#efe3cc]';
    }
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            Admission Deadlines &amp; Notification Centre
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Statutory admission application windows, counselling periods, and official gazette notifications for 2026-27.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Open', 'Upcoming', 'Closing Soon', 'Schedule Awaited'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-[#0d3e2e] text-white shadow-xs'
                  : 'bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Deadlines Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#7a6a5a]">
                  {item.level}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-bold ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#2b2118] leading-snug">{item.title}</h3>

              <div className="flex items-center gap-1.5 text-xs text-[#7a6a5a]">
                <Building className="w-3.5 h-3.5 text-[#0d3e2e] shrink-0" />
                <span className="truncate">{item.authority}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#7a6a5a]">Opening Date:</span>
                  <span className="font-bold text-[#2b2118]">{item.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a6a5a]">Closing Date:</span>
                  <span className="font-bold text-[#0d3e2e]">{item.closingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a6a5a]">Counselling:</span>
                  <span className="font-medium text-[#2b2118]">{item.counsellingDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#efe3cc] flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#7a6a5a] font-mono">
                Verified: {item.lastVerified}
              </span>
              <a
                href={item.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0d3e2e] hover:underline flex items-center gap-1"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
