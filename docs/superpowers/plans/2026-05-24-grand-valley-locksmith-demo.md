# Grand Valley Locksmith Demo Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file interactive demo landing page for Grand Valley Locksmith to showcase at a client meeting on 2026-05-25 at 3pm.

**Architecture:** Single `locksmith-demo.html` file, all CSS inline in `<style>`, all JS inline in `<script>` at bottom of body. No build step, no framework, no external JS libraries. Google Fonts via CDN. Served via `node serve.mjs` at `http://localhost:3000/locksmith-demo.html`.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts (Bebas Neue + Inter), IntersectionObserver API, requestAnimationFrame, SVG inline.

**Skills to invoke:** `frontend-design` (primary), `emilkowal-animations` (animation pass), `design-taste-frontend` (UI quality), `impeccable` (final polish)

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `locksmith-demo.html` | Create | Entire demo — HTML, CSS, JS |

---

### Task 1: Scaffold + CSS Variables + Fonts + Reset

**Files:**
- Create: `locksmith-demo.html`

- [ ] **Step 1: Create the file with base scaffold**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grand Valley Locksmith Service — Grand Junction, CO</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* === CSS VARIABLES === */
    :root {
      --navy:        #1A2332;
      --navy-deep:   #111922;
      --amber:       #C8922A;
      --amber-light: #E8B04A;
      --amber-glow:  rgba(200, 146, 42, 0.18);
      --base:        #F8F7F4;
      --base-2:      #EFEDE8;
      --text:        #2D2D2D;
      --text-mid:    #6B6B6B;
      --rule:        #DDD9D0;
      --white:       #FFFFFF;
      --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-ambient: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* === RESET === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--base);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
    }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; color: inherit; }

    /* === TYPOGRAPHY === */
    h1, h2, h3, .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; line-height: 1.1; }
  </style>
</head>
<body>

  <!-- sections go here -->

  <script>
    // JS goes here
  </script>
</body>
</html>
```

- [ ] **Step 2: Start dev server and verify blank page loads**

```bash
node serve.mjs
```
Open `http://localhost:3000/locksmith-demo.html` — expect blank warm off-white page, no errors in console.

- [ ] **Step 3: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: scaffold locksmith demo — base HTML, CSS vars, fonts, reset"
```

---

### Task 2: Navigation

**Files:**
- Modify: `locksmith-demo.html` — add nav HTML + CSS

- [ ] **Step 1: Add nav HTML inside `<body>` before the script tag**

```html
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="#" class="nav-logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="20" height="14" rx="2" fill="var(--amber)"/>
        <path d="M9 12V9a5 5 0 0 1 10 0v3" stroke="var(--amber)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="14" cy="18" r="2" fill="var(--navy)"/>
        <rect x="13" y="19" width="2" height="3" rx="1" fill="var(--navy)"/>
      </svg>
      <span class="nav-wordmark">Grand Valley Locksmith</span>
    </a>
    <div class="nav-right">
      <a href="tel:9702010403" class="nav-phone">(970) 201-0403</a>
      <a href="tel:9702010403" class="btn btn-amber btn-magnetic nav-cta">Get Help Now</a>
      <button class="nav-hamburger" id="navHamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav-mobile-menu" id="navMobileMenu">
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#emergency">Emergency</a>
    <a href="#contact">Contact</a>
    <a href="tel:9702010403" class="btn btn-amber" style="margin-top:8px;">Call (970) 201-0403</a>
  </div>
