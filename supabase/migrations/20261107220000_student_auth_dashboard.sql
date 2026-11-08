-- =============================================================================
-- STUDENT RSO 2.0 — AUTHENTICATION, ONBOARDING & DASHBOARD DATABASE SCHEMA
-- =============================================================================

-- 1. Extend user_profiles with comprehensive onboarding & preference fields
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  date_of_birth date,
  state text DEFAULT 'Tamil Nadu',
  district text,
  city text,
  education_level text, -- 'Class 10', 'Class 11', 'Class 12', 'Diploma', 'Undergraduate', 'Postgraduate', 'PhD / Research', 'Other'
  course text,
  specialization text,
  academic_year text,
  institution_name text,
  graduation_year int,
  academic_percentage numeric(5,2),
  cgpa numeric(4,2),
  annual_family_income text,
  community_category text,
  studied_in_tn_govt_school boolean DEFAULT false,
  is_first_graduate boolean DEFAULT false,
  is_single_girl_child boolean DEFAULT false,
  has_disability boolean DEFAULT false,
  study_interests text[] DEFAULT '{}',
  career_interests text[] DEFAULT '{}',
  learning_preferences text[] DEFAULT '{}',
  notification_preferences jsonb DEFAULT '{"scholarship_alerts": true, "internship_alerts": true, "examination_alerts": true, "admission_alerts": true, "deadline_reminders": true, "security_alerts": true, "promotional_emails": false}'::jsonb,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enhanced secure auth_otps table for hashed email OTP verification
-- Ensure auth_otps has all required columns if already created
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS target text;
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS channel text DEFAULT 'email';
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS code_hash text;
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS purpose text DEFAULT 'signup';
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS used boolean DEFAULT false;
ALTER TABLE IF EXISTS auth_otps ADD COLUMN IF NOT EXISTS attempts int DEFAULT 0;
CREATE TABLE IF NOT EXISTS auth_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL DEFAULT 'email' CHECK (channel IN ('email', 'phone')),
  target text NOT NULL,
  code_hash text NOT NULL, -- SHA-256 / PBKDF2 hash of the 6-digit OTP
  purpose text NOT NULL DEFAULT 'signup' CHECK (purpose IN ('signup', 'login', 'reset', 'verify')),
  expires_at timestamptz NOT NULL,
  used boolean NOT NULL DEFAULT false,
  attempts int NOT NULL DEFAULT 0,
  max_attempts int NOT NULL DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auth_otps_target_purpose ON auth_otps(target, purpose, used);

-- 3. Failed Login Attempts Tracker for 5-attempt / 60-second Lockout
CREATE TABLE IF NOT EXISTS auth_failed_logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text UNIQUE NOT NULL, -- normalized email or IP
  attempt_count int NOT NULL DEFAULT 1,
  locked_until timestamptz,
  last_attempt_at timestamptz DEFAULT now()
);

-- 4. Student Saved Opportunities & Application Tracker
CREATE TABLE IF NOT EXISTS student_saved_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id text NOT NULL,
  category text NOT NULL, -- 'scholarship', 'certificate', 'internship', 'exam', 'admission', 'academic', 'career'
  title text NOT NULL,
  awarding_authority text,
  official_url text NOT NULL,
  deadline text,
  status text NOT NULL DEFAULT 'Saved' CHECK (status IN (
    'Interested',
    'Saved',
    'Preparing Documents',
    'Applied',
    'Under Review',
    'Approved',
    'Rejected',
    'Closed'
  )),
  notes text,
  applied_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_opps_user ON student_saved_opportunities(user_id, status);

-- 5. Student Notifications
CREATE TABLE IF NOT EXISTS student_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'general' CHECK (type IN (
    'welcome',
    'scholarship_match',
    'internship_match',
    'deadline_reminder',
    'application_update',
    'security_alert'
  )),
  is_read boolean NOT NULL DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_student_notifs_user ON student_notifications(user_id, is_read);

-- 6. Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_failed_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_notifications ENABLE ROW LEVEL SECURITY;

-- Profile Policies: user can only see and update their own profile
DROP POLICY IF EXISTS "select_own_profile" ON user_profiles;
CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profiles;
CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Saved Opportunities Policies: isolated per student
DROP POLICY IF EXISTS "select_own_saved_opps" ON student_saved_opportunities;
CREATE POLICY "select_own_saved_opps" ON student_saved_opportunities FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved_opps" ON student_saved_opportunities;
CREATE POLICY "insert_own_saved_opps" ON student_saved_opportunities FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_saved_opps" ON student_saved_opportunities;
CREATE POLICY "update_own_saved_opps" ON student_saved_opportunities FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved_opps" ON student_saved_opportunities;
CREATE POLICY "delete_own_saved_opps" ON student_saved_opportunities FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Notifications Policies: user only sees their own notifications
DROP POLICY IF EXISTS "select_own_notifications" ON student_notifications;
CREATE POLICY "select_own_notifications" ON student_notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_notifications" ON student_notifications;
CREATE POLICY "update_own_notifications" ON student_notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
