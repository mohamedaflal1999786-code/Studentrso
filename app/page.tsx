'use client';

import { useState, useCallback, useEffect } from 'react';
import { ServiceData, services } from '@/lib/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { HowItWorksSection } from '@/components/sections/InfoSections';
import { AboutSection } from '@/components/sections/AboutSection';
import { EducationJourneySection } from '@/components/sections/EducationJourneySection';
import { ServiceModal } from '@/components/ServiceModal';
import { AuthDialog } from '@/components/AuthDialog';
import { ProfileDialog } from '@/components/ProfileDialog';

type AuthMode = 'login' | 'signup';

export default function Home() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [profileOpen, setProfileOpen] = useState(false);

  const handleServiceClick = useCallback((service: ServiceData) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const handleServiceById = useCallback((id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setSelectedService(service);
      setModalOpen(true);
    }
  }, []);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'contact') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }, []);

  const handleSignIn = useCallback(() => {
    setAuthMode('login');
    setAuthOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      // Catch any root OAuth redirect containing code or tokens and exchange at /auth/callback
      if (
        (search && (search.includes('code=') || search.includes('error='))) ||
        (hash && hash.includes('access_token='))
      ) {
        window.location.replace(`/auth/callback${search}${hash || ''}`);
        return;
      }

      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        if (targetId) {
          setTimeout(() => {
            handleNavigate(targetId);
          }, 150);
        }
      }
    }
  }, [handleNavigate]);

  return (
    <main className="min-h-screen bg-[#fbf5e9] pt-20">
      <Header
        onSignIn={handleSignIn}
        onNavigate={handleNavigate}
        onOpenProfile={() => setProfileOpen(true)}
        onServiceClick={handleServiceById}
      />

      <div className="flex flex-col w-full">
        {/* 1. Hero Section */}
        <Hero onNavigate={handleNavigate} onServiceClick={handleServiceClick} />

        {/* 2. 10-Module Platform Section */}
        <ServicesSection onServiceClick={handleServiceClick} />

        {/* 3. How It Works Section (3 simple steps) */}
        <HowItWorksSection />

        {/* 4. About Student RSO Section */}
        <AboutSection />

        {/* 5. The Education Journey Section (Immediately ABOVE the footer) */}
        <EducationJourneySection onNavigate={handleNavigate} onSignIn={handleSignIn} />
      </div>

      {/* 6. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <ServiceModal
        service={selectedService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />
      <ProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} />
    </main>
  );
}