</nav>
```

- [ ] **Step 2: Add nav CSS inside `<style>`**

```css
/* === NAV === */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 400ms var(--ease-ambient), box-shadow 400ms var(--ease-ambient);
}
.nav.scrolled {
  background: var(--navy);
  box-shadow: 0 2px 24px rgba(0,0,0,0.18);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--white);
}
.nav-wordmark {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  color: var(--white);
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav-phone {
  color: var(--white);
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0.9;
  transition: opacity 200ms;
}
.nav-phone:hover { opacity: 1; }

/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-spring), background 200ms;
  will-change: transform;
}
.btn:active { transform: scale(0.97) !important; transition-duration: 100ms; }
.btn-amber {
  background: var(--amber);
  color: var(--white);
  box-shadow: 0 2px 12px rgba(200,146,42,0.3);
}
.btn-amber:hover {
  background: var(--amber-light);
  box-shadow: 0 4px 20px rgba(200,146,42,0.45);
}
.btn-ghost {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255,255,255,0.5);
}
.btn-ghost:hover {
  border-color: var(--white);
  background: rgba(255,255,255,0.08);
}
.btn-ghost-navy {
  background: transparent;
  color: var(--navy);
  border: 2px solid var(--navy);
}
.btn-ghost-navy:hover {
  background: var(--navy);
  color: var(--white);
}

/* Hamburger */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: transform 300ms var(--ease-spring), opacity 200ms;
}
.nav-mobile-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: var(--navy);
  padding: 16px 32px 24px;
}
.nav-mobile-menu a {
  color: var(--white);
  font-weight: 500;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  opacity: 0.9;
}
.nav-mobile-menu a:hover { opacity: 1; }
.nav-mobile-menu.open { display: flex; }

@media (max-width: 768px) {
  .nav-hamburger { display: flex; }
  .nav-phone { display: none; }
  .nav-cta { display: none; }
}
```

- [ ] **Step 3: Add nav scroll + hamburger JS inside `<script>`**

```javascript
// Nav scroll fill
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hamburger
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
```

- [ ] **Step 4: Screenshot and verify nav**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html nav-check
```
Read `temporary screenshots/screenshot-N-nav-check.png`. Expect: blank page with fixed navy-less nav (transparent since no scroll). Fonts loaded, logo visible.

- [ ] **Step 5: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add nav — fixed, scroll-fill, hamburger mobile"
```

---

### Task 3: Hero Layout (Structure + Styles, No Animations Yet)

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add hero HTML after `<nav>`**

```html
<section class="hero" id="hero">
  <!-- dot grid background -->
  <div class="hero-dots"></div>
  <div class="hero-glow"></div>

  <div class="hero-inner">
    <!-- Left column -->
    <div class="hero-content">
      <div class="hero-badge">Grand Junction's Trusted Locksmith</div>
      <h1 class="hero-headline" id="heroHeadline">
        <span class="hl-word">Locked</span>
        <span class="hl-word">Out?</span>
        <br>
        <span class="hl-word hl-amber">We'll</span>
        <span class="hl-word hl-amber">Get</span>
        <span class="hl-word hl-amber">You</span>
        <span class="hl-word hl-amber">Back</span>
        <span class="hl-word hl-amber">In.</span>
      </h1>
      <p class="hero-sub">Fast, honest locksmith service for Grand Junction, Fruita, Palisade, and the Western Slope.</p>
      <div class="hero-buttons">
        <a href="tel:9702010403" class="btn btn-amber btn-magnetic btn-lg">
          Call Now — (970) 201-0403
        </a>
        <a href="#contact" class="btn btn-ghost btn-lg">
          Schedule a Service
        </a>
      </div>
    </div>

    <!-- Right column — lock SVG placeholder for now -->
    <div class="hero-visual" id="heroVisual">
      <!-- SVG lock added in Task 4 -->
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero CSS**

