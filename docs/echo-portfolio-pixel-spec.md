# Echo Li Portfolio - Retrofuturism Pixel Art Specification
## Warm Pixel Future × Human-Centered Systems

---

## Project Philosophy

Build a **retrofuturistic pixel art interface** that embodies:
- **Pixel Art Aesthetic** (8-bit/16-bit inspired, chunky and proud)
- **Claude's Warmth** (terracotta palette, not cold neon)
- **Retrofuturism** (80s/90s computing meets AI era)
- **System Awareness** (living digital organism, not static page)
- **Human-Centered Values** (approachable nostalgia, not alienating tech)

> "A warm retrofuture where pixels tell stories, systems breathe slowly, and red means presence."

**Core Visual Language:**
- ✅ Chunky pixel borders and UI frames
- ✅ Low-res pixel art graphics (8×8, 16×16 grid)
- ✅ CRT screen aesthetics (subtle scanlines, warm glow)
- ✅ Retro computing elements (system dialogs, terminal windows)
- ✅ 80s sci-fi meets modern minimalism
- ❌ Not: Bright neon cyberpunk, NFT marketplace, gaming UI

---

## 1. PIXEL ART DESIGN SYSTEM

### 1.1 The Pixel Grid

**Resolution Strategy:**
```
Base Unit:           8px × 8px
Pixel Icons:         16×16, 24×24, 32×32, 48×48
Small Graphics:      64×64, 128×128
UI Grid:             8px multiples (can break for fluidity)
```

**CSS Pixel Rendering:**
```css
/* Critical for crisp pixel art */
.pixel-art,
.pixel-icon,
.pixel-border {
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

### 1.2 Pixel Border System

**Primary Frame Style (Bracket Corners):**
```
┌─────────────────────┐
│                     │
│   Content Area      │
│                     │
└─────────────────────┘
```

**CSS Implementation:**
```css
.pixel-frame {
  border: 2px solid var(--line-pixel);
  position: relative;
  padding: var(--space-3);
}

/* Corner brackets using pseudo-elements */
.pixel-frame::before,
.pixel-frame::after {
  content: '';
  position: absolute;
  border: 2px solid var(--accent-primary);
}

/* Top-left corner */
.pixel-frame::before {
  top: -2px;
  left: -2px;
  width: 12px;
  height: 12px;
  border-right: none;
  border-bottom: none;
}

/* Bottom-right corner */
.pixel-frame::after {
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-left: none;
  border-top: none;
}
```

**Alternative: Heavy Box Style**
```
╔═══════════════════╗
║                   ║
║   Content         ║
║                   ║
╚═══════════════════╝
```

```css
.pixel-box {
  border: 3px double var(--accent-primary);
  box-shadow: 
    inset 0 0 0 1px var(--bg-secondary),
    0 4px 0 0 var(--accent-muted);
}
```

### 1.3 Pixel Icons & Glyphs

**System Status Indicators (Unicode + Custom):**
```
▸ Active / Playing
▹ Inactive / Paused
● Online / Connected
○ Offline / Disconnected
■ System / Core
□ User / External
◆ Featured / Important
◇ Optional / Secondary
▲ Ascending / Priority
▼ Descending / Archive
```

**Custom 16×16 Pixel Icons:**

**Signal Icon (animated 3-frame):**
```
Frame 1:    Frame 2:    Frame 3:
  ◆           ◆◆          ◆◆◆
  
Color: --accent-primary
Loop: 1.5s
```

**Loading Spinner (8-frame rotation):**
```
┌─┐  ┌─┐  ┌─┐  ┌─┐
│ │  │ │  │ │  │█│
└─┘  └─┘  └█┘  └─┘
... (8 frames total)
Speed: 100ms/frame
```

**Pixel Cursor (16×16):**
```css
.custom-cursor {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect fill="%238F2C2C" x="0" y="0" width="2" height="14"/><rect fill="%238F2C2C" x="0" y="14" width="6" height="2"/></svg>') 0 0, auto;
}
```

### 1.4 CRT Screen Effects

**Scanline Overlay (Mandatory for Retro Feel):**
```css
.crt-screen {
  position: relative;
  overflow: hidden;
}

