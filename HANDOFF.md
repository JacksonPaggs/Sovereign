# Sovereign Landing Page — Handoff

## Goal

Build a production-grade landing page for **Sovereign**, a full-service digital agency offering web design & development, AI integration, and full-stack development. The single conversion goal is booking a discovery call. Design is the product — the visitor's impression is everything.

---

## Current State

The page is **built, committed, and running.**

- Open a terminal in this folder and run `node serve.mjs`
- Visit `http://localhost:3000`
- Screenshots: `node screenshot.mjs http://localhost:3000 [label] [viewport]`

The page is a single self-contained file with all styles inline. No build step, no framework, no dependencies at runtime. Puppeteer is installed locally as a dev dependency for screenshots only.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The production landing page — edit this |
| `serve.mjs` | Local dev server (port 3000) |
| `screenshot.mjs` | Puppeteer screenshot tool |
| `PRODUCT.md` | Brand/product context used by the impeccable design skill |
| `docs/superpowers/specs/2026-05-21-sovereign-landing-page-design.md` | Design spec (written mid-session, partially stale) |
| `.superpowers/brainstorm/.../final-mockup.html` | The brainstorm canvas where all design iterations happened |

---

## Design System (do not deviate without reason)

**Colors — OKLCH only**

| Token | Value | Role |
|---|---|---|
| `--gold` | `oklch(72% 0.135 82)` | Primary accent — all UI elements |
| `--ink` | `oklch(8% 0.013 75)` | Page background |
| `--ink-2` | `oklch(11% 0.013 75)` | Elevated surfaces |
| `--text` | `oklch(93% 0.006 75)` | Primary text |
| `--text-mid` | `oklch(58% 0.008 75)` | Secondary text |
| `--rule` | `oklch(20% 0.010 75)` | Borders and dividers |
| Violet (`oklch(56% 0.16 280)`) | Background atmospheric layer only | **Never on text or UI elements** |

