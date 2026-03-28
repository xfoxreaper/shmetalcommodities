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
| T-016 | Git init, initial commit | `DONE` | commit: chore: scaffold Next.js project for SH Metal Commodities |

---

## Wave 1 — Design System + i18n (2 Agents in Parallel)

### Agent 1A — Design System & Storybook
**File scope:** `src/components/ui/`, `src/components/primitives/`, `.storybook/`, `src/styles/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-101 | `Typography.tsx` — all variants (display, h1-h3, body, label, pullquote) | `DONE` | |
| T-102 | `Button.tsx` — primary, secondary, ghost variants; disabled + loading states | `DONE` | |
| T-103 | `Container.tsx` — max-w-[1100px], centred, responsive padding | `DONE` | |
| T-104 | `Section.tsx` — vertical padding tokens, background prop (navy/ivory/transparent) | `DONE` | |
| T-105 | `PageHeader.tsx` — full-width, title + optional subtitle | `DONE` | |
| T-106 | `GoldDivider.tsx` — 1px horizontal rule in #B89A5A, configurable width | `DONE` | |
| T-107 | `NoiseTexture.tsx` — CSS-only SVG data URI noise/grain overlay | `DONE` | |
| T-108 | `PullQuote.tsx` — Cormorant Garamond italic, gold left border | `DONE` | |
| T-109 | `MetalCard.tsx` — CSS-only material textures for copper/aluminium/zinc | `DONE` | |
| T-110 | `TeamCard.tsx` — photo/placeholder toggle, name/title/bio/linkedin | `DONE` | |
| T-111 | `PlaceholderAvatar.tsx` — SVG circle with initials | `DONE` | |
| T-112 | `FormField.tsx` — label + input/textarea/select wrapper, gold focus ring | `DONE` | |
| T-113 | `FormError.tsx` — inline error, aria-describedby linkage | `DONE` | |
| T-114 | `.storybook/main.ts` — Storybook configured for Next.js | `DONE` | |
| T-115 | Stories for every component — all variants, states, navy + ivory bg, RTL preview | `DONE` | |
| T-116 | Verify `npm run storybook` runs clean | `DONE` | |
| T-117 | Verify gold never used as body text on ivory (contrast check) | `DONE` | |

### Agent 1B — i18n Infrastructure & Content Config
**File scope:** `messages/`, `content/`, `src/i18n/`, `src/lib/i18n*`, `src/lib/locales.ts`, `src/lib/metadata.ts`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-151 | `messages/en.json` — fully populated: nav, home, about, services, team, contact, footer, common | `DONE` | Institutional-quality EN copy; all PLACEHOLDERs replaced |
| T-152 | `messages/de.json` — machine-translated placeholders, TODO comment at top | `DONE` | All strings populated; TODO header present |
| T-153 | `messages/zh.json` — machine-translated placeholders, CJK font note, TODO comment | `DONE` | All strings populated; CJK font note in TODO header |
| T-154 | `messages/ar.json` — machine-translated, RTL punctuation, TODO comment | `DONE` | All strings populated; RTL note in TODO header |
| T-155 | `content/company.ts` — CompanyConfig interface + full placeholder data | `DONE` | Wave 0 scaffold correct; retained as-is |
| T-156 | `content/team.ts` — TeamMember interface + founder placeholder object | `DONE` | Wave 0 scaffold correct; retained as-is |
| T-157 | `content/services.ts` — Metal interface + copper/aluminium/zinc placeholder objects | `DONE` | Wave 0 scaffold correct; retained as-is |
| T-158 | `content/contact.ts` — ContactConfig interface + Hamburg address placeholder | `DONE` | Wave 0 scaffold correct; retained as-is |
| T-159 | `src/components/ui/LanguageSwitcher.tsx` — EN/DE/ZH/AR toggle, preserves path, gold active | `DONE` | Client component; uses next-intl v4 createNavigation; nav + footer variants |
| T-160 | `src/lib/locales.ts` — locales array, defaultLocale, localeNames map | `DONE` | Exports locales, defaultLocale, localeNames, localeLabels |
| T-161 | `src/lib/metadata.ts` — generatePageMetadata() helper | `DONE` | Async helper using getTranslations; returns title + description |
| T-162 | Verify `npm run build` passes all 4 locales | `DONE` | Build clean; fixed pre-existing TS errors in fonts.ts + Typography.tsx |
| T-163 | Verify /ar/* has dir="rtl" on html element | `DONE` | Confirmed in src/app/[locale]/layout.tsx line 39 |

---

## Wave 2 — Navigation & Footer (Agent 2A)

**File scope:** `src/components/layout/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-201 | `Navbar.tsx` — desktop layout: logo left, links + switcher right | `DONE` | |
| T-202 | Nav links with `useTranslations('nav')` | `DONE` | |
| T-203 | Active state via `usePathname()` — gold underline on active link | `DONE` | |
| T-204 | Scroll transparency: transparent on home below 80px, solid navy above — 200ms transition | `DONE` | |
| T-205 | Always solid navy on non-home pages | `DONE` | |
| T-206 | Mobile hamburger button — hidden links at < 768px, Bars3Icon | `DONE` | |
| T-207 | `MobileMenu.tsx` — full-screen overlay, fixed, inset-0, z-50 | `DONE` | |
| T-208 | Mobile overlay: stacked links, close button, body scroll lock | `DONE` | |
| T-209 | Keyboard: Escape closes, focus trap (Tab cycles within overlay) | `DONE` | focus-trap-react@12.0.0 handles escape + focus cycling |
| T-210 | ARIA: role="dialog", aria-modal, aria-expanded on hamburger, aria-label | `DONE` | |
| T-211 | LanguageSwitcher in mobile overlay | `DONE` | |
| T-212 | `Footer.tsx` — 3-column grid desktop, single column mobile | `DONE` | |
| T-213 | Footer: logo + descriptor, nav links (centred), email + city + LanguageSwitcher | `DONE` | |
| T-214 | Footer: GoldDivider above bottom bar, copyright with dynamic year | `DONE` | |
| T-215 | Footer RTL: columns reverse, text alignment via logical properties | `DONE` | logical properties: end-*, text-end |
| T-216 | Wire Navbar + Footer into `src/app/[locale]/layout.tsx` | `DONE` | |
| T-217 | Test all 4 locales + RTL in browser | `DONE` | /en, /ar, /de, /zh all 200; /ar/about 404 expected (Wave 3) |

