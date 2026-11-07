'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Award,
  GraduationCap,
  Briefcase,
  FileText,
  Calendar,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Bell,
  Settings,
  ShieldCheck,
  ChevronRight,
  User,
  BookOpen,
  Send,
  Loader2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Check,
  Building,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { StudentOnboardingModal } from '@/components/onboarding/StudentOnboardingModal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OpportunityRecommendation } from '@/lib/recommendation-engine';
import { SavedOpportunityRecord } from '@/lib/auth-service';

const ALL_10_MODULES = [
  {
    num: '01',
    title: 'Scholarship Hub',
    desc: 'Financial assistance & Tamil Nadu welfare schemes',
    route: '/scholarships',
    icon: 'school',
    accent: '#8c2f39',
  },
  {
    num: '02',
    title: 'Safety & Grievance',
    desc: 'Anti-ragging, emergency helplines & student rights',
    route: '/safety',
    icon: 'shield',
    accent: '#b8543e',
  },
  {
    num: '03',
    title: 'Certificate Service',
    desc: 'e-Sevai community, income & DigiLocker records',
    route: '/certificates',
    icon: 'verified_user',
    accent: '#cfa052',
  },
  {
    num: '04',
    title: 'Exams & Opportunity',
    desc: 'Government, national entrance & competitive exams',
    route: '/exams',
    icon: 'assignment',
    accent: '#2b6cb0',
  },
  {
    num: '05',
    title: 'AI Career Assistant',
    desc: 'Class 10 to PhD autonomous education & career guidance',
    route: '/career-assistant',
    icon: 'psychology',
    accent: '#805ad5',
  },
  {
    num: '06',
    title: 'Admissions & Continuity',
    desc: 'Single-window admissions, branch transfers & re-entry',
    route: '/admissions',
    icon: 'how_to_reg',
    accent: '#319795',
  },
  {
    num: '07',
    title: 'Academic Support',
    desc: 'Curriculum learning roadmaps, NCERT & toolkits',
    route: '/academic-support',
    icon: 'menu_book',
    accent: '#d69e2e',
  },
  {
    num: '08',
    title: 'Internships & Employment',
    desc: 'Verified internships, NATS apprenticeships & jobs',
    route: '/internships',
    icon: 'work_outline',
    accent: '#38a169',
  },
  {
    num: '09',
    title: 'Language & Soft Skills',
    desc: 'Naan Mudhalvan & professional growth training',
    route: '/skill-lab',
    icon: 'record_voice_over',
    accent: '#e53e3e',
  },
  {
    num: '10',
    title: 'Digital Safety & Rights',
    desc: 'Cyber wellness, privacy & student legal protection',
    route: '/digital-safety',
    icon: 'security',
    accent: '#4a5568',
  },
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  // State
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'tracker' | 'notifications' | 'modules'>('recommendations');
  const [recommendations, setRecommendations] = useState<OpportunityRecommendation[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<SavedOpportunityRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Notification Preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    scholarship_alerts: true,
    internship_alerts: true,
    examination_alerts: true,
    admission_alerts: true,
    deadline_reminders: true,
    security_alerts: true,
  });

  const [savingPref, setSavingPref] = useState(false);
  const [prefSavedMessage, setPrefSavedMessage] = useState('');

  // Fetch Dashboard Data
  useEffect(() => {
    async function loadDashboard() {
      setLoadingData(true);
      try {
        const [recRes, oppRes] = await Promise.all([
          fetch('/api/dashboard/recommendations'),
          fetch('/api/dashboard/opportunities'),
        ]);

        if (recRes.ok) {
          const recData = await recRes.json();
          setRecommendations(recData.recommendations || []);
        }

        if (oppRes.ok) {
          const oppData = await oppRes.json();
          setSavedOpportunities(oppData.opportunities || []);
        }
      } catch {
        // Network fallback
      } finally {
        setLoadingData(false);
      }
    }

    loadDashboard();
  }, [profile]);

  // Initial notification pref sync
  useEffect(() => {
    if (profile?.notification_preferences) {
      setNotificationPrefs((prev) => ({
        ...prev,
        ...profile.notification_preferences,
      }));
    }
  }, [profile]);

  // Automated trigger for mandatory student onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('onboarding') === 'true' || (profile && profile.onboarding_completed === false)) {
        setOnboardingOpen(true);
      }
    }
  }, [profile]);

  // Profile completeness calculation
  const completedFields = [
    profile?.full_name,
    profile?.education_level,
    profile?.course,
    profile?.institution_name,
    profile?.annual_family_income,
    profile?.community_category,
    profile?.study_interests?.length,
    profile?.career_interests?.length,
    profile?.learning_preferences?.length,
  ].filter(Boolean).length;
  const completenessPercent = Math.min(100, Math.round((completedFields / 9) * 100));

  // Handler: Save Opportunity to Tracker
  async function handleSaveOpportunity(opp: OpportunityRecommendation) {
    try {
      const res = await fetch('/api/dashboard/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunity_id: opp.id,
          category: opp.category,
          title: opp.title,
          awarding_authority: opp.awardingAuthority,
          official_url: opp.officialUrl,
          deadline: opp.deadline,
          status: 'Saved',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedOpportunities((prev) => [data.opportunity, ...prev.filter((o) => o.opportunity_id !== opp.id)]);
      }
    } catch {
      // Error handling
    }
  }

  // Handler: Update Tracker Status
  async function handleUpdateStatus(opportunityId: string, newStatus: SavedOpportunityRecord['status']) {
    try {
      const res = await fetch('/api/dashboard/opportunities', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunity_id: opportunityId, status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedOpportunities((prev) =>
          prev.map((o) => (o.opportunity_id === opportunityId ? data.opportunity : o))
        );
      }
    } catch {
      // Error handling
    }
  }

  // Handler: Save Notification Preferences
  async function handleSaveNotificationPrefs() {
    setSavingPref(true);
    setPrefSavedMessage('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notification_preferences: notificationPrefs }),
      });
      if (res.ok) {
        setPrefSavedMessage('Alert preferences updated and synced successfully.');
        setTimeout(() => setPrefSavedMessage(''), 3000);
      }
    } catch {
      // Error handling
    } finally {
      setSavingPref(false);
    }
  }

  // Filter recommendations
  const filteredRecs = recommendations.filter((r) => {
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.awardingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.matchReason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter tracker items
  const filteredTracker = savedOpportunities.filter((o) => {
    return statusFilter === 'All' || o.status === statusFilter;
  });

  // Counts for Metric Cards
  const countScholarships = recommendations.filter((r) => r.category === 'Scholarship').length;
  const countExams = recommendations.filter((r) => r.category === 'Examination').length;
  const countAdmissions = recommendations.filter((r) => r.category === 'Admission').length;
  const countInternships = recommendations.filter((r) => r.category === 'Internship').length;
  const countSaved = savedOpportunities.length;
  const countActionDeadlines = savedOpportunities.filter(
    (o) => o.status === 'Preparing Documents' || o.status === 'Applied'
  ).length;

  const studentDisplayName = profile?.full_name || user?.email?.split('@')[0] || 'Student Scholar';
  const studentInitials = studentDisplayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fbf5e9] text-[#2b2118] flex flex-col font-sans selection:bg-[#8c2f39] selection:text-[#fbf5e9]">
      <Header
        onSignIn={() => router.push('/auth')}
        onNavigate={(id) => {
          if (id === 'overview') router.push('/');
        }}
        onOpenProfile={() => setOnboardingOpen(true)}
        onServiceClick={() => {}}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-6 sm:space-y-8 overflow-hidden">
        {/* ========================================================
            1. WELCOME HERO BANNER & STUDENT CREDENTIAL STATUS
        ======================================================== */}
        <section className="bg-gradient-to-r from-[#6d1824] via-[#8c2f39] to-[#5a1b23] text-[#fbf5e9] rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-[#a23d48]">
          {/* Subtle watermark logo pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <img
              src="/images/student-rso-emblem.png"
              alt=""
              className="w-64 h-64 object-contain filter invert"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
              {/* Avatar Initials with Gold Ring */}
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-[#fdfbf6] text-[#8c2f39] font-serif font-bold text-xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0 border-2 border-[#e0a526]">
                {studentInitials}
              </div>

              {/* Identity & Educational Status */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white break-words">
                    {studentDisplayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 size={12} className="text-emerald-400" /> Verified Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#f6ede0] mt-1.5 flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{profile?.education_level || 'Undergraduate'}</span>
                  <span>•</span>
                  <span>{profile?.course || 'Degree Program'}</span>
                  <span>•</span>
                  <span className="text-[#f5cf7b] font-medium">{profile?.institution_name || 'Tamil Nadu Institution'}</span>
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-[#eed8b7] font-mono flex-wrap">
                  <span className="break-all">{profile?.email || user?.email || 'student@studentrso.in'}</span>
                  <span>•</span>
                  <span>{profile?.state || 'Tamil Nadu'}, {profile?.district || 'Chennai'}</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness Ring & Action */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/20 shrink-0 self-start md:self-auto shadow-inner">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#f5cf7b]"
                    strokeDasharray={`${completenessPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-mono font-bold text-white">{completenessPercent}%</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Profile Readiness</p>
                <button
                  type="button"
                  onClick={() => setOnboardingOpen(true)}
                  className="text-xs text-[#f5cf7b] hover:text-white underline font-medium cursor-pointer mt-0.5"
                >
                  {completenessPercent < 100 ? 'Complete Onboarding →' : 'Edit Profile Details'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick-Jump Shortcut Pills inside Banner */}
          <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-[#f6ede0] font-medium mr-1">Quick Pathways:</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('recommendations');
                  setCategoryFilter('Scholarship');
                }}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition cursor-pointer text-xs font-semibold flex items-center"
              >
                Scholarships ({countScholarships})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tracker')}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition cursor-pointer text-xs font-semibold flex items-center"
              >
                Saved Tracker ({countSaved})
              </button>
              <Link
                href="/scholarships#find-scheme"
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#e0a526] hover:bg-[#cfa052] text-[#2b2118] transition text-xs font-bold shadow-xs flex items-center"
              >
                Find Schemes & Eligibility
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOnboardingOpen(true)}
              className="min-h-[38px] py-1.5 text-xs text-[#f5cf7b] hover:underline font-semibold cursor-pointer flex items-center"
            >
              Update Preferences
            </button>
          </div>
        </section>

        {/* ========================================================
            2. 6 KEY METRIC OVERVIEW CARDS (INTERACTIVE)
        ======================================================== */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {/* Card 1: Eligible Scholarships */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('recommendations');
              setCategoryFilter('Scholarship');
            }}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">Scholarships</span>
              <div className="w-8 h-8 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center group-hover:bg-[#8c2f39] group-hover:text-white transition">
                <Award size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countScholarships}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">Eligible Welfare Schemes</p>
          </button>

          {/* Card 2: Recommended Exams */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('recommendations');
              setCategoryFilter('Examination');
            }}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">Target Exams</span>
              <div className="w-8 h-8 rounded-xl bg-[#2b6cb0]/10 text-[#2b6cb0] flex items-center justify-center group-hover:bg-[#2b6cb0] group-hover:text-white transition">
                <FileText size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countExams}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">Entrance & Career Tests</p>
          </button>

          {/* Card 3: Target Admissions */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('recommendations');
              setCategoryFilter('Admission');
            }}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">Admissions</span>
              <div className="w-8 h-8 rounded-xl bg-[#319795]/10 text-[#319795] flex items-center justify-center group-hover:bg-[#319795] group-hover:text-white transition">
                <GraduationCap size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countAdmissions}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">Single-Window Cycles</p>
          </button>

          {/* Card 4: Active Internships */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('recommendations');
              setCategoryFilter('Internship');
            }}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">Internships</span>
              <div className="w-8 h-8 rounded-xl bg-[#38a169]/10 text-[#38a169] flex items-center justify-center group-hover:bg-[#38a169] group-hover:text-white transition">
                <Briefcase size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countInternships}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">Verified Stipend Roles</p>
          </button>

          {/* Card 5: Saved Opportunities */}
          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">Saved Items</span>
              <div className="w-8 h-8 rounded-xl bg-[#cfa052]/20 text-[#8c2f39] flex items-center justify-center group-hover:bg-[#cfa052] group-hover:text-white transition">
                <Bookmark size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countSaved}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">In Personal Tracker</p>
          </button>

          {/* Card 6: Action Deadlines */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('tracker');
              setStatusFilter('Preparing Documents');
            }}
            className="bg-[#fdfbf6] rounded-2xl p-4 border border-[#efe3cc] shadow-xs flex flex-col justify-between hover:border-[#8c2f39] hover:shadow-md transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#7a6a5a]">In Progress</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                <Clock size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-[#2b2118]">{countActionDeadlines}</div>
            <p className="text-[10px] text-[#7a6a5a] mt-1 font-medium">Active Applications</p>
          </button>
        </section>

        {/* ========================================================
            3. DASHBOARD TAB NAVIGATION
        ======================================================== */}
        <div className="flex border-b border-[#efe3cc] gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0]'
            }`}
          >
            <Sparkles size={16} />
            <span>Personalised Recommendations ({recommendations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0]'
            }`}
          >
            <BookmarkCheck size={16} />
            <span>Opportunity Tracker ({savedOpportunities.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0]'
            }`}
          >
            <BookOpen size={16} />
            <span>All 10 Portal Modules</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0]'
            }`}
          >
            <Bell size={16} />
            <span>Alert Preferences</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: PERSONALISED RECOMMENDATIONS
        ======================================================== */}
        {activeTab === 'recommendations' && (
          <section className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#fdfbf6] p-4 rounded-2xl border border-[#efe3cc]">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Scholarship', 'Internship', 'Examination', 'Admission', 'Certificate'].map((cat) => {
                  const count =
                    cat === 'All'
                      ? recommendations.length
                      : recommendations.filter((r) => r.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                        categoryFilter === cat
                          ? 'bg-[#8c2f39] text-white shadow-xs'
                          : 'bg-[#f6ede0] text-[#7a6a5a] hover:text-[#2b2118]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${categoryFilter === cat ? 'bg-white/20 text-white' : 'bg-[#efe3cc] text-[#2b2118]'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#d8c7ad] bg-white text-xs text-[#2b2118] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39]"
                />
                <Search size={14} className="absolute left-3 top-3 text-[#a09080]" />
              </div>
            </div>

            {/* Recommendations Grid */}
            {loadingData ? (
              <div className="py-20 text-center text-[#7a6a5a] space-y-3 bg-[#fdfbf6] rounded-3xl border border-[#efe3cc]">
                <Loader2 size={28} className="animate-spin mx-auto text-[#8c2f39]" />
                <p className="text-sm font-serif font-bold text-[#2b2118]">Evaluating Statutory Opportunities...</p>
                <p className="text-xs text-[#7a6a5a]">Matching eligibility rules to your student profile</p>
              </div>
            ) : filteredRecs.length === 0 ? (
              <div className="py-16 bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] text-center p-6 space-y-2">
                <p className="font-serif font-bold text-lg text-[#2b2118]">No opportunities found</p>
                <p className="text-xs text-[#7a6a5a]">
                  Try adjusting your search filter or updating your onboarding details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecs.map((opp) => {
                  const isSaved = savedOpportunities.some((s) => s.opportunity_id === opp.id);
                  const isStrong = opp.matchStatus === 'Strong Match';
                  const isPossible = opp.matchStatus === 'Possible Match';

                  return (
                    <div
                      key={opp.id}
                      className="bg-[#fdfbf6] rounded-2xl border border-[#efe3cc] p-5 shadow-xs hover:shadow-md hover:border-[#8c2f39]/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Badges */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 px-2 py-0.5 rounded">
                            {opp.category}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              isStrong
                                ? 'bg-emerald-100 text-emerald-800'
                                : isPossible
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {isStrong && <Check size={11} />}
                            {opp.matchStatus}
                          </span>
                        </div>

                        {/* Title & Authority */}
                        <h3 className="font-serif font-bold text-base text-[#2b2118] line-clamp-2 leading-snug">
                          {opp.title}
                        </h3>
                        <p className="text-xs text-[#7a6a5a] mt-1 flex items-center gap-1.5">
                          <Building size={12} className="shrink-0 text-[#a09080]" />
                          <span className="truncate">{opp.awardingAuthority}</span>
                        </p>

                        {/* Match Rationale */}
                        <div className="mt-3 p-3 rounded-xl bg-[#f6ede0] border border-[#efe3cc] text-[11px] text-[#2b2118]">
                          <span className="font-bold text-[#8c2f39]">Why this matches: </span>
                          <span>{opp.matchReason}</span>
                        </div>

                        {/* Highlights */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {opp.highlights.map((h, i) => (
                            <span key={i} className="text-[10px] bg-white border border-[#efe3cc] px-2 py-0.5 rounded font-medium text-[#7a6a5a]">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-5 pt-3 border-t border-[#efe3cc] flex items-center justify-between gap-2">
                        <Link
                          href={opp.moduleRoute}
                          className="text-xs font-semibold text-[#8c2f39] hover:underline flex items-center gap-1"
                        >
                          <span>Module {opp.moduleNumber}</span>
                          <ArrowRight size={12} />
                        </Link>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveOpportunity(opp)}
                            disabled={isSaved}
                            className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                              isSaved
                                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                : 'bg-[#f6ede0] text-[#2b2118] hover:bg-[#8c2f39] hover:text-white'
                            }`}
                            title={isSaved ? 'Saved in Tracker' : 'Save to Personal Tracker'}
                          >
                            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                          </button>

                          <a
                            href={opp.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] transition flex items-center gap-1 shadow-xs"
                          >
                            <span>Apply</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TAB 2: SAVED & APPLIED OPPORTUNITY TRACKER (8 STATUSES)
        ======================================================== */}
        {activeTab === 'tracker' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfbf6] p-4 rounded-2xl border border-[#efe3cc]">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#2b2118]">Application Lifecycle Tracker</h2>
                <p className="text-xs text-[#7a6a5a]">
                  Track progress across 8 official workflow stages from interest to approval.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#7a6a5a]">Stage:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#d8c7ad] bg-white text-xs font-semibold text-[#2b2118]"
                >
                  <option value="All">All Stages ({savedOpportunities.length})</option>
                  <option value="Interested">Interested</option>
                  <option value="Saved">Saved</option>
                  <option value="Preparing Documents">Preparing Documents</option>
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {filteredTracker.length === 0 ? (
              <div className="py-16 bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] text-center p-8 space-y-3">
                <Bookmark size={36} className="mx-auto text-[#a09080]" />
                <h3 className="font-serif font-bold text-lg text-[#2b2118]">No opportunities in this stage</h3>
                <p className="text-xs text-[#7a6a5a] max-w-sm mx-auto">
                  Browse your recommendations tab and click the bookmark button to add scholarships, exams and internships to your tracker.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('recommendations')}
                  className="px-5 py-2.5 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] transition cursor-pointer shadow-xs"
                >
                  Browse Recommendations →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTracker.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#fdfbf6] rounded-2xl border border-[#efe3cc] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-[#cfa052]/20 text-[#8c2f39] px-2 py-0.5 rounded font-bold">
                          {item.category}
                        </span>
                        {item.deadline && (
                          <span className="text-[11px] text-[#7a6a5a] font-mono">Deadline: {item.deadline}</span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#2b2118]">{item.title}</h3>
                      <p className="text-xs text-[#7a6a5a]">{item.awarding_authority}</p>
                    </div>

                    {/* Status Selector & Link */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#7a6a5a] mb-1">Status</span>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleUpdateStatus(item.opportunity_id, e.target.value as SavedOpportunityRecord['status'])
                          }
                          className="px-3 py-1.5 rounded-xl border border-[#d8c7ad] bg-white text-xs font-semibold text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                        >
                          <option value="Interested">Interested</option>
                          <option value="Saved">Saved</option>
                          <option value="Preparing Documents">Preparing Documents</option>
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      <div className="flex flex-col justify-end pt-3">
                        <a
                          href={item.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition shadow-xs"
                          title="Open official authority portal"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TAB 3: ALL 10 PORTAL MODULES SHORTCUTS
        ======================================================== */}
        {activeTab === 'modules' && (
          <section className="space-y-4">
            <div className="bg-[#fdfbf6] p-5 rounded-2xl border border-[#efe3cc]">
              <h2 className="font-serif font-bold text-lg text-[#2b2118]">Student RSO 2.0 Civic Infrastructure</h2>
              <p className="text-xs text-[#7a6a5a] mt-0.5">
                Direct access to all 10 unified student services, roadmaps, and statutory portals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {ALL_10_MODULES.map((m) => (
                <Link
                  key={m.num}
                  href={m.route}
                  className="bg-[#fdfbf6] rounded-2xl border border-[#efe3cc] p-4 shadow-xs hover:border-[#8c2f39] hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[#8c2f39] mb-2">
                      <span className="font-mono text-xs font-bold bg-[#8c2f39]/10 px-2 py-0.5 rounded">
                        Module {m.num}
                      </span>
                      <span className="material-symbols-outlined text-[22px]">{m.icon}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-[#2b2118] group-hover:text-[#8c2f39] transition">
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-[#7a6a5a] mt-1 line-clamp-2">{m.desc}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#efe3cc] text-right">
                    <span className="text-[11px] font-semibold text-[#8c2f39] group-hover:underline flex items-center justify-end gap-1">
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            TAB 4: NOTIFICATION PREFERENCES
        ======================================================== */}
        {activeTab === 'notifications' && (
          <section className="bg-[#fdfbf6] rounded-2xl border border-[#efe3cc] p-6 max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#2b2118]">Email Alert Preferences</h2>
              <p className="text-xs text-[#7a6a5a] mt-0.5">
                Configure which transactional emails and statutory deadlines are dispatched to{' '}
                <strong className="text-[#2b2118]">{profile?.email || user?.email}</strong>.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'scholarship_alerts',
                  label: 'Scholarship Application Windows & Deadlines',
                  desc: 'Notifications when Pudhumai Penn, NSP or Tamil Nadu State schemes open.',
                },
                {
                  key: 'internship_alerts',
                  label: 'Verified Internship & Apprenticeship Openings',
                  desc: 'Curated alerts for Tamil Nadu government and public sector internships.',
                },
                {
                  key: 'examination_alerts',
                  label: 'National & State Competitive Examination Alerts',
                  desc: 'Hall ticket releases, exam dates and result announcements.',
                },
                {
                  key: 'admission_alerts',
                  label: 'Single-Window Admission Updates',
                  desc: 'TNEA engineering, TNGASA arts & science and polytechnic counselling.',
                },
                {
                  key: 'deadline_reminders',
                  label: 'Personal Tracker Deadline Reminders',
                  desc: 'Reminders 48 hours prior to official portal closing dates.',
                },
                {
                  key: 'security_alerts',
                  label: 'Account Security & Verification Notices',
                  desc: 'Alerts regarding logins, password changes and OTP verifications.',
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-[#efe3cc] bg-white cursor-pointer hover:bg-[#f6ede0] transition"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(notificationPrefs[item.key as keyof typeof notificationPrefs])}
                    onChange={(e) =>
                      setNotificationPrefs((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-[#8c2f39] rounded accent-[#8c2f39] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#2b2118]">{item.label}</p>
                    <p className="text-[11px] text-[#7a6a5a] mt-0.5">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {prefSavedMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{prefSavedMessage}</span>
              </div>
            )}

            <button
              type="button"
              disabled={savingPref}
              onClick={handleSaveNotificationPrefs}
              className="px-5 py-2.5 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {savingPref ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              <span>Save Alert Preferences</span>
            </button>
          </section>
        )}
      </main>

      <Footer onNavigate={() => {}} />

      {/* Onboarding Modal */}
      <StudentOnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialProfile={profile}
        onSaved={() => {
          fetch('/api/dashboard/recommendations')
            .then((r) => r.json())
            .then((d) => setRecommendations(d.recommendations || []));
        }}
      />
    </div>
  );
}
