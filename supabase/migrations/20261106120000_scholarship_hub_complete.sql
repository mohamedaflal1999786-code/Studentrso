
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
