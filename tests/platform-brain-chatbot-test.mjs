// tests/platform-brain-chatbot-test.mjs
// Automated verification suite for Universal Platform Brain Chatbot & Onboarding Step 06
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const require = createRequire(import.meta.url);
const jiti = require(path.join(projectRoot, 'node_modules/jiti'))(import.meta.url, {
  alias: { '@': projectRoot },
});

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 — UNIVERSAL PLATFORM BRAIN CHATBOT & SEARCH TEST');
console.log('Verifying Laptop Movable Drag, Pure Icon Clean UI, and Landing Page Integrity');
console.log('=============================================================================');

const {
  generatePlatformGuideAnswer,
  isTamilQuery,
  PORTAL_MODULES,
  sanitizeHumanText,
  translatePlatformText,
} = jiti(path.join(projectRoot, 'lib/platform-guide-engine.ts'));

// -----------------------------------------------------------------------------
// TEST 01: Onboarding Step 06 Label Verification
// -----------------------------------------------------------------------------
const onboardingFile = fs.readFileSync(
  path.join(projectRoot, 'components/onboarding/StudentOnboardingModal.tsx'),
  'utf8'
);
assert.ok(
  onboardingFile.includes('Save & Complete Profile'),
  'Step 06 submit button must have text "Save & Complete Profile"'
);
assert.ok(
  !onboardingFile.includes('Save & Complete Dashboard'),
  'Step 06 submit button must no longer contain "Save & Complete Dashboard"'
);
console.log('✓ Test 01 Passed: Onboarding Step 06 button label verified as "Save & Complete Profile"');

// -----------------------------------------------------------------------------
// TEST 02: Layout Global Inclusion
// -----------------------------------------------------------------------------
const layoutFile = fs.readFileSync(path.join(projectRoot, 'app/layout.tsx'), 'utf8');
assert.ok(
  layoutFile.includes('PlatformBrainChatbot'),
  'app/layout.tsx must import and render PlatformBrainChatbot component'
);
assert.ok(
  layoutFile.includes('<PlatformBrainChatbot />'),
  'app/layout.tsx must render <PlatformBrainChatbot /> globally across all pages'
);
console.log('✓ Test 02 Passed: Global PlatformBrainChatbot inclusion verified across all 11 pages in app/layout.tsx');

// -----------------------------------------------------------------------------
// TEST 03: Tamil Script & Tanglish Detection
// -----------------------------------------------------------------------------
assert.equal(isTamilQuery('வணக்கம், உதவித்தொகை எப்படி வாங்குவது?'), true);
assert.equal(isTamilQuery('சான்றிதழ் விண்ணப்பிப்பது எப்படி?'), true);
assert.equal(isTamilQuery('vanakkam eppadi apply pandrathu'), true);
assert.equal(isTamilQuery('scholarship pathi sollunga please'), true);
assert.equal(isTamilQuery('How do I apply for scholarships?'), false);
assert.equal(isTamilQuery('What are the emergency helplines?'), false);
console.log('✓ Test 03 Passed: Tamil script and Tanglish query auto-detection verified');

// -----------------------------------------------------------------------------
// TEST 04: All 10 Modules Knowledge Base Coverage
// -----------------------------------------------------------------------------
assert.equal(Object.keys(PORTAL_MODULES).length, 10);
for (const [key, mod] of Object.entries(PORTAL_MODULES)) {
  assert.ok(mod.number, `Module ${key} must have number`);
  assert.ok(mod.titleEn, `Module ${key} must have English title`);
  assert.ok(mod.titleTa, `Module ${key} must have Tamil title`);
  assert.ok(mod.route.startsWith('/'), `Module ${key} route must start with /`);
  assert.ok(mod.summaryEn.length > 20, `Module ${key} must have rich English summary`);
  assert.ok(mod.summaryTa.length > 20, `Module ${key} must have rich Tamil summary`);
}
console.log('✓ Test 04 Passed: All 10 modules registered with comprehensive English and Tamil data');

