'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AppIcon } from '@/components/AppIcon';

interface HeaderProps {
  onSignIn: () => void;
  onNavigate: (id: string) => void;
  onOpenProfile: () => void;
  onServiceClick: (id: string) => void;
}

interface NavModuleItem {
  id: string;
  number: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  live: boolean;
}

const MODULES_LIST: NavModuleItem[] = [
  {
    id: 'scholarship-hub',
    number: '01',
    title: 'Module 01 — Scholarship Hub',
    description: 'Scholarship discovery, financial aid, and state welfare schemes',
    route: '/scholarships',
    icon: 'school',
    live: true,
  },
  {
    id: 'safety-and-grievance',
    number: '02',
    title: 'Module 02 — Safety & Grievance System',
    description: 'Anti-ragging, safety reporting, emergency helplines & rights',
    route: '/safety',
    icon: 'shield',
    live: true,
  },
  {
    id: 'certificate-service',
    number: '03',
    title: 'Module 03 — Certificate & Document Service',
    description: 'e-Sevai revenue certificates, academic records & DigiLocker',
    route: '/certificates',
    icon: 'verified_user',
    live: true,
  },
  {
    id: 'exam-and-opportunity-hub',
    number: '04',
    title: 'Module 04 — Exams & Opportunity Hub',
    description: 'Government, national entrance, competitive exams & opportunities',
    route: '/exams',
    icon: 'assignment',
    live: true,
  },
  {
    id: 'ai-career-assistant',
    number: '05',
    title: 'Module 05 — AI Career Assistant',
    description: 'Class 10 to PhD autonomous education & career guidance engine',
    route: '/career-assistant',
    icon: 'psychology',
    live: true,
  },
  {
    id: 'student-admission-continuity',
    number: '06',
    title: 'Module 06 — Student Admission & Education Continuity',
    description: 'Single-window admissions, branch transfers & break of study re-entry',
    route: '/admissions',
    icon: 'how_to_reg',
    live: true,
  },
  {
    id: 'academic-support-learning-centre',
    number: '07',
    title: 'Module 07 — Academic Support & Learning Centre',
    description: 'Curriculum learning resources, remedial roadmaps & exam toolkits',
    route: '/academic-support',
    icon: 'menu_book',
    live: true,
  },
  {
    id: 'internship-skill-exchange',
    number: '08',
    title: 'Module 08 — Internship, Skill & Employment Exchange',
    description: 'Verified internships, NATS apprenticeships, Velaivaaippu & jobs',
    route: '/internships',
    icon: 'work_outline',
    live: true,
  },
  {
    id: 'language-soft-skills-lab',
    number: '09',
    title: 'Module 09 — Language, Soft-Skills & Confidence Lab',
    description: 'Communication, presentation, interview preparation & soft skills',
    route: '/skill-lab',
    icon: 'record_voice_over',
    live: true,
  },
  {
    id: 'digital-safety-cyber-shield',
    number: '10',
    title: 'Module 10 — Digital Safety & Cyber-Wellness Shield',
    description: 'Cyberbullying safeguards, digital privacy & fraud protection (1930)',
    route: '/digital-safety',
    icon: 'gshield',
    live: true,
  },
];

