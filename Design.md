# Prestiige — Design System

Single source of truth for the visual language. Every component must conform to this. Keep it alive: any new token introduced in code is added here in the same change.

## Design Direction

**Dark, premium, atmospheric** — a near-black teal-green canvas with a single luminous teal accent, broken by one **warm cream "light room"** section for the process steps. The feeling: calm, trustworthy, modern-service. Not playful, not corporate-stocky — closer to a high-end home-services brand. Real photography (rounded, generous radii) carries warmth against the dark UI.

Reference direction: modern home-service / cleaning landing pages with dark hero + photo strip, light process band, bold full-width CTA banner.

## Color Palette

```css
:root {
  /* Dark canvas */
  --brand-darker: #071512;   /* page background */
  --brand-dark:   #0A1F1C;   /* alternating dark sections */
  --brand-card:   #112820;   /* card surfaces */
  --brand-border: #1E4039;   /* hairline borders/dividers */
  --brand-tealDim:#1A3D38;   /* input fills, soft fills */

  /* Accent */
  --brand-teal:      #00C4A0; /* primary accent, CTAs */
  --brand-tealLight: #00E5BB; /* gradient end, hover */

  /* Light room (process section) */
  --brand-cream:    #F3F1E9;  /* light section background */
  --brand-sand:     #E7E3D6;  /* light section card/step surface */
  --brand-ink:      #0A1F1C;  /* text on light */
  --brand-inkMuted: #4A5A55;  /* secondary text on light */

  /* Text on dark */
  --text-primary:  #FFFFFF;
  --text-secondary:rgba(255,255,255,0.60);
  --text-muted:    rgba(255,255,255,0.40);
}
```

Gradients (Tailwind `backgroundImage`):
- `hero-gradient` — radial teal glow top-center
- `card-gradient` — subtle teal diagonal on cards
- `cta-gradient` — `#00C4A0 → #00E5BB`, used on primary buttons & banner

## Typography

- **Display/Heading:** Plus Jakarta Sans (400–800) — `next/font`, `font-heading`
- **Body:** DM Sans (400–600) — `next/font`, `font-body`

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | `text-5xl→text-7xl` | 800 | `leading-[1.05]`, balanced |
| Section H2 | `text-4xl→text-5xl` | 800 | teal accent on key word |
| Oversized "ABOUT US" | `text-6xl→text-8xl` | 800 | tracking-tight |
| H3 / card title | `text-lg→text-xl` | 700 | |
| Eyebrow | `text-sm` | 600 | uppercase, `tracking-widest`, teal |
| Body large | `text-lg` | 400 | secondary color |
| Body | `text-sm` | 400 | |
| Button label | `text-sm` | 700 | heading font |

## Spacing & Layout

- Container: `max-w-7xl mx-auto px-6 lg:px-8`
- Section vertical rhythm: `py-20` / `py-24`
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96 px (Tailwind defaults)
- Grids: services 2/3/6 cols, steps 1/2/4, reviews 1/2

## Border Radius & Shadows

- Radius: cards `rounded-2xl`, hero/photo blocks `rounded-3xl`, pills/buttons `rounded-full`
- `teal-glow` — `0 0 40px rgba(0,196,160,0.2)` (primary CTAs, hero media)
- `teal-glow-sm` — `0 0 20px rgba(0,196,160,0.15)` (logo, small badges)
- `.glass-card` — translucent card: `rgba(17,40,32,0.6)` + `blur(12px)` + teal hairline

## Components

- **Primary button:** `bg-cta-gradient text-brand-darker font-heading font-700`, `rounded-full`, `px-7 py-3.5`, `teal-glow`, hover `scale-105`
- **Ghost button:** `border border-brand-border text-white/80`, hover `border-brand-teal/50`
- **Pill/badge:** `border border-brand-teal/30 bg-brand-teal/10 text-brand-teal text-xs`
- **Photo tile:** `next/image` `fill` in `rounded-2xl/3xl` aspect box, gradient overlay, label bottom-left
- **Light step:** circular teal icon chip on `brand-sand`, dark ink text
- **CTA banner:** full-width `bg-cta-gradient`, `rounded-3xl`, dark text + dark solid button

## Motion

- Library: **none** — CSS keyframes (`fade-up`, `fade-in`, `float`) + IntersectionObserver `.section-fade` reveal
- Tokens: fast 200ms, base 300ms, slow 700ms; ease `ease`
- Patterns: staggered `.section-fade` on scroll (`transitionDelay` per index), hover lift `-translate-y-1`, button `scale-105`
- Respect `prefers-reduced-motion` (gate reveal/float)