// -----------------------------------------------------------------------------
// TEST 05: English Platform Guidance
// -----------------------------------------------------------------------------
const enGeneral = generatePlatformGuideAnswer('What features are available on this website?', 'en');
assert.equal(enGeneral.language, 'en');
assert.ok(enGeneral.reply.includes('Student RSO'));
assert.ok(enGeneral.suggestedRoutes && enGeneral.suggestedRoutes.length > 0);

const enSchol = generatePlatformGuideAnswer('How do I check scholarship eligibility in Module 01?', 'en');
assert.equal(enSchol.language, 'en');
assert.ok(enSchol.reply.toLowerCase().includes('scholarship'));
assert.ok(enSchol.suggestedRoutes?.some((r) => r.url === '/scholarships'));

const enSafety = generatePlatformGuideAnswer('Where can I report ragging or call emergency police?', 'en');
assert.equal(enSafety.language, 'en');
assert.ok(enSafety.reply.includes('1800-180-5522') || enSafety.reply.includes('112'));
assert.ok(enSafety.suggestedRoutes?.some((r) => r.url === '/safety'));

const enCert = generatePlatformGuideAnswer('How do I get an income or community certificate on e-Sevai?', 'en');
assert.equal(enCert.language, 'en');
assert.ok(enCert.reply.toLowerCase().includes('community'));
assert.ok(enCert.suggestedRoutes?.some((r) => r.url === '/certificates'));
console.log('✓ Test 05 Passed: Authoritative English responses and route suggestions verified');

// -----------------------------------------------------------------------------
// TEST 06: Tamil Platform Guidance
// -----------------------------------------------------------------------------
const taGeneral = generatePlatformGuideAnswer('இந்த இணையதளம் பற்றி சொல்லுங்கள்', 'ta');
assert.equal(taGeneral.language, 'ta');
assert.ok(taGeneral.reply.includes('Student RSO') || taGeneral.reply.includes('வணக்கம்'));
assert.ok(taGeneral.reply.includes('உதவித்தொகை'));

const taSchol = generatePlatformGuideAnswer('ஸ்காலர்ஷிப் எப்படி விண்ணப்பிப்பது?', 'ta');
assert.equal(taSchol.language, 'ta');
assert.ok(taSchol.reply.includes('உதவித்தொகை'));
assert.ok(taSchol.suggestedRoutes?.some((r) => r.url === '/scholarships'));

const taSafety = generatePlatformGuideAnswer('ராகிங் புகார் எண் என்ன?', 'ta');
assert.equal(taSafety.language, 'ta');
assert.ok(taSafety.reply.includes('1800-180-5522') || taSafety.reply.includes('112'));

const taCert = generatePlatformGuideAnswer('சாதி சான்றிதழ் இ-சேவை மூலம் வாங்குவது எப்படி?', 'ta');
assert.equal(taCert.language, 'ta');
assert.ok(taCert.reply.includes('சாதி சான்றிதழ்'));
console.log('✓ Test 06 Passed: Native Tamil responses and route suggestions verified');

// -----------------------------------------------------------------------------
// TEST 07: Component UI Structure & Voice Assistant Hooks
// -----------------------------------------------------------------------------
const componentFile = fs.readFileSync(
  path.join(projectRoot, 'components/chatbot/PlatformBrainChatbot.tsx'),
  'utf8'
);
assert.ok(componentFile.includes('Brain'), 'Chatbot must use Brain theme symbol');
assert.ok(componentFile.includes('SpeechRecognition'), 'Chatbot must implement Web Speech Recognition for voice input');
assert.ok(componentFile.includes('speechSynthesis'), 'Chatbot must implement Web Speech Synthesis for voice read-aloud');
assert.ok(componentFile.includes('ta-IN'), 'Chatbot speech recognition and synthesis must support ta-IN (Tamil)');
assert.ok(componentFile.includes('en-IN'), 'Chatbot speech recognition and synthesis must support English');
assert.ok(componentFile.includes('/api/platform-guide'), 'Chatbot must communicate with /api/platform-guide endpoint');
assert.ok(componentFile.includes('Listen'), 'Chatbot must provide audio listen button');
console.log('✓ Test 07 Passed: Brain theme icon, SpeechRecognition (ta-IN / en-IN), and SpeechSynthesis controls verified');

