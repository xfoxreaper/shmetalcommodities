# SH Metal Commodities — Sprint Plan
**Version:** 1.0 | **Last updated:** 2026-03-28 | **Status:** Ready to execute

> This document is the authoritative sprint plan. For live task status, see [TASKS.md](TASKS.md).

---

## Locked Architectural Decisions

| Decision | Choice |
|----------|--------|
| Framework | Next.js 14+ App Router, TypeScript |
| Styling | Tailwind CSS, custom theme tokens |
| i18n | `next-intl`, prefix-all locale URLs (`/en`, `/de`, `/zh`, `/ar`) |
| Content | TypeScript modules in `/content/` — no CMS |
| Email | Resend API, Next.js Route Handler at `/api/contact` |
| Contact auto-reply | No |
| Receiving email | `CONTACT_FORM_RECIPIENT` in `.env` |
| Rendering | SSG pages + serverless API route |
| RTL | Tailwind logical properties (`ms-`, `me-`, `ps-`) + `rtl:` variants |
| Arabic numerals | Western (1, 2, 3) |
| Testing | Playwright comprehensive E2E |
| Storybook | Yes |
| Deployment | Vercel |
| Logo | `Adobe Express - file.png` — transparent PNG, safe on both navy and ivory backgrounds |

---

## Wave Execution Plan

Agents within the same wave work in **parallel** without file collisions. Each wave waits for the previous to complete.

```
Wave 0 ──── Solo agent ──── Project scaffold (S0)
              │
Wave 1 ──┬── Agent 1A ───── Design system + Storybook (S1)
         └── Agent 1B ───── i18n infrastructure + content config schemas (S2)
              │
Wave 2 ──┬── Agent 2A ───── Navigation + Footer (S3)
         └── (1B continues if needed, else idle)
              │
Wave 3 ──┬── Agent 3A ───── Home / Hero page (S4)
         ├── Agent 3B ───── About page (S5)
         └── Agent 3C ───── Services page (S6)
              │
Wave 4 ──┬── Agent 4A ───── Team page (S7)
         └── Agent 4B ───── Contact page + Resend API (S8)
              │
Wave 5 ──── Solo agent ──── SEO, metadata, OG, sitemap (S9)
              │
Wave 6 ──── Solo agent ──── Accessibility audit (S10)
              │
Wave 7 ──┬── Agent 7A ───── Playwright E2E tests (S11)
         └── Agent 7B ───── README (documentation-writer skill) (S12a)
              │
Wave 8 ──── Solo agent ──── Deployment + launch checklist (S12b)
```

---

## File Ownership Map (Collision Prevention)

| Agent Slot | Owns |
|------------|------|
| Solo-0 | `/` root, `package.json`, `tailwind.config.ts`, `next.config.ts`, `.env*`, `src/app/layout.tsx`, `src/middleware.ts`, `src/i18n.ts` |
| 1A Design | `src/components/ui/`, `src/components/primitives/`, `.storybook/`, `src/styles/` |
| 1B i18n | `messages/`, `content/`, `src/i18n/`, `src/lib/i18n*` |
| 2A Layout | `src/components/layout/` (Navbar, Footer, LanguageSwitcher) |
| 3A Home | `src/app/[locale]/page.tsx` |
| 3B About | `src/app/[locale]/about/` |
| 3C Services | `src/app/[locale]/services/` |
| 4A Team | `src/app/[locale]/team/` |
| 4B Contact | `src/app/[locale]/contact/`, `src/app/api/contact/` |
| Solo-5 SEO | Adds `generateMetadata()` to all page files; `src/app/sitemap.ts`, `src/app/robots.ts` |
| Solo-6 a11y | Read-only audit + targeted edits across all components |
| 7A Tests | `e2e/`, `playwright.config.ts` |
| 7B Docs | `README.md` |
| Solo-8 Deploy | `vercel.json`, env var verification, deployment commands |

---

## Sprint Definitions

---

### Sprint 0 — Scaffold & Environment
**Wave:** 0 | **Agent:** Solo-0 | **Skills:** `nextjs-app-router-patterns`, `vercel-react-best-practices`

**Goal:** A running Next.js project with all tooling configured. No UI yet. Every subsequent agent can start immediately after this.

