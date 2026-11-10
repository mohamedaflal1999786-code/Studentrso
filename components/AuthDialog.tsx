'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  LockKeyhole,
  Mail,
  X,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getSupabaseBrowserClient } from '@/lib/supabase';

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

type AuthMode = 'login' | 'signup';
type ViewState = 'main' | 'create-password' | 'forgot-password';

interface AuthDialogProps {
  open: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthDialog({ open, mode, onModeChange, onClose, onSuccess }: AuthDialogProps) {
  const router = useRouter();
  const { refresh, user } = useAuth();

  const [view, setView] = useState<ViewState>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  // Check URL query parameters for create-password step
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const step = search.get('step');
      const emailParam = search.get('email');
      if (step === 'create-password') {
        setView('create-password');
        if (emailParam) setEmail(emailParam);
        else if (user?.email) setEmail(user.email);
      }
    }
  }, [open, user]);

  useEffect(() => {
    if (open) {
      if (typeof window !== 'undefined') {
        const search = new URLSearchParams(window.location.search);
        const step = search.get('step');
        const emailParam = search.get('email');
        if (step === 'create-password') {
          setView('create-password');
          if (emailParam) setEmail(emailParam);
          else if (user?.email) setEmail(user.email);
        } else {
          setView('main');
        }
      } else {
        setView('main');
      }
      setStatus('');
      setIsError(false);
    }
  }, [open, mode, user]);

  if (!open) return null;

  function showStatus(msg: string, err = false) {
    setStatus(msg);
    setIsError(err);
  }

  // --- 1. GOOGLE SIGN-IN / SIGN-UP ---
  async function handleGoogleAuth(isSignup = false) {
    setBusy(true);
    showStatus('Connecting with Google...', false);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('auth_mode', isSignup ? 'signup' : 'login');
    }

    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              prompt: 'select_account',
              access_type: 'offline',
            },
          },
        });
        if (!error && data?.url) {
          window.location.href = data.url;
          return;
        }
      }

      // Fallback through API route
      const oauthRes = await fetch('/api/auth/google', { method: 'POST' });
      const oauthData = await oauthRes.json();
      if (oauthRes.ok && oauthData.url) {
        window.location.href = oauthData.url;
      } else {
        showStatus('Could not initiate Google authentication. Please try again.', true);
        setBusy(false);
      }
    } catch {
      showStatus('Failed to connect to Google authentication service.', true);
      setBusy(false);
    }
  }

  // --- 2. EMAIL & PASSWORD SIGN IN ---
  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      showStatus('Please enter your Username / Email ID and password.', true);
      return;
    }

    setBusy(true);
    showStatus('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showStatus(data.error || 'Invalid Gmail or password.', true);
        setBusy(false);
        return;
      }

      showStatus('Signed in successfully! Redirecting to student dashboard...', false);
      await refresh();
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        window.location.href = '/dashboard';
      }, 500);
    } catch {
      showStatus('Could not complete sign in. Please check your connection.', true);
      setBusy(false);
    }
  }

  // --- 3. CREATE PASSWORD AFTER GOOGLE SIGN UP ---
  async function handleCreatePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password) {
      showStatus('Please choose a password.', true);
      return;
    }
    if (password.length < 8) {
      showStatus('Password must be at least 8 characters long.', true);
      return;
    }
    if (password !== confirmPassword) {
      showStatus('Passwords do not match.', true);
      return;
    }

    setBusy(true);
    showStatus('');

    try {
      const res = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          confirmPassword,
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showStatus(data.error || 'Could not save password.', true);
        setBusy(false);
        return;
      }

      showStatus('Password created successfully! Opening your dashboard...', false);
      await refresh();
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        window.location.href = '/dashboard';
      }, 600);
    } catch {
      showStatus('Network error while saving password.', true);
      setBusy(false);
    }
  }

  // --- 4. FORGOT PASSWORD REQUEST ---
  async function handleForgotPasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) {
      showStatus('Please enter your Username / Email ID.', true);
      return;
    }

    setBusy(true);
    showStatus('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok) {
        showStatus(data.error || 'Could not send reset link.', true);
      } else {
        showStatus(data.message, false);
      }
    } catch {
      showStatus('Could not dispatch reset email. Please try again.', true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#8c2f39] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <img src="/images/student-rso-emblem.png" alt="Student RSO" className="h-8 w-auto object-contain" width={41} height={32} />
          <div className="h-6 w-px bg-[#d8c7ad]" />
          <span className="font-serif text-lg font-bold text-[#8c2f39] italic">Student RSO</span>
        </div>

        {/* VIEW 1: CREATE PASSWORD AFTER GOOGLE SIGN-UP */}
        {view === 'create-password' && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold mb-2">
                <CheckCircle2 size={13} />
                <span>Google Account Verified</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Create Account Password</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-1 leading-relaxed">
                {email ? (
                  <>
                    Account registered for <strong className="text-[#2b2118]">{email}</strong>.
                  </>
                ) : (
                  'Your Google email is verified.'
                )}{' '}
                Create a password so you can also log in directly using your Gmail & password anytime.
              </p>
            </div>

            <form onSubmit={handleCreatePasswordSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7a6a5a] font-semibold mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    disabled={busy}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-[#2b2118] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8c2f39] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6a5a] hover:text-[#2b2118]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7a6a5a] font-semibold mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    disabled={busy}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-[#2b2118] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8c2f39] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6a5a] hover:text-[#2b2118]"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {status && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isError ? <AlertCircle size={15} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={15} className="shrink-0 mt-0.5" />}
                  <span>{status}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {busy ? <Loader2 size={18} className="animate-spin" /> : <LockKeyhole size={18} />}
                <span>Complete Registration & Open Dashboard →</span>
              </button>
            </form>
          </div>
        )}

        {/* VIEW 2: FORGOT PASSWORD */}
        {view === 'forgot-password' && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setView('main')}
              className="inline-flex items-center gap-1.5 text-xs text-[#7a6a5a] hover:text-[#8c2f39] font-medium transition cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </button>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Reset Password</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-1 leading-relaxed">
                Reset directly using your Google account or receive a reset link to your Gmail.
              </p>
            </div>

            {/* Quick Google Reset */}
            <button
              type="button"
              onClick={() => handleGoogleAuth(false)}
              disabled={busy}
              className="w-full py-3 px-4 rounded-xl border border-[#d8c7ad] bg-white hover:bg-[#f6ede0] text-[#2b2118] font-sans text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              <GoogleIcon size={18} />
              <span>Reset Instantly with Google</span>
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px flex-1 bg-[#efe3cc]" />
              <span className="font-mono text-[10px] uppercase text-[#a09080] font-semibold">or via email link</span>
              <div className="h-px flex-1 bg-[#efe3cc]" />
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7a6a5a] font-semibold mb-1">
                  Username / Email ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Username or email address"
                  disabled={busy}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-[#2b2118] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8c2f39]"
                  required
                />
              </div>

              {status && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isError ? <AlertCircle size={15} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={15} className="shrink-0 mt-0.5" />}
                  <span>{status}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {busy ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                <span>Send Password Reset Link to Gmail</span>
              </button>
            </form>
          </div>
        )}

        {/* VIEW 3: MAIN SIGN IN / REGISTER */}
        {view === 'main' && (
          <div className="space-y-5">
            {/* Mode Switch Tabs */}
            <div className="flex rounded-xl bg-[#f6ede0] p-1 border border-[#efe3cc]">
              <button
                type="button"
                onClick={() => {
                  onModeChange('login');
                  setStatus('');
                }}
                className={`flex-1 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#8c2f39] shadow-xs'
                    : 'text-[#7a6a5a] hover:text-[#2b2118]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  onModeChange('signup');
                  setStatus('');
                }}
                className={`flex-1 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#8c2f39] shadow-xs'
                    : 'text-[#7a6a5a] hover:text-[#2b2118]'
                }`}
              >
                Register
              </button>
            </div>

            {/* TAB: REGISTER (ONLY SHOWS GOOGLE LOGIN) */}
            {mode === 'signup' && (
              <div className="space-y-5 py-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Join Student RSO</h2>
                  <p className="font-sans text-xs text-[#7a6a5a] mt-1.5 leading-relaxed">
                    Fast, verified student registration with your Google account. You will create your password immediately after Google sign-in.
                  </p>
                </div>

                {/* Primary Action: Google Sign-Up */}
                <button
                  type="button"
                  onClick={() => handleGoogleAuth(true)}
                  disabled={busy}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#8c2f39] bg-white hover:bg-[#f6ede0] text-[#2b2118] font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 group"
                >
                  <GoogleIcon size={22} />
                  <span className="text-[#8c2f39] group-hover:text-[#6d1824]">Sign up with Google</span>
                </button>

                {/* Benefits / No OTP Guarantee */}
                <div className="p-4 rounded-2xl bg-[#f6ede0]/70 border border-[#efe3cc] space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs text-[#5c4a3b] font-medium">
                    <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />
                    <span>Instant verification via Google (Zero OTPs)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5c4a3b] font-medium">
                    <KeyRound size={15} className="text-[#8c2f39] shrink-0" />
                    <span>Create a personal password right after Google login</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5c4a3b] font-medium">
                    <ShieldCheck size={15} className="text-[#5e8b7e] shrink-0" />
                    <span>100% free access to all modules</span>
                  </div>
                </div>

                {status && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                      isError
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isError ? <AlertCircle size={15} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={15} className="shrink-0 mt-0.5" />}
                    <span>{status}</span>
                  </div>
                )}

                <p className="text-center font-sans text-[11px] text-[#7a6a5a]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange('login')}
                    className="font-bold text-[#8c2f39] hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            )}

            {/* TAB: SIGN IN (GOOGLE + GMAIL/PASSWORD) */}
            {mode === 'login' && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Welcome Back</h2>
                  <p className="font-sans text-xs text-[#7a6a5a] mt-1">
                    Sign in with your Google account or your registered Gmail & password.
                  </p>
                </div>

                {/* Google Sign-In */}
                <button
                  type="button"
                  onClick={() => handleGoogleAuth(false)}
                  disabled={busy}
                  className="w-full py-3 px-4 rounded-xl border border-[#d8c7ad] bg-white hover:bg-[#f6ede0] text-[#2b2118] font-sans text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
                >
                  <GoogleIcon size={18} />
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="h-px flex-1 bg-[#efe3cc]" />
                  <span className="font-mono text-[10px] uppercase text-[#a09080] font-semibold">
                    or with account credentials
                  </span>
                  <div className="h-px flex-1 bg-[#efe3cc]" />
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7a6a5a] font-semibold mb-1">
                      Username / Email ID
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username or email address"
                      disabled={busy}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-[#2b2118] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8c2f39]"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#7a6a5a] font-semibold">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setView('forgot-password')}
                        className="font-sans text-xs text-[#8c2f39] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        disabled={busy}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-[#2b2118] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8c2f39] pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6a5a] hover:text-[#2b2118]"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {status && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                        isError
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isError ? <AlertCircle size={15} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={15} className="shrink-0 mt-0.5" />}
                      <span>{status}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {busy ? <Loader2 size={18} className="animate-spin" /> : <LockKeyhole size={18} />}
                    <span>Sign In →</span>
                  </button>
                </form>

                <p className="text-center font-sans text-[11px] text-[#7a6a5a]">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange('signup')}
                    className="font-bold text-[#8c2f39] hover:underline cursor-pointer"
                  >
                    Register with Google
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
