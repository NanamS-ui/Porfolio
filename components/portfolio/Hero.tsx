'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/three/ParticleBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0a0f] -z-10" />,
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
      <section className="min-h-screen flex items-center justify-center relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f] -z-20" />
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10" />
        <ParticleBackground />

        <motion.div
          className="max-w-5xl mx-auto text-center space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse-glow"></div>
              <motion.img
                  src={publicUrl}
                  alt="Profile"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-white/20 shadow-2xl ring-2 ring-violet-500/30"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              <motion.span
                className="block gradient-text-subtle"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Toky Ralison
              </motion.span>
              <motion.span
                className="block gradient-text-subtle"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                RAHAJAMANANA
              </motion.span>
            </h1>

            <motion.h2
              className="text-5xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gradient-text">
                Développeur Full Stack
              </span>
            </motion.h2>

            <motion.div
              className="flex items-center justify-center gap-2 text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <img
                  src="https://flagcdn.com/w40/mg.png"
                  alt="Drapeau de Madagascar"
                  className="h-4 w-6 rounded-sm shadow-sm"
                  loading="lazy"
              />
              <span className="text-sm md:text-base font-medium">Malgache · Madagascar</span>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              Je crée des expériences web modernes et performantes avec une attention particulière aux détails et à l'expérience utilisateur
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center pt-6"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 border-0"
              >
                <Mail className="mr-2 h-5 w-5" />
                Me Contacter
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300"
              >
                <a href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger mon CV
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center pt-8"
            variants={containerVariants}
          >
            {[
              { href: "https://github.com/NanamS-ui", icon: Github, label: "GitHub" },
              { href: "http://linkedin.com/in/toky-ralison-1bb162340", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:rahajamananatoky@gmail.com", icon: Mail, label: "Email" },
            ].map((social) => (
              <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
                  variants={socialVariants}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-6 w-6 text-slate-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="flex flex-col items-center gap-2 text-slate-500 hover:text-violet-400 transition-colors"
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