**Tasks:**
- [ ] `npx create-next-app@latest` — TypeScript, ESLint, Tailwind, App Router, `src/` dir, no `--use-npm` flag (use default)
- [ ] Extend `tailwind.config.ts`:
  - Colours: `navy: '#0A1628'`, `ivory: '#F5F0E8'`, `gold: '#B89A5A'`, `warmWhite: '#FAF8F4'`, `charcoal: '#1C1C1C'`
  - Font families: `display: ['Cormorant Garamond', 'serif']`, `body: ['Lora', 'serif']`, `ui: ['Josefin Sans', 'sans-serif']`, `cjk: ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif']`
  - Enable `rtl` variant: add `plugins: [require('tailwindcss-rtl')]` or use built-in `[dir='rtl']` selector strategy
  - Custom spacing scale additions for generous vertical rhythm
- [ ] Configure `next/font/google` in `src/app/fonts.ts`: export `displayFont`, `bodyFont`, `uiFont`, `cjkFont`
- [ ] Install dependencies: `next-intl`, `resend`, `react-hook-form`, `@hookform/resolvers`, `zod`, `@heroicons/react`
- [ ] Install dev dependencies: `@storybook/nextjs`, `@playwright/test`, `axe-core`
- [ ] Configure `next-intl`:
  - `src/middleware.ts` — locale detection, redirect `/` → `/en`
  - `src/i18n.ts` — routing config with locales `['en', 'de', 'zh', 'ar']`
  - `next.config.ts` — wrap with `withNextIntl` plugin
- [ ] Create `/src/app/[locale]/layout.tsx` — root layout with `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`
- [ ] Create directory structure:
  ```
  src/
    app/[locale]/
      about/
      services/
      team/
      contact/
    components/
      ui/
      layout/
      primitives/
    lib/
    i18n/
  content/
  messages/
    en.json  de.json  zh.json  ar.json
  e2e/
  public/
    images/
  .storybook/
  ```
- [ ] Copy `Adobe Express - file.png` into `public/images/logo.png`
- [ ] Create `.env.local`:
  ```
  RESEND_API_KEY=re_placeholder_replace_with_real_key
  CONTACT_FORM_RECIPIENT=info@shmetalcommodities.com
  ```
- [ ] Create `.env.example` (same keys, empty values — commit this)
- [ ] Add `.env.local` to `.gitignore`
- [ ] Create empty `content/company.ts`, `content/team.ts`, `content/services.ts`, `content/contact.ts` with TypeScript interface stubs
- [ ] Create empty `messages/en.json`, `de.json`, `zh.json`, `ar.json` with top-level keys: `nav`, `home`, `about`, `services`, `team`, `contact`, `footer`, `common`
- [ ] ESLint + Prettier config
- [ ] Verify: `npm run dev` runs on `localhost:3000`, `/en` resolves (even if blank), no TypeScript errors
- [ ] Git init, initial commit: `chore: scaffold Next.js project`

---

### Sprint 1 — Design System & Primitive Components
**Wave:** 1 | **Agent:** 1A | **Skills:** `frontend-design`, `web-design-guidelines`
**Depends on:** Sprint 0 complete

**Goal:** Every reusable UI primitive exists before any page is built. Storybook documents them all.

**Components to build** (all in `src/components/ui/`):

**Typography:**
- [ ] `Typography.tsx` — variants: `display` (Cormorant Garamond, 72–96px, tracked), `h1`, `h2`, `h3` (Cormorant Garamond scaled), `body` (Lora 16–18px), `label` (Josefin Sans 11–12px uppercase tracked), `pullquote` (Cormorant Garamond italic, large, gold left border)
- [ ] CJK variant: when locale is `zh`, `display` and `h1-h3` switch to Noto Serif SC — accept `locale` prop or detect via context

**Buttons:**
- [ ] `Button.tsx` — variants: `primary` (gold border `#B89A5A`, ivory text `#FAF8F4`, navy bg; hover: gold bg fill, navy text, 200ms), `secondary` (navy bg, ivory text; hover darken), `ghost` (transparent, gold border; hover fill)
- [ ] All variants: `disabled` state, `loading` state (spinner), keyboard focusable with gold outline

**Layout:**
- [ ] `Container.tsx` — `max-w-[1100px]`, `mx-auto`, responsive horizontal padding (`px-6 md:px-12`)
- [ ] `Section.tsx` — consistent vertical padding tokens, accepts `background` prop (`navy` | `ivory` | `transparent`)
- [ ] `PageHeader.tsx` — full-width section, page title + optional subtitle, correct typography variant

