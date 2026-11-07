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
