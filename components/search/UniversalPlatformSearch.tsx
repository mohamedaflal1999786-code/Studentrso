// components/search/UniversalPlatformSearch.tsx
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  BookOpen,
  FileCheck,
  GraduationCap,
  Briefcase,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import {
  SearchEntry,
  PLATFORM_SEARCH_INDEX,
  POPULAR_SHORTCUTS,
} from '@/lib/platform-search-index';

export function UniversalPlatformSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items matching query
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return PLATFORM_SEARCH_INDEX.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.description.toLowerCase().includes(q)) return true;
      if (item.badge.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      return item.keywords.some((kw) => kw.toLowerCase().includes(q));
    }).slice(0, 8); // Top 8 most relevant results
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectResult = (url: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto px-4 sm:px-0">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8c2f39]/20 via-[#e09f3e]/20 to-[#8c2f39]/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative flex items-center bg-[#fffdf9] border-2 border-[#d8c7ad] group-focus-within:border-[#8c2f39] rounded-2xl shadow-sm transition-all overflow-hidden px-4 py-3 sm:py-3.5">
          <Search size={20} className="text-[#8c2f39] shrink-0 mr-3" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search 10 modules, scholarships, certificates, exams, safety 112, admissions..."
            className="w-full bg-transparent text-[#2b2118] text-[14px] sm:text-[15px] font-sans placeholder-[#8c7b6d] focus:outline-none"
            aria-label="Search Student RSO services and shortcuts"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-[#8c7b6d] hover:text-[#2b2118] hover:bg-[#f6ede0] transition shrink-0 ml-2 cursor-pointer"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-3 border-l border-[#d8c7ad] text-[11px] font-bold text-[#8c2f39] shrink-0">
            <Sparkles size={12} className="text-[#e09f3e]" />
            <span>Instant Finder</span>
          </div>
        </div>
      </div>

      {/* Popular Quick Shortcuts Underneath */}
      {!query && (
        <div className="mt-3 flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
          <span className="text-[11px] font-bold text-[#5c4a3b] uppercase tracking-wider mr-1">
            Quick Shortcuts:
          </span>
          {POPULAR_SHORTCUTS.slice(0, 6).map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fbf5e9] hover:bg-[#8c2f39] text-[#8c2f39] hover:text-white border border-[#d8c7ad] text-[11.5px] font-semibold transition shadow-2xs"
            >
              <span>{item.label}</span>
              <ChevronRight size={11} className="opacity-60" />
            </Link>
          ))}
        </div>
      )}

      {/* Live Dropdown Results */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-4 right-4 sm:left-0 sm:right-0 mt-2 bg-[#fffdf9] border-2 border-[#d8c7ad] rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[460px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 bg-[#f6ede0] border-b border-[#efe3cc] flex items-center justify-between text-[11px] font-bold text-[#8c2f39]">
            <span>Search Results ({results.length})</span>
            <span className="font-normal text-[#5c4a3b]">Use ↑ ↓ arrows, Enter to jump</span>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center">
              <Search size={32} className="mx-auto text-[#8c7b6d]/60 mb-2" />
              <p className="text-[14px] font-bold text-[#2b2118]">No exact source found for &quot;{query}&quot;</p>
              <p className="text-[12px] text-[#5c4a3b] mt-1">
                Try searching for keywords like &quot;scholarship&quot;, &quot;safety&quot;, &quot;esevai&quot;, &quot;neet&quot;, &quot;tnea&quot;, or ask our Brain Chatbot!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#efe3cc]">
              {results.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer transition ${
                    selectedIndex === idx ? 'bg-[#f6ede0]/80' : 'hover:bg-[#f6ede0]/40'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#fbf5e9] border border-[#d8c7ad] flex items-center justify-center shrink-0 mt-0.5 text-[#8c2f39]">
                      {item.category === 'Module' ? (
                        <BookOpen size={16} />
                      ) : item.category === 'Safety & Helpline' ? (
                        <PhoneCall size={16} className="text-red-700" />
                      ) : item.category === 'Certificate' ? (
                        <FileCheck size={16} className="text-emerald-700" />
                      ) : item.category === 'Exam' ? (
                        <GraduationCap size={16} className="text-blue-700" />
                      ) : item.category === 'Internship' ? (
                        <Briefcase size={16} className="text-amber-700" />
                      ) : (
                        <Sparkles size={16} className="text-[#8c2f39]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[14px] text-[#2b2118] truncate">
                          {item.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#8c2f39]/10 text-[#8c2f39] text-[10px] font-bold border border-[#8c2f39]/20 shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#5c4a3b] mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-[12px] font-bold text-[#8c2f39]">
                    <span className="hidden sm:inline">Go to source</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="px-4 py-2.5 bg-[#fbf5e9] border-t border-[#efe3cc] flex items-center justify-between text-[11px] text-[#5c4a3b]">
            <span>Need more personalized guidance?</span>
            <span className="font-bold text-[#8c2f39]">Ask our movable Brain Guide bot!</span>
          </div>
        </div>
      )}
    </div>
  );
}