.crt-screen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1000;
}
```

**Screen Curvature (Subtle, Optional):**
```css
.crt-curve {
  border-radius: 8px;
  transform: perspective(1000px) rotateX(0.5deg);
}
```

**Phosphor Glow:**
```css
.phosphor-glow {
  text-shadow: 
    0 0 2px var(--accent-primary),
    0 0 4px rgba(143, 44, 44, 0.5);
  filter: brightness(1.1);
}
```

---

## 2. COLOR SYSTEM (Warm Retrofuturistic Palette)

### 2.1 Base Backgrounds (CRT Black)

```css
/* Never pure black - CRT screens had warmth */
--bg-primary: #0E0B0C;      /* Black with red undertone */
--bg-secondary: #121014;    /* Panel background */
--bg-surface: #1A1517;      /* Elevated surfaces */
--bg-terminal: #0A0808;     /* Deep terminal black */
```

### 2.2 Warm Terracotta Red (Claude Palette)

```css
/* Primary Red Hierarchy */
--red-primary: #da7756;      /* Claude's warm terracotta */
--red-bright: #E88968;       /* Hover highlight */
--red-dark: #B84545;         /* Deep emphasis */
--red-muted: #8F2C2C;        /* System presence */
--red-dim: #5C1E1E;          /* Inactive state */

/* Red Tints for UI */
--red-glow: rgba(218, 119, 86, 0.3);
--red-overlay: rgba(218, 119, 86, 0.08);
```

### 2.3 Complementary Retro Colors

```css
/* Sage Green (Human-Centered Accent) */
--green-calm: #7BA591;       /* Calm, natural */
--green-bright: #8FC9A8;     /* Success states */
--green-dim: #5A7D6B;        /* Muted complement */

/* Amber/Yellow (Alert/Emphasis) */
--amber-warm: #F4D03F;       /* Pixel glow accent */
--amber-bright: #FFE066;     /* Highlight */
--amber-muted: #C4A030;      /* Subdued warning */

/* Cool Cyan (Technical/Data) */
--cyan-retro: #5BC0DE;       /* 80s computer blue */
--cyan-dim: #3A9DB5;         /* Muted data viz */
```

**Color Usage Rules:**

| Element | Color | Purpose |
|---------|-------|---------|
| Main accents | `--red-primary` | Primary brand color |
| Hover states | `--red-bright` | Interactive feedback |
| System indices (001) | `--red-dark` | System organization |
| Inactive elements | `--red-dim` | Latent states |
| Success indicators | `--green-calm` | Positive feedback |
| Warnings | `--amber-warm` | Attention needed |
| Data/tech | `--cyan-retro` | Technical info |

### 2.4 Text Colors (Warm Off-White)

```css
/* Never pure white - CRT phosphor warmth */
--text-primary: #E6E1DC;            /* Warm off-white */
--text-secondary: rgba(230,225,220,0.75);
--text-tertiary: rgba(230,225,220,0.5);
--text-system: #B8A9A0;             /* Terminal text */
--text-dim: rgba(230,225,220,0.3);  /* Very subtle */
```

### 2.5 Pixel Borders & Lines

```css
--line-pixel: rgba(218, 119, 86, 0.4);   /* Primary borders */
--line-system: rgba(143, 44, 44, 0.35);  /* System frames */
--line-subtle: rgba(218, 119, 86, 0.2);  /* Separators */
--line-bright: rgba(232, 137, 104, 0.6); /* Active state */
```

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Families (Pixel + Modern Hybrid)

```css
/* Pixel/System Fonts (Primary for Retrofuturism) */
--font-pixel: 'Press Start 2P', 'Courier New', monospace;  /* Pure pixel */
--font-mono: 'JetBrains Mono', 'Consolas', monospace;      /* Modern mono */
--font-system: 'Share Tech Mono', 'Courier New', monospace; /* Sci-fi mono */

/* Display Fonts (Secondary, for Hero/Headers) */
--font-display: 'Space Grotesk', 'Orbitron', sans-serif;   /* Geometric future */
--font-body: 'Inter', -apple-system, sans-serif;           /* Clean readable */
```

**Font Loading:**
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@400;500;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
```

### 3.2 Typography Hierarchy

| Element | Font | Size | Color | Use Case |
|---------|------|------|-------|----------|
| Hero Title | `--font-display` | `--text-3xl` | `--text-primary` | Main statement |
| Pixel Headers | `--font-pixel` | `--text-base` | `--red-primary` | Section titles |
| System Labels | `--font-mono` | `--text-xs` | `--red-dark` | 001 // IDENTITY |
| Body Text | `--font-body` | `--text-base` | `--text-secondary` | Descriptions |
| Marquee | `--font-system` | `--text-sm` | `--red-primary` | Status ticker |
| Terminal | `--font-mono` | `--text-sm` | `--green-calm` | Code/data |

