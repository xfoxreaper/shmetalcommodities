# Task Tracking Board
**Project:** SH Metal Commodities | **Last updated:** 2026-03-28

> Agents: update your task status by editing this file. Change `TODO` → `WIP` when starting, `WIP` → `DONE` when complete, or `BLOCKED` with a note. Add your agent ID next to status when working. Do not modify tasks outside your assigned scope.

---

## How Agents Use This File

1. Find your wave and agent slot
2. Before starting each task, change status from `TODO` to `WIP [agent-id]`
3. After completing, change to `DONE`
4. If blocked, change to `BLOCKED` and add a note in parentheses
5. Do not touch tasks in other agent slots

Status values: `TODO` | `WIP` | `DONE` | `BLOCKED`

---

## Wave 0 — Scaffold (Solo Agent, Blocking)

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-001 | `create-next-app` with TS, ESLint, Tailwind, App Router, src/ dir | `DONE` | |
| T-002 | Extend `tailwind.config.ts` — brand colours, font families, RTL variant | `DONE` | Tailwind v4: tokens in globals.css @theme block |
| T-003 | Configure `next/font/google` in `src/app/fonts.ts` (4 typefaces) | `DONE` | |
| T-004 | Install runtime deps: next-intl, resend, react-hook-form, @hookform/resolvers, zod, @heroicons/react | `DONE` | |
| T-005 | Install dev deps: @storybook/nextjs, @playwright/test, axe-core | `DONE` | |
| T-006 | Configure next-intl: middleware.ts, i18n.ts, next.config.ts | `DONE` | |
| T-007 | Create `src/app/[locale]/layout.tsx` with lang + dir attributes | `DONE` | |
| T-008 | Create full directory structure (see SPRINTS.md S0) | `DONE` | |
| T-009 | Copy logo to `public/images/logo.png` | `DONE` | |
| T-010 | Create `.env.local` with RESEND_API_KEY and CONTACT_FORM_RECIPIENT placeholders | `DONE` | |
| T-011 | Create `.env.example` (commit this, not .env.local) | `DONE` | .env.local added to .gitignore |
| T-012 | Create content stubs: company.ts, team.ts, services.ts, contact.ts | `DONE` | |
| T-013 | Create empty message files: en.json, de.json, zh.json, ar.json with top-level key structure | `DONE` | |
| T-014 | ESLint + Prettier config | `DONE` | Prettier + eslint-config-prettier installed |
| T-015 | Verify `npm run dev` runs clean on localhost:3000, /en resolves | `DONE` | All 4 locales 200; / → 307 redirect; next-intl warning: middleware.ts (keep — proxy.ts breaks routing) |
| T-016 | Git init, initial commit | `WIP [wave0]` | |

---

## Wave 1 — Design System + i18n (2 Agents in Parallel)

