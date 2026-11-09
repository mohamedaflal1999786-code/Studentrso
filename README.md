# Student RSO 2.0 — Student Rights, Services & Opportunities Platform

[![Production Status](https://img.shields.io/badge/Status-Production%20Live-emerald?style=for-the-badge)](https://studentrso.in)
[![Next.js 14](https://img.shields.io/badge/Next.js-14%20(App%20Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.0%20Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Supabase RLS](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres%20RLS-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Google Gen AI](https://img.shields.io/badge/Google%20Gen%20AI-Official%20SDK-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Security Audited](https://img.shields.io/badge/Security-190--Point%20OWASP%20Audit%20Passed-darkred?style=for-the-badge)](https://studentrso.in)

> **Official Live Platform:** [https://studentrso.in](https://studentrso.in)  
> **Canonical Domain:** `studentrso.in` (SSL / HSTS Secured)  
> **Target Audience:** School students (Classes 10–12), Diploma/Polytechnic students, Undergraduate & Postgraduate scholars, and Doctoral (PhD/JRF) researchers across Tamil Nadu and India.

---

## 👨‍💻 Project Founder, Architect & Lead Developer

| Profile | Information |
| :--- | :--- |
| **Founder & Lead Developer** | **Mohamed Aflal** |
| **Academic Background** | **Artificial Intelligence & Data Science (AI&DS) Engineering Scholar** |
| **Institution** | **Kalaignar Karunanidhi Institute of Technology (KIT)**, Coimbatore, Tamil Nadu, India |
| **GitHub** | [@mohamedaflal1999786-code](https://github.com/mohamedaflal1999786-code) |
| **Contact Email** | `mohamedaflal1999786@gmail.com` / `noreply@studentrso.in` |
| **Mission** | Democratizing higher education access, statutory welfare schemes, state counseling transparency, legal rights, and career intelligence for every student through a unified, zero-cost digital portal. |

---

## 🌟 Key Platform Highlights

1. **Complete 10-Module Student Lifecycle**:
   - Spans the complete academic arc from Class 10 stream selection to doctoral research fellowships, competitive state exams, government certificates, and campus placements.
2. **AI Student Career & Life Assistant (Module 05)**:
   - High-performance, streaming conversational intelligence built on the official `@google/genai` SDK.
   - Grounded with real-time statutory knowledge: complete 2026 Tamil Nadu state policies, TNEA engineering counseling, DOTE lateral entry, Pudhumai Penn, Tamil Pudhalvan, 7.5% government school preferential quota, and national entrance exams.
   - Built-in multi-model fallback across candidate pools (`gemini-flash-lite-latest`, `gemini-flash-latest`) for maximum uptime and zero service disruptions.
3. **Enterprise Defense-in-Depth Security (190-Point Architecture)**:
   - PBKDF2 cryptographic password hashing (SHA-512, 100,000 iterations, unique 16-byte salts).
   - Strict Row-Level Security (RLS) on all Supabase PostgreSQL tables; zero cross-tenant leakage.
   - Edge sliding-window rate limiting (200 req/min per IP) in `middleware.ts`.
   - Content Security Policy (CSP), HSTS (`max-age=63072000`), X-Frame-Options (`SAMEORIGIN`), Permissions-Policy, COOP, and CORP headers active on every response.
4. **Standardized Header Navigation Across All 10 Modules**:
   - Unified 4-element top bar on every module:
     1. `← Back to Student RSO` button (direct return to dashboard/home)
     2. `Module Title` (with verified active badge)
     3. `Diagnostics` button (instant system transparency modal)
     4. `Student Name` with authentic avatar and verification status.
5. **Search Engine Optimization & Google Search Console Ready**:
   - Native `sitemap.xml` dynamically generated at [https://studentrso.in/sitemap.xml](https://studentrso.in/sitemap.xml) and pre-rendered in `/public/sitemap.xml`.
   - Canonical `robots.txt` directing crawlers with strict index rules and automatic sitemap discovery.
   - Zero hardcoded placeholder college/course names in user forms for authentic indexing.

---

## 🏛️ The 10 Core Student Modules

| Module # | Module Name | Route | Core Student Capabilities |
| :---: | :--- | :--- | :--- |
| **01** | **Scholarships Hub** | [`/scholarships`](https://studentrso.in/scholarships) | 52+ verified state & central schemes (Pudhumai Penn, Tamil Pudhalvan, NSP, BC/MBC/SC/ST post-matric); smart eligibility matcher; personal application tracker. |
| **02** | **Student Rights & Safety** | [`/safety`](https://studentrso.in/safety) | 24x7 Anti-ragging emergency hotlines, UGC e-Samadhaan, ICC sexual harassment cell, certificate withholding laws, and official complaint reference tracker. |
| **03** | **Certificates & Documents Hub** | [`/certificates`](https://studentrso.in/certificates) | 12 essential student certificates (Community, Nativity, First Graduate, Income, 7.5% Govt School Study); e-Sevai status verification; duplicate marksheet procedures. |
| **04** | **Examinations Hub** | [`/exams`](https://studentrso.in/exams) | State & national entrance examinations (TNEA, NEET, JEE, CUET, GATE, TNPSC Group 1/2/4, UPSC, Banking, SSC, RRB); course-wise finder; cutoff goals tracker. |
| **05** | **AI Student Career & Life Assistant** | [`/career-assistant`](https://studentrso.in/career-assistant) | Streaming conversational advisor with live document/marksheet analysis, backlog recovery roadmaps, and statutory education guidance. |
| **06** | **Higher Education Admissions** | [`/admissions`](https://studentrso.in/admissions) | TNEA engineering single-window cutoff calculator, TNGASA arts & science counseling, DOTE polytechnic lateral entry, attendance condonation, and break-of-study rules. |
| **07** | **Academic Support & Learning Pathways** | [`/academic-support`](https://studentrso.in/academic-support) | Subject-wise notes, backlogs recovery strategies, Anna University regulation calculators, lab record blueprints, open-source textbooks (e-ShodhSindhu, NPTEL). |
| **08** | **Skill Development & Internships** | [`/internships`](https://studentrso.in/internships) | AICTE internship portal integration, Naan Mudhalvan corporate pathways, NATS apprenticeship stipends, research internships (IIT/ISRO/CSIR), opportunity bookmarks. |
| **09** | **Mentorship & Student Community** | [`/community`](https://studentrso.in/community) | Peer study networks, alumni mentoring directory, senior academic guidance, competitive exam study circles, and collaborative student discussions. |
| **10** | **Institutional & Administrative Support** | [`/admin-support`](https://studentrso.in/admin-support) | College administrative clearance procedures, bonafide certificate requests, transfer/migration certificate workflows, fee refund grievance redressal. |

---

## 🔒 190-Point Defense-in-Depth Security Matrix

Student RSO implements a rigorous, audited security architecture structured across 14 statutory domains:

1. **Core Security (Items 1–22)**: Zero secret exposure in frontend builds, environment variable validation, strict RBAC, edge sliding-window rate limiting (200 req/min), XSS neutralization, and production failsafe boundaries.
2. **Authentication Security (Items 23–38)**: PBKDF2 (SHA-512 with 100k iterations), salt-hashed OTPs, brute-force lockout after 5 failed attempts, automated session invalidation on logout.
3. **Backend & API Security (Items 39–55)**: Parameterized queries against SQLi/NoSQLi, SSRF URL validator (`isSafeRedirectUrl`), strict 10 MB upload limits, 30-second upstream timeouts, and explicit HTTP verb whitelisting.
4. **Frontend Security (Items 56–68)**: Comprehensive CSP headers, DOM XSS prevention, zero `dangerouslySetInnerHTML` on untrusted inputs, `X-Frame-Options: SAMEORIGIN` anti-clickjacking.
5. **Database Security (Items 69–82)**: Supabase PostgreSQL with strict Row-Level Security (`auth.uid() = user_id`), TLS 1.3 encryption in transit, AES-256 at rest, automated PITR backups.
6. **File Storage Security (Items 83–94)**: Magic-byte inspection, UUID filename replacement, private storage buckets, 15-minute signed download URLs, executable extension blocking.
7. **Network & Infrastructure (Items 95–109)**: HTTPS enforcement, HSTS (`max-age=63072000; includeSubDomains; preload`), secure DNSSEC/CAA/SPF/DMARC, Layer 7 DDoS mitigation.
8. **Privacy & Data Protection (Items 110–120)**: DPDP Act compliance, data minimization, `maskSecret` log redaction, and permanent student data deletion rights.
9. **Monitoring & Logging (Items 121–132)**: Append-only event logs, rate-limit monitors, administrative alerting, zero logging of credentials or tokens.
10. **Development & CI/CD Security (Items 133–148)**: Automated 16-suite test pipeline, strict TypeScript checks, branch protection, dependency vulnerability scans.
11. **Advanced Application Protection (Items 149–160)**: Anti-automation cooldowns, idempotency validation, HTTP request smuggling defenses, and cache-poisoning prevention.
12. **Admin & Privileged Access (Items 161–170)**: Least-privilege role assignment, mandatory administrative MFA, immutable audit trails.
13. **Backup & Disaster Recovery (Items 171–180)**: Encrypted automated snapshots, geographically distributed replicas, RPO < 1 hour, RTO < 30 minutes.
14. **Compliance & Standards (Items 181–190)**: OWASP Top 10 compliance, WCAG 2.1 AA accessibility, and alignment with UGC/AICTE regulations.

> Full audit details: See [`security-audit-report.md`](./security-audit-report.md).

---

## 🔍 SEO & Search Engine Indexing (`sitemap.xml`)

Student RSO includes full Google Search Console indexing files:
- **XML Sitemap**: Accessible at [`https://studentrso.in/sitemap.xml`](https://studentrso.in/sitemap.xml). Generated dynamically via [`app/sitemap.ts`](./app/sitemap.ts) with static fallback at [`public/sitemap.xml`](./public/sitemap.xml).
- **Robots Rules**: Maintained via [`app/robots.ts`](./app/robots.ts) and [`public/robots.txt`](./public/robots.txt):
  ```txt
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /auth/callback

  Sitemap: https://studentrso.in/sitemap.xml
  ```
- **Generic Placeholders**: All student form inputs have generic, professional placeholders (e.g., `"Enter college or institution name"`, `"Enter course or degree program"`), preventing any false search-engine indexing of specific colleges.

---

## 🧪 Automated Testing & Verification

The platform maintains a comprehensive automated testing suite:

```bash
# Run all 16 test suites
npm test

# Run TypeScript type safety verification
npm run typecheck

# Run production build
npm run build
```

---

## 🚀 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/mohamedaflal1999786-code/Studentrso.git
cd Studentrso
npm install
```

### 2. Configure Environment
Create `.env.local` based on `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://studentrso.in
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 📄 License & Attribution

Designed and developed by **Mohamed Aflal** (Artificial Intelligence & Data Science Engineering Scholar, Kalaignar Karunanidhi Institute of Technology, Coimbatore).  
Licensed under the [MIT License](LICENSE).