### 3.3 Pixel Font Sizing

**Press Start 2P (True Pixel Font):**
```css
/* This font is VERY large, scale down carefully */
.pixel-text-xs { font-size: 6px; line-height: 1.5; }
.pixel-text-sm { font-size: 8px; line-height: 1.5; }
.pixel-text-base { font-size: 10px; line-height: 1.6; }
.pixel-text-lg { font-size: 12px; line-height: 1.6; }
.pixel-text-xl { font-size: 16px; line-height: 1.6; }

/* Letter spacing: tight for pixel fonts */
letter-spacing: -0.05em;
```

**Modern Font Sizing (Fluid Scale):**
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
--text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-2xl: clamp(2rem, 1.7rem + 1.5vw, 3rem);
--text-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
```

---

## 4. PIXEL ART COMPONENTS

### 4.1 Pixel Button

**Style 1: Retro Button with Shadow**
```css
.btn-pixel {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--red-primary);
  padding: 8px 16px;
  box-shadow: 
    4px 4px 0 0 var(--red-dark),
    4px 4px 0 2px var(--line-pixel);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.btn-pixel:hover {
  transform: translate(2px, 2px);
  box-shadow: 
    2px 2px 0 0 var(--red-dark),
    2px 2px 0 2px var(--line-pixel);
}

.btn-pixel:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
```

**Style 2: Terminal Button**
```css
.btn-terminal {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--green-calm);
  background: transparent;
  border: 1px solid var(--green-calm);
  padding: var(--space-2) var(--space-3);
  position: relative;
}

.btn-terminal::before {
  content: '▸ ';
  color: var(--red-primary);
}

.btn-terminal:hover {
  background: rgba(123, 165, 145, 0.1);
  box-shadow: 0 0 8px var(--green-calm);
}
```

### 4.2 Pixel Card/Panel

```css
.pixel-panel {
  background: var(--bg-secondary);
  border: 3px solid var(--line-pixel);
  padding: var(--space-4);
  position: relative;
  box-shadow: 
    8px 8px 0 0 rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(218, 119, 86, 0.1);
}

/* Pixel corner decorations */
.pixel-panel::before,
.pixel-panel::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--bg-primary);
  border: 2px solid var(--red-primary);
}

.pixel-panel::before {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
}

.pixel-panel::after {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
}

/* Hover glow */
.pixel-panel:hover {
  border-color: var(--red-bright);
  box-shadow: 
    8px 8px 0 0 rgba(0, 0, 0, 0.3),
    0 0 20px rgba(218, 119, 86, 0.2),
    inset 0 0 0 1px var(--red-glow);
}
```

### 4.3 Pixel Avatar/Icon Container

```css
.pixel-avatar {
  width: 64px;
  height: 64px;
  border: 3px solid var(--red-primary);
  image-rendering: pixelated;
  position: relative;
  overflow: hidden;
}

/* Chunky pixel border effect */
.pixel-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 
    inset 0 0 0 2px var(--bg-primary),
    inset 0 0 0 4px var(--line-pixel);
}
```

### 4.4 Pixelated Divider

```html
<div class="pixel-divider">
  <span>■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■</span>
</div>
```

```css
.pixel-divider {
  text-align: center;
  margin: var(--space-6) 0;
  font-family: var(--font-pixel);
  font-size: 6px;
  color: var(--line-pixel);
  letter-spacing: 4px;
  opacity: 0.5;
}
```

---

## 5. MOTION & ANIMATION (Retrofuturistic)

### 5.1 Pixel Animation Principles

**Rule: Animations should feel like old computer graphics**
- Frame-based (not smooth curves)
- Low frame rate aesthetic (8-12 FPS feel)
- Step timing, not ease
- Nostalgic, not jarring

```css
/* Timing Functions */
--ease-pixel: steps(4);           /* Chunky 4-step animation */
--ease-retro: steps(8);           /* Smoother 8-step */
--ease-system: cubic-bezier(0.2, 0.8, 0.2, 1);

/* Durations */
--duration-instant: 0ms;          /* Instant for pixel effects */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
--duration-crawl: 30s;            /* Marquee, grain drift */
```

### 5.2 Pixel Blink Animation

```css
@keyframes pixel-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.blink-cursor {
  animation: pixel-blink 1s steps(1) infinite;
}

