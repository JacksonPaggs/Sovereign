# Grand Valley Locksmith — Demo Landing Page Design

**Date:** 2026-05-24  
**Purpose:** Demo page to showcase at client meeting on 2026-05-25 at 3pm  
**Client:** Grand Valley Locksmith Service, Grand Junction CO  
**Deliverable:** Single `locksmith-demo.html` file, all styles inline, served via `node serve.mjs`

---

## Goal

Replace the client's generic WordPress site with a conversion-focused, highly interactive demo that shows them what their brand could look like. The demo should be impressive enough to close the deal in the room — not just "nicer," but fundamentally different in how it converts.

---

## Color System

| Token | Value | Role |
|---|---|---|
| `--navy` | `#1A2332` | Primary dark, nav, headings |
| `--amber` | `#C8922A` | Accent — brass/key — CTAs, highlights |
| `--amber-light` | `#E8B04A` | Hover state for amber elements |
| `--base` | `#F8F7F4` | Page background (warm off-white) |
| `--base-2` | `#EFEDE8` | Elevated surfaces, card backgrounds |
| `--text` | `#2D2D2D` | Primary body text |
| `--text-mid` | `#6B6B6B` | Secondary / supporting text |
| `--rule` | `#DDD9D0` | Borders and dividers |
| `--white` | `#FFFFFF` | Pure white for contrast moments |

---

## Typography

- **Headings:** `Bebas Neue` 400 — bold, strong, blue-collar authority
- **Body / UI:** `Inter` 400–700 — clean, legible, professional
- Both loaded via Google Fonts CDN

---

## Sections (in order)

### 1. Navigation
- Fixed, transparent on load → navy fill on scroll (smooth transition, `transform` + `opacity`)
- Left: Logo mark + "Grand Valley Locksmith" wordmark
- Right: Phone number `(970) 201-0403` displayed as text + "Get Help Now" amber CTA button
- Mobile: hamburger menu (nav links collapse, phone + CTA remain visible)
- Nav links: Services, About, Emergency, Contact

### 2. Hero
- Full-viewport height
- Left column (60%): 
  - Headline: *"Locked Out? We'll Get You Back In."* — large Bebas Neue
  - Subhead: *"Fast, honest locksmith service for Grand Junction, Fruita, Palisade, and the Western Slope."*
  - Two buttons: "Call Now — (970) 201-0403" (amber, primary, links to `tel:9702010403`) + "Schedule a Service" (ghost, secondary, smooth-scrolls to CTA banner section)
  - Letter-stagger fade-in on headline on page load
- Right column (40%):
  - Large SVG padlock — **scroll-driven unlock animation** (see Animations section)
- Background: warm off-white with a subtle dot grid texture, navy atmospheric glow bottom-right

### 3. Trust Bar
- 3 columns, scroll-triggered counter animations:
  - **15+ Years** of Local Service
  - **5,000+ Jobs** Completed
  - **Grand Junction & Western Slope** — Service Area
- Clean, bordered row on `base-2`

### 4. Services
- 3 cards: Residential · Commercial · Automotive
- Each card: keyhole icon, service title, 2-line description
- Hover: keyhole icon animates a subtle "click" scale + rotate, card lifts with layered shadow, amber accent line sweeps across top border
- Cursor spotlight effect across the section — soft light follows mouse

### 5. Emergency Callout Band
- Full-width, navy background
- Large headline: *"Locked Out Right Now?"*
- Subhead: *"Call us. If we're available, we'll respond immediately."*
- Phone number `(970) 201-0403` — oversized, amber, **slow pulse glow animation** (stops on hover)
- Secondary note: "After-hours availability varies — we'll always pick up when we can."

### 6. About / Local Credibility
- Left: Short human copy — formerly Ken's Services, Western Slope roots, honest pricing, small-town trust
- Right: Photo placeholder (`placehold.co`) with amber border treatment + subtle parallax on scroll
- Scroll-reveal fade-in

