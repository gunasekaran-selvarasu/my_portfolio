import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import {
  SkillsSkeleton,
  ExperienceSkeleton,
  ProjectsSkeleton,
  EducationSkeleton,
  ContactSkeleton,
} from './components/skeletons/SectionSkeleton';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Code Splitting / Lazy Loading for below-the-fold sections to achieve TBT <= 150ms
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'projects', 'cloud', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const observeSections = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeSections();

    // Re-observe when lazy components finish mounting
    const mainEl = document.querySelector('main');
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    if (mainEl) {
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Floating Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Above-the-fold Hero Section (Immediate render for LCP <= 1.2s) */}
        <Hero />

        {/* Below-the-fold lazy-loaded sections with layout-stable skeletons for TBT <= 150ms */}
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<EducationSkeleton />}>
          <Education />
        </Suspense>

        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