**Decorative:**
- [ ] `GoldDivider.tsx` — thin `1px` horizontal rule in `#B89A5A`, configurable `width` prop, optional left/right margin
- [ ] `NoiseTexture.tsx` — CSS-only overlay component using SVG data URI for linen/noise grain effect on navy backgrounds
- [ ] `PullQuote.tsx` — large Cormorant Garamond italic, gold left border `3px solid #B89A5A`, generous padding

**Cards:**
- [ ] `MetalCard.tsx` — accepts `name`, `description`, `texture` prop (`copper` | `aluminium` | `zinc`); CSS-only material textures:
  - copper: `hsl(15, 40%, 30%)` tinted noise overlay
  - aluminium: `hsl(210, 10%, 35%)` tinted noise overlay
  - zinc: `hsl(220, 15%, 30%)` tinted noise overlay
- [ ] `TeamCard.tsx` — accepts `name`, `title`, `bio`, `photoUrl?`, `initials`, `linkedIn?`; renders `PlaceholderAvatar` when `photoUrl` is null
- [ ] `PlaceholderAvatar.tsx` — SVG circle, `#4A5568` fill, white initials, configurable `size` prop

**Form:**
- [ ] `FormField.tsx` — wraps `<label>` + `<input>` / `<textarea>` / `<select>` with consistent styling (Josefin Sans labels, Lora input text, gold focus ring)
- [ ] `FormError.tsx` — inline error message component, linked via `aria-describedby`

**Storybook:**
- [ ] `.storybook/main.ts` configured for Next.js
- [ ] Story file for every component above
- [ ] Stories cover: all variants, all states (default, hover, focus, disabled, loading), both navy and ivory backgrounds, RTL layout preview

**Acceptance criteria:**
- `npm run storybook` runs without errors
- All components render correctly on `#0A1628` and `#F5F0E8` backgrounds
- Gold `#B89A5A` is never used as body text colour — only borders, decorative elements, headings on navy
- All interactive elements have visible gold focus rings
- `rtl:` variants verified on Button icon placement

---

### Sprint 2 — i18n Infrastructure & Content Config
**Wave:** 1 | **Agent:** 1B | **Skills:** `nextjs-app-router-patterns`
**Depends on:** Sprint 0 complete
**Runs in parallel with:** Sprint 1 (no file collision)

**Goal:** All locale files populated, content config schemas typed and filled with placeholder content, language switcher component built.

**Locale files** (`messages/`):

- [ ] `en.json` — fully populated with all real English strings for every page. Structure:
  ```json
  {
    "nav": { "home": "Home", "about": "About", "services": "Services", "team": "Team", "contact": "Contact" },
    "home": { "tagline": "Metal. Markets. Trust.", "subTagline": "...", "cta": "Learn More", "trustBar": "Headquartered in Hamburg, Germany" },
    "about": { "heading": "A Trading House Built on Relationships", "para1": "...", "para2": "...", "para3": "...", "pullQuote": "We trade with our name on every deal.", "credential": "Established in Hamburg, Germany" },
    "services": { "heading": "Our Markets", "copper": { "name": "Copper", "description": "..." }, "aluminium": {...}, "zinc": {...}, "brokerageModel": "...", "cta": "Speak to Our Team" },
    "team": { "heading": "The People Behind SH Metal Commodities" },
    "contact": { "heading": "Get in Touch", "formLabels": {...}, "subjects": [...], "submit": "Send Enquiry", "successMessage": "...", "errorMessage": "..." },
    "footer": { "descriptor": "Global Non-Ferrous Metal Trading", "copyright": "© {year} SH Metal Commodities. All rights reserved." },
    "common": { "loading": "...", "backToTop": "Back to top" }
  }
  ```
- [ ] `de.json` — machine-translated placeholder for all keys. Add `"// TODO": "professional translation needed"` at top level
- [ ] `zh.json` — machine-translated, add `"// TODO": "professional translation needed"`, note CJK font requirement at top
- [ ] `ar.json` — machine-translated, add `"// TODO": "professional translation needed"`, RTL-appropriate punctuation

**Content config files** (`content/`):

