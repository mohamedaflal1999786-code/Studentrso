'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Compass,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  HeartHandshake,
  History,
  Info,
  Landmark,
  LifeBuoy,
  ListTodo,
  Lock,
  PlusCircle,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  ComprehensiveScholarship,
  GENUINE_SCHOLARSHIP_CATALOGUE,
  EducationStage,
  SchemeCategory,
} from '@/lib/scholarships-data';
import {
  ExtendedStudentProfile,
  parseIncomeRangeToNumeric,
} from '@/lib/scholarship-matcher';
import { ScholarshipCard } from '@/components/scholarships/ScholarshipCard';
import { ScholarshipDetailsModal } from '@/components/scholarships/ScholarshipDetailsModal';
import { ScholarshipOverview } from '@/components/scholarships/ScholarshipOverview';
import { SmartEligibilityChecker } from '@/components/scholarships/SmartEligibilityChecker';
import { PersonalisedRecommendations } from '@/components/scholarships/PersonalisedRecommendations';
import { CompletedPgResearchSection } from '@/components/scholarships/CompletedPgResearchSection';
import { OfficialRedirectModal } from '@/components/scholarships/OfficialRedirectModal';
import { SystemDiagnosticsModal } from '@/components/scholarships/SystemDiagnosticsModal';
import {
  ApplicationRecord,
  ApplicationTrackerSection,
  TrackerApplicationStatus,
} from '@/components/scholarships/ApplicationTrackerSection';
import { DocumentChecklistSection } from '@/components/scholarships/DocumentChecklistSection';
import { RenewalAssistanceSection } from '@/components/scholarships/RenewalAssistanceSection';
import { SupportCentreSection, SupportTicket } from '@/components/scholarships/SupportCentreSection';
import { FindSchemeSection } from '@/components/scholarships/FindSchemeSection';

export type ActiveTab =
  | 'overview'       // 1. Overview
  | 'find-scheme'    // Find Your Scheme / myScheme National Portal
  | 'all'            // 2. All Scholarships
  | 'tn-govt'        // 3. Tamil Nadu Government
  | 'central-govt'   // 4. Central Government
  | 'foundations'    // 5. Recognised Private Foundations
  | 'school'         // 6. School Scholarships (Class 10-12)
  | 'diploma'        // 7. Diploma Scholarships
  | 'ug'             // 8. Undergraduate Scholarships
  | 'pg'             // 9. Postgraduate Scholarships
  | 'research'       // 10. Postgraduate Completion & Research Funding
  | 'matches'        // 11. Smart Eligibility Checker
  | 'recommended'    // 12. Personalised Recommendations
  | 'saved'          // 13. Saved Scholarships
  | 'applications'   // 14. Application Tracker
  | 'documents'      // 15. Document Checklist
  | 'renewals'       // Renewal assistance
  | 'support';       // Support centre

const STORAGE_KEY = 'student-rso-scholarship-v2-state';

const initialProfile: ExtendedStudentProfile = {
  educationStage: '',
  courseName: '',
  courseYear: '',
  previousQualification: '',
  academicPercentage: null,
  annualFamilyIncome: null,
  incomeRange: '',
  domicileState: 'Tamil Nadu',
  district: '',
  studiesInTamilNadu: true,
  communityCategory: '',
  gender: '',
  hasDisability: false,
  studiedInTnGovtSchool: false,
  isFirstGenerationGraduate: false,
  isSingleGirlChild: false,
  phdAdmissionStatus: '',
  hasUgcNetJrf: false,
  hasCsirNetJrf: false,
  hasGate: false,
  hasIcarExam: false,
};

