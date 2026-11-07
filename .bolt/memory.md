# Project memory

## Product intent & audience

- Web application with authentication, including Google OAuth social login via Supabase.
- Likely a SaaS or dashboard-style app requiring secure user sign-in and redirect handling across local/production environments.

## Brand personality & voice

- Professional, production-grade; no indication of playful or informal branding yet.

## Visual design & UX direction

- Stack: Next.js (App Router implied), Tailwind CSS, shadcn/ui, lucide-react icons.
- Auth UX includes a sign-in dialog with a "Continue with Google" button.
- Redirect/callback flow uses `/auth/callback` route.

## Decisions, constraints & rationale

- Google login redirect was failing because return URL was built from env vars with hard-coded localhost fallback instead of the actual request origin.
- Fix: Google OAuth callback now derives return URL from the current request's origin (e.g., via request headers or `window.location.origin`), not hard-coded settings.
- Supabase Auth URL Configuration must be manually set in the dashboard:
  - Site URL = app's live address
  - Redirect URLs must include `<origin>/auth/callback`
- Supabase redirects to Site URL when return address isn't in the allow list — root cause of the localhost failure.
- Auth uses Supabase as the backend provider.

## Open questions & assumptions

- Assumption: Next.js App Router is in use (Server Components + route handlers).
- Assumption: Supabase environment variables exist but may not be set for production origins.
- Unverified: Whether other auth providers (GitHub, email, etc.) share the same redirect logic and need the same fix.
- Unverified: Whether the `/auth/callback` route handler properly exchanges the code for a session before redirecting.