```css
/* === HERO === */
.hero {
  position: relative;
  min-height: 100vh;
  background: var(--navy);
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(200,146,42,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 32px 80px;
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 80px;
  align-items: center;
  width: 100%;
}
.hero-badge {
  display: inline-block;
  background: rgba(200,146,42,0.15);
  border: 1px solid rgba(200,146,42,0.3);
  color: var(--amber-light);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 24px;
}
.hero-headline {
  font-size: clamp(3.5rem, 7vw, 6rem);
  color: var(--white);
  margin-bottom: 24px;
  line-height: 1.0;
}
.hl-amber { color: var(--amber); }
.hl-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 500ms var(--ease-spring), transform 500ms var(--ease-spring);
}
.hl-word.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-sub {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.7);
  max-width: 520px;
  margin-bottom: 40px;
  line-height: 1.7;
}
.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.btn-lg { padding: 16px 36px; font-size: 1rem; }
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
  .hero-sub { margin: 0 auto 40px; }
  .hero-buttons { justify-content: center; }
  .hero-visual { order: -1; }
}
```

- [ ] **Step 3: Screenshot and verify hero layout**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html hero-layout
```
Expect: Navy hero, large Bebas Neue headline visible (opacity 0 on hl-word spans is OK for now), amber badge, two buttons. Right column empty.

- [ ] **Step 4: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add hero layout — headline, sub, CTAs, grid structure"
```

---

### Task 4: SVG Lock + Scroll Animation

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add SVG lock inside `.hero-visual`**

Replace `<!-- SVG lock added in Task 4 -->` with:

```html
<div class="lock-wrapper" id="lockWrapper">
  <svg class="lock-svg" id="lockSvg" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Ambient glow filter -->
    <defs>
      <filter id="ambientGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glowStrong" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="14" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- Shackle (the U-shape on top) — animates upward on scroll -->
    <g id="lockShackle" style="transform: translateY(0px); transition: transform 0ms linear;">
      <path d="M65 110 L65 70 Q65 30 100 30 Q135 30 135 70 L135 110"
            stroke="rgba(200,146,42,0.9)" stroke-width="14" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Lock body -->
    <rect x="30" y="105" width="140" height="120" rx="12"
          fill="var(--navy-deep)" stroke="rgba(200,146,42,0.4)" stroke-width="2"/>

    <!-- Lock body shine -->
    <rect x="30" y="105" width="140" height="40" rx="12"
          fill="rgba(255,255,255,0.04)"/>

    <!-- Keyhole -->
    <circle cx="100" cy="158" r="16" fill="rgba(200,146,42,0.15)" stroke="var(--amber)" stroke-width="2.5"/>
    <circle cx="100" cy="155" r="8" fill="var(--amber)" opacity="0.9"/>
    <rect x="96" y="161" width="8" height="16" rx="4" fill="var(--amber)" opacity="0.9"/>

    <!-- Ambient glow (grows on unlock) -->
    <circle id="lockGlow" cx="100" cy="158" r="50"
            fill="rgba(200,146,42,0)" filter="url(#glowStrong)"/>

    <!-- Decorative tick marks around body -->
    <line x1="48" y1="118" x2="48" y2="128" stroke="rgba(200,146,42,0.2)" stroke-width="1.5"/>
    <line x1="60" y1="112" x2="60" y2="119" stroke="rgba(200,146,42,0.2)" stroke-width="1.5"/>
    <line x1="140" y1="112" x2="140" y2="119" stroke="rgba(200,146,42,0.2)" stroke-width="1.5"/>
    <line x1="152" y1="118" x2="152" y2="128" stroke="rgba(200,146,42,0.2)" stroke-width="1.5"/>
  </svg>
</div>
```

- [ ] **Step 2: Add lock wrapper CSS**

```css
/* === LOCK === */
.lock-wrapper {
  position: relative;
  width: 280px;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lock-svg {
  width: 220px;
  height: auto;
  filter: drop-shadow(0 0 40px rgba(200,146,42,0.1));
  transition: filter 300ms var(--ease-spring);
}
.lock-svg.unlocked {
  filter: drop-shadow(0 0 60px rgba(200,146,42,0.35));
}
```

- [ ] **Step 3: Add scroll animation JS**

Add inside `<script>`:

```javascript
// Lock scroll animation
const lockShackle = document.getElementById('lockShackle');
const lockGlow = document.getElementById('lockGlow');
const lockSvg = document.getElementById('lockSvg');

let lastScrollY = 0;
let ticking = false;

function updateLock() {
  const scrollY = window.scrollY;
  const maxScroll = 320;
  const progress = Math.min(scrollY / maxScroll, 1);

  // Shackle rises: translateY 0 → -28px
  const shackleY = -(progress * 28);
  lockShackle.style.transform = `translateY(${shackleY}px)`;

  // Glow grows: rgba opacity 0 → 0.25
  const glowOpacity = progress * 0.25;
  lockGlow.setAttribute('fill', `rgba(200,146,42,${glowOpacity})`);

  // Unlocked class at 90% progress
  lockSvg.classList.toggle('unlocked', progress > 0.9);

  // Bounce at full unlock (fires once)
  if (progress >= 1 && !lockSvg.dataset.bounced) {
    lockSvg.dataset.bounced = 'true';
    lockSvg.style.transform = 'scale(1.06)';
    lockSvg.style.transition = 'transform 200ms var(--ease-spring)';
    setTimeout(() => {
      lockSvg.style.transform = 'scale(1)';
      setTimeout(() => { lockSvg.style.transition = ''; }, 200);
    }, 200);
  }
  if (progress < 1) lockSvg.dataset.bounced = '';

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateLock);
    ticking = true;
  }
}, { passive: true });
```

- [ ] **Step 4: Add headline letter-stagger on load JS**

```javascript
// Hero headline letter stagger
window.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.hl-word');
  words.forEach((word, i) => {
    setTimeout(() => word.classList.add('visible'), 150 + i * 80);
  });
});
```

- [ ] **Step 5: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html lock-static
```
Expect: Lock SVG visible in right column, amber keyhole, shackle in locked position. Headline words visible (animation fires on DOMContentLoaded).

- [ ] **Step 6: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add SVG lock with scroll-driven unlock animation + headline stagger"
```

---

### Task 5: Trust Bar with Counter Animation

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add trust bar HTML after `</section>` (hero close)**

```html
<section class="trust-bar" id="trustBar">
  <div class="trust-inner">
    <div class="trust-item">
      <span class="trust-number" data-target="15" data-suffix="+">0</span>
      <span class="trust-label">Years of Local Service</span>
    </div>
    <div class="trust-divider"></div>
    <div class="trust-item">
      <span class="trust-number" data-target="5000" data-suffix="+">0</span>
      <span class="trust-label">Jobs Completed</span>
    </div>
    <div class="trust-divider"></div>
    <div class="trust-item">
      <span class="trust-number trust-text" data-text="Western Slope">—</span>
      <span class="trust-label">Service Area</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add trust bar CSS**

```css
/* === TRUST BAR === */
.trust-bar {
  background: var(--base-2);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.trust-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0;
}
.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms var(--ease-spring), transform 600ms var(--ease-spring);
}
.trust-item.visible { opacity: 1; transform: translateY(0); }
.trust-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: var(--amber);
  line-height: 1;
}
.trust-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-mid);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.trust-divider {
  width: 1px;
  height: 60px;
  background: var(--rule);
  margin: 0 40px;
}
@media (max-width: 700px) {
  .trust-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .trust-divider { display: none; }
}
```

- [ ] **Step 3: Add counter animation JS**

```javascript
// Trust bar counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = (current >= 1000 ? (current / 1000).toFixed(1) + 'k' : current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const trustObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    bar.querySelectorAll('.trust-item').forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
        const numEl = item.querySelector('.trust-number[data-target]');
        if (numEl) animateCounter(numEl);
        const textEl = item.querySelector('.trust-number.trust-text');
        if (textEl) textEl.textContent = textEl.dataset.text;
      }, i * 150);
    });
    trustObserver.unobserve(bar);
  });
}, { rootMargin: '0px 0px -80px 0px' });

