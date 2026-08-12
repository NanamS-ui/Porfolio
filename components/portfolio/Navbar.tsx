'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X, ArrowRight, Mail, Download } from 'lucide-react';

const navLinks = [
  { href: 'projects', label: 'Projets' },
  { href: 'skills', label: 'Compétences' },
  { href: 'experience', label: 'Expérience' },
  { href: 'formation', label: 'Formation' },
  { href: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);

      const sections = navLinks.map(l => l.href);
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md border-slate-200 shadow-sm' : 'bg-white/70 border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-2 py-3.5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5"
              aria-label="Retour en haut de page"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/25">
                <Code2 className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="hidden sm:block text-left leading-tight">
                <span className="block text-sm font-semibold text-slate-900">Toky Ralison</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">Développeur Junior</span>
              </span>
            </button>

            <ul className="hidden lg:flex flex-1 items-center justify-center gap-1 px-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      activeSection === link.href ? 'text-blue-700' : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                  >
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-lg bg-blue-50"
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="ml-auto hidden md:flex items-center gap-2">
              <a
                href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                CV
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/25 transition-colors"
              >
                Contact
                <Mail className="h-4 w-4" />
              </button>
            </div>

            <button
              className="ml-auto lg:hidden rounded-lg border border-slate-200 p-2 text-slate-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-16 left-3 right-3 rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xl"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-slate-900 font-semibold text-sm">Toky Ralison</p>
                <p className="text-slate-500 text-xs">Développeur Full Stack Junior</p>
              </div>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    activeSection === link.href
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <motion.a
                  href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf"
                  download
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.26 }}
                >
                  <Download className="h-4 w-4" />
                  CV
                </motion.a>
                <motion.button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Contact
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
