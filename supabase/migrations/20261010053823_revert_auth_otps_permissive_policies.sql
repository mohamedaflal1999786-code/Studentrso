/*
# Revert overly permissive auth_otps policies

The self-managed OTP approach was replaced with Supabase's built-in OTP.
Remove the SELECT and UPDATE policies that allowed anyone to read/modify codes.
Keep the INSERT policy (harmless) and the table itself for safety.
*/

DROP POLICY IF EXISTS "anon_select_otp" ON auth_otps;
DROP POLICY IF EXISTS "anon_update_otp" ON auth_otps;
DROP INDEX IF EXISTS idx_auth_otps_target_used;
