# Student RSO 2.0 — Student Rights, Services & Opportunities Platform

A modern, production-ready, full-stack Next.js platform empowering students across India with direct access to verified scholarships, official grievance redressal mechanisms, certificate verification, entrance examinations, academic resources, and career pathways.

Designed with a signature **Deep Burgundy, Warm Cream, and Elegant Gold** aesthetic, **Student RSO 2.0** combines an accessible, mobile-first student experience with enterprise-grade security powered by **Supabase**.

---

## 🌟 Key Highlights

- **10 Core Student Modules**: Comprehensive suites covering scholarships, legal/anti-ragging rights, certificate verification, competitive entrance exams, internships, university admissions, tutoring, skill assessments, AI career guidance, and digital privacy safety.
- **Enterprise-Grade Authentication**:
  - Secure **Email & Password Registration** with automated **6-digit Email OTP verification** via Supabase Auth.
  - **Google OAuth 2.0** Single Sign-On (SSO) with automated student profile provisioning.
  - **Strict Row-Level Security (RLS)** protecting all student profiles, bookmarks, and applications.
  - **Failsafe Production Guard**: Fails closed with standard HTTP 503 if Supabase is temporarily unreachable in production.
- **Personalized Student Dashboard (`/dashboard`)**:
  - Profile completion scoring and academic pathway tracking.
  - Real-time matching for scholarships and opportunities tailored to each student's course, level, and category.
  - Application deadline tracker with self-managed progress statuses (*Draft*, *Applied*, *Under Review*, *Awarded*).
  - Saved opportunities and quick bookmark access.
- **Audited Official Sources**: Over 200+ verified official government and educational portal endpoints, monitored via continuous health-check scripts and GitHub Actions.
- **AI Career Assistant**: Conversational studio for resume reviews, competitive exam strategy, and interview guidance powered by Groq and Google Gemini integrations.

---

## 🏛️ The 10 Student Modules

