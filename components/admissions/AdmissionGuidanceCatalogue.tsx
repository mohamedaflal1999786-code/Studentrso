// components/admissions/AdmissionGuidanceCatalogue.tsx
'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Building,
  ArrowRight,
  ExternalLink,
  Search,
  Layers,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import {
  AdmissionPathway,
  AdmissionCategory,
  EducationStage,
  ADMISSION_PATHWAYS,
  getPathwaysByStage
} from '@/lib/admissions-data';

interface AdmissionGuidanceCatalogueProps {
  onSelectPathway: (pathway: AdmissionPathway) => void;
  initialStage?: EducationStage;
}

export function AdmissionGuidanceCatalogue({
  onSelectPathway,
  initialStage = 'All Stages',
}: AdmissionGuidanceCatalogueProps) {
  const [selectedStage, setSelectedStage] = useState<EducationStage>(initialStage);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'school', label: 'School Admissions' },
    { id: 'ug-professional', label: 'UG Professional (Engg/Med/Law/Agri)' },
    { id: 'ug-arts-science', label: 'UG Arts & Science (TNGASA)' },
    { id: 'polytechnic-iti', label: 'Polytechnic & Lateral Entry' },
    { id: 'pg-admissions', label: 'Postgraduate (TANCET)' },
    { id: 'phd-research', label: 'Ph.D. & Research' },
    { id: 'national-portal', label: 'National Portals (JoSAA/CUET)' },
  ];

  let filtered = getPathwaysByStage(selectedStage);

  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authority.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.targetStudents.toLowerCase().includes(q) ||
        p.eligibility.toLowerCase().includes(q) ||
        p.portalName.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Filter Controls */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            Complete Admission Guidance Directory
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Verified official admission pathways from Class 10 to PhD &amp; Research across Tamil Nadu and India.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pathways, degree courses, or official authorities..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#efe3cc] text-xs sm:text-sm text-[#2b2118] placeholder-[#7a6a5a]/70 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-white border border-[#efe3cc] text-xs font-semibold text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pathways List */}
      {filtered.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-dashed border-[#efe3cc] text-center space-y-2">
          <Info className="w-8 h-8 text-[#d8c7ad] mx-auto mb-1" />
          <h3 className="font-serif text-base font-bold text-[#2b2118]">No Admission Pathways Found</h3>
          <p className="text-xs text-[#7a6a5a]">Try adjusting your search keywords or switching category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#7a6a5a]">
                    {p.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] font-bold text-emerald-800">
                    {p.selectionMode}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] group-hover:text-[#0d3e2e] transition leading-snug">
                  {p.title}
                </h3>

                <p className="text-xs text-[#7a6a5a] line-clamp-3 leading-relaxed">{p.description}</p>

                <div className="pt-1 space-y-1.5 text-xs text-[#7a6a5a]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-[#0d3e2e] shrink-0" />
                    <span className="truncate font-medium">{p.authority}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#e0a526] shrink-0" />
                    <span className="truncate">{p.applicationPeriod}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#efe3cc] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPathway(p)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Procedure Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={p.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] hover:bg-[#f6ede0] text-[#0d3e2e] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Open official portal"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
