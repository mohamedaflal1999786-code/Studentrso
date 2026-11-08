-- ==============================================================================
-- STUDENT RSO 2.0 � COMPLETE DATABASE SCHEMA SETUP
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- MIGRATION: 20261009170347_create_user_profiles.sql
-- ------------------------------------------------------------------------------
/*
# Create user_profiles table

1. New Tables
- `user_profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `full_name` (text, nullable)
  - `phone` (text, nullable)
  - `date_of_birth` (date, nullable)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `user_profiles`.
- Each authenticated user can read, insert, and update only their own profile row.
- The `id` column defaults to `auth.uid()` so inserts from the client work without explicitly passing it.
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  date_of_birth date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON user_profiles;
CREATE POLICY "select_own_profile"
ON user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON user_profiles;
CREATE POLICY "insert_own_profile"
ON user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profiles;
CREATE POLICY "update_own_profile"
ON user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261009173306_create_auth_otps.sql
-- ------------------------------------------------------------------------------
/*
# Create auth_otps table for one-time passcodes

1. New Tables
- `auth_otps`
  - `id` (uuid, primary key)
  - `channel` (text: 'email' or 'phone')
  - `target` (text: the email address or phone number)
  - `code` (text: 6-digit OTP code)
  - `expires_at` (timestamptz, 10 minutes from creation)
  - `used` (boolean, default false)
  - `attempts` (int, default 0 — max 5 verification tries)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `auth_otps`.
- Allow anon + authenticated to insert (needed so unauthenticated users can request OTP).
- No SELECT/UPDATE/DELETE from the client — all verification happens server-side.
*/

CREATE TABLE IF NOT EXISTS auth_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL CHECK (channel IN ('email', 'phone')),
  target text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean NOT NULL DEFAULT false,
  attempts int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auth_otps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_otp" ON auth_otps;
CREATE POLICY "anon_insert_otp"
ON auth_otps FOR INSERT
TO anon, authenticated
WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261010053823_revert_auth_otps_permissive_policies.sql
-- ------------------------------------------------------------------------------
/*
# Revert overly permissive auth_otps policies

The self-managed OTP approach was replaced with Supabase's built-in OTP.
Remove the SELECT and UPDATE policies that allowed anyone to read/modify codes.
Keep the INSERT policy (harmless) and the table itself for safety.
*/

DROP POLICY IF EXISTS "anon_select_otp" ON auth_otps;
DROP POLICY IF EXISTS "anon_update_otp" ON auth_otps;
DROP INDEX IF EXISTS idx_auth_otps_target_used;


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106090000_scholarship_student_records.sql
-- ------------------------------------------------------------------------------
-- Student-owned scholarship bookmarks, checklists and application tracker.
-- Scholarship catalogue is maintained in the application code and links to official providers.
create table if not exists public.scholarship_student_records (
  user_id uuid primary key references auth.users(id) on delete cascade,
  bookmarks jsonb not null default '[]'::jsonb,
  applications jsonb not null default '[]'::jsonb,
  checklist jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint scholarship_bookmarks_array check (jsonb_typeof(bookmarks) = 'array'),
  constraint scholarship_applications_array check (jsonb_typeof(applications) = 'array'),
  constraint scholarship_checklist_object check (jsonb_typeof(checklist) = 'object')
);
alter table public.scholarship_student_records enable row level security;
drop policy if exists "students_read_own_scholarship_record" on public.scholarship_student_records;
create policy "students_read_own_scholarship_record" on public.scholarship_student_records
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "students_insert_own_scholarship_record" on public.scholarship_student_records;
create policy "students_insert_own_scholarship_record" on public.scholarship_student_records
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "students_update_own_scholarship_record" on public.scholarship_student_records;
create policy "students_update_own_scholarship_record" on public.scholarship_student_records
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106120000_scholarship_hub_complete.sql
-- ------------------------------------------------------------------------------

    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS source_id text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS provider text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS department text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS education_levels text[] DEFAULT '{}';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS eligible_courses text[] DEFAULT '{}';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS detailed_description text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS benefits_description text DEFAULT '';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS amount_published boolean DEFAULT false;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS amount_details text DEFAULT 'Not officially confirmed';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS academic_year text DEFAULT '2026-2027';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS application_status text DEFAULT 'Upcoming / To Be Announced';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS application_start_date date;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS application_deadline date;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS deadline_notes text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS official_notification_url text;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS last_verified_at timestamptz DEFAULT now();
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'Official portal';
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;
    ALTER TABLE IF EXISTS public.scholarship_programs ADD COLUMN IF NOT EXISTS renewal_notes text;
  
-- Migration: 20261106120000_scholarship_hub_complete.sql
-- Description: Complete schema for Student RSO Module 01 - Scholarship Hub
-- Includes programs, sources, eligibility rules, student profiles, bookmarks,
-- applications, application events, support tickets, and admin audit logs with Row Level Security.

