import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import resumeUrl from '../assets/docs/GUNASEKARAN_SELVARASU_Resume_Updated.pdf';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Cloud & Architecture', href: '#cloud' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of the header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800/40 shadow-lg shadow-zinc-950/20' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#about" 
          onClick={(e) => handleLinkClick(e, '#about')}
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-1 group"
        >
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            Gunasekaran
          </span>
          <span className="text-indigo-500 font-extrabold group-hover:translate-x-0.5 transition-transform">.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/40 border border-zinc-800/50 rounded-full px-2 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-zinc-800/60 rounded-full -z-10 border border-zinc-700/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA & External Links */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://github.com/gunasekaran-selvarasu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900/60 rounded-full border border-zinc-800/30"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/gunasekaran-selvarasu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900/60 rounded-full border border-zinc-800/30"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          
          <a
            href={resumeUrl}
            download="GUNASEKARAN_SELVARASU_Resume_Updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none hover:bg-zinc-900/60 rounded-lg border border-zinc-850"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800/60 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`py-2 text-lg font-medium border-b border-zinc-900 transition-colors ${
                      isActive ? 'text-white pl-2 border-l-2 border-l-indigo-500' : 'text-zinc-455'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-900">
                <a
                  href="https://github.com/gunasekaran-selvarasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 rounded-full flex-1 flex justify-center border border-zinc-800/50"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/gunasekaran-selvarasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 rounded-full flex-1 flex justify-center border border-zinc-800/50"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <a
                href={resumeUrl}
                download="GUNASEKARAN_SELVARASU_Resume_Updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 mt-2 rounded-xl text-base font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/10"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
