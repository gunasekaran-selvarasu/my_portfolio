'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Heading {
  title: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id);
          return;
        }
      }

      if (headingElements.length > 0 && window.scrollY < headingElements[0].offsetTop) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="my-8 sm:my-10 p-4 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
      <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 mb-3">
        Table of Contents
      </h4>
      <ul className="space-y-2.5 text-xs sm:text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`transition-colors flex items-start sm:items-center gap-2 ${
                  isActive
                    ? 'text-indigo-300 font-semibold pl-1'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 transition-transform ${
                    isActive ? 'text-indigo-400 translate-x-0.5' : 'text-zinc-600'
                  }`}
                />
                <span className="leading-snug break-words">{heading.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