- [ ] `content/company.ts` — TypeScript module:
  ```ts
  export interface CompanyConfig { established: {...}; about: { paragraphs: string[]; pullQuote: string }; tagline: string }
  export const company: CompanyConfig = { established: { city: 'Hamburg', country: 'Germany', year: '1873' }, about: { paragraphs: ['<!-- PLACEHOLDER -->', ...], pullQuote: '<!-- PLACEHOLDER -->' }, tagline: 'Metal. Markets. Trust.' }
  ```
- [ ] `content/team.ts` — array of `TeamMember` objects:
  ```ts
  export interface TeamMember { id: string; initials: string; name: string; title: string; bio: string; photoUrl: string | null; linkedIn: string | null }
  export const team: TeamMember[] = [{ id: 'founder', initials: 'SH', name: '<!-- PLACEHOLDER: Founder Full Name -->', title: '<!-- PLACEHOLDER: Managing Director -->', bio: '<!-- PLACEHOLDER: 3-4 sentence bio -->', photoUrl: null, linkedIn: null }]
  ```
- [ ] `content/services.ts` — array of `Metal` objects with id, name, description, texture enum
- [ ] `content/contact.ts`:
  ```ts
  export const contact = { address: { street: '<!-- PLACEHOLDER -->', city: 'Hamburg', country: 'Germany', postcode: '<!-- PLACEHOLDER -->' }, phone: '<!-- PLACEHOLDER: +49 XXX XXX XXXX -->', email: '<!-- PLACEHOLDER: info@shmetalcommodities.com -->' }
  ```

**Language Switcher component** (`src/components/ui/LanguageSwitcher.tsx`):
- [ ] Renders text toggle `EN / DE / ZH / AR` (desktop) and full names in mobile overlay
- [ ] On click: navigates to same path with new locale prefix (uses `useRouter` + `usePathname` from next-intl)
- [ ] Active locale highlighted in gold
- [ ] `aria-label="Select language"`, keyboard navigable
- [ ] Works in both Navbar and Footer contexts (accept `variant: 'nav' | 'footer'` prop)

**i18n utilities** (`src/lib/`):
- [ ] `src/lib/locales.ts` — exports `locales`, `defaultLocale`, `localeNames` map (`{ en: 'English', de: 'Deutsch', zh: '中文', ar: 'العربية' }`)
- [ ] `src/lib/metadata.ts` — helper `generatePageMetadata(locale, page)` returns translated `title` + `description`

**Acceptance criteria:**
- `npm run build` passes with all 4 locales generating static pages
- `/ar/*` routes have `dir="rtl"` on `<html>`
- Language switcher navigates correctly and preserves path
- All content config files importable with no TypeScript errors

---

### Sprint 3 — Navigation & Footer
**Wave:** 2 | **Agent:** 2A | **Skills:** `frontend-design`
**Depends on:** Sprint 1 (UI primitives), Sprint 2 (i18n + LanguageSwitcher)

**Goal:** Persistent shell components that appear on all pages. Nav handles scroll transparency and mobile overlay.

