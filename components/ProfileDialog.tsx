'use client';

import { useState, useRef, ChangeEvent } from 'react';
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
  Camera,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { processAvatarFile, validateImageFile } from '@/lib/image-utils';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
}

export function ProfileDialog({ open, onClose, onEditProfile }: ProfileDialogProps) {
  const { profile, user, refresh, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [photoSuccess, setPhotoSuccess] = useState('');

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

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError('');
    setPhotoSuccess('');

    // Strict 2MB size check
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setPhotoError(validation.error || 'Please select an image smaller than 2MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploadingPhoto(true);
    try {
      const dataUrl = await processAvatarFile(file);
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: dataUrl }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save profile picture.');
      }

      await refresh();
      setPhotoSuccess('Profile picture updated successfully!');
      setTimeout(() => setPhotoSuccess(''), 3000);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : 'Failed to update photo.');
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b2118]/60 backdrop-blur-md px-4 py-8 animate-in fade-in">
      <div className="relative w-full max-w-[460px] rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] shadow-[0_24px_80px_rgba(43,33,24,0.25)] max-h-[92vh] overflow-y-auto">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

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
          <div className="relative group">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="h-22 w-22 rounded-2xl object-cover shadow-lg border-2 border-[#e0a526]"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#8c2f39] text-[28px] font-bold text-white shadow-lg border-2 border-[#e0a526]">
                {initials}
              </div>
            )}

            {/* Camera Edit Badge */}
            <button
              type="button"
              disabled={uploadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              title="Upload / Change profile picture (Max 2MB)"
              className="absolute -bottom-1.5 -right-1.5 p-2 rounded-full bg-[#8c2f39] text-white hover:bg-[#6d1824] shadow-md border-2 border-[#fdfbf6] transition-transform hover:scale-110 cursor-pointer disabled:opacity-60"
            >
              {uploadingPhoto ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
            </button>
          </div>

          {/* Upload Button Link */}
          <button
            type="button"
            disabled={uploadingPhoto}
            onClick={() => fileInputRef.current?.click()}
            className="mt-2.5 text-[11px] font-mono font-semibold text-[#8c2f39] hover:underline cursor-pointer flex items-center gap-1"
          >
            <Camera size={12} />
            <span>{profile?.avatar_url ? 'Change Photo (Max 2MB)' : 'Upload Profile Picture (Max 2MB)'}</span>
          </button>

          {photoError && (
            <div className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5 max-w-sm">
              <AlertCircle size={14} className="shrink-0" />
              <span>{photoError}</span>
            </div>
          )}

          {photoSuccess && (
            <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5 max-w-sm">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{photoSuccess}</span>
            </div>
          )}

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