### Agent 1A — Design System & Storybook
**File scope:** `src/components/ui/`, `src/components/primitives/`, `.storybook/`, `src/styles/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-101 | `Typography.tsx` — all variants (display, h1-h3, body, label, pullquote) | `TODO` | |
| T-102 | `Button.tsx` — primary, secondary, ghost variants; disabled + loading states | `TODO` | |
| T-103 | `Container.tsx` — max-w-[1100px], centred, responsive padding | `TODO` | |
| T-104 | `Section.tsx` — vertical padding tokens, background prop (navy/ivory/transparent) | `TODO` | |
| T-105 | `PageHeader.tsx` — full-width, title + optional subtitle | `TODO` | |
| T-106 | `GoldDivider.tsx` — 1px horizontal rule in #B89A5A, configurable width | `TODO` | |
| T-107 | `NoiseTexture.tsx` — CSS-only SVG data URI noise/grain overlay | `TODO` | |
| T-108 | `PullQuote.tsx` — Cormorant Garamond italic, gold left border | `TODO` | |
| T-109 | `MetalCard.tsx` — CSS-only material textures for copper/aluminium/zinc | `TODO` | |
| T-110 | `TeamCard.tsx` — photo/placeholder toggle, name/title/bio/linkedin | `TODO` | |
| T-111 | `PlaceholderAvatar.tsx` — SVG circle with initials | `TODO` | |
| T-112 | `FormField.tsx` — label + input/textarea/select wrapper, gold focus ring | `TODO` | |
| T-113 | `FormError.tsx` — inline error, aria-describedby linkage | `TODO` | |
| T-114 | `.storybook/main.ts` — Storybook configured for Next.js | `TODO` | |
| T-115 | Stories for every component — all variants, states, navy + ivory bg, RTL preview | `TODO` | |
| T-116 | Verify `npm run storybook` runs clean | `TODO` | |
| T-117 | Verify gold never used as body text on ivory (contrast check) | `TODO` | |

### Agent 1B — i18n Infrastructure & Content Config
**File scope:** `messages/`, `content/`, `src/i18n/`, `src/lib/i18n*`, `src/lib/locales.ts`, `src/lib/metadata.ts`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-151 | `messages/en.json` — fully populated: nav, home, about, services, team, contact, footer, common | `TODO` | |
| T-152 | `messages/de.json` — machine-translated placeholders, TODO comment at top | `TODO` | |
| T-153 | `messages/zh.json` — machine-translated placeholders, CJK font note, TODO comment | `TODO` | |
| T-154 | `messages/ar.json` — machine-translated, RTL punctuation, TODO comment | `TODO` | |
| T-155 | `content/company.ts` — CompanyConfig interface + full placeholder data | `TODO` | |
| T-156 | `content/team.ts` — TeamMember interface + founder placeholder object | `TODO` | |
| T-157 | `content/services.ts` — Metal interface + copper/aluminium/zinc placeholder objects | `TODO` | |
| T-158 | `content/contact.ts` — ContactConfig interface + Hamburg address placeholder | `TODO` | |
| T-159 | `src/components/ui/LanguageSwitcher.tsx` — EN/DE/ZH/AR toggle, preserves path, gold active | `TODO` | |
| T-160 | `src/lib/locales.ts` — locales array, defaultLocale, localeNames map | `TODO` | |
| T-161 | `src/lib/metadata.ts` — generatePageMetadata() helper | `TODO` | |
| T-162 | Verify `npm run build` passes all 4 locales | `TODO` | |
| T-163 | Verify /ar/* has dir="rtl" on html element | `TODO` | |

---

## Wave 2 — Navigation & Footer (Agent 2A)

**File scope:** `src/components/layout/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-201 | `Navbar.tsx` — desktop layout: logo left, links + switcher right | `TODO` | |
| T-202 | Nav links with `useTranslations('nav')` | `TODO` | |
| T-203 | Active state via `usePathname()` — gold underline on active link | `TODO` | |
| T-204 | Scroll transparency: transparent on home below 80px, solid navy above — 200ms transition | `TODO` | |
| T-205 | Always solid navy on non-home pages | `TODO` | |
| T-206 | Mobile hamburger button — hidden links at < 768px, Bars3Icon | `TODO` | |
| T-207 | `MobileMenu.tsx` — full-screen overlay, fixed, inset-0, z-50 | `TODO` | |
| T-208 | Mobile overlay: stacked links, close button, body scroll lock | `TODO` | |
| T-209 | Keyboard: Escape closes, focus trap (Tab cycles within overlay) | `TODO` | |
| T-210 | ARIA: role="dialog", aria-modal, aria-expanded on hamburger, aria-label | `TODO` | |
| T-211 | LanguageSwitcher in mobile overlay | `TODO` | |
| T-212 | `Footer.tsx` — 3-column grid desktop, single column mobile | `TODO` | |
| T-213 | Footer: logo + descriptor, nav links (centred), email + city + LanguageSwitcher | `TODO` | |
| T-214 | Footer: GoldDivider above bottom bar, copyright with dynamic year | `TODO` | |
| T-215 | Footer RTL: columns reverse, text alignment via logical properties | `TODO` | |
| T-216 | Wire Navbar + Footer into `src/app/[locale]/layout.tsx` | `TODO` | |
| T-217 | Test all 4 locales + RTL in browser | `TODO` | |

