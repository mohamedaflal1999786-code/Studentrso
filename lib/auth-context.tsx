'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  state?: string;
  district?: string;
  city?: string;
  education_level?: string;
  course?: string;
  specialization?: string;
  academic_year?: string;
  institution_name?: string;
  graduation_year?: number;
  academic_percentage?: number | null;
  cgpa?: number | null;
  annual_family_income?: string;
  community_category?: string;
  gender?: 'Male' | 'Female' | 'Transgender' | 'Other';
  studied_in_tn_govt_school?: boolean;
  is_first_graduate?: boolean;
  is_single_girl_child?: boolean;
  has_disability?: boolean;
  study_interests?: string[];
  career_interests?: string[];
  learning_preferences?: string[];
  notification_preferences?: {
    scholarship_alerts?: boolean;
    internship_alerts?: boolean;
    examination_alerts?: boolean;
    admission_alerts?: boolean;
    deadline_reminders?: boolean;
    security_alerts?: boolean;
    promotional_emails?: boolean;
  };
  avatar_url?: string | null;
  onboarding_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
}

interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  profile: null,
  loading: true,
  refresh: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session', {
        cache: 'no-store',
        credentials: 'include',
      });
      const data = (await res.json()) as { user: AuthUser | null; profile: UserProfile | null };
      setUser(data.user);
      setProfile(data.profile);
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refresh, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
