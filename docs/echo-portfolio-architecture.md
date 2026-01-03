# Echo Li Portfolio - Complete Site Architecture
## Visual Sitemap & Content Structure

---

## 📐 OVERALL PAGE STRUCTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    🖥️ SYSTEM STATUS BAR                         │
│  ■ SYSTEM ONLINE ■ ECHO LI ■ PRODUCT × UX × AI ■ STATUS...    │
│                    [EN/中文] Language Toggle                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                      🎯 HERO SECTION                            │
│                                                                  │
│   ┌──────────────────────┐     ┌──────────────────────┐       │
│   │                      │     │                      │       │
│   │   Title:             │     │   [Pixel Art         │       │
│   │   "Designing systems │     │    Visual/Canvas]    │       │
│   │   people can trust." │     │                      │       │
│   │                      │     │   Rotating symbol    │       │
│   │   Subtitle:          │     │   or starfield       │       │
│   │   Role description   │     │                      │       │
│   │                      │     │                      │       │
│   │   [▸ VIEW WORK]      │     │                      │       │
│   │   [▸ READ SIGNALS]   │     │                      │       │
│   │                      │     │                      │       │
│   └──────────────────────┘     └──────────────────────┘       │
│                                                                  │
│          (8px pixel grid background pattern)                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                   📊 MAIN FRAME (Two Panels)                    │
│                                                                  │
│   ┌───────────────────┐           ┌────────────────────────┐   │
│   │ SYSTEM_VISUAL.EXE │           │ CONTROL PANEL          │   │
│   │        [□][×]     │           │                        │   │
│   ├───────────────────┤           │ ┌────────────────────┐ │   │
│   │                   │           │ │ 001 // IDENTITY    │ │   │
│   │                   │           │ │ Human-Centered AI  │ │   │
│   │   [Canvas Art]    │           │ │ & Product Designer │ │   │
│   │                   │           │ └────────────────────┘ │   │
│   │  Hermetic Symbol  │           │                        │   │
│   │  or Pixel Visual  │           │ ┌────────────────────┐ │   │
│   │                   │           │ │ 002 // FOCUS       │ │   │
│   │                   │           │ │ • AI Product Design│ │   │
│   │                   │           │ │ • UX Systems       │ │   │
│   │                   │           │ │ • Research-Informed│ │   │
│   │                   │           │ └────────────────────┘ │   │
│   │                   │           │                        │   │
│   │                   │           │ ┌────────────────────┐ │   │
│   │                   │           │ │ 003 // APPROACH    │ │   │
│   └───────────────────┘           │ │ Calm interfaces... │ │   │
│      (Square 1:1)                 │ └────────────────────┘ │   │
│                                   │                        │   │
│                                   │ ┌────────────────────┐ │   │
│                                   │ │ 004 // STATUS      │ │   │
│                                   │ │ Open to roles      │ │   │
│                                   │ │ Based in China     │ │   │
│                                   │ └────────────────────┘ │   │
│                                   │                        │   │
│                                   │ ┌────────────────────┐ │   │
│                                   │ │ 005 // LINKS       │ │   │
│                                   │ │ LinkedIn → GitHub  │ │   │
│                                   │ │ Resume → Email     │ │   │
│                                   │ └────────────────────┘ │   │
│                                   │                        │   │
│                                   └────────────────────────┘   │
│                                                                  │
│          Grid: 5fr (visual) : 7fr (info)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                  📡 SIGNALS SECTION (Blog/Writing)              │
│                                                                  │
│   006 // SIGNALS                                                │
│   Independent writing and ongoing thinking                      │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ SIGNAL_014                         [NEW]  2025.01.02    │  │
│   │                                                          │  │
│   │ Designing Calm Interfaces in Intelligent Systems        │  │
│   │                                                          │  │
│   │ ◆ AI × UX  ■ 6 min read                                 │  │
│   │                                                          │  │
│   │ [▸ READ_SIGNAL]                                          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ SIGNAL_011                              2024.12.18       │  │
│   │                                                          │  │
│   │ Trust Is a Design Decision, Not a Feature               │  │
│   │                                                          │  │
│   │ ◆ Human–AI  ■ 5 min read                                │  │
│   │                                                          │  │
│   │ [▸ READ_SIGNAL]                                          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ SIGNAL_007                              2024.11.20       │  │
│   │                                                          │  │
│   │ When Automation Fails, Interfaces Matter More           │  │
│   │                                                          │  │
│   │ ◆ Product Thinking  ■ 4 min read                        │  │
│   │                                                          │  │
│   │ [▸ READ_SIGNAL]                                          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   → View All Signals                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                 💼 FEATURED PROJECTS (Portfolio)                │
│                                                                  │
│   007 // FEATURED WORK                                          │
│   Selected systems I've designed and built                      │
│                                                                  │
│   ┌──────────────────────┐      ┌──────────────────────┐       │
│   │ ╔═══════════════════╗│      │ ╔═══════════════════╗│       │
│   │ ║                   ║│      │ ║                   ║│       │
│   │ ║ [Project Preview] ║│      │ ║ [Project Preview] ║│       │
│   │ ║      Image        ║│      │ ║      Image        ║│       │
│   │ ║                   ║│      │ ║                   ║│       │
│   │ ╚═══════════════════╝│      │ ╚═══════════════════╝│       │
│   │                      │      │                      │       │
│   │ AI Companion Design  │      │ LLM Evaluation       │       │
│   │ System               │      │ Platform             │       │
│   │                      │      │                      │       │
│   │ Designed attachment- │      │ Built eval framework │       │
│   │ aware UX for human-  │      │ for ByteDance AI     │       │
│   │ AI emotional bonds   │      │ products             │       │
│   │                      │      │                      │       │
│   │ Role: Product Lead   │      │ Role: UX Researcher  │       │
│   │ Scope: Research+UX   │      │ Scope: System Design │       │
│   │ Impact: 40% retention│      │ Impact: 30% faster   │       │
│   │                      │      │                      │       │
│   │ [→ View Case Study]  │      │ [→ View Case Study]  │       │
│   │                      │      │                      │       │
│   └──────────────────────┘      └──────────────────────┘       │
│                                                                  │
│   ┌──────────────────────┐      ┌──────────────────────┐       │
│   │ [Project 3]          │      │ [Project 4]          │       │
│   └──────────────────────┘      └──────────────────────┘       │
│                                                                  │
│          Grid: 2 columns (desktop), 1 column (mobile)           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                       🔚 FOOTER                                 │
│                                                                  │
│   ┌────────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│   │ © Echo Li 2025 │  │ Email         │  │ Built as a       │  │
│   │                │  │ LinkedIn      │  │ living system.   │  │
│   │ Designing      │  │ Resume        │  │ Updated over     │  │
│   │ Human-Centered │  │               │  │ time.            │  │
│   │ Systems        │  │               │  │                  │  │
│   └────────────────┘  └───────────────┘  └──────────────────┘  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ system@echo:~$ █                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                  (Pixel terminal prompt)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 DETAILED CONTENT BREAKDOWN

### 1️⃣ SYSTEM STATUS BAR (Sticky Top)

**Position:** Fixed/Sticky at top  
**Height:** 40-48px  
**Content (Scrolling Marquee):**
```
■ SYSTEM ONLINE ■ PRODUCT × UX × AI ■ ECHO LI ■ 
HUMAN-CENTERED SYSTEMS ■ STATUS: ACTIVE ■
```

**Right Corner:** 
- Language Toggle: `[EN] | [中文]`

**Visual Elements:**
- Pixel font (Press Start 2P or Share Tech Mono)
- Warm terracotta red text (#da7756)
- Dark background (#0E0B0C)
- Infinite scroll animation (30s loop)
- 2px bottom border

---

### 2️⃣ HERO SECTION

**Layout:** Two-column grid (50/50 or 60/40)  
**Height:** 80vh minimum

**Left Column (Text Content):**

**Title (Large, Typewriter Effect):**
- EN: "Designing systems people can trust."
- ZH: "设计值得信赖的系统。"
- Font: Space Grotesk (display font)
- Size: 40-64px (fluid)
- Color: Warm off-white (#E6E1DC)
- Animation: Typewriter (100ms/char)

**Subtitle:**
- EN: "I design human-centered AI and digital products that prioritize clarity, usability, and long-term impact."
- ZH: "我设计以人为本的 AI 和数字产品，注重清晰性、可用性和长期影响。"
- Font: JetBrains Mono
- Size: 16-18px
- Color: Secondary text (#E6E1DC @ 75% opacity)

**Position Statement:**
- EN: "My work sits at the intersection of product design, user experience, and thoughtful system thinking."
- ZH: "我的工作位于产品设计、用户体验和深思熟虑的系统思维的交汇点。"

**CTAs (Pixel Buttons):**
- [▸ VIEW WORK] → Scroll to Projects
- [▸ READ SIGNALS] → Scroll to Signals

**Right Column (Visual):**
- Canvas element (400×400 or larger)
- Options:
  - Rotating Hermetic symbol (pixel art)
  - Pixel starfield animation
  - Abstract geometric pattern
- Image rendering: pixelated
- Warm red color scheme

**Background:**
- 8px × 8px pixel grid pattern
- Very subtle (#da7756 @ 3% opacity)
- Creates retrofuturistic texture

---

### 3️⃣ MAIN FRAME (Information Control)

**Layout:** Two-column grid (5:7 ratio)  
**Mobile:** Stacks to single column

**LEFT PANEL - Visual Window:**

**Window Chrome:**
```
┌─ SYSTEM_VISUAL.EXE ──────[□][×]─┐
│                                  │
│        [Canvas Graphic]          │
│                                  │
│    Hermetic Symbol or            │
│    Generative Art                │
│                                  │
└──────────────────────────────────┘
```

**Header:**
- Label: "SYSTEM_VISUAL.EXE" (green text)
- Window controls: □ (minimize) × (close)
- Pixel font, 8px size
- Dark terminal background

**Content:**
- Square canvas (1:1 aspect ratio)
- Pixel art rendering
- Slow rotation or animation
- Warm color palette

**RIGHT PANEL - Control Modules:**

**Module 001 - IDENTITY:**
```
┌────────────────────────────────┐
│ 001 // IDENTITY                │
├────────────────────────────────┤
│ EN: Human-Centered AI &        │
│     Product Designer           │
│                                │
│ ZH: 以人为本的 AI 与产品设计师 │
└────────────────────────────────┘
```

**Module 002 - FOCUS:**
```
┌────────────────────────────────┐
│ 002 // FOCUS                   │
├────────────────────────────────┤
│ • AI Product Design            │
│ • UX Systems                   │
│ • Research-Informed Decisions  │
│                                │
│ ZH: • AI 产品设计              │
│     • 用户体验系统             │
│     • 基于研究的决策           │
└────────────────────────────────┘
```

**Module 003 - APPROACH:**
```
┌────────────────────────────────┐
│ 003 // APPROACH                │
├────────────────────────────────┤
│ Calm interfaces, clear         │
│ reasoning, and design choices  │
│ grounded in human needs.       │
│                                │
│ ZH: 平静的界面、清晰的推理，   │
│     以及根植于人类需求的设计。 │
└────────────────────────────────┘
```

**Module 004 - STATUS:**
```
┌────────────────────────────────┐
│ 004 // STATUS                  │
├────────────────────────────────┤
│ Open to product-driven roles   │
│ and collaborations             │
│                                │
│ Based in China · Working       │
│ globally                       │
│                                │
│ ZH: 对产品导向的职位和合作持开 │
│     放态度                     │
│     位于中国·全球工作          │
└────────────────────────────────┘
```

**Module 005 - LINKS:**
```
┌────────────────────────────────┐
│ 005 // LINKS                   │
├────────────────────────────────┤
│ LinkedIn →    GitHub →         │
│ Resume →      Email →          │
└────────────────────────────────┘
```

**Module Visual Style:**
- 2-3px pixel border
- Corner bracket accents (┌ ┐ └ ┘)
- Dark background
- Red border on hover
- 4px translate on hover
- Chunky box shadow (8px offset)

---

### 4️⃣ SIGNALS SECTION (Blog/Writing)

**Header:**
```
006 // SIGNALS
Independent writing and ongoing thinking
```

**Description:**
- EN: "Notes on AI, product systems, and human-centered design — written to clarify positions, not chase trends."
- ZH: "关于 AI、产品系统和以人为中心设计的笔记——为澄清立场而写，而非追逐潮流。"

**Signal Entry Structure:**

```
┌─────────────────────────────────────────────────┐
│ SIGNAL_014                    [NEW]  2025.01.02 │
│                                                  │
│ Designing Calm Interfaces in Intelligent Systems│
│ 设计智能系统中的平静界面                         │
│                                                  │
│ ◆ AI × UX  ■ 6 min read                         │
│                                                  │
│ As AI systems become more capable, interface    │
│ design becomes more critical. A framework for   │
│ calm, trustworthy AI UX.                        │
│                                                  │
│ [▸ READ_SIGNAL]                                  │
└─────────────────────────────────────────────────┘
```

**Entry Components:**
1. **Meta Line:**
   - Signal ID (e.g., SIGNAL_014)
   - Status badge ([NEW] in yellow pixel style)
   - Date (YYYY.MM.DD format)

2. **Title:**
   - EN title (large)
   - Optional ZH title below

3. **Tags:**
   - Category icon (◆ for AI×UX, ■ for Product, etc.)
   - Category label
   - Reading time

4. **Excerpt (Optional):**
   - 1-2 sentences preview

5. **CTA:**
   - Terminal-style button: [▸ READ_SIGNAL]

**Visual Style:**
- Left border: 4px red accent
- Background: Dark panel
- Hover: Border brightens, subtle glow, 8px translate right
- Stacked vertically with spacing

**Display:** 2-3 signals initially, then "→ View All Signals" link

---

### 5️⃣ FEATURED PROJECTS SECTION

**Header:**
```
007 // FEATURED WORK
Selected systems I've designed and built
```

**Project Card Structure:**

```
╔═══════════════════════════════════╗
║                                   ║
║      [Project Preview Image]      ║
║         (16:9 or 4:3)             ║
║                                   ║
╠═══════════════════════════════════╣
║                                   ║
║  AI Companion Design System       ║
║  ─────────────────────────────    ║
║                                   ║
║  Designed attachment-aware UX for ║
║  human-AI emotional bonds         ║
║                                   ║
║  Role: Product Design Lead        ║
║  Scope: UX Research • System      ║
║  Impact: 40% retention increase   ║
║                                   ║
║  [→ VIEW_CASE_STUDY]              ║
║                                   ║
╚═══════════════════════════════════╝
```

**Card Components:**

1. **Preview Image:**
   - Aspect ratio: 16:9 or 4:3
   - Pixelated rendering for retro feel
   - Grayscale or desaturated by default
   - Full color on hover

2. **Project Title:**
   - EN + ZH (if applicable)
   - Font: Display font
   - Size: 20-24px

3. **One-Line Statement:**
   - Brief impact description
   - Font: Body serif
   - "Why this matters"

4. **Details Grid:**
   - **Role:** Your role in the project
   - **Scope:** Key areas covered
   - **Impact:** Quantifiable outcome

5. **CTA:**
   - Pixel button: [→ VIEW_CASE_STUDY]

**Layout:**
- Grid: 2 columns (desktop)
- Grid: 1 column (mobile/tablet)
- Display: 2-4 featured projects
- Heavy pixel border (3px)
- Double-line corners (╔ ╗ ╚ ╝)
- 8px shadow offset
- Hover: 4px translate, brighter border

**Sample Projects to Include:**

1. **AI Companion Design System**
   - Alien pet app project
   - Attachment-aware UX
   - Loneliness research integration

2. **LLM Evaluation Platform**
   - ByteDance work
   - Systematic evaluation framework

3. **Children's Educational Content**
   - Story editing experience
   - Character development

4. **Product Strategy Work**
   - Brand positioning
   - Content frameworks

---

### 6️⃣ FOOTER

**Layout:** Three-column grid (mobile: stacked)

**Column 1 - Copyright:**
```
© Echo Li 2025
Designing Human-Centered Systems
设计以人为本的系统
```

**Column 2 - Links:**
```
Email
LinkedIn
Resume
GitHub (optional)
```

**Column 3 - Meta:**
```
Built as a living system.
Updated over time.

作为活系统构建。
随时间更新。
```

**Terminal Prompt (Full Width):**
```
┌───────────────────────────────────┐
│ system@echo:~$ █                  │
└───────────────────────────────────┘
```
- Blinking cursor (█)
- Pixel font
- Dark terminal background
- 1px red border

---

## 🎨 VISUAL STYLE SUMMARY

### Color Usage by Section:

**Status Bar:**
- Background: `#0E0B0C` (deep black-red)
- Text: `#da7756` (terracotta red)
- Border: `#da7756` @ 40%

**Hero:**
- Title: `#E6E1DC` (warm off-white)
- Background: Pixel grid pattern
- Accent: None (neutral zone)

**Main Frame:**
- Module numbers: `#B84545` (bright red)
- Borders: `#da7756` @ 40%
- Window label: `#7BA591` (calm green)

**Signals:**
- Border accent: `#da7756` (left 4px)
- Badge: `#F4D03F` (yellow for [NEW])
- Icons: Category colors

**Projects:**
- Border: `#da7756` (3px double)
- Shadow: Black @ 30% (8px offset)

**Footer:**
- Background: Dark
- Terminal prompt: Green text `#7BA591`

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (1280px+)
- Main Frame: 5:7 ratio
- Projects: 2 columns
- Full typography scale

### Tablet (768px - 1279px)
- Main Frame: 1:1 ratio, stacked
- Projects: 2 columns
- Reduced spacing

### Mobile (< 768px)
- All sections: Single column
- Reduced pixel art complexity
- Smaller font sizes (pixel fonts 8px→6px)
- Simplified hover effects (translate only on tap)

---

## 🎯 INTERACTION STATES

### Hover Effects (Desktop):
- Modules: 4px translate right + red glow
- Signals: 8px translate right + border brighten
- Projects: 4px translate diagonal + shadow increase
- Buttons: 2px translate up-left + shadow reduce

### Active/Tap (Mobile):
- Modules: 4px translate
- No complex animations

### Focus States:
- 2px red outline
- 4px offset
- 6px red glow

---

## 🌍 BILINGUAL CONTENT STRATEGY

### Language Toggle Placement:
- Desktop: Top right of status bar
- Mobile: Top right, always visible

### Content with Both Languages:

**Always Bilingual:**
- Hero title
- Hero subtitle
- All module content (001-005)
- Section headers
- Footer tagline

**English Only (Technical):**
- Code snippets
- System messages
- File names (SYSTEM_VISUAL.EXE)

**Context-Specific:**
- Project titles: EN primary, ZH optional
- Signal titles: EN primary, ZH optional
- Tags/labels: Mixed (icons + EN/ZH)

### Font Switching:
- EN: Space Grotesk, JetBrains Mono, Inter
- ZH: PingFang SC (for all Chinese text)
- Shared: Pixel fonts work for both

---

## ⚙️ SPECIAL FEATURES

### 1. Typewriter Effect
- Hero title only
- 100ms per character
- Block cursor (█)
- Blinking after complete

### 2. Marquee Scroll
- Status bar only
- 30s infinite loop
- Seamless (duplicate content)
- Pauses on hover (optional)

### 3. Canvas Animations
- Hero visual: Pixel starfield
- Main frame visual: Rotating symbol
- 30-60s slow loops
- Pauses when not visible (performance)

### 4. Pixel Glitch (Minimal)
- Only on specific hover
- <200ms duration
- 1-2 frame flicker
- Red color shift

### 5. CRT Scanlines
- Full page overlay
- 4px repeating gradient
- 8s slow drift animation
- Very subtle (5% opacity)

---

## 📦 CONTENT CAPACITY

**Sections:** 6 main sections  
**Modules:** 5 info modules (001-005)  
**Signals:** Display 2-3, link to archive  
**Projects:** Display 2-4, link to more  

**Total Scroll Height Estimate:**
- Status Bar: 48px
- Hero: 80vh (~800px)
- Main Frame: ~1000px
- Signals: ~800px (3 entries)
- Projects: ~1200px (4 projects in 2×2 grid)
- Footer: ~300px
- **Total: ~4150px (~4 screens)**

---

## ✅ FINAL ARCHITECTURE CHECKLIST

**Structure:**
- [ ] Status bar with marquee
- [ ] Two-column hero
- [ ] Two-panel main frame (visual + info)
- [ ] Signals list section
- [ ] Projects grid section
- [ ] Footer with terminal

**Pixel Elements:**
- [ ] 8px grid system
- [ ] Chunky borders (2-3px)
- [ ] Corner brackets (┌┐└┘ or ╔╗╚╝)
- [ ] Pixel fonts (Press Start 2P)
- [ ] Pixelated graphics

**Retrofuturism:**
- [ ] Warm terracotta palette
- [ ] CRT scanlines
- [ ] System UI metaphors
- [ ] Window chrome (□×)
- [ ] Terminal prompt

**Bilingual:**
- [ ] Language toggle (EN/中文)
- [ ] All content has data-en/data-zh
- [ ] Chinese font optimization
- [ ] LocalStorage preference

**Interactions:**
- [ ] Typewriter hero title
- [ ] Hover translate effects
- [ ] Canvas animations
- [ ] Step-based timing
- [ ] Keyboard navigation

---

**ARCHITECTURE COMPLETE**

This is the full visual and content structure.
Ready for Claude Code implementation.
