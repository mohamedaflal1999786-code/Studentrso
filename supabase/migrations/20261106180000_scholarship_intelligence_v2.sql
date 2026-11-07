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
