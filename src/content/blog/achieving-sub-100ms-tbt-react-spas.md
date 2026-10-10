---
title: "Achieving Sub-100ms TBT and 99+ Lighthouse Scores in Heavy React SPAs"
slug: "achieving-sub-100ms-tbt-react-spas"
description: "Actionable techniques for eliminating main-thread JavaScript blocking. How to leverage selective code splitting, Framer Motion strict lazy features, tree shaking, and modern font optimization to achieve sub-100ms Total Blocking Time."
publishedAt: "2026-01-20"
readTime: "5 min read"
category: "Frontend Performance"
tags: ["React", "Vite", "Core Web Vitals", "Performance", "JavaScript"]
coverImage: "/og-image.png"
featured: false
---

Single Page Applications (SPAs) built with modern frontend tools often struggle with Google's Core Web Vitals—most notably **Total Blocking Time (TBT)** and **Interaction to Next Paint (INP)**. As animations, icons, third-party libraries, and UI component libraries accumulate, the main browser thread stays frozen parsing and evaluating megabytes of JavaScript.

In this case study, I outline the optimization strategy I implemented right here on this portfolio site to achieve **99+ Lighthouse Performance**, **LCP < 1.0s**, and **TBT < 50ms**.

---

## 1. The Enemy: Monolithic Vendor Bundles

When Vite or Webpack packages an application by default, it bundles all dependencies into one or two massive chunks. When a user lands on the homepage, the browser must synchronously download, decompress, parse, compile, and execute that entire bundle before responding to user interaction.

### The Solution: Strategic Manual Chunks in Rollup/Vite

Split vendor packages into distinct, cacheable domains:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
  },
});
```

* **Advantage**: If you update application code, the user's browser reuses the cached React and Framer Motion vendor chunks.

---

## 2. Lazy Loading Below-the-Fold Sections with Layout-Stable Skeletons

A user browsing your website only sees the Hero section above the fold. Loading below-the-fold sections (such as Project carousels, Education timelines, or Contact forms with reCAPTCHA) immediately upon initial load wastes crucial main-thread execution time.

### Implementation:
```tsx
import { lazy, Suspense } from 'react';
import Hero from './components/Hero';
import { ProjectsSkeleton } from './components/skeletons/SectionSkeleton';

// Code-split below-the-fold component
const Projects = lazy(() => import('./components/Projects'));

export default function App() {
  return (
    <div>
      {/* Immediate render for instant LCP */}
      <Hero />

      {/* Lazy rendered with zero Cumulative Layout Shift (CLS) */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
    </div>
  );
}
```

By providing **layout-stable skeletons** that match the exact height and layout of the real components, there is **zero Cumulative Layout Shift (CLS)** when the real component mounts.

---

## 3. Framer Motion Optimization: LazyMotion & Strict Mode

Framer Motion is a fantastic animation library, but importing the full library brings `~35kB+` of animation features into your bundle.

By wrapping your application in `<LazyMotion features={domMax} strict>` and using `m` instead of `motion`:

```tsx
import { LazyMotion, domMax, m } from 'framer-motion';

export default function Root() {
  return (
    <LazyMotion features={domMax} strict>
      <m.div animate={{ opacity: 1 }}>
        {/* Animated content */}
      </m.div>
    </LazyMotion>
  );
}
```

This ensures only the animation mechanics actually used are bundled, shedding unnecessary payload from the initial evaluation phase.

---

## 4. Modern Font Loading Without Render-Blocking

Custom web fonts are notorious for delaying First Contentful Paint (FCP). To eliminate render-blocking web fonts:

1. Use `rel="preload"` for your font stylesheets.
2. Load stylesheets asynchronously using `media="print"` with `onload="this.media='all'"`.
3. Enforce `font-display: swap` in `@font-face` definitions to allow the system font to render instantly while the custom typeface streams in.

```html
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```

---

## The Outcome

By orchestrating these optimizations:
* **Lighthouse Performance Score**: Jumped from 78 to **99-100**.
* **Total Blocking Time (TBT)**: Dropped from 420ms to **under 40ms**.
* **Largest Contentful Paint (LCP)**: Achieved in **0.9 seconds**.

Web performance is not about doing one massive thing; it's about eliminating 10 small bottlenecks across your asset pipeline.
