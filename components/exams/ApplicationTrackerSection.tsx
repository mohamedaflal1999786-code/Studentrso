// components/exams/ApplicationTrackerSection.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Bookmark,
  Calendar,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Award,
  AlertCircle,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { EXAMINATIONS_DATABASE, ExamRecord } from '@/lib/exams-data';

export type TrackerStatus =
  | 'Interested / Researching'
  | 'Application Started'
  | 'Application Submitted & Fee Paid'
  | 'Admit Card Downloaded'
  | 'Exam Attended'
  | 'Result Declared'
  | 'Counselling / Selection Attended';

export interface TrackedItem {
  examId: string;
  status: TrackerStatus;
  targetScoreOrRank?: string;
  personalNotes?: string;
  addedAt: string;
}

const STORAGE_KEY = 'student_rso_exam_tracker_v1';

interface ApplicationTrackerSectionProps {
  onSelectExam: (exam: ExamRecord) => void;
  onSelectTab: (tabKey: string) => void;
}

export function ApplicationTrackerSection({
  onSelectExam,
  onSelectTab,
}: ApplicationTrackerSectionProps) {
  const [trackedItems, setTrackedItems] = useState<TrackedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTrackedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading tracker:', e);
    }
    setIsLoaded(true);
  }, []);

  function saveTracker(items: TrackedItem[]) {
    setTrackedItems(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving tracker:', e);
    }
  }

  function handleUpdateStatus(examId: string, newStatus: TrackerStatus) {
    const updated = trackedItems.map((item) =>
      item.examId === examId ? { ...item, status: newStatus } : item
    );
    saveTracker(updated);
  }

  function handleUpdateNotes(examId: string, notes: string) {
    const updated = trackedItems.map((item) =>
      item.examId === examId ? { ...item, personalNotes: notes } : item
    );
    saveTracker(updated);
  }

  function handleRemove(examId: string) {
    const updated = trackedItems.filter((item) => item.examId !== examId);
    saveTracker(updated);
  }

  const statusOptions: TrackerStatus[] = [
    'Interested / Researching',
    'Application Started',
    'Application Submitted & Fee Paid',
    'Admit Card Downloaded',
    'Exam Attended',
    'Result Declared',
    'Counselling / Selection Attended',
  ];

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 mb-3">
          <Bookmark className="w-4 h-4" /> Personal Confidential Tracker
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#8c2f39]">
          My Application Tracker
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Keep track of examinations you are targeting, record your application progress stage-by-stage,
          and store personal reminders. All data remains exclusively on your device.
        </p>

        {/* Privacy & Security Guarantee Banner */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-[#efe3cc] flex items-start gap-3 text-xs text-stone-700">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 block font-semibold">
              Student-Reported Status & Zero Credential Collection
            </strong>
            <span>
              Student RSO never asks for or stores your application passwords, roll numbers, or government credentials.
              All progress entries are stored locally in your browser to help you manage your personal timelines.
            </span>
          </div>
        </div>
      </div>

      {/* Tracked Items List */}
      {trackedItems.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#efe3cc] p-12 text-center shadow-sm">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            No examinations currently tracked
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            You can bookmark any examination across the catalogue, or use the &apos;Find My Exam Opportunities&apos; finder to add target tests here.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => onSelectTab('govt-exams')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#8c2f39] text-white hover:bg-[#72262e] transition"
            >
              Browse Examinations
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('my-opportunities')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 transition"
            >
              Find My Opportunities
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>Tracking <strong>{trackedItems.length}</strong> target examinations</span>
            <span>Local Browser Storage Active</span>
          </div>

          <div className="space-y-4">
            {trackedItems.map((item) => {
              const exam = EXAMINATIONS_DATABASE.find((e) => e.id === item.examId);
              if (!exam) return null;

              return (
                <div
                  key={item.examId}
                  className="rounded-2xl bg-white border border-[#efe3cc] p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#fbf5e9] text-[#8c2f39] border border-[#efe3cc]">
                          {exam.shortCode}
                        </span>
                        <span className="text-xs text-stone-500">{exam.levelClassification}</span>
                      </div>
                      <h4
                        onClick={() => onSelectExam(exam)}
                        className="text-base sm:text-lg font-serif font-bold text-[#8c2f39] hover:underline cursor-pointer"
                      >
                        {exam.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Authority: {exam.conductingAuthority}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={exam.officialApplicationPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8c2f39] text-white hover:bg-[#72262e] transition"
                      >
                        Official Portal <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemove(item.examId)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition"
                        title="Remove from tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Status Selector & Notes Row */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Current Application Stage:
                      </label>
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.examId, e.target.value as TrackerStatus)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Exam Date: <strong>{exam.importantDates.examinationDate}</strong>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Personal Target / Notes:
                      </label>
                      <input
                        type="text"
                        value={item.personalNotes || ''}
                        onChange={(e) => handleUpdateNotes(item.examId, e.target.value)}
                        placeholder="e.g. Target cut-off 195+, revise organic chemistry..."
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