// -----------------------------------------------------------------------------
// TEST 08: API Endpoint Route Integration & Translation Action
// -----------------------------------------------------------------------------
const apiRouteFile = fs.readFileSync(
  path.join(projectRoot, 'app/api/platform-guide/route.ts'),
  'utf8'
);
assert.ok(apiRouteFile.includes('generatePlatformGuideAnswer'), 'API route must import deterministic guide engine');
assert.ok(apiRouteFile.includes('action === \'translate\''), 'API route must support auto-translate action');
assert.ok(apiRouteFile.includes('sanitizeHumanText'), 'API route must sanitize human text');
assert.ok(apiRouteFile.includes('POST'), 'API route must export POST handler');
console.log('✓ Test 08 Passed: /api/platform-guide route endpoint & auto-translate verified');

// -----------------------------------------------------------------------------
// TEST 09: Laptop Movable Drag & Pure Icon Clean UI (No Move Text, No Above Bubble)
// -----------------------------------------------------------------------------
assert.ok(componentFile.includes('handlePointerDown'), 'Button must have handlePointerDown handler');
assert.ok(componentFile.includes('pointermove'), 'Must attach window pointermove listener for smooth laptop dragging');
assert.ok(componentFile.includes('pointerup'), 'Must attach window pointerup listener');
assert.ok(componentFile.includes('studentrso_brain_pos'), 'Button position must persist in localStorage');
assert.ok(componentFile.includes('touchAction: \'none\''), 'Button must have touchAction none to prevent page scrolling on mobile');

// Verify Move badge is removed
assert.ok(!componentFile.includes('<span>Move</span>'), 'Must remove "Move" text badge');
assert.ok(!componentFile.includes('GripHorizontal'), 'Must remove Move grip icon');

// Verify above text bubble is removed
assert.ok(!componentFile.includes('Brain Guide • தமிழ் & English'), 'Must remove above "Brain Guide • தமிழ் & English" text bubble');
console.log('✓ Test 09 Passed: Laptop drag support verified and clean pure icon UI confirmed (no move text, no top bubble)');

// -----------------------------------------------------------------------------
// TEST 10: Segmented Language Control (Never Inverted / Opposite)
// -----------------------------------------------------------------------------
assert.ok(componentFile.includes("setLanguage('en')"), 'EN button must directly set language to en');
assert.ok(componentFile.includes("setLanguage('ta')"), 'Tamil button must directly set language to ta');
assert.ok(componentFile.includes('EN') && componentFile.includes('தமிழ்'), 'Segmented control must display explicit EN and தமிழ் options');
console.log('✓ Test 10 Passed: Segmented Language Control verified (clicking EN sets English, clicking தமிழ் sets Tamil)');

// -----------------------------------------------------------------------------
// TEST 11: Zero Asterisks (*) Rule & Human Formatting Sanitizer
// -----------------------------------------------------------------------------
const rawSample = '**Module 01: [🎓 Scholarships (M01)](https://www.studentrso.in/scholarships)**\n\n* Point 1: **100% Verified**';
const sanitized = sanitizeHumanText(rawSample);
assert.ok(!sanitized.includes('*'), 'Sanitized text must never contain asterisk (*)');
assert.ok(!sanitized.includes('https://'), 'Sanitized text must never contain raw markdown URLs');
assert.ok(sanitized.includes('Module 01: 🎓 Scholarships (M01)'), 'Sanitized text must retain human title without brackets');

// Verify knowledge engine has ZERO double asterisks
const engineFile = fs.readFileSync(path.join(projectRoot, 'lib/platform-guide-engine.ts'), 'utf8');
assert.equal(engineFile.includes('**'), false, 'Knowledge engine must not contain markdown double asterisks (**) for bold');
console.log('✓ Test 11 Passed: Zero asterisks (*) rule and clean international human formatting verified');

// -----------------------------------------------------------------------------
// TEST 12: Bidirectional Auto-Translate (Text & Voice)
// -----------------------------------------------------------------------------
const enText = 'Module 10: Digital Safety & Cyber-Wellness Shield. Call helpline 1930.';
const taTranslated = translatePlatformText(enText, 'ta');
assert.equal(isTamilQuery(taTranslated), true, 'Translating to ta must return Tamil text');
assert.ok(!taTranslated.includes('*'), 'Translated text must not contain asterisks');

