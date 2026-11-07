// components/academic-support/FreeLearningResourcesSection.tsx
'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Globe,
  Tag,
  BookOpen
} from 'lucide-react';
import {
  VERIFIED_LEARNING_RESOURCES,
  VerifiedLearningResource,
  ResourceCategory,
  EducationStage
} from '@/lib/academic-data';

interface FreeLearningResourcesSectionProps {
  onSelectResource: (resource: VerifiedLearningResource) => void;
}

const CATEGORIES: ResourceCategory[] = [
  'All Categories',
  'Free Online Courses',
  'Video Lectures',
  'Official Textbooks',
  'Virtual Laboratories',
  'Digital Skills',
  'Research & Thesis',
];

export function FreeLearningResourcesSection({ onSelectResource }: FreeLearningResourcesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = VERIFIED_LEARNING_RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === 'All Categories' || res.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-800 font-bold uppercase mb-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% VERIFIED AUTHENTIC DOMAINS
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
              Verified Free Government &amp; University Learning Portals
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
              Legitimate, free learning resources provided by the Ministry of Education, IITs, NCERT, UGC, AICTE, and Tamil Nadu School Education. Zero paywalls, zero pirated material.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portal name or subject..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9]/50 text-xs text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20 focus:border-[#8c2f39]"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#efe3cc]/60 pt-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#efe3cc]/50 hover:text-[#2b2118]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#8c2f39]/50 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                  {res.category}
                </span>
                <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {res.cost}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] leading-tight">
                  {res.title}
                </h3>
                <p className="text-xs text-[#7a6a5a] flex items-center gap-1.5 mt-1">
                  <Building className="w-3.5 h-3.5 text-[#8c2f39] shrink-0" />
                  <span className="truncate">{res.organisation}</span>
                </p>
              </div>

              <p className="text-xs text-[#2b2118] leading-relaxed line-clamp-3">
                {res.description}
              </p>

              {/* Authority Badge */}
              <div className="p-2.5 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] flex items-center justify-between text-xs">
                <span className="text-[#7a6a5a] text-[11px] font-medium">Governing Body:</span>
                <span className="text-xs font-bold text-[#8c2f39] truncate max-w-[180px]">{res.governingBody}</span>
              </div>

              {/* Supported Languages */}
              <div className="flex items-center gap-1.5 text-xs text-[#7a6a5a]">
                <Globe className="w-3.5 h-3.5 text-[#8c2f39]" />
                <span className="truncate">Languages: {res.languages.join(', ')}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#efe3cc] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelectResource(res)}
                className="px-3 py-1.5 rounded-xl border border-[#efe3cc] bg-white text-[#2b2118] hover:bg-[#fbf5e9] hover:text-[#8c2f39] transition text-xs font-bold cursor-pointer"
              >
                Inspect Details
              </button>

              <a
                href={res.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition text-xs font-bold"
              >
                <span>Direct Access</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
