// components/exams/ExamsOverviewDashboard.tsx
'use client';

import {
  GraduationCap,
  Award,
  Calendar,
  Sparkles,
  BookOpen,
  Briefcase,
  ShieldCheck,
  CheckCircle,
  Clock,
  Landmark,
  Layers,
  ArrowRight,
  IndianRupee,
  Search,
  Bookmark,
  Compass,
  FileCheck2
} from 'lucide-react';
import {
  EXAMINATIONS_DATABASE,
  getExamsStatistics,
  EducationStage,
  ExamRecord
} from '@/lib/exams-data';

interface ExamsOverviewDashboardProps {
  onSelectTab: (tabKey: string) => void;
  onSelectExam: (exam: ExamRecord) => void;
}

export function ExamsOverviewDashboard({
  onSelectTab,
  onSelectExam,
}: ExamsOverviewDashboardProps) {
  const stats = getExamsStatistics();

  const stageQuickLinks: { stage: EducationStage; label: string; count: number; desc: string; targetTab: string }[] = [
    {
      stage: 'Class 10',
      label: 'Class 10 (SSLC)',
      count: EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes('Class 10')).length,
      desc: 'NMMS, TRUSTS, Polytechnic, ITI, TNPSC Group 4 & SSC MTS',
      targetTab: 'state-level',
    },
    {
      stage: 'Class 12',
      label: 'Class 11 - 12 (HSC)',
      count: EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes('Class 12')).length,
      desc: 'NEET UG, JEE Main, TNEA Single Window, CUET, TNGASA, CLAT, TNAU, TANUVAS',
      targetTab: 'national-entrance',
    },
    {
      stage: 'Diploma / Polytechnic',
      label: 'Diploma & ITI Students',
      count: EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes('Diploma / Polytechnic') || e.targetStages.includes('ITI')).length,
      desc: 'Engineering Lateral Entry, SSC JE, RRB JE, and NATS 2.0 Apprenticeships',
      targetTab: 'central-govt',
    },
    {
      stage: 'Undergraduate',
      label: 'College Students & Graduates',
      count: EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes('Undergraduate')).length,
      desc: 'TNPSC Groups, TNUSRB SI, UPSC CSE, SSC CGL, Banking, CAT, GATE, TCS NQT',
      targetTab: 'govt-exams',
    },
    {
      stage: 'Postgraduate',
      label: 'Postgraduates & Research',
      count: EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes('Postgraduate') || e.targetStages.includes('Research / PhD')).length,
      desc: 'UGC NET, CSIR NET, TN-SET, GATE, GPAT, PhD research fellowships',
      targetTab: 'pg-research',
    },
  ];

  const categoryHighlights = [
    {
      key: 'govt-exams',
      title: 'Government Examinations',
      count: EXAMINATIONS_DATABASE.filter((e) => e.isGovernment).length,
      icon: Landmark,
      desc: 'TNPSC, TNUSRB, TRB, UPSC, SSC, Banking & Central statutory posts.',
    },
    {
      key: 'state-level',
      title: 'Tamil Nadu State-Level',
      count: EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'State-Level').length,
      icon: ShieldCheck,
      desc: 'TNEA, TNGASA, Paramedical Single-Window, TNPSC & TRB recruitment.',
    },
    {
      key: 'national-entrance',
      title: 'National Entrances',
      count: EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'National Entrance').length,
      icon: GraduationCap,
      desc: 'JEE Main/Adv, NEET UG, CUET, NATA, CLAT, ICAR & NIFT entrances.',
    },
    {
      key: 'central-govt',
      title: 'Central Government Exams',
      count: EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'Central Government').length,
      icon: Award,
      desc: 'UPSC CSE, NDA, CDS, SSC CGL/CHSL, RRB Railways, IBPS & Defense.',
    },
    {
      key: 'private-univ-entrance',
      title: 'Private Universities',
      count: EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'Private University / Institutional').length,
      icon: Layers,
      desc: 'VITEEE, SRMJEEE, BITSAT, Sathyabama SAEEE, Amrita AEEE & top institutes.',
    },
    {
      key: 'course-wise',
      title: 'Course-Wise 26 Fields',
      count: 26,
      icon: Compass,
      desc: 'Engineering, Medical, Law, Arts, Architecture, Agriculture & Design.',
    },
  ];

  // Upcoming featured examinations
  const featuredExams = EXAMINATIONS_DATABASE.slice(0, 4);

  return (
    <div className="space-y-8 font-sans">
      {/* Hero Banner with Key Metrics */}
      <div className="rounded-3xl bg-gradient-to-br from-[#fbf5e9] via-[#efe3cc]/50 to-[#fdfbf6] border border-[#efe3cc] p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 mb-3">
            <ShieldCheck className="w-4 h-4" /> 100% Official Statutory Examination Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0d3e2e] leading-tight">
            Exams & Opportunity Hub
          </h1>
          <p className="text-stone-700 text-sm sm:text-base mt-2 leading-relaxed">
            Discover every verified examination open to Tamil Nadu students from Class 10 to Postgraduate & Research.
            Understand exact minimum eligibility, master the syllabus roadmap, apply through official statutory portals,
            and explore what high-value degree admissions, government appointments, scholarships, and careers each examination unlocks.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSelectTab('eligibility')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0d3e2e] text-white hover:bg-[#061d15] transition shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Check My Eligibility <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('course-wise')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white border border-[#efe3cc] text-stone-800 hover:bg-[#fbf5e9] transition flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#0d3e2e]" /> Course-Wise Finder (26 Fields)
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('calendar')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white border border-[#efe3cc] text-stone-800 hover:bg-[#fbf5e9] transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#0d3e2e]" /> Examination Calendar
            </button>
          </div>
        </div>

        {/* 4 Key Statistics Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] shadow-sm">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0d3e2e]">
              {stats.total}
            </span>
            <span className="text-xs font-medium text-stone-600 block mt-1">Verified Examinations</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] shadow-sm">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">
              {stats.stateLevelCount}
            </span>
            <span className="text-xs font-medium text-stone-600 block mt-1">Tamil Nadu State Tests</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] shadow-sm">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {stats.centralGovtCount + stats.nationalCount}
            </span>
            <span className="text-xs font-medium text-stone-600 block mt-1">National & Central Exams</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] shadow-sm">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0d3e2e]">
              {stats.freeCount}
            </span>
            <span className="text-xs font-medium text-stone-600 block mt-1">Free / Subsidized Application</span>
          </div>
        </div>
      </div>

      {/* The Core Opportunity Pipeline Explained */}
      <div className="rounded-2xl bg-white border border-[#efe3cc] p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0d3e2e] mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5" /> The Student RSO Opportunity Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mb-6">
          Every examination in this hub connects directly to guaranteed statutory educational or career outcomes.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">1</span>
            <strong className="text-xs text-stone-900 block">Examination</strong>
            <span className="text-[11px] text-stone-500">Discover verified test</span>
          </div>
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">2</span>
            <strong className="text-xs text-stone-900 block">Eligibility</strong>
            <span className="text-[11px] text-stone-500">Age, stage & streams</span>
          </div>
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">3</span>
            <strong className="text-xs text-stone-900 block">Preparation</strong>
            <span className="text-[11px] text-stone-500">Syllabus & blueprints</span>
          </div>
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">4</span>
            <strong className="text-xs text-stone-900 block">Application</strong>
            <span className="text-[11px] text-stone-500">Official statutory portal</span>
          </div>
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">5</span>
            <strong className="text-xs text-stone-900 block">Result & Rank</strong>
            <span className="text-[11px] text-stone-500">Cut-off & scorecards</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0d3e2e]/10 border border-[#0d3e2e]/20">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">6</span>
            <strong className="text-xs text-[#0d3e2e] block">Opportunity</strong>
            <span className="text-[11px] text-stone-700 font-medium">Degrees, Posts & Awards</span>
          </div>
        </div>
      </div>

      {/* Explore by Student Education Stage */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0d3e2e]">
              Explore by Education Stage
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Select your current education level to view all matching examinations and pathways.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stageQuickLinks.map((item) => (
            <div
              key={item.stage}
              onClick={() => onSelectTab(item.targetTab)}
              className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e]/40 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#fbf5e9] text-[#0d3e2e] border border-[#efe3cc]">
                    {item.count} Exams
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  {item.label}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Category Exploration Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0d3e2e]">
              Examination Sectors
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Browse examinations categorized by statutory domains.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryHighlights.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.key}
                onClick={() => onSelectTab(cat.key)}
                className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e]/40 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-stone-500">
                      {cat.count} Tests
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#0d3e2e]">
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured / Trending Examinations */}
      <div className="rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#0d3e2e]">
              Featured Verified Pathways
            </h2>
            <p className="text-xs text-stone-600">
              Prominent examinations with extensive opportunities across Tamil Nadu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('govt-exams')}
            className="text-xs font-bold text-[#0d3e2e] hover:underline flex items-center gap-1"
          >
            View All ({stats.total}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => onSelectExam(exam)}
              className="p-4 rounded-xl bg-white border border-[#efe3cc] hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {exam.shortCode}
                  </span>
                  <span className="text-[10px] text-stone-500">{exam.levelClassification}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0d3e2e] line-clamp-2">
                  {exam.title}
                </h4>
                <p className="text-[11px] text-stone-600 mt-2 line-clamp-2">
                  Unlocks: {exam.linkedOpportunities.expectedOutcome}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Fee: {exam.feeGeneralInr === 0 ? 'Free' : `₹${exam.feeGeneralInr}`}</span>
                <span className="text-[#0d3e2e] font-bold">Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Public Guarantee Box */}
      <div className="rounded-2xl bg-white border border-emerald-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Student Rights & Public Service Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
              Student RSO is an independent public digital service platform. We do not accept advertising,
              coaching institute sponsorships, or paid college recommendations. Every examination, syllabus,
              and application link directs exclusively to verified statutory government and university portals
              (such as DGE Tamil Nadu, NTA, TNPSC, Anna University, UPSC, SSC, and official university registries).
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% Free Public Access
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Official Statutory Portals Only
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Zero Commercial Referral Fees
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
