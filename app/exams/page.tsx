// app/exams/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Compass,
  FileCheck,
  ShieldCheck,
  Building,
  GraduationCap,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  Search,
  Globe,
  FileText,
  User,
  Activity,
  CheckCircle2,
  Award,
  Landmark,
  Bookmark
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  ExamRecord,
  ExamCategoryKey,
  MAIN_EXAM_SECTIONS,
  EXAMINATIONS_DATABASE,
  getExamById
} from '@/lib/exams-data';

// Component Sections
import { ExamsOverviewDashboard } from '@/components/exams/ExamsOverviewDashboard';
import { ExaminationsCatalogueSection } from '@/components/exams/ExaminationsCatalogueSection';
import { CourseWiseExamFinder } from '@/components/exams/CourseWiseExamFinder';
import { StudentEligibilityChecker } from '@/components/exams/StudentEligibilityChecker';
import { ExamCalendarSection } from '@/components/exams/ExamCalendarSection';
import { ApplicationTrackerSection, TrackedItem } from '@/components/exams/ApplicationTrackerSection';
import { ExamDetailModal } from '@/components/exams/ExamDetailModal';
import { ExamsDiagnosticsModal } from '@/components/exams/ExamsDiagnosticsModal';

const TRACKER_STORAGE_KEY = 'student_rso_exam_tracker_v1';

export type ExamNavTab =
  | 'overview'
  | 'govt-exams'
  | 'private-exams'
  | 'state-level'
  | 'central-govt'
  | 'national-entrance'
  | 'private-univ-entrance'
  | 'course-wise'
  | 'pg-research'
  | 'calendar'
  | 'eligibility'
  | 'tracker';

