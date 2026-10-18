# BankCodex (user-side site)

1. `npm install`
2. `npm run dev` and open http://localhost:3000
3. Push to a private GitHub repo, import it in Vercel, set `NEXT_PUBLIC_SITE_URL` to your domain.

All content comes from `lib/data.js`. Sample data lives there now.
When Supabase is ready, only the functions in that file change.
Site name and email: `lib/site.js` and `lib/pages.js`.
