-- Migration: 20261111000000_supabase_security_advisor_fixes.sql
-- Purpose: Resolve all Supabase Security Advisor Errors, SQL Warnings, Info Suggestions,
--          and Runtime Schema Mismatches so Postgres, PostgREST (API Gateway), and Auth run at 100%.
-- Note: Also toggle ON "Leaked password protection" in Supabase Dashboard ->
--       Authentication -> Sign In / Providers (Password Protection).

-- ============================================================================
-- 1. ERRORS: Enable RLS & public read-only SELECT on Module 02 reference tables
-- ============================================================================
DO $mig$
BEGIN
  IF to_regclass('public.safety_categories') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.safety_categories ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "public_read_safety_categories" ON public.safety_categories';
    EXECUTE 'CREATE POLICY "public_read_safety_categories" ON public.safety_categories FOR SELECT TO anon, authenticated USING (true)';
    EXECUTE 'REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_categories FROM anon, authenticated';
  END IF;

  IF to_regclass('public.safety_authorities') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.safety_authorities ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "public_read_safety_authorities" ON public.safety_authorities';
    EXECUTE 'CREATE POLICY "public_read_safety_authorities" ON public.safety_authorities FOR SELECT TO anon, authenticated USING (true)';
    EXECUTE 'REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_authorities FROM anon, authenticated';
  END IF;

  IF to_regclass('public.safety_helplines') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.safety_helplines ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "public_read_safety_helplines" ON public.safety_helplines';
    EXECUTE 'CREATE POLICY "public_read_safety_helplines" ON public.safety_helplines FOR SELECT TO anon, authenticated USING (true)';
    EXECUTE 'REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_helplines FROM anon, authenticated';
  END IF;
END $mig$;

-- ============================================================================
-- 2. WARNINGS: Harden public.is_scholarship_admin
-- Eliminates:
--   - Function Search Path Mutable
--   - 0028_anon_security_definer_function_executable
--   - 0029_authenticated_security_definer_function_executable
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_scholarship_admin()
RETURNS boolean
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
STABLE
AS $$
  SELECT
    auth.role() = 'authenticated'
    AND (
      lower(coalesce(auth.jwt() ->> 'email', '')) IN (
        'admin@studentrso.org',
        'moderator@studentrso.org',
        'admin@studentrso.in'
      )
      OR coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    );
$$;

DO $mig$
DECLARE
  fn_sig text;
BEGIN
  FOR fn_sig IN
    SELECT p.oid::regprocedure::text
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'is_scholarship_admin'
  LOOP
    EXECUTE format('ALTER FUNCTION %s SECURITY INVOKER SET search_path = ''''', fn_sig);
  END LOOP;
END $mig$;

-- ============================================================================
-- 3. WARNING + SCHEMA: Lock down public.auth_otps & normalize OTP columns
-- ============================================================================
DO $mig$
BEGIN
  IF to_regclass('public.auth_otps') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS channel text DEFAULT ''email''';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS target text';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS code text';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS code_hash text';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS purpose text DEFAULT ''signup''';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS used boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS attempts int DEFAULT 0';
    EXECUTE 'ALTER TABLE public.auth_otps ADD COLUMN IF NOT EXISTS max_attempts int DEFAULT 5';

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'auth_otps'
        AND column_name = 'code' AND is_nullable = 'NO'
    ) THEN
      EXECUTE 'ALTER TABLE public.auth_otps ALTER COLUMN code DROP NOT NULL';
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'auth_otps'
        AND column_name = 'code_hash' AND is_nullable = 'NO'
    ) THEN
      EXECUTE 'ALTER TABLE public.auth_otps ALTER COLUMN code_hash DROP NOT NULL';
    END IF;

    EXECUTE 'ALTER TABLE public.auth_otps ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "anon_insert_otp" ON public.auth_otps';
    EXECUTE 'DROP POLICY IF EXISTS "anon_select_otp" ON public.auth_otps';
    EXECUTE 'DROP POLICY IF EXISTS "anon_update_otp" ON public.auth_otps';
    EXECUTE 'DROP POLICY IF EXISTS "deny_client_access_auth_otps" ON public.auth_otps';
    EXECUTE 'CREATE POLICY "deny_client_access_auth_otps" ON public.auth_otps FOR ALL TO anon, authenticated USING (false) WITH CHECK (false)';
  END IF;
END $mig$;

