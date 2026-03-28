'use client';

import { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { navLinks } from '@/lib/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        escapeDeactivates: true,
        onDeactivate: onClose,
        allowOutsideClick: false,
      }}
    >
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center overflow-y-auto py-20 animate-fade-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute top-4 end-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ivory/70 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <XMarkIcon className="w-8 h-8" aria-hidden="true" />
        </button>

        {/* Nav links */}
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map(({ key, href }) => {
              const isHome = href === '/';
              const isActive = isHome
                ? pathname === '/'
                : pathname.startsWith(href);

              return (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={onClose}
                    locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                    className={[
                      'font-display text-3xl sm:text-4xl tracking-wide transition-colors duration-150',
                      'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
                      isActive
                        ? 'text-gold'
                        : 'text-ivory hover:text-gold',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language switcher */}
        <div className="mt-10 pb-safe">
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </FocusTrap>
  );
}