## Imagery & Iconography

- Photography: real Unsplash photos (cleaning, interiors, people), warm/bright, `fit=crop`
- All remote images via `next/image`; `images.unsplash.com` whitelisted in `next.config.js`
- LCP images (`priority`); every `fill` image has `sizes`
- Icons: `lucide-react`, stroke ~2, sizes 14–24

## Page Patterns (added with /partner)

- **Full-bleed image hero:** `next/image fill priority` behind a left-aligned content column; darken with `bg-gradient-to-r from-brand-darker via-brand-darker/90 to-brand-darker/40` so text stays AA-legible. Min height `min-h-[88vh]`.
- **Benefit columns:** 3 × `glass-card` with a `rounded-2xl` teal icon chip, title, body — used for "Why Partner With Us".
- **Value tiles on light:** small `bg-brand-dark` cards sitting inside the `brand-cream` section for contrast.
- **FAQ accordion:** `glass-card` rows; expand via `grid-rows-[0fr]→[1fr]` + opacity transition (no library); circular `+ / −` toggle; one item open by default.
- **Shared Navbar API:** `<Navbar primaryCta secondaryCta announcement />` — links are absolute (`/#...`) so the header works on every route. Defaults = landing's "Our Services" / "Get a Quote"; `/partner` passes "Login" / "Join as a Partner".

## Dashboard Shell (added with /dashboard)

- **App layout:** fixed icon-rail sidebar (`w-16 lg:w-20`, `bg-brand-dark`, active item = teal chip + left bar) + scrollable `main`; no marketing Navbar/Footer. Content capped at `max-w-6xl`.
- **Stat card:** `glass-card` (or `bg-brand-teal/10` accent variant) with label + icon chip; locked value shown as muted `₦ ––––––` + small lock.
- **LockedOverlay:** reusable absolute overlay — `bg-brand-darker/60 backdrop-blur-[3px]`, centered lock chip + message. Placed over a faint (`opacity-30/40`) static preview (CSS bars / skeleton rows) so the locked area still reads as real content.
- **Activated (mobile-first) overview:** vertical stack — `TopBar` (greeting + circular avatar + bell), `BalanceCard` (big `₦` figure), horizontal-snap stat strip (`scrollbar-none`, 3 cards), `ReferralLinkBar` (pill + white round Copy button), `EarningsOverview` (smooth SVG area chart). Stat strip becomes `grid-cols-3` from `lg` up.
- **StatCard tones:** `default` (glass) / `pending` (amber/15 + amber/30) / `success` (teal/10 + teal/30).
- **MobileBottomNav:** `lg:hidden`, fixed floating white pill (`shadow-[0_8px_30px_rgb(0,0,0,0.25)]`) with 4 icon Links using `usePathname` for active = `bg-brand-teal/15 text-brand-teal`. Sidebar is `hidden lg:flex` so the two never coexist.
- **Area chart:** hand-rendered SVG, Catmull-Rom → cubic Bezier smoothing, `linearGradient` fill below the line (`#00C4A0` 0.45 → 0). Y/X labels positioned outside the SVG. Faint horizontal grid only.
- **Sidebar is route-aware:** client component using `usePathname`; rail items are `Link`s, active = teal chip + left bar. Routes: Overview → `/dashboard`, Payout → `/dashboard/payout`.
- **Payout hero:** `rounded-3xl` card with `from-brand-teal/25 via-brand-dark to-brand-darker` wash + blurred teal orb, big `₦` figure, white solid "Withdraw" button.
- **Segmented tabs:** pill container `bg-brand-darker/60` border; active segment = solid `bg-white text-brand-darker`, inactive = `text-white/55`. Client `useState`, `role="tablist"`.
- **Data table:** sticky-style header on `bg-brand-tealDim/30`, 4-col grid rows with hairline dividers; status pill colors — Pending `amber-400`, Successful `brand-teal`, Failed `red-500` (all `/15` bg, `/30` border).
- **Payout history (mobile-first):** replaced the data table with a stacked card list — each card has invoice (small muted) on top, then name + status pill (Pending / Completed / Failed), and an amount row at the bottom with a small label on the left and figure on the right. The tab toggle floats above the list (no outer card wrapper) so the cards read as the primary surface.
- **Page header (sub-page):** simple row — page label left (text only, no nav), settings cog + bell circular buttons right. Used on `/dashboard/payout`, `/dashboard/profile`, `/dashboard/settings`. Mobile bottom nav handles navigation.
- **Settings page:** plain title header + bell/account icon buttons; 2-col top row (Notification Preferences | Referral Link) over a full-width Account & Security card. Sidebar Settings (bottom) is a `Link` to `/dashboard/settings` with the same active treatment as the rail.
- **Toggle switch:** `role="switch"` button, `w-11 h-6` track, `bg-brand-teal` on / `bg-white/15` off, sliding white knob.
- **Danger actions:** `border-red-500/50 text-red-300 hover:bg-red-500/10` outline buttons (Deactivate, Logout). Primary inline action (Change Password) = solid `bg-brand-teal`.
- **Profile page:** `glass-card rounded-3xl` shell → avatar (circular `next/image` + `BadgeCheck` overlay) + name/location + ghost "Edit" pill; nested `bg-brand-dark/60` Personal Information sub-card with a 2/3-col label-over-value `Field` grid; meta row (Partners ID / Date Joined / Status pill). Status pill reuses the red danger token.
- **Field pattern:** uppercase muted micro-label (`text-white/40 text-xs tracking-wide`) over `text-white/80 text-sm` value.