trustObserver.observe(document.getElementById('trustBar'));
```

- [ ] **Step 4: Screenshot**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html trust-bar
```
Expect: Trust bar below hero, 3 columns, amber numbers, amber dividers. (Numbers may show 0 in static screenshot — that's fine.)

- [ ] **Step 5: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add trust bar with scroll-triggered counter animation"
```

---

### Task 6: Services Section + Cursor Spotlight

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add services HTML after trust bar**

```html
<section class="services" id="services">
  <div class="services-spotlight" id="servicesSpotlight"></div>
  <div class="services-inner">
    <div class="services-header reveal">
      <p class="section-label">What We Do</p>
      <h2>Locksmith Services<br>For Every Situation</h2>
    </div>
    <div class="services-grid">
      <div class="service-card reveal">
        <div class="service-card-accent"></div>
        <div class="service-icon" id="icon1">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="keyhole-icon">
            <rect x="8" y="20" width="32" height="24" rx="4" stroke="var(--amber)" stroke-width="2.5"/>
            <path d="M16 20V16a8 8 0 0 1 16 0v4" stroke="var(--amber)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="24" cy="31" r="4" fill="var(--amber)"/>
            <rect x="22" y="33" width="4" height="6" rx="2" fill="var(--amber)"/>
          </svg>
        </div>
        <h3>Residential</h3>
        <p>Home lockouts, re-keys, lock upgrades, and deadbolt installation. We keep your family safe.</p>
      </div>
      <div class="service-card reveal">
        <div class="service-card-accent"></div>
        <div class="service-icon" id="icon2">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="keyhole-icon">
            <rect x="4" y="12" width="40" height="30" rx="4" stroke="var(--amber)" stroke-width="2.5"/>
            <rect x="18" y="28" width="12" height="14" rx="2" stroke="var(--amber)" stroke-width="2"/>
            <circle cx="24" cy="25" r="3" fill="var(--amber)"/>
            <line x1="4" y1="20" x2="44" y2="20" stroke="var(--amber)" stroke-width="2" opacity="0.4"/>
          </svg>
        </div>
        <h3>Commercial</h3>
        <p>Master key systems, access control, high-security locks for offices and storefronts.</p>
      </div>
      <div class="service-card reveal">
        <div class="service-card-accent"></div>
        <div class="service-icon" id="icon3">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="keyhole-icon">
            <rect x="4" y="16" width="40" height="24" rx="6" stroke="var(--amber)" stroke-width="2.5"/>
            <circle cx="14" cy="38" r="5" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <circle cx="34" cy="38" r="5" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <circle cx="24" cy="28" r="4" fill="var(--amber)"/>
            <rect x="22" y="30" width="4" height="5" rx="2" fill="var(--amber)"/>
          </svg>
        </div>
        <h3>Automotive</h3>
        <p>Locked out of your car? Lost your keys? We handle car lockouts and key programming.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add services CSS**

```css
/* === SERVICES === */
.services {
  position: relative;
  background: var(--base);
  padding: 100px 0;
  overflow: hidden;
}
.services-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle 200px at var(--mx, 50%) var(--my, 50%), rgba(200,146,42,0.06), transparent 70%);
  transition: background 100ms;
}
.services-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.services-header {
  margin-bottom: 64px;
}
.services-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--navy);
  line-height: 1.1;
}
.section-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--amber);
  margin-bottom: 12px;
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.service-card {
  position: relative;
  background: var(--white);
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 40px 32px;
  cursor: default;
  transition: transform 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring);
  overflow: hidden;
}
.service-card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--amber);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 400ms var(--ease-spring);
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(26,35,50,0.1), 0 2px 8px rgba(26,35,50,0.06);
}
.service-card:hover .service-card-accent { transform: scaleX(1); }
.service-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  transition: transform 300ms var(--ease-spring);
}
.service-card:hover .service-icon { transform: scale(1.1) rotate(6deg); }
.service-icon svg { width: 100%; height: 100%; }
.service-card h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  color: var(--navy);
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}
.service-card p {
  color: var(--text-mid);
  font-size: 0.95rem;
  line-height: 1.65;
}
@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Add cursor spotlight JS**

```javascript
// Cursor spotlight on services section
const servicesSection = document.querySelector('.services');
const spotlight = document.getElementById('servicesSpotlight');
servicesSection.addEventListener('mousemove', (e) => {
  const rect = servicesSection.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
  const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
  spotlight.style.setProperty('--mx', x);
  spotlight.style.setProperty('--my', y);
  spotlight.style.background = `radial-gradient(circle 220px at ${x} ${y}, rgba(200,146,42,0.07), transparent 70%)`;
});
```

- [ ] **Step 4: Screenshot**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html services
```
Expect: 3 service cards on white background, amber icons, clean layout.

- [ ] **Step 5: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add services section with cards, keyhole icons, cursor spotlight"
```

---

### Task 7: Emergency Callout Band

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add emergency band HTML after services section**

```html
<section class="emergency" id="emergency">
  <div class="emergency-inner">
    <div class="emergency-content reveal">
      <p class="section-label" style="color: rgba(255,255,255,0.6);">Available When You Need Us</p>
      <h2>Locked Out Right Now?</h2>
      <p class="emergency-sub">Call us. If we're available, we'll respond immediately. We'll always pick up when we can.</p>
    </div>
    <div class="emergency-phone reveal">
      <a href="tel:9702010403" class="emergency-number">(970) 201-0403</a>
      <p class="emergency-note">After-hours availability varies. Call and we'll do our best.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add emergency CSS including pulse animation**

```css
/* === EMERGENCY === */
.emergency {
  background: var(--navy);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}
.emergency::before {
  content: '';
  position: absolute;
  top: -200px; left: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(200,146,42,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.emergency-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.emergency-content h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--white);
  margin-bottom: 20px;
}
.emergency-sub {
  color: rgba(255,255,255,0.65);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 420px;
}
.emergency-phone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.emergency-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  color: var(--amber);
  letter-spacing: 0.04em;
  animation: phonePulse 2.2s ease-in-out infinite;
  display: inline-block;
  transition: animation-play-state 200ms;
}
.emergency-number:hover {
  animation-play-state: paused;
  color: var(--amber-light);
}
@keyframes phonePulse {
  0%, 100% { text-shadow: 0 0 0 rgba(200,146,42,0); }
  50% { text-shadow: 0 0 30px rgba(200,146,42,0.6), 0 0 60px rgba(200,146,42,0.2); }
}
.emergency-note {
  color: rgba(255,255,255,0.45);
  font-size: 0.85rem;
  font-style: italic;
}
@media (max-width: 768px) {
  .emergency-inner { grid-template-columns: 1fr; gap: 40px; }
  .emergency-phone { align-items: center; text-align: center; }
}
```

- [ ] **Step 3: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add emergency callout band with amber pulse animation"
```

---

### Task 8: About Section

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add about HTML after emergency section**

```html
<section class="about" id="about">
  <div class="about-inner">
    <div class="about-image reveal">
      <img src="https://placehold.co/520x420/1A2332/C8922A?text=Grand+Valley+Locksmith" alt="Grand Valley Locksmith team" class="about-img"/>
      <div class="about-badge-card">
        <span class="about-badge-icon">🔑</span>
        <div>
          <strong>Formerly Ken's Services</strong>
          <span>Same trusted team, new name</span>
        </div>
      </div>
    </div>
    <div class="about-content reveal">
      <p class="section-label">Who We Are</p>
      <h2>Western Slope's Own Since Day One</h2>
      <p>Grand Valley Locksmith Service carries forward a long-standing reputation built right here on the Western Slope. We're not a franchise. We're not a call center that dispatches a stranger. We're your neighbors — and we treat every job like it matters, because to you, it does.</p>
      <p style="margin-top:16px;">Honest pricing. No upsells. No runaround. Just fast, professional service from a team that knows Grand Junction, Fruita, and Palisade like the back of their hand.</p>
      <div class="about-points">
        <div class="about-point">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="rgba(200,146,42,0.15)"/><path d="M6 10l3 3 5-5" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Locally owned and operated
        </div>
        <div class="about-point">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="rgba(200,146,42,0.15)"/><path d="M6 10l3 3 5-5" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Transparent, upfront pricing
        </div>
        <div class="about-point">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="rgba(200,146,42,0.15)"/><path d="M6 10l3 3 5-5" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Serving Grand Junction, Fruita & Palisade
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add about CSS**

```css
/* === ABOUT === */
.about {
  background: var(--base-2);
  padding: 100px 0;
}
.about-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about-image { position: relative; }
.about-img {
  width: 100%;
  border-radius: 8px;
  border: 3px solid var(--amber);
  box-shadow: 8px 8px 0 var(--amber);
}
.about-badge-card {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--white);
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.about-badge-icon { font-size: 1.5rem; }
.about-badge-card strong { display: block; font-size: 0.9rem; color: var(--navy); }
.about-badge-card span { font-size: 0.8rem; color: var(--text-mid); }
.about-content h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--navy);
  margin-bottom: 24px;
}
.about-content p { color: var(--text-mid); line-height: 1.75; }
.about-points {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.about-point {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
}
@media (max-width: 900px) {
  .about-inner { grid-template-columns: 1fr; gap: 60px; }
  .about-badge-card { right: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add about section with local credibility copy and image treatment"
```

---

### Task 9: CTA Banner + Footer

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add CTA banner + footer HTML after about section**

```html
<section class="cta-banner" id="contact">
  <div class="cta-glow"></div>
  <div class="cta-inner reveal">
    <h2>Ready to Work With a Locksmith<br>You Can Actually Trust?</h2>
    <p>No hidden fees. No runaround. Just fast, honest service from people who live here too.</p>
    <div class="cta-buttons">
      <a href="tel:9702010403" class="btn btn-amber btn-lg btn-magnetic">Call Now — (970) 201-0403</a>
      <a href="sms:9702010403" class="btn btn-ghost btn-lg">Send a Message</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="#" class="nav-logo" style="margin-bottom:8px;">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect x="4" y="12" width="20" height="14" rx="2" fill="var(--amber)"/><path d="M9 12V9a5 5 0 0 1 10 0v3" stroke="var(--amber)" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="14" cy="18" r="2" fill="var(--navy)"/><rect x="13" y="19" width="2" height="3" rx="1" fill="var(--navy)"/></svg>
        <span class="nav-wordmark">Grand Valley Locksmith</span>
      </a>
      <p style="color:rgba(255,255,255,0.45); font-size:0.85rem;">Serving Grand Junction, Fruita, Palisade<br>& the Western Slope</p>
    </div>
    <div class="footer-right">
      <a href="tel:9702010403" style="color:var(--amber); font-weight:600;">(970) 201-0403</a>
      <p style="color:rgba(255,255,255,0.35); font-size:0.8rem; margin-top:8px;">© 2026 Grand Valley Locksmith Service. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Add CTA + footer CSS**

```css
/* === CTA BANNER === */
.cta-banner {
  background: var(--navy);
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 400px;
  background: radial-gradient(ellipse, rgba(200,146,42,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 32px;
}
.cta-inner h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--white);
  margin-bottom: 20px;
}
.cta-inner p {
  color: rgba(255,255,255,0.65);
  font-size: 1.1rem;
  margin-bottom: 48px;
  line-height: 1.7;
}
.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* === FOOTER === */
.footer {
  background: var(--navy-deep);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 48px 0;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}
.footer-brand { display: flex; flex-direction: column; }
.footer-right { text-align: right; }
@media (max-width: 600px) {
  .footer-inner { flex-direction: column; text-align: center; }
  .footer-right { text-align: center; }
}
```

- [ ] **Step 3: Screenshot full page**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html full-page
```
Read screenshot — expect all sections visible: hero, trust bar, services, emergency, about, CTA, footer.

- [ ] **Step 4: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add CTA banner and footer — full page structure complete"
```

---

### Task 10: Magnetic Buttons + Scroll Reveal System

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Add scroll reveal CSS**

Add to `<style>`:

```css
/* === SCROLL REVEAL === */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms var(--ease-spring), transform 600ms var(--ease-spring);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Add scroll reveal + magnetic buttons JS**

Add to `<script>`:

```javascript
// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Magnetic buttons
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = 'transform 100ms var(--ease-spring)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 400ms var(--ease-spring)';
  });
});
```

- [ ] **Step 3: Add reduced motion support**

Add to `<style>`:

```css
/* === REDUCED MOTION === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
  .hl-word { opacity: 1; transform: none; }
}
```

- [ ] **Step 4: Screenshot full page with reveal elements forced visible**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html final-full
```
Expect: Full polished page. All sections visible and styled correctly.

- [ ] **Step 5: Commit**

```bash
git add locksmith-demo.html
git commit -m "feat: add scroll reveals, magnetic buttons, reduced motion support"
```

---

### Task 11: Skills Polish Pass

**Files:**
- Modify: `locksmith-demo.html`

- [ ] **Step 1: Invoke frontend-design skill**

Use the `frontend-design` skill to review and polish the full page. Focus on: spacing consistency, color usage, typography hierarchy, button states.

- [ ] **Step 2: Invoke emilkowal-animations skill**

Use the `emilkowal-animations` skill to review all animations. Check: easing curves, duration values, transform-only rule, spring feel on interactions.

- [ ] **Step 3: Invoke design-taste-frontend skill**

Use the `design-taste-frontend` skill to audit the UI. Check: no generic patterns, depth/layering, interactive states.

- [ ] **Step 4: Invoke impeccable skill**

Use the `impeccable` skill for final polish. Focus on visual hierarchy, spacing, any weak areas.

- [ ] **Step 5: Final screenshot comparison**

```bash
node screenshot.mjs http://localhost:3000/locksmith-demo.html final-polished
node screenshot.mjs http://localhost:3000/locksmith-demo.html final-mobile 390
```
Read both screenshots. Verify desktop and mobile both look showcase-ready.

- [ ] **Step 6: Final commit and push**

```bash
git add locksmith-demo.html
git commit -m "feat: grand valley locksmith demo — showcase-ready"
git push
```

---

## Self-Review

**Spec coverage check:**
- ✅ Nav — logo, phone, CTA, scroll fill, hamburger
- ✅ Hero — headline, sub, buttons, lock SVG, dot grid, glow
- ✅ Lock scroll animation — shackle rise, glow, bounce
- ✅ Headline letter stagger on load
- ✅ Trust bar — 3 items, counter animation
- ✅ Services — 3 cards, keyhole icons, spotlight, card hover
- ✅ Emergency band — navy, phone number, pulse animation
- ✅ About — copy, image, badge card, check points
- ✅ CTA banner — navy, glow, two buttons
- ✅ Footer — minimal
- ✅ Magnetic buttons
- ✅ Scroll reveals — all sections
- ✅ Reduced motion
- ✅ Mobile responsive

**Placeholder scan:** No TBD, no TODO, no "implement later" present.

**Type consistency:** All JS IDs match HTML — `lockShackle`, `lockGlow`, `lockSvg`, `heroHeadline`, `trustBar`, `servicesSpotlight`, `navHamburger`, `navMobileMenu` all defined in HTML and referenced correctly in JS.
