'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown, ArrowUpRight, MapPin, GraduationCap, CircleCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';

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

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Recadrage carré centré sur le visage + taille exacte demandée à Cloudinary,
  // pour éviter toute déformation/flou liée à un redimensionnement CSS d'une image non carrée.
  const publicUrl =
    'https://res.cloudinary.com/drakabvg2/image/upload/w_760,h_900,c_fill,g_face,q_auto,f_auto,dpr_2.0/v1759923729/001_nysary_mayy4m.jpg';

  const statTiles = [
    { icon: CircleCheck, label: t.hero.stats.availabilityLabel, value: t.hero.stats.availabilityValue, accent: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' },
    { icon: GraduationCap, label: t.hero.stats.profileLabel, value: t.hero.stats.profileValue, accent: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' },
    { icon: MapPin, label: t.hero.stats.locationLabel, value: t.hero.stats.locationValue, accent: 'text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800' },
  ];

  return (
    <section
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex items-center relative px-4 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden section-grid outline-none"
    >
      {/* Lightweight CSS-only background wash - no WebGL/canvas */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[-8%] right-[-6%] w-[34rem] h-[34rem] bg-blue-100/70 dark:bg-blue-500/10 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-[-12%] left-[-8%] w-[28rem] h-[28rem] bg-slate-200/60 dark:bg-slate-700/20 rounded-full blur-[120px] animate-float" />
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
              {t.hero.badge}
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <motion.span className="block text-slate-900 dark:text-white" variants={itemVariants}>
                Toky Ralison
              </motion.span>
              <motion.span className="block gradient-text" variants={itemVariants}>
                {t.hero.role}
              </motion.span>
            </h1>

            <motion.p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed" variants={itemVariants}>
              {t.hero.pitch}
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all duration-300 border-0"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t.hero.ctaPrimary}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-100 transition-all duration-300"
                >
                  <a href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    {t.hero.ctaSecondary}
                  </a>
                </Button>
              </motion.div>

              <motion.button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400 font-medium transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.ctaTertiary}
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
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-600 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/50 transition-all duration-300"
                  variants={socialVariants}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            {/* Photo fondue dans le fond de section (pas de cadre/bordure) */}
            <motion.div
              className="relative h-[360px] sm:h-[440px] md:h-full md:min-h-[520px]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
            >
              <img
                src={publicUrl}
                alt={t.hero.photoAlt}
                fetchPriority="high"
                decoding="async"
                className="photo-blend absolute inset-0 w-full h-full object-cover object-top"
              />
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
                    <tile.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{tile.label}</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{tile.value}</p>
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
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">{t.hero.discover}</span>
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
