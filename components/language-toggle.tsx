'use client';

import { useLanguage } from '@/components/language-provider';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const other = language === 'fr' ? 'en' : 'fr';

  return (
    <button
      onClick={() => setLanguage(other)}
      className={`inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-3 text-xs font-bold tracking-wide text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${className}`}
      aria-label={t.language.switchTo}
    >
      {language.toUpperCase()}
    </button>
  );
}