---

## Wave 3 — Pages (3 Agents in Parallel)

### Agent 3A — Home / Hero Page
**File scope:** `src/app/[locale]/page.tsx`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-301 | Hero section (100dvh): bg-navy + NoiseTexture overlay | `TODO` | |
| T-302 | Tagline (display serif, ivory) from t('home.tagline') | `TODO` | |
| T-303 | Sub-tagline (body serif) from t('home.subTagline'), max-w-2xl centred | `TODO` | |
| T-304 | CTA Button "Learn More" → /[locale]/about — gold border, hover fill | `TODO` | |
| T-305 | Trust bar: GoldDivider | trustBar text | GoldDivider, ivory background | `TODO` | |
| T-306 | Page fade-in CSS animation, prefers-reduced-motion off | `TODO` | |
| T-307 | generateMetadata() with translated title + description | `TODO` | |
| T-308 | OG tags: og:title, og:description, og:type | `TODO` | |
| T-309 | hreflang alternates | `TODO` | |
| T-310 | RTL: text-align right on headings, button alignment for Arabic | `TODO` | |
| T-311 | ZH: CJK font class on display text | `TODO` | |

### Agent 3B — About Page
**File scope:** `src/app/[locale]/about/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-321 | Page heading from t('about.heading') with GoldDivider below | `TODO` | |
| T-322 | 3 body paragraphs from company.about.paragraphs, PLACEHOLDER comments | `TODO` | |
| T-323 | PullQuote component with company.about.pullQuote, PLACEHOLDER comment | `TODO` | |
| T-324 | Credential line: "Established in Hamburg, Germany" via company.established | `TODO` | |
| T-325 | Page fade-in | `TODO` | |
| T-326 | generateMetadata() per locale | `TODO` | |
| T-327 | OG tags | `TODO` | |
| T-328 | RTL layout | `TODO` | |

### Agent 3C — Services Page
**File scope:** `src/app/[locale]/services/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-341 | PageHeader: t('services.heading') | `TODO` | |
| T-342 | Metal cards grid: grid-cols-1 md:grid-cols-3 | `TODO` | |
| T-343 | Render MetalCard for each services entry, PLACEHOLDER comment per card | `TODO` | |
| T-344 | Brokerage model paragraph in ivory section below cards | `TODO` | |
| T-345 | Secondary CTA "Speak to Our Team" → /[locale]/contact | `TODO` | |
| T-346 | generateMetadata() per locale | `TODO` | |
| T-347 | OG tags | `TODO` | |
| T-348 | RTL layout | `TODO` | |

---

## Wave 4 — Team + Contact (2 Agents in Parallel)

