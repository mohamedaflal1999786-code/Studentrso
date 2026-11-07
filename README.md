# Student RSO — Student Rights, Services & Opportunities Platform

A full-stack Next.js platform that helps Indian students discover scholarships, government exam opportunities, anti-ragging resources, and career guidance — with a working AI Career Assistant powered by Groq.

## Features

- **Pixel-perfect UI** matching the provided design (warm cream / burgundy / gold theme)
- **Authentication** — working Login and Signup flows via Next.js API routes (`/api/auth/login`, `/api/auth/signup`) backed by Supabase Auth
- **AI Career Assistant** — an interactive chat that answers career, resume, interview, and exam-guidance questions using the Groq `llama3-8b-8192` model, with full conversation context
- **Service links** — every service card points to its official government / education portal

## Tech Stack

- Next.js 13 (App Router) + TypeScript
- Tailwind CSS
- Supabase (authentication)
- Groq API (AI Career Assistant, `llama3-8b-8192`)
- Lucide React icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

| Variable | Description |
| --- | --- |
| `GROQ_API_KEY` | Free key from [console.groq.com](https://console.groq.com) — powers the AI Career Assistant |
| `JWT_SECRET` | Secret used for session signing |
| `NEXTAUTH_SECRET` | Secret for NextAuth (if you extend auth) |
| `SUPABASE_URL` | Supabase project URL (pre-provisioned) |
| `SUPABASE_ANON_KEY` | Supabase anon key (pre-provisioned) |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

- **Design fidelity:** the provided HTML design is served exactly as-is, with React dialogs overlaid for the Login/Signup and AI Assistant interactions so the visuals never drift from the original.
- **Auth:** the sign-in/sign-up dialog calls the Next.js API routes, which use Supabase Auth for credential storage and session creation. Session tokens are stored in HTTP-only cookies.
- **AI Career Assistant:** the chat sends the full message history to `/api/career-assistant`, which proxies to the Groq API so your API key never reaches the browser.

## Build

```bash
npm run build
```

## Project Structure

```
app/
  page.tsx                     # Main page (iframe + dialog overlays)
  layout.tsx                   # Root layout, fonts, metadata
  globals.css                  # Design-matching color tokens
  api/
    auth/
      login/route.ts           # POST /api/auth/login
      signup/route.ts          # POST /api/auth/signup
    career-assistant/route.ts  # POST /api/career-assistant (Groq)
public/
  student_rso_*.html           # The exact provided design
```

## Scholarship Hub (Module 01)

The `/scholarships` route adds a working student-facing scholarship discovery area with:

- Search and filters across Tamil Nadu Government, Central Government and foundation listings.
- Preliminary eligibility matching by education level and optional scheme-specific details. Results are guidance only; the scheme authority makes the final decision.
- Official-provider links, scheme-specific eligibility notes and document preparation lists.
- Saved scholarships, a self-reported application tracker and a general document checklist.
- Local-device persistence for signed-out users. When the student is signed in, records are also synced through the existing Supabase-authenticated session.

### Enable account-based scholarship sync

1. Open the Supabase SQL Editor for the same project used by Student RSO.
2. Run `supabase/migrations/20261106090000_scholarship_student_records.sql`.
3. Keep the existing `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables configured. The scholarship API uses the existing HTTP-only `student_rso_access_token` session cookie and row-level security.
4. Run `npm install`, then `npm run dev`. Open `/scholarships`.

If the migration has not been applied, the hub still works in device-only mode; account sync will show a setup message. The application tracker is manually maintained and does not claim to retrieve live application status from NSP or other authorities. The eligibility checker does not submit personal profile data to the server.

Scholarship listings are curated starting references, not a guarantee that a scheme is currently accepting applications. Always check the current academic-year notification on the linked official provider website before applying.