export default function ScholarshipHubPage() {
  const { user, profile: authProfile, loading: authLoading } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [programs] = useState<ComprehensiveScholarship[]>(GENUINE_SCHOLARSHIP_CATALOGUE);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [studentProfile, setStudentProfile] = useState<ExtendedStudentProfile>(initialProfile);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Search & Filters for directory tabs
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('verified');

  // Modals
  const [selectedProgram, setSelectedProgram] = useState<ComprehensiveScholarship | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [redirectProgram, setRedirectProgram] = useState<ComprehensiveScholarship | null>(null);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);
  const [checklistProgramFilter, setChecklistProgramFilter] = useState<ComprehensiveScholarship | null>(null);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [syncStatus, setSyncStatus] = useState<string>('Saved locally');

  // Load state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.bookmarks)) setBookmarkedIds(parsed.bookmarks);
        if (Array.isArray(parsed.applications)) setApplications(parsed.applications);
        if (parsed.checklist) setChecklist(parsed.checklist);
        if (parsed.profile) setStudentProfile(parsed.profile);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          bookmarks: bookmarkedIds,
          applications,
          checklist,
          profile: studentProfile,
        })
      );
    } catch {
      // ignore
    }
  }, [bookmarkedIds, applications, checklist, studentProfile]);

  // Sync with Supabase on user sign-in
  const fetchRemoteData = useCallback(async () => {
    if (!user) return;
    try {
      // 1. Bookmarks
      const bmRes = await fetch('/api/scholarships/bookmarks');
      if (bmRes.ok) {
        const { bookmarks } = await bmRes.json();
        if (Array.isArray(bookmarks) && bookmarks.length > 0) {
          const ids = bookmarks.map((b: any) => b.scholarship_id);
          setBookmarkedIds((prev) => Array.from(new Set([...prev, ...ids])));
        }
      }

      // 2. Applications
      const appRes = await fetch('/api/scholarships/applications');
      if (appRes.ok) {
        const { applications: remoteApps } = await appRes.json();
        if (Array.isArray(remoteApps) && remoteApps.length > 0) {
          setApplications(
            remoteApps.map((a: any) => ({
              id: a.id,
              scholarshipId: a.scholarship_id,
              status: a.status as TrackerApplicationStatus,
              externalReference: a.external_application_reference,
              submissionDate: a.application_submission_date,
              academicYear: a.academic_year,
              isSelfReported: a.is_self_reported,
              institutionVerifiedSelfReport: a.institution_verified_self_report,
              paymentStatusNote: a.payment_status_note,
              disbursedAmount: a.disbursed_amount,
              notes: a.student_notes,
            }))
          );
        }
      }

      // 3. Profile
      const profRes = await fetch('/api/scholarships/profile');
      if (profRes.ok) {
        const { profile: remoteProf } = await profRes.json();
        if (remoteProf) {
          setStudentProfile((prev) => ({
            ...prev,
            educationStage: (remoteProf.education_level as any) || prev.educationStage,
            courseName: remoteProf.current_course || prev.courseName,
            courseYear: remoteProf.current_year || prev.courseYear,
            academicPercentage: remoteProf.academic_percentage ?? prev.academicPercentage,
            incomeRange: remoteProf.annual_income_range || prev.incomeRange,
            annualFamilyIncome: parseIncomeRangeToNumeric(remoteProf.annual_income_range || ''),
            communityCategory: remoteProf.community_category || prev.communityCategory,
            gender: remoteProf.gender || prev.gender,
            district: remoteProf.district || prev.district,
            studiedInTnGovtSchool: remoteProf.studied_in_tn_govt_school ?? prev.studiedInTnGovtSchool,
            hasDisability: remoteProf.has_disability ?? prev.hasDisability,
            isSingleGirlChild: remoteProf.is_single_girl_child ?? prev.isSingleGirlChild,
          }));
        }
      }

      // 4. Support Tickets
      const ticketRes = await fetch('/api/scholarships/support');
      if (ticketRes.ok) {
        const data = await ticketRes.json();
        if (Array.isArray(data.tickets)) setTickets(data.tickets);
      }

      setSyncStatus('Synced to account');
    } catch {
      setSyncStatus('Device-only mode');
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchRemoteData();
    }
  }, [authLoading, user, fetchRemoteData]);

  // Bookmark Toggle
  const toggleBookmark = useCallback(
    async (id: string) => {
      const isAlready = bookmarkedIds.includes(id);
      const next = isAlready ? bookmarkedIds.filter((b) => b !== id) : [...bookmarkedIds, id];
      setBookmarkedIds(next);

      if (user) {
        try {
          if (isAlready) {
            await fetch(`/api/scholarships/bookmarks?scholarshipId=${encodeURIComponent(id)}`, {
              method: 'DELETE',
            });
          } else {
            await fetch('/api/scholarships/bookmarks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ scholarshipId: id }),
            });
          }
        } catch {
          // ignore
        }
      }
    },
    [bookmarkedIds, user]
  );

  // Application Tracker Handlers
  const handleAddApplication = useCallback(
    async (newApp: Omit<ApplicationRecord, 'id' | 'isSelfReported'>) => {
      const tempId = `app-${Date.now()}`;
      const record: ApplicationRecord = {
        id: tempId,
        ...newApp,
        isSelfReported: true,
      };
      setApplications((prev) => [record, ...prev]);

      if (user) {
        try {
          const res = await fetch('/api/scholarships/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newApp),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.application) {
              setApplications((prev) =>
                prev.map((a) => (a.id === tempId ? { ...a, id: data.application.id } : a))
              );
            }
          }
        } catch {
          // ignore
        }
      }
    },
    [user]
  );

  const handleUpdateApplication = useCallback(
    async (id: string, patch: Partial<ApplicationRecord>) => {
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
      if (user) {
        try {
          await fetch('/api/scholarships/applications', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...patch }),
          });
        } catch {
          // ignore
        }
      }
    },
    [user]
  );

  const handleDeleteApplication = useCallback(
    async (id: string) => {
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (user) {
        try {
          await fetch(`/api/scholarships/applications?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
          });
        } catch {
          // ignore
        }
      }
    },
    [user]
  );

  // Checklist Handlers
  const toggleChecklistDoc = useCallback(
    async (docName: string) => {
      const next = { ...checklist, [docName]: !checklist[docName] };
      setChecklist(next);
      if (user) {
        try {
          await fetch('/api/scholarships/checklist', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checklist: next }),
          });
        } catch {
          // ignore
        }
      }
    },
    [checklist, user]
  );

  const resetChecklist = useCallback(() => {
    setChecklist({});
    if (user) {
      fetch('/api/scholarships/checklist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklist: {} }),
      }).catch(() => {});
    }
  }, [user]);

  // Profile Save
  const saveProfileToAccount = useCallback(async () => {
    if (!user) {
      setAuthMode('login');
      setAuthOpen(true);
      return;
    }
    const res = await fetch('/api/scholarships/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        educationLevel: studentProfile.educationStage,
        currentCourse: studentProfile.courseName,
        currentYear: studentProfile.courseYear,
        academicPercentage: studentProfile.academicPercentage,
        annualIncomeRange: studentProfile.incomeRange,
        communityCategory: studentProfile.communityCategory,
        gender: studentProfile.gender,
        district: studentProfile.district,
        state: studentProfile.domicileState,
        studiedInTnGovtSchool: studentProfile.studiedInTnGovtSchool,
        hasDisability: studentProfile.hasDisability,
        isSingleGirlChild: studentProfile.isSingleGirlChild,
      }),
    });
    if (!res.ok) throw new Error('Failed to save profile');
  }, [user, studentProfile]);

  // Modals & Redirection
  const handleViewDetails = useCallback((prog: ComprehensiveScholarship) => {
    setSelectedProgram(prog);
    setDetailsModalOpen(true);
  }, []);

  const handleApplyOfficial = useCallback((prog: ComprehensiveScholarship) => {
    setRedirectProgram(prog);
    setRedirectModalOpen(true);
  }, []);

  const handleTrackApplication = useCallback((prog: ComprehensiveScholarship) => {
    setSelectedProgram(prog);
    setActiveTab('applications');
  }, []);

  const handleOpenChecklistForProgram = useCallback((prog: ComprehensiveScholarship) => {
    setChecklistProgramFilter(prog);
    setActiveTab('documents');
  }, []);

  // Filter schemes according to the active tab / user search
  const filteredPrograms = useMemo(() => {
    return programs
      .filter((p) => {
        // Tab-specific filters for the 15 sections
        if (activeTab === 'tn-govt' && p.category !== 'Tamil Nadu Government') return false;
        if (activeTab === 'central-govt') {
          if (p.category !== 'Central Government' && p.category !== 'AICTE' && p.category !== 'UGC' && p.category !== 'ICAR') return false;
        }
        if (activeTab === 'foundations' && p.category !== 'Institution / Foundation') return false;
        if (activeTab === 'school') {
          const hasSchool = p.educationStages.some((s) => s === 'Class 10' || s === 'Class 11' || s === 'Class 12');
          if (!hasSchool) return false;
        }
        if (activeTab === 'diploma') {
          const hasDiploma = p.educationStages.some((s) => s === 'Diploma' || s === 'ITI');
          if (!hasDiploma) return false;
        }
        if (activeTab === 'ug') {
          const hasUg = p.educationStages.some((s) => s === 'Undergraduate' || s === 'Professional degree' || s === 'Integrated degree');
          if (!hasUg) return false;
        }
        if (activeTab === 'pg') {
          const hasPg = p.educationStages.some((s) => s === 'Postgraduate');
          if (!hasPg) return false;
        }

        // Directory dropdown filters (when on All Scholarships tab)
        if (activeTab === 'all') {
          if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
          if (stageFilter !== 'All' && !p.educationStages.includes(stageFilter as any)) return false;
          if (statusFilter !== 'All') {
            const currentV = p.versions.find((v) => v.isCurrentVersion) || p.versions[0];
            if (currentV?.lifecycleStatus !== statusFilter) return false;
          }
        }

        // Global search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          const target = `${p.name} ${p.tamilName || ''} ${p.provider} ${p.department} ${p.summary} ${p.tags.join(' ')}`.toLowerCase();
          if (!target.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const vA = a.versions.find((v) => v.isCurrentVersion) || a.versions[0];
        const vB = b.versions.find((v) => v.isCurrentVersion) || b.versions[0];
        if (sortBy === 'deadline') {
          if (!vA?.applicationDeadline) return 1;
          if (!vB?.applicationDeadline) return -1;
          return new Date(vA.applicationDeadline).getTime() - new Date(vB.applicationDeadline).getTime();
        }
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(vB?.sourceVerificationDate || '').getTime() - new Date(vA?.sourceVerificationDate || '').getTime();
      });
  }, [programs, activeTab, categoryFilter, stageFilter, statusFilter, searchQuery, sortBy]);

  // Saved programs
  const savedPrograms = useMemo(() => {
    return programs.filter((p) => bookmarkedIds.includes(p.id));
  }, [programs, bookmarkedIds]);

  // 15 Nav Section tabs definition
  const primaryTabs: { id: ActiveTab; label: string; badge?: number | string; icon: any }[] = [
    { id: 'overview', label: '1. Overview', icon: GraduationCap },
    { id: 'find-scheme', label: 'Find Scheme', icon: Compass, badge: 'myScheme ↗' },
    { id: 'all', label: '2. All Schemes', icon: Search, badge: programs.length },
    { id: 'tn-govt', label: '3. TN Government', icon: Landmark, badge: programs.filter((p) => p.category === 'Tamil Nadu Government').length },
    { id: 'central-govt', label: '4. Central Govt', icon: ShieldCheck, badge: programs.filter((p) => p.category === 'Central Government' || p.category === 'AICTE' || p.category === 'UGC' || p.category === 'ICAR').length },
    { id: 'foundations', label: '5. Foundations', icon: HeartHandshake, badge: programs.filter((p) => p.category === 'Institution / Foundation').length },
    { id: 'school', label: '6. School', icon: BookOpen },
    { id: 'diploma', label: '7. Diploma / ITI', icon: ClipboardList },
    { id: 'ug', label: '8. Undergraduate', icon: GraduationCap },
    { id: 'pg', label: '9. Postgraduate', icon: BookOpen },
    { id: 'research', label: '10. Completed PG & Research', icon: Sparkles, badge: 'Sec 10' },
    { id: 'matches', label: '11. Eligibility Checker', icon: Sparkles },
    { id: 'recommended', label: '12. Recommendations', icon: BookOpen },
    { id: 'saved', label: '13. Saved', icon: Bookmark, badge: bookmarkedIds.length },
    { id: 'applications', label: '14. Tracker', icon: ListTodo, badge: applications.length },
    { id: 'documents', label: '15. Checklist', icon: FileCheck2 },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw },
    { id: 'support', label: 'Support', icon: LifeBuoy },
  ];

  return (
    <main className="min-h-screen bg-[#fbf5e9] text-[#2b2118]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#efe3cc] bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#0d3e2e] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Student RSO</span>
            </Link>
            <span className="text-[#efe3cc]">|</span>
            <span className="font-serif text-[17px] font-bold text-[#2b2118] hidden sm:inline">
              Tamil Nadu Scholarship Intelligence Platform
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition"
              title="Inspect Autonomous Source Telemetry & Connectors"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#0d3e2e]" />
                {authProfile?.full_name || user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#0d3e2e] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c]"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Strip */}
      <section className="border-b border-[#efe3cc] bg-[#0d3e2e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <GraduationCap size={13} /> STUDENT RSO 2.0 · TAMIL NADU SCHOLARSHIP INTELLIGENCE PLATFORM
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Discover Scholarships. Unlock Opportunities.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Authentic circulars across Tamil Nadu Welfare, Central Government NSP, AICTE, UGC, ICAR, and Research Councils. Fully autonomous operations without manual administrator data entry.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://www.myscheme.gov.in/find-scheme"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#fbf5e9] shadow-sm flex items-center gap-1.5 transition border border-white/90"
              >
                <Sparkles size={16} className="text-[#0d3e2e]" /> Find Your Scheme (myScheme) <ExternalLink size={14} />
              </a>
              <button
                onClick={() => setActiveTab('research')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 transition"
              >
                Section 10: PG Completion & Research
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 15 Distinct User Interface Section Tabs */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#efe3cc] pb-2 scrollbar-none">
          {primaryTabs.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition ${
                  isActive
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
                {badge !== undefined && (
                  <span
                    className={`ml-0.5 rounded-full px-2 py-0.2 font-mono text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#efe3cc] text-[#7a6a5a]'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* SECTION 1: SCHOLARSHIP HUB OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <FindSchemeSection onCheckLocalEligibility={() => setActiveTab('matches')} />
            <ScholarshipOverview
              programs={programs}
              bookmarkedCount={bookmarkedIds.length}
              trackedCount={applications.length}
              onNavigateTab={(tab) => setActiveTab(tab as ActiveTab)}
              onSelectProgram={handleViewDetails}
              onOpenDiagnostics={() => setDiagnosticsModalOpen(true)}
            />
          </div>
        )}

        {/* FIND YOUR SCHEME DEDICATED TAB */}
        {activeTab === 'find-scheme' && (
          <FindSchemeSection onCheckLocalEligibility={() => setActiveTab('matches')} />
        )}

        {/* SECTION 2 THROUGH 9: DIRECTORY / CATEGORY / STAGE VIEWS */}
        {(activeTab === 'all' ||
          activeTab === 'tn-govt' ||
          activeTab === 'central-govt' ||
          activeTab === 'foundations' ||
          activeTab === 'school' ||
          activeTab === 'diploma' ||
          activeTab === 'ug' ||
          activeTab === 'pg') && (
          <div className="space-y-6">
            {/* Header Description for the active section */}
            <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs">
              <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
                {activeTab === 'all' && 'All Verified Scholarships & Grants'}
                {activeTab === 'tn-govt' && 'Tamil Nadu Government Schemes (BC, MBC, DNC, ADW, TILS, DCE)'}
                {activeTab === 'central-govt' && 'Central Government Scholarships (NSP, AICTE, UGC, ICAR, MoTA, MSJE)'}
                {activeTab === 'foundations' && 'Recognised Private Foundation & Philanthropic Awards'}
                {activeTab === 'school' && 'School Scholarships (Class 10, Class 11, Class 12)'}
                {activeTab === 'diploma' && 'Diploma (Polytechnic) & ITI Scholarships'}
                {activeTab === 'ug' && 'Undergraduate & Professional Degree Scholarships'}
                {activeTab === 'pg' && 'Postgraduate Degree Scholarships'}
              </h2>
              <p className="mt-1 font-sans text-[13px] text-[#7a6a5a]">
                Showing {filteredPrograms.length} verified listings from officially published government circulars and foundation portals.
              </p>

              {/* Search & In-directory Filters */}
              <div className="mt-4 pt-3 border-t border-[#efe3cc] space-y-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a6a5a]"
                  />
                  <input
                    type="text"
                    placeholder="Search by scholarship name, Tamil name, department, or keyword (e.g. Pudhumai Penn, BC Post-Matric, Pragati)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2 pl-10 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
                  />
                </div>

                {activeTab === 'all' && (
                  <div className="grid gap-2 sm:grid-cols-3">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none"
                    >
                      <option value="All">All Categories</option>
                      <option value="Tamil Nadu Government">Tamil Nadu Government</option>
                      <option value="Central Government">Central Government</option>
                      <option value="AICTE">AICTE</option>
                      <option value="UGC">UGC</option>
                      <option value="ICAR">ICAR</option>
                      <option value="Research Council">Research Council</option>
                      <option value="Institution / Foundation">Recognised Foundation</option>
                    </select>

                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none"
                    >
                      <option value="All">All Education Stages</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="ITI">ITI</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Professional degree">Professional Degree</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Completed PG">Completed PG</option>
                      <option value="PhD">PhD</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-[#d8c7ad] bg-white px-2.5 py-1.5 font-sans text-[12px] text-[#2b2118] outline-none"
                    >
                      <option value="verified">Recently Verified First</option>
                      <option value="deadline">Application Deadline</option>
                      <option value="name">Scheme Name (A-Z)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Grid of Scholarship Cards */}
            {filteredPrograms.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center">
                <CircleHelp size={32} className="mx-auto text-[#a08f7e] mb-2" />
                <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                  No matching scholarships found
                </h3>
                <p className="mt-1 font-sans text-[13px] text-[#7a6a5a]">
                  Try adjusting your search keywords or clearing active filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map((item) => (
                  <ScholarshipCard
                    key={item.id}
                    item={item}
                    isBookmarked={bookmarkedIds.includes(item.id)}
                    onToggleBookmark={toggleBookmark}
                    onViewDetails={handleViewDetails}
                    onTrackApplication={handleTrackApplication}
                    onApplyOfficial={handleApplyOfficial}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 10: POSTGRADUATE COMPLETION AND RESEARCH FUNDING */}
        {activeTab === 'research' && (
          <CompletedPgResearchSection
            programs={programs}
            onViewDetails={handleViewDetails}
            onTrackApplication={handleTrackApplication}
          />
        )}

        {/* SECTION 11: SMART ELIGIBILITY CHECKER */}
        {activeTab === 'matches' && (
          <SmartEligibilityChecker
            programs={programs}
            profile={studentProfile}
            onUpdateProfile={setStudentProfile}
            onSaveProfileToAccount={saveProfileToAccount}
            onViewDetails={handleViewDetails}
            onSwitchToRecommendations={() => setActiveTab('recommended')}
            onApplyOfficial={handleApplyOfficial}
          />
        )}

        {/* SECTION 12: PERSONALISED RECOMMENDATIONS */}
        {activeTab === 'recommended' && (
          <PersonalisedRecommendations
            programs={programs}
            profile={studentProfile}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onViewDetails={handleViewDetails}
            onTrackApplication={handleTrackApplication}
            onOpenEligibilityChecker={() => setActiveTab('matches')}
            onApplyOfficial={handleApplyOfficial}
          />
        )}

        {/* SECTION 13: SAVED SCHOLARSHIPS */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
                Saved Scholarships ({savedPrograms.length})
              </h2>
              <p className="font-sans text-[13px] text-[#7a6a5a]">
                Quick access to scholarships you bookmarked for deadline tracking and direct official portal submission.
              </p>
            </div>

            {savedPrograms.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center">
                <Bookmark size={36} className="mx-auto text-[#a08f7e] mb-3" />
                <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
                  No Saved Scholarships Yet
                </h3>
                <p className="mx-auto mt-2 max-w-md font-sans text-[13px] text-[#7a6a5a]">
                  Click the bookmark icon on any scholarship card to save it here.
                </p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c]"
                >
                  <Search size={15} /> Explore All Scholarships
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {savedPrograms.map((item) => (
                  <ScholarshipCard
                    key={item.id}
                    item={item}
                    isBookmarked={true}
                    onToggleBookmark={toggleBookmark}
                    onViewDetails={handleViewDetails}
                    onTrackApplication={handleTrackApplication}
                    onApplyOfficial={handleApplyOfficial}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 14: APPLICATION TRACKER */}
        {activeTab === 'applications' && (
          <ApplicationTrackerSection
            programs={programs}
            applications={applications}
            onAddApplication={handleAddApplication}
            onUpdateApplication={handleUpdateApplication}
            onDeleteApplication={handleDeleteApplication}
            onOpenDetails={handleViewDetails}
          />
        )}

        {/* SECTION 15: DOCUMENT CHECKLIST */}
        {activeTab === 'documents' && (
          <DocumentChecklistSection
            programs={programs}
            checklistState={checklist}
            onToggleDocument={toggleChecklistDoc}
            onResetChecklist={resetChecklist}
            selectedProgramFilter={checklistProgramFilter}
          />
        )}

        {/* RENEWAL ASSISTANCE */}
        {activeTab === 'renewals' && (
          <RenewalAssistanceSection
            programs={programs}
            applications={applications}
            onOpenDetails={handleViewDetails}
            onOpenTracker={() => setActiveTab('applications')}
            onBrowseAll={() => setActiveTab('all')}
          />
        )}

        {/* SUPPORT CENTRE */}
        {activeTab === 'support' && (
          <SupportCentreSection
            programs={programs}
            tickets={tickets}
            onSubmitTicket={async (ticketData) => {
              if (!user) {
                setAuthMode('login');
                setAuthOpen(true);
                throw new Error('Must sign in to submit support tickets');
              }
              const res = await fetch('/api/scholarships/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticketData),
              });
              if (!res.ok) throw new Error('Failed to submit ticket');
              const data = await res.json();
              if (data.ticket) setTickets((prev) => [data.ticket, ...prev]);
            }}
          />
        )}
      </div>

      {/* Details Modal */}
      <ScholarshipDetailsModal
        item={selectedProgram}
        isOpen={detailsModalOpen}
        isBookmarked={selectedProgram ? bookmarkedIds.includes(selectedProgram.id) : false}
        onClose={() => setDetailsModalOpen(false)}
        onToggleBookmark={toggleBookmark}
        onTrackApplication={handleTrackApplication}
        onOpenChecklistForProgram={handleOpenChecklistForProgram}
        onApplyOfficial={handleApplyOfficial}
      />

      {/* Official Redirection Advisory Modal (Part 11) */}
      <OfficialRedirectModal
        program={redirectProgram}
        isOpen={redirectModalOpen}
        onClose={() => setRedirectModalOpen(false)}
      />

      {/* System Diagnostics & Crawler Telemetry Modal (Zero-Admin Autonomous Architecture) */}
      <SystemDiagnosticsModal
        isOpen={diagnosticsModalOpen}
        onClose={() => setDiagnosticsModalOpen(false)}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-[#efe3cc] bg-[#fdfbf6] py-8 text-center text-[12px] text-[#7a6a5a]">
        <div className="mx-auto max-w-7xl px-4 space-y-1">
          <p className="font-semibold text-[#2b2118]">
            Student RSO 2.0 · Tamil Nadu Complete Scholarship Intelligence Platform
          </p>
          <p>
            Public digital infrastructure for educational guidance. Never collects Aadhaar OTPs or banking passwords.
            Final eligibility and disbursements are determined solely by the awarding government authority or registered foundation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              className="font-mono text-[11px] text-[#0d3e2e] hover:underline inline-flex items-center gap-1"
            >
              <Activity size={12} />
              <span>Autonomous Connector Telemetry & Source Status</span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