export function Header({ onSignIn, onNavigate, onOpenProfile, onServiceClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopModulesOpen, setDesktopModulesOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('#desktop-modules-container')) {
        setDesktopModulesOpen(false);
      }
    }
    if (desktopModulesOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [desktopModulesOpen]);

  function handleNav(id: string) {
    setMobileOpen(false);
    setServicesOpen(false);
    setDesktopModulesOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      if (id === 'overview') {
        window.location.href = '/';
      } else {
        window.location.href = `/#${id}`;
      }
      return;
    }
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigate(id);
  }

  function handleModuleSelect(m: NavModuleItem) {
    setMobileOpen(false);
    setServicesOpen(false);
    setDesktopModulesOpen(false);
    if (m.route === '/exams') {
      window.location.href = '/exams';
    } else if (m.route === '/certificates') {
      window.location.href = '/certificates';
    } else if (m.route.startsWith('/')) {
      if (typeof window !== 'undefined') {
        window.location.href = m.route;
      }
    } else {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/#modules';
        return;
      }
      onServiceClick(m.id);
    }
  }

  async function handleSignOut() {
    setMobileOpen(false);
    setDesktopModulesOpen(false);
    await signOut();
    window.location.href = '/';
  }

  const displayName = profile?.full_name || user?.email || 'Account';

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f6faf9]/95 backdrop-blur-md border-b border-[#d8e5dd] shadow-[0_2px_12px_rgba(43,33,24,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (typeof window !== 'undefined' && window.location.pathname === '/') {
              e.preventDefault();
              handleNav('overview');
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 cursor-pointer min-w-0 group"
        >
          <img
            alt="Student RSO Emblem"
            className="h-9 w-[46px] sm:h-11 sm:w-[56px] object-contain shrink-0 group-hover:scale-105 transition-transform aspect-[122/96]"
            src="/images/student-rso-emblem.jpg"
            width={56}
            height={44}
            fetchPriority="high"
          />
          <div className="h-7 sm:h-8 w-px bg-[#d8e5dd] hidden xs:block shrink-0" />
          <div className="flex flex-col text-left min-w-0">
            <span className="font-serif text-[18px] sm:text-[23px] font-bold tracking-tight text-[#0d3e2e] italic truncate leading-tight">
              Student RSO
            </span>
            <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-widest text-[#57534e] font-semibold hidden xs:block">
              RIGHTS • SERVICES • OPPORTUNITIES
            </span>
          </div>
        </Link>

        {/* Desktop nav: Home, Modules dropdown, How It Works, About */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault();
                handleNav('overview');
              }
            }}
            className="px-3 py-2 rounded-lg font-sans text-[14px] font-semibold text-[#1c1917] hover:text-[#0d3e2e] hover:bg-[#edf5f0] transition-colors cursor-pointer"
          >
            Home
          </Link>

          {/* Modules Dropdown Container */}
          <div id="desktop-modules-container" className="relative group py-2">
            <button
              id="desktop-modules-button"
              type="button"
              onClick={() => setDesktopModulesOpen(!desktopModulesOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-sans text-[13.5px] font-semibold transition-colors cursor-pointer ${
                desktopModulesOpen
                  ? 'text-[#0d3e2e] bg-[#edf5f0]'
                  : 'text-[#1c1917] hover:text-[#0d3e2e] hover:bg-[#edf5f0]'
              }`}
              aria-expanded={desktopModulesOpen}
            >
              <span>Modules</span>
              <AppIcon
                name="expand_more"
                className={`text-[16px] text-[#57534e] transition-transform ${
                  desktopModulesOpen ? 'rotate-180' : 'group-hover:rotate-180'
                }`}
              />
            </button>

            <div
              className={`absolute left-0 top-full w-[780px] pt-2 z-50 ${
                desktopModulesOpen ? 'block' : 'hidden group-hover:block'
              }`}
            >
              <div className="bg-[#f8fbf9] rounded-2xl border border-[#d8e5dd] shadow-[0_12px_32px_rgba(13,62,46,0.12)] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3.5 border-b border-[#d8e5dd]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#c59b27] font-bold">
                    STUDENT RSO PLATFORM • 10 CORE MODULES
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#edf5f0] border border-[#d8e5dd] font-mono text-[10px] text-[#0d3e2e] font-semibold uppercase tracking-wider">
                    Public Digital Infrastructure
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
                  {MODULES_LIST.map((m) => {
                    const isInternalPage = m.route.startsWith('/');
                    if (isInternalPage) {
                      return (
                        <Link
                          key={m.number}
                          href={m.route}
                          onClick={() => setDesktopModulesOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-[#d8e5dd] hover:bg-[#edf5f0] transition-all text-left cursor-pointer group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0d3e2e] text-white flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform shadow-xs">
                            <AppIcon name={m.icon} className="text-[17px]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-sans text-[13px] font-bold text-[#1c1917] truncate">{m.title}</span>
                              {m.live && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold shrink-0">
                                  LIVE
                                </span>
                              )}
                            </div>
                            <span className="font-sans text-[11px] text-[#57534e] leading-tight line-clamp-1 mt-0.5">
                              {m.description}
                            </span>
                          </div>
                        </Link>
                      );
                    }
                    return (
                      <button
                        key={m.number}
                        type="button"
                        onClick={() => handleModuleSelect(m)}
                        className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-[#d8e5dd] hover:bg-[#edf5f0] transition-all text-left cursor-pointer group/item w-full"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#0d3e2e] text-white flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform shadow-xs">
                          <AppIcon name={m.icon} className="text-[17px]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-[13px] font-bold text-[#1c1917] truncate">{m.title}</span>
                          </div>
                          <span className="font-sans text-[11px] text-[#57534e] leading-tight line-clamp-1 mt-0.5">
                            {m.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                handleNav('how-it-works');
              } else {
                window.location.href = '/';
              }
            }}
            className="px-3 py-1.5 rounded-lg font-sans text-[13.5px] font-semibold text-[#1c1917] hover:text-[#0d3e2e] hover:bg-[#edf5f0] transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                handleNav('about');
              } else {
                window.location.href = '/';
              }
            }}
            className="px-3 py-1.5 rounded-lg font-sans text-[13.5px] font-semibold text-[#1c1917] hover:text-[#0d3e2e] hover:bg-[#edf5f0] transition-colors cursor-pointer"
          >
            About
          </a>

          {user && (
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg font-sans text-[13.5px] font-semibold text-[#0d3e2e] hover:bg-[#edf5f0] transition-colors cursor-pointer"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-sans text-[13px] sm:text-[13.5px] font-semibold text-[#1c1917] hover:text-[#0d3e2e] hover:bg-[#edf5f0] transition-colors cursor-pointer"
              title="My Profile"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#0d3e2e] shadow-xs shrink-0"
                />
              ) : (
                <UserCircle size={22} className="text-[#0d3e2e] shrink-0" />
              )}
              <span className="hidden sm:inline truncate max-w-[120px]">{displayName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-sans text-[13px] sm:text-[14px] font-semibold text-[#08261c] hover:bg-[#dfab2a]/20 border border-[#dfab2a] bg-[#fffdfa] shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          {/* Hamburger menu: ALWAYS visible on mobile & tablet, identically before and after login */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet menu */}
      {mobileOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-[#f8fbf9] border-b border-[#d8e5dd] shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={(e) => {
                setMobileOpen(false);
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault();
                  handleNav('overview');
                }
              }}
              className="block w-full text-left px-3 py-3 rounded-lg font-sans text-[14px] font-semibold text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[44px]"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-lg font-sans text-[14px] font-semibold text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[44px]"
              aria-expanded={servicesOpen}
            >
              <span>Modules</span>
              <AppIcon
                name="expand_more"
                className="text-[16px] text-[#524336] transition-transform"
                style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none' }}
              />
            </button>
            {servicesOpen && (
              <div className="pl-3 space-y-1 pb-2 border-l-2 border-[#d8e5dd] ml-3 my-1">
                {MODULES_LIST.map((m) => {
                  const isInternal = m.route.startsWith('/');
                  if (isInternal) {
                    return (
                      <Link
                        key={m.number}
                        href={m.route}
                        onClick={() => {
                          setMobileOpen(false);
                          setServicesOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-sans text-[13px] text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[40px] text-left"
                      >
                        <AppIcon name={m.icon} className="text-[17px] text-[#0d3e2e]" />
                        <span className="flex-1 font-medium truncate">{m.title}</span>
                        {m.live && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold shrink-0">
                            LIVE
                          </span>
                        )}
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={m.number}
                      type="button"
                      onClick={() => handleModuleSelect(m)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-sans text-[13px] text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[40px] text-left"
                    >
                      <AppIcon name={m.icon} className="text-[17px] text-[#0d3e2e]" />
                      <span className="flex-1 font-medium truncate">{m.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  handleNav('how-it-works');
                } else {
                  window.location.href = '/';
                }
              }}
              className="block w-full text-left px-3 py-3 rounded-lg font-sans text-[14px] font-semibold text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[44px]"
            >
              How It Works
            </a>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  handleNav('about');
                } else {
                  window.location.href = '/';
                }
              }}
              className="block w-full text-left px-3 py-3 rounded-lg font-sans text-[14px] font-semibold text-[#2b2118] hover:bg-[#edf5f0] cursor-pointer min-h-[44px]"
            >
              About
            </a>
            {!user && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onSignIn();
                }}
                className="w-full text-center px-4 py-3 rounded-lg bg-[#0d3e2e] text-white font-sans text-[14px] font-semibold cursor-pointer min-h-[44px] shadow-sm mt-2"
              >
                Sign In
              </button>
            )}
            {user && (
              <div className="pt-2 pb-1 border-t border-[#d8e5dd] mt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#edf5f0] text-[#2b2118] font-sans text-[13px] font-semibold cursor-pointer text-left"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                      className="w-7 h-7 rounded-full object-cover border border-[#0d3e2e] shrink-0"
                    />
                  ) : (
                    <UserCircle size={20} className="text-[#0d3e2e] shrink-0" />
                  )}
                  <span className="truncate flex-1">
                    Student: <strong className="text-[#0d3e2e]">{displayName}</strong>
                  </span>
                </button>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-[#0d3e2e] text-white font-sans text-[14px] font-bold cursor-pointer shadow-sm"
                >
                  Go to Student Dashboard →
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-center px-4 py-2.5 rounded-xl border border-[#d8e5dd] text-[#0d3e2e] font-sans text-[13px] font-semibold cursor-pointer hover:bg-[#edf5f0]"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
