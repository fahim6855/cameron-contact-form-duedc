# Cypulse Contact Form

A "Meet with Cameron" contact page built for the DUEDC Full Stack Task (Task 2: Web Development). The page matches the provided design, works on mobile, and saves every submission to a database through an API.

**Live demo:** https://cameron-contact-form-duedc.vercel.app/ <br><br>
**Video demo(GDrive):** https://drive.google.com/file/d/1cPkcX7Bq22tLI0GocrnaCNI7sRYRPo1O/view?usp=drive_link <br><br>
**View Stored Messages:** https://cameron-contact-form-duedc.vercel.app/messages <br><br>
**Api Endpoint:** https://vcpiitvrjtbtzhwimovi.supabase.co/functions/v1/list-messages <br><br>


## Pages

| Page | URL | What it shows |
|---|---|---|
| Contact form | `/` | The designed form: Full Name, Company Name, Email, Phone, privacy checkbox and the Send Message button |
| Saved messages | `/messages` | A table of every message saved in the database, newest first |

To see the whole flow: open `/`, send a message, then open `/messages` and the new entry appears at the top.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Data fetching | Server Components and Server Actions (no `useEffect`) |
| Backend API | Supabase Edge Functions (TypeScript on Deno) |
| Database | Supabase Postgres |
| Hosting | Vercel (frontend), Supabase (API and database) |

## How it works

```
Form  ->  Server Action (Next.js)  ->  Edge Function  ->  Postgres
/messages (Server Component)       ->  Edge Function  ->  Postgres
```

- Clicking **Send Message** submits the form to a Next.js Server Action, which sends the data to the `submit-message` API.
- The button shows a loading state while sending, then a success or error message. The form clears after a successful send.
- The API checks that all fields are filled, the email is valid, the phone number is valid, and the checkbox is ticked. Errors come back as clear messages and appear under the matching field.
- The `/messages` page loads its data on the server from the `list-messages` API.

## API

Base URL: `https://YOUR-PROJECT-REF.supabase.co/functions/v1`

### `POST /submit-message`

```bash
curl -X POST "$BASE/submit-message" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ada Lovelace","companyName":"Analytical Co","email":"ada@example.com","phone":"+44 20 7946 0958","consent":true}'
```

| Result | Status | Response |
|---|---|---|
| Saved | 201 | `{"success":true,"message":"Message sent. Cameron will get back to you soon.","data":{...}}` |
| Invalid input | 400 | `{"success":false,"message":"Please fix the errors and try again.","errors":{"email":"Enter a valid email address."}}` |
| Wrong method | 405 | `{"success":false,"message":"Method not allowed. Use POST."}` |
| Server error | 500 | `{"success":false,"message":"Could not save your message. Please try again later."}` |

### `GET /list-messages`

```bash
curl "$BASE/list-messages"
```

Returns `{"success":true,"count":N,"data":[...]}`, newest first.

## Run it locally

**Requirements:** Node.js 20 or newer, a free [Supabase](https://supabase.com) account.

**1. Install the project**

```bash
git clone https://github.com/fahim6855/cameron-contact-form-duedc
cd YOUR-REPO
npm install
```

**2. Create the database table**

In your Supabase project, open **SQL Editor > New query**, paste the contents of `supabase/migrations/001_create_messages.sql`, and click **Run**.

**3. Deploy the two API functions**

```bash
npx supabase login
npx supabase init        # only if supabase/config.toml is missing
npx supabase link --project-ref YOUR-PROJECT-REF
npx supabase functions deploy submit-message --no-verify-jwt
npx supabase functions deploy list-messages --no-verify-jwt
```

Your project ref is the part of your project URL before `.supabase.co`. A Docker warning during deploy can be ignored. If the deploy fails because of Docker, add `--use-api` to each deploy command.

**4. Set the environment variable**

Copy `.env.example` to `.env.local` and set your project URL:

```
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
```

**5. Start the app**

```bash
npm run dev
```

Open http://localhost:3000 for the form and http://localhost:3000/messages for the saved messages.

## Project structure

```
app/
  page.js              Contact page (Server Component)
  ContactForm.js       The form (Client Component)
  actions.js           Server Action that sends the form to the API
  messages/page.js     Saved messages page (Server Component)
  layout.js            Font and page layout
  globals.css          Tailwind theme and the gradient background
public/cameron.svg     Placeholder photo for Cameron
supabase/
  migrations/          SQL for the messages table
  functions/
    submit-message/    API: validate and save a message
    list-messages/     API: list all messages
    _shared/cors.ts    Shared CORS and JSON helper
```

## Notes

## Publish and security review

From the README alone, no secret credentials are revealed: the Supabase URL and project ref are placeholders, and no service-role key or other private key is shown. The live site URL and Supabase function endpoints are public identifiers, not secrets. This is only a review of this README; check the full repository and deployment configuration before publishing.

The project is publishable as a demo, but the described setup is not production-ready: `/messages` and `list-messages` are public and can expose submitted contact details, while the submit endpoint is open to abuse. Before production, require authorization to read messages and add appropriate abuse protection, such as rate limiting. Also review applicable privacy and data-retention requirements.

- **Validation** lives in the API, so it cannot be skipped by calling the API directly. The database also has matching `CHECK` constraints.
- **Security:** Row Level Security is on with no public policies, so the browser cannot read or write the table directly. Only the Edge Functions can, using a service key that Supabase keeps on its servers. It is not in this repo.
- **Environment variable:** `SUPABASE_URL` has no `NEXT_PUBLIC_` prefix, so it is only used on the server.
- **Open endpoints:** the functions are deployed with `--no-verify-jwt` and `/messages` has no login, because the task only asks for a simple save and list. A production version would add authentication.
- **Free tier:** Supabase pauses free projects after a period of inactivity. If the live demo does not respond, the project may need to be restored from the Supabase dashboard.

<b>Submitted to DUEDC By: </b> </br>
Name: Fazlul Haque (Fahim) </br>
Email: fahimafnan39@gmail.com </br>
DU Reg: 2025-517-189