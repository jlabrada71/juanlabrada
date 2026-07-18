# Cyber-Logic Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle juanlabrada.com to match the "Cyber-Logic Developer Narrative" design from Stitch project 9018896943517969607 — dark glassmorphism with deep-indigo backgrounds, electric cyan primary, emerald green accents.

**Architecture:** Design tokens go into `tailwind.config.js` and `assets/css/main.css`; fonts are self-hosted via `@fontsource` npm packages imported in CSS; each page section component is reskinned in place (logic untouched). A new `SiteHeader.vue` replaces the inline nav links in `HeroPage.vue`.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Tailwind CSS v3, daisyUI v4, GSAP (untouched), vee-validate (untouched)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `package.json` + install | Add @fontsource packages |
| Modify | `assets/css/main.css` | Font imports + CSS custom properties |
| Modify | `tailwind.config.js` | Cyber-Logic color + font tokens |
| Modify | `nuxt.config.ts` | Remove Google Fonts links |
| Modify | `layouts/default.vue` | Dark background wrapper |
| Create | `components/SiteHeader.vue` | Fixed glassmorphic top nav |
| Modify | `components/HeroPage.vue` | Full-screen hero with Geist headline + CTAs |
| Modify | `components/SquaredButton.vue` | Primary-solid + ghost-glass variants |
| Modify | `components/RecentExperiences.vue` | Glassmorphic experience cards |
| Modify | `components/RecentProducts.vue` | Glassmorphic project cards |
| Modify | `components/RecentExperiments.vue` | Glassmorphic experiment tiles |
| Modify | `components/RecentPosts.vue` | Glassmorphic post cards |
| Modify | `components/ContactMe.vue` | Dark form with glowing inputs |
| Modify | `pages/index.vue` | Remove AnimationTest*, add SiteHeader |

---

## Task 1: Install self-hosted fonts

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install @fontsource packages**

```bash
pnpm add @fontsource-variable/geist @fontsource/hanken-grotesk @fontsource/jetbrains-mono
```

Expected output: three packages added, pnpm-lock.yaml updated.

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add self-hosted fontsource packages (Geist, Hanken Grotesk, JetBrains Mono)"
```

---

## Task 2: CSS custom properties + font-face imports

**Files:**
- Modify: `assets/css/main.css`

- [ ] **Step 1: Replace main.css with font imports and design tokens**

```css
@import '@fontsource-variable/geist';
@import '@fontsource/hanken-grotesk/400.css';
@import '@fontsource/hanken-grotesk/600.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/600.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --glass-bg: rgba(23, 31, 51, 0.6);
  --glass-border: 1px solid rgba(0, 240, 255, 0.1);
  --glass-blur: blur(24px);
  --glow-primary: 0 0 20px rgba(0, 240, 255, 0.25);
  --glow-primary-strong: 0 0 40px rgba(0, 240, 255, 0.4);
}

