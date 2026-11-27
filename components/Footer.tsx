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
    <footer className="w-full bg-[#edf5f0] text-[#1c1917] border-t border-[#d8e5dd] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <img
                alt="Student RSO Emblem"
                className="h-10 sm:h-12 w-auto object-contain"
                src="/images/student-rso-emblem.jpg"
                width={61}
                height={48}
                loading="lazy"
              />
              <div className="h-8 w-px bg-[#d8e5dd] hidden xs:block shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif text-[22px] sm:text-[24px] font-bold text-[#0d3e2e] italic leading-tight">Student RSO</span>
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#57534e] font-semibold">STUDENT RIGHTS · SERVICES · OPPORTUNITIES</span>
              </div>
            </div>
            <p className="font-sans text-[13px] leading-[22px] text-[#57534e] max-w-sm">
              A student-first platform connecting learners with trusted information, essential services, opportunities
              and official support pathways — from secondary education to postgraduate study.
            </p>
          </div>

          {/* Column 1: Modules */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#0d3e2e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d3e2e]"></span>
              <span>Modules</span>
            </span>
            {services.map((s) => {
              const hasDedicatedRoute = s.route && s.route.startsWith('/');
              if (hasDedicatedRoute) {
                return (
                  <Link
                    key={s.id}
                    href={s.route!}
                    className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5"
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
                  className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors cursor-pointer text-left py-0.5"
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          {/* Column 2: Student Journey */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#0d3e2e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d3e2e]"></span>
              <span>Student Journey</span>
            </span>
            <Link href="/admissions" className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5">
              Class 10 Foundation
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5">
              Class 11–12 Senior Cycle
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5">
              Undergraduate Degree
            </Link>
            <Link href="/admissions" className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5">
              Postgraduate &amp; Research
            </Link>
          </div>

          {/* Column 3: Governance */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[14px] font-bold text-[#0d3e2e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d3e2e]"></span>
              <span>Governance</span>
            </span>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors cursor-pointer text-left py-0.5"
            >
              Official Sources
            </button>
            <button
              type="button"
              onClick={() => handleFooterNav('about')}
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors cursor-pointer text-left py-0.5"
            >
              Verification Standards
            </button>
            <Link
              href="/privacy"
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5"
            >
              Privacy &amp; Data Ethics
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5"
            >
              Terms of Public Service
            </Link>
            <Link
              href="/accessibility"
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5"
            >
              Accessibility Standards
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[13px] text-[#57534e] hover:text-[#0d3e2e] transition-colors text-left py-0.5"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#d8e5dd] flex flex-col gap-3">
          <p className="font-sans text-[12px] sm:text-[13px] leading-relaxed text-[#57534e]">
            Platform Disclaimer: Student RSO is an independent student information and navigation platform. It does not
            replace government departments, educational institutions, examination authorities, statutory bodies or
            official service providers. Applications, decisions, certificates and official processes remain subject to
            the respective authority&apos;s rules and procedures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-[#57534e]">© 2026 Student RSO. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-5 gap-y-2 text-xs text-[#57534e]">
              <Link
                href="/privacy"
                className="hover:text-[#0d3e2e] transition-colors cursor-pointer"
              >
                Privacy
              </Link>
              <span aria-hidden="true" className="text-[#788a80]">·</span>
              <Link
                href="/terms"
                className="hover:text-[#0d3e2e] transition-colors cursor-pointer"
              >
                Terms
              </Link>
              <span aria-hidden="true" className="text-[#788a80]">·</span>
              <Link
                href="/accessibility"
                className="hover:text-[#0d3e2e] transition-colors cursor-pointer"
              >
                Accessibility
              </Link>
              <span aria-hidden="true" className="text-[#788a80]">·</span>
              <Link
                href="/contact"
                className="hover:text-[#0d3e2e] transition-colors cursor-pointer"
              >
                Contact
              </Link>
              <span aria-hidden="true" className="text-[#788a80]">·</span>
              <a
                href="mailto:studentrsoin@gmail.com"
                className="hover:text-[#0d3e2e] transition-colors cursor-pointer font-mono"
              >
                studentrsoin@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
