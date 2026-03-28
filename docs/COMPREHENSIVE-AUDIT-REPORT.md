# SH Metal Commodities -- Comprehensive UI/UX Audit Report

**Date:** 28 March 2026
**Audit Team:** 5 UX Experts, 2 Design Directors, 5 Research Agents
**Verdict:** The site is a well-engineered skeleton with excellent taste -- but it's operating at ~10-15% of its potential. The bones are right; the house needs to be built.

---

## EXECUTIVE SUMMARY

The codebase is clean, well-typed, accessible at a foundational level, and internationalized across 4 languages. The brand voice is genuinely strong -- understated, precise, institutional. The color palette (navy/ivory/gold) and typography choices (Cormorant Garamond + Lora + Josefin Sans) are appropriate for a heritage trading house.

**But the site currently looks like a wireframe with good taste, not a 153-year-old trading institution.** The single biggest gap is not code quality -- it's *content and visual depth*. Every page needs more substance, more visual richness, and more trust signals.

### By the Numbers
- **4 Critical bugs** (will break or violate law)
- **2 Legal compliance gaps** (German law violations)
- **14 Major UX issues**
- **13 Minor issues**
- **~30 enhancement opportunities**
- **0 images** on the entire site (beyond logo)
- **60%+ of content** doesn't translate (renders English on all locales)

---

## PHASE 0: CRITICAL BUGS & LEGAL BLOCKERS

These must be fixed before anything else. Some are legal requirements.

### BUG-01: 3.9MB Logo Image [CRITICAL]
**File:** `public/images/logo.png` (2816x1536 PNG, 3,911,425 bytes)
**Impact:** Destroys LCP on every page load. Should be <20KB.
**Fix:** Resize to ~220x280 (2x retina), export as WebP or optimized PNG. Consider SVG if vector.

### BUG-02: `useTranslations` Hook in Server Components [CRITICAL]
**Files:** `about/page.tsx`, `team/page.tsx`
**Impact:** `useTranslations` is a client hook but these are Server Components (no `'use client'`). Will break in strict mode.
**Fix:** Change to `getTranslations` from `next-intl/server` (async). Make components `async`.

### BUG-03: About Page Renders Placeholders / English-Only Content [CRITICAL]
**File:** `about/page.tsx` reads from `content/company.ts` instead of translations
**Impact:** About page body is always English regardless of locale. Translation keys `about.para1/para2/para3` exist in JSON but are unused.
**Fix:** Replace `company.about.paragraphs` with `t('para1')`, `t('para2')`, `t('para3')`.

### BUG-04: ~60% of Content Bypasses i18n System [CRITICAL]
**Files:** `content/services.ts`, `content/company.ts`, `content/contact.ts` are English-only
**Impact:** Metal descriptions, trading services, principal model, contact details render in English on DE/ZH/AR.
**Fix:** Move all user-facing text to `messages/*.json`. Keep `content/*.ts` only for non-locale data (IDs, URLs).

### LEGAL-01: Missing Impressum (German TMG/DDG Requirement) [LEGAL BLOCKER]
**Impact:** Legally required for any German company website. Must include: company name, legal form, address, managing director, Handelsregister number, VAT ID.
**Fix:** Create `/impressum` page immediately.

### LEGAL-02: Missing Privacy Policy / GDPR Notice [LEGAL BLOCKER]
**Impact:** Contact form collects personal data with zero privacy disclosure. GDPR violation.
**Fix:** Create `/privacy` page. Add consent notice below contact form submit button.

---

## PHASE 1: HIGH-PRIORITY FIXES

### Content & i18n

