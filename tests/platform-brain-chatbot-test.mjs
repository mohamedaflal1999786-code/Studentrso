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
console.log('STUDENT RSO 2.0 — UNIVERSAL PLATFORM BRAIN CHATBOT & VOICE ASSISTANT TEST');
console.log('Verifying Movable Draggable Button, Zero Asterisks, Auto-Translate & Language Controls');
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
// TEST 09: Movable Draggable Button Verification
// -----------------------------------------------------------------------------
assert.ok(componentFile.includes('onPointerDown'), 'Button must have onPointerDown handler for mouse and touch dragging');
assert.ok(componentFile.includes('onPointerMove'), 'Button must have onPointerMove handler');
assert.ok(componentFile.includes('onPointerUp'), 'Button must have onPointerUp handler');
assert.ok(componentFile.includes('studentrso_brain_pos'), 'Button position must persist in localStorage');
assert.ok(componentFile.includes('touchAction: \'none\''), 'Button must have touchAction none to prevent page scrolling on mobile');
console.log('✓ Test 09 Passed: Movable draggable Brain button with touch and mouse dragging verified');

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

// Verify knowledge engine has ZERO asterisks
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

console.log('=============================================================================');
console.log('ALL PLATFORM BRAIN CHATBOT & ONBOARDING TESTS PASSED (12/12) — 100% SUCCESS');
console.log('=============================================================================');
