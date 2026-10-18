# Cypulse Contact Form (Next.js + Tailwind)

Same page and same Supabase backend as the React version, rebuilt with Next.js (App Router) and Tailwind CSS.

## Run it

1. **Backend:** reuse the `messages` table and the two Edge Functions (`submit-message`, `list-messages`) from the React project. Nothing new to deploy.
2. Create your env file and set your project URL:
   ```bash
   cp .env.example .env.local
   ```
3. Install and start:
   ```bash
   npm install
   npm run dev
   ```
   Form: http://localhost:3000 | Admin list: http://localhost:3000/admin

## Deploy (Vercel)

Import the repo in Vercel, add the environment variable `SUPABASE_URL`, and deploy.

## How it works

| File | What it does |
|---|---|
| `app/page.js` | Server Component. Static markup (title, photo, chat button). |
| `app/ContactForm.js` | The only Client Component. `useActionState` gives the result and a pending flag for the loading button. |
| `app/actions.js` | Server Action. Receives the form on the server and forwards it to the Edge Function. |
| `app/admin/page.js` | Server Component that fetches the saved messages on the server. No `useEffect`. |
| `app/globals.css` | Tailwind theme (colors, breakpoints) and the gradient background. |

- Validation lives in one place, the Edge Function. Its field errors are shown under each input.
- `SUPABASE_URL` has no `NEXT_PUBLIC_` prefix, so it stays on the server and never reaches the browser.
- `/admin` has no login. Fine for a demo with test data only.