| ID | Issue | Files | Effort |
|----|-------|-------|--------|
| I18N-01 | 7+ hardcoded English strings ("Markets We Trade", "Address", "Phone", etc.) | services/page, contact/page, Footer, ContactForm | Low |
| I18N-02 | Zod validation errors always English | ContactForm.tsx | Medium |
| I18N-03 | Skip-to-content link not translated | layout.tsx | Low |
| I18N-04 | aria-labels not translated (hamburger, mobile menu, lang switcher) | Navbar, MobileMenu, LanguageSwitcher | Low |
| I18N-05 | German translation is machine-translated (flagged in file) | de.json | External (professional translation) |
| I18N-06 | OG image always English | opengraph-image.tsx | Low |

### Accessibility (WCAG AA Failures)

| ID | Issue | WCAG | Files |
|----|-------|------|-------|
| A11Y-01 | `text-ivory/40` on navy = 2.0:1 contrast (needs 4.5:1) | 1.4.3 | Footer.tsx |
| A11Y-02 | `text-ivory/60` on navy = 3.1:1 contrast (needs 4.5:1) | 1.4.3 | Footer.tsx |
| A11Y-03 | Form placeholder contrast too low (`charcoal/40`) | 1.4.3 | FormField.tsx |
| A11Y-04 | Language switcher touch targets <24px | 2.5.8 | LanguageSwitcher.tsx |
| A11Y-05 | LinkedIn icon touch target 18x18 | 2.5.8 | TeamCard.tsx |
| A11Y-06 | Focus not managed on form success | 4.1.3 | ContactForm.tsx |
| A11Y-07 | Required fields not indicated | 3.3.2 | ContactForm.tsx |
| A11Y-08 | Form success not announced via live region | 4.1.3 | ContactForm.tsx |
| A11Y-09 | CJK font not applied to body text | Readability | Typography.tsx |

### Technical Debt

| ID | Issue | Files |
|----|-------|-------|
| TECH-01 | Duplicate `fadeIn` keyframes in globals.css vs animations.css (dead code) | styles/ |
| TECH-02 | `marginTop: '-88px'` hack coupled to layout padding | page.tsx, layout.tsx |
| TECH-03 | Magic number `88` in 4+ files, `1100` in 3 files | Multiple |
| TECH-04 | navLinks array duplicated in Navbar, MobileMenu, Footer | 3 files |
| TECH-05 | No error.tsx / not-found.tsx / loading.tsx | app/[locale]/ |
| TECH-06 | Section padding override bug (falsy `0` treated as no override) | Section.tsx |
| TECH-07 | In-memory rate limiting useless in serverless | api/contact/route.ts |
| TECH-08 | Non-null assertion on env var (crash if missing) | api/contact/route.ts |
| TECH-09 | No `generateStaticParams` (all 20 routes should be static) | All pages |
| TECH-10 | 14+ font weight/style combos (many unused) | fonts.ts |

### Contact Page Fixes

| ID | Issue | Severity |
|----|-------|----------|
| CONTACT-01 | Phone number `+49 1939 1945` is not a valid German number | P0 -- remove or replace |
| CONTACT-02 | Email `rudi@shcommodities.de` too casual for heritage brand | High |
| CONTACT-03 | Duplicate "Get in Touch" heading (H1 + H2) | High |
| CONTACT-04 | Phone/email rendered as plain text, not clickable links | High |
| CONTACT-05 | Google Maps still a TODO comment | Medium |
| CONTACT-06 | Missing office hours and response time expectations | Medium |
| CONTACT-07 | No honeypot or bot protection | Medium |

---

## PHASE 2: DESIGN & UX OVERHAUL

### Homepage (Currently: hero + trust bar = ~10% of needed content)

**Current state:** Centered tagline on navy, "Learn More" button, one-line trust bar. Then the page ends.

**Recommended structure (6 sections):**