.blink-slow {
  animation: pixel-blink 2s steps(1) infinite;
}
```

### 5.3 Scanline Drift

```css
@keyframes scanline-drift {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

.scanlines {
  animation: scanline-drift 8s linear infinite;
}
```

### 5.4 Pixel Glitch (Controlled)

```css
@keyframes pixel-glitch {
  0% { 
    transform: translate(0, 0); 
    opacity: 1; 
  }
  20% { 
    transform: translate(-2px, 1px); 
    opacity: 0.8; 
  }
  40% { 
    transform: translate(2px, -1px); 
    opacity: 1; 
  }
  60% { 
    transform: translate(-1px, 2px); 
    opacity: 0.9; 
  }
  80% { 
    transform: translate(1px, -2px); 
    opacity: 1; 
  }
  100% { 
    transform: translate(0, 0); 
    opacity: 1; 
  }
}

.glitch-on-hover:hover {
  animation: pixel-glitch 200ms steps(4) 1;
}
```

### 5.5 Typewriter Effect (Pixel Style)

```javascript
class PixelTypewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.textContent;
    this.speed = options.speed || 80;  // Slower for pixel feel
    this.element.textContent = '';
    this.currentIndex = 0;
    
    // Add blinking cursor
    this.cursor = document.createElement('span');
    this.cursor.className = 'blink-cursor';
    this.cursor.textContent = '█';  // Block cursor
    this.element.appendChild(this.cursor);
  }
  
  type() {
    if (this.currentIndex < this.text.length) {
      const char = this.text[this.currentIndex];
      this.element.insertBefore(
        document.createTextNode(char), 
        this.cursor
      );
      this.currentIndex++;
      
      // Add typing sound effect (optional)
      this.playTypeSound();
      
      setTimeout(() => this.type(), this.speed);
    } else {
      // Remove cursor when done
      setTimeout(() => {
        this.cursor.remove();
      }, 1000);
    }
  }
  
  playTypeSound() {
    // Optional: Add 8-bit beep sound
    // new Audio('/sounds/type-beep.mp3').play();
  }
  
  start(delay = 0) {
    setTimeout(() => this.type(), delay);
  }
}
```

---

## 6. PAGE STRUCTURE (Retrofuturistic Layout)

### 6.1 System Status Bar (Top Ticker)

**Design: Infinite scrolling pixel marquee**

```html
<div class="system-status">
  <div class="status-marquee">
    <span class="status-text">
      ■ SYSTEM ONLINE ■ ECHO LI ■ PRODUCT × UX × AI ■ 
      HUMAN-CENTERED SYSTEMS ■ STATUS: ACTIVE ■
    </span>
  </div>
</div>
```

```css
.system-status {
  background: var(--bg-terminal);
  border-bottom: 2px solid var(--red-primary);
  height: 40px;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.5);
}

.status-marquee {
  display: flex;
  align-items: center;
  height: 100%;
  animation: marquee-scroll 30s linear infinite;
}

.status-text {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--red-primary);
  white-space: nowrap;
  letter-spacing: 2px;
  padding: 0 var(--space-2);
}

@keyframes marquee-scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

/* Duplicate content for seamless loop */
.status-text::after {
  content: attr(data-text);
  padding-left: 100vw;
}
```

### 6.2 Hero Section (Pixel Art Title)

```html
<section class="hero-pixel">
  <div class="pixel-container">
    <h1 class="hero-title-pixel" data-en="Designing systems people can trust." data-zh="设计值得信赖的系统。">
      <span class="typewriter-pixel"></span>
    </h1>
    
    <p class="hero-subtitle">
      <span data-en="Human-Centered AI & Product Designer" 
            data-zh="以人为本的 AI 与产品设计师">
        Human-Centered AI & Product Designer
      </span>
    </p>
    
    <div class="hero-cta">
      <button class="btn-pixel">
        ▸ VIEW WORK
      </button>
      <button class="btn-pixel">
        ▸ READ SIGNALS
      </button>
    </div>
  </div>
  
  <!-- Optional: Pixel art graphic -->
  <div class="hero-visual">
    <canvas id="pixel-art-hero"></canvas>
  </div>
</section>
```

```css
.hero-pixel {
  min-height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--space-12);
  padding: var(--space-12) var(--space-6);
  position: relative;
}