### 7. CTA Banner
- Navy background, amber atmospheric glow
- Headline: *"Ready to Work With a Locksmith You Can Actually Trust?"*
- Subtext: *"No hidden fees. No runaround. Just fast, honest service."*
- Two buttons: "Call Now" (amber, `tel:9702010403`) + "Send a Message" (ghost, `sms:9702010403`)

### 8. Footer
- Dark navy, minimal
- Logo + tagline + phone + service area text + copyright

---

## Animations & Interactions

### Lock Unlock (Hero — Scroll Driven)
- SVG padlock built inline
- On page load: locked state (shackle down, body closed)
- As user scrolls 0→300px, shackle rises via `transform: translateY()` driven by `window.scrollY`
- Simultaneously: lock body gains a subtle amber glow
- At full unlock (scrolled 300px): lock "clicks" open with a quick `scale(1.05)` bounce
- Headline letters stagger-fade in on load (not scroll-driven — fires immediately)

### Magnetic Buttons
- All primary CTA buttons attract the cursor within a 60px radius
- `mousemove` listener calculates offset, applies `transform: translate(x, y)` capped at ±8px
- Resets smoothly on `mouseleave` with spring easing

### Service Card Keyhole
- On `mouseenter`: keyhole SVG scales `1 → 1.15` + rotates `0 → 12deg` over `300ms`
- Amber line sweeps left → right across top border via `scaleX` transform
- Card shadow deepens with layered box-shadow transition

### Emergency Phone Pulse
- Keyframe animation: amber glow pulses outward from phone number, 2s loop
- `animation-play-state: paused` on hover — stops immediately, feels responsive

### Trust Bar Counters
- IntersectionObserver fires when trust bar enters viewport
- Each number counts from 0 to target over 1.5s with easing
- Uses `requestAnimationFrame` — no library needed

### Cursor Spotlight (Services)
- `mousemove` on services section updates a CSS custom property `--x` / `--y`
- Radial gradient centered on cursor, `pointer-events: none` overlay
- Subtle — `rgba(200, 146, 42, 0.06)` so it illuminates without distracting

### Scroll Reveals
- IntersectionObserver: `rootMargin: '0px 0px -80px 0px'`
- Elements start `opacity: 0; transform: translateY(20px)`
- Transition to `opacity: 1; transform: translateY(0)` over `600ms` spring easing
- Staggered per section using `transition-delay` on children

### Nav Scroll Fill
- `opacity: 0; background: transparent` → `opacity: 1; background: navy` when `scrollY > 60`
- `transform` + `opacity` only, no height/padding transitions

---

## Animation Rules (from emilkowal-animations best practices)
- Only animate `transform` and `opacity` — never layout properties
- Spring easing: `cubic-bezier(0.16, 1, 0.3, 1)` for interactions
- Ambient easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for background/nav
- Active states: `scale(0.97)` at `100ms`, release at `200ms`
- Respect `prefers-reduced-motion` — wrap all animations in a media query check

---

## File Structure
- Single file: `locksmith-demo.html` in project root
- All styles inline in `<style>` block
- All JS inline in `<script>` block at bottom of body
- Google Fonts loaded via CDN link in `<head>`
- No external JS libraries — vanilla only
- Placeholder images via `https://placehold.co/`

---

## Skills to Invoke During Implementation
1. `frontend-design` — primary implementation
2. `emilkowal-animations` — animation quality check
3. `design-taste-frontend` — UI/UX enforcement
4. `impeccable` — final polish pass

---

## Success Criteria
- Loads and runs correctly via `node serve.mjs` at `http://localhost:3000/locksmith-demo.html`
- Lock scroll animation works smoothly on desktop
- All hover interactions feel premium and responsive
- Phone number visible and clickable at all scroll positions
- Looks nothing like their current WordPress site
- Client walks away thinking "I need this"
