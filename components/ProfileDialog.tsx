'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, User, X, Mail, Phone, Calendar, CheckCircle2, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth, UserProfile } from '@/lib/auth-context';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { profile, user, refresh, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setDob(profile.date_of_birth || '');
    }
  }, [profile]);

  if (!open) return null;

  const initials = (fullName || profile?.email || 'U')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const completedFields = [fullName, phone, dob].filter(Boolean).length;
  const completeness = Math.round((completedFields / 3) * 100);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, phone, date_of_birth: dob }),
      });
      const data = (await res.json()) as { profile?: UserProfile; error?: string };
      if (data.error) {
        setStatus(data.error);
        setIsError(true);
      } else {
        setStatus('Profile saved successfully.');
        setIsError(false);
        await refresh();
      }
    } catch {
      setStatus('Could not save profile. Please try again.');
      setIsError(true);
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    onClose();
  }

  const inputClass =
    'mt-1.5 h-12 w-full rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] px-4 text-[14px] outline-none transition focus:border-[#8c2f39] focus:ring-2 focus:ring-[#8c2f39]/15 text-[#2b2118] placeholder:text-[#b0a596] disabled:cursor-not-allowed';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b2118]/60 backdrop-blur-md px-4 py-8">
      <div className="relative w-full max-w-[440px] rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] shadow-[0_24px_80px_rgba(43,33,24,0.25)] animate-slide-up max-h-[92vh] overflow-y-auto">
        {/* Gradient strip */}
        <div className="h-2 rounded-t-3xl bg-gradient-to-r from-[#8c2f39] via-[#b8543e] to-[#e0a526]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-6 rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
          aria-label="Close profile"
        >
          <X size={18} />
        </button>

        {/* Avatar header */}
        <div className="flex flex-col items-center px-7 pt-7 pb-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8c2f39] to-[#6d1824] text-[28px] font-bold text-white shadow-lg shadow-[#8c2f39]/20">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#e0a526] border-3 border-[#fdfbf6]">
              <Sparkles size={14} className="text-white" />
            </div>
          </div>
          <h2 className="mt-3 font-serif text-[22px] font-bold text-[#2b2118]">
            {fullName || 'Student Profile'}
          </h2>
          <p className="text-[13px] text-[#7a6a5a]">{profile?.email || user?.email}</p>

          {/* Completeness bar */}
          <div className="mt-4 w-full">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#7a6a5a] mb-1.5">
              <span>Profile Completeness</span>
              <span className="text-[#8c2f39]">{completeness}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#f6ede0] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8c2f39] to-[#e0a526] transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#efe3cc] px-7 py-5">
          <form className="space-y-4" onSubmit={submit}>
            <ProfileField icon={User} label="Full Name">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </ProfileField>

            <ProfileField icon={Mail} label="Email (locked)">
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className={`${inputClass} bg-[#f6ede0] text-[#7a6a5a]`}
              />
            </ProfileField>

            <ProfileField icon={Phone} label="Phone Number">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className={inputClass}
              />
            </ProfileField>

            <ProfileField icon={Calendar} label="Date of Birth">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={inputClass}
              />
            </ProfileField>

            {status && (
              <div
                className={`flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-[13px] leading-[20px] ${
                  !isError
                    ? 'border-[#dbe8e4] bg-[#edf5f2] text-[#15362e]'
                    : 'border-[#f0d8d8] bg-[#fdf0f0] text-[#8c2f39]'
                }`}
                role="status"
              >
                {!isError && <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#5e8b7e]" />}
                <span>{status}</span>
              </div>
            )}

            <button
              disabled={busy}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8c2f39] to-[#6d1824] text-[14px] font-bold text-white shadow-lg shadow-[#8c2f39]/20 transition hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Save Profile
            </button>
          </form>

          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#8c2f39] text-[13px] font-bold text-white shadow-xs hover:bg-[#6d1824] transition text-center"
            >
              <LayoutDashboard size={16} />
              <span>Go to Personalised Dashboard</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-xl border border-[#d8c7ad] py-2 text-[13px] font-semibold text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#7a6a5a]">
        <Icon size={13} />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
