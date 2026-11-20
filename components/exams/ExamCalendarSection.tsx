// components/exams/ExamCalendarSection.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { EXAMINATIONS_DATABASE, ExamRecord } from '@/lib/exams-data';

interface ExamCalendarSectionProps {
  onSelectExam: (exam: ExamRecord) => void;
}

export function ExamCalendarSection({ onSelectExam }: ExamCalendarSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'upcoming'>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');

  const quarters = [
    { value: 'all', label: 'All Months' },
    { value: 'q1', label: 'Jan - Mar (Q1)' },
    { value: 'q2', label: 'Apr - Jun (Q2)' },
    { value: 'q3', label: 'Jul - Sep (Q3)' },
    { value: 'q4', label: 'Oct - Dec (Q4)' },
  ];

  const filteredExams = useMemo(() => {
    return EXAMINATIONS_DATABASE.filter((exam) => {
      // 1. Status filter
      if (filterType === 'active' && !exam.importantDates.isDeadlineActive) {
        return false;
      }
      if (filterType === 'upcoming' && exam.importantDates.isExpired) {
        return false;
      }

      // 2. Quarter filter
      if (selectedQuarter !== 'all') {
        const fullDateStr = (exam.importantDates.examinationDate + ' ' + exam.importantDates.applicationDeadline).toLowerCase();
        if (selectedQuarter === 'q1' && !['jan', 'feb', 'mar'].some((m) => fullDateStr.includes(m))) {
          return false;
        }
        if (selectedQuarter === 'q2' && !['apr', 'may', 'jun'].some((m) => fullDateStr.includes(m))) {
          return false;
        }
        if (selectedQuarter === 'q3' && !['jul', 'aug', 'sep'].some((m) => fullDateStr.includes(m))) {
          return false;
        }
        if (selectedQuarter === 'q4' && !['oct', 'nov', 'dec'].some((m) => fullDateStr.includes(m))) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = exam.title.toLowerCase().includes(q);
        const matchesShort = exam.shortCode.toLowerCase().includes(q);
        const matchesDate = exam.importantDates.examinationDate.toLowerCase().includes(q);
        const matchesAuth = exam.conductingAuthority.toLowerCase().includes(q);
        if (!matchesTitle && !matchesShort && !matchesDate && !matchesAuth) return false;
      }

      return true;
    });
  }, [searchQuery, filterType, selectedQuarter]);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 mb-3">
          <Calendar className="w-4 h-4" /> Verified Statutory Schedule
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0d3e2e]">
          Examination Calendar & Key Deadlines
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Chronological schedule of application openings, last dates, admit card downloads, and exam dates
          verified against official gazettes, NTA notifications, TNPSC calendars, and state single-window portals.
        </p>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam, month, or date..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              {quarters.map((q) => (
                <option key={q.value} value={q.value}>
                  {q.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition ${
                filterType === 'all'
                  ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                  : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
              }`}
            >
              All Tests ({EXAMINATIONS_DATABASE.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('active')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition ${
                filterType === 'active'
                  ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                  : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
              }`}
            >
              Registration Open
            </button>
            <button
              type="button"
              onClick={() => setFilterType('upcoming')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition ${
                filterType === 'upcoming'
                  ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                  : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
              }`}
            >
              Active & Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#efe3cc] bg-white shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#fbf5e9] text-stone-700 font-semibold border-b border-[#efe3cc] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Examination</th>
              <th className="py-3.5 px-4">Application Window</th>
              <th className="py-3.5 px-4">Admit Card</th>
              <th className="py-3.5 px-4">Exam Date</th>
              <th className="py-3.5 px-4">Result</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-sans">
            {filteredExams.map((exam) => {
              const dates = exam.importantDates;
              return (
                <tr key={exam.id} className="hover:bg-stone-50/70 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#fbf5e9] text-[#0d3e2e] border border-[#efe3cc] shrink-0">
                        {exam.shortCode}
                      </span>
                      <div>
                        <span
                          onClick={() => onSelectExam(exam)}
                          className="font-semibold text-stone-900 hover:text-[#0d3e2e] cursor-pointer block leading-snug"
                        >
                          {exam.title}
                        </span>
                        <span className="text-[11px] text-stone-500 block">
                          {exam.conductingAuthority}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-stone-800 font-medium">
                      {dates.applicationOpening} to
                    </div>
                    <div className="text-stone-600 text-xs font-semibold">
                      {dates.applicationDeadline}
                    </div>
                    {dates.isDeadlineActive && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Registration Open
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-stone-700 whitespace-nowrap">
                    {dates.admitCardRelease}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <strong className="text-[#0d3e2e] font-bold">
                      {dates.examinationDate}
                    </strong>
                  </td>
                  <td className="py-4 px-4 text-stone-700 whitespace-nowrap">
                    {dates.resultDeclaration}
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectExam(exam)}
                        className="px-2.5 py-1 text-xs font-bold rounded bg-[#0d3e2e] text-white hover:bg-[#061d15] transition"
                      >
                        Details
                      </button>
                      <a
                        href={exam.officialApplicationPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-stone-600 hover:text-[#0d3e2e] transition"
                        title="Official Application Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
