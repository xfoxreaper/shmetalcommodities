# Product Requirements Document
## SH Metal Commodities — Marketing Website

**Version:** 1.0  
**Prepared for:** Claude Code  
**Status:** Ready for development  

---

## 1. Project Overview

**Client:** SH Metal Commodities  
**Type:** Multi-page marketing / landing website  
**Purpose:** Establish a credible, premium digital presence for a family-owned non-ferrous metals trading house operating globally.

The site must communicate institutional heritage, discretion, and global reach — evoking the aesthetic register of private banks like Coutts or N.M. Rothschild. It is not a product catalogue or a trading platform. It is a statement of character.

---

## 2. Company Brief

SH Metal Commodities is a family-owned commodity trading house specialising in the brokerage and trading of non-ferrous metals — primarily **copper, aluminium, and zinc**. The firm operates across global markets: **Europe, the Middle East, Asia, and the Americas**.

The brand values are:
- **Heritage** — family ownership, long-term relationships, multi-generational trust
- **Discretion** — understated, not loud; quality over volume
- **Global reach** — operating across four continents with local market knowledge
- **Integrity** — counterparty trust is the firm's most valuable asset

---

## 3. Site Architecture — Pages

The site is **multi-page** (each section is a separate routed page, not a single scroll).

| Page | Route | Purpose |
|------|--------|---------|
| Home / Hero | `/` | Brand statement, tagline, immediate tone-setting |
| About | `/about` | Company history, values, family ownership narrative |
| Products & Services | `/services` | What the firm trades and how it operates |
| Team | `/team` | Founder profile (one person, placeholder structure for future additions) |
| Contact | `/contact` | Full office address, phone, email, contact form |

A persistent **navigation bar** and **footer** appear on all pages.

---

## 4. Design Direction

### 4.1 Aesthetic Reference
The visual language should reference **Coutts Bank, Rothschild & Co., and Patek Philippe** — not commodity exchanges or trading platforms. Think:
- Deep navy as the dominant colour
- Warm ivory / cream as the background or secondary tone
- Gold or aged brass as the accent (sparingly)
- Generous whitespace
- Serif typography as the primary typeface — classical, not trendy
- No gradients, no gimmicks, no hero videos

### 4.2 Colour Palette

| Role | Colour | Hex |
|------|--------|-----|
| Primary | Deep Navy | `#0A1628` |
| Secondary | Ivory / Parchment | `#F5F0E8` |
| Accent | Antique Gold | `#B89A5A` |
| Text on dark | Warm White | `#FAF8F4` |
| Text on light | Charcoal | `#1C1C1C` |

> **Note:** The client has brand assets ready (logo, colours, fonts). These hex values are directional defaults. If brand assets differ, defer to the supplied assets. See Section 9 for asset list.

### 4.3 Typography

- **Display / Headings:** Classical serif — `Cormorant Garamond` or `EB Garamond` (Google Fonts). Large, tracked, dignified.
- **Body:** Refined serif — `Lora` or `Libre Baskerville`. Never sans-serif for body copy.
- **UI / Labels:** Light-weight sans — `Josefin Sans` — used sparingly for navigation, labels, and form fields only.

### 4.4 Motion & Interaction
- Subtle fade-in on page load (no dramatic animations)
- Smooth hover states on links and buttons (colour/underline transitions, 200ms)
- No parallax, no scroll-jacking
- Navigation: clean horizontal bar on desktop, hamburger on mobile
- Page transitions: simple fade (150ms)

### 4.5 Layout Principles
- **Desktop:** Wide margins, centred content column (max-width ~1100px), generous vertical spacing
- **Mobile:** Fully responsive; single column; typography scales gracefully
- **Imagery:** If placeholder images are needed, use abstract material textures (raw copper, aluminium coils, refined metal surfaces) — never generic stock photography of people shaking hands

---

## 5. Page Specifications

### 5.1 Home / Hero (`/`)

**Goal:** Immediate impression of prestige and global authority.

