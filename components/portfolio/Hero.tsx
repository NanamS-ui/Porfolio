'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown, ArrowUpRight, MapPin, GraduationCap, CircleCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 15 } },
};

const statTiles = [
  { icon: CircleCheck, label: 'Disponibilité', value: 'Ouvert aux opportunités', accent: 'text-emerald-600 bg-emerald-50' },
  { icon: GraduationCap, label: 'Profil', value: 'Développeur Full Stack Junior', accent: 'text-blue-600 bg-blue-50' },
  { icon: MapPin, label: 'Localisation', value: 'Antananarivo, Madagascar', accent: 'text-slate-600 bg-slate-100' },
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const publicUrl = 'https://res.cloudinary.com/drakabvg2/image/upload/v1759923729/001_nysary_mayy4m.jpg';

  return (
    <section className="min-h-screen flex items-center relative px-4 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden section-grid">
      {/* Lightweight CSS-only background wash - no WebGL/canvas */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[-8%] right-[-6%] w-[34rem] h-[34rem] bg-blue-100/70 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-[-12%] left-[-8%] w-[28rem] h-[28rem] bg-slate-200/60 rounded-full blur-[120px] animate-float" />
      </div>

      <motion.div
        className="max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-[1.15fr_0.85fr] items-center gap-10 md:gap-14">
          <motion.div className="space-y-7 text-left" variants={itemVariants}>
            <motion.div className="eyebrow-badge" variants={itemVariants}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Disponible pour un poste ou une mission
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <motion.span className="block text-slate-900" variants={itemVariants}>
                Toky Ralison
              </motion.span>
              <motion.span className="block gradient-text" variants={itemVariants}>
                Développeur Full Stack Junior
              </motion.span>
            </h1>

            <motion.p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed" variants={itemVariants}>
              Je conçois des applications web rapides, élégantes et robustes, avec une forte exigence UX
              et une architecture propre. Toujours motivé à apprendre et à progresser.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all duration-300 border-0"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Démarrer un projet
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-all duration-300"
                >
                  <a href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger CV
                  </a>
                </Button>
              </motion.div>

              <motion.button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-700 font-medium transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
              >
                Voir mes projets
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </motion.div>

            <motion.div className="flex gap-3 pt-1" variants={containerVariants}>
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
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all duration-300"
                  variants={socialVariants}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-slate-600" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              className="relative surface-card p-6"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 230, damping: 24 }}
            >
              <div className="relative mx-auto w-fit">
                <motion.img
                  src={publicUrl}
                  alt="Photo de Toky Ralison"
                  className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl object-cover ring-4 ring-blue-50 shadow-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3">
              {statTiles.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  className="surface-card p-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: easeOut }}
                  whileHover={{ y: -2 }}
                >
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tile.accent}`}>
                    <tile.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-slate-400">{tile.label}</p>
                    <p className="text-sm font-medium text-slate-800 truncate">{tile.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors"
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
