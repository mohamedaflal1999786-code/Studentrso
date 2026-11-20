'use client';

import { AppIcon } from '@/components/AppIcon';
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
    <section id="education-journey" className="w-full bg-[#0d3e2e] text-white py-14 sm:py-20 lg:py-24 border-t border-[#08261c] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Overline with Gold Dash — YOUR NEXT CHAPTER */}
        <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
          <span className="w-8 h-0.5 bg-[#dfab2a] rounded-full" />
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-[#dfab2a] font-bold">
            YOUR NEXT CHAPTER
          </span>
        </div>

        {/* Main Heading — Good things begin with the right direction. */}
        <h2 className="font-serif text-[28px] sm:text-[42px] lg:text-[50px] font-bold text-white tracking-tight leading-tight max-w-3xl">
          Good things begin with the right direction.
        </h2>

        {/* Supporting description */}
        <p className="font-sans text-[15px] sm:text-[17px] lg:text-[18px] text-[#f6ede0] max-w-2xl mt-4 sm:mt-5 mb-8 sm:mb-10 leading-relaxed font-normal">
          Explore support, discover opportunities, and take your next step with confidence.
        </p>

        {/* Functional Action Buttons: Explore the Platform in WHITE, Sign In in GOLD */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Button 1: Explore the Platform (WHITE button with pine green text) */}
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('modules');
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-[#f6ede0] text-[#0d3e2e] font-sans text-[14px] sm:text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
          >
            <span>Explore the platform</span>
            <span className="text-[17px] font-bold leading-none text-[#0d3e2e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>

          {/* Conditional Action Buttons based on Auth State: Sign In in GOLD */}
          {user ? (
            <>
              {/* Button 2: Open Dashboard in GOLD */}
              <Link
                href="/dashboard"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#dfab2a] hover:bg-[#c59b27] text-[#08261c] font-sans text-[14px] sm:text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <AppIcon name="dashboard" className="text-[19px] text-[#08261c]" />
                <span>Go to Dashboard</span>
              </Link>

              {/* Button 3: Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 sm:py-4 rounded-xl bg-transparent hover:bg-black/20 border border-white/30 hover:border-white text-[#f6ede0] hover:text-white font-sans text-[14px] sm:text-[15px] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <AppIcon name="logout" className="text-[19px]" />
                <span>Sign Out</span>
              </button>
            </>
          ) : onSignIn ? (
            <button
              type="button"
              onClick={onSignIn}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#dfab2a] hover:bg-[#c59b27] text-[#08261c] font-sans text-[14px] sm:text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <AppIcon name="login" className="text-[19px] text-[#08261c]" />
              <span>Sign In</span>
            </button>
          ) : (
            <Link
              href="/auth"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-[#dfab2a] hover:bg-[#c59b27] text-[#08261c] font-sans text-[14px] sm:text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <AppIcon name="login" className="text-[19px] text-[#08261c]" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