**Navbar** (`src/components/layout/Navbar.tsx`):
- [ ] Logo: `<Image>` with `public/images/logo.png`, `alt="SH Metal Commodities"`, `width={56} height={56}`
- [ ] Desktop layout: `flex justify-between items-center`, logo left, links + language switcher right
- [ ] Nav links: `Home · About · Services · Team · Contact` — all translated via `useTranslations('nav')`
- [ ] Active state: `usePathname()` comparison, active link gets `border-b border-gold text-gold` or colour change
- [ ] Scroll behaviour (Home page only): `useEffect` with scroll listener; at `scrollY > 80px` add class `bg-navy shadow-md`; below 80px: `bg-transparent` — 200ms CSS transition on `background-color`
- [ ] Non-home pages: always `bg-navy`
- [ ] Determine home vs. non-home: check `pathname === '/${locale}'`
- [ ] Mobile (`< 768px`): hide link list, show hamburger button (`Bars3Icon` from Heroicons)
- [ ] Hamburger state: `useState(isOpen)`, toggle on click
- [ ] Mobile overlay (`src/components/layout/MobileMenu.tsx`):
  - Full-screen, `position: fixed`, `inset-0`, `bg-navy z-50`
  - Links stacked, large, Cormorant Garamond
  - Close button top-right (`XMarkIcon`)
  - Body scroll lock when open (`useEffect` sets `document.body.style.overflow = 'hidden'`)
  - Keyboard: `Escape` closes, focus trap (Tab cycles within overlay)
  - `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
  - `aria-expanded` on hamburger button
  - Fade in 150ms
  - Language switcher included at bottom of overlay

**Footer** (`src/components/layout/Footer.tsx`):
- [ ] Background `bg-navy`, `text-warmWhite`
- [ ] 3-column grid desktop: `grid grid-cols-3 gap-8`; single column mobile: `grid-cols-1`
- [ ] Column 1: logo + `<Typography variant="label">{t('footer.descriptor')}</Typography>`
- [ ] Column 2: nav links (same as header, centred)
- [ ] Column 3: email + "Hamburg, Germany" + LanguageSwitcher
- [ ] `GoldDivider` above bottom bar
- [ ] Bottom bar: copyright with `{new Date().getFullYear()}`
- [ ] All strings from `useTranslations('footer')` and `useTranslations('nav')`
- [ ] RTL: columns reverse, text alignment flips via logical properties

**Root layout wiring** (`src/app/[locale]/layout.tsx`):
- [ ] Import and render `<Navbar />` and `<Footer />` wrapping `{children}`
- [ ] Apply font CSS variables from `src/app/fonts.ts`
- [ ] Apply CJK font class when `locale === 'zh'`

**Acceptance criteria:**
- Navbar transparent on `/en` (Home), solid on `/en/about`
- Active link highlighted on all 5 routes
- Mobile overlay opens, closes via button and Escape key
- Focus trap works in overlay (Tab does not leave overlay)
- Footer renders correctly in all 4 locales
- RTL: Arabic locale mirrors layout correctly

---

### Sprint 4 — Home / Hero Page
**Wave:** 3 | **Agent:** 3A | **Skills:** `frontend-design`
**Depends on:** Sprint 3 complete (Navbar/Footer), Sprint 1 (primitives), Sprint 2 (i18n)

**File:** `src/app/[locale]/page.tsx`

**Tasks:**
- [ ] Hero section (`100dvh`):
  - Background: `bg-navy` + `<NoiseTexture />` overlay
  - Content: `<Container>` centred, vertically centred via `flex items-center justify-center`
  - `<Typography variant="display">` for tagline from `t('home.tagline')` — large, tracked, ivory
  - `<Typography variant="body">` for sub-tagline from `t('home.subTagline')` — max-w-2xl, centred
  - `<Button variant="primary">` "Learn More" → `/[locale]/about`
  - CTA border: gold, text: ivory; hover: gold fill
- [ ] Trust bar (below hero fold):
  - `<Section background="ivory">` with minimal padding
  - `<GoldDivider />` | `<Typography variant="label">{t('home.trustBar')}</Typography>` | `<GoldDivider />`
  - Layout: `flex items-center gap-6 justify-center`
- [ ] Page fade-in: CSS `@keyframes fadeIn` with `opacity: 0 → 1`, 400ms, `prefers-reduced-motion` disabled
- [ ] `generateMetadata()` returning `t('home.meta.title')` + `t('home.meta.description')` per locale
- [ ] OG tags: `og:title`, `og:description`, `og:type: 'website'`
- [ ] Hreflang alternates via `alternates.languages` in metadata
- [ ] RTL: Arabic — `text-align: right` on headings, button alignment
- [ ] ZH: CJK font class on display text

---

### Sprint 5 — About Page
**Wave:** 3 | **Agent:** 3B | **Skills:** `frontend-design`
**Depends on:** Sprint 3, Sprint 1, Sprint 2
**Runs in parallel with:** Sprint 4, Sprint 6

**File:** `src/app/[locale]/about/page.tsx`

**Tasks:**
- [ ] Import `company` from `content/company.ts`
- [ ] `<Section background="ivory">`:
  - `<Typography variant="h1">{t('about.heading')}</Typography>` — Cormorant Garamond
  - `<GoldDivider />` below heading
  - 3 body paragraphs: `{company.about.paragraphs.map(p => <Typography variant="body">{p}</Typography>)}`
  - `{/* PLACEHOLDER: paragraph content */}` JSX comment above each paragraph
- [ ] `<PullQuote>`: `{company.about.pullQuote}` — `{/* PLACEHOLDER */}`
- [ ] Credential line: `<Typography variant="label">"Established in {company.established.city}, {company.established.country}"</Typography>`
- [ ] `generateMetadata()` per locale
- [ ] OG tags
- [ ] Page fade-in (reuse same CSS animation as Home)
- [ ] All i18n'd; body paragraphs come from `content/company.ts` (not locale files — these are long-form content, not UI strings)

---

### Sprint 6 — Services Page
**Wave:** 3 | **Agent:** 3C | **Skills:** `frontend-design`
**Depends on:** Sprint 3, Sprint 1, Sprint 2
**Runs in parallel with:** Sprint 4, Sprint 5

**File:** `src/app/[locale]/services/page.tsx`

**Tasks:**
- [ ] Import `services` from `content/services.ts`
- [ ] `<PageHeader>`: `{t('services.heading')}` ("Our Markets")
- [ ] Metal cards grid: `grid grid-cols-1 md:grid-cols-3 gap-8`
- [ ] `{services.map(metal => <MetalCard key={metal.id} {...metal} />)}`
- [ ] `MetalCard` internal: metal name as `<Typography variant="h2">`, body paragraph from `content/services.ts`
- [ ] CSS-only textures per metal type (handled in `MetalCard` component from Sprint 1)
- [ ] `{/* PLACEHOLDER: metal description */}` comment per card
- [ ] Below cards: brokerage model paragraph in `<Section background="ivory">`
- [ ] Secondary CTA: `<Button variant="secondary">` "Speak to Our Team" → `/[locale]/contact`
- [ ] `generateMetadata()` per locale
- [ ] All i18n'd
- [ ] RTL: card grid layout preserved, text alignment flips

---

### Sprint 7 — Team Page
**Wave:** 4 | **Agent:** 4A | **Skills:** `frontend-design`
**Depends on:** Sprint 3, Sprint 1, Sprint 2

**File:** `src/app/[locale]/team/page.tsx`

**Tasks:**
- [ ] Import `team` from `content/team.ts`
- [ ] `<PageHeader>`: `{t('team.heading')}`
- [ ] Team grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10`
- [ ] `{team.map(member => <TeamCard key={member.id} {...member} />)}`
- [ ] `TeamCard` renders:
  - `{member.photoUrl ? <Image src={member.photoUrl} ... /> : <PlaceholderAvatar initials={member.initials} />}`
  - `<Typography variant="h3">{member.name}</Typography>` — `{/* PLACEHOLDER */}`
  - `<Typography variant="label">{member.title}</Typography>` — `{/* PLACEHOLDER */}`
  - `<Typography variant="body">{member.bio}</Typography>` — `{/* PLACEHOLDER */}`
  - `{member.linkedIn && <a href={member.linkedIn} aria-label="LinkedIn profile"><LinkedInIcon /></a>}`
