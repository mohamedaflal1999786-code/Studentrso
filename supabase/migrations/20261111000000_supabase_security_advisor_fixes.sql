-- Migration: 20261111000000_supabase_security_advisor_fixes.sql
-- Purpose: Resolve all Supabase Security Advisor Errors, SQL Warnings, and Info Suggestions.
-- Note: The remaining Auth warning ("Leaked password protection is currently disabled")
-- must be toggled ON in Supabase Dashboard -> Authentication -> Sign In / Providers (Password Protection).

-- ============================================================================
-- 1. ERRORS: Enable RLS on Module 02 public reference tables
-- ============================================================================
ALTER TABLE IF EXISTS public.safety_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.safety_authorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.safety_helplines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_safety_categories" ON public.safety_categories;
CREATE POLICY "public_read_safety_categories"
  ON public.safety_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public_read_safety_authorities" ON public.safety_authorities;
CREATE POLICY "public_read_safety_authorities"
  ON public.safety_authorities
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public_read_safety_helplines" ON public.safety_helplines;
CREATE POLICY "public_read_safety_helplines"
  ON public.safety_helplines
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Defense-in-depth: strip direct client write privileges on reference tables
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_categories FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_authorities FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.safety_helplines FROM anon, authenticated;

-- ============================================================================
-- 2. WARNINGS: Harden public.is_scholarship_admin
-- Eliminates:
--   - Function Search Path Mutable
--   - 0028_anon_security_definer_function_executable
--   - 0029_authenticated_security_definer_function_executable
-- Uses SECURITY INVOKER + immutable empty search_path + signed auth.jwt() claims
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

-- Ensure any overloaded variants in live schema also have immutable search_path and SECURITY INVOKER
DO $$
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
END $$;

-- ============================================================================
-- 3. WARNING: Replace permissive WITH CHECK (true) INSERT policy on auth_otps
-- OTP generation/verification happens strictly server-side using service_role
-- ============================================================================
ALTER TABLE IF EXISTS public.auth_otps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_otp" ON public.auth_otps;
DROP POLICY IF EXISTS "anon_select_otp" ON public.auth_otps;
DROP POLICY IF EXISTS "anon_update_otp" ON public.auth_otps;
DROP POLICY IF EXISTS "deny_client_access_auth_otps" ON public.auth_otps;

CREATE POLICY "deny_client_access_auth_otps"
  ON public.auth_otps
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- 4. INFO: Add explicit least-privilege RLS policies for tables with RLS enabled
-- ============================================================================
-- 4a. auth_failed_logins: server/service_role only
ALTER TABLE IF EXISTS public.auth_failed_logins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "deny_client_access_auth_failed_logins" ON public.auth_failed_logins;
CREATE POLICY "deny_client_access_auth_failed_logins"
  ON public.auth_failed_logins
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- 4b. student_document_readiness: owner-only for authenticated students
ALTER TABLE IF EXISTS public.student_document_readiness ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_document_readiness" ON public.student_document_readiness;
DROP POLICY IF EXISTS "insert_own_document_readiness" ON public.student_document_readiness;
DROP POLICY IF EXISTS "update_own_document_readiness" ON public.student_document_readiness;
DROP POLICY IF EXISTS "delete_own_document_readiness" ON public.student_document_readiness;

CREATE POLICY "select_own_document_readiness"
  ON public.student_document_readiness
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "insert_own_document_readiness"
  ON public.student_document_readiness
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_document_readiness"
  ON public.student_document_readiness
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_document_readiness"
  ON public.student_document_readiness
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4c. student_document_reminders: owner-only for authenticated students
ALTER TABLE IF EXISTS public.student_document_reminders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_document_reminders" ON public.student_document_reminders;
DROP POLICY IF EXISTS "insert_own_document_reminders" ON public.student_document_reminders;
DROP POLICY IF EXISTS "update_own_document_reminders" ON public.student_document_reminders;
DROP POLICY IF EXISTS "delete_own_document_reminders" ON public.student_document_reminders;

CREATE POLICY "select_own_document_reminders"
  ON public.student_document_reminders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "insert_own_document_reminders"
  ON public.student_document_reminders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_document_reminders"
  ON public.student_document_reminders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_document_reminders"
  ON public.student_document_reminders
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
