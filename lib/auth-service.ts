import crypto from 'crypto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface UserProfileData {
  id: string;
  email: string;
  full_name: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  state?: string;
  district?: string;
  city?: string;
  education_level?: string;
  course?: string;
  specialization?: string;
  academic_year?: string;
  institution_name?: string;
  graduation_year?: number;
  academic_percentage?: number | null;
  cgpa?: number | null;
  annual_family_income?: string;
  community_category?: string;
  studied_in_tn_govt_school?: boolean;
  is_first_graduate?: boolean;
  is_single_girl_child?: boolean;
  has_disability?: boolean;
  study_interests?: string[];
  career_interests?: string[];
  learning_preferences?: string[];
  notification_preferences?: {
    scholarship_alerts?: boolean;
    internship_alerts?: boolean;
    examination_alerts?: boolean;
    admission_alerts?: boolean;
    deadline_reminders?: boolean;
    security_alerts?: boolean;
    promotional_emails?: boolean;
  };
  onboarding_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SavedOpportunityRecord {
  id: string;
  user_id: string;
  opportunity_id: string;
  category: string;
  title: string;
  awarding_authority?: string;
  official_url: string;
  deadline?: string;
  status:
    | 'Interested'
    | 'Saved'
    | 'Preparing Documents'
    | 'Applied'
    | 'Under Review'
    | 'Approved'
    | 'Rejected'
    | 'Closed';
  notes?: string;
  applied_at?: string;
  created_at: string;
  updated_at: string;
}

interface StoredAccount {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  verified: boolean;
  profile: UserProfileData;
  created_at: string;
}

interface StoredOtp {
  id: string;
  target: string;
  codeHash: string;
  salt: string;
  purpose: 'signup' | 'login' | 'reset';
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
  used: boolean;
  createdAt: number;
}

interface LockoutRecord {
  attempts: number;
  lockedUntil: number | null;
  lastAttempt: number;
}

// In-Memory Secure Store (Synchronous fallback for demo/local without DB credentials)
const accountsStore = new Map<string, StoredAccount>();
const otpStore = new Map<string, StoredOtp>();
const lockoutStore = new Map<string, LockoutRecord>();
const savedOppsStore = new Map<string, SavedOpportunityRecord[]>(); // user_id -> records

// Pre-seed an initial verified student for instant demonstration if needed
const seedSalt = crypto.randomBytes(16).toString('hex');
const seedHash = crypto.pbkdf2Sync('StudentRSO@2026', seedSalt, 100000, 64, 'sha512').toString('hex');
const seedId = 'usr-student-001';
accountsStore.set('student@studentrso.in', {
  id: seedId,
  email: 'student@studentrso.in',
  passwordHash: seedHash,
  passwordSalt: seedSalt,
  verified: true,
  created_at: new Date().toISOString(),
  profile: {
    id: seedId,
    email: 'student@studentrso.in',
    full_name: 'Ananya Ramanathan',
    state: 'Tamil Nadu',
    district: 'Chennai',
    city: 'Chennai',
    education_level: 'Undergraduate',
    course: 'B.E. Computer Science and Engineering',
    specialization: 'Artificial Intelligence & Data Systems',
    academic_year: '3rd Year',
    institution_name: 'Anna University, CEG Campus',
    graduation_year: 2027,
    academic_percentage: 88.5,
    cgpa: 8.9,
    annual_family_income: 'Below ₹2,50,000',
    community_category: 'BC',
    studied_in_tn_govt_school: true,
    is_first_graduate: true,
    is_single_girl_child: false,
    has_disability: false,
    study_interests: ['Computer Science and IT', 'Engineering', 'Research'],
    career_interests: ['Higher education', 'Private-sector employment', 'Internships and apprenticeships'],
    learning_preferences: ['Finding scholarships', 'Internships', 'Skill development', 'Career planning'],
    notification_preferences: {
      scholarship_alerts: true,
      internship_alerts: true,
      examination_alerts: true,
      admission_alerts: true,
      deadline_reminders: true,
      security_alerts: true,
      promotional_emails: false,
    },
    onboarding_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
});

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'your_supabase_project_url' || key === 'your_supabase_anon_key') {
    return null;
  }
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

/**
 * Validates password strength (min 12 chars per user prompt requirement)
 */
