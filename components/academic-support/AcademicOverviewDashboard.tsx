// components/academic-support/AcademicOverviewDashboard.tsx
'use client';

import React from 'react';
import {
  Compass,
  GraduationCap,
  Layers,
  BookOpen,
  Award,
  Brain,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles,
  Laptop,
  MessageSquare,
  HelpCircle,
  Accessibility,
  ArrowRight,
  Target
} from 'lucide-react';
import {
  EducationStage,
  VERIFIED_LEARNING_RESOURCES,
  ACADEMIC_DIFFICULTIES,
  SUBJECT_DIRECTORY,
  STUDY_SKILLS_GUIDES,
  VerifiedLearningResource
} from '@/lib/academic-data';

interface AcademicOverviewDashboardProps {
  selectedStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateTab: (tab: string) => void;
  onSelectResource: (resource: VerifiedLearningResource) => void;
}

const STAGES: { id: EducationStage; label: string; icon: any }[] = [
  { id: 'All Stages', label: 'All Stages', icon: Compass },
  { id: 'Class 10 (SSLC)', label: 'Class 10 (SSLC)', icon: GraduationCap },
  { id: 'Class 11 & 12 (HSC)', label: 'Class 11 & 12 (HSC)', icon: BookOpen },
  { id: 'Diploma & Polytechnic', label: 'Diploma & Polytechnic', icon: Layers },
  { id: 'Undergraduate (UG)', label: 'Undergraduate (UG)', icon: Award },
  { id: 'Postgraduate (PG)', label: 'Postgraduate (PG)', icon: Brain },
  { id: 'PhD & Research', label: 'PhD & Research', icon: FileText },
];

export function AcademicOverviewDashboard({
  selectedStage,
  onSelectStage,
  searchQuery,
  onSearchChange,
  onNavigateTab,
  onSelectResource,
}: AcademicOverviewDashboardProps) {
  // Filter resources based on search and stage
  const filteredResources = VERIFIED_LEARNING_RESOURCES.filter((res) => {
    const matchesStage = selectedStage === 'All Stages' || res.applicableStages.includes(selectedStage);
    const matchesQuery =
      !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Search & Education Stage Filters */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118]">
              Academic Learning Directory &amp; Problem Solver
            </h2>
            <p className="text-xs text-[#7a6a5a]">
              Find verified government learning portals, subject syllabi, and step-by-step guidance for your education level.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search subjects, portals, or study topics..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9]/50 text-xs text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20 focus:border-[#8c2f39]"
            />
          </div>
        </div>

        {/* Stage Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STAGES.map((stg) => {
            const Icon = stg.icon;
            const isSelected = selectedStage === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => onSelectStage(stg.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#efe3cc]/50 hover:text-[#2b2118]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#8c2f39]'}`} />
                <span>{stg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Database Overview Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe3cc] shadow-2xs space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
            Verified Platforms
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8c2f39]">
            {VERIFIED_LEARNING_RESOURCES.length}
          </p>
          <p className="text-[11px] text-[#7a6a5a] leading-tight">
            Official government &amp; university portals with confirmed domains.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe3cc] shadow-2xs space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
            Academic Difficulties
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8c2f39]">
            {ACADEMIC_DIFFICULTIES.length}
          </p>
          <p className="text-[11px] text-[#7a6a5a] leading-tight">
            Step-by-step problem-solving guides from Class 10 to PhD level.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe3cc] shadow-2xs space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
            Subject Directories
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8c2f39]">
            {SUBJECT_DIRECTORY.length}
          </p>
          <p className="text-[11px] text-[#7a6a5a] leading-tight">
            Class 10, HSC, Diploma, and UG/PG course curricula &amp; free courses.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe3cc] shadow-2xs space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
            Study Skill Protocols
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8c2f39]">
            {STUDY_SKILLS_GUIDES.length}
          </p>
          <p className="text-[11px] text-[#7a6a5a] leading-tight">
            Time management, Cornell notes, active recall, and exam strategies.
          </p>
        </div>
      </div>

      {/* Core Academic Support Pillars Navigation Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118]">
          Core Academic Learning Pillars
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          <div
            onClick={() => onNavigateTab('academic-difficulties')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Academic Difficulties &amp; Solutions
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Struggling with mathematics, engineering backlogs, lab reports, or memory recall? Step-by-step verified roadmaps to overcome real academic barriers.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Solutions</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('subject-learning')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Subject-Wise Learning Directory
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Curriculum-aligned textbook links, official syllabi, and free lecture platforms across School, Diploma, and University course streams.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Subjects</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('free-resources')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Verified Free Learning Portals
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Direct access to SWAYAM, NPTEL, DIKSHA, ePathshala, NDLI, Virtual Labs, and TN SCERT. No hidden paywalls or unauthorized downloads.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse Portals</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('exam-prep')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Examination Preparation Support
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Class 10/12 board exams, DOTE polytechnic papers, and Anna University end-semester guidance with official model paper access.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Exam Toolkits</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('study-skills')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Study Skills &amp; Time Management
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Scientifically proven techniques: Cornell Note-taking, Pomodoro block scheduling, and Spaced Repetition for long-term retention.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Master Study Skills</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('digital-skills')}
            className="p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39] transition group cursor-pointer shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] group-hover:text-[#8c2f39] transition">
                Digital &amp; Computer Skills
              </h4>
              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                Document preparation, spreadsheet calculations, Python scientific computing, and cybersecurity safety essentials.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#8c2f39] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Build Digital Skills</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Verified National Platforms Card Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118]">
            Featured Verified Educational Platforms
          </h3>
          <button
            type="button"
            onClick={() => onNavigateTab('free-resources')}
            className="text-xs font-bold text-[#8c2f39] hover:underline cursor-pointer"
          >
            View All ({VERIFIED_LEARNING_RESOURCES.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredResources.slice(0, 6).map((res) => (
            <div
              key={res.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe3cc] hover:border-[#8c2f39]/60 transition shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                    {res.category}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {res.cost}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-sm sm:text-base text-[#2b2118] leading-tight">
                  {res.title}
                </h4>

                <p className="text-xs text-[#7a6a5a] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#8c2f39] shrink-0" />
                  <span className="truncate">{res.organisation}</span>
                </p>

                <p className="text-xs text-[#2b2118] line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#efe3cc]/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectResource(res)}
                  className="px-3 py-1.5 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] text-[#8c2f39] hover:bg-[#efe3cc]/50 transition text-xs font-bold cursor-pointer"
                >
                  View Details
                </button>

                <a
                  href={res.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition text-xs font-bold"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
