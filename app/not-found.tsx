'use client';

import Link from 'next/link';
import { Code2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center relative px-4 py-20 section-grid overflow-hidden">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[-8%] right-[-6%] w-[34rem] h-[34rem] bg-blue-100/70 dark:bg-blue-500/10 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-[-12%] left-[-8%] w-[28rem] h-[28rem] bg-slate-200/60 dark:bg-slate-700/20 rounded-full blur-[120px] animate-float" />
      </div>

      <motion.div
        className="max-w-lg mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 dark:bg-blue-500 shadow-lg shadow-blue-600/25 mx-auto">
          <Code2 className="h-7 w-7 text-white" />
        </span>

        <h1 className="text-7xl md:text-8xl font-bold tracking-tight gradient-text">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {t.notFound.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t.notFound.description}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 px-6 py-3 text-sm font-medium text-white shadow-md shadow-blue-600/20 transition-colors"
          >
            <Home className="h-4 w-4" />
            {t.notFound.backHome}
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
