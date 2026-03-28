'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from '@/components/layout/MobileMenu';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'team', href: '/team' },
  { key: 'contact', href: '/contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navBg = !isHomePage || isScrolled
    ? 'bg-navy shadow-md'
    : 'bg-transparent';

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-40 transition-[background-color,box-shadow] duration-200',
          navBg,
        ].join(' ')}
      >
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between overflow-visible" style={{ height: '88px' }}>
          {/* Logo — left */}
          <Link href="/" aria-label="SH Metal Commodities — Home" className="shrink-0">
            <Image
              src="/images/logo.png"
              width={110}
              height={140}
              alt="SH Metal Commodities"
              priority
              className="w-[80px] sm:w-[95px] md:w-[110px] h-auto"
            />
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ key, href }) => {
              const isHome = href === '/';
              const isActive = isHome
                ? pathname === '/'
                : pathname.startsWith(href);

              return (
                <Link
                  key={key}
                  href={href}
                  locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'font-ui text-sm uppercase tracking-widest transition-colors duration-150',
                    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
                    key === 'contact'
                      ? 'border border-gold px-4 py-1.5 hover:bg-gold hover:text-navy text-ivory/80'
                      : isActive
                        ? 'text-gold border-b border-gold pb-0.5'
                        : 'text-ivory/80 hover:text-ivory',
                  ].join(' ')}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop language switcher — right */}
          <div className="hidden md:block">
            <LanguageSwitcher variant="nav" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -me-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ivory focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Bars3Icon className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