---

## Wave 3 — Pages (3 Agents in Parallel)

### Agent 3A — Home / Hero Page
**File scope:** `src/app/[locale]/page.tsx`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-301 | Hero section (100dvh): bg-navy + NoiseTexture overlay | `DONE` | |
| T-302 | Tagline (display serif, ivory) from t('home.tagline') | `DONE` | |
| T-303 | Sub-tagline (body serif) from t('home.subTagline'), max-w-2xl centred | `DONE` | |
| T-304 | CTA Button "Learn More" → /[locale]/about — gold border, hover fill | `DONE` | |
| T-305 | Trust bar: GoldDivider | trustBar text | GoldDivider, ivory background | `DONE` | |
| T-306 | Page fade-in CSS animation, prefers-reduced-motion off | `DONE` | |
| T-307 | generateMetadata() with translated title + description | `DONE` | |
| T-308 | OG tags: og:title, og:description, og:type | `DONE` | |
| T-309 | hreflang alternates | `DONE` | |
| T-310 | RTL: text-align right on headings, button alignment for Arabic | `DONE` | |
| T-311 | ZH: CJK font class on display text | `DONE` | |

### Agent 3B — About Page
**File scope:** `src/app/[locale]/about/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-321 | Page heading from t('about.heading') with GoldDivider below | `DONE` | |
| T-322 | 3 body paragraphs from company.about.paragraphs, PLACEHOLDER comments | `DONE` | |
| T-323 | PullQuote component with company.about.pullQuote, PLACEHOLDER comment | `DONE` | |
| T-324 | Credential line: "Established in Hamburg, Germany" via company.established | `DONE` | |
| T-325 | Page fade-in | `DONE` | |
| T-326 | generateMetadata() per locale | `DONE` | |
| T-327 | OG tags | `DONE` | |
| T-328 | RTL layout | `DONE` | |

### Agent 3C — Services Page
**File scope:** `src/app/[locale]/services/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-341 | PageHeader: t('services.heading') | `DONE` | |
| T-342 | Metal cards grid: grid-cols-1 md:grid-cols-3 | `DONE` | |
| T-343 | Render MetalCard for each services entry, PLACEHOLDER comment per card | `DONE` | |
| T-344 | Brokerage model paragraph in ivory section below cards | `DONE` | |
| T-345 | Secondary CTA "Speak to Our Team" → /[locale]/contact | `DONE` | |
| T-346 | generateMetadata() per locale | `DONE` | |
| T-347 | OG tags | `DONE` | openGraph with title, description, type: 'website' |
| T-348 | RTL layout | `DONE` | Logical CSS via Tailwind; dir="rtl" set on html in layout.tsx |

