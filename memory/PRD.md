# PRD — Jaidev Multispeciality Dental Care Website

## Original problem statement
Build a production-quality, conversion-focused website for Jaidev Multispeciality Dental Care,
Electronic City, Bengaluru — matching the polish/UX level of the Infodent reference site without
copying it. All 57 Practo-listed treatments organized into categories, trust-first content,
real clinic photos in the gallery, appointment form (DB + WhatsApp + email hookup), Google Maps,
hours, SEO + Dentist structured data, responsive 360px→1440px+, mobile CTA bar. Strict rule:
no invented medical/business facts (doctor credentials, reviews, pricing, claims) — placeholders
until the clinic verifies.

## Verified business data (source of truth — do not alter)
- Phone: +91 80987 61238 (tel + wa.me/918098761238)
- Address: No. 74, Srinivasa Reddy Building, Govind Shetty Palya, Konappana Agrahara,
  opposite Drug City Medical Shop, Phase II, Electronic City, Karnataka 560100
- Coordinates: 12.8551403, 77.6687825 · Maps: https://maps.app.goo.gl/NnRzGQsY9iUGKKps5
- Rating 4.7/5 from 26 Google reviews · 57 treatments listed on Practo
- Hours: Mon–Sat 10 AM–9 PM, Sun 10 AM–2 PM
- Doctor: "Dr. Premkumar" referenced in public feedback; signage reads "Dr. W. Premkumar".
  Full credentials NOT verified — profile is a deliberate placeholder.

## User decisions (locked)
- Palette: navy + soft blue (navy-950 #0B192C, azure #0088B0); teal #0D9488 only as logo/status accent.
- Appointments: store in Mongo + success state + WhatsApp deep-link + email notification via
  Emergent-managed Resend (activates when clinic provides a recipient email).
- Doctor section: name only, everything else "to be confirmed".
- Real clinic photos (4 + logo) used in gallery/accents; stock imagery elsewhere; icons sparingly.

## Architecture
- Frontend: Vite + React 19 + TS + Tailwind 4, motion (framer) + lenis smooth scroll.
  Centralized data: src/data/clinic.ts (clinic info, hours, 57 treatments in 10 categories,
  featured services, gallery). Providers: Appointment (dialog + form), TreatmentModal.
  Pages: /, /services, /about, /doctors, /reviews, /gallery, /contact.
  Sections in src/sections/*; shared UI in src/components/*.
- Backend: FastAPI /api — POST /api/appointments (validate → Mongo `appointments` → Resend email
  via integration proxy when CLINIC_NOTIFY_EMAIL set), GET /api/appointments, GET /api/health.
  Email guardrail gate `_assert_safe_email` runs on every send; recipient/subject/body are
  server-side only.
- Real clinic photos served locally from /public/clinic/ (exterior, waiting-lounge,
  treatment-suite, operatory, logo).

## Implemented (2026-08-29)
- Full 7-page site with kinetic hero (masked line reveal + parallax), editorial marquee,
  numbered chapters, trust strip, categorized 57-treatment explorer, featured implants editorial,
  why-choose, doctor placeholder, honest reviews panel (no fabricated review text), gallery with
  filters + lightbox, location + live map + today-highlighted hours, CTA bands, mobile bottom bar.
- Appointment flow verified end-to-end: validation, loading, success, error states; POST persists
  to Mongo (tested 201 + listed); success screen offers WhatsApp pre-filled confirmation.
- SEO: title/meta/OG/canonical + Dentist JSON-LD with verified data only; favicon = real logo.
- Verified: backend curl tests, homepage/services/gallery/contact screenshots, mobile 390px,
  zero console errors.

## Known gaps / pending
- P0: CLINIC_NOTIFY_EMAIL empty → email notifications inactive until clinic supplies an email.
- P0: Clinic to supply real Google review text, doctor credentials, more clinic photos
  (placeholders labeled in UI).
- P1: Replace remaining stock imagery with real clinic photography when available.
- P2: Admin view for appointment requests (endpoint exists: GET /api/appointments, no auth yet).

## Next tasks
1. Wire clinic email into CLINIC_NOTIFY_EMAIL and test a live notification.
2. Insert verified review excerpts into ReviewsSection placeholders.
3. Publish verified doctor profile (name, qualification, specialization, memberships).
4. Optional: WhatsApp Cloud API auto-confirmation, CRM integration.