/* Pixel grid background */
.hero-pixel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 7px,
      rgba(218, 119, 86, 0.03) 7px,
      rgba(218, 119, 86, 0.03) 8px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 7px,
      rgba(218, 119, 86, 0.03) 7px,
      rgba(218, 119, 86, 0.03) 8px
    );
  pointer-events: none;
  z-index: 0;
}

.pixel-container {
  z-index: 1;
}

.hero-title-pixel {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-4);
}

.hero-subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.hero-cta {
  display: flex;
  gap: var(--space-3);
}

@media (max-width: 768px) {
  .hero-pixel {
    grid-template-columns: 1fr;
    min-height: 60vh;
  }
}
```

### 6.3 Main Frame (Retro Two-Panel System)

```html
<section class="main-frame-retro">
  <!-- Left: Pixel Art Visual -->
  <div class="panel-visual pixel-panel">
    <div class="panel-header">
      <span class="pixel-label">SYSTEM_VISUAL.EXE</span>
      <div class="window-controls">
        <span class="control">□</span>
        <span class="control">×</span>
      </div>
    </div>
    <canvas id="retro-visual" width="400" height="400"></canvas>
  </div>
  
  <!-- Right: Info Control Modules -->
  <div class="panel-info">
    <div class="control-module pixel-panel" data-module="001">
      <div class="module-header-pixel">
        <span class="module-number">001</span>
        <span class="module-separator">//</span>
        <span class="module-title" data-en="IDENTITY" data-zh="身份">IDENTITY</span>
      </div>
      <div class="module-content-pixel">
        <p data-en="Human-Centered AI & Product Designer"
           data-zh="以人为本的 AI 与产品设计师">
          Human-Centered AI & Product Designer
        </p>
      </div>
    </div>
    
    <!-- Modules 002-005... -->
  </div>
</section>
```

```css
.main-frame-retro {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--space-8);
  padding: var(--space-12) var(--space-6);
  max-width: 1400px;
  margin: 0 auto;
}

.panel-visual {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2);
  background: var(--bg-terminal);
  border-bottom: 2px solid var(--line-pixel);
  font-family: var(--font-pixel);
  font-size: 8px;
}

.pixel-label {
  color: var(--green-calm);
}

.window-controls {
  display: flex;
  gap: var(--space-2);
  font-size: 10px;
}

.control {
  color: var(--red-primary);
  cursor: pointer;
}

.control:hover {
  color: var(--red-bright);
}

canvas {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}

.control-module {
  margin-bottom: var(--space-4);
  transition: all var(--duration-base);
}

.control-module:hover {
  transform: translateX(4px);
  box-shadow: 
    12px 12px 0 0 rgba(0, 0, 0, 0.3),
    0 0 20px var(--red-glow);
}

