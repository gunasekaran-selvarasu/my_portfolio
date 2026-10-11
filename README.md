# Gunasekaran Selvarasu — Senior Fullstack Developer Portfolio & Engineering Blog

A high-performance, accessible, and modern developer portfolio and architectural engineering blog built for **Gunasekaran Selvarasu — Senior Fullstack Developer & AWS Certified Cloud Practitioner**.

Engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Pre-rendered as static HTML (`output: 'export'`) for sub-50ms edge delivery via Cloudflare Pages and Dockerized Nginx containers, validated with a full Playwright E2E and visual testing suite.

---

## 🚀 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS (`@tailwindcss/postcss`) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) (`LazyMotion` / `domMax`) |
| **Blog & Markdown** | [Marked](https://marked.js.org/) with server-side frontmatter parsing |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | `next/font/google` (*Plus Jakarta Sans* & *Inter* with zero layout shift) |
| **Linter** | [Oxlint](https://oxc.rs/) (high-speed linting) |
| **Testing** | [Playwright Test](https://playwright.dev/) (Desktop & Mobile Chrome: E2E, CWV Performance, Visual UI) |
| **Containers** | Multi-Stage [Docker](https://www.docker.com/) + Production [Nginx](https://nginx.org/) + Docker Compose |
| **Edge Hosting** | [Cloudflare Pages](https://pages.cloudflare.com/) (Assets directory: `./out`) |

---

## ✨ Key Features

### 1. Portfolio Experience
- **Adaptive Glassmorphic Header**: IntersectionObserver scroll-spy with active navigation pills, smooth hash scrolling across routes, and animated mobile drawer menu.
- **Hero Metrics**: Quick stats (5+ years experience, 15+ projects, AWS Cloud Practitioner) with spring interaction CTAs and responsive picture avatar.
- **Bento Grid Skills**: Categorized technical competencies across React/Next.js ecosystem, backend microservices, SQL/NoSQL databases, and AWS cloud infrastructure.
- **Career Timeline**: Interactive expandable experience accordion highlighting architectural achievements at Doodleblue Innovations, W2S Solutions, Genxlead, and Touchmark DesOps.
- **Filterable Projects**: Category filters (*Fullstack / SaaS*, *E-Commerce*, *Dashboards*, *React.js*, *Next.js*, *Laravel*) with Framer Motion layout transitions.
- **Actionable Inquiries**: Copy-to-clipboard email card with visual feedback, direct WhatsApp chat links, and dynamic EmailJS contact form guarded with reCAPTCHA.

### 2. Architectural Engineering Blog
- **Static Site Generation (SSG)**: Markdown articles dynamically parsed at build time via Node.js file system APIs into pre-rendered static HTML routes.
- **Interactive Directory**: Real-time keyword search across titles and tags, category filter pills, and featured post spotlights.
- **Reading Progress Bar**: Fixed progress indicator tracking real-time scroll depth across the article.
- **Table of Contents (Scroll Spy)**: Auto-extracted H2 headings with anchor navigation and active section tracking.
- **Adjacent Pagination & Sharing**: "Previous Post" / "Next Post" cards, direct LinkedIn/Twitter share links, and instant link copying.

### 3. SEO & Web Vitals Architecture
- **Zero Cumulative Layout Shift (CLS: 0.000)**: Native `next/font/google` self-hosting prevents font swap shifts.
- **Rich Structured Data (JSON-LD)**: Schemas for `WebSite`, `Person`, `ProfilePage`, `ItemList`, and `TechArticle`.
- **Automated Metadata**: Per-page Open Graph and Twitter Card tags, canonical URLs, dynamic [`sitemap.xml`](file:///d:/Projects/portfolio_guna/src/app/sitemap.ts), [`robots.txt`](file:///d:/Projects/portfolio_guna/src/app/robots.ts), and branded 404 error page.

---

## 🛠️ Project Structure

```text
portfolio_guna/
├── .github/
│   └── workflows/ci.yml       # GitHub Actions CI workflow (lint, build, sitemap check)
├── e2e/                       # Playwright Test Suite
│   ├── blog.spec.ts           # Blog directory listing & search tests
│   ├── blog-post.spec.ts      # Reading progress, TOC scroll spy, share buttons
│   ├── home.spec.ts           # Hero, skills, experience accordion, contact form
│   ├── navigation.spec.ts     # Header styling, logo scroll, mobile drawer
│   ├── performance.spec.ts    # Core Web Vitals (FCP, LCP, CLS, TTFB) & bundle budgets
│   ├── seo-metadata.spec.ts   # JSON-LD schemas, meta tags, sitemap, robots, 404
│   ├── visual.spec.ts         # Pixel-accurate visual regression tests
│   └── visual.spec.ts-snapshots/ # Baseline desktop & mobile visual screenshots
├── public/                    # Static assets, avatar pictures, resume PDF
├── src/
│   ├── app/                   # Next.js 16 App Router
│   │   ├── blog/
│   │   │   ├── [slug]/        # Dynamic SSG blog post page & reading components
│   │   │   │   ├── ReadingProgress.tsx
│   │   │   │   ├── ShareButtons.tsx
│   │   │   │   ├── TableOfContents.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── BlogListClient.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout with fonts, JSON-LD, global SEO
│   │   ├── not-found.tsx      # Branded 404 page
│   │   ├── page.tsx           # Home page server entry
│   │   ├── HomeClient.tsx     # Home client wrapper with section scroll-spy
│   │   ├── robots.ts          # Dynamic robots.txt
│   │   └── sitemap.ts         # Dynamic sitemap.xml
│   ├── components/            # Modular UI components
│   │   ├── Contact.tsx        # Contact forms & copy card
│   │   ├── Education.tsx      # Education credentials
│   │   ├── Experience.tsx     # Career timeline accordion
│   │   ├── Footer.tsx         # Footer & social links
│   │   ├── Header.tsx         # Navbar & mobile menu
│   │   ├── Hero.tsx           # Hero section & stats
│   │   ├── Projects.tsx       # Filterable projects grid
│   │   └── Skills.tsx         # Bento grid skills
│   ├── content/blog/          # Markdown engineering articles
│   ├── lib/
│   │   └── blog.ts            # Server-side markdown & frontmatter parser
│   └── index.css              # Tailwind CSS v4 styling & theme configuration
├── Dockerfile                 # Multi-stage production build (Node 22 + Nginx Alpine)
├── docker-compose.yml         # Container orchestration (port 8080)
├── next.config.ts             # Next.js configuration (output: 'export', trailingSlash)
├── nginx.conf                 # Production Nginx with caching & 404 handling
├── playwright.config.ts       # Playwright multi-device configuration
├── wrangler.json              # Cloudflare Pages deployment configuration
└── package.json               # Dependencies & automation scripts
```

---

## 💻 Development Setup

### 1. Prerequisites
- **Node.js**: v20.x or v22.x LTS
- **npm**: v10.x or v11.x

### 2. Installation
```bash
git clone https://github.com/gunasekaran-selvarasu/my_portfolio.git
cd my_portfolio
npm install
```

### 3. Environment Configuration
Copy the sample environment file and configure your keys:
```bash
cp .env.example .env
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN` | EmailJS Admin Notification Template ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_CUSTOMER` | EmailJS Customer Auto-Reply Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Public API Key |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 / v3 Site Key |

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with hot module reloading.

### 5. Static Production Build
```bash
npm run build
```
Generates pre-rendered static HTML and assets in the [`./out`](file:///d:/Projects/portfolio_guna/out) directory.

### 6. Linting
```bash
npm run lint
```
Runs Oxlint across all source files for fast TypeScript/JavaScript linting.

---

## 🧪 Testing Suite (Playwright)

The project includes an **In-and-Out testing suite** covering End-to-End user flows, Core Web Vitals performance benchmarks, SEO validation, and Pixel-accurate Visual Regression across **Desktop Chrome** and **Mobile Chrome**:

```bash
# Run all tests (E2E, SEO, Performance, Visual)
npm run test:e2e

# Run tests with the interactive Playwright UI
npm run test:e2e:ui

# Run Core Web Vitals & asset budget performance tests
npm run test:e2e:perf

# Run Visual Regression tests against baseline snapshots
npm run test:e2e:visual

# Re-baseline visual regression snapshots (after approved UI updates)
npm run test:e2e:update-snapshots
```

### Core Web Vitals Benchmarks

| Metric | Target | Result | Status |
| :--- | :--- | :--- | :---: |
| **TTFB (Time to First Byte)** | `< 800ms` | **8ms – 45ms** | ⚡ Instantaneous |
| **FCP (First Contentful Paint)** | `< 1800ms` | **408ms – 932ms** | ⚡ Sub-second |
| **LCP (Largest Contentful Paint)** | `< 2500ms` | **408ms – 2332ms** | ⚡ Good |
| **CLS (Cumulative Layout Shift)** | `< 0.1` | **0.000** | ⚡ Zero Shift |
| **Initial Transferred JS** | `< 350 KB` | **1.7 KB** | ⚡ Ultra-light |

---

## 🐳 Docker Deployment

The application includes a multi-stage production container setup using **Node.js 22 Alpine** (builder) and **Nginx Alpine** (runner):

### Run with Docker Compose
```bash
docker compose up --build -d
```
Access the containerized application at [http://localhost:8080](http://localhost:8080).

### Manage Container
```bash
# Check container status & health
docker ps --filter "name=portfolio_guna"

# View access & error logs
docker compose logs -f

# Stop container
docker compose down
```

---

## ☁️ Cloudflare Pages Deployment

Deploy directly via Cloudflare Pages or Git integration using the provided [`wrangler.json`](file:///d:/Projects/portfolio_guna/wrangler.json):

- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Not Found Route**: `404-page` (routes to `404.html`)

---

## 📄 License

This repository is licensed for personal portfolio use by [Gunasekaran Selvarasu](https://github.com/gunasekaran-selvarasu).
