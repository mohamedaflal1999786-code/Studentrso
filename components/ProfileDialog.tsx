'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  User,
  X,
  Mail,
  GraduationCap,
  Building,
  MapPin,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  Edit3,
  Award,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
}

export function ProfileDialog({ open, onClose, onEditProfile }: ProfileDialogProps) {
  const { profile, user, signOut } = useAuth();

  if (!open) return null;

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student Scholar';
  const email = profile?.email || user?.email || '';

  const initials = displayName
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  async function handleSignOut() {
    await signOut();
    onClose();
    window.location.href = '/';
  }

  function handleEditClick() {
    onClose();
    if (onEditProfile) {
      onEditProfile();
    }
  }

  const isCompleted = Boolean(profile?.onboarding_completed);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b2118]/60 backdrop-blur-md px-4 py-8 animate-in fade-in">
      <div className="relative w-full max-w-[460px] rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] shadow-[0_24px_80px_rgba(43,33,24,0.25)] max-h-[92vh] overflow-y-auto">
        {/* Gradient strip */}
        <div className="h-2 rounded-t-3xl bg-gradient-to-r from-[#8c2f39] via-[#b8543e] to-[#e0a526]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-5 rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
          aria-label="Close profile"
        >
          <X size={18} />
        </button>

        {/* Avatar & Header */}
        <div className="flex flex-col items-center px-6 pt-7 pb-4 text-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#8c2f39] text-[28px] font-bold text-white shadow-lg border-2 border-[#e0a526]">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 border-2 border-[#fdfbf6]">
              <CheckCircle2 size={13} className="text-white" />
            </div>
          </div>

          <h2 className="mt-3 font-serif text-[22px] font-bold text-[#2b2118]">
            {displayName}
          </h2>
          <p className="text-xs text-[#7a6a5a] font-mono mt-0.5">{email}</p>

          {/* 100% Completed Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>100% Completely Saved & Verified</span>
          </div>
        </div>

        {/* Saved Student Profile Details */}
        <div className="border-t border-[#efe3cc] px-6 py-5 space-y-3">
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] space-y-2.5 text-xs text-[#2b2118]">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={16} className="text-[#8c2f39] shrink-0" />
              <div>
                <span className="font-semibold text-[#7a6a5a] block text-[10px] uppercase font-mono">Course / Program</span>
                <span className="font-bold text-[13px]">{profile?.course || 'Undergraduate Degree'}</span>
                {profile?.education_level && (
                  <span className="text-[#7a6a5a] ml-1.5">({profile.education_level})</span>
                )}
              </div>
            </div>

            {profile?.institution_name && (
              <div className="flex items-center gap-2.5 pt-2 border-t border-[#efe3cc]/60">
                <Building size={16} className="text-[#cfa052] shrink-0" />
                <div>
                  <span className="font-semibold text-[#7a6a5a] block text-[10px] uppercase font-mono">Institution / College</span>
                  <span className="font-medium text-[12px]">{profile.institution_name}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5 pt-2 border-t border-[#efe3cc]/60">
              <MapPin size={16} className="text-[#5e8b7e] shrink-0" />
              <div>
                <span className="font-semibold text-[#7a6a5a] block text-[10px] uppercase font-mono">Location & Residence</span>
                <span className="font-medium text-[12px]">
                  {profile?.district ? `${profile.district}, ` : ''}{profile?.state || 'Tamil Nadu'}
                </span>
              </div>
            </div>

            {profile?.community_category && (
              <div className="flex items-center gap-2.5 pt-2 border-t border-[#efe3cc]/60">
                <Award size={16} className="text-[#b8543e] shrink-0" />
                <div>
                  <span className="font-semibold text-[#7a6a5a] block text-[10px] uppercase font-mono">Category & Income Tier</span>
                  <span className="font-medium text-[12px]">
                    {profile.community_category} • {profile.annual_family_income || 'Below ₹2,50,000'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#f6ede0] border-2 border-[#8c2f39] text-[#8c2f39] font-sans text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Edit3 size={15} />
            <span>Edit Profile Details</span>
          </button>

          <Link
            href="/dashboard"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
          >
            <LayoutDashboard size={15} />
            <span>Open Student Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-xl border border-[#d8c7ad] py-2.5 text-xs font-semibold text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
          >
            Sign Out
          </button>
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
