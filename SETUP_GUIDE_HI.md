# CodeVenjar AI — पूरा setup guide

## Project files

```text
index.html                 # app entry point
app-db.js                  # frontend, auth, dashboard and database calls
styles.css                 # complete theme and responsive CSS
supabase-config.js         # Supabase URL and anon key
supabase/schema.sql        # tables, RLS policies, seed courses/mentors/tasks
supabase/functions/ai-coach/index.ts  # optional server-side OpenAI function
README.md
```

## A. Supabase database

1. Supabase में project बनाइए।
2. SQL Editor खोलिए।
3. `supabase/schema.sql` की पूरी contents paste करके **Run** दबाइए।
4. Authentication → Providers में Email enabled रखें।
5. Testing के लिए Email confirmation बंद रख सकते हैं; production में confirmation चालू रखना बेहतर है।

## B. Frontend connection

Project Settings → API से Project URL और anon/publishable key कॉपी करें। फिर `supabase-config.js` में डालें:

```js
window.CODEVANJAR_SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
window.CODEVANJAR_SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

`service_role` key frontend में कभी न डालें।

## C. GitHub Pages

Repository root में files ऐसे दिखनी चाहिए:

```text
index.html
app-db.js
styles.css
supabase-config.js
README.md
SETUP_GUIDE_HI.md
supabase/
```

GitHub → Settings → Pages → Deploy from branch → `main` → `/(root)`.

Supabase → Authentication → URL Configuration में GitHub Pages URL को Site URL और Redirect URL दोनों में जोड़ें।

## D. Admin activity

App में अपना account बनाकर Supabase Authentication → Users से अपना UUID कॉपी करें:

```sql
insert into public.admin_users(user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict do nothing;
```

फिर app refresh करें। Admin activity में learner ID, email, last active time और total events दिखाई देंगे।

## E. Local run

```bash
npx serve .
```

`index.html` को double-click करके न चलाएँ।

## F. AI function

Supabase CLI से function deploy करें और key server-side secret में रखें:

```bash
supabase functions deploy ai-coach
supabase secrets set OPENAI_API_KEY=YOUR_OPENAI_KEY
```

OpenAI key को `app-db.js`, `index.html` या GitHub में न डालें।

## G. Payments

Free enrollment पूरी तरह available है। Paid course में UPI, debit/credit card और net banking selection तथा pending payment record है। Real settlement के लिए Razorpay order creation और signature verification server-side Edge Function में जोड़ना होगा। Browser से payment success को trusted न मानें।

## H. CSV safety

Core user, course, enrollment और activity data CSV पर निर्भर नहीं है; यह Supabase PostgreSQL में save होता है। CSV import जोड़ते समय headers validate करें, invalid rows report करें और confidence values को 0–100 में validate करें।