export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, reason: 'Password is required.' };
  }
  if (password.length < 12) {
    return { valid: false, reason: 'Password must be at least 12 characters long.' };
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigitOrSpecial = /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  if (!hasLetter || !hasDigitOrSpecial) {
    return { valid: false, reason: 'Password must contain a mix of letters and numbers/symbols.' };
  }
  return { valid: true };
}

/**
 * Computes cryptographically salted hash using PBKDF2 with 100,000 iterations (OWASP compliant)
 */
export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const check = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
  } catch {
    return false;
  }
}

/**
 * 5-Attempt Failure Tracker & 60-Second Lockout Manager
 */
export function checkLoginLockout(identifier: string): { locked: boolean; remainingSeconds: number } {
  const key = identifier.toLowerCase().trim();
  const record = lockoutStore.get(key);
  if (!record) return { locked: false, remainingSeconds: 0 };

  const now = Date.now();
  if (record.lockedUntil) {
    if (now < record.lockedUntil) {
      const remaining = Math.ceil((record.lockedUntil - now) / 1000);
      return { locked: true, remainingSeconds: Math.max(1, remaining) };
    } else {
      // Lock has expired -> auto-release
      lockoutStore.delete(key);
      return { locked: false, remainingSeconds: 0 };
    }
  }

  return { locked: false, remainingSeconds: 0 };
}

export function recordFailedLogin(identifier: string): { locked: boolean; remainingSeconds: number; attempts: number } {
  const key = identifier.toLowerCase().trim();
  const now = Date.now();
  const record = lockoutStore.get(key) || { attempts: 0, lockedUntil: null, lastAttempt: now };

  record.attempts += 1;
  record.lastAttempt = now;

  // Exact rule: "if password is incorrect give five attempt after five lock the password text for 60 sec then release"
  if (record.attempts >= 5) {
    record.lockedUntil = now + 60 * 1000; // 60 seconds
    lockoutStore.set(key, record);
    return { locked: true, remainingSeconds: 60, attempts: record.attempts };
  }

  lockoutStore.set(key, record);
  return { locked: false, remainingSeconds: 0, attempts: record.attempts };
}

export function resetLoginLockout(identifier: string): void {
  lockoutStore.delete(identifier.toLowerCase().trim());
}

/**
 * Secure 6-Digit Email OTP Generator & Manager
 */
