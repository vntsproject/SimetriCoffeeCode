# SIMETRI COFFEE ROASTERS

Responsive Next.js website for SIMETRI COFFEE ROASTERS with public ordering, reservation, admin dashboard, Supabase integration, SEO metadata, and a white-first premium visual system.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth and Database
- React Hook Form + Zod
- DM Sans via next/font/google

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with your Supabase URL, anon key, service role key, admin email, and admin password. Never expose `SUPABASE_SERVICE_ROLE_KEY` in the browser.

## Supabase

1. Open Supabase SQL Editor.
2. Run the full content of `supabase/migrations/001_initial_schema.sql`.
3. Run the full content of `supabase/seed.sql`.
4. Fill `.env.local`.
5. Run:

```bash
npm run seed:admin
```

The seed admin script creates the Supabase Auth user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`, then upserts a `profiles` row with `role = admin`.

## Commands

```bash
npm install
cp .env.example .env.local
npm run dev
npm run lint
npm run build
npm run seed:admin
```

## Routes

- `/` Home
- `/order` Order flow
- `/order?table=1` QR table flow
- `/reservation` Reservation flow
- `/faq` FAQ
- `/admin/login` Admin login
- `/admin/dashboard` Dashboard
- `/admin/orders` Order management
- `/admin/reservations` Reservation management
- `/admin/menu` Menu management
- `/admin/tables` Table management

## Notes

- Gallery placeholders are intentionally safe and do not render broken images. Replace them later with `/public/images/gallery/gallery-1.jpg`, `gallery-2.jpg`, and so on.
- Reservation slots use a 3-hour window. Overlap logic is: `existing.start_time < requested_end_time AND existing.end_time > requested_start_time`.
- Admin API mutations verify Supabase session and `profiles.role = admin`.