- [ ] LinkedIn icon: inline SVG or Heroicons equivalent
- [ ] `{/* PLACEHOLDER: all personal details */}` JSX comment block on card
- [ ] `generateMetadata()` per locale
- [ ] Adding a new team member = push object to `content/team.ts` array. Document this in a comment at top of file.

---

### Sprint 8 — Contact Page + Resend Email API
**Wave:** 4 | **Agent:** 4B | **Skills:** `frontend-design`, `nextjs-app-router-patterns`
**Depends on:** Sprint 3, Sprint 1, Sprint 2
**Runs in parallel with:** Sprint 7

**Files:** `src/app/[locale]/contact/page.tsx`, `src/app/api/contact/route.ts`

**Page** (`contact/page.tsx`):
- [ ] Import `contact` from `content/contact.ts`
- [ ] Two-column grid: `grid grid-cols-1 md:grid-cols-2 gap-16`
- [ ] Left column — Contact Details:
  - `<Typography variant="h2">{t('contact.heading')}</Typography>`
  - Address block from `contact.address` — `{/* PLACEHOLDER */}` on each field
  - Phone: `contact.phone` — `{/* PLACEHOLDER */}`
  - Email: `contact.email` — `{/* PLACEHOLDER */}`
  - `{/* TODO: add Google Maps embed here */}` comment
- [ ] Right column — Contact Form (client component `"use client"`):
  - React Hook Form + Zod schema:
    ```ts
    const schema = z.object({ name: z.string().min(2), company: z.string().optional(), email: z.string().email(), subject: z.enum(['general', 'trading', 'partnership', 'other']), message: z.string().min(20) })
    ```
  - `<FormField>` for each input, all labels from `t('contact.formLabels.*')`
  - Subject dropdown options from `t('contact.subjects')` array
  - Submit handler: `POST /api/contact` with form data
  - Loading state: button shows spinner, disabled during submit
  - Success state: replace form with `<Typography>{t('contact.successMessage')}</Typography>` — no page redirect
  - Error state: inline error message `t('contact.errorMessage')`, form remains editable
  - All validation errors shown inline via `<FormError>`

