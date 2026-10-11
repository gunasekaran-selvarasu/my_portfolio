'use client';

import { useState, useEffect } from 'react';
import { LazyMotion, domMax } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomeClient() {
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

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle smooth scroll when navigating to hash from /blog
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - offset),
            behavior: 'smooth',
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Floating Header */}
        <Header activeSection={activeSection} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LazyMotion>
  );
}
