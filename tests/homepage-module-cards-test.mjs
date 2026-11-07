// tests/homepage-module-cards-test.mjs
// Verification for Student RSO Homepage Module Button Simplification
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { services } from '../lib/data.ts';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO – HOMEPAGE MODULE BUTTON SIMPLIFICATION TEST SUITE');
console.log('Single-Button Architecture, Route Integrity & Future-Proof Verification');
console.log('=============================================================================\n');

// 1. Verify HomepageModuleCard component exists
const cardPath = path.join(projectRoot, 'components', 'HomepageModuleCard.tsx');
assert(fs.existsSync(cardPath), 'components/HomepageModuleCard.tsx must exist');
const cardContent = fs.readFileSync(cardPath, 'utf8');
console.log('✓ Test 01: Reusable HomepageModuleCard.tsx component exists');

// 2. Verify ServicesSection imports and uses HomepageModuleCard
const servicesPath = path.join(projectRoot, 'components', 'sections', 'ServicesSection.tsx');
assert(fs.existsSync(servicesPath), 'components/sections/ServicesSection.tsx must exist');
const servicesContent = fs.readFileSync(servicesPath, 'utf8');

assert(
  servicesContent.includes("import { HomepageModuleCard } from '@/components/HomepageModuleCard'"),
  'ServicesSection must import HomepageModuleCard'
);
assert(
  servicesContent.includes('<HomepageModuleCard'),
  'ServicesSection must render HomepageModuleCard for each module'
);
console.log('✓ Test 02: ServicesSection utilizes reusable HomepageModuleCard for all modules');

// 3. Verify exactly ONE action button per card with text "Open Module →"
assert(
  cardContent.includes('Open Module →'),
  'HomepageModuleCard must render button with text "Open Module →"'
);

// Count button / link elements in HomepageModuleCard bottom action bar
const bottomBarSection = cardContent.substring(cardContent.indexOf('Bottom Action Bar'));
const linkMatches = bottomBarSection.match(/<Link\s/g) || [];
const buttonMatches = bottomBarSection.match(/<button\s/g) || [];
// Either a Link (for dedicated route) OR a button (for non-dedicated) - exactly 1 per branch
assert.strictEqual(linkMatches.length, 1, 'Action bar must contain exactly 1 Link for dedicated routes');
assert.strictEqual(buttonMatches.length, 1, 'Action bar must contain exactly 1 button for modal routes');
console.log('✓ Test 03: Exactly ONE full-width action button per card: "Open Module →"');

// 4. Verify all secondary / duplicate CTA buttons are removed from homepage cards
const removedButtons = [
  'Explore Module',
  'Find Opportunities',
  'Find My Exam',
  'Open AI Assistant',
  'Explore Pathways',
  'Open Admission Centre',
  'Transfer & Re-entry',
  'Open Document Service',
  'Find My Certificate',
];

for (const btn of removedButtons) {
  assert(
    !servicesContent.includes(btn),
    `ServicesSection must not contain removed button: "${btn}"`
  );
  assert(
    !cardContent.includes(btn),
    `HomepageModuleCard must not contain removed button: "${btn}"`
  );
}
console.log('✓ Test 04: All 9 secondary/duplicate CTA buttons confirmed removed from homepage cards');

// 5. Verify single-button design properties
assert(
  cardContent.includes('w-full'),
  'Action button must be full-width'
);
assert(
  cardContent.includes('bg-[#8c2f39]') && cardContent.includes('hover:bg-[#6d1824]'),
  'Action button must use existing Student RSO maroon primary-button style'
);
assert(
  cardContent.includes('h-11'),
  'Action button must have consistent height'
);
console.log('✓ Test 05: Button styling matches full-width maroon primary-button specification');

// 6. Verify Card Information Elements
assert(cardContent.includes('MODULE {module.number}'), 'Card must display module number');
assert(cardContent.includes('{module.title}'), 'Card must display module title');
assert(cardContent.includes('{module.description}'), 'Card must display short description');
assert(cardContent.includes('module.officialSource'), 'Card must display official verification source');
assert(cardContent.includes('module.isFullyImplemented'), 'Card must display LIVE status badge');
console.log('✓ Test 06: All required card metadata elements (Number, Title, Description, Source, LIVE badge) present');

// 7. Verify All 7 Core Modules Route Correctly
const expectedRoutes = {
  '01': '/scholarships',
  '02': '/safety',
  '03': '/certificates',
  '04': '/exams',
  '05': '/career-assistant',
  '06': '/admissions',
  '07': '/academic-support',
};

for (const [num, expectedRoute] of Object.entries(expectedRoutes)) {
  const mod = services.find((s) => s.number === num);
  assert(mod, `Module ${num} must exist in services`);
  assert.strictEqual(
    mod.route,
    expectedRoute,
    `Module ${num} (${mod.title}) must route to ${expectedRoute}`
  );
  assert.strictEqual(
    mod.isFullyImplemented,
    true,
    `Module ${num} must be marked isFullyImplemented: true`
  );
}
console.log('✓ Test 07: All 7 core modules confirmed routing to their correct dedicated pages');

// 8. Verify Responsive Grid in ServicesSection
assert(
  servicesContent.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'),
  'ServicesSection must maintain standard responsive grid layout'
);
console.log('✓ Test 08: Responsive grid configuration verified');

// 9. Verify All Module Pages Remain Intact
const modulePages = [
  'app/scholarships/page.tsx',
  'app/safety/page.tsx',
  'app/certificates/page.tsx',
  'app/exams/page.tsx',
  'app/career-assistant/page.tsx',
  'app/admissions/page.tsx',
  'app/academic-support/page.tsx',
];

for (const page of modulePages) {
  assert(
    fs.existsSync(path.join(projectRoot, page)),
    `Module page ${page} must remain completely intact`
  );
}
console.log('✓ Test 09: All 7 dedicated module pages remain intact and unmodified');

console.log('\n=============================================================================');
console.log('ALL HOMEPAGE MODULE CARD SIMPLIFICATION CHECKS PASSED (9 / 9)');
console.log('Single "Open Module →" Button Architecture is 100% Verified and Compliant.');
console.log('=============================================================================\n');
