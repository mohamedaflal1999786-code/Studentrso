'use client';

import Link from 'next/link';
import { services } from '@/lib/data';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  function handleFooterNav(target: string) {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = `/#${target}`;
      return;
    }
    onNavigate(target);
  }

  return (
    <footer className="w-full bg-[#fbf5e9] text-[#2b2118] border-t-2 border-[#efe3cc] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <img
                alt="Student RSO Emblem"
                className="h-10 sm:h-12 w-auto object-contain"
                src="/images/student-rso-emblem.png"
              />
              <div className="h-8 w-px bg-[#d8c7ad] hidden xs:block shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif text-[22px] sm:text-[24px] font-bold text-[#8c2f39] italic leading-tight">Student RSO</span>
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#7a6a5a] font-semibold">STUDENT RIGHTS · SERVICES · OPPORTUNITIES</span>
              </div>
            </div>
            <p className="font-sans text-[13px] leading-[22px] text-[#5c4a3b] max-w-sm">
              A student-first platform connecting learners with trusted information, essential services, opportunities
              and official support pathways — from secondary education to postgraduate study.
            </p>
          </div>

          {/* Column 1: Modules */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#8c2f39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfa052]"></span>
              <span>Modules</span>
            </span>
            {services.map((s) => {
              const hasDedicatedRoute = s.route && s.route.startsWith('/');
              if (hasDedicatedRoute) {
                return (
                  <Link
                    key={s.id}
                    href={s.route!}
                    className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5"
                  >
                    {s.title}
                  </Link>
                );
              }
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleFooterNav('modules')}
                  className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors cursor-pointer text-left py-0.5"
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          {/* Column 2: Student Journey */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#8c2f39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfa052]"></span>
              <span>Student Journey</span>
            </span>
            <Link href="/admissions" className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5">
              Class 10 Foundation
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5">
              Class 11–12 Senior Cycle
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5">
              Undergraduate Degree
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5">
              Postgraduate &amp; Research
            </Link>
          </div>

          {/* Column 3: Governance */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#8c2f39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfa052]"></span>
              <span>Governance</span>
            </span>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors cursor-pointer text-left py-0.5"
            >
              Official Sources
            </button>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors cursor-pointer text-left py-0.5"
            >
              Verification Standards
            </button>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors cursor-pointer text-left py-0.5"
            >
              Privacy &amp; Data Ethics
            </button>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors cursor-pointer text-left py-0.5"
            >
              Terms of Public Service
            </button>
            <a
              href="mailto:support@studentrso.org"
              className="font-sans text-[13px] text-[#5c4a3b] hover:text-[#8c2f39] transition-colors text-left py-0.5"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#efe3cc] flex flex-col gap-3">
          <p className="font-sans text-[12px] sm:text-[13px] leading-relaxed text-[#7a6a5a]">
            Platform Disclaimer: Student RSO is an independent student information and navigation platform. It does not
            replace government departments, educational institutions, examination authorities, statutory bodies or
            official service providers. Applications, decisions, certificates and official processes remain subject to
            the respective authority&apos;s rules and procedures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-[#7a6a5a]">© 2026 Student RSO. All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs text-[#7a6a5a]">
              <button
                type="button"
                onClick={() => handleFooterNav('about')}
                className="hover:text-[#8c2f39] transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span className="text-[#d8c7ad]">·</span>
              <button
                type="button"
                onClick={() => handleFooterNav('about')}
                className="hover:text-[#8c2f39] transition-colors cursor-pointer"
              >
                Terms
              </button>
              <span className="text-[#d8c7ad]">·</span>
              <button
                type="button"
                onClick={() => handleFooterNav('about')}
                className="hover:text-[#8c2f39] transition-colors cursor-pointer"
              >
                Accessibility
              </button>
              <span className="text-[#d8c7ad]">·</span>
              <a
                href="mailto:support@studentrso.org"
                className="hover:text-[#8c2f39] transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