### Agent 4A — Team Page
**File scope:** `src/app/[locale]/team/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-401 | PageHeader: t('team.heading') | `TODO` | |
| T-402 | Team grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 | `TODO` | |
| T-403 | Render TeamCard for each team entry | `TODO` | |
| T-404 | TeamCard: photo/PlaceholderAvatar conditional, name/title/bio/linkedin | `TODO` | |
| T-405 | LinkedIn icon link with aria-label | `TODO` | |
| T-406 | PLACEHOLDER comment block on card | `TODO` | |
| T-407 | Comment at top of content/team.ts explaining how to add members | `TODO` | |
| T-408 | generateMetadata() per locale | `TODO` | |
| T-409 | OG tags | `TODO` | |
| T-410 | RTL layout | `TODO` | |

### Agent 4B — Contact Page + Email API
**File scope:** `src/app/[locale]/contact/`, `src/app/api/contact/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-421 | Two-column layout: grid-cols-1 md:grid-cols-2 gap-16 | `TODO` | |
| T-422 | Left: contact details from content/contact.ts, PLACEHOLDER comments | `TODO` | |
| T-423 | Left: <!-- TODO: add Google Maps embed here --> comment | `TODO` | |
| T-424 | Right: Zod schema for form (name, company?, email, subject, message min 20) | `TODO` | |
| T-425 | React Hook Form wired to Zod schema | `TODO` | |
| T-426 | FormField components for all 5 inputs, all labels from t() | `TODO` | |
| T-427 | Subject dropdown: options from t('contact.subjects') | `TODO` | |
| T-428 | Submit handler: POST /api/contact | `TODO` | |
| T-429 | Loading state: spinner on button, disabled during submit | `TODO` | |
| T-430 | Success state: replace form with success message | `TODO` | |
| T-431 | Error state: inline error, form remains editable | `TODO` | |
| T-432 | `api/contact/route.ts`: POST handler, Zod re-validation server-side | `TODO` | |
| T-433 | Rate limit: Map-based in-memory, 5 req/hour per IP | `TODO` | |
| T-434 | Resend SDK: send email to CONTACT_FORM_RECIPIENT | `TODO` | |
| T-435 | emailTemplate() function: clean branded HTML | `TODO` | |
| T-436 | TODO comment at top of route.ts for env var setup | `TODO` | |
| T-437 | generateMetadata() per locale | `TODO` | |
| T-438 | RTL layout | `TODO` | |

---

## Wave 5 — SEO & Performance (Solo Agent)

