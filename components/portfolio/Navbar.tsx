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
        className="fixed inset-x-0 top-0 z-50 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto w-full max-w-7xl px-3 pt-4 md:px-6 pointer-events-auto">
          <div
            className={`rounded-[24px] border transition-all duration-500 ${
              scrolled
                ? 'border-sky-200/25 bg-[#061423]/88 backdrop-blur-2xl shadow-2xl shadow-sky-500/20'
                : 'border-white/10 bg-[#08121f]/65 backdrop-blur-xl'
            }`}
          >
            <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-3">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 rounded-xl border border-sky-200/20 bg-slate-900/35 px-2.5 py-2 text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Retour en haut de page"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400">
                  <Code2 className="h-4 w-4 text-white" />
                </span>
                <span className="hidden sm:block text-left leading-tight">
                  <span className="block text-sm font-semibold">Toky Ralison</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-300/70">Engineer</span>
                </span>
              </motion.button>

              <ul className="hidden lg:flex flex-1 items-center justify-center gap-1.5 px-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <motion.button
                      onClick={() => scrollTo(link.href)}
                      className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeSection === link.href ? 'text-white' : 'text-slate-300 hover:text-white'
                      }`}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      aria-current={activeSection === link.href ? 'page' : undefined}
                    >
                      {activeSection === link.href && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute inset-0 rounded-lg border border-sky-200/25 bg-gradient-to-r from-sky-500/20 to-cyan-500/15"
                          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>

              <div className="ml-auto hidden md:flex items-center gap-2">
                <motion.a
                  href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/20 bg-slate-900/35 px-3 py-2 text-sm text-slate-100"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Download className="h-4 w-4" />
                  CV
                </motion.a>
                <motion.button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-3.5 py-2 text-sm font-medium text-white"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Contact
                  <Mail className="h-4 w-4" />
                </motion.button>
              </div>

              <motion.button
                className="ml-auto lg:hidden rounded-xl border border-sky-200/20 bg-slate-900/45 p-2 text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-20 left-3 right-3 rounded-3xl border border-sky-200/20 bg-[#061423]/95 backdrop-blur-2xl p-5 space-y-3 shadow-2xl shadow-sky-500/20"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3 rounded-xl border border-sky-200/15 bg-slate-950/35">
                <p className="text-white font-semibold text-sm">Toky Ralison</p>
                <p className="text-slate-300 text-xs">Developpeur Full Stack</p>
              </div>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    activeSection === link.href
                      ? 'text-white bg-sky-500/20 border border-sky-300/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
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
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-sky-200/20 text-slate-100 bg-slate-900/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.26 }}
                >
                  <Download className="h-4 w-4" />
                  CV
                </motion.a>
                <motion.button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white text-sm font-medium"
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
