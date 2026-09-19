# CodeVenjar AI

Database-backed AI career and skill-gap platform for students.

## Included end-to-end

- Supabase email/password sign-up and login
- Stable learner ID such as `CV-2026-ABC123`
- Profiles, skills, personalized roadmap and current status
- Course catalogue with free/paid, Live/Recorded, notes and enrollment
- Payment method capture for UPI, debit/credit card and net banking
- Mentor list and booking records
- Assignments and completion records
- Portfolio profile builder
- Activity history in `learner_records` and `activity_events`
- Admin activity overview for registered learners
- Demo mode when Supabase is not configured

## 1. Create and connect Supabase

1. Go to https://supabase.com and create a project.
2. Open **SQL Editor** and run the complete file `supabase/schema.sql`.
3. Open **Project Settings → API** and copy the Project URL and anon/publishable key.
4. Open `supabase-config.js` and replace the empty values:

```js
window.CODEVANJAR_SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
window.CODEVANJAR_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Never put a `service_role` key in frontend code.

5. In Supabase **Authentication → URL Configuration**, add the final GitHub Pages or Vercel URL to **Site URL** and **Redirect URLs**.
6. Create one account in the app. To make that account an admin, copy its user UUID from **Authentication → Users** and run:

```sql
insert into public.admin_users(user_id) values ('PASTE_AUTH_USER_UUID_HERE') on conflict do nothing;
```

Refresh the app. The **Admin activity** menu will show learner IDs, emails, last activity and event counts.

## 2. Run locally

Use a local server so browser modules/assets work correctly:

```bash
npx serve .
```

Open the displayed local URL. Do not open `index.html` by double-clicking it.

## 3. GitHub Pages deployment

Upload these items directly into the repository root—not inside another nested folder:

```text
index.html
app-db.js
styles.css
supabase-config.js
README.md
supabase/schema.sql
supabase/functions/
```

Then open **Settings → Pages**, choose **Deploy from branch**, select `main` and `/ (root)`, and save. Wait for the Pages URL, then add that URL to Supabase Auth URL Configuration.

## 4. Vercel deployment

Import the GitHub repository in Vercel. Keep the root directory at the folder containing `index.html`. This is a static site, so use no build command and no output directory. Add the same files, commit, and redeploy after changing `supabase-config.js`.

## 5. Payments

The current frontend records the selected payment option and creates a pending payment record. It is safe for a demo, but it is not proof of real money settlement. For live payments, add a server-side Razorpay order/verification function using a Razorpay secret stored only in Supabase Edge Function secrets. Never verify or trust payment success using only browser JavaScript.

## CSV safety

The platform does not depend on a CSV file for its core records. User, course, enrollment and activity data are stored in PostgreSQL. If CSV import is added later, validate headers, reject malformed rows, convert numeric confidence values to 0–100, and show an import error report instead of silently dropping rows.

## AI

The frontend has a safe guidance fallback. The OpenAI API key must remain server-side in a Supabase Edge Function secret. The existing `supabase/functions/ai-coach/index.ts` can be deployed with the Supabase CLI after setting `OPENAI_API_KEY`.