function ExamsHubContent() {
  const { user, profile: authProfile } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = (searchParams.get('tab') as ExamNavTab) || 'overview';
  const examParam = searchParams.get('id');

  const [activeTab, setActiveTab] = useState<ExamNavTab>(tabParam);
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);
  const [savedExamIds, setSavedExamIds] = useState<string[]>([]);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Handle URL query parameters
  useEffect(() => {
    if (tabParam) {
      const validTabs: ExamNavTab[] = [
        'overview',
        'govt-exams',
        'private-exams',
        'state-level',
        'central-govt',
        'national-entrance',
        'private-univ-entrance',
        'course-wise',
        'pg-research',
        'calendar',
        'eligibility',
        'tracker',
      ];
      if (validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [tabParam]);

  // Sync exam id parameter if present
  useEffect(() => {
    if (examParam) {
      const match = getExamById(examParam);
      if (match) {
        setSelectedExam(match);
      }
    }
  }, [examParam]);

  // Load tracked exams from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACKER_STORAGE_KEY);
      if (stored) {
        const parsed: TrackedItem[] = JSON.parse(stored);
        setSavedExamIds(parsed.map((p) => p.examId));
      }
    } catch (e) {
      console.error('Error loading saved exams:', e);
    }
  }, []);

  function handleTabChange(tabKey: ExamNavTab) {
    setActiveTab(tabKey);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabKey);
    router.push(`/exams?${params.toString()}`);
  }

  function handleToggleTrackExam(exam: ExamRecord) {
    try {
      const stored = localStorage.getItem(TRACKER_STORAGE_KEY);
      let items: TrackedItem[] = stored ? JSON.parse(stored) : [];

      if (items.some((i) => i.examId === exam.id)) {
        items = items.filter((i) => i.examId !== exam.id);
      } else {
        items.push({
          examId: exam.id,
          status: 'Interested / Researching',
          addedAt: new Date().toISOString(),
        });
      }
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(items));
      setSavedExamIds(items.map((i) => i.examId));
    } catch (e) {
      console.error('Error saving exam to tracker:', e);
    }
  }

  const isExamSaved = selectedExam ? savedExamIds.includes(selectedExam.id) : false;

  const navTabs: { id: ExamNavTab; label: string; icon: any }[] = [
    { id: 'overview', label: '1. Overview', icon: FileText },
    { id: 'govt-exams', label: '2. Government Examinations', icon: Landmark },
    { id: 'private-exams', label: '3. Private Examinations', icon: Building },
    { id: 'state-level', label: '4. State-Level Examinations', icon: ShieldCheck },
    { id: 'central-govt', label: '5. Central Government Exams', icon: Award },
    { id: 'national-entrance', label: '6. National Entrance Exams', icon: GraduationCap },
    { id: 'private-univ-entrance', label: '7. Private University Entrances', icon: Layers },
    { id: 'course-wise', label: '8. Course-Wise Entrance Exams', icon: Compass },
    { id: 'pg-research', label: '9. Postgraduate & Research', icon: Sparkles },
    { id: 'calendar', label: '10. Examination Calendar', icon: Calendar },
    { id: 'eligibility', label: '11. Student Eligibility Finder', icon: CheckCircle2 },
    { id: 'tracker', label: '12. My Application Tracker', icon: Bookmark },
  ];

  return (
    <main className="min-h-screen bg-[#fbf5e9] text-[#2b2118]">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#efe3cc] bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#8c2f39] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Student RSO</span>
            </Link>
            <span className="text-[#efe3cc]">|</span>
            <span className="font-serif text-[17px] font-bold text-[#2b2118] hidden sm:inline">
              Student Examination & Opportunity Hub
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition"
              title="Inspect Official Government & University Source Telemetry"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#8c2f39]" />
                {authProfile?.full_name || user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#8c2f39] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#6d1824]"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Strip */}
      <section className="border-b border-[#efe3cc] bg-[#8c2f39] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <Award size={13} /> STUDENT RSO 2.0 · MODULE 04: EXAMS & OPPORTUNITY HUB
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Explore Exams. Discover Your Future.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Discover every verified competitive examination, national entrance, state single-window pathway, and private institutional test open to Tamil Nadu students from Class 10 to PhD scholars.
                Understand exact minimum eligibility, master the syllabus roadmap, apply through official statutory portals, and explore what high-value degree admissions, government appointments, scholarships, and careers each examination unlocks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleTabChange('eligibility')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#8c2f39] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} /> Check My Eligibility
              </button>
              <button
                onClick={() => handleTabChange('course-wise')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 flex items-center gap-1.5"
              >
                <Compass size={15} /> Course-Wise Finder (26 Fields)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Horizontal Scrolling Tab Bar */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#efe3cc] pb-2 scrollbar-none">
          {navTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition ${
                  isActive
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
                {id === 'tracker' && savedExamIds.length > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#8c2f39]' : 'bg-[#8c2f39] text-white'
                    }`}
                  >
                    {savedExamIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <ExamsOverviewDashboard
            onSelectTab={(tabKey) => handleTabChange(tabKey as ExamNavTab)}
            onSelectExam={(exam) => setSelectedExam(exam)}
          />
        )}

        {activeTab === 'govt-exams' && (
          <ExaminationsCatalogueSection
            categoryKey="govt-exams"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'private-exams' && (
          <ExaminationsCatalogueSection
            categoryKey="private-exams"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'state-level' && (
          <ExaminationsCatalogueSection
            categoryKey="state-level"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'central-govt' && (
          <ExaminationsCatalogueSection
            categoryKey="central-govt"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'national-entrance' && (
          <ExaminationsCatalogueSection
            categoryKey="national-entrance"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'private-univ-entrance' && (
          <ExaminationsCatalogueSection
            categoryKey="private-univ-entrance"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'course-wise' && (
          <CourseWiseExamFinder
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'pg-research' && (
          <ExaminationsCatalogueSection
            categoryKey="pg-research"
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'calendar' && (
          <ExamCalendarSection
            onSelectExam={(exam) => setSelectedExam(exam)}
          />
        )}

        {activeTab === 'eligibility' && (
          <StudentEligibilityChecker
            onSelectExam={(exam) => setSelectedExam(exam)}
            onTrackExam={handleToggleTrackExam}
            savedExamIds={savedExamIds}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTrackerSection
            onSelectExam={(exam) => setSelectedExam(exam)}
            onSelectTab={(tabKey) => handleTabChange(tabKey as ExamNavTab)}
          />
        )}
      </div>

      {/* Examination Opportunity Detail Modal */}
      <ExamDetailModal
        exam={selectedExam}
        onClose={() => setSelectedExam(null)}
        onTrackExam={handleToggleTrackExam}
        isSaved={isExamSaved}
      />

      {/* Official Diagnostics Modal */}
      <ExamsDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#efe3cc] bg-[#fdfbf6] py-8 px-4 text-center font-sans text-[12px] text-[#7a6a5a] mt-16">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-[#2b2118]">
            Student Rights, Services & Opportunities Platform (Student RSO 2.0)
          </p>
          <p>
            Module 04: Exams & Opportunity Hub — Public Service Intelligence for Tamil Nadu Students.
          </p>
          <p className="text-[11px] text-[#7a6a5a]/80">
            All examination dates, eligibility rules, syllabi, and statutory fee waivers are verified against official gazettes and statutory authorities (NTA, TNPSC, Anna University, UPSC, SSC, DGE Tamil Nadu).
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function ExamsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf5e9] flex items-center justify-center p-6 text-center font-sans">
          <div className="space-y-3">
            <div className="w-8 h-8 border-3 border-[#8c2f39] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-[#8c2f39]">
              Loading Examination & Opportunity Hub...
            </p>
          </div>
        </div>
      }
    >
      <ExamsHubContent />
    </Suspense>
  );
}