export function generateEmailOtp(
  email: string,
  purpose: 'signup' | 'login' | 'reset' = 'signup'
): { plainOtp: string; expiresAt: number } {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Invalidate any previous unused OTP for this target and purpose
  for (const [id, record] of Array.from(otpStore.entries())) {
    if (record.target === normalizedEmail && record.purpose === purpose && !record.used) {
      otpStore.delete(id);
    }
  }

  // Cryptographically secure 6-digit number
  const otpCode = crypto.randomInt(100000, 1000000).toString();
  const salt = crypto.randomBytes(16).toString('hex');
  const codeHash = crypto.createHmac('sha256', salt).update(otpCode).digest('hex');
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  const otpId = `otp-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  otpStore.set(otpId, {
    id: otpId,
    target: normalizedEmail,
    codeHash,
    salt,
    purpose,
    expiresAt,
    attempts: 0,
    maxAttempts: 5,
    used: false,
    createdAt: Date.now(),
  });

  return { plainOtp: otpCode, expiresAt };
}

export function verifyEmailOtp(
  email: string,
  code: string,
  purpose: 'signup' | 'login' | 'reset' = 'signup'
): { success: boolean; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();

  // Find matching active OTP record
  let matchingRecord: StoredOtp | null = null;
  for (const record of Array.from(otpStore.values())) {
    if (record.target === normalizedEmail && record.purpose === purpose && !record.used) {
      matchingRecord = record;
      break;
    }
  }

  if (!matchingRecord) {
    return { success: false, error: 'No active verification code found or code has already been used. Please request a new code.' };
  }

  if (Date.now() > matchingRecord.expiresAt) {
    otpStore.delete(matchingRecord.id);
    return { success: false, error: 'Verification code has expired (10-minute limit). Please request a new code.' };
  }

  if (matchingRecord.attempts >= matchingRecord.maxAttempts) {
    otpStore.delete(matchingRecord.id);
    return { success: false, error: 'Too many incorrect attempts. Code invalidated for your security. Please request a new code.' };
  }

  matchingRecord.attempts += 1;

  // Verify hash
  const computedHash = crypto.createHmac('sha256', matchingRecord.salt).update(cleanCode).digest('hex');
  const matches = crypto.timingSafeEqual(Buffer.from(matchingRecord.codeHash, 'hex'), Buffer.from(computedHash, 'hex'));

  if (!matches) {
    const remaining = matchingRecord.maxAttempts - matchingRecord.attempts;
    return {
      success: false,
      error: remaining > 0 ? `Incorrect verification code. ${remaining} attempt(s) remaining.` : 'Too many incorrect attempts. Code invalidated.',
    };
  }

  // Single-use: Mark used and remove
  matchingRecord.used = true;
  otpStore.delete(matchingRecord.id);

  // Mark account as verified if present
  const account = accountsStore.get(normalizedEmail);
  if (account) {
    account.verified = true;
    accountsStore.set(normalizedEmail, account);
  }

  return { success: true };
}

/**
 * Account Registration & Retrieval
 */
export function registerAccount(
  fullName: string,
  email: string,
  password: string
): { success: boolean; user?: { id: string; email: string }; error?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  
  if (accountsStore.has(normalizedEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please sign in.' };
  }

  const strengthCheck = validatePasswordStrength(password);
  if (!strengthCheck.valid) {
    return { success: false, error: strengthCheck.reason };
  }

  const { hash, salt } = hashPassword(password);
  const userId = `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

  const profile: UserProfileData = {
    id: userId,
    email: normalizedEmail,
    full_name: fullName.trim(),
    state: 'Tamil Nadu',
    study_interests: [],
    career_interests: [],
    learning_preferences: [],
    onboarding_completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  accountsStore.set(normalizedEmail, {
    id: userId,
    email: normalizedEmail,
    passwordHash: hash,
    passwordSalt: salt,
    verified: false,
    profile,
    created_at: new Date().toISOString(),
  });

  return {
    success: true,
    user: { id: userId, email: normalizedEmail },
  };
}

/**
 * Inbuilt Google Single Sign-On (Pre-verified)
 */
export function authenticateOrRegisterGoogleUser(
  email: string,
  fullName?: string
): { success: boolean; user: { id: string; email: string }; profile: UserProfileData } {
  const normalizedEmail = (email || 'student.google@studentrso.in').toLowerCase().trim();
  let account = accountsStore.get(normalizedEmail);

  if (!account) {
    const userId = `usr-google-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(crypto.randomBytes(32).toString('hex'), salt, 100000, 64, 'sha512').toString('hex');
    const profile: UserProfileData = {
      id: userId,
      email: normalizedEmail,
      full_name: fullName?.trim() || 'Google Student Scholar',
      state: 'Tamil Nadu',
      district: 'Chennai',
      education_level: 'Undergraduate',
      course: 'B.E. Computer Science and Engineering',
      institution_name: 'Anna University',
      study_interests: ['Engineering & Technology', 'Pure Sciences & Research'],
      career_interests: ['Higher Education & Competitive Exams', 'Internships & Apprenticeships'],
      learning_preferences: ['Finding Scholarships', 'Preparing for Competitive Examinations'],
      studied_in_tn_govt_school: true,
      is_first_graduate: true,
      onboarding_completed: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    account = {
      id: userId,
      email: normalizedEmail,
      passwordHash: hash,
      passwordSalt: salt,
      verified: true, // Google accounts are pre-verified by Google
      profile,
      created_at: new Date().toISOString(),
    };
    accountsStore.set(normalizedEmail, account);
  } else {
    account.verified = true;
    if (fullName && (!account.profile.full_name || account.profile.full_name === 'Student')) {
      account.profile.full_name = fullName;
    }
    accountsStore.set(normalizedEmail, account);
  }

  return {
    success: true,
    user: { id: account.id, email: account.email },
    profile: account.profile,
  };
}

export function authenticateUser(
  email: string,
  password: string
): { success: boolean; user?: { id: string; email: string; profile: UserProfileData }; error?: string; locked?: boolean; remainingSeconds?: number } {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Check Lockout
  const lockStatus = checkLoginLockout(normalizedEmail);
  if (lockStatus.locked) {
    return {
      success: false,
      error: `Account is locked for ${lockStatus.remainingSeconds} seconds due to repeated failed attempts.`,
      locked: true,
      remainingSeconds: lockStatus.remainingSeconds,
    };
  }

  const account = accountsStore.get(normalizedEmail);
  
  // Generic error per requirement: "Never reveal whether an email address exists in the database."
  const GENERIC_ERROR = 'Email or password is invalid.';

  if (!account) {
    const failed = recordFailedLogin(normalizedEmail);
    return {
      success: false,
      error: failed.locked ? `Account is locked for 60 seconds due to repeated failed attempts.` : GENERIC_ERROR,
      locked: failed.locked,
      remainingSeconds: failed.remainingSeconds,
    };
  }

  const isPasswordValid = verifyPassword(password, account.passwordHash, account.passwordSalt);
  if (!isPasswordValid) {
    const failed = recordFailedLogin(normalizedEmail);
    return {
      success: false,
      error: failed.locked ? `Account is locked for 60 seconds due to repeated failed attempts.` : GENERIC_ERROR,
      locked: failed.locked,
      remainingSeconds: failed.remainingSeconds,
    };
  }

  if (!account.verified) {
    return {
      success: false,
      error: 'Please verify your email address to activate your account.',
    };
  }

  // Success -> reset lockout
  resetLoginLockout(normalizedEmail);

  return {
    success: true,
    user: {
      id: account.id,
      email: account.email,
      profile: account.profile,
    },
  };
}

export function getAccountByEmail(email: string): StoredAccount | null {
  return accountsStore.get(email.toLowerCase().trim()) || null;
}

export function getAccountById(id: string): StoredAccount | null {
  for (const acc of Array.from(accountsStore.values())) {
    if (acc.id === id) return acc;
  }
  return null;
}

export function updateUserProfile(id: string, updates: Partial<UserProfileData>): UserProfileData | null {
  for (const [email, acc] of Array.from(accountsStore.entries())) {
    if (acc.id === id) {
      acc.profile = {
        ...acc.profile,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      accountsStore.set(email, acc);
      return acc.profile;
    }
  }
  return null;
}

/**
 * Opportunity Tracker Store
 */
export function getSavedOpportunities(userId: string): SavedOpportunityRecord[] {
  return savedOppsStore.get(userId) || [];
}

export function saveOpportunity(
  userId: string,
  opp: Omit<SavedOpportunityRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): SavedOpportunityRecord {
  const existing = savedOppsStore.get(userId) || [];
  const foundIndex = existing.findIndex((r) => r.opportunity_id === opp.opportunity_id);

  const now = new Date().toISOString();
  if (foundIndex >= 0) {
    const updated: SavedOpportunityRecord = {
      ...existing[foundIndex],
      ...opp,
      updated_at: now,
    };
    existing[foundIndex] = updated;
    savedOppsStore.set(userId, existing);
    return updated;
  }

  const newRecord: SavedOpportunityRecord = {
    id: `opp-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    user_id: userId,
    ...opp,
    created_at: now,
    updated_at: now,
  };
  existing.unshift(newRecord);
  savedOppsStore.set(userId, existing);
  return newRecord;
}

export function updateOpportunityStatus(
  userId: string,
  opportunityId: string,
  status: SavedOpportunityRecord['status'],
  notes?: string
): SavedOpportunityRecord | null {
  const existing = savedOppsStore.get(userId) || [];
  const item = existing.find((r) => r.opportunity_id === opportunityId);
  if (!item) return null;

  item.status = status;
  if (notes !== undefined) item.notes = notes;
  if (status === 'Applied' && !item.applied_at) {
    item.applied_at = new Date().toISOString();
  }
  item.updated_at = new Date().toISOString();
  savedOppsStore.set(userId, existing);
  return item;
}

export function removeSavedOpportunity(userId: string, opportunityId: string): boolean {
  const existing = savedOppsStore.get(userId) || [];
  const next = existing.filter((r) => r.opportunity_id !== opportunityId);
  savedOppsStore.set(userId, next);
  return true;
}

/**
 * Session Token Utility
 */
export function createSessionToken(userId: string, email: string): string {
  const payload = JSON.stringify({
    userId,
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const secret = process.env.JWT_SECRET || 'student-rso-session-secret-2026';
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64url') + '.' + hmac;
}

export function verifySessionToken(token: string): { userId: string; email: string } | null {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const payloadStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const secret = process.env.JWT_SECRET || 'student-rso-session-secret-2026';
    const checkSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(checkSig, 'hex'))) {
      return null;
    }

    const payload = JSON.parse(payloadStr) as { userId: string; email: string; exp: number };
    if (Date.now() > payload.exp) return null;

    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}