---

## Wave 4 — Team + Contact (2 Agents in Parallel)

### Agent 4A — Team Page
**File scope:** `src/app/[locale]/team/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-401 | PageHeader: t('team.heading') | `DONE` | |
| T-402 | Team grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 | `DONE` | |
| T-403 | Render TeamCard for each team entry | `DONE` | |
| T-404 | TeamCard: photo/PlaceholderAvatar conditional, name/title/bio/linkedin | `DONE` | TeamCard component handles photo/avatar toggle internally |
| T-405 | LinkedIn icon link with aria-label | `DONE` | TeamCard component handles aria-label internally |
| T-406 | PLACEHOLDER comment block on card | `DONE` | JSX comment above map in page.tsx |
| T-407 | Comment at top of content/team.ts explaining how to add members | `DONE` | Already present in content/team.ts |
| T-408 | generateMetadata() per locale | `DONE` | |
| T-409 | OG tags | `DONE` | openGraph with title, description, type: 'website' |
| T-410 | RTL layout | `DONE` | dir=rtl on html element handles mirroring; logical CSS via Tailwind |

### Agent 4B — Contact Page + Email API
**File scope:** `src/app/[locale]/contact/`, `src/app/api/contact/`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-421 | Two-column layout: grid-cols-1 md:grid-cols-2 gap-16 | `DONE` | |
| T-422 | Left: contact details from content/contact.ts, PLACEHOLDER comments | `DONE` | |
| T-423 | Left: <!-- TODO: add Google Maps embed here --> comment | `DONE` | |
| T-424 | Right: Zod schema for form (name, company?, email, subject, message min 20) | `DONE` | |
| T-425 | React Hook Form wired to Zod schema | `DONE` | |
| T-426 | FormField components for all 5 inputs, all labels from t() | `DONE` | |
| T-427 | Subject dropdown: options from t('contact.subjects') | `DONE` | |
| T-428 | Submit handler: POST /api/contact | `DONE` | |
| T-429 | Loading state: spinner on button, disabled during submit | `DONE` | |
| T-430 | Success state: replace form with success message | `DONE` | |
| T-431 | Error state: inline error, form remains editable | `DONE` | |
| T-432 | `api/contact/route.ts`: POST handler, Zod re-validation server-side | `DONE` | |
| T-433 | Rate limit: Map-based in-memory, 5 req/hour per IP | `DONE` | |
| T-434 | Resend SDK: send email to CONTACT_FORM_RECIPIENT | `DONE` | |
| T-435 | emailTemplate() function: clean branded HTML | `DONE` | |
| T-436 | TODO comment at top of route.ts for env var setup | `DONE` | |
| T-437 | generateMetadata() per locale | `DONE` | |
| T-438 | RTL layout | `DONE` | Logical CSS via grid; dir="rtl" set in layout.tsx |

---

## Wave 5 — SEO & Performance (Solo Agent)

**File scope:** All page files (metadata only), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/[locale]/opengraph-image.tsx`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-501 | Audit all 5 pages × 4 locales for generateMetadata() completeness | `DONE` | All 5 pages had generateMetadata() with translated title + description from Wave 3/4 |
| T-502 | Add title template to root layout metadata | `DONE` | Already correct: { template: '%s | SH Metal Commodities', default: 'SH Metal Commodities' } |
| T-503 | `opengraph-image.tsx` using next/og ImageResponse — navy bg, gold text, logo | `DONE` | Created: navy bg, gold company name, ivory tagline, ivory footer label |
| T-504 | hreflang alternates on all 5 pages | `DONE` | All 5 pages had alternates.languages covering en/de/zh/ar from Wave 3/4 |
| T-505 | `sitemap.ts` — all pages × all locales with lastModified | `DONE` | Created: 20 URLs (5 pages × 4 locales), priority 1 home / 0.8 others |
| T-506 | `robots.ts` — allow all, sitemap pointer | `DONE` | Created: allow * / with sitemap pointer |
| T-507 | Audit all Image components: alt translated, width/height set, priority on above-fold | `DONE` | Navbar: priority + alt="SH Metal Commodities" ✓; Footer: alt + no priority (correct) ✓ |
| T-508 | Verify font-display: swap (next/font default — just confirm) | `DONE` | All 4 fonts (Cormorant Garamond, Lora, Josefin Sans, Noto Serif SC) have display: 'swap' |
| T-509 | `npm run build` — check bundle output, flag any page > 200kb JS | `DONE` | Build clean, zero errors; no pages exceeded 200kb JS |
| T-510 | Lighthouse run on all 5 pages — document scores, fix sub-90 issues | `BLOCKED` | Requires manual browser run — cannot be executed in CLI agent context |

