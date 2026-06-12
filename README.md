# AstroVeda — Astrology, Numerology & Vastu Consulting Website

A complete, production-ready React website built with **Vite + TypeScript + Tailwind CSS + MUI (Material Design 3) + Framer Motion**.

## ✨ What's included

| Page | Route | Highlights |
|---|---|---|
| Home | `/` | Animated zodiac-wheel hero, featured services, how-it-works, pricing teaser, testimonials, blog teaser |
| About | `/about` | Story, philosophy, credentials |
| Services hub | `/services` | Links to all three disciplines |
| Astrology / Numerology / Vastu | `/services/...` | 21 services with inquiry dialogs |
| **Kundli Generator** | `/kundli` | Real Vedic math (Lahiri ayanamsa, rashi, nakshatra, tithi, Vimshottari dasha) + **PDF download** + email report |
| Book Consultation | `/book-consultation` | Validated form → saved booking → emails → WhatsApp confirmation |
| Pricing | `/pricing` | 5 packages → **Razorpay checkout** → payment record → **invoice PDF** → success page |
| Blog | `/blog`, `/blog/:slug` | Search, category filter, pagination (6/page), related posts, JSON-LD |
| Contact | `/contact` | Form → messages collection, WhatsApp/Call buttons, embedded Google Map (keyless) |
| Legal | `/privacy-policy`, `/terms` | Complete policies |
| Admin | `/admin` | Password-gated dashboard: leads, bookings, payments (with revenue total), messages |
| 404 | `*` | Animated planet page |

Everything is wired end-to-end — **no dead buttons, no placeholder links**.

## 🚀 Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

The site works **immediately with zero configuration** thanks to built-in demo fallbacks (see below). Add real keys when you're ready to go live.

## 🔑 Environment variables

Copy `.env.example` → `.env` and fill in what you have:

```
VITE_FIREBASE_API_KEY=...        # Firebase project settings
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_RAZORPAY_KEY_ID=rzp_live_...   # Razorpay dashboard → API keys

VITE_EMAILJS_SERVICE_ID=...      # EmailJS dashboard
VITE_EMAILJS_TEMPLATE_USER=...   # template w/ vars: to_email,to_name,subject,message
VITE_EMAILJS_TEMPLATE_ADMIN=...  # template w/ vars: subject,message
VITE_EMAILJS_PUBLIC_KEY=...

VITE_WHATSAPP_NUMBER=9198xxxxxxxx   # country code, no +
VITE_PHONE_NUMBER=+9198xxxxxxxx
VITE_BUSINESS_EMAIL=consult@yourdomain.in
VITE_SITE_URL=https://yourdomain.in
VITE_ADMIN_PASSWORD=choose-a-strong-password   # default: astroveda@admin
```

## 🧪 Demo-mode fallbacks (graceful degradation)

| Integration | With keys | Without keys |
|---|---|---|
| **Firebase Firestore** | Leads/bookings/payments/messages stored in Firestore | Stored in the browser's localStorage (admin dashboard still works on the same browser) |
| **Razorpay** | Real checkout (UPI/cards/netbanking) | Simulated success with `demo_...` payment ID so the full invoice flow can be tested; a banner notes no money was charged |
| **EmailJS** | Real emails to user + admin | Silently skipped |
| **Google Maps** | — | Uses the keyless `google.com/maps?...&output=embed` iframe — no API key ever needed |

## 📄 PDF generation note

The spec mentioned `@react-pdf/renderer`; this build uses **jsPDF** instead — it's ~5× lighter, has no React-tree rendering overhead, and is more reliable for the two documents needed (kundli report & tax invoice). The public API is in `src/lib/pdf.ts` (`downloadKundliPdf`, `downloadInvoicePdf`) and is easy to restyle.

## 🔭 Astrology engine

`src/lib/astrology.ts` implements real calculations — Julian day, truncated solar/lunar longitude series, Lahiri ayanamsa, ascendant, rashi, nakshatra & pada, tithi, yoga, karana and full Vimshottari dasha periods. `src/lib/geocode.ts` resolves ~28 major Indian/world cities to lat/lon/timezone (defaults to Delhi). For arc-second precision you can later swap in the Swiss Ephemeris — the interfaces won't change.

## 🛡️ Admin dashboard

Visit `/admin` and enter the password (`VITE_ADMIN_PASSWORD`, default `astroveda@admin`). Tabs show all leads, bookings, payments (with a live revenue total) and contact messages, newest first. The route is excluded from `robots.txt`.

> Note: this is a client-side gate suitable for a single-owner site. For multi-user or high-security needs, add Firebase Authentication + Firestore security rules.

## 🌐 Deployment (SPA routing)

Deploy `dist/` to Vercel / Netlify / Firebase Hosting. Make sure all routes rewrite to `/index.html`:

- **Vercel**: `vercel.json` → `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Netlify**: `_redirects` → `/* /index.html 200`
- **Firebase**: `"rewrites": [{ "source": "**", "destination": "/index.html" }]`

Update `VITE_SITE_URL` and the domain inside `public/sitemap.xml` + `public/robots.txt` to your real domain.

## ⚡ Performance

- Route-level code splitting (every page lazy-loaded)
- Manual vendor chunks (mui / firebase / pdf / motion split out)
- Fonts loaded with `display=swap`; skeleton loaders for perceived speed
- Semantic HTML, meta/OG/Twitter tags + JSON-LD on every page via `react-helmet-async`
