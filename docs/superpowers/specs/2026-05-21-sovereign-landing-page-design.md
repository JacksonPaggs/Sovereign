# Sovereign Landing Page — Design Spec
**Date:** 2026-05-21
**Status:** Approved

---

## 1. Overview

A single-page marketing landing page for **Sovereign**, a new full-service digital agency offering web design & development, AI integration, and full-stack development. The page must project power, royalty, and technical authority — converting visitors from all audience types (small businesses, startups, enterprises) into booked calls.

---

## 2. Brand

| Attribute | Value |
|---|---|
| Company name | Sovereign |
| Tagline | "We Don't Just Build. We Reign." |
| Primary CTA | Book a Call |
| Services | Web Design & Development · AI Integration · Full-Stack Development |
| Tone | Premium, commanding, forward-looking |

---

## 3. Visual Direction: Gold → Electric

- **Base background:** Near-black deep purple (`#070510`)
- **Primary accent:** Gold gradient (`#e8d48a` → `#c4a832`), used on the brand name, headings, and key stats
- **Secondary accent:** Electric violet (`#a78bfa`), used as the tech/AI counterpoint
- **Gradient story:** Brand name and key elements transition from gold → violet, symbolising "royal heritage, built for the future"
- **Glows:** Soft radial glows — violet top-right, gold bottom-left — give depth without hard edges
- **Texture:** Subtle SVG noise filter at ~2.5% opacity over the entire page for tactile depth
- **Typography:**
  - Display / brand: `Cinzel` (serif, all-caps, high letter-spacing) — royalty
  - Body / UI: `Space Grotesk` (modern sans) — tech
  - Accent italic: `Cormorant Garamond` italic — luxury flourish in hero subtext
- **No default Tailwind blue/indigo.** Gold and violet only.

---

## 4. Page Structure (Impact First)

### 4.1 Navigation (fixed)
- Left: `SOVEREIGN` logotype in Cinzel, gold→violet gradient
- Centre: Links — Services · Work · About · Contact
- Right: `Book a Call` ghost button with gold border
- Background: `rgba(7,5,16,0.7)` + `backdrop-filter: blur(20px)` — frosted glass
- Border-bottom: subtle `rgba(255,255,255,0.06)`

### 4.2 Hero Section
- Full viewport height (`100vh`)
- Eyebrow line: `WEB · AI · DEVELOPMENT` — small caps, gold, flanked by decorative lines
- H1: `SOVEREIGN` in Cinzel 90px, gold→violet gradient
- Sub-headline: `We Don't Just Build. We Reign.` in Space Grotesk 600 below the name
- Body copy: one sentence describing the three services, with an italic Cormorant flourish on "intelligent AI systems"
- CTA row: `Book a Call` (primary, gold→violet gradient fill, dark text) + `See Our Work` (ghost)
- Scroll indicator: small "SCROLL" label + animated descending line at bottom-centre
- Background glows: violet top-right, gold bottom-left, faint centre

### 4.3 Stats Bar
Four stats in a 4-column grid, separated by subtle borders:
| Stat | Label |
|---|---|
| 100% | Client Satisfaction |
| 3× | Avg. Conversion Lift |
| 14d | Avg. First Delivery |
| ∞ | Revisions Until Perfect |

Stats use Cinzel + gold→violet gradient. Labels in small-caps, low-opacity white.

### 4.4 Services Section
- Section eyebrow: `WHAT WE DO`
- Section heading: `Three Pillars. One Standard.`
- Three equal cards in a row:
  1. **Web Design & Development** — pixel-perfect sites from landing pages to complex platforms
  2. **AI Integration** — chatbots, workflow automation, AI-powered products
  3. **Full-Stack Development** — end-to-end apps, database to UI
- Each card: icon (geometric symbol), Cinzel title, body copy, `Learn more →` text link
- Card style: dark fill, subtle border, gold radial glow on hover, lifts on hover

### 4.5 CTA Banner
- Full-width banner with gold→violet gradient background tint
- Left: heading `Ready to Build Something Sovereign?` + subtext
- Right: `Book a Call` (primary) + `Send a Message` (ghost)
- Decorative glows echoing the hero

### 4.6 Footer
- Left: `SOVEREIGN` logotype (smaller)
- Right: `© 2026 Sovereign. All rights reserved.`
- Top border: `rgba(255,255,255,0.06)`

---

## 5. Responsive Behaviour

**Desktop (≥1024px):** Full layout as described. Nav horizontal. Services 3-column. Stats 4-column. CTA banner side-by-side.

**Tablet (768px–1023px):** Services 2-column (third card full-width). Stats 2×2 grid. CTA banner stacks vertically, centred.

**Mobile (<768px):**
- Nav: logo left, hamburger right — links hidden in a slide-down drawer
- Hero: font sizes scale down (`clamp`), CTA buttons stack vertically
- Stats: 2×2 grid
- Services: 1-column stack
- CTA banner: stacked, centred, full-width buttons
- Padding reduced to `20px` horizontal

All breakpoints use `clamp()` for fluid type scaling. No layout breaks at any viewport width.

---

## 6. Interactions

- Every clickable element has `hover`, `focus-visible`, and `active` states — no exceptions
- Buttons: lift (`translateY(-2px)`) + shadow intensify on hover
- Service cards: lift + border brightens on hover
- Nav links: opacity increases on hover
- Animate `transform` and `opacity` only — never `transition-all`
- Scroll indicator: `opacity` fade animation on the descending line

---

## 7. Implementation Notes

- Single `index.html` file, all styles inline or in a `<style>` block
- Tailwind CSS via CDN for utility classes where helpful; custom properties for brand colours
- No external JS dependencies — vanilla only
- Fonts via Google Fonts CDN: `Cinzel`, `Space Grotesk`, `Cormorant Garamond`
- Placeholder images via `https://placehold.co/` if needed (no images in current design)
- Served via `node serve.mjs` at `http://localhost:3000`
- Screenshots taken via `node screenshot.mjs http://localhost:3000`
- Minimum 2 screenshot comparison rounds (desktop + mobile viewport)