**Elements:**
- Full-viewport hero section
  - Background: Deep navy (`#0A1628`) with a subtle CSS noise/linen grain texture overlay
  - Logo: Top-left in navigation bar (see Section 6.1)
  - Tagline (one of the following — client to confirm):
    - *"Integrity in Every Transaction."*
    - *"Metal. Markets. Trust."*
    - *"Trading Non-Ferrous Metals Across the World's Markets."*
  - Sub-tagline (one sentence): *"A family-owned trading house operating in copper, aluminium and zinc across Europe, the Middle East, Asia and the Americas."*
  - CTA button: **"Learn More"** → `/about`
  - Style: centred text, ivory on navy, gold accent on CTA border
- Below the fold: a minimal **trust bar**
  - Single line: *"Headquartered in [City], [Country]"*
  - Flanked by thin gold (`#B89A5A`) horizontal dividers
- Full navigation visible in header

---

### 5.2 About (`/about`)

**Goal:** Communicate character, heritage, and values.

**Elements:**
- Page heading: *"A Trading House Built on Relationships"*
- Two to three paragraphs of body copy covering:
  - What family ownership means for the firm (long-term thinking, accountability, continuity)
  - History and formation of the company
  - Operating philosophy: discretion, reliability, counterparty trust
- Pull quote (large serif, styled distinctly from body): e.g. *"We trade with our name on every deal."*
- Credential line: *"Established in [City], [Country]"*

> **Note to Claude Code:** Use formal, institutional-sounding placeholder copy for all body text. Mark every placeholder with `<!-- PLACEHOLDER: [description] -->` in HTML/JSX comments.

---

### 5.3 Products & Services (`/services`)

**Goal:** Explain what the firm does, clearly and without technical overload.

**Elements:**
- Page heading: *"Our Markets"*
- Three cards or content sections — one per metal:
  - **Copper** — 1-paragraph placeholder description
  - **Aluminium** — 1-paragraph placeholder description
  - **Zinc** — 1-paragraph placeholder description
- Each card: metal name (display serif, large), paragraph, optional subtle material texture background
- Below cards: short paragraph on the firm's brokerage model and counterparty approach
- Secondary CTA: **"Speak to Our Team"** → `/contact`

---

### 5.4 Team (`/team`)

**Goal:** Put a name and face to the firm. Human, credible, not corporate.

**Elements:**
- Page heading: *"The People Behind SH Metal Commodities"*
- One founder card:
  - Portrait photo (placeholder: grey square with initials)
  - Name: `[Founder Full Name]`
  - Title: `[Founder / Managing Director / Principal]`
  - Bio: 3–4 sentence placeholder
  - Optional: LinkedIn icon link
- Layout: responsive card grid — must accommodate future team member additions without redesign

> **Note to Claude Code:** Mark all personal details as `<!-- PLACEHOLDER -->`. Client will supply content.

---

### 5.5 Contact (`/contact`)

**Goal:** Make it easy for counterparties and prospects to reach the firm.

**Layout:** Two columns on desktop, stacked on mobile.

**Left column — Contact Details:**
- Full office address: `<!-- PLACEHOLDER: Street, City, Country, Postcode -->`
- Phone: `<!-- PLACEHOLDER: +XX XXX XXX XXXX -->`
- Email: `<!-- PLACEHOLDER: info@shmetalcommodities.com -->`
- Optional: static map embed (Google Maps iframe) — or omit with `<!-- TODO: add map embed -->`

**Right column — Contact Form:**
- Fields:
  - Full Name (required)
  - Company (optional)
  - Email Address (required)
  - Subject — dropdown: *General Enquiry / Trading / Partnership / Other*
  - Message (required, textarea)
  - Submit button: **"Send Enquiry"**
- Form `action`: placeholder `POST` endpoint — mark with `<!-- TODO: wire to backend or email service (e.g. Resend, Formspree, SendGrid) -->`

---

## 6. Navigation & Footer

### 6.1 Navigation Bar
- Persistent across all pages
- Logo: left-aligned
- Links: right-aligned — *Home · About · Services · Team · Contact*
- Active page state: antique gold underline or text colour change
- On hero page: transparent background; solid navy on scroll (JS scroll listener)
- Mobile: hamburger icon → full-screen overlay menu
- Language switcher: icon/dropdown in top-right corner of nav (see Section 7)