```
1. HERO -- Full-bleed background image (Hamburg port / metal texture)
   + navy overlay + "Est. 1873" label + tagline + dual CTA

2. KEY FIGURES BAR -- "150+ Years | 3 Core Metals | Hamburg | Global Reach"
   Animated count-up on scroll. Large Cormorant Garamond numbers.

3. "OUR METALS" TEASER -- 3 metal cards (link to /services)
   Copper | Aluminium | Zinc preview

4. "OUR APPROACH" -- 3 value pillars
   Independent | Experienced | Trusted

5. HERITAGE PULL QUOTE -- Navy full-width band
   "We trade with our name on every deal."

6. CONTACT CTA -- "Ready to discuss your requirements?"
   Button + direct email/phone
```

### Navigation

| Change | Rationale |
|--------|-----------|
| Remove "Home" from navLinks (logo covers this) | Frees a slot |
| Style "Contact" as a CTA button in navbar | Drive inquiries -- highest business impact |
| Increase nav text from `text-xs` to `text-sm` | Current is too small for heritage brand |
| Use native language labels (中文, عربي instead of ZH, AR) | User-friendly |
| Add Impressum + Privacy links to footer | Legal requirement |
| Add phone + full address to footer | Trust signal |
| Add back-to-top button | UX standard |

### About Page

| Change | Rationale |
|--------|-----------|
| Add navy PageHeader (matches Services/Team) | Consistency |
| Break into multi-section layout | Currently monotone wall of text |
| Move pull quote to its own navy band section | Make it a dramatic moment |
| Add key figures section (150+ years, 3 metals, etc.) | Trust signals |
| Add timeline section (1873 → present, 4-6 milestones) | Heritage leverage |
| Add values section (Integrity, Discipline, Relationships) | Every competitor has this |
| Add CTA at bottom (currently dead-end page) | Guide user forward |

### Services Page

| Change | Rationale |
|--------|-----------|
| Shorten PageHeader subtitle (54-word paragraph → 1 sentence) | Currently buried |
| Move principal model to its own section with pull-quote treatment | Core differentiator |
| Improve MetalCard color differentiation (Al and Zn too similar) | Visual clarity |
| Add hover states on MetalCards | Feel alive, not inert |
| Add 1 key figure per metal card | Signal market fluency |
| Expand trading services from 2 to 4 | 2 items feels thin |
| Alternate section backgrounds (ivory → navy → ivory → navy) | Visual rhythm |
| Redesign CTA as full navy section with supporting text | Currently orphaned button |

### Team Page

| Change | Rationale |
|--------|-----------|
| Rename to "Leadership" | Better for 1-person team |
| Replace 3-col grid with founder profile layout | 1 card in 3-col grid looks broken |
| Increase avatar to 160-200px, brand colors (navy + gold) | Grey circle = "didn't try" |
| Add intro paragraph before profile | Set context |
| Get professional headshot | Non-negotiable for MD |
| Split bio into 2-3 paragraphs | Single dense block |
| Note: bio mentions nickel but Services only lists Cu/Al/Zn | Content inconsistency |

### Contact Page

| Change | Rationale |
|--------|-----------|
| Add navy PageHeader (consistency) | Only interior page without one |
| Replace fake phone with real number or remove | `+49 1939 1945` is suspicious |
| Use institutional email (enquiries@...) | Not `rudi@` |
| Make phone/email clickable (`tel:`, `mailto:`) | Basic usability |
| Add Google Maps embed | TODO still in code |
| Add office hours + response time | Set expectations |
| Add GDPR notice below form | Legal requirement |
| Add phone number field to form | B2B expects phone contact |
| Localize Zod error messages | Currently English-only |
| Improve success state (gold-bordered card + checkmark) | Currently just text |
| Add required field indicators | WCAG 3.3.2 |

---

## PHASE 3: VISUAL ELEVATION

### Photography (Zero images currently -- CRITICAL gap)

| Priority | Image Needed | Usage |
|----------|-------------|-------|
| P0 | Hero background (Hamburg port, metal macro, or industrial) | Homepage hero |
| P0 | MD headshot (professional, formal) | Team/Leadership page |
| P1 | Metal macro textures (copper, aluminium, zinc) | MetalCard backgrounds |
| P1 | Hamburg cityscape (Speicherstadt/Elbphilharmonie) | About page |
| P2 | Office/building exterior | Contact page |