-- 1. Helper function to check if current user is an admin
create or replace function public.is_scholarship_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.user_profiles
    where id = auth.uid()
    and (
      email in ('admin@studentrso.org', 'moderator@studentrso.org')
    )
  );
$$;

-- 2. scholarship_sources
create table if not exists public.scholarship_sources (
  id text primary key,
  name text not null,
  department text not null,
  jurisdiction text not null check (jurisdiction in ('Tamil Nadu', 'Central Government', 'Private / Foundation')),
  portal_url text not null,
  helpline_contact text,
  last_verified_at timestamptz not null default now(),
  verification_status text not null default 'Verified Official Portal' check (verification_status in ('Verified Official Portal', 'Official Provider Website', 'Pending Verification', 'Notice Due')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. scholarship_programs
create table if not exists public.scholarship_programs (
  id text primary key,
  source_id text references public.scholarship_sources(id) on delete set null,
  name text not null,
  code text,
  provider text not null,
  department text not null,
  category text not null check (category in ('Tamil Nadu Government', 'Central Government', 'Institution / Foundation')),
  education_levels text[] not null default '{}',
  eligible_courses text[] not null default '{}',
  summary text not null,
  detailed_description text,
  benefits_description text not null,
  amount_published boolean not null default false,
  amount_details text default 'Not officially confirmed',
  academic_year text not null default '2026-2027',
  application_status text not null default 'Upcoming / To Be Announced' check (application_status in ('Open', 'Upcoming / To Be Announced', 'Verification Due', 'Closed for Current Cycle', 'Always Ongoing')),
  application_start_date date,
  application_deadline date,
  deadline_notes text default 'Refer to the official notification for exact timeline updates.',
  official_notification_url text,
  official_application_url text not null,
  last_verified_at timestamptz not null default now(),
  verification_status text not null default 'Official portal' check (verification_status in ('Official portal', 'Official provider', 'Under Review')),
  is_published boolean not null default true,
  is_renewable boolean not null default false,
  renewal_notes text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scholarship_programs_category on public.scholarship_programs(category);
create index if not exists idx_scholarship_programs_is_published on public.scholarship_programs(is_published);
create index if not exists idx_scholarship_programs_application_status on public.scholarship_programs(application_status);

-- 4. scholarship_eligibility_rules
create table if not exists public.scholarship_eligibility_rules (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_programs(id) on delete cascade,
  min_income_ceiling numeric,
  income_condition_description text,
  min_marks_percentage numeric,
  marks_condition_description text,
  community_categories text[] default '{}',
  gender_eligibility text default 'All',
  disability_required boolean default false,
  tn_govt_school_required boolean default false,
  domicile_required text default 'Tamil Nadu',
  institution_type_eligibility text[] default '{}',
  other_conditions text[] default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_scholarship_rules_program on public.scholarship_eligibility_rules(scholarship_id);

-- 5. scholarship_documents
create table if not exists public.scholarship_documents (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_programs(id) on delete cascade,
  document_name text not null,
  is_mandatory boolean not null default true,
  issuing_authority text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_scholarship_docs_program on public.scholarship_documents(scholarship_id);

-- 6. student_scholarship_profiles
create table if not exists public.student_scholarship_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  education_level text,
  current_course text,
  current_year text,
  institution_type text,
  academic_percentage numeric,
  annual_income_range text,
  state text default 'Tamil Nadu',
  district text,
  community_category text,
  gender text,
  has_disability boolean default false,
  studied_in_tn_govt_school boolean default false,
  is_single_girl_child boolean default false,
  updated_at timestamptz not null default now()
);

-- 7. scholarship_bookmarks
create table if not exists public.scholarship_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id text not null references public.scholarship_programs(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now(),
  constraint uq_user_scholarship_bookmark unique (user_id, scholarship_id)
);

create index if not exists idx_scholarship_bookmarks_user on public.scholarship_bookmarks(user_id);

-- 8. scholarship_applications
create table if not exists public.scholarship_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id text not null references public.scholarship_programs(id) on delete cascade,
  external_application_reference text,
  application_submission_date date,
  academic_year text not null default '2026-2027',
  status text not null default 'Preparing Documents' check (
    status in (
      'Not Applied',
      'Preparing Documents',
      'Submitted',
      'Institution Verification',
      'Department Verification',
      'Approved',
      'Rejected',
      'Payment Processing',
      'Amount Received'
    )
  ),
  is_self_reported boolean not null default true,
  institution_verified_self_report boolean not null default false,
  payment_status_note text,
  disbursed_amount numeric,
  student_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_user_scholarship_application unique (user_id, scholarship_id, academic_year)
);

create index if not exists idx_scholarship_apps_user on public.scholarship_applications(user_id);

-- 9. scholarship_application_events
create table if not exists public.scholarship_application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.scholarship_applications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  previous_status text,
  new_status text not null,
  note text,
  event_timestamp timestamptz not null default now()
);

create index if not exists idx_scholarship_events_app on public.scholarship_application_events(application_id);

-- 10. scholarship_support_tickets
create table if not exists public.scholarship_support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scholarship_id text references public.scholarship_programs(id) on delete set null,
  category text not null check (
    category in (
      'Eligibility Doubts',
      'Application Portal Problems',
      'Document-Related Questions',
      'Payment & DBT Related Questions',
      'Renewal Questions',
      'Other Questions'
    )
  ),
  subject text not null,
  description text not null,
  status text not null default 'Open' check (status in ('Open', 'In Review', 'Answered', 'Resolved', 'Closed')),
  admin_response text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scholarship_tickets_user on public.scholarship_support_tickets(user_id);
create index if not exists idx_scholarship_tickets_status on public.scholarship_support_tickets(status);

-- 11. scholarship_admin_audit_logs
create table if not exists public.scholarship_admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  target_table text not null,
  target_id text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_scholarship_audit_admin on public.scholarship_admin_audit_logs(admin_id);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
alter table public.scholarship_sources enable row level security;
alter table public.scholarship_programs enable row level security;
alter table public.scholarship_eligibility_rules enable row level security;
alter table public.scholarship_documents enable row level security;
alter table public.student_scholarship_profiles enable row level security;
alter table public.scholarship_bookmarks enable row level security;
alter table public.scholarship_applications enable row level security;
alter table public.scholarship_application_events enable row level security;
alter table public.scholarship_support_tickets enable row level security;
alter table public.scholarship_admin_audit_logs enable row level security;

-- Public Catalog Read Access: Anyone (even non-authenticated) can view published scholarships, sources, rules & documents
create policy "public_read_published_sources" on public.scholarship_sources
  for select using (true);

create policy "public_read_published_programs" on public.scholarship_programs
  for select using (is_published = true or public.is_scholarship_admin());

create policy "public_read_eligibility_rules" on public.scholarship_eligibility_rules
  for select using (true);

create policy "public_read_documents" on public.scholarship_documents
  for select using (true);

-- Student Profile Access: Students only manage their own profile
create policy "student_read_own_profile" on public.student_scholarship_profiles
  for select to authenticated using (auth.uid() = user_id);

create policy "student_insert_own_profile" on public.student_scholarship_profiles
  for insert to authenticated with check (auth.uid() = user_id);

create policy "student_update_own_profile" on public.student_scholarship_profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Bookmarks: Students only manage their own bookmarks
create policy "student_read_own_bookmarks" on public.scholarship_bookmarks
  for select to authenticated using (auth.uid() = user_id);

create policy "student_insert_own_bookmarks" on public.scholarship_bookmarks
  for insert to authenticated with check (auth.uid() = user_id);

create policy "student_delete_own_bookmarks" on public.scholarship_bookmarks
  for delete to authenticated using (auth.uid() = user_id);

-- Applications Tracker: Students only manage their own applications
create policy "student_read_own_applications" on public.scholarship_applications
  for select to authenticated using (auth.uid() = user_id);

create policy "student_insert_own_applications" on public.scholarship_applications
  for insert to authenticated with check (auth.uid() = user_id);

create policy "student_update_own_applications" on public.scholarship_applications
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "student_delete_own_applications" on public.scholarship_applications
  for delete to authenticated using (auth.uid() = user_id);

-- Application Events: Students can read and insert events for their own applications
create policy "student_read_own_app_events" on public.scholarship_application_events
  for select to authenticated using (auth.uid() = user_id);

create policy "student_insert_own_app_events" on public.scholarship_application_events
  for insert to authenticated with check (auth.uid() = user_id);

-- Support Tickets: Students manage their own tickets, Admins can view/update all
create policy "student_manage_own_tickets" on public.scholarship_support_tickets
  for select to authenticated using (auth.uid() = user_id or public.is_scholarship_admin());

create policy "student_insert_own_tickets" on public.scholarship_support_tickets
  for insert to authenticated with check (auth.uid() = user_id);

create policy "student_update_own_tickets" on public.scholarship_support_tickets
  for update to authenticated using (auth.uid() = user_id or public.is_scholarship_admin());

-- Admin Permissions for Programs and Sources
create policy "admin_manage_programs" on public.scholarship_programs
  for all to authenticated using (public.is_scholarship_admin()) with check (public.is_scholarship_admin());

create policy "admin_manage_sources" on public.scholarship_sources
  for all to authenticated using (public.is_scholarship_admin()) with check (public.is_scholarship_admin());

create policy "admin_manage_rules" on public.scholarship_eligibility_rules
  for all to authenticated using (public.is_scholarship_admin()) with check (public.is_scholarship_admin());

create policy "admin_manage_documents" on public.scholarship_documents
  for all to authenticated using (public.is_scholarship_admin()) with check (public.is_scholarship_admin());

-- Admin Audit Logs: Admins only
create policy "admin_read_audit_logs" on public.scholarship_admin_audit_logs
  for select to authenticated using (public.is_scholarship_admin());

create policy "admin_insert_audit_logs" on public.scholarship_admin_audit_logs
  for insert to authenticated with check (public.is_scholarship_admin());


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106180000_scholarship_intelligence_v2.sql
-- ------------------------------------------------------------------------------
-- Migration: 20261106180000_scholarship_intelligence_v2.sql
-- Description: Student RSO 2.0 Tamil Nadu Complete Scholarship Intelligence Platform
-- Automated discovery, verified database, academic-year versions, change logs,
-- and automated expiry lifecycles without requiring manual admin input.

-- 1. scholarship_providers
create table if not exists public.scholarship_providers (
  id text primary key,
  name text not null,
  short_name text,
  category text not null check (category in ('Tamil Nadu Government', 'Central Government', 'AICTE', 'UGC', 'ICAR', 'Research Council', 'Institution / Foundation')),
  website_url text not null,
  official_domain text not null,
  is_verified boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. scholarship_sources
create table if not exists public.scholarship_sources (
  id text primary key,
  provider_id text references public.scholarship_providers(id) on delete cascade,
  name text not null,
  feed_url text,
  portal_url text not null,
  connector_type text not null default 'html_scraper' check (connector_type in ('api', 'rss_feed', 'html_scraper', 'pdf_bulletin', 'structured_data')),
  check_frequency_hours integer not null default 24,
  last_checked_at timestamptz,
  last_http_status integer,
  last_content_hash text,
  health_status text not null default 'Active' check (health_status in ('Active', 'Warning', 'Limitation Noted', 'Unavailable')),
  limitation_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. scholarship_programs
create table if not exists public.scholarship_programs (
  id text primary key,
  provider_id text references public.scholarship_providers(id) on delete set null,
  source_id text references public.scholarship_sources(id) on delete set null,
  code text,
  name text not null,
  tamil_name text,
  category text not null check (category in ('Tamil Nadu Government', 'Central Government', 'AICTE', 'UGC', 'ICAR', 'Research Council', 'Institution / Foundation')),
  scheme_type text not null default 'Scholarship' check (scheme_type in ('Scholarship', 'Fellowship', 'Fee Concession', 'Incentive', 'Coaching Assistance')),
  education_stages text[] not null default '{}',
  is_for_tn_residents boolean not null default true,
  is_for_study_in_tn boolean not null default true,
  audience text not null,
  summary text not null,
  benefits_summary text not null,
  official_guidelines_url text,
  official_application_url text not null,
  is_renewable boolean not null default false,
  is_discontinued boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scholarship_programs_category on public.scholarship_programs(category);
create index if not exists idx_scholarship_programs_scheme_type on public.scholarship_programs(scheme_type);

-- 4. scholarship_versions (Academic year versioning)
create table if not exists public.scholarship_versions (
  id uuid primary key default gen_random_uuid(),
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  academic_year text not null, -- e.g. '2026-2027', '2025-2026'
  lifecycle_status text not null default 'Upcoming' check (
    lifecycle_status in (
      'Upcoming',
      'Open',
      'Closing Soon',
      'Closed',
      'Expired',
      'Awaiting New Notification',
      'Source Unavailable',
      'Discontinued'
    )
  ),
  is_current_version boolean not null default true,
  confirmed_benefits text not null,
  amount_published boolean not null default false,
  published_amount_details text,
  application_start_date date,
  application_deadline date,
  is_deadline_extended boolean not null default false,
  original_deadline date,
  notification_bulletin_url text,
  source_verification_date date not null default current_date,
  verification_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_program_academic_year unique (program_id, academic_year)
);

create index if not exists idx_scholarship_versions_lifecycle on public.scholarship_versions(lifecycle_status);
create index if not exists idx_scholarship_versions_current on public.scholarship_versions(program_id, is_current_version);

-- 5. scholarship_eligibility_rules
create table if not exists public.scholarship_eligibility_rules (
  id uuid primary key default gen_random_uuid(),
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  version_id uuid references public.scholarship_versions(id) on delete cascade,
  rules_json jsonb not null default '{}'::jsonb,
  -- Quick indexed fields:
  min_income_ceiling numeric,
  min_marks_percentage numeric,
  gender_eligibility text default 'All',
  community_categories text[] default '{}',
  education_stages text[] default '{}',
  requires_tn_govt_school boolean default false,
  requires_disability boolean default false,
  requires_first_graduate boolean default false,
  requires_completed_ug boolean default false,
  requires_completed_pg boolean default false,
  requires_phd_enrollment boolean default false,
  requires_entrance_exam text[] default '{}', -- e.g. ['UGC-NET', 'CSIR-NET', 'GATE', 'ICAR-AICE']
  created_at timestamptz not null default now()
);

create index if not exists idx_scholarship_rules_program on public.scholarship_eligibility_rules(program_id);

-- 6. scholarship_documents
create table if not exists public.scholarship_documents (
  id uuid primary key default gen_random_uuid(),
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  document_name text not null,
  is_mandatory boolean not null default true,
  issuing_authority text,
  notes text,
  created_at timestamptz not null default now()
);

-- 7. scholarship_discovery_runs (Automation audit telemetry)
create table if not exists public.scholarship_discovery_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  sources_checked integer not null default 0,
  schemes_discovered integer not null default 0,
  updates_detected integer not null default 0,
  deadlines_expired integer not null default 0,
  status text not null default 'Success' check (status in ('Success', 'Partial Warning', 'Error')),
  diagnostics jsonb not null default '[]'::jsonb
);

-- 8. scholarship_change_events (Change detection audit)
create table if not exists public.scholarship_change_events (
  id uuid primary key default gen_random_uuid(),
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  event_type text not null check (event_type in ('NEW_SCHEME', 'NEW_ACADEMIC_YEAR', 'DEADLINE_EXTENSION', 'STATUS_CHANGE', 'BENEFIT_UPDATE', 'RULE_UPDATE', 'EXPIRY')),
  old_value jsonb,
  new_value jsonb,
  detected_at timestamptz not null default now()
);

-- 9. student_scholarship_profiles (Extended Student Coverage)
create table if not exists public.student_scholarship_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  education_stage text not null, -- 'Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate', 'Completed UG', 'Completed PG', 'PhD', 'JRF', 'SRF', 'Postdoctoral'
  course_name text,
  current_year text,
  institution_type text,
  institution_name text,
  academic_percentage numeric,
  annual_family_income numeric,
  income_range text,
  domicile_state text default 'Tamil Nadu',
  district text,
  studies_in_tn boolean default true,
  community_category text,
  gender text,
  has_disability boolean default false,
  studied_in_tn_govt_school boolean default false,
  is_first_generation_graduate boolean default false,
  is_single_girl_child boolean default false,
  -- Research & Completed PG specific:
  highest_qualification text,
  graduation_year integer,
  research_discipline text,
  phd_admission_status text,
  has_ugc_net_jrf boolean default false,
  has_csir_net_jrf boolean default false,
  has_gate boolean default false,
  has_icar_exam boolean default false,
  updated_at timestamptz not null default now()
);

-- 10. scholarship_bookmarks
create table if not exists public.scholarship_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint uq_user_program_bookmark unique (user_id, program_id)
);

-- 11. scholarship_applications (Student tracker)
create table if not exists public.scholarship_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_id text not null references public.scholarship_programs(id) on delete cascade,
  academic_year text not null default '2026-2027',
  external_application_reference text,
  application_submission_date date,
  status text not null default 'Preparing' check (
    status in (
      'Preparing',
      'Submitted',
      'Institution Verification',
      'Department Verification',
      'Approved',
      'Rejected',
      'Payment Processing',
      'Amount Received'
    )
  ),
  is_self_reported boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_user_program_app_cycle unique (user_id, program_id, academic_year)
);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.scholarship_providers enable row level security;
alter table public.scholarship_sources enable row level security;
alter table public.scholarship_programs enable row level security;
alter table public.scholarship_versions enable row level security;
alter table public.scholarship_eligibility_rules enable row level security;
alter table public.scholarship_documents enable row level security;
alter table public.scholarship_discovery_runs enable row level security;
alter table public.scholarship_change_events enable row level security;
alter table public.student_scholarship_profiles enable row level security;
alter table public.scholarship_bookmarks enable row level security;
alter table public.scholarship_applications enable row level security;

-- Public read for catalog data
create policy "public_read_providers" on public.scholarship_providers for select using (true);
create policy "public_read_sources" on public.scholarship_sources for select using (true);
create policy "public_read_programs" on public.scholarship_programs for select using (true);
create policy "public_read_versions" on public.scholarship_versions for select using (true);
create policy "public_read_rules" on public.scholarship_eligibility_rules for select using (true);
create policy "public_read_docs" on public.scholarship_documents for select using (true);
create policy "public_read_discovery_telemetry" on public.scholarship_discovery_runs for select using (true);
create policy "public_read_changes" on public.scholarship_change_events for select using (true);

-- Student private data: Strictly isolated to authenticated student
create policy "student_manage_own_profile" on public.student_scholarship_profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "student_manage_own_bookmarks" on public.scholarship_bookmarks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "student_manage_own_applications" on public.scholarship_applications
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106200000_safety_grievance_system.sql
-- ------------------------------------------------------------------------------
-- Migration: 20261106200000_safety_grievance_system.sql
-- Description: Student RSO 2.0 Module 02 – Safety & Grievance System
-- Tables for statutory authorities, issue categories, helplines,
-- source verifications, and student external complaint reference tracker.

-- 1. safety_categories
create table if not exists public.safety_categories (
  code text primary key,
  number text not null,
  title text not null,
  subtitle text not null,
  icon text not null,
  badge text not null,
  short_description text not null,
  scope_items text[] not null default '{}',
  primary_authorities text[] not null default '{}',
  official_portals jsonb not null default '[]'::jsonb,
  helplines jsonb not null default '[]'::jsonb,
  step_by_step_guidance text[] not null default '{}',
  requested_information text[] not null default '{}',
  acknowledgement_to_save text not null,
  follow_up_process text not null,
  alternative_escalation text not null,
  jurisdiction_limitations text not null,
  last_verified text not null,
  verification_status text not null default 'Official Source – Confirmed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. safety_authorities
create table if not exists public.safety_authorities (
  id text primary key,
  name text not null,
  classification text not null,
  purpose text not null,
  applicable_complaints text[] not null default '{}',
  official_url text not null,
  complaint_url text not null,
  helpline text,
  tel_url text,
  domain text not null,
  verification_status text not null default 'Official Source – Confirmed',
  source_limitations text,
  last_verified text not null,
  created_at timestamptz not null default now()
);

-- 3. safety_helplines
create table if not exists public.safety_helplines (
  number text primary key,
  tel_url text not null,
  title text not null,
  authority text not null,
  purpose text not null,
  hours text not null,
  is_integrated_emergency boolean not null default false,
  priority_order integer not null default 99
);

-- 4. student_reporting_checklists
create table if not exists public.student_reporting_checklists (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed_items text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.student_reporting_checklists enable row level security;

create policy "Users can manage their own reporting checklist"
  on public.student_reporting_checklists
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. student_external_complaint_references
create table if not exists public.student_external_complaint_references (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  authority_name text not null,
  complaint_category text not null,
  external_reference_number text not null,
  submission_date text not null,
  status text not null default 'Submitted' check (status in (
    'Preparing',
    'Submitted',
    'Acknowledged',
    'Under Review',
    'Additional Information Requested',
    'Resolved',
    'Closed'
  )),
  follow_up_date text,
  personal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_student_complaints_user_id
  on public.student_external_complaint_references(user_id);

alter table public.student_external_complaint_references enable row level security;

create policy "Users can view their own external complaint references"
  on public.student_external_complaint_references
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own external complaint references"
  on public.student_external_complaint_references
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own external complaint references"
  on public.student_external_complaint_references
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own external complaint references"
  on public.student_external_complaint_references
  for delete
  using (auth.uid() = user_id);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106210000_certificates_documents_module.sql
-- ------------------------------------------------------------------------------
-- Migration: 20261106210000_certificates_documents_module.sql
-- Description: Student RSO 2.0 Module 03 – Certificate & Document Service
-- Tables for verified certificates catalogue, issuing authorities,
-- student document readiness evaluations, checklists, external application trackers,
-- and renewal reminders with Row Level Security (RLS).

-- 1. certificate_catalogue
create table if not exists public.certificate_catalogue (
  id text primary key,
  title text not null,
  tamil_title text,
  esevai_service_code text,
  category text not null,
  issuing_authority text not null,
  description text not null,
  purpose_summary text not null,
  validity_classification text not null,
  validity_details text not null,
  requires_annual_renewal boolean not null default false,
  renewal_intelligence text not null,
  applicable_stages text[] not null default '{}',
  mandatory_documents text[] not null default '{}',
  conditional_documents text[] not null default '{}',
  official_apply_url text not null,
  official_verify_url text,
  official_download_url text,
  processing_time_days integer not null default 7,
  official_fee_inr integer not null default 60,
  delivery_mode text not null default 'Online Download / e-Sevai Centre',
  last_verified text not null default '2026-11-06',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. certificate_authorities
create table if not exists public.certificate_authorities (
  id text primary key,
  name text not null,
  department text not null,
  jurisdiction text not null,
  portal_name text not null,
  portal_url text not null,
  verification_url text,
  helpline text,
  email text,
  created_at timestamptz not null default now()
);

-- 3. student_document_readiness
create table if not exists public.student_document_readiness (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text,
  education_stage text not null,
  purpose text not null,
  community text,
  is_first_graduate boolean default false,
  annual_family_income numeric,
  has_disability boolean default false,
  is_first_gen boolean default false,
  readiness_percentage integer not null default 0,
  mandatory_missing_count integer not null default 0,
  conditional_count integer not null default 0,
  ready_count integer not null default 0,
  evaluated_at timestamptz not null default now()
);

-- 4. student_document_checklists
create table if not exists public.student_document_checklists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  document_id text not null,
  document_name text not null,
  education_stage text not null,
  is_collected boolean not null default false,
  is_verified boolean not null default false,
  stored_in_digilocker boolean not null default false,
  notes text,
  target_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. student_certificate_trackers
create table if not exists public.student_certificate_trackers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  service_code text,
  certificate_title text not null,
  application_number text not null,
  portal_name text not null,
  portal_tracking_url text not null,
  application_date date not null,
  reported_status text not null default 'Submitted',
  student_disclaimer text not null default 'Student-reported status – not independently verified.',
  target_delivery_date date,
  acknowledgement_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. student_document_reminders
create table if not exists public.student_document_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  document_name text not null,
  document_id text,
  reminder_type text not null, -- 'academic_year_renewal', 'validity_expiry', 'missing_document_procure'
  reminder_date date not null,
  details text not null,
  is_dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.certificate_catalogue enable row level security;
alter table public.certificate_authorities enable row level security;
alter table public.student_document_readiness enable row level security;
alter table public.student_document_checklists enable row level security;
alter table public.student_certificate_trackers enable row level security;
alter table public.student_document_reminders enable row level security;

-- Public read access for static catalogues & authorities
drop policy if exists "Public read certificate catalogue" on public.certificate_catalogue;
create policy "Public read certificate catalogue"
  on public.certificate_catalogue for select
  using (true);

drop policy if exists "Public read certificate authorities" on public.certificate_authorities;
create policy "Public read certificate authorities"
  on public.certificate_authorities for select
  using (true);

-- User-scoped policies for checklists, trackers, readiness, reminders
drop policy if exists "Read student checklists" on public.student_document_checklists;
create policy "Read student checklists"
  on public.student_document_checklists for select
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Insert student checklists" on public.student_document_checklists;
create policy "Insert student checklists"
  on public.student_document_checklists for insert
  with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Update student checklists" on public.student_document_checklists;
create policy "Update student checklists"
  on public.student_document_checklists for update
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Delete student checklists" on public.student_document_checklists;
create policy "Delete student checklists"
  on public.student_document_checklists for delete
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Read student trackers" on public.student_certificate_trackers;
create policy "Read student trackers"
  on public.student_certificate_trackers for select
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Insert student trackers" on public.student_certificate_trackers;
create policy "Insert student trackers"
  on public.student_certificate_trackers for insert
  with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Update student trackers" on public.student_certificate_trackers;
create policy "Update student trackers"
  on public.student_certificate_trackers for update
  using (auth.uid() = user_id or user_id is null);

drop policy if exists "Delete student trackers" on public.student_certificate_trackers;
create policy "Delete student trackers"
  on public.student_certificate_trackers for delete
  using (auth.uid() = user_id or user_id is null);

-- Indexes for performant lookups
create index if not exists idx_certificate_catalogue_category on public.certificate_catalogue(category);
create index if not exists idx_certificate_catalogue_code on public.certificate_catalogue(esevai_service_code);
create index if not exists idx_student_checklists_user on public.student_document_checklists(user_id);
create index if not exists idx_student_trackers_user on public.student_certificate_trackers(user_id);
create index if not exists idx_student_readiness_user on public.student_document_readiness(user_id);


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261106230000_exam_opportunity_hub.sql
-- ------------------------------------------------------------------------------
-- Migration: 20261106230000_exam_opportunity_hub.sql
-- Description: Student RSO 2.0 Module 04 – Complete Examination, Admission & Opportunity Hub
-- Tables for verified Tamil Nadu colleges directory, entrance examinations, single window
-- counselling portals, government competitive recruitment, national apprenticeships,
-- student saved opportunities, and automated source verification audits with RLS.

-- 1. institutions
create table if not exists public.institutions (
  id text primary key,
  name text not null,
  short_name text,
  district text not null,
  city text not null,
  address text not null,
  ownership text not null,
  category text not null,
  affiliated_university text not null,
  is_autonomous boolean not null default false,
  established_year integer not null,
  aishe_code text,
  accreditation text not null,
  statutory_recognition text[] not null default '{}',
  admission_method text not null,
  official_tuition_fee_annual text not null,
  fee_classification text not null,
  hostel_available boolean not null default false,
  hostel_fee_annual text,
  transport_available boolean not null default false,
  official_website text not null,
  official_admission_url text not null,
  verification_status text not null default 'Official Authority Confirmed',
  last_verified date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. institution_courses
create table if not exists public.institution_courses (
  id uuid primary key default gen_random_uuid(),
  institution_id text not null references public.institutions(id) on delete cascade,
  course_name text not null,
  degree_level text not null,
  duration_years numeric not null,
  annual_intake integer,
  eligibility text not null,
  admission_route text not null,
  tuition_fee_text text not null,
  official_annual_tuition_inr integer,
  created_at timestamptz not null default now()
);

-- 3. entrance_examinations
create table if not exists public.entrance_examinations (
  id text primary key,
  name text not null,
  short_code text not null,
  conducting_authority text not null,
  authority_website text not null,
  examination_type text not null,
  target_discipline text not null,
  target_stages text[] not null default '{}',
  eligible_courses text[] not null default '{}',
  basic_eligibility text not null,
  examination_format text not null,
  counselling_body text not null,
  official_application_portal text not null,
  tentative_month text not null,
  application_fee_text text not null,
  verification_status text not null default 'Official Authority Confirmed',
  created_at timestamptz not null default now()
);

-- 4. admission_portals
create table if not exists public.admission_portals (
  id text primary key,
  portal_name text not null,
  counselling_authority text not null,
  department text not null,
  applicable_courses text[] not null default '{}',
  application_mode text not null,
  official_website_url text not null,
  guidelines_url text not null,
  reservation_policy_summary text not null,
  mandatory_documents text[] not null default '{}',
  verification_status text not null default 'Official Authority Confirmed',
  created_at timestamptz not null default now()
);

-- 5. competitive_examinations
create table if not exists public.competitive_examinations (
  id text primary key,
  title text not null,
  short_code text not null,
  conducting_body text not null,
  government_tier text not null,
  target_posts text[] not null default '{}',
  minimum_qualification text not null,
  eligible_stages text[] not null default '{}',
  age_limit_text text not null,
  selection_process text not null,
  salary_pay_scale text not null,
  application_url text not null,
  current_cycle_status text not null,
  verification_status text not null default 'Official Authority Confirmed',
  created_at timestamptz not null default now()
);

-- 6. opportunity_jobs
create table if not exists public.opportunity_jobs (
  id text primary key,
  title text not null,
  opportunity_type text not null,
  organization text not null,
  location text not null,
  district text not null,
  qualification_required text not null,
  eligible_stages text[] not null default '{}',
  stipend_or_salary text not null,
  application_deadline text not null,
  official_source_portal text not null,
  application_url text not null,
  experience_level text not null default 'Freshers Welcome',
  verification_status text not null default 'Official Authority Confirmed',
  created_at timestamptz not null default now()
);

-- 7. student_saved_colleges
create table if not exists public.student_saved_colleges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  college_id text not null references public.institutions(id) on delete cascade,
  status text not null default 'Interested',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. source_verification_audit
create table if not exists public.source_verification_audit (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_domain text not null,
  portal_url text not null,
  check_type text not null default 'Automated Reachability & Hash Check',
  status_code integer not null default 200,
  is_reachable boolean not null default true,
  content_hash text,
  last_checked timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.institutions enable row level security;
alter table public.institution_courses enable row level security;
alter table public.entrance_examinations enable row level security;
alter table public.admission_portals enable row level security;
alter table public.competitive_examinations enable row level security;
alter table public.opportunity_jobs enable row level security;
alter table public.student_saved_colleges enable row level security;
alter table public.source_verification_audit enable row level security;

-- Public Read Policies for verified directories
create policy "Allow public read access on institutions"
  on public.institutions for select
  using (true);

create policy "Allow public read access on institution_courses"
  on public.institution_courses for select
  using (true);

create policy "Allow public read access on entrance_examinations"
  on public.entrance_examinations for select
  using (true);

create policy "Allow public read access on admission_portals"
  on public.admission_portals for select
  using (true);

create policy "Allow public read access on competitive_examinations"
  on public.competitive_examinations for select
  using (true);

create policy "Allow public read access on opportunity_jobs"
  on public.opportunity_jobs for select
  using (true);

create policy "Allow public read access on source_verification_audit"
  on public.source_verification_audit for select
  using (true);

-- User-scoped policies for student_saved_colleges
create policy "Users can view their own saved colleges"
  on public.student_saved_colleges for select
  using (auth.uid() = user_id or (auth.uid() is null and session_id is not null));

create policy "Users can insert their own saved colleges"
  on public.student_saved_colleges for insert
  with check (auth.uid() = user_id or (auth.uid() is null and session_id is not null));

create policy "Users can update their own saved colleges"
  on public.student_saved_colleges for update
  using (auth.uid() = user_id or (auth.uid() is null and session_id is not null));

create policy "Users can delete their own saved colleges"
  on public.student_saved_colleges for delete
  using (auth.uid() = user_id or (auth.uid() is null and session_id is not null));


-- ------------------------------------------------------------------------------
-- MIGRATION: 20261107220000_student_auth_dashboard.sql
-- ------------------------------------------------------------------------------
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