### 6.2 Footer
- Background: deep navy (`#0A1628`)
- Left: Logo + one-line descriptor (e.g. *"Global Non-Ferrous Metal Trading"*)
- Centre: Navigation links (same as header)
- Right: Email + city/country
- Bottom bar: *"© [Year] SH Metal Commodities. All rights reserved."*
- Language switcher also present in footer

---

## 7. Internationalisation (i18n)

The site must support **four languages**:

| Language | Code | Direction | Notes |
|----------|------|-----------|-------|
| English | `en` | LTR | Default |
| German | `de` | LTR | Full translation |
| Chinese (Simplified) | `zh` | LTR | CJK font fallback required |
| Arabic | `ar` | **RTL** | Full RTL layout flip required |

### Implementation Requirements

- **Library:** `next-intl` (preferred for Next.js App Router) or `react-i18next`
- **Locale files:** All user-facing strings in `/locales/{lang}.json` — **zero hardcoded strings in components**
- **Language switcher:** Dropdown or text toggle (EN / DE / ZH / AR) in nav and footer
- **Arabic RTL:** Apply `dir="rtl"` to `<html>` when locale is `ar`; mirror all flex directions, padding, margin, and icon placement
- **Chinese font stack:** `"Noto Serif SC", "Source Han Serif CN", serif`
- **Placeholder translations:** Non-English locales may use machine-translated placeholders at build time — mark with `// TODO: professional translation needed` in locale JSON files

---

## 8. Technical Specifications

### 8.1 Recommended Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS with custom theme (colours per Section 4.2) |
| i18n | `next-intl` |
| Fonts | Google Fonts via `next/font` |
| Deployment | Vercel |

### 8.2 SEO & Performance
- Per-page `<title>` and `<meta name="description">` — translated per locale
- Open Graph tags on all pages
- `next/image` for all images with descriptive `alt` text
- Lighthouse target: 90+ on Performance, Accessibility, Best Practices, SEO
- No third-party analytics or tracking unless explicitly added later

### 8.3 Accessibility
- WCAG 2.1 AA minimum
- Full keyboard navigation
- Sufficient contrast ratios (verify antique gold `#B89A5A` on ivory `#F5F0E8` — adjust if contrast fails)
- All form inputs have associated `<label>` elements

### 8.4 Browser Support
- Modern evergreen browsers: Chrome, Firefox, Safari, Edge
- IE11: not required

---

## 9. Assets to Be Provided by Client

| Asset | Format | Notes |
|-------|--------|-------|
| Logo (light version) | SVG preferred | For dark nav / navy backgrounds |
| Logo (dark version) | SVG preferred | For light / ivory backgrounds |
| Brand colour hex codes | — | Confirm or override Section 4.2 |
| Brand fonts | TTF/OTF or Google Fonts name | If custom, provide files |
| Founder photo | JPG/PNG min 600×800px | Team page |
| Founder name, title, bio | Plain text | Team page |
| Office address | Plain text | Contact page |
| Phone number | Plain text | Contact page |
| Email address | Plain text | Contact page |
| Final tagline | Plain text | Hero page |
| Translations (DE, ZH, AR) | JSON or Word doc | Or approve AI-drafted placeholders |

---

## 10. Out of Scope — v1.0

The following are explicitly **not** part of this version:

- Live market data or price feeds
- Client login or portal
- CMS integration (content is static)
- Blog or news section
- E-commerce or transaction functionality
- Custom email backend for contact form

These may be scoped for v2.0.

---

## 11. Deliverables

Claude Code should produce:

1. Fully functional Next.js project matching this PRD
2. All five pages implemented and routed
3. i18n setup — English fully populated; DE/ZH/AR marked as placeholder
4. Fully responsive layout (mobile + desktop)
5. All placeholder content clearly marked with `<!-- PLACEHOLDER -->` comments
6. `README.md` explaining how to:
   - Run the project locally (`npm run dev`)
   - Add or update translations
   - Replace placeholder content
   - Deploy to Vercel

---

*End of Document — v1.0*
