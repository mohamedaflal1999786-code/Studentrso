'use client';

import React, { useState } from 'react';
import {
  Building,
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  IndianRupee,
  AlertCircle,
  FileText,
  Filter,
} from 'lucide-react';
import { CERTIFICATES_CATALOGUE, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface GovernmentCertificatesSectionProps {
  onOpenDocModal: (doc: DocumentItem) => void;
}

export function GovernmentCertificatesSection({
  onOpenDocModal,
}: GovernmentCertificatesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'permanent' | 'renewal_tied'>('all');

  const filteredDocs = CERTIFICATES_CATALOGUE.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.code && doc.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'permanent') {
      return doc.validityClassification === 'No routine expiry specified by source';
    }
    if (selectedFilter === 'renewal_tied') {
      return doc.validityClassification !== 'No routine expiry specified by source';
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Building size={14} /> TAMIL NADU REVENUE DEPARTMENT &amp; E-SEVAI
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Government Statutory Certificates
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Official Tamil Nadu e-District services with service codes, fees, processing timelines, and explicit statutory validity criteria.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Direct e-Sevai / Revenue Portals
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-3 pt-2 border-t border-[#efe3cc]">
          <div className="relative">
            <Search size={16} className="text-[#7a6a5a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by certificate name or e-Sevai code (e.g. REV-101)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2.5 pl-10 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              All Services ({CERTIFICATES_CATALOGUE.length})
            </button>
            <button
              onClick={() => setSelectedFilter('permanent')}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedFilter === 'permanent'
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              Permanent Lifetime
            </button>
            <button
              onClick={() => setSelectedFilter('renewal_tied')}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedFilter === 'renewal_tied'
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              Scheme / Periodic Validity
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Clarification Alert */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fbf5e9] p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-[#0d3e2e] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
          <strong className="text-[#2b2118] font-bold block mb-0.5">Authoritative Revenue Guidance:</strong>
          In Tamil Nadu, Community Certificates (REV-101) carry <strong>permanent lifetime validity</strong>.
          Income Certificates (REV-103) do not have a universal 1-year statutory expiry; instead, their validity depends on the receiving scheme (e.g. current financial year for scholarships).
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <CertificateCard
            key={doc.id}
            document={doc}
            onOpenDocModal={onOpenDocModal}
          />
        ))}
      </div>
    </div>
  );
}
