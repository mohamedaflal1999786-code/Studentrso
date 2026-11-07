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