**File scope:** All page files (metadata only), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/[locale]/opengraph-image.tsx`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-501 | Audit all 5 pages × 4 locales for generateMetadata() completeness | `TODO` | |
| T-502 | Add title template to root layout metadata | `TODO` | |
| T-503 | `opengraph-image.tsx` using next/og ImageResponse — navy bg, gold text, logo | `TODO` | |
| T-504 | hreflang alternates on all 5 pages | `TODO` | |
| T-505 | `sitemap.ts` — all pages × all locales with lastModified | `TODO` | |
| T-506 | `robots.ts` — allow all, sitemap pointer | `TODO` | |
| T-507 | Audit all Image components: alt translated, width/height set, priority on above-fold | `TODO` | |
| T-508 | Verify font-display: swap (next/font default — just confirm) | `TODO` | |
| T-509 | `npm run build` — check bundle output, flag any page > 200kb JS | `TODO` | |
| T-510 | Lighthouse run on all 5 pages — document scores, fix sub-90 issues | `TODO` | |

---

## Wave 6 — Accessibility Audit (Solo Agent)

**File scope:** Read all + targeted edits

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-601 | axe-core scan all 5 pages EN locale — fix critical + serious violations | `TODO` | |
| T-602 | Verify gold #B89A5A never used as body text on ivory background | `TODO` | |
| T-603 | Verify all interactive elements have gold focus ring (2px solid #B89A5A) | `TODO` | |
| T-604 | Keyboard-only navigation test: Tab through all pages | `TODO` | |
| T-605 | aria-current="page" on active nav link | `TODO` | |
| T-606 | aria-label on: hamburger, close button, LinkedIn icon, language switcher | `TODO` | |
| T-607 | Mobile overlay: role="dialog", aria-modal, focus trap verified | `TODO` | |
| T-608 | Contact form: every input has associated label | `TODO` | |
| T-609 | Error messages linked via aria-describedby | `TODO` | |
| T-610 | Subject dropdown: keyboard navigable, aria-label | `TODO` | |
| T-611 | All CSS animations wrapped in prefers-reduced-motion media query | `TODO` | |
| T-612 | RTL overflow check: Arabic locale, text doesn't clip in any component | `TODO` | |
| T-613 | Lighthouse Accessibility category all 5 pages — target 100 | `TODO` | |

---

## Wave 7 — Tests + README (2 Agents in Parallel)

### Agent 7A — Playwright E2E Tests
**File scope:** `e2e/`, `playwright.config.ts`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-701 | `playwright.config.ts` — baseURL, browsers (chromium, firefox, webkit), mobile viewport | `TODO` | |
| T-702 | `e2e/navigation.spec.ts` — all 5 links route correctly, active state, logo links home, scroll bg | `TODO` | |
| T-703 | `e2e/mobile.spec.ts` — hamburger open/close, Escape, focus trap | `TODO` | |
| T-704 | `e2e/i18n.spec.ts` — language switcher preserves path, dir=rtl for AR, lang=zh for ZH, all pages 200 all locales | `TODO` | |
| T-705 | `e2e/contact.spec.ts` — validation errors, invalid email, short message, success (mocked), loading state | `TODO` | |
| T-706 | `e2e/pages.spec.ts` — titles, trust bar text, 3 metal cards, 1 team card, contact sections | `TODO` | |
| T-707 | `npx playwright test` — all tests green | `TODO` | |

### Agent 7B — README
**File scope:** `README.md`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-721 | Project overview section | `TODO` | |
| T-722 | Prerequisites + local dev instructions | `TODO` | |
| T-723 | Environment variables guide | `TODO` | |
| T-724 | Content management guide (content/*.ts editing with examples) | `TODO` | |
| T-725 | Translations guide (messages/*.json, TODO markers) | `TODO` | |
| T-726 | Placeholder replacement checklist (all PLACEHOLDER items with file locations) | `TODO` | |
| T-727 | Vercel deployment step-by-step | `TODO` | |
| T-728 | Adding a new page guide | `TODO` | |
| T-729 | Design system / Storybook reference | `TODO` | |

---

## Wave 8 — Deployment & Launch (Solo Agent)

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-801 | `npm run build` — zero errors, zero TS errors | `TODO` | |
| T-802 | `npm run lint` — zero warnings | `TODO` | |
| T-803 | `npx playwright test` — all green | `TODO` | |
| T-804 | Verify env vars in Vercel dashboard (RESEND_API_KEY, CONTACT_FORM_RECIPIENT) | `TODO` | |
| T-805 | Deploy to Vercel production | `TODO` | |
| T-806 | Smoke test all 5 pages on production URL | `TODO` | |
| T-807 | Language switcher + RTL verified on production | `TODO` | |
| T-808 | Contact form tested end-to-end in production (real email received) | `TODO` | |
| T-809 | Custom domain setup (if ready) — DNS + HTTPS | `TODO` | |
| T-810 | Final Lighthouse run on production — all categories 90+ | `TODO` | |
| T-811 | Create `LAUNCH_CHECKLIST.md` — all placeholder items for client to replace | `TODO` | |

---

## Progress Summary

| Wave | Total Tasks | Done | WIP | Blocked |
|------|-------------|------|-----|---------|
| W0 Scaffold | 16 | 0 | 0 | 0 |
| W1A Design System | 17 | 0 | 0 | 0 |
| W1B i18n + Content | 13 | 0 | 0 | 0 |
| W2 Nav + Footer | 17 | 0 | 0 | 0 |
| W3A Home | 11 | 0 | 0 | 0 |
| W3B About | 8 | 0 | 0 | 0 |
| W3C Services | 8 | 0 | 0 | 0 |
| W4A Team | 10 | 0 | 0 | 0 |
| W4B Contact + API | 18 | 0 | 0 | 0 |
| W5 SEO | 10 | 0 | 0 | 0 |
| W6 Accessibility | 13 | 0 | 0 | 0 |
| W7A E2E Tests | 7 | 0 | 0 | 0 |
| W7B README | 9 | 0 | 0 | 0 |
| W8 Deployment | 11 | 0 | 0 | 0 |
| **Total** | **178** | **0** | **0** | **0** |
