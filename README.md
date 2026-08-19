# Professional Developer Portfolio - Gunasekaran Selvarasu

A premium, modern, accessible, and high-performance developer portfolio built for **Gunasekaran Selvarasu — Senior Frontend Engineer & AWS Certified Cloud Practitioner**.

This project showcases enterprise projects, cloud certifications, work history, and core technical skills. It features a responsive slate-mode aesthetic, glowing gradients, interactive filtering, slide-toggles, and instant WhatsApp chat redirect integrations.

---

## 🚀 Tech Stack

- **Core Framework**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/) (Fast Hot Module Replacement)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using native `@tailwindcss/vite` compilation)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (smooth fade-ins, layout transitions, and accordion slide triggers)
- **Icons**: [Lucide React](https://lucide.dev/) (crisp, modular vector symbols)

---

## ✨ Features

1. **Floating Glassmorphic Navbar**: 
   - Uses `IntersectionObserver` to track the user's scroll location and dynamically highlight active links (`#about`, `#skills`, `#experience`, `#projects`, `#cloud`, `#contact`).
   - Integrated resume CTA triggers direct downloads.
2. **Hero Section**:
   - Outlines core developer metrics (5+ years experience, 10+ projects, 35%+ optimization metrics).
3. **Bento Grid Skills Card**:
   - Organizes React/Next.js stacks, AWS Cloud utilities, and integrations.
   - Highlights the verified **AWS Certified Cloud Practitioner** credential linking directly to the public Credly badge.
4. **Interactive Timeline (Experience)**:
   - Visual timeline mapping career growth across Doodleblue, W2S Solutions, Genxlead, and Touchmark.
   - Clicking job cards expands details using fluid Framer Motion animations.
5. **Dynamic Project Filters**:
   - Sorts projects (All, Next.js / SaaS, E-Commerce, Dashboards, Laravel, React, Wordpress) on the fly with layout transitions.
   - Includes separate cards for Touchmark, HireMe, Origin, SriMurugan Hardwares, Rupini's Salon, Raincentre, and Tradewave.
6. **Actionable Contact Panel**:
   - Clickable copy-to-clipboard email card with visual checkmark states.
   - Interactive WhatsApp card and footer shortcuts linking directly to chat channels.
   - Built-in form validation (Name, Email, Message) with async loader triggers.

---

## 🛠️ Project Structure

```text
portfolio_guna/
├── public/                 # Static assets (Favicons, placeholders, resume downloads)
├── src/
│   ├── assets/             # SVGs, PDFs, and background images
│   ├── components/         # Modular React Components
│   │   ├── Header.tsx      # Floating glassmorphic navbar
│   │   ├── Hero.tsx        # Hero section & stats metrics
│   │   ├── Skills.tsx      # Bento grid core stack & AWS credentials
│   │   ├── Experience.tsx  # Expandable job timeline
│   │   ├── Projects.tsx    # Filterable project portfolio
│   │   ├── Education.tsx   # Degree information & leadership strengths
│   │   ├── Contact.tsx     # Forms & WhatsApp chat redirects
│   │   └── Footer.tsx      # Social navigation & scroll-to-top actions
│   ├── App.tsx             # Main page entry point and section wrapper
│   ├── index.css           # Tailwind v4 import & custom theme variables
│   └── main.tsx            # DOM root client setup
├── vite.config.ts          # Vite bundler & Tailwind configuration
├── package.json            # NPM dependencies configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 💻 Development Setup

Follow these steps to run the application locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 2. Install Dependencies
Run the following command to download packages:
```bash
npm install
```

### 3. Start Development Server
Launch the server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### 4. Build for Production
To build the application for deployment:
```bash
npm run build
```
The output directory will be created at `/dist` containing highly optimized static assets ready to host on platforms like AWS S3, CloudFront, Amplify, Netlify, or Vercel.

---

## 📄 License

This repository is private and is licensed for personal portfolio use by [Gunasekaran Selvarasu](https://github.com/gunasekaran-selvarasu).
