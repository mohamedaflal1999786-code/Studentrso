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