### Color Palette Expansion

```
Current:  Navy #0A1628 | Ivory #F5F0E8 | Gold #B89A5A | Warm White #FAF8F4 | Charcoal #1C1C1C

Add:
--color-gold-light: #D4BC82     /* hover backgrounds, subtle fills */
--color-gold-dark: #8C7340      /* deep accents, text on light */
--color-slate: #2A3A52          /* mid-tone between navy and ivory */
--color-success: #3D7A5F        /* muted heritage green */
--color-error: #9B3B3B          /* muted heritage red */
```

### Typography Tuning

| Change | Rationale |
|--------|-----------|
| Display: `tracking-widest` → `tracking-wider` | 0.1em at 96px = 10px gaps -- too wide |
| Display: consider `font-normal` (400) at md+ | 300 weight at 8xl = wispy strokes |
| Body: `leading-relaxed` → `leading-loose` on wide screens | Better readability at max-w-3xl |
| Add `caption` variant (11px, tracking-widest, 50% opacity) | For copyright, metadata |
| Add `body-large` variant (text-lg sm:text-xl) | For intro paragraphs |
| Reduce font weights loaded (14+ → ~8) | Performance |

### Component Polish

| Component | Enhancement |
|-----------|-------------|
| Button | Increase to `px-10 py-4`, 2px border instead of 1px |
| MetalCard | Hover lift + shadow, gold top-border accent, min-height 320px |
| GoldDivider | CSS gradient (transparent → gold → transparent) for burnished feel |
| PageHeader | Subtle gradient (navy to slightly lighter navy) for depth |
| PullQuote | Increase border to 4px, add decorative quotation mark |
| TeamCard | Increase avatar to 120px, add subtle background card |
| Section | Add explicit `padding` prop (`compact | default | generous`) |

### Motion & Interaction

| Enhancement | Approach |
|-------------|----------|
| Scroll-triggered fade-in | `motion` (Framer Motion) `FadeIn` wrapper component |
| Staggered grid reveals | 100-150ms delay per card |
| Animated counter on key figures | `react-countup` + IntersectionObserver |
| Gold divider width animation | Animate from 0 to full on scroll |
| Link underline reveal | Gold underline slides in from left on hover |
| Mobile menu exit animation | Fade out + slide up (currently vanishes instantly) |
| Page transitions | Simple opacity fade on route change |

### Texture & Depth

| Enhancement | Approach |
|-------------|----------|
| Subtle paper texture on ivory sections | Linen/parchment at 3-5% opacity |
| Hero background image with navy overlay | `next/image` fill + `bg-navy/70` overlay |
| Section transitions | 1px gold rule or 40px gradient fade between sections |
| Engraved effect on display type | Subtle `text-shadow` (1px darker tone) |
| Metal photography on MetalCards | Replace CSS gradients with real macro textures |

---

## PHASE 4: NEW CONTENT & PAGES

### Required New Pages

| Page | Priority | Content |
|------|----------|---------|
| `/impressum` | P0 (legal) | Company legal details, Handelsregister, VAT |
| `/privacy` | P0 (legal) | GDPR privacy policy, data processing info |
| `/sustainability` or ESG section | P1 | Responsible sourcing, environmental commitment |
| `/compliance` | P2 | AML/KYC summary, sanctions compliance |
| Market insights section | P3 | Quarterly metal market commentary |

### Missing Content Within Existing Pages

| Content | Where | Priority |
|---------|-------|----------|
| Key figures / "At a Glance" stats | Homepage + About | P0 |
| Industry memberships (LME, trade associations) | Footer + About | P1 |
| Heritage timeline (1873 → present) | About page | P1 |
| Company values (3 pillars) | About page | P1 |
| Geographic presence | Homepage or About | P2 |
| MD professional headshot | Team page | P1 |
| Structured data (JSON-LD Organization + Person) | Layout | P2 |

