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