.module-header-pixel {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.module-number {
  color: var(--red-bright);
  font-weight: 600;
  font-size: var(--text-base);
}

.module-separator {
  color: var(--text-tertiary);
}

.module-title {
  color: var(--text-system);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.module-content-pixel {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .main-frame-retro {
    grid-template-columns: 1fr;
  }
}
```

### 6.4 Signals Section (Pixel Log Style)

```html
<section class="signals-retro">
  <div class="section-header-pixel">
    <span class="section-index">006</span>
    <span class="section-separator">//</span>
    <h2 class="section-title-pixel">
      <span data-en="SIGNALS" data-zh="信号">SIGNALS</span>
    </h2>
  </div>
  
  <div class="signal-log">
    <article class="signal-entry">
      <div class="signal-meta">
        <span class="signal-id">SIGNAL_014</span>
        <span class="signal-status">[NEW]</span>
        <span class="signal-date">2025.01.02</span>
      </div>
      
      <h3 class="signal-title">
        Designing Calm Interfaces in Intelligent Systems
      </h3>
      
      <div class="signal-tags">
        <span class="tag">◆ AI × UX</span>
        <span class="tag">■ 6 min read</span>
      </div>
      
      <a href="#" class="signal-link btn-terminal">
        ▸ READ_SIGNAL
      </a>
    </article>
    
    <!-- More signals... -->
  </div>
</section>
```

```css
.signals-retro {
  max-width: 1200px;
  margin: var(--space-16) auto;
  padding: 0 var(--space-6);
}

.section-header-pixel {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  font-family: var(--font-pixel);
}

.section-index {
  font-size: 16px;
  color: var(--red-primary);
}

.section-separator {
  color: var(--text-tertiary);
  font-size: 16px;
}

.section-title-pixel {
  font-size: 16px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
}

.signal-log {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.signal-entry {
  background: var(--bg-secondary);
  border-left: 4px solid var(--red-primary);
  padding: var(--space-4);
  transition: all var(--duration-base);
}

.signal-entry:hover {
  border-left-color: var(--red-bright);
  box-shadow: 0 0 20px var(--red-glow);
  transform: translateX(8px);
}

.signal-meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.signal-id {
  color: var(--red-primary);
  font-weight: 600;
}

.signal-status {
  background: var(--amber-warm);
  color: var(--bg-primary);
  padding: 2px 8px;
  font-size: 8px;
  font-family: var(--font-pixel);
}

.signal-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin: var(--space-2) 0;
}

.signal-tags {
  display: flex;
  gap: var(--space-2);
  margin: var(--space-3) 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.tag {
  color: var(--text-secondary);
  background: rgba(218, 119, 86, 0.1);
  padding: 4px 8px;
  border: 1px solid var(--line-subtle);
}
```

---

## 7. BILINGUAL SYSTEM (EN/中文)

### 7.1 Language Toggle (Pixel Style)

```html
<div class="lang-toggle-pixel">
  <button class="lang-btn pixel-btn" data-lang="en">
    EN
  </button>
  <span class="lang-sep">|</span>
  <button class="lang-btn pixel-btn" data-lang="zh">
    中文
  </button>
</div>
```

```css
.lang-toggle-pixel {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-pixel);
  font-size: 8px;
}

.lang-btn {
  background: transparent;
  border: 1px solid var(--line-pixel);
  color: var(--text-tertiary);
  padding: 4px 8px;
  cursor: pointer;
  transition: all var(--duration-fast);
}

.lang-btn.active {
  background: var(--red-primary);
  color: var(--bg-primary);
  border-color: var(--red-primary);
}

.lang-btn:hover:not(.active) {
  color: var(--red-bright);
  border-color: var(--red-bright);
}

.lang-sep {
  color: var(--text-tertiary);
}
```

### 7.2 Chinese Typography Optimization

```css
/* Chinese-specific font stack */
html[lang="zh"] {
  font-family: 
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    'WenQuanYi Micro Hei',
    sans-serif;
}

/* Adjust line height for Chinese characters */
html[lang="zh"] .hero-title-pixel,
html[lang="zh"] h1, 
html[lang="zh"] h2, 
html[lang="zh"] h3 {
  line-height: 1.5;  /* Taller for better readability */
}

/* Mono fonts still work for Chinese in system contexts */
html[lang="zh"] .module-header-pixel,
html[lang="zh"] .signal-meta {
  font-family: var(--font-mono);
}
```

### 7.3 Translation Switching Logic

```javascript
const languageSystem = {
  current: 'en',
  
  init() {
    this.loadPreference();
    this.bindEvents();
    this.applyLanguage();
  },
  
  bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTo(e.target.dataset.lang);
      });
    });
  },
  
  switchTo(lang) {
    this.current = lang;
    
    // Update all bilingual content
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
      const text = lang === 'en' ? el.dataset.en : el.dataset.zh;
      
      // Preserve typewriter if active
      if (el.classList.contains('typewriter-active')) {
        this.restartTypewriter(el, text);
      } else {
        el.textContent = text;
      }
    });
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('preferred-language', lang);
    
    // Optional: Play pixel beep sound
    this.playSwitch Sound();
  },
  
  loadPreference() {
    const saved = localStorage.getItem('preferred-language');
    if (saved) this.current = saved;
  },
  
  applyLanguage() {
    this.switchTo(this.current);
  },
  
  playSwitchSound() {
    // Optional 8-bit beep
    // new Audio('/sounds/switch.mp3').play();
  }
};

// Initialize
languageSystem.init();
```

---

## 8. PIXEL ART VISUALS (Canvas Graphics)

### 8.1 Rotating Hermetic Symbol (Pixel Art)

```javascript
class PixelHermeticSymbol {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixelSize = 4;  // 4px pixels for retro feel
    this.rotation = 0;
    this.rotationSpeed = 0.002;
    
