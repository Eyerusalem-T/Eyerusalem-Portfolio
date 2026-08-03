# Portfolio contact backend

A small Express API that:
- accepts messages from your portfolio's contact form (`POST /api/contact`)
- saves them to a local JSON file (`data/messages.json`)
- emails you a notification when a new one arrives
- gives you an **admin inbox** at `/admin` where you can read messages and **reply — the reply is emailed straight to the sender**

## 1. Install

```bash
npm install
```

## 2. Configure

```bash
cp .env.example .env
```

Then edit `.env`:
- `ADMIN_TOKEN` — make up a long random string. This is your password for `/admin`.
- `ADMIN_EMAIL` — your real email address.
- `SMTP_*` — credentials for an account that can send email.
  - Easiest for testing: a Gmail account with an **App Password** (Google Account → Security → 2-Step Verification → App passwords). Regular Gmail passwords won't work.
  - For production, a transactional email service (Resend, SendGrid, Mailgun, etc.) is more reliable — they all give you SMTP host/user/pass.
- `ALLOWED_ORIGINS` — the URL(s) your frontend will be served from.

If you skip the SMTP setup, the server still runs and still **saves** every message — it just won't send emails until you add real credentials.

## 3. Run locally

```bash
npm start
```

- API: `http://localhost:4000/api/contact`
- Admin inbox: `http://localhost:4000/admin`

## 4. Connect the React frontend

In the portfolio's `PortfolioPro.jsx`, the `API_URL` constant is set to `/api/contact` (relative). Two ways to make that resolve correctly:

- **Same domain**: deploy the frontend and this API behind the same host (e.g. this Express app also serves the built React app, or a reverse proxy routes `/api/*` to this server).
- **Different domain**: change `API_URL` to the backend's full URL, e.g. `https://api.yourname.dev/api/contact`, and make sure that URL is listed in `ALLOWED_ORIGINS`.

## 5. Deploy

Any Node host works — this has no special requirements:
- **Render / Railway**: connect the repo, set the same environment variables from `.env`, start command `npm start`.
- **A VPS**: `npm install && npm start` behind a process manager like `pm2`, with nginx reverse-proxying to it.

The `data/messages.json` file needs to live on persistent storage — most serverless platforms (e.g. plain Vercel functions) wipe the filesystem between requests, so prefer a host with a persistent disk (Render, Railway, a VPS), or swap `db.js` for a real database if you outgrow the file.

## API reference

| Method | Path | Auth | Body | Purpose |
|---|---|---|---|---|
| POST | `/api/contact` | none | `{ name, email, message }` | Save a new message, email you a notification |
| GET | `/api/messages` | `x-admin-token` header | — | List all messages, newest first |
| POST | `/api/messages/:id/reply` | `x-admin-token` header | `{ replyText }` | Save + email your reply to the sender |
| GET | `/api/health` | none | — | Health check |
