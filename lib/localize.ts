import type { Language } from '@/lib/i18n';

/**
 * Picks the English value when browsing in English and it's been filled in,
 * otherwise falls back to the French (default) value. This lets Supabase
 * content be translated progressively, row by row, without ever showing
 * empty text for rows that haven't been translated yet.
 */
export function localize(
  frValue: string,
  enValue: string | null | undefined,
  language: Language
): string {
  if (language === 'en' && enValue && enValue.trim().length > 0) {
    return enValue;
  }
  return frValue;
}

export function localizeList(
  frValue: string[],
  enValue: string[] | null | undefined,
  language: Language
): string[] {
  if (language === 'en' && enValue && enValue.length > 0) {
    return enValue;
  }
  return frValue;
}
