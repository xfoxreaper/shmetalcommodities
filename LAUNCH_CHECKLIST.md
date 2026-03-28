# SH Metal Commodities — Pre-Launch Checklist

Complete every item below before pointing real visitors to the site.

---

## Content (replace all placeholders)

- [ ] `content/company.ts` — paragraph 1: company history
- [ ] `content/company.ts` — paragraph 2: trading approach
- [ ] `content/company.ts` — paragraph 3: values statement
- [ ] `content/company.ts` — `pullQuote`: key brand quote
- [ ] `content/team.ts` — founder name
- [ ] `content/team.ts` — founder title
- [ ] `content/team.ts` — founder bio
- [ ] `content/team.ts` — founder `photoUrl` (add photo to `public/images/` and update path)
- [ ] `content/team.ts` — founder LinkedIn URL
- [ ] `content/contact.ts` — street address
- [ ] `content/contact.ts` — postcode
- [ ] `content/contact.ts` — phone number
- [ ] `content/contact.ts` — email address

---

## Translations

- [ ] `messages/de.json` — replace machine-translated placeholders with professional German translation
- [ ] `messages/zh.json` — replace machine-translated placeholders with professional Chinese translation
- [ ] `messages/ar.json` — replace machine-translated placeholders with professional Arabic translation

---

## Technical

- [ ] Set `RESEND_API_KEY` in Vercel dashboard (vercel.com → Project → Settings → Environment Variables)
- [ ] Set `CONTACT_FORM_RECIPIENT` in Vercel dashboard (the email address to receive contact form submissions)
- [ ] After adding env vars: Deployments → latest deployment → ⋯ → Redeploy
- [ ] Verify contact form sends a real email end-to-end
- [ ] Add verified sending domain in Resend dashboard (resend.com → Domains)
- [ ] Update `from` address in `src/app/api/contact/route.ts` to use your verified domain
- [ ] Run Lighthouse on live URL — target 90+ on all categories
- [ ] Run `npx playwright test` against live URL

---

## Domain (when ready)

- [ ] Add custom domain in Vercel dashboard (Project → Settings → Domains)
- [ ] Update DNS records at your domain registrar (Vercel will show the required records)
- [ ] Confirm HTTPS is active (Vercel provisions SSL automatically)
- [ ] Update base URL in `src/app/sitemap.ts` from `https://shmetalcommodities.com` to actual domain
- [ ] Redeploy after domain is confirmed active
