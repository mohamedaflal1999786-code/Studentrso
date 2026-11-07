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
