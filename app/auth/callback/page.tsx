'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    async function handleCallback() {
      try {
        const hash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
        const hashParams = new URLSearchParams(hash);
        const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

        // 1. Check for OAuth Error or User Cancellation
        const error = queryParams.get('error') || hashParams.get('error');
        const errorDescription = queryParams.get('error_description') || hashParams.get('error_description');

        if (error) {
          setStatus('error');
          if (error === 'access_denied') {
            setIsCancelled(true);
            setErrorMessage('Google sign-in was cancelled. You can try again whenever you are ready.');
          } else {
            setErrorMessage(errorDescription || 'Authentication failed. Please try again.');
          }
          return;
        }

        // 2. PKCE Authorization Code or Access Token
        const code = queryParams.get('code');
        const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');
        const expiresIn = hashParams.get('expires_in') || queryParams.get('expires_in');
        const provider = queryParams.get('provider') || hashParams.get('provider') || 'google';

        if (code || accessToken || provider === 'google') {
          const response = await fetch('/api/auth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: code || undefined,
              access_token: accessToken || undefined,
              refresh_token: refreshToken || undefined,
              expires_in: expiresIn ? parseInt(expiresIn, 10) : 3600,
              provider,
            }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setStatus('success');
            // If new user or onboarding incomplete, open onboarding immediately
            const destination = data.isNewUser ? '/dashboard?onboarding=true' : '/dashboard';
            setTimeout(() => router.push(destination), 800);
          } else {
            setStatus('error');
            setErrorMessage(data.error || 'Could not verify student session. Please try again.');
          }
        } else {
          setStatus('error');
          setErrorMessage('No valid authentication token or authorization code was found.');
        }
      } catch {
        setStatus('error');
        setErrorMessage('A network error occurred while finalizing sign-in.');
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf5e9] px-4 font-sans">
      <div className="w-full max-w-[420px] rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] p-8 text-center shadow-xl">
        {/* Student RSO Branding */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src="/images/student-rso-emblem.png"
            alt="Student RSO Emblem"
            className="h-10 w-auto object-contain"
          />
          <div className="h-7 w-px bg-[#d8c7ad]" />
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg font-bold text-[#8c2f39] italic leading-tight">Student RSO</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#7a6a5a] font-semibold">
              RIGHTS • SERVICES • OPPORTUNITIES
            </span>
          </div>
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 size={40} className="mx-auto animate-spin text-[#8c2f39]" />
            <h2 className="font-serif text-xl font-bold text-[#2b2118]">Verifying Student Session...</h2>
            <p className="text-xs text-[#7a6a5a] leading-relaxed">
              Exchanging secure credentials and setting up your personalized dashboard.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#2b2118]">Authentication Successful!</h2>
            <p className="text-xs text-[#7a6a5a] leading-relaxed">
              Redirecting you to your Student RSO dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 text-[#8c2f39] flex items-center justify-center mx-auto shadow-xs">
              <AlertCircle size={32} />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#2b2118]">
              {isCancelled ? 'Sign-In Cancelled' : 'Authentication Error'}
            </h2>
            <p className="text-xs text-[#5c4a3b] leading-relaxed">{errorMessage}</p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => router.push('/auth')}
                className="w-full py-2.5 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ArrowLeft size={14} />
                <span>Return to Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full py-2 rounded-xl bg-[#f6ede0] hover:bg-[#efe3cc] text-[#2b2118] text-xs font-semibold transition cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fbf5e9]">
          <Loader2 size={36} className="animate-spin text-[#8c2f39]" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