| Module | Name & Route | Core Capabilities |
| :---: | :--- | :--- |
| **01** | **[Scholarships Hub](/scholarships)** | 52+ verified central, state, and private scholarship programs; category & merit filters; eligibility matcher; document checklists; application trackers. |
| **02** | **[Student Rights & Safety](/safety)** | Anti-ragging emergency hotlines, UGC/AICTE grievance portals, legal protections, internal complaints committee guides, and incident reporting tools. |
| **03** | **[Certificates & Documents](/certificates)** | Official document issuance & verification pathways (DigiLocker, university transcripts, caste/income certificates, degree verification, and duplicate marksheet guidance). |
| **04** | **[Examinations Hub](/exams)** | Central & state competitive entrance exams (CUET, JEE, NEET, GATE, UPSC, SSC, Banking); eligibility checkers; syllabus downloads; deadline calendars. |
| **05** | **[Internships & Opportunities](/internships)** | Verified student internships, research apprenticeships, fellowships, and skill-building opportunities across public and private sectors. |
| **06** | **[Higher Education Admissions](/admissions)** | College and university admission guidelines, reservation quotas, academic bank of credits (ABC/NAD), counseling procedures, and transfer policies. |
| **07** | **[Academic Support & Learning](/academic-support)** | Free open-source textbooks (ePathshala, NPTEL, Swayam), subject notes, research papers, study skill workshops, and remedial learning resources. |
| **08** | **[Skill Lab & Practice Centre](/skill-lab)** | Self-paced career and technical skill tracks, coding challenges, language development, practice test banks, and interactive quizzes. |
| **09** | **[Career Assistant & AI Studio](/career-assistant)** | Interactive career mentoring, resume drafting, interview prep, and customized study roadmap planning powered by AI. |
| **10** | **[Digital Safety & Privacy](/digital-safety)** | Cyber hygiene guides, online safety diagnostics, student privacy rights, data protection best practices, and reporting cyber harassment. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/), Radix UI Primitives, Lucide React Icons
- **Database & Authentication**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security, Supabase Auth PKCE, Database Triggers)
- **State Management & Form Handling**: React Hooks, HTTP-only secure cookie sessions
- **Testing & Quality Assurance**: Node.js automated test suites (16 test suites covering 160+ test cases)
- **Hosting & CDN**: [Vercel](https://vercel.com/) with Global Edge Network

---

## 📁 Project Directory Structure

```text
student-project-main/
├── app/                              # Next.js App Router
│   ├── (modules)/
│   │   ├── academic-support/         # Module 07: Academic Support
│   │   ├── admissions/               # Module 06: Higher Education Admissions
│   │   ├── career-assistant/         # Module 09: AI Career Studio
│   │   ├── certificates/             # Module 03: Certificate & Document Hub
│   │   ├── dashboard/                # Personalized Student Account Dashboard
│   │   ├── digital-safety/           # Module 10: Online Privacy & Safety
│   │   ├── exams/                    # Module 04: Entrance Examinations
│   │   ├── internships/              # Module 05: Internships & Opportunities
│   │   ├── safety/                   # Module 02: Student Rights & Grievance
│   │   ├── scholarships/             # Module 01: Scholarships Discovery
│   │   └── skill-lab/                # Module 08: Skill Lab & Practice
│   ├── api/                          # Server-side API Endpoints
│   │   ├── auth/                     # Supabase Registration, Login, OTP, OAuth
│   │   ├── dashboard/                # Personalized recommendations & tracker
│   │   ├── scholarships/             # Scholarship query & bookmark sync
│   │   └── ...                       # Module-specific API handlers
│   ├── layout.tsx                    # Global root layout, font optimization & metadata
│   ├── page.tsx                      # Student RSO 2.0 Homepage
│   └── globals.css                   # Custom theme tokens (burgundy, cream, gold)
├── components/                       # Modular UI Components
│   ├── academic-support/
│   ├── admissions/
│   ├── career-assistant/
│   ├── certificates/
│   ├── digital-safety/
│   ├── exams/
│   ├── internships/
│   ├── safety/
│   ├── scholarships/
│   ├── skill-lab/
│   ├── ui/                           # Reusable Radix / Tailwind UI primitives
│   ├── AuthDialog.tsx                # Secure Email OTP & Google Auth Modal
│   ├── Header.tsx                    # Main Navigation with auth status
│   └── Footer.tsx                    # Standard footer & verified portal links
├── lib/                              # Core libraries and data access
│   ├── supabase.ts                   # Unified Supabase browser & server clients
│   ├── auth-service.ts               # Student session & cookie management
│   ├── recommendation-engine.ts      # Tailored scholarship & opportunity matching
│   └── ...-data.ts                   # Static fallback datasets & catalogues
├── public/                           # Static assets, logos, and downloads
├── scripts/                          # URL health audit, probing & data pipelines
├── supabase/
│   └── migrations/                   # Production PostgreSQL schemas & RLS policies
├── tests/                            # Automated end-to-end feature tests
├── .env.example                      # Production environment variable blueprint
├── .gitignore                        # Git ignore rules (strictly excludes secrets)
├── package.json                      # Project dependencies & npm scripts
├── tailwind.config.ts                # Custom styling configurations
└── tsconfig.json                     # TypeScript strict configuration
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Configure the following variables:

| Variable Name | Required | Description | Where to Obtain |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** | Your Supabase project URL (`https://<project-ref>.supabase.co`) | [Supabase Dashboard](https://supabase.com) > Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Yes** | Supabase anonymous public client key | [Supabase Dashboard](https://supabase.com) > Project Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Trusted server-side admin key for secure user operations | [Supabase Dashboard](https://supabase.com) > Project Settings > API |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical site URL (`https://studentrso.in` in production) | Domain registrar or host URL |
| `GROQ_API_KEY` | Optional | Groq API key powering the AI Career Assistant | [Groq Console](https://console.groq.com) |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for advanced knowledge grounding | [Google AI Studio](https://aistudio.google.com) |

> 🔒 **Security Notice**: Never commit `.env` or `.env.local` files to Git. The `.gitignore` is pre-configured to strictly exclude all environment files.

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js**: v18.17.0 or later (Node.js 20 LTS recommended)
- **npm** or **pnpm**
- A **Supabase** project (cloud or local)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohamedaflal1999786-code/Studentrso.git
   cd Studentrso
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up database schema**:
   Run the SQL scripts located in `supabase/migrations/` inside your **Supabase SQL Editor** in chronological order:
   - `20261009170347_create_user_profiles.sql`
   - `20261009173306_create_auth_otps.sql`
   - `20261106090000_scholarship_student_records.sql`
   - `20261106120000_scholarship_hub_complete.sql`
   - `20261106180000_scholarship_intelligence_v2.sql`
   - `20261106200000_safety_grievance_system.sql`
   - `20261106210000_certificates_documents_module.sql`
   - `20261106230000_exam_opportunity_hub.sql`
   - `20261107220000_student_auth_dashboard.sql`

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run automated test suites**:
   ```bash
   npm test
   ```

---

## 🌐 Production Deployment on Vercel

### Step 1: Connect to Vercel
1. Log in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New...** > **Project**.
3. Select your repository: `mohamedaflal1999786-code/Studentrso` and click **Import**.
4. Framework Preset will be automatically detected as **Next.js**.

### Step 2: Configure Environment Variables in Vercel
In the **Environment Variables** panel, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` = `https://studentrso.in`
- Any optional AI keys (`GROQ_API_KEY`, `GEMINI_API_KEY`)

Click **Deploy**.

### Step 3: Connect Custom Domain (`studentrso.in`) with GoDaddy
1. In your Vercel Project, go to **Settings** > **Domains**.
2. Enter `studentrso.in` and click **Add**. Also add `www.studentrso.in` (recommended to redirect to `studentrso.in`).
3. Open your [GoDaddy DNS Management Console](https://dcc.godaddy.com/manage/dns) for `studentrso.in`:
   - **Type A Record**:
     - **Name**: `@`
     - **Value**: `76.76.21.21`
     - **TTL**: 600 seconds (or 1/2 hour)
   - **Type CNAME Record**:
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com`
     - **TTL**: 600 seconds
4. Vercel will automatically provision a free SSL certificate once DNS propagation completes (typically 5–30 minutes).

### Step 4: Supabase Production Redirect URLs
In your **Supabase Dashboard** > **Authentication** > **URL Configuration**:
- Set **Site URL** to: `https://studentrso.in`
- Add to **Redirect URLs**:
  - `https://studentrso.in/auth/callback`
  - `https://studentrso.in/dashboard`

---

## 🔒 Security & Privacy Policy

- **No Plaintext Passwords**: Authentication is managed securely through Supabase Auth using salted bcrypt hashing.
- **Zero Exposed Secrets**: All sensitive keys (`SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, etc.) run strictly in server-side API routes and are never sent to the client browser.
- **Row-Level Security (RLS)**: PostgreSQL tables enforce database-level policies ensuring students can only access and modify their own data.
- **Disclaimers**: Student RSO 2.0 is an independent, student-first educational portal providing verified direct links to official state and central government portals. It is not affiliated with or endorsed by any government entity.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