    this.resize();
    this.animate();
  }
  
  resize() {
    const size = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.canvas.width = size;
    this.canvas.height = size;
    this.centerX = size / 2;
    this.centerY = size / 2;
    this.radius = size * 0.35;
  }
  
  drawPixel(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.floor(x / this.pixelSize) * this.pixelSize,
      Math.floor(y / this.pixelSize) * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
  }
  
  draw() {
    // Clear with background
    this.ctx.fillStyle = '#0E0B0C';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.rotation);
    
    // Draw pixelated geometric symbol
    const points = 8;
    const colors = ['#da7756', '#B84545', '#8F2C2C'];
    
    for (let layer = 0; layer < 3; layer++) {
      const layerRadius = this.radius * (0.3 + layer * 0.25);
      const color = colors[layer];
      
      for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 / points) * i;
        const x = Math.cos(angle) * layerRadius;
        const y = Math.sin(angle) * layerRadius;
        
        // Draw pixel blocks
        for (let px = -2; px <= 2; px++) {
          for (let py = -2; py <= 2; py++) {
            this.drawPixel(
              x + px * this.pixelSize,
              y + py * this.pixelSize,
              color
            );
          }
        }
      }
    }
    
    this.ctx.restore();
  }
  
  animate() {
    this.rotation += this.rotationSpeed;
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize
const symbolCanvas = document.getElementById('retro-visual');
new PixelHermeticSymbol(symbolCanvas);
```

### 8.2 Pixel Starfield Background

```javascript
class PixelStarfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.pixelSize = 2;
    
    this.resize();
    this.createStars(50);
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  createStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random() * 0.5 + 0.5
      });
    }
  }
  
  draw() {
    this.ctx.fillStyle = '#0E0B0C';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      // Move star
      star.y += star.speed;
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
      
      // Draw pixelated star
      const alpha = star.brightness * (Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.7);
      this.ctx.fillStyle = `rgba(218, 119, 86, ${alpha})`;
      this.ctx.fillRect(
        Math.floor(star.x / this.pixelSize) * this.pixelSize,
        Math.floor(star.y / this.pixelSize) * this.pixelSize,
        this.pixelSize,
        this.pixelSize
      );
    });
  }
  
  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
```

---

## 9. RESPONSIVE BEHAVIOR

### 9.1 Mobile Pixel Adaptations

```css
@media (max-width: 768px) {
  /* Simplify pixel fonts on mobile */
  .pixel-text-xl { font-size: 12px; }
  .pixel-text-lg { font-size: 10px; }
  .pixel-text-base { font-size: 8px; }
  
  /* Reduce box shadows for performance */
  .pixel-panel {
    box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.3);
  }
  
  /* Stack main frame */
  .main-frame-retro {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  /* Simplify hover effects (tap-friendly) */
  .control-module:hover {
    transform: none;
  }
  
  .control-module:active {
    transform: translateX(4px);
  }
}
```

---

## 10. ACCESSIBILITY (Retrofuturism Compatible)

### 10.1 Color Contrast

```css
/* Ensure WCAG AA compliance */
/* Red on dark background: 4.5:1+ ratio */
--red-primary: #da7756;  /* Passes AA */
--text-primary: #E6E1DC; /* Passes AAA */

/* Test contrast before deployment */
```

### 10.2 Keyboard Navigation

```css
/* Pixel-style focus indicator */
*:focus-visible {
  outline: 2px solid var(--red-bright);
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(218, 119, 86, 0.2);
}

.pixel-panel:focus-within {
  border-color: var(--red-bright);
}
```

### 10.3 Screen Reader Support

```html
<!-- Hidden screen reader labels -->
<span class="sr-only">
  Main navigation
</span>

<!-- ARIA labels for pixel graphics -->
<canvas aria-label="Decorative pixel art symbol" role="img"></canvas>

<!-- Language toggle accessibility -->
<button class="lang-btn" 
        aria-label="Switch to English"
        aria-pressed="true">
  EN
</button>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 11. PERFORMANCE OPTIMIZATION

### 11.1 Canvas Optimization

```javascript
// Use requestAnimationFrame wisely
class OptimizedCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isVisible = false;
    this.rafId = null;
    
    // Pause when not visible
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      });
    });
    
    observer.observe(this.canvas);
  }
  
  startAnimation() {
    if (!this.rafId) {
      this.animate();
    }
  }
  
  stopAnimation() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  animate() {
    // Your animation logic
    this.draw();
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
```

### 11.2 Font Loading Strategy

```html
<!-- Preload critical pixel font -->
<link rel="preload" 
      href="/fonts/PressStart2P.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>

<!-- Use font-display: swap -->
<style>
@font-face {
  font-family: 'Press Start 2P';
  src: url('/fonts/PressStart2P.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
</style>
```

