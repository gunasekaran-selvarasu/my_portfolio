import { useState, useEffect, Suspense } from 'react';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";

const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const showAnalytics = import.meta.env.PROD && !isLocal;

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'projects', 'cloud', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Triggers when the section takes up the primary viewport area
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-250">
      {/* Floating Header */}
      <Header activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" />}>
          <Education />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics */}
      {showAnalytics && <Analytics />}

      {/* Vercel Speed Insights */}
      {showAnalytics && <SpeedInsights />}
    </div>
  );
}