-- ============================================================================
-- 4. INFO: Add explicit least-privilege RLS policies for tables with RLS enabled
-- ============================================================================
DO $mig$
BEGIN
  IF to_regclass('public.auth_failed_logins') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.auth_failed_logins ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "deny_client_access_auth_failed_logins" ON public.auth_failed_logins';
    EXECUTE 'CREATE POLICY "deny_client_access_auth_failed_logins" ON public.auth_failed_logins FOR ALL TO anon, authenticated USING (false) WITH CHECK (false)';
  END IF;

  IF to_regclass('public.student_document_readiness') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.student_document_readiness ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "select_own_document_readiness" ON public.student_document_readiness';
    EXECUTE 'DROP POLICY IF EXISTS "insert_own_document_readiness" ON public.student_document_readiness';
    EXECUTE 'DROP POLICY IF EXISTS "update_own_document_readiness" ON public.student_document_readiness';
    EXECUTE 'DROP POLICY IF EXISTS "delete_own_document_readiness" ON public.student_document_readiness';
    EXECUTE 'CREATE POLICY "select_own_document_readiness" ON public.student_document_readiness FOR SELECT TO authenticated USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "insert_own_document_readiness" ON public.student_document_readiness FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "update_own_document_readiness" ON public.student_document_readiness FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "delete_own_document_readiness" ON public.student_document_readiness FOR DELETE TO authenticated USING (auth.uid() = user_id)';
  END IF;

  IF to_regclass('public.student_document_reminders') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.student_document_reminders ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "select_own_document_reminders" ON public.student_document_reminders';
    EXECUTE 'DROP POLICY IF EXISTS "insert_own_document_reminders" ON public.student_document_reminders';
    EXECUTE 'DROP POLICY IF EXISTS "update_own_document_reminders" ON public.student_document_reminders';
    EXECUTE 'DROP POLICY IF EXISTS "delete_own_document_reminders" ON public.student_document_reminders';
    EXECUTE 'CREATE POLICY "select_own_document_reminders" ON public.student_document_reminders FOR SELECT TO authenticated USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "insert_own_document_reminders" ON public.student_document_reminders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "update_own_document_reminders" ON public.student_document_reminders FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "delete_own_document_reminders" ON public.student_document_reminders FOR DELETE TO authenticated USING (auth.uid() = user_id)';
  END IF;
END $mig$;

-- ============================================================================
-- 5. RUNTIME SCHEMA FIXES: Add missing user_profiles columns & drop stale FKs
-- Eliminates Postgres SQL errors (42703 column does not exist / 23503 FK violation)
-- ============================================================================
DO $mig$
BEGIN
  IF to_regclass('public.user_profiles') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS phone text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS date_of_birth date';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS state text DEFAULT ''Tamil Nadu''';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS district text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS city text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS education_level text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS course text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS specialization text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS academic_year text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS institution_name text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS graduation_year int';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS academic_percentage numeric(5,2)';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS cgpa numeric(4,2)';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS annual_family_income text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS community_category text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS gender text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS studied_in_tn_govt_school boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS is_first_graduate boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS is_single_girl_child boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS has_disability boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS study_interests text[] DEFAULT ''{}''';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS career_interests text[] DEFAULT ''{}''';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS learning_preferences text[] DEFAULT ''{}''';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT ''{}''::jsonb';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS avatar_url text';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS has_password boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false';
  END IF;
END $mig$;

-- Allow scholarship tracker tables to reference app-defined scholarship IDs without FK errors
DO $mig$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT c.conrelid::regclass::text AS tbl, c.conname
    FROM pg_constraint c
    WHERE c.contype = 'f'
      AND c.confrelid = to_regclass('public.scholarship_programs')
      AND c.conrelid IN (
        to_regclass('public.scholarship_bookmarks'),
        to_regclass('public.scholarship_applications'),
        to_regclass('public.scholarship_support_tickets')
      )
  LOOP
    EXECUTE format('ALTER TABLE %s DROP CONSTRAINT IF EXISTS %I', r.tbl, r.conname);
  END LOOP;
END $mig$;

-- ============================================================================
-- 6. RUNTIME SCHEMA ALIGNMENT FOR SCHOLARSHIP TRACKERS & PROFILES
-- Eliminates 42703 ("column ... does not exist") and 400 API Gateway warnings on
-- /rest/v1/scholarship_bookmarks, /rest/v1/scholarship_applications, etc.
-- ============================================================================
DO $mig$
DECLARE
  chk record;
