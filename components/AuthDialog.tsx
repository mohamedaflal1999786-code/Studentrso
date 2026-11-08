'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
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
  User,
  RotateCw,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getSupabaseBrowserClient } from '@/lib/supabase';

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

type AuthMode = 'login' | 'signup';
type FlowState = 'form' | 'otp-verify' | 'forgot-request' | 'forgot-otp' | 'forgot-reset';

interface AuthDialogProps {
  open: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthDialog({ open, mode, onModeChange, onClose, onSuccess }: AuthDialogProps) {
  const router = useRouter();
  const { refresh } = useAuth();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP inputs
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // State management
  const [flow, setFlow] = useState<FlowState>('form');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  // Lockout state (5 attempts -> 60 seconds lock)
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // OTP resend cooldown
  const [resendCountdown, setResendCountdown] = useState(0);

  // Reset states on modal open or mode switch
  useEffect(() => {
    if (open) {
      setFlow('form');
      setStatus('');
      setIsError(false);
      setOtp(['', '', '', '', '', '']);
    }
  }, [open, mode]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) {
      if (isLocked) {
        setIsLocked(false);
        setStatus('');
      }
      return;
    }
    const timer = setTimeout(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [lockoutRemaining, isLocked]);

  // OTP Resend countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  if (!open) return null;

  // Password strength calculation (Min 12 characters per requirement)
  const hasMinLength = password.length >= 12;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let strengthScore = 0;
  if (password.length >= 8) strengthScore += 1;
  if (hasMinLength) strengthScore += 1;
  if (hasLetter && hasNumber) strengthScore += 1;
  if (hasSpecial) strengthScore += 1;

  const strengthLabel =
    strengthScore === 0
      ? ''
      : strengthScore <= 1
      ? 'Weak'
      : strengthScore <= 2
      ? 'Fair'
      : strengthScore === 3
      ? 'Good'
      : 'Strong';

  const strengthColor =
    strengthScore <= 1 ? 'bg-red-500' : strengthScore === 2 ? 'bg-amber-500' : strengthScore === 3 ? 'bg-blue-500' : 'bg-emerald-600';

  function showStatus(msg: string, err = false) {
    setStatus(msg);
    setIsError(err);
  }

  // --- OTP INPUT HANDLERS (With Auto-Advance & Paste Support) ---
  function handleOtpChange(idx: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);

    // Auto-advance to next input box
    if (val && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (next.every((d) => d) && next.join('').length === 6) {
      setTimeout(() => verifyOtpSubmit(next.join('')), 100);
    }
  }

  function handleOtpKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const digits = pasted.split('');
    const next = ['', '', '', '', '', ''];
    digits.forEach((d, i) => {
      if (i < 6) next[i] = d;
    });
    setOtp(next);

    // Focus last filled box
    const focusIdx = Math.min(digits.length - 1, 5);
    otpRefs.current[focusIdx]?.focus();

    if (pasted.length === 6) {
      setTimeout(() => verifyOtpSubmit(pasted), 100);
    }
  }

