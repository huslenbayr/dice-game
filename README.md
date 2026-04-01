# MongolWay

Bilingual tourism website and admin app for a new Mongolian travel company built with Next.js, React, and Tailwind CSS.

## What is included

- Home, About, Tours, Tour Details, Booking, Contact, FAQ, Payment, and Admin pages
- English and Mongolian content with a visible language switcher
- Three featured Mongolia journeys:
  - Naadam Experience
  - Arkhangai Adventure
  - Khuvsgul Lake Escape
- Booking flow with server-side persistence
- Role-aware sign-in flow with traveler and admin access paths
- Server-side booking and lead email notification flow with traveler auto-replies
- QPay-ready payment abstraction for future dynamic QR and callback integration
- Editable admin dashboard for tours, guide names, bilingual content, contact info, bookings, and payment status

## Stack

- Next.js 16
- React 19
- Tailwind CSS
- Supabase-ready repository layer
- SMTP-ready email provider abstraction with Google Workspace-compatible delivery

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in values as needed:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build and production run

```bash
npm run build
npm run start
```

## Data and architecture notes

- Sample content is stored in [data/mongolway-db.json](./data/mongolway-db.json)
- The current demo works without external services by using the local JSON store
- Supabase clients and repository seams are already prepared in `lib/supabase` and `lib/repositories`
- Booking emails are sent from the server through `lib/email`
- If SMTP is not configured, the booking or lead is still saved, the email is stored in `emailOutbox`, and the server logs that delivery failed
- QPay is not implemented yet, but the payment layer is structured for future QR generation and callback handling

## Demo accounts

- Admin: `huslenbayr9779@gmail.com` / `MongolWayAdmin123!`
- Traveler: `traveler@example.com` / `MongolWayTravel123!`

Public registration creates a regular traveler account. Admin access depends on role/email-based authorization.

## Environment variables

See `.env.example` for:

- Supabase connection settings
- admin email allowlist and session duration
- site URL metadata
- admin notification and sender addresses
- email provider mode
- SMTP / Google Workspace credentials
- Google OAuth placeholders for future social login

For Google Workspace delivery, set `EMAIL_PROVIDER=google-workspace`, keep `EMAIL_FROM=info@mongolway.com`, and provide the mailbox SMTP credentials in `SMTP_USER` / `SMTP_PASS`. The app keeps a provider seam, so switching between `mock`, `smtp`, and `google-workspace` does not require route or frontend changes.