BEGIN
  -- 6a. scholarship_bookmarks (ensure notes, scholarship_id, created_at, unique index)
  CREATE TABLE IF NOT EXISTS public.scholarship_bookmarks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    scholarship_id text not null,
    notes text,
    created_at timestamptz not null default now()
  );

  EXECUTE 'ALTER TABLE public.scholarship_bookmarks ADD COLUMN IF NOT EXISTS scholarship_id text';
  EXECUTE 'ALTER TABLE public.scholarship_bookmarks ADD COLUMN IF NOT EXISTS notes text';
  EXECUTE 'ALTER TABLE public.scholarship_bookmarks ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now()';

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scholarship_bookmarks' AND column_name = 'program_id'
  ) THEN
    EXECUTE 'ALTER TABLE public.scholarship_bookmarks ALTER COLUMN program_id DROP NOT NULL';
    EXECUTE 'UPDATE public.scholarship_bookmarks SET scholarship_id = program_id WHERE scholarship_id IS NULL AND program_id IS NOT NULL';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_index i
    JOIN pg_class c ON c.oid = i.indrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'scholarship_bookmarks'
      AND i.indisunique AND i.indpred IS NULL
      AND pg_get_indexdef(i.indexrelid) ILIKE '%(user_id, scholarship_id)%'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS idx_scholarship_bookmarks_user_schol_uidx ON public.scholarship_bookmarks(user_id, scholarship_id)';
  END IF;

  EXECUTE 'ALTER TABLE public.scholarship_bookmarks ENABLE ROW LEVEL SECURITY';
  EXECUTE 'DROP POLICY IF EXISTS "student_read_own_bookmarks" ON public.scholarship_bookmarks';
  EXECUTE 'DROP POLICY IF EXISTS "student_insert_own_bookmarks" ON public.scholarship_bookmarks';
  EXECUTE 'DROP POLICY IF EXISTS "student_update_own_bookmarks" ON public.scholarship_bookmarks';
  EXECUTE 'DROP POLICY IF EXISTS "student_delete_own_bookmarks" ON public.scholarship_bookmarks';
  EXECUTE 'DROP POLICY IF EXISTS "student_manage_own_bookmarks" ON public.scholarship_bookmarks';
  EXECUTE 'CREATE POLICY "student_manage_own_bookmarks" ON public.scholarship_bookmarks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';

  -- 6b. scholarship_applications (ensure institution_verified_self_report & tracker columns)
  CREATE TABLE IF NOT EXISTS public.scholarship_applications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    scholarship_id text not null,
    external_application_reference text,
    application_submission_date date,
    academic_year text not null default '2026-2027',
    status text not null default 'Preparing Documents',
    is_self_reported boolean not null default true,
    institution_verified_self_report boolean not null default false,
    payment_status_note text,
    disbursed_amount numeric,
    student_notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS scholarship_id text';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS external_application_reference text';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS application_submission_date date';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS academic_year text DEFAULT ''2026-2027''';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS status text DEFAULT ''Preparing Documents''';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS is_self_reported boolean DEFAULT true';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS institution_verified_self_report boolean DEFAULT false';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS payment_status_note text';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS disbursed_amount numeric';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS student_notes text';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now()';
  EXECUTE 'ALTER TABLE public.scholarship_applications ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now()';

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scholarship_applications' AND column_name = 'program_id'
  ) THEN
    EXECUTE 'ALTER TABLE public.scholarship_applications ALTER COLUMN program_id DROP NOT NULL';
    EXECUTE 'UPDATE public.scholarship_applications SET scholarship_id = program_id WHERE scholarship_id IS NULL AND program_id IS NOT NULL';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scholarship_applications' AND column_name = 'notes'
  ) THEN
    EXECUTE 'UPDATE public.scholarship_applications SET student_notes = notes WHERE student_notes IS NULL AND notes IS NOT NULL';
  END IF;

  -- Relax legacy status check constraints (e.g., if only 'Preparing' was allowed instead of 'Preparing Documents' / 'Not Applied')
  FOR chk IN
    SELECT c.conname
    FROM pg_constraint c
    WHERE c.contype = 'c'
      AND c.conrelid = 'public.scholarship_applications'::regclass
      AND pg_get_constraintdef(c.oid) ILIKE '%status%'
  LOOP
    EXECUTE format('ALTER TABLE public.scholarship_applications DROP CONSTRAINT IF EXISTS %I', chk.conname);
  END LOOP;

  EXECUTE $sql$
    ALTER TABLE public.scholarship_applications
      ADD CONSTRAINT chk_scholarship_applications_status CHECK (
        status IN (
          'Not Applied',
          'Preparing',
          'Preparing Documents',
          'Submitted',
          'Institution Verification',
          'Department Verification',
          'Approved',
          'Rejected',
          'Payment Processing',
          'Amount Received'
        )
      )
  $sql$;

  IF NOT EXISTS (
    SELECT 1 FROM pg_index i
    JOIN pg_class c ON c.oid = i.indrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'scholarship_applications'
      AND i.indisunique AND i.indpred IS NULL
      AND pg_get_indexdef(i.indexrelid) ILIKE '%(user_id, scholarship_id, academic_year)%'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS idx_scholarship_apps_user_schol_year_uidx ON public.scholarship_applications(user_id, scholarship_id, academic_year)';
  END IF;

  EXECUTE 'ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY';
  EXECUTE 'DROP POLICY IF EXISTS "student_read_own_applications" ON public.scholarship_applications';
  EXECUTE 'DROP POLICY IF EXISTS "student_insert_own_applications" ON public.scholarship_applications';
  EXECUTE 'DROP POLICY IF EXISTS "student_update_own_applications" ON public.scholarship_applications';
  EXECUTE 'DROP POLICY IF EXISTS "student_delete_own_applications" ON public.scholarship_applications';
  EXECUTE 'DROP POLICY IF EXISTS "student_manage_own_applications" ON public.scholarship_applications';
  EXECUTE 'CREATE POLICY "student_manage_own_applications" ON public.scholarship_applications FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';

  -- 6c. student_scholarship_profiles (align API columns & relax legacy education_stage NOT NULL)
  IF to_regclass('public.student_scholarship_profiles') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS education_level text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS current_course text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS current_year text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS institution_type text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS academic_percentage numeric';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS annual_income_range text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS state text DEFAULT ''Tamil Nadu''';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS district text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS community_category text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS gender text';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS has_disability boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS studied_in_tn_govt_school boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS is_single_girl_child boolean DEFAULT false';
    EXECUTE 'ALTER TABLE public.student_scholarship_profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now()';

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'student_scholarship_profiles'
        AND column_name = 'education_stage' AND is_nullable = 'NO'
    ) THEN
      EXECUTE 'ALTER TABLE public.student_scholarship_profiles ALTER COLUMN education_stage DROP NOT NULL';
    END IF;
  END IF;

  -- 6d. scholarship_student_records (checklist & tracker sync table)
  CREATE TABLE IF NOT EXISTS public.scholarship_student_records (
    user_id uuid primary key references auth.users(id) on delete cascade,
    bookmarks jsonb not null default '[]'::jsonb,
    applications jsonb not null default '[]'::jsonb,
    checklist jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
  );
  EXECUTE 'ALTER TABLE public.scholarship_student_records ADD COLUMN IF NOT EXISTS bookmarks jsonb DEFAULT ''[]''::jsonb';
  EXECUTE 'ALTER TABLE public.scholarship_student_records ADD COLUMN IF NOT EXISTS applications jsonb DEFAULT ''[]''::jsonb';
  EXECUTE 'ALTER TABLE public.scholarship_student_records ADD COLUMN IF NOT EXISTS checklist jsonb DEFAULT ''{}''::jsonb';
  EXECUTE 'ALTER TABLE public.scholarship_student_records ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now()';
  EXECUTE 'ALTER TABLE public.scholarship_student_records ENABLE ROW LEVEL SECURITY';
  EXECUTE 'DROP POLICY IF EXISTS "students_read_own_scholarship_record" ON public.scholarship_student_records';
  EXECUTE 'DROP POLICY IF EXISTS "students_insert_own_scholarship_record" ON public.scholarship_student_records';
  EXECUTE 'DROP POLICY IF EXISTS "students_update_own_scholarship_record" ON public.scholarship_student_records';
  EXECUTE 'CREATE POLICY "students_read_own_scholarship_record" ON public.scholarship_student_records FOR SELECT TO authenticated USING (auth.uid() = user_id)';
  EXECUTE 'CREATE POLICY "students_insert_own_scholarship_record" ON public.scholarship_student_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)';
  EXECUTE 'CREATE POLICY "students_update_own_scholarship_record" ON public.scholarship_student_records FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
END $mig$;