---

## 12. ONE-SENTENCE CLAUDE CODE INSTRUCTION

> **"Build a bilingual (EN/中文) retrofuturistic portfolio website with authentic pixel art aesthetics: chunky 8px grid borders, Press Start 2P pixel font for headers, warm terracotta red (#da7756) accent palette, CRT scanlines, pixelated canvas graphics, retro system UI panels with corner brackets, slow marquee ticker, and step-based animations. Prioritize nostalgic warmth over cold cyberpunk - think 80s home computer meets modern minimalism."**

---

## 13. IMPLEMENTATION CHECKLIST

**Core Pixel Elements:**
- [ ] Use `image-rendering: pixelated` on all pixel graphics
- [ ] Implement 8px base grid system
- [ ] Add Press Start 2P or similar pixel font
- [ ] Create chunky border frames with corner brackets
- [ ] Add CRT scanline overlay (subtle, 4px)
- [ ] Implement step-based animations (`steps()` timing)

**Retrofuturistic Features:**
- [ ] Warm terracotta red palette (#da7756 primary)
- [ ] System status marquee with pixel font
- [ ] Window-style panels with controls (□ ×)
- [ ] Pixelated canvas graphics (symbol/starfield)
- [ ] Terminal-style buttons with ▸ arrows
- [ ] Retro shadows (flat offset, no blur)

**Bilingual System:**
- [ ] Language toggle with pixel button style
- [ ] All content has `data-en` and `data-zh`
- [ ] Chinese font optimization (PingFang SC)
- [ ] Language preference localStorage
- [ ] Update HTML lang attribute

**Interaction:**
- [ ] Pixel hover effects (position shift, not scale)
- [ ] Typewriter effect with block cursor █
- [ ] Optional pixel beep sounds
- [ ] Keyboard navigation with pixel focus states

**Performance:**
- [ ] Canvas pause when not visible
- [ ] Font preloading
- [ ] Reduced motion support
- [ ] Mobile-optimized (smaller pixel art)

---

## 14. FILE STRUCTURE

```
retrofuture-portfolio/
├── public/
│   ├── fonts/
│   │   ├── PressStart2P.woff2
│   │   ├── SpaceGrotesk.woff2
│   │   └── JetBrainsMono.woff2
│   ├── sounds/              (optional)
│   │   ├── type-beep.mp3
│   │   └── click.mp3
│   └── images/
│       └── pixel-graphics/
│           ├── icon-16.png
│           └── cursor.svg
├── src/
│   ├── components/
│   │   ├── pixel/
│   │   │   ├── PixelFrame.jsx
│   │   │   ├── PixelButton.jsx
│   │   │   ├── PixelPanel.jsx
│   │   │   └── PixelTypewriter.jsx
│   │   ├── canvas/
│   │   │   ├── HermeticSymbol.js
│   │   │   ├── PixelStarfield.js
│   │   │   └── OptimizedCanvas.js
│   │   └── bilingual/
│   │       ├── LanguageToggle.jsx
│   │       └── BilingualText.jsx
│   ├── styles/
│   │   ├── variables.css          (All design tokens)
│   │   ├── pixel-system.css       (Pixel-specific styles)
│   │   ├── animations.css         (Step-based animations)
│   │   └── global.css
│   ├── utils/
│   │   ├── languageSystem.js
│   │   └── pixelTypewriter.js
│   └── locales/
│       ├── en.json
│       └── zh.json
└── README.md
```

---

## 15. WHAT MAKES THIS RETROFUTURISM (Not Generic Pixel Art)

**Retrofuturism =** Past's vision of the future + Modern execution

✅ **Include:**
- Warm optimistic palette (not cold dystopian)
- System-like UI (computer interface metaphors)
- Chunky readable pixels (8-bit/16-bit aesthetic)
- CRT glow and scanlines (analog tech nostalgia)
- Slow, contemplative motion (not frantic arcade)
- Geometric clean layouts (modernist influence)

❌ **Avoid:**
- Pure gaming aesthetics (high scores, lives, coins)
- Bright acid neon (vaporwave/outrun overload)
- Aggressive glitch (too cyberpunk)
- Purely decorative pixels (must serve function)
- Faux-damaged VHS effects (different aesthetic)

---

**END OF SPECIFICATION**

This document is production-ready for building an authentic retrofuturistic pixel art portfolio with Claude Code.
