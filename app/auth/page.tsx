'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Home, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthDialog } from '@/components/AuthDialog';
import { useAuth } from '@/lib/auth-context';

function AuthPageContent() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (user) {
    return (
      <div className="min-h-screen bg-[#fbf5e9] flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] p-8 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#f6ede0] border border-[#d8c7ad] text-[#8c2f39] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#2b2118]">
              You are Signed In
            </h1>
            <p className="font-sans text-xs text-[#7a6a5a] mt-1">
              Signed in as <strong className="text-[#2b2118]">{profile?.full_name || user.email}</strong>
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/dashboard"
              className="w-full py-3 rounded-xl bg-[#8c2f39] text-white font-sans text-sm font-bold hover:bg-[#6d1824] transition text-center shadow-md flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={18} />
              <span>Go to My Student Dashboard</span>
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl bg-[#f6ede0] text-[#2b2118] font-sans text-xs font-semibold hover:bg-[#efe3cc] transition text-center border border-[#d8c7ad] flex items-center justify-center gap-2"
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf5e9] flex flex-col items-center justify-center p-4 font-sans">
      {/* Student Portal Authentication: Sign In and Sign Up modes */}
      <AuthDialog
        open={true}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => router.push('/')}
        onSuccess={() => router.push('/dashboard')}
      />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fbf5e9]">
          <Loader2 size={36} className="animate-spin text-[#8c2f39]" />
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
