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
