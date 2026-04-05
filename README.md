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
- Supabase-backed Google, Apple, and Facebook OAuth sign-in with a server callback and local role-aware session linking
- PayPal redirect checkout with server-side capture return handling, plus the existing card and QPay flows
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
- Google, Apple, and Facebook OAuth start at `app/api/auth/oauth/[provider]/route.js` and complete in `app/auth/callback/route.js`
- The callback exchanges the Supabase auth code on the server, then links or creates the MongolWay user and applies the app session cookie
- Booking emails are sent from the server through `lib/email`
- If SMTP is not configured, the booking or lead is still saved, the email is stored in `emailOutbox`, and the server logs that delivery failed
- QPay remains demo-mode ready for future QR generation and callback handling
- PayPal works in `mock`, `sandbox`, or `live` mode through the Orders API redirect flow

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
- Supabase auth URL / anon key values used by the social OAuth flows
- PayPal mode and server credentials
- checkout promo code and promo amount overrides

## Social OAuth setup

The app now supports `Continue with Google`, `Continue with Apple`, and `Continue with Facebook` through Supabase Auth. The buttons are shown on the sign-in page and become active when the Supabase auth environment variables are set.

### App environment

Set these in `.env.local` for local development and in Render for production:

- `MONGOLWAY_SUPABASE_URL`
- `MONGOLWAY_SUPABASE_ANON_KEY`
- `MONGOLWAY_SUPABASE_SERVICE_ROLE_KEY`
- `SITE_URL`

The OAuth UI and callback use the Supabase URL and anon key. The service role key is still used elsewhere in the repository layer for server-side Supabase persistence.

### Google

1. Create or open your Google Cloud project.
2. Configure the OAuth consent screen.
3. Create a Web application OAuth client.
4. Add the Supabase callback URL from your project as an authorized redirect URI.

For hosted Supabase projects this is typically:

```text
https://<your-project-ref>.supabase.co/auth/v1/callback
```

### Apple

1. Open the Apple Developer portal and create a Services ID for web sign-in.
2. Configure the Services ID website domain as your Supabase project host, for example:

```text
<your-project-ref>.supabase.co
```

3. Add the Supabase callback URL as the return URL:

```text
https://<your-project-ref>.supabase.co/auth/v1/callback
```

4. Create a Sign in with Apple key, generate the Apple client secret, and paste the Apple credentials into Supabase.

### Facebook

1. Create a Facebook app in the Meta developers dashboard.
2. Add Facebook Login and enable the `email` permission.
3. Add the Supabase callback URL as a valid OAuth redirect URI:

```text
https://<your-project-ref>.supabase.co/auth/v1/callback
```

4. Keep the Facebook app in development mode until your test users are added, or move it to live mode before public launch.

### Supabase

1. Open `Authentication` -> `Sign In / Providers`.
2. Enable the provider you want to use: Google, Apple, or Facebook.
3. Paste the matching provider credentials from Google Cloud, Apple Developer, or Meta for Developers.
4. Set the Supabase `Site URL` to your app URL, for example:

```text
https://mongolway.com
```

5. Add redirect URLs for every environment that should complete sign-in, for example:

```text
http://localhost:3000/auth/callback
https://mongolway.com/auth/callback
```

### Callback flow

1. The sign-in page links to `/api/auth/oauth/google`, `/api/auth/oauth/apple`, or `/api/auth/oauth/facebook`.
2. That route starts a Supabase PKCE OAuth flow and redirects the browser to the selected provider.
3. The provider returns to Supabase, and Supabase redirects back to `/auth/callback`.
4. The callback route exchanges the auth code for a Supabase session on the server.
5. The app then finds or creates the local MongolWay user, preserves role-aware behavior, sets the MongolWay session cookie, and redirects the user to `/account`, `/admin`, or the requested safe `next` path.

## PayPal payment setup

The booking payment page now supports three methods:

- `QPay` for local QR / deep-link checkout
- `PayPal` for hosted approval and return capture
- `Card payment` as the existing manual fallback

### App environment

Set these in `.env.local` and in Render when you are ready to use PayPal outside demo mode:

- `PAYPAL_MODE=mock|sandbox|live`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`

`mock` mode keeps the full booking flow working without external credentials by redirecting back into the app and marking the session complete on the return route. `sandbox` and `live` call the PayPal Orders API on the server.

### PayPal flow

1. The payment page calls `/api/payments/create` with the selected `paypal` method.
2. The server creates a PayPal order and stores the order ID plus the approval link in the payment session.
3. The traveler is redirected to PayPal for approval.
4. PayPal returns to `/api/payments/paypal/return`, where the server captures the order and updates the booking/payment status.
5. If the traveler cancels on PayPal, they are sent to `/api/payments/paypal/cancel`, which safely marks the checkout as cancelled instead of breaking the UI.

## Promotion code checkout override

The payment page includes a promotion code field. When the code matches the configured server value, the checkout amount is reduced on the server before the payment session is created.

Environment variables:

- `CHECKOUT_PROMO_CODE`
- `CHECKOUT_PROMO_AMOUNT`

Example:

```text
CHECKOUT_PROMO_CODE=MONGOLWAY001
CHECKOUT_PROMO_AMOUNT=0.01
```

This is useful for internal testing, influencer campaigns, or near-free promotional checkouts without changing the listed tour price.

### PayPal dashboard notes

1. Create a REST app in the PayPal developer dashboard.
2. Use the sandbox client ID and secret for `PAYPAL_MODE=sandbox`.
3. Switch to live credentials only after the live merchant account is approved.
4. No client-side secret is exposed; the app uses only server-side credentials.

For Google Workspace delivery, set `EMAIL_PROVIDER=google-workspace`, keep `EMAIL_FROM=info@mongolway.com`, and provide the mailbox SMTP credentials in `SMTP_USER` / `SMTP_PASS`. The app keeps a provider seam, so switching between `mock`, `smtp`, and `google-workspace` does not require route or frontend changes.