## Booking Wizard (added with /book)

A **light** customer flow that lives outside the dashboard / marketing dark theme. Wraps in `bg-white text-brand-ink` to override the global dark body.

- **Layout:** `grid lg:grid-cols-[1.2fr_1fr]` — form panel left, full-bleed photo right (`next/image fill priority`, soft `to-transparent` vignette on its left edge). Photo hidden under `lg`.
- **Stepper:** numbered circles — active/done = `bg-brand-ink text-white`, future = `bg-gray-200 text-gray-500`; done state uses `Check`. Thin connector line between steps.
- **Form card:** `bg-white border-gray-100 rounded-2xl` with a soft `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`.
- **Inputs:** label above; wrapped field with leading lucide icon, `rounded-xl`, `border-gray-200`, focus = `border-brand-ink + ring brand-ink/10`.
- **Primary CTA on light:** `bg-brand-ink text-white rounded-xl` (replaces the dark theme's teal-gradient pill).
- **Booking CTAs across the site:** Hero "Book a Cleaning", Services tiles, Testimonials "Book Your First Clean" — all route to `/book`.
- **Stepper rule:** only the **current** step is emphasized (filled `bg-brand-ink` circle + dark label). Every other step — past or future — uses the muted `bg-gray-200 / text-gray-400` treatment. Heading stays constant across steps in this flow.
- **Service select card:** photo top in 4:3 aspect, teal-filled `Check` toggle in the top-right of the photo when selected; title/desc/price stacked below. Selected state adds `border-brand-ink` + a slightly stronger shadow. Card is a `role="checkbox"` button (whole card toggles).
- **Step 2 footer:** outline `Back` + filled dark `Book now` (disabled while no services selected).

## Auth pages (added with /signup)

Light theme like the booking flow. Single centered column on `bg-white`.

- **Heading:** `font-heading font-800 text-3xl sm:text-4xl text-brand-ink`, supporting line below with a teal `Link` for the alternate action ("Login" / "Sign up").
- **Inputs:** placeholder-only (no visible label, real `sr-only` label per input). `bg-white border-2 border-brand-ink/80 rounded-xl px-5 py-4`. Focus = `border-brand-ink` + `ring-2 ring-brand-ink/10`.
- **Custom checkbox:** native `input` is `sr-only peer`; rendered square is `bg-brand-teal border-brand-teal` when checked, `bg-white border-brand-ink/60` when not. Inline link uses the teal accent.
- **Primary CTA:** full-width `bg-brand-ink text-white rounded-xl py-4`, disabled when terms not agreed.
- **Login variant:** softer card shell — `max-w-md` rounded-2xl card with `border-gray-100` + `shadow-[0_8px_30px_rgb(0,0,0,0.06)]`. Inputs use the lighter `border-gray-200 + shadow-[0_2px_8px_…]` treatment (vs. signup's bold ink borders).
- **Inline link cluster:** right-aligned "Forgot password?" sits between password and submit; secondary action ("Are you new? / Already have an account?") centered under the submit. Teal text, `font-heading font-600`, underline on hover.

## Accessibility

- Contrast: WCAG AA. White on `--brand-darker` and `--brand-ink` on `--brand-cream` both pass.
- Visible `:focus-visible` ring on all interactive elements
- Semantic landmarks: `header`/`nav`/`main`/`section`/`footer`; one `<h1>`
- Meaningful `alt` on content images; `alt=""` for decorative
- Animations gated on `prefers-reduced-motion`
