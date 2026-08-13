import type { Language } from '@/lib/i18n';

// Two separate CV files are hosted in Supabase Storage, one per language.
export function getCvUrl(language: Language): string {
  const file = language === 'en' ? 'CV_Toky_en.pdf' : 'CV_Toky_fr.pdf';
  return `https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/${file}`;
}
