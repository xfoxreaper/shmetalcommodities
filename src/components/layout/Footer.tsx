import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { contact } from '../../../content/contact';

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'about' as const, href: '/about' },
  { key: 'services' as const, href: '/services' },
  { key: 'team' as const, href: '/team' },
  { key: 'contact' as const, href: '/contact' },
];

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright').replace('{year}', String(year));

  return (
    <footer className="bg-navy text-warm-white">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo + descriptor */}
          <div className="flex flex-col gap-4" style={{ alignItems: 'flex-start' }}>
            <Link href="/" aria-label="SH Metal Commodities — Home">
              <Image
                src="/images/logo.png"
                width={110}
                height={140}
                alt="SH Metal Commodities"
                style={{ width: '110px', height: 'auto' }}
              />
            </Link>
            <p className="font-ui text-xs uppercase tracking-widest text-ivory/60">
              {t('footer.descriptor')}
            </p>
          </div>

          {/* Column 2: Nav links (centred on desktop) */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col gap-3 md:items-center"
          >
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                className="font-ui text-xs uppercase tracking-widest text-ivory/60 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          {/* Column 3: Contact + LanguageSwitcher */}
          <div className="flex flex-col gap-4 md:items-end">
            <address className="not-italic flex flex-col gap-1 text-end">
              <a
                href={`mailto:${contact.email}`}
                className="font-ui text-xs uppercase tracking-widest text-ivory/60 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {contact.email}
              </a>
              <span className="font-ui text-xs uppercase tracking-widest text-ivory/40">
                Hamburg, Germany
              </span>
            </address>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1100px] mx-auto px-6 pb-8">
        <GoldDivider className="mb-6" />
        <p className="font-ui text-xs uppercase tracking-widest text-ivory/40 text-center">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