**API Route** (`src/app/api/contact/route.ts`):
- [ ] `export async function POST(req: Request)`
- [ ] Parse + validate body against same Zod schema (server-side re-validation)
- [ ] On invalid: return `Response.json({ error: 'Invalid request' }, { status: 400 })`
- [ ] Simple rate limit: check `X-Forwarded-For` or IP, max 5 requests/hour stored in a module-level `Map` (simple in-memory, resets on cold start — adequate for this traffic level)
- [ ] Resend SDK:
  ```ts
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'SH Metal Commodities <contact@shmetalcommodities.com>',
    to: process.env.CONTACT_FORM_RECIPIENT!,
    subject: `New enquiry: ${data.subject} from ${data.name}`,
    html: emailTemplate(data)
  })
  ```
- [ ] `emailTemplate(data)` function: clean HTML email, branded navy header, all fields listed, no images (email client compatibility)
- [ ] Return `Response.json({ success: true })` on success
- [ ] `{/* TODO: wire RESEND_API_KEY in .env.local and Vercel dashboard */}` comment at top of file

**Acceptance criteria:**
- Form submits and email is received at `CONTACT_FORM_RECIPIENT`
- Validation errors display correctly in all 4 locales
- Loading state prevents double-submit
- Success message replaces form

---

### Sprint 9 — SEO, Metadata & Performance
**Wave:** 5 | **Agent:** Solo-5 | **Skills:** `vercel-react-best-practices`
**Depends on:** All page sprints (4–8) complete

**Tasks:**
- [ ] Audit all 5 pages: ensure `generateMetadata()` returns unique `title` and `description` in all 4 locales
- [ ] Add `title` template: `{ template: '%s | SH Metal Commodities', default: 'SH Metal Commodities' }`
- [ ] OG image: create `src/app/[locale]/opengraph-image.tsx` using `next/og` `ImageResponse` — navy background, gold text, logo, tagline
- [ ] `hreflang` alternates: `alternates: { languages: { en: '/en/...', de: '/de/...', zh: '/zh/...', ar: '/ar/...' } }` on all pages
- [ ] `src/app/sitemap.ts` — export `sitemap()` returning all pages × all locales with `lastModified`
- [ ] `src/app/robots.ts` — export `robots()` allowing all, pointing to sitemap
- [ ] Audit all `<Image>` components: `alt` attributes translated, `width`/`height` set, `priority` on above-fold images
- [ ] Verify no layout shift: font loading uses `font-display: swap` (next/font default)
- [ ] `npm run build` — check bundle output, no page exceeds 200kb JS
- [ ] Run Lighthouse on all 5 pages in dev mode, document scores, fix any sub-90 issues

---

### Sprint 10 — Accessibility Audit
**Wave:** 6 | **Agent:** Solo-6 | **Skills:** `web-design-guidelines`
**Depends on:** Sprint 9 complete

**Tasks:**
- [ ] Run `axe-core` on all 5 pages × EN locale — fix all `critical` and `serious` violations
- [ ] Verify gold `#B89A5A` is **never** used as body text on ivory background — only as decorative (borders, headings on navy, active underlines)
- [ ] Verify all interactive elements have gold focus ring (`outline: 2px solid #B89A5A; outline-offset: 2px`)
- [ ] Keyboard-only navigation: Tab through entire site without mouse, every interactive element reachable
- [ ] `aria-current="page"` on active nav link
- [ ] `aria-label` on: hamburger button, close button, LinkedIn icon, language switcher
- [ ] `role="dialog"` + `aria-modal` + focus trap on mobile overlay
- [ ] Contact form: every `<input>`, `<textarea>`, `<select>` has associated `<label>` (not placeholder as label)
- [ ] Error messages linked via `aria-describedby` on their input
- [ ] `<select>` subject dropdown: keyboard navigable, `aria-label`
- [ ] `prefers-reduced-motion`: wrap all CSS `@keyframes` animations in `@media (prefers-reduced-motion: no-preference)`
- [ ] RTL accessibility: Arabic locale — verify text doesn't overflow or clip in any component
- [ ] Run Lighthouse Accessibility category on all 5 pages — target 100