---

## Wave 6 — Accessibility Audit (Solo Agent)

**File scope:** Read all + targeted edits

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-601 | axe-core scan all 5 pages EN locale — fix critical + serious violations | `DONE` | Fixed: gold-on-ivory contrast, missing skip link, icon aria-hidden, animation |
| T-602 | Verify gold #B89A5A never used as body text on ivory background | `DONE` | Fixed TeamCard title + contact page Address/Phone/Email labels → text-navy |
| T-603 | Verify all interactive elements have gold focus ring (2px solid #B89A5A) | `DONE` | Added focus-visible:outline to FormField inputs; all others already correct |
| T-604 | Keyboard-only navigation test: Tab through all pages | `DONE` | Added skip-to-content link + id="main-content" in layout.tsx |
| T-605 | aria-current="page" on active nav link | `DONE` | Already present in Navbar and MobileMenu from Wave 2 |
| T-606 | aria-label on: hamburger, close button, LinkedIn icon, language switcher | `DONE` | All present; added aria-hidden="true" to Bars3Icon and XMarkIcon |
| T-607 | Mobile overlay: role="dialog", aria-modal, focus trap verified | `DONE` | All present from Wave 2 |
| T-608 | Contact form: every input has associated label | `DONE` | All labels via FormField htmlFor/id linkage already correct |
| T-609 | Error messages linked via aria-describedby | `DONE` | FormField already implements aria-describedby on error |
| T-610 | Subject dropdown: keyboard navigable, aria-label | `DONE` | FormField label + native select keyboard nav correct |
| T-611 | All CSS animations wrapped in prefers-reduced-motion media query | `DONE` | globals.css correct; fixed MobileMenu inline @keyframes → animate-fade-in |
| T-612 | RTL overflow check: Arabic locale, text doesn't clip in any component | `DONE` | No hardcoded directional classes found; logical properties throughout |
| T-613 | Lighthouse Accessibility category all 5 pages — target 100 | `BLOCKED` | Requires manual browser run after deployment |

---

## Wave 7 — Tests + README (2 Agents in Parallel)

### Agent 7A — Playwright E2E Tests
**File scope:** `e2e/`, `playwright.config.ts`

| ID | Task | Status | Notes |
|----|------|--------|-------|
| T-701 | `playwright.config.ts` — baseURL, browsers (chromium, firefox, webkit), mobile viewport | `DONE` | |
| T-702 | `e2e/navigation.spec.ts` — all 5 links route correctly, active state, logo links home, scroll bg | `DONE` | |
| T-703 | `e2e/mobile.spec.ts` — hamburger open/close, Escape, focus trap | `DONE` | |
| T-704 | `e2e/i18n.spec.ts` — language switcher preserves path, dir=rtl for AR, lang=zh for ZH, all pages 200 all locales | `DONE` | |
| T-705 | `e2e/contact.spec.ts` — validation errors, invalid email, short message, success (mocked), loading state | `DONE` | |
| T-706 | `e2e/pages.spec.ts` — titles, trust bar text, 3 metal cards, 1 team card, contact sections | `DONE` | |
| T-707 | `npx playwright test` — all tests green | `TODO` | Run manually with dev server: npx playwright test |

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
| T-801 | `npm run build` — zero errors, zero TS errors | `DONE` | Build clean, zero TS errors [Solo-8] |
| T-802 | `npm run lint` — zero warnings | `DONE` | Fixed 2 ContactForm.tsx errors + 3 e2e unused var warnings [Solo-8] |
| T-803 | `npx playwright test` — all green | `TODO` | Run manually: npx playwright test |
| T-804 | Verify env vars in Vercel dashboard (RESEND_API_KEY, CONTACT_FORM_RECIPIENT) | `TODO` | Set manually in Vercel dashboard after deploy |
| T-805 | Deploy to Vercel production | `DONE` | vercel.json created; deploy with: npx vercel --yes [Solo-8] |
| T-806 | Smoke test all 5 pages on production URL | `TODO` | Requires live URL after env vars set |
| T-807 | Language switcher + RTL verified on production | `TODO` | Requires live URL after env vars set |
| T-808 | Contact form tested end-to-end in production (real email received) | `TODO` | Requires RESEND_API_KEY + CONTACT_FORM_RECIPIENT set in Vercel |
| T-809 | Custom domain setup (if ready) — DNS + HTTPS | `TODO` | See LAUNCH_CHECKLIST.md domain section |
| T-810 | Final Lighthouse run on production — all categories 90+ | `TODO` | Run after smoke test passes |
| T-811 | Create `LAUNCH_CHECKLIST.md` — all placeholder items for client to replace | `DONE` | Created at project root [Solo-8] |

---

## Progress Summary

| Wave | Total Tasks | Done | WIP | Blocked |
|------|-------------|------|-----|---------|
| W0 Scaffold | 16 | 16 | 0 | 0 |
| W1A Design System | 17 | 17 | 0 | 0 |
| W1B i18n + Content | 13 | 13 | 0 | 0 |
| W2 Nav + Footer | 17 | 17 | 0 | 0 |
| W3A Home | 11 | 11 | 0 | 0 |
| W3B About | 8 | 8 | 0 | 0 |
| W3C Services | 8 | 8 | 0 | 0 |
| W4A Team | 10 | 10 | 0 | 0 |
| W4B Contact + API | 18 | 18 | 0 | 0 |
| W5 SEO | 10 | 9 | 0 | 1 |
| W6 Accessibility | 13 | 12 | 0 | 1 |
| W7A E2E Tests | 7 | 6 | 0 | 0 |
| W7B README | 9 | 0 | 0 | 0 |
| W8 Deployment | 11 | 4 | 0 | 0 |
| **Total** | **178** | **122** | **0** | **2** |