**Typography**
- Display / brand: **Cinzel** 700, 900 — headings, wordmark, service titles, nav logo
- Body: **Bricolage Grotesque** 400–800 — all body copy, buttons, labels

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (spring-style, fast out) for interactions. `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for nav/ambient animations.

**Motion rules:** Only animate `transform` and `opacity`. Never `transition-all`. Active states use `scale(0.97)` at `100ms`. Releases use `200ms`. Scroll reveal fires at `rootMargin: '0px 0px -100px 0px'` via IntersectionObserver.

---

## What We Built and Why

**Sections in order:**
1. **Fixed nav** — backdrop-blur glass, directional-fill hover on CTA button
2. **Hero** — asymmetric 2-column grid (`1fr 0.7fr`). Left: letter-stagger wordmark, tagline, sub, buttons. Right: atmospheric SOVEREIGN at 9% opacity bleeding off the right edge (cropped by `overflow: hidden` on the hero). Background: hero atmospheric glows layered on top of the page-wide dot grid.
3. **Kinetic marquee band** — Cinzel caps scrolling at 30s, pauses on hover. Items include "WE BUILD EMPIRES" (echoes the tagline).
4. **Manifesto band** — Statement text on `ink-2` with gold dash accent. Replaced an original stats/metrics bar.
5. **Services** — Numbered architectural list (01/02/03). On hover: gold line sweeps left-to-right across the top border, cursor spotlight illuminates under the mouse, number transitions to gold. No cards.
6. **Full-bleed SOVEREIGN wordmark break** — Large text at 8% opacity. Brightens to 14% on hover. Placed before the CTA as a gut-punch brand moment.
7. **CTA banner** — Ink-2 card with gold atmospheric glow, two buttons (Book a Call primary, Send a Message ghost).
8. **Footer** — Minimal. Logo + copyright.

---

## Changes Made During This Session

**Copy:**
- Tagline: "We Don't Just Build. We Reign." → **"We Don't Build Websites. We Build Empires."**
- Hero body: Replaced "Cutting-edge websites... refuse to be ordinary" → **"Websites that win clients. AI systems that cut costs. Applications that scale without breaking. Built for businesses that mean it."**
- Manifesto: Trimmed "work harder, move faster, and compound in value long after launch" → **"the digital infrastructure your competitors can't copy."**
- CTA subtext: "One call. Zero obligation. We'll tell you exactly what your project needs." → **"One conversation. No pitch. Just an honest assessment of what it takes."**
- Marquee: "WE REIGN" → **"WE BUILD EMPIRES"**

**Design:**
- Replaced 3-column icon+title+text card grid with architectural numbered service rows (impeccable: no identical card grids)
- Replaced hero stats bar with manifesto statement band (impeccable: no hero-metric template)
- Removed gradient text from SOVEREIGN wordmark → solid gold (impeccable: no background-clip gradient text)
- Replaced Space Grotesk with Bricolage Grotesque (Space Grotesk is on impeccable's reflex-reject list)
- Orbital spinning rings on hero right side → large atmospheric SOVEREIGN text bleeding off edge (more branded, less generic sci-fi)
- Added dot grid background, atmospheric depth layer (`body::before`), bumped noise texture (`body::after`) — was "too empty and dark"
- Violet accent color reassigned to background-only atmospheric layer (design-taste LILA BAN prohibits violet on UI elements)

---

## Mistakes and Failed Attempts — Avoid These

**CSS/HTML**
- `flex-wrap: wrap` on a container of `display: inline-block` letter spans causes wrapping when font renders wider than expected. Use `display: block; white-space: nowrap` on the wordmark container instead.
- `body::before` as a `position: fixed` atmospheric layer will sit above page content unless you explicitly set `position: relative; z-index: 1` on `nav, section, div, footer`.
- Orphaned `@keyframes` (ring-spin, ring-counter) left after removing the ring elements. Always search for keyframe references when deleting animated components.

**Screenshots**
- `deviceScaleFactor: 2` at 1440px makes thumbnails look mobile-width. Use `deviceScaleFactor: 1` when checking layout, 2x only for final quality inspection.
- Taking screenshots before Google Fonts load causes fallback font to render at different widths — add `waitUntil: 'networkidle2'` and a `800ms` delay minimum.
- Scroll-reveal elements start at `opacity: 0` and never trigger in a static full-page screenshot. Force them visible with `page.evaluate(() => document.querySelectorAll('.reveal, .reveal-row').forEach(el => el.classList.add('visible')))` before screenshotting.
- Playwright failed here — Chrome not installed at the path it expects. Use Puppeteer with the explicit `executablePath` pointing to `C:/Users/jacks/.cache/puppeteer/chrome/win64-148.0.7778.167/chrome-win64/chrome.exe`.

**Font choices**
- Space Grotesk, Cormorant Garamond, Playfair Display, Inter — all on impeccable's reflex-reject list. Don't reach for them.
- Cinzel is fine because it was already committed to this brand before the reflex-reject rules apply (identity-preservation exception).

---

## Next Steps

**Functionality (none of these exist yet)**
- [ ] Contact form or Calendly embed behind the "Book a Call" CTA
- [ ] Mobile hamburger menu (nav links currently just `display: none` on mobile)
- [ ] Anchor scroll on nav links (Services, Work, About, Contact all point to `#`)

**Content (placeholders)**
- [ ] Portfolio / Work section — the nav has a "Work" link but no section exists
- [ ] About section — who is Sovereign, who runs it
- [ ] Testimonials / social proof — currently no third-party validation on the page
- [ ] Real case study imagery if/when available

**Meta / SEO**
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing
- [ ] `og:image` screenshot — a branded 1200×630 hero image for link previews
- [ ] Favicon

**Production**
- [ ] Deploy to Vercel, Netlify, or Cloudflare Pages (all support static HTML with zero config)
- [ ] Connect custom domain (sovereignagency.com or similar)
- [ ] Update the spec doc (`docs/superpowers/specs/`) — it was written mid-session and doesn't reflect the final copy, ring removal, or depth changes