  // --- SUBMIT SIGN IN ---
  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLocked) return;

    if (!email || !password) {
      showStatus('Please enter your email and password.', true);
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

      if (res.status === 423 || data.locked) {
        setIsLocked(true);
        setLockoutRemaining(data.remainingSeconds || 60);
        showStatus(data.error || 'Password entry locked for 60 seconds due to repeated failed attempts.', true);
        setBusy(false);
        return;
      }

      if (!res.ok) {
        showStatus(data.error || 'Email or password is invalid.', true);
        setBusy(false);
        return;
      }

      showStatus('Signed in successfully! Redirecting to student dashboard...', false);
      await refresh();
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        window.location.href = '/dashboard';
      }, 700);
    } catch {
      showStatus('We could not complete sign in. Please try again.', true);
    } finally {
      setBusy(false);
    }
  }

  // --- SUBMIT REGISTRATION (STEP 1) ---
  async function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) {
      showStatus('Please enter your full name.', true);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showStatus('Please enter a valid email address.', true);
      return;
    }
    if (password.length < 12) {
      showStatus('Password must be at least 12 characters long.', true);
      return;
    }
    if (password !== confirmPassword) {
      showStatus('Passwords do not match.', true);
      return;
    }

    setBusy(true);
    showStatus('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showStatus(data.error || 'Could not create account.', true);
        setBusy(false);
        return;
      }

      if (data.autoLogin) {
        showStatus('Account created and verified! Redirecting to student dashboard...', false);
        await refresh();
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
          window.location.href = '/dashboard?onboarding=true';
        }, 700);
        return;
      }

      // Transition to Step 2: Verify OTP
      setFlow('otp-verify');
      setResendCountdown(60);
      showStatus(data.message || "We've sent a 6-digit verification code to your email.", false);
    } catch {
      showStatus('Network error while creating account. Please try again.', true);
    } finally {
      setBusy(false);
    }
  }

  // --- VERIFY OTP (STEP 2) ---
  async function verifyOtpSubmit(otpCode?: string) {
    const code = otpCode || otp.join('');
    if (code.length !== 6) {
      showStatus('Please enter the complete 6-digit verification code.', true);
      return;
    }

    setBusy(true);
    showStatus('');

    try {
      const res = await fetch('/api/auth/otp-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code,
          purpose: 'signup',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showStatus(data.error || 'Verification code is invalid or has expired.', true);
        setBusy(false);
        return;
      }

      showStatus('Email verified successfully! Preparing your student dashboard...', false);
      await refresh();
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        window.location.href = '/dashboard?onboarding=true';
      }, 700);
    } catch {
      showStatus('Failed to verify code. Please check your connection.', true);
    } finally {
      setBusy(false);
    }
  }

  // --- RESEND OTP ---
  async function handleResendOtp() {
    if (resendCountdown > 0) return;
    setBusy(true);
    showStatus('');
    try {
      const res = await fetch('/api/auth/otp-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), purpose: 'signup' }),
      });
      const data = await res.json();
      if (!res.ok) {
        showStatus(data.error || 'Could not resend code. Please try again.', true);
      } else {
        setResendCountdown(60);
        showStatus('A fresh verification code has been dispatched to your email.', false);
      }
    } catch {
      showStatus('Unable to request new code.', true);
    } finally {
      setBusy(false);
    }
  }

  // --- GOOGLE OAUTH SIGN-IN ---
  async function handleGoogleSignIn() {
    setBusy(true);
    showStatus('Connecting with Google...', false);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X size={20} />
        </button>

        {/* Header Branding with Student RSO Current Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/images/student-rso-emblem.png"
            alt="Student RSO Emblem"
            className="h-10 w-auto object-contain shrink-0"
          />
          <div className="h-8 w-px bg-[#d8c7ad] hidden xs:block shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl font-bold tracking-tight text-[#8c2f39] italic leading-tight">
              Student RSO
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#7a6a5a] font-semibold">
              RIGHTS • SERVICES • OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* ========================================================
            VIEW 1: SIGN IN (EXISTING STUDENTS)
        ======================================================== */}
        {mode === 'login' && flow === 'form' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Welcome back.</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-0.5 leading-relaxed">
                Sign in to continue your learning journey and explore opportunities selected for you.
              </p>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={busy || isLocked}
              className="w-full py-2.5 px-4 rounded-xl border border-[#d8c7ad] bg-white hover:bg-[#f6ede0] text-[#2b2118] font-sans text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              <GoogleIcon size={18} />
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1 bg-[#efe3cc]" />
              <span className="font-mono text-[10px] uppercase text-[#a09080] font-semibold">or email</span>
              <div className="h-px flex-1 bg-[#efe3cc]" />
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    disabled={busy || isLocked}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-[#a09080]" />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#2b2118]">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      showStatus('Password reset link will be sent to your email.');
                      setFlow('forgot-request');
                    }}
                    className="text-xs font-medium text-[#8c2f39] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={busy || isLocked}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  />
                  <LockKeyhole size={16} className="absolute left-3.5 top-3.5 text-[#a09080]" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 p-1 text-[#a09080] hover:text-[#2b2118] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed flex items-center gap-2 ${
                    isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isError ? <AlertCircle size={15} className="shrink-0" /> : <CheckCircle2 size={15} className="shrink-0" />}
                  <span>{status}</span>
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={busy || isLocked}
                className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : isLocked ? (
                  <span>Locked ({lockoutRemaining}s)</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Bottom Switcher */}
            <div className="pt-2 border-t border-[#efe3cc] text-center">
              <p className="text-xs text-[#7a6a5a]">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onModeChange('signup');
                    setFlow('form');
                    setStatus('');
                  }}
                  className="font-bold text-[#8c2f39] hover:underline cursor-pointer"
                >
                  Create Your Account
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 2: REGISTRATION (STEP 1: CREATE ACCOUNT)
        ======================================================== */}
        {mode === 'signup' && flow === 'form' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 px-2 py-0.5 rounded">
                  Step 1 of 2
                </span>
                <span className="text-[11px] text-[#7a6a5a] font-medium">Account Details</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Start Your Student Journey.</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-0.5 leading-relaxed">
                Create your free account to discover educational opportunities that match your goals.
              </p>
            </div>

            {/* Google Sign-Up */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={busy}
              className="w-full py-2.5 px-4 rounded-xl border border-[#d8c7ad] bg-white hover:bg-[#f6ede0] text-[#2b2118] font-sans text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              <GoogleIcon size={18} />
              <span>Sign up with Google</span>
            </button>

            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1 bg-[#efe3cc]" />
              <span className="font-mono text-[10px] uppercase text-[#a09080] font-semibold">or email</span>
              <div className="h-px flex-1 bg-[#efe3cc]" />
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Full name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    disabled={busy}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your official full name"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 transition"
                  />
                  <User size={16} className="absolute left-3.5 top-3 text-[#a09080]" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Gmail / email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    disabled={busy}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 transition"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3 text-[#a09080]" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={busy}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password (12+ characters)"
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 transition"
                  />
                  <LockKeyhole size={16} className="absolute left-3.5 top-3 text-[#a09080]" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 p-1 text-[#a09080] hover:text-[#2b2118] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#7a6a5a]">Strength:</span>
                      <span className="font-bold text-[#2b2118]">{strengthLabel}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#efe3cc] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthColor} transition-all duration-300`}
                        style={{ width: `${(strengthScore / 4) * 100}%` }}
                      />
                    </div>
                    <ul className="text-[10px] text-[#7a6a5a] space-y-0.5 pt-1">
                      <li className={hasMinLength ? 'text-emerald-700 font-medium' : ''}>
                        {hasMinLength ? '✓' : '•'} At least 12 characters
                      </li>
                      <li className={hasLetter && hasNumber ? 'text-emerald-700 font-medium' : ''}>
                        {hasLetter && hasNumber ? '✓' : '•'} Mix of letters and numbers/symbols
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    disabled={busy}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] disabled:bg-gray-100 transition"
                  />
                  <LockKeyhole size={16} className="absolute left-3.5 top-3 text-[#a09080]" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 p-1 text-[#a09080] hover:text-[#2b2118] transition cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword.length > 0 && confirmPassword !== password && (
                  <p className="text-[11px] text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed flex items-center gap-2 ${
                    isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isError ? <AlertCircle size={15} className="shrink-0" /> : <CheckCircle2 size={15} className="shrink-0" />}
                  <span>{status}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={busy || password.length < 12 || password !== confirmPassword}
                className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending verification code...</span>
                  </>
                ) : (
                  <span>Continue to Verification →</span>
                )}
              </button>
            </form>

            {/* Bottom Switcher */}
            <div className="pt-2 border-t border-[#efe3cc] text-center">
              <p className="text-xs text-[#7a6a5a]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onModeChange('login');
                    setFlow('form');
                    setStatus('');
                  }}
                  className="font-bold text-[#8c2f39] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 3: EMAIL OTP VERIFICATION (STEP 2)
        ======================================================== */}
        {flow === 'otp-verify' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setFlow('form')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c2f39] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to registration</span>
            </button>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#cfa052]/20 text-[#8c2f39] flex items-center justify-center mb-3">
                <ShieldCheck size={26} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Verify Your Email.</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-1 leading-relaxed">
                We've sent a 6-digit verification code to <strong className="text-[#2b2118]">{email}</strong>. Enter
                the code to activate your student account.
              </p>
            </div>

            {/* 6-Digit OTP Boxes with Auto-Advance & Paste Support */}
            <div>
              <label className="block text-xs font-semibold text-[#2b2118] mb-2 text-center">
                Enter 6-Digit Verification Code
              </label>
              <div className="flex justify-center gap-2 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    disabled={busy}
                    aria-label={`Digit ${idx + 1}`}
                    className="w-11 h-13 text-center text-xl font-mono font-bold rounded-xl border-2 border-[#d8c7ad] bg-white text-[#2b2118] focus:border-[#8c2f39] focus:outline-hidden transition shadow-xs"
                  />
                ))}
              </div>
              <p className="text-[11px] text-center text-[#7a6a5a] mt-2">
                Code expires in 10 minutes. Check your inbox or spam folder.
              </p>
            </div>

            {/* Status Feedback */}
            {status && (
              <div
                className={`p-3 rounded-xl text-xs leading-relaxed flex items-center gap-2 ${
                  isError
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isError ? <AlertCircle size={15} className="shrink-0" /> : <CheckCircle2 size={15} className="shrink-0" />}
                <span>{status}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="button"
              onClick={() => verifyOtpSubmit()}
              disabled={busy || otp.join('').length !== 6}
              className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying code...</span>
                </>
              ) : (
                <span>Activate Account & Continue →</span>
              )}
            </button>

            {/* Resend OTP */}
            <div className="pt-2 border-t border-[#efe3cc] flex items-center justify-between text-xs text-[#7a6a5a]">
              <span>Didn't receive the code?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={busy || resendCountdown > 0}
                className="font-bold text-[#8c2f39] hover:underline disabled:text-[#a09080] disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <RotateCw size={13} className={busy ? 'animate-spin' : ''} />
                <span>{resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : 'Resend Code'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 4: FORGOT PASSWORD REQUEST
        ======================================================== */}
        {flow === 'forgot-request' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setFlow('form')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c2f39] hover:underline cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to sign in</span>
            </button>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2b2118]">Reset Password.</h2>
              <p className="font-sans text-xs text-[#7a6a5a] mt-1 leading-relaxed">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    disabled={busy}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] placeholder-[#a09080] focus:outline-hidden focus:ring-2 focus:ring-[#8c2f39] transition"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-[#a09080]" />
                </div>
              </div>

              {status && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed flex items-center gap-2 ${
                    isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isError ? <AlertCircle size={15} className="shrink-0" /> : <CheckCircle2 size={15} className="shrink-0" />}
                  <span>{status}</span>
                </div>
              )}

              <button
                type="button"
                disabled={busy || !email || !email.includes('@')}
                onClick={async () => {
                  setBusy(true);
                  showStatus('');
                  try {
                    const res = await fetch('/api/auth/otp-send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: email.trim().toLowerCase(), purpose: 'reset' }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      showStatus('If an account exists with this email, a reset code has been sent.', false);
                      setTimeout(() => setFlow('form'), 2500);
                    } else {
                      showStatus(data.error || 'Could not send reset instructions.', true);
                    }
                  } catch {
                    showStatus('Network error while requesting reset.', true);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="w-full py-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <span>Send Reset Instructions</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
