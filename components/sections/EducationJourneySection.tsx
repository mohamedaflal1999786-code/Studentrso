'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

interface EducationJourneySectionProps {
  onNavigate: (id: string) => void;
  onSignIn?: () => void;
}

export function EducationJourneySection({ onNavigate, onSignIn }: EducationJourneySectionProps) {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    window.location.href = '/';
  }

  return (
    <section id="education-journey" className="w-full bg-[#8c2f39] text-white py-14 sm:py-20 lg:py-24 border-t border-[#77212a] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* White bold main heading */}
        <h2 className="font-serif text-[28px] sm:text-[40px] lg:text-[48px] font-bold text-white tracking-tight leading-tight max-w-3xl">
          Your education journey has enough challenges.
        </h2>

        {/* Golden italic subtitle */}
        <p className="font-serif italic text-[#f5cf7b] text-[20px] sm:text-[28px] lg:text-[32px] font-medium tracking-tight mt-2 sm:mt-3 max-w-3xl leading-snug">
          Finding the right information shouldn&apos;t be one of them.
        </p>

        {/* Supporting description */}
        <p className="font-sans text-[14px] sm:text-[16px] lg:text-[17px] text-[#f6ede0] max-w-2xl mt-4 sm:mt-5 mb-8 sm:mb-10 leading-relaxed font-normal">
          Scholarships. Services. Safety. Examinations. Career guidance. Deadlines. One organised starting point.
        </p>

        {/* Two/Three Functional Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Button 1: Explore the Platform (White Button with Burgundy Text & Compass Icon) */}
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('modules');
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-[#f6ede0] text-[#8c2f39] font-sans text-[14px] sm:text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
          >
            <span>Explore the Platform</span>
            <span className="material-symbols-outlined text-[19px] text-[#8c2f39] group-hover:rotate-45 transition-transform">
              explore
            </span>
          </a>

          {/* Conditional Action Buttons based on Auth State */}
          {user ? (
            <>
              {/* Button 2: Open Dashboard */}
              <Link
                href="/dashboard"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#6d1824] hover:bg-[#58131d] border border-[#f5cf7b]/60 hover:border-[#f5cf7b] text-white font-sans text-[14px] sm:text-[15px] font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[19px] text-[#f5cf7b]">dashboard</span>
                <span>Go to Dashboard</span>
              </Link>

              {/* Button 3: Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 sm:py-4 rounded-xl bg-transparent hover:bg-black/20 border border-white/30 hover:border-white text-[#f6ede0] hover:text-white font-sans text-[14px] sm:text-[15px] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[19px]">logout</span>
                <span>Sign Out</span>
              </button>
            </>
          ) : onSignIn ? (
            <button
              type="button"
              onClick={onSignIn}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#6d1824] hover:bg-[#58131d] border border-white/30 hover:border-white text-white font-sans text-[14px] sm:text-[15px] font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[19px]">login</span>
              <span>Sign In</span>
            </button>
          ) : (
            <Link
              href="/auth"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#6d1824] hover:bg-[#58131d] border border-white/30 hover:border-white text-white font-sans text-[14px] sm:text-[15px] font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[19px]">login</span>
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