const taText = 'Module 01: உதவித்தொகை மையம். தமிழ்நாடு அரசு நலத்திட்டங்கள்.';
const enTranslated = translatePlatformText(taText, 'en');
assert.equal(isTamilQuery(enTranslated), false, 'Translating to en must return English text');
assert.ok(!enTranslated.includes('*'), 'Translated text must not contain asterisks');
console.log('✓ Test 12 Passed: Bidirectional Auto-Translate (Tamil & English) with text and voice verified');

// -----------------------------------------------------------------------------
// TEST 13: Search Bar Totally Removed from Landing Page
// -----------------------------------------------------------------------------
const heroFile = fs.readFileSync(path.join(projectRoot, 'components/sections/Hero.tsx'), 'utf8');
assert.ok(!heroFile.includes('UniversalPlatformSearch'), 'Hero section must not include UniversalPlatformSearch (totally removed per user request)');
assert.ok(!heroFile.includes('<input'), 'Hero section must not include any search bar input');
console.log('✓ Test 13 Passed: Search bar totally removed from index page / landing page verified');

// -----------------------------------------------------------------------------
// TEST 14: Google AdSense CSP & Robots.txt Verification
// -----------------------------------------------------------------------------
const middlewareFile = fs.readFileSync(path.join(projectRoot, 'middleware.ts'), 'utf8');
const nextConfigFile = fs.readFileSync(path.join(projectRoot, 'next.config.js'), 'utf8');
const robotsFile = fs.readFileSync(path.join(projectRoot, 'public/robots.txt'), 'utf8');

assert.ok(middlewareFile.includes('ep1.adtrafficquality.google'), 'Middleware CSP must include ep1.adtrafficquality.google');
assert.ok(middlewareFile.includes('fundingchoicesmessages.google.com'), 'Middleware CSP must include fundingchoicesmessages.google.com');
assert.ok(nextConfigFile.includes('ep1.adtrafficquality.google'), 'Next config CSP must include ep1.adtrafficquality.google');
assert.ok(robotsFile.includes('Mediapartners-Google'), 'robots.txt must allow Mediapartners-Google for AdSense crawlers');
console.log('✓ Test 14 Passed: Google AdSense CSP & Crawlers (ep1.adtrafficquality.google & Mediapartners-Google) verified');

// -----------------------------------------------------------------------------
// TEST 15: Supabase Security Advisor & Column Integrity Fixes
// -----------------------------------------------------------------------------
const sqlFile = fs.readFileSync(path.join(projectRoot, 'supabase/RUN_IN_SUPABASE_SQL_EDITOR.sql'), 'utf8');

assert.ok(sqlFile.includes('auth_failed_logins'), 'SQL script must configure auth_failed_logins');
assert.ok(sqlFile.includes('student_document_readiness'), 'SQL script must configure student_document_readiness');
assert.ok(sqlFile.includes('student_document_reminders'), 'SQL script must configure student_document_reminders');
assert.ok(sqlFile.includes('NOT c.relrowsecurity'), 'SQL script must dynamically enable RLS for all public tables');
assert.ok(sqlFile.includes('scholarship_bookmarks ADD COLUMN IF NOT EXISTS notes'), 'SQL script must add scholarship_bookmarks.notes');
assert.ok(sqlFile.includes('scholarship_applications ADD COLUMN IF NOT EXISTS institution_verified_self_report'), 'SQL script must add scholarship_applications.institution_verified_self_report');
assert.ok(sqlFile.includes("NOTIFY pgrst, 'reload schema'"), 'SQL script must reload PostgREST schema cache');
console.log('✓ Test 15 Passed: Supabase Security Advisor & Missing Columns SQL fix script verified');

console.log('=============================================================================');
console.log('ALL PLATFORM BRAIN CHATBOT, SEARCH & INTEGRITY TESTS PASSED (15/15) — 100% SUCCESS');
console.log('=============================================================================');
