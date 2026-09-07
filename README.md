# Tourstack Ops — Railway deployment

This folder is the whole deployable app. It's a tiny Node server (`server.js`,
zero dependencies) that serves one static file (`public/index.html`) — the
dashboard itself, which talks directly to Supabase for auth, data, and live
sync between team members. There's nothing else to configure: no database on
Railway, no environment variables, no build step.

## Deploy via the Railway CLI

```bash
npm install -g @railway/cli   # if you don't have it
railway login
cd railway-deploy
railway init                  # creates a new Railway project
railway up                    # deploys this folder
```

Railway will print a public URL once it's live (or run `railway domain` to
generate one / attach your own).

## Or deploy via GitHub

1. Push this folder to a new GitHub repo.
2. In the Railway dashboard: **New Project → Deploy from GitHub repo** →
   pick the repo.
3. Railway auto-detects the Node app from `package.json` and deploys it.
   Every push to the branch you choose will auto-redeploy.

## Team access

Each team member creates their own account the first time they open the
deployed URL (email + password), then claims their name from the list on
first login. Supabase's default setting requires confirming your email
before you can sign in — if that's more friction than you want for a small
trusted team, it's a one-click toggle: Supabase dashboard → **Authentication
→ Sign In / Providers → Email → turn off "Confirm email"**.

## What's NOT included here on purpose

- **Import / Reset** were removed from this version. They made sense for a
  single-browser, localStorage-only tool, but wiping or bulk-overwriting a
  shared team database from the UI is too easy to do by accident. **Export**
  is still there (sidebar) if you want a JSON snapshot.
- No custom backend, no separate database service — Supabase is the backend.
  If you ever outgrow the free-tier assumptions here, that's a Supabase
  project setting, not something to change in this repo.
