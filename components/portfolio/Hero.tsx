'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/three/ParticleBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
});

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 15 } },
};

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const publicUrl = "https://res.cloudinary.com/drakabvg2/image/upload/v1759923729/001_nysary_mayy4m.jpg"

  return (
      <section className="min-h-screen flex items-center relative px-4 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden section-grid">
        <div className="absolute inset-0 -z-20" />
        <div className="absolute top-[14%] left-[6%] w-[28rem] h-[28rem] bg-sky-500/20 rounded-full blur-[140px] -z-10 animate-drift" />
        <div className="absolute bottom-[8%] right-[2%] w-[32rem] h-[32rem] bg-amber-400/18 rounded-full blur-[140px] -z-10 animate-drift [animation-delay:3s]" />
        <ParticleBackground />

        <motion.div
          className="max-w-6xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-[1.2fr_0.8fr] items-center gap-10 md:gap-14">
            <motion.div className="space-y-8 text-left" variants={itemVariants}>
              
              <motion.span
                className="block text-sm uppercase tracking-[0.25em] text-slate-300/80"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Portfolio 2026
              </motion.span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                <motion.span
                  className="block gradient-text-subtle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Toky Ralison
                </motion.span>
                <motion.span
                  className="block gradient-text"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                >
                  Full Stack Engineer
                </motion.span>
              </h1>

              <motion.span
                className="block text-base md:text-lg text-slate-300/90 max-w-2xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                Je conçois des produits web rapides, élégants et robustes, avec une forte exigence UX et une architecture propre.
              </motion.span>

              <motion.div
                className="flex items-center gap-2 text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 }}
              >
                <img
                  src="https://flagcdn.com/w40/mg.png"
                  alt="Drapeau de Madagascar"
                  className="h-4 w-6 rounded-sm shadow-sm"
                  loading="lazy"
                />
                <span className="text-sm md:text-base font-medium">Antananarivo, Madagascar</span>
              </motion.div>

              <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 border-0"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Demarrer un projet
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-sky-200/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300"
                  >
                    <a href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Télécharger CV
                    </a>
                  </Button>
                </motion.div>

                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-sky-200/20 bg-slate-950/35 text-slate-100"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Voir mes projets
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </motion.div>

              <motion.div className="flex gap-3 pt-2" variants={containerVariants}>
                {[
                  { href: 'https://github.com/NanamS-ui', icon: Github, label: 'GitHub' },
                  { href: 'http://linkedin.com/in/toky-ralison-1bb162340', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:rahajamananatoky@gmail.com', icon: Mail, label: 'Email' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300"
                    variants={socialVariants}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-slate-200" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-500/30 via-transparent to-amber-400/25 blur-2xl"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="relative rounded-[1.75rem] border border-sky-200/20 bg-slate-950/50 backdrop-blur-xl p-5 md:p-6"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 230, damping: 24 }}
              >
                <div className="relative group mx-auto w-fit">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 via-teal-400 to-amber-400 rounded-full blur opacity-60 group-hover:opacity-90 transition duration-700" />
                  <motion.img
                    src={publicUrl}
                    alt="Photo de Toky"
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-white/25 shadow-2xl ring-2 ring-sky-400/40"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.25 }}
                  />
                </div>

                <div className="mt-6 space-y-2">
                  
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="flex flex-col items-center gap-2 text-slate-500 hover:text-sky-300 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-medium tracking-wider uppercase">Découvrir</span>
              <ChevronDown className="h-5 w-5" />
            </motion.button>
          </motion.div>

        </motion.div>
      </section>
  );
}
