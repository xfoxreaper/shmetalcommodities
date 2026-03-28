'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeLabels, localeNames, type Locale } from '@/lib/locales';

interface LanguageSwitcherProps {
  variant?: 'nav' | 'footer';
}

export function LanguageSwitcher({ variant = 'nav' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  if (variant === 'footer') {
    return (
      <nav aria-label="Select language">
        <ul className="flex flex-wrap gap-1">
          {locales.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => handleSwitch(loc)}
                aria-label={`Switch to ${localeNames[loc]}`}
                aria-current={loc === locale ? 'true' : undefined}
                className={[
                  'font-ui text-xs uppercase tracking-widest px-2 py-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-150',
                  'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
                  loc === locale
                    ? 'text-gold'
                    : 'text-ivory/60 hover:text-ivory',
                ].join(' ')}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // variant === 'nav'
  return (
    <nav aria-label="Select language">
      <ul className="flex items-center gap-1">
        {locales.map((loc, index) => (
          <li key={loc} className="flex items-center">
            <button
              onClick={() => handleSwitch(loc)}
              aria-label={`Switch to ${localeNames[loc]}`}
              aria-current={loc === locale ? 'true' : undefined}
              className={[
                'font-ui text-xs uppercase tracking-widest px-1.5 py-2 min-h-[44px] flex items-center transition-colors duration-150',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
                loc === locale
                  ? 'text-gold'
                  : 'text-ivory/60 hover:text-ivory',
              ].join(' ')}
            >
              {localeLabels[loc]}
            </button>
            {index < locales.length - 1 && (
              <span aria-hidden="true" className="text-ivory/30 text-xs select-none">
                /
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