---

### Sprint 11 — Playwright E2E Tests
**Wave:** 7 | **Agent:** 7A | **Skills:** `e2e-testing-patterns`, `webapp-testing`
**Depends on:** Sprint 10 complete

**Files:** `e2e/`, `playwright.config.ts`

**Test suites:**

**Navigation (`e2e/navigation.spec.ts`):**
- [ ] All 5 nav links route to correct pages (EN locale)
- [ ] Active link is highlighted on each page
- [ ] Logo links to `/en`
- [ ] Scroll behaviour: scroll 100px on home → navbar gets `bg-navy` class; on `/en/about` navbar always has `bg-navy`

**Mobile (`e2e/mobile.spec.ts`):**
- [ ] At 375px viewport: hamburger visible, nav links hidden
- [ ] Hamburger click → overlay opens, links visible
- [ ] Overlay close button → overlay closes
- [ ] Escape key → overlay closes
- [ ] Tab key cycles within overlay (focus trap)

**i18n & RTL (`e2e/i18n.spec.ts`):**
- [ ] Language switcher on `/en/about` → clicking DE navigates to `/de/about`
- [ ] Arabic locale: `document.documentElement.getAttribute('dir')` === `'rtl'`
- [ ] Chinese locale: `document.documentElement.getAttribute('lang')` === `'zh'`
- [ ] All 5 pages return 200 in all 4 locales

**Contact Form (`e2e/contact.spec.ts`):**
- [ ] Empty submit → validation errors appear on required fields
- [ ] Invalid email → email error appears
- [ ] Short message (< 20 chars) → message error appears
- [ ] Valid submission → success message appears (mock API: intercept POST, return `{ success: true }`)
- [ ] Submit button disabled during loading state

**Pages (`e2e/pages.spec.ts`):**
- [ ] All 5 pages have correct `<title>` tag in EN
- [ ] Home page has trust bar text "Headquartered in Hamburg, Germany"
- [ ] Services page has 3 metal cards (Copper, Aluminium, Zinc)
- [ ] Team page has at least 1 team card
- [ ] Contact page has address, phone, email sections and form

---

### Sprint 12a — README
**Wave:** 7 | **Agent:** 7B | **Skills:** `documentation-writer`
**Depends on:** Sprint 0 complete (can start as soon as scaffold is done)
**Runs in parallel with:** Sprint 11

**File:** `README.md`

**Sections:**
- [ ] Project overview (1 paragraph)
- [ ] Prerequisites (Node 18+, npm)
- [ ] Local development: `npm install` + `npm run dev` + Storybook command
- [ ] Environment variables: describe each var in `.env.example`, how to get Resend API key
- [ ] Content management: how to edit each `content/*.ts` file — with examples for common operations (add team member, update company address, change tagline)
- [ ] Translations: how to update `messages/*.json`, placeholder convention, professional translation TODO markers
- [ ] Replacing placeholders: full checklist of all `<!-- PLACEHOLDER -->` items with file locations
- [ ] Deployment to Vercel: step-by-step (connect repo, set env vars, deploy)
- [ ] Adding a new page: brief guide
- [ ] Design system: reference to Storybook

---

### Sprint 12b — Deployment & Launch Readiness
**Wave:** 8 | **Agent:** Solo-8
**Depends on:** Sprint 11 (E2E passing), Sprint 12a (README complete)

**Tasks:**
- [ ] `npm run build` — zero errors, zero TypeScript errors
- [ ] `npm run lint` — zero warnings
- [ ] Playwright tests passing: `npx playwright test` — all green
- [ ] Verify `RESEND_API_KEY` and `CONTACT_FORM_RECIPIENT` set in Vercel dashboard
- [ ] Deploy to Vercel preview: `vercel --prod` or via Git push to main
- [ ] Smoke test preview URL:
  - All 5 pages load on preview URL
  - Language switcher works
  - Arabic RTL renders correctly
  - Contact form submits and email is received in production
- [ ] If custom domain ready: add in Vercel dashboard, verify DNS propagation, HTTPS active
- [ ] Final Lighthouse run on production URL — all categories 90+
- [ ] Create `LAUNCH_CHECKLIST.md` with placeholder replacement checklist (logo transparent version, founder photo, real address, phone, email, tagline confirmation, professional translations)