@layer components {
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    border-radius: 0.75rem;
  }

  .btn-primary-cyber {
    @apply inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm;
    background-color: #00f0ff;
    color: #00363a;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .btn-primary-cyber:hover {
    box-shadow: var(--glow-primary-strong);
    transform: translateY(-1px);
  }

  .btn-ghost-cyber {
    @apply inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm;
    background: rgba(0, 240, 255, 0.08);
    color: #00f0ff;
    border: 1px solid rgba(0, 240, 255, 0.3);
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-ghost-cyber:hover {
    background: rgba(0, 240, 255, 0.15);
    box-shadow: var(--glow-primary);
  }

  .input-cyber {
    @apply w-full px-0 py-3 bg-transparent text-cyber-text placeholder-cyber-muted outline-none;
    border-bottom: 1px solid #3b494b;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .input-cyber:focus {
    border-bottom-color: #00f0ff;
    box-shadow: 0 1px 0 #00f0ff;
  }

  .label-caps {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .tech-chip {
    @apply inline-block px-2 py-1 rounded text-xs;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    background: rgba(101, 242, 181, 0.12);
    color: #65f2b5;
    border: 1px solid rgba(101, 242, 181, 0.25);
  }
}
```

- [ ] **Step 2: Verify CSS compiles without errors**

```bash
pnpm dev
```

Open http://localhost:3000. Expected: page loads, no Vite CSS import errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add CSS custom properties and component utilities for Cyber-Logic design"
```

---

## Task 3: Tailwind design tokens

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Replace tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg:               '#0b1326',
          'bg-dim':         '#060e20',
          surface:          '#171f33',
          'surface-high':   '#222a3d',
          'surface-highest':'#2d3449',
          primary:          '#00f0ff',
          'primary-dim':    '#00dbe9',
          'on-primary':     '#00363a',
          secondary:        '#14d1ff',
          tertiary:         '#65f2b5',
          text:             '#dae2fd',
          muted:            '#b9cacb',
          outline:          '#849495',
          'outline-subtle': '#3b494b',
        },
      },
      fontFamily: {
        geist:    ['"Geist Variable"', 'system-ui', 'sans-serif'],
        hanken:   ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        jetbrains:['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
      boxShadow: {
        'glow-primary':       '0 0 20px rgba(0, 240, 255, 0.25)',
        'glow-primary-strong':'0 0 40px rgba(0, 240, 255, 0.4)',
        'glow-tertiary':      '0 0 20px rgba(101, 242, 181, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
}
```

- [ ] **Step 2: Verify dev server still starts**

```bash
pnpm dev
```

Expected: no Tailwind config errors.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add Cyber-Logic design tokens to Tailwind config"
```

---

## Task 4: Remove Google Fonts + fix layout background

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `layouts/default.vue`

- [ ] **Step 1: Remove Google Fonts links from nuxt.config.ts**

In `nuxt.config.ts`, replace the entire `link` array inside `app.head` with just the favicon and Material Design Icons:

```ts
link: [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' }
],
```

(Remove all `fonts.googleapis.com` entries — fonts are now self-hosted via @fontsource.)

- [ ] **Step 2: Update layouts/default.vue background**

```vue
<template>
  <div class="bg-cyber-bg min-h-screen w-full flex flex-col">
    <slot />
  </div>
</template>

<script setup>
  import { onCLS, onFID, onLCP } from 'web-vitals'
  import { v4 as uuidv4 } from 'uuid'
  import { set, get } from '../lib/storage'
  import { debug, log } from '../lib/logger'
  import { watch } from 'vue'

  const config = useRuntimeConfig()

  let isAnalyticsLoaded = false

  function getUserId () {
    const userId = get('jl_userId')
    if (userId) return userId
    const newUserId = uuidv4()
    set('jl_userId', newUserId)
    return newUserId
  }

  function sendAnalytics (newRoute) {
    if (!process.client) return
    const url = `${config.public.apiServer}/api/v1/analytics`
    const logFn = (data) => {
      const newData = { ...data }
      if (newData.name === 'CLS') {
        newData.entries = []
        if (data.entries) {
          for (const entry of data.entries) {
            delete entry.sources
          }
        }
      }
      window.jl.sendAnalytics(url, newData)
    }
    onCLS(logFn)
    onFID(logFn)
    onLCP(logFn)
    logFn({ userId: getUserId(), url: window.location.href, route: newRoute })
  }

  useHead({
    script: [
      {
        src: `${config.public.apiServer}/analytics/analytics.js`,
        hid: 'analytics',
        type: 'module',
        async: true,
        defer: true,
        callback: () => {
          debug('Analytics Loaded')
          isAnalyticsLoaded = true
          sendAnalytics()
        }
      }
    ],
    htmlAttrs: { lang: 'en' }
  })

  const route = useRoute()

  function sendAnalyticsWhenReady(newRoute) {
    if (isAnalyticsLoaded) {
      sendAnalytics(newRoute)
    } else {
      setTimeout(sendAnalyticsWhenReady, 1000, newRoute)
    }
  }

  watch(route, async (newRoute) => {
    sendAnalyticsWhenReady(newRoute)
  })
</script>
```

- [ ] **Step 3: Verify dark background renders**

Open http://localhost:3000. Expected: deep navy `#0b1326` background visible.

- [ ] **Step 4: Commit**

```bash
git add nuxt.config.ts layouts/default.vue
git commit -m "feat: remove Google Fonts CDN links, set dark cyber background on layout"
```

---

## Task 5: SiteHeader — fixed glassmorphic nav bar

**Files:**
- Create: `components/SiteHeader.vue`

- [ ] **Step 1: Create SiteHeader.vue**

```vue
<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
          style="background: rgba(11,19,38,0.8); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,240,255,0.1);">
    <!-- Logo -->
    <NuxtLink to="/" class="font-geist font-semibold text-cyber-text text-lg tracking-tight hover:text-cyber-primary transition-colors">
      Juan Labrada
    </NuxtLink>

    <!-- Nav links (desktop) -->
    <nav class="hidden md:flex items-center gap-8">
      <a v-for="link in navLinks" :key="link.href"
         :href="link.href"
         class="label-caps text-cyber-muted hover:text-cyber-text transition-colors">
        {{ link.label }}
      </a>
    </nav>

    <!-- CTA -->
    <a href="#contact" class="btn-primary-cyber hidden md:inline-flex">
      Contact
    </a>

    <!-- Mobile menu toggle -->
    <button class="md:hidden text-cyber-muted hover:text-cyber-text transition-colors"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu">
      <span class="mdi mdi-menu text-2xl" />
    </button>

    <!-- Mobile dropdown -->
    <div v-if="mobileOpen"
         class="absolute top-16 left-0 right-0 flex flex-col items-start gap-4 p-6"
         style="background: rgba(11,19,38,0.96); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,240,255,0.1);">
      <a v-for="link in navLinks" :key="link.href"
         :href="link.href"
         class="label-caps text-cyber-muted hover:text-cyber-text transition-colors"
         @click="mobileOpen = false">
        {{ link.label }}
      </a>
      <a href="#contact" class="btn-primary-cyber mt-2" @click="mobileOpen = false">
        Contact
      </a>
    </div>
  </header>
</template>

<script setup>
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Experience', href: '#experiences' },
  { label: 'Products',   href: '#products' },
  { label: 'Experiments',href: '#experiments' },
  { label: 'Posts',      href: '#posts' },
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/SiteHeader.vue
git commit -m "feat: add SiteHeader glassmorphic fixed nav bar"
```

---

## Task 6: HeroPage reskin

**Files:**
- Modify: `components/HeroPage.vue`

The original HeroPage renders: nav buttons (moved to SiteHeader), `<JuanImage>`, `<QuoteWindow>`. We keep `JuanImage` and `QuoteWindow` but wrap them in the new dark hero layout.

- [ ] **Step 1: Replace HeroPage.vue**

```vue
<template>
  <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-16"
           style="background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,240,255,0.12) 0%, transparent 60%), #0b1326;">

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 pointer-events-none"
         style="background-image: linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px); background-size: 48px 48px;" />

    <div class="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
      <!-- Role tag -->
      <span class="label-caps text-cyber-primary">
        Fullstack Engineer · Vue.js · Node.js
      </span>

      <!-- Headline -->
      <h1 class="font-geist font-bold text-cyber-text leading-tight"
          style="font-size: clamp(2.5rem, 6vw, 4rem); letter-spacing: -0.02em;">
        Building Systems That<br />
        <span style="color: #00f0ff;">Solve Real Problems</span>
      </h1>

      <!-- Quote -->
      <QuoteWindow />

      <!-- CTAs -->
      <div class="flex flex-wrap gap-4 justify-center mt-2">
        <a href="#products" class="btn-primary-cyber">View Projects</a>
        <a href="#experiences" class="btn-ghost-cyber">Experience</a>
      </div>

      <!-- Photo -->
      <JuanImage />
    </div>
  </section>
</template>

<script setup>
</script>
```

- [ ] **Step 2: Check hero renders correctly**

Open http://localhost:3000. Expected: dark section with cyan radial glow, Geist headline, QuoteWindow and JuanImage visible.

- [ ] **Step 3: Commit**

```bash
git add components/HeroPage.vue
git commit -m "feat: reskin HeroPage with Cyber-Logic dark hero layout"
```

---

## Task 7: SquaredButton update

**Files:**
- Modify: `components/SquaredButton.vue`

SquaredButton is still used on other pages. Add a `variant` prop (`primary` | `ghost`, default `ghost`) so callers can choose style.

- [ ] **Step 1: Replace SquaredButton.vue**

```vue
<template>
  <NuxtLink :to="props.url">
    <span :class="variant === 'primary' ? 'btn-primary-cyber' : 'btn-ghost-cyber'">
      {{ props.title }}
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true, default: '' },
  url:   { type: String, required: false, default: '' },
  variant: { type: String, default: 'ghost' },
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/SquaredButton.vue
git commit -m "feat: update SquaredButton with primary/ghost cyber variants"
```

---

## Task 8: RecentExperiences reskin

**Files:**
- Modify: `components/RecentExperiences.vue`

- [ ] **Step 1: Replace RecentExperiences.vue**

```vue
<template>
  <section id="experiences" class="w-full py-24 px-6"
           style="background: #0b1326;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Career</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Experience
      </h2>

      <div class="flex flex-col gap-6">
        <div v-for="exp in experiences" :key="exp.company" class="glass-card p-6 flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1">
              <h3 class="font-geist font-semibold text-cyber-text text-lg">{{ exp.role }}</h3>
            </div>
            <p class="text-cyber-primary font-medium mb-2">{{ exp.company }}</p>
            <p v-if="exp.description" class="font-hanken text-cyber-muted text-sm leading-relaxed">
              {{ exp.description }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in exp.tags" :key="tag" class="tech-chip">{{ tag }}</span>
            </div>
          </div>
          <span v-if="exp.period" class="font-jetbrains text-cyber-muted text-xs whitespace-nowrap mt-1">
            {{ exp.period }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = [
  {
    role: 'Senior Software Developer',
    company: 'MonetizeMore',
    period: '2022 – Present',
    description: 'Built and maintained ad tech revenue optimization platform features using Vue.js and Node.js.',
    tags: ['Vue.js', 'Node.js', 'TypeScript'],
  },
  {
    role: 'Senior Software Developer',
    company: 'WPlex',
    period: '2020 – 2022',
    description: 'Developed full-stack web applications and REST APIs for WordPress hosting infrastructure.',
    tags: ['Vue.js', 'PHP', 'REST API'],
  },
  {
    role: 'Senior Software Developer',
    company: 'Experian',
    period: '2018 – 2020',
    description: 'Contributed to credit data analytics dashboards and data pipeline integrations.',
    tags: ['Angular', 'Java', 'SQL'],
  },
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/RecentExperiences.vue
git commit -m "feat: reskin RecentExperiences with glassmorphic cards"
```

---

## Task 9: RecentProducts reskin

**Files:**
- Modify: `components/RecentProducts.vue`

- [ ] **Step 1: Replace RecentProducts.vue**

```vue
<template>
  <section id="products" class="w-full py-24 px-6"
           style="background: #0d1628;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Work</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Products
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.title" class="glass-card p-6 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <h3 class="font-geist font-semibold text-cyber-text text-lg">{{ product.title }}</h3>
            <span class="tech-chip">{{ product.type }}</span>
          </div>

          <div class="flex flex-col gap-2 flex-1">
            <div>
              <p class="label-caps text-cyber-muted mb-1">Problem</p>
              <p class="font-hanken text-cyber-muted text-sm leading-relaxed">{{ product.problem }}</p>
            </div>
            <div>
              <p class="label-caps text-cyber-muted mb-1">Stack</p>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in product.stack" :key="tag" class="tech-chip">{{ tag }}</span>
              </div>
            </div>
          </div>

          <NuxtLink :to="product.url" class="btn-ghost-cyber text-center mt-auto text-sm">
            {{ product.linkLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    title: 'MabayJS',
    type: 'OSS',
    problem: 'Manually writing boilerplate code for CRUD models slows down development cycles.',
    stack: ['Node.js', 'JavaScript'],
    url: 'https://github.com/jlabrada71/mabayjs',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Palette Generator',
    type: 'Tool',
    problem: 'Designers need instant harmonic color palettes with contrast-safe combinations.',
    stack: ['Vue.js', 'chroma-js'],
    url: '/color-tools',
    linkLabel: 'Open Tool',
  },
  {
    title: 'UTM Builder',
    type: 'Tool',
    problem: 'Marketing teams waste time hand-crafting UTM tracking URLs for ad campaigns.',
    stack: ['Vue.js', 'Nuxt'],
    url: '/utm-builder',
    linkLabel: 'Open Tool',
  },
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/RecentProducts.vue
git commit -m "feat: reskin RecentProducts with glassmorphic project cards (Problem/Stack layout)"
```

---

## Task 10: RecentExperiments reskin

**Files:**
- Modify: `components/RecentExperiments.vue`

- [ ] **Step 1: Replace RecentExperiments.vue**

```vue
<template>
  <section id="experiments" class="w-full py-24 px-6"
           style="background: #0b1326;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Playground</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Experiments
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Gallery 1</h3>
          <p class="font-hanken text-cyber-muted text-sm">Changing image width and height on hover within a grid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <ImageGallery4 />
          </div>
        </div>

        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Gallery 2</h3>
          <p class="font-hanken text-cyber-muted text-sm">Expanding image width on hover within a grid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <ImageGallery1 />
          </div>
        </div>

        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Mermaid Graph</h3>
          <p class="font-hanken text-cyber-muted text-sm">Generating UML diagrams from text using Mermaid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <MermaidDemo />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add components/RecentExperiments.vue
git commit -m "feat: reskin RecentExperiments with glassmorphic tiles"
```

---

## Task 11: RecentPosts reskin

**Files:**
- Modify: `components/RecentPosts.vue`

- [ ] **Step 1: Replace RecentPosts.vue**

```vue
<template>
  <section id="posts" class="w-full py-24 px-6"
           style="background: #0d1628;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Writing</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Posts
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a v-for="post in posts" :key="post.title"
           :href="post.url"
           target="_blank"
           rel="noopener"
           class="glass-card p-6 flex flex-col gap-3 group hover:border-cyber-primary transition-colors"
           style="border: 1px solid rgba(0,240,255,0.1);">
          <h3 class="font-geist font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors">
            {{ post.title }}
          </h3>
          <span class="label-caps text-cyber-primary mt-auto">Read →</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    title: '4 Rules of Simple Design',
    url: 'https://docs.juanlabrada.com/blog/4-rules-of-simple-design',
  },
  {
    title: 'Test Driven Development ROI',
    url: 'https://docs.juanlabrada.com/blog/test-driven-development-roi',
  },
  {
    title: 'Liskov Substitution Principle',
    url: 'https://docs.juanlabrada.com/blog/liskov-substitution-principle',
  },
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/RecentPosts.vue
git commit -m "feat: reskin RecentPosts with glassmorphic post cards"
```

---

## Task 12: ContactMe reskin

**Files:**
- Modify: `components/ContactMe.vue`

The validation logic (`useForm`, `yup` schema, `handleSubmit`, `MessageRepositoryProxy`) is preserved exactly. Only the template is replaced.

- [ ] **Step 1: Replace ContactMe.vue template section only**

Replace the `<template>` block with:

```vue
<template>
  <section id="contact" class="w-full py-24 px-6"
           style="background: #0b1326;">
    <div class="max-w-2xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Let's Talk</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Contact Me
      </h2>

      <ActionFeedback :message="feedbackMessage" v-model:show="showFeedback" />

      <form class="glass-card p-8 flex flex-col gap-6" @submit="onSubmit">

        <div v-if="errorList.length > 0" class="p-3 rounded" style="background: rgba(255,180,171,0.1); border: 1px solid rgba(255,180,171,0.3);">
          <ul class="text-sm" style="color: #ffb4ab;">
            <li v-for="error in errorList" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="flex flex-col gap-1">
          <label for="name" class="label-caps text-cyber-muted">Name</label>
          <input id="name" type="text" v-model="name" v-bind="nameAttrs"
                 class="input-cyber font-hanken text-cyber-text"
                 placeholder="Your name" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="label-caps text-cyber-muted">Email</label>
          <input id="email" type="email" v-model="email" v-bind="emailAttrs"
                 class="input-cyber font-hanken text-cyber-text"
                 placeholder="your@email.com" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="message" class="label-caps text-cyber-muted">Message</label>
          <textarea id="message" v-model="message" v-bind="messageAttrs" rows="5"
                    class="input-cyber font-hanken text-cyber-text resize-none"
                    placeholder="What's on your mind?" />
        </div>

        <button type="submit" class="btn-primary-cyber self-start" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </section>
</template>
```

Keep the `<script setup>` and `<style>` blocks exactly as they are.

- [ ] **Step 2: Commit**

```bash
git add components/ContactMe.vue
git commit -m "feat: reskin ContactMe with dark glassmorphic form and glowing inputs"
```

---

## Task 13: Wire up pages/index.vue

**Files:**
- Modify: `pages/index.vue`

- [ ] **Step 1: Replace pages/index.vue**

```vue
<template>
  <div class="bg-cyber-bg w-full">
    <SiteHeader />
    <HeroPage />
    <RecentExperiences />
    <RecentProducts />
    <RecentExperiments />
    <RecentPosts />
    <ContactMe />
  </div>
</template>
```

(Removes `AnimationTestTwo` and `AnimationTest`. `SiteHeader` is auto-imported from `components/`.)

- [ ] **Step 2: Verify full page flow**

Open http://localhost:3000. Walk through:
1. Fixed header visible with nav links
2. Hero section — dark with cyan glow, Geist headline, CTA buttons
3. Experience cards — glassmorphic
4. Products cards — Problem/Stack layout
5. Experiments tiles — three cards visible
6. Posts cards — hover effect shows cyan text
7. Contact form — dark glass card, inputs glow on focus

- [ ] **Step 3: Commit**

```bash
git add pages/index.vue
git commit -m "feat: wire up Cyber-Logic index page — remove test animations, add SiteHeader"
```

---

## Self-Review

### Spec coverage

| Requirement | Task |
|---|---|
| Self-hosted fonts (Geist, Hanken Grotesk, JetBrains Mono) | Task 1, 2 |
| Remove Google Fonts CDN links | Task 4 |
| Cyber-Logic color palette as Tailwind tokens | Task 3 |
| Glassmorphism utilities (glass-card, btn-*, input-cyber) | Task 2 |
| Fixed glassmorphic nav bar with mobile toggle | Task 5 |
| Hero with Geist headline + radial glow + CTAs | Task 6 |
| SquaredButton primary/ghost variants | Task 7 |
| Experience cards with tech chips | Task 8 |
| Product cards with Problem/Stack layout | Task 9 |
| Experiment tiles | Task 10 |
| Posts cards with hover transition | Task 11 |
| Contact form dark glass + glowing inputs (logic unchanged) | Task 12 |
| Remove AnimationTest/AnimationTestTwo | Task 13 |
| Dark layout background | Task 4 |

### Placeholder scan

No TBD or TODO markers. All code blocks are complete.

### Type consistency

- `btn-primary-cyber`, `btn-ghost-cyber`, `glass-card`, `input-cyber`, `label-caps`, `tech-chip` defined in Task 2 CSS and used consistently across Tasks 5–12.
- Tailwind color tokens `text-cyber-text`, `text-cyber-primary`, `text-cyber-muted` defined in Task 3 and used throughout.
- Font classes `font-geist`, `font-hanken`, `font-jetbrains` defined in Task 3 and used throughout.