---

## COMPETITIVE POSITIONING

### How SH Metal Compares

| Element | Trafigura | Glencore | Gerald | SH Metal |
|---------|-----------|----------|--------|----------|
| Key metrics display | Bold stats | "At a Glance" | Scale figures | **None** |
| Photography | Extensive | Moderate | Moderate | **Zero** |
| Regulatory credentials | Prominent | Prominent | ASI member | **None** |
| Heritage narrative | Founding story | Corporate | 60yr history | **Buried** |
| Leadership photos | Yes | Yes | Yes | **Placeholder** |
| Sustainability | Full report | Full report | Statement | **None** |
| News/updates | 10+ items | Active | Occasional | **None** |
| Legal pages | Complete | Complete | Complete | **Missing** |

### SH Metal's Advantages (to leverage)

1. **150+ year history** -- longer than any competitor in the set (Trafigura: 30yr, Gerald: 60yr)
2. **4-language support** -- rare; most competitors are English-only or English + 1
3. **Brand voice quality** -- genuinely strong, institutional, precise writing
4. **Clean codebase** -- well-typed, accessible foundations, modern stack
5. **Jungfernstieg address** -- one of Hamburg's most prestigious streets

---

## DESIGN REFERENCES

The north star for SH Metal's aesthetic should be **Swiss private banks**, not tech companies:

| Reference | Why |
|-----------|-----|
| **lombardodier.com** (est. 1796) | Gold standard for institutional prestige aesthetic |
| **rothschildandco.com** | Heritage + navy + gold, similar palette |
| **heritage.ch** (Banque Heritage) | Small institution, big presence |
| **patek.com** | Ultimate "we don't need to impress you" restraint |
| **trafigura.com** | Direct competitor, good metals page structure |

---

## IMPLEMENTATION PRIORITY MATRIX

```
WEEK 1: Legal + Critical Bugs
├── Compress logo (3.9MB → <20KB)
├── Fix useTranslations → getTranslations in About/Team
├── Fix content source (company.ts → translations)
├── Fix hardcoded English strings
├── Create Impressum page
├── Create Privacy Policy page
├── Add GDPR notice to contact form
├── Fix/remove fake phone number
└── Fix color contrast failures

WEEK 2: Structural Fixes
├── Add navy PageHeader to About + Contact (consistency)
├── Redesign Team page as Leadership profile
├── Fix contact page (duplicate heading, clickable links, map)
├── Add error.tsx / not-found.tsx / loading.tsx
├── Extract magic numbers to CSS variables
├── Consolidate navLinks + animations
├── Add generateStaticParams
└── Trim unused font weights

WEEK 3-4: Homepage & Content Expansion
├── Redesign homepage (6 sections instead of 2)
├── Add hero background image
├── Add key figures section
├── Add values/approach section
├── Add heritage pull quote section
├── Add contact CTA section
├── Expand About page (multi-section, timeline, values)
├── Expand Services (4 trading services, stats strip)
└── Style Contact nav link as CTA button

WEEK 5-6: Visual Elevation
├── Photography (hero, metals, MD headshot, Hamburg)
├── Color palette expansion
├── Typography tuning
├── Component polish (hover states, sizing)
├── Scroll-triggered animations (FadeIn, counters)
├── Texture additions (paper, gradients, depth)
├── Print stylesheet
└── Commission professional DE/ZH/AR translations

ONGOING:
├── Sustainability/ESG page
├── Compliance page
├── Market commentary (quarterly)
├── Structured data (JSON-LD)
├── Performance optimization
└── SEO content strategy
```

---

*Report compiled from 12 parallel audit agents. Total analysis: ~350,000 tokens of expert review across UX, design, brand strategy, competitor intelligence, accessibility, performance, and responsive design.*
