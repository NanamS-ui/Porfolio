'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/three/ParticleBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-10" />,
});

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-20" />
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
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <motion.img
                  src={publicUrl}
                  alt="Profile"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl ring-2 ring-slate-200"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
              <motion.span
                className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Toky Ralison
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent"
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
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Développeur Full Stack
              </span>
            </motion.h2>

            <motion.div
              className="flex items-center justify-center gap-2 text-slate-700"
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
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
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
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
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
            ].map((social, index) => (
              <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-300"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2, y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                  whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-6 w-6 text-slate-700" />
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
            <motion.div
              className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 bg-slate-400 rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </section>
  );
}
