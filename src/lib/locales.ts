export const locales = ['en', 'de', 'zh', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文',
  ar: 'العربية',
};

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  de: 'DE',
  zh: 'ZH',
  ar: 'AR',
};
