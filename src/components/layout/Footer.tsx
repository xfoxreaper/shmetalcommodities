import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { contact } from '../../../content/contact';
import { navLinks } from '@/lib/navigation';

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright').replace('{year}', String(year));

  return (
    <footer className="bg-navy text-warm-white">
      {/* Main footer: logo+info left, columns right */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left: Logo + company info */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="SH Metal Commodities — Home">
              <Image
                src="/images/logo.png"
                width={280}
                height={152}
                alt="SH Metal Commodities"
                className="w-[120px] sm:w-[140px] h-auto"
              />
            </Link>
            <p className="font-ui text-xs uppercase tracking-widest text-ivory/80">
              {t('footer.descriptor')}
            </p>
            <p className="font-ui text-xs tracking-widest text-ivory/60">
              Est. 1873, Hamburg
            </p>
          </div>

          {/* Right: Nav, Contact, Legal columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {/* Column 1: Navigation */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-widest text-gold mb-5">
                Navigation
              </h3>
              <nav aria-label="Footer navigation" className="flex flex-col gap-3">
                {navLinks.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                    className="font-ui text-xs uppercase tracking-widest text-ivory/80 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-widest text-gold mb-5">
                Contact
              </h3>
              <address className="not-italic flex flex-col gap-2">
                <span className="font-ui text-xs tracking-widest text-ivory/70">
                  Jungfernstieg 1
                </span>
                <span className="font-ui text-xs tracking-widest text-ivory/70">
                  20354 Hamburg
                </span>
                <span className="font-ui text-xs tracking-widest text-ivory/70">
                  Germany
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-ui text-xs tracking-widest text-ivory/80 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold mt-1"
                >
                  {contact.email}
                </a>
              </address>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-widest text-gold mb-5">
                Legal
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/impressum"
                  locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                  className="font-ui text-xs uppercase tracking-widest text-ivory/80 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Impressum
                </Link>
                <Link
                  href="/privacy"
                  locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                  className="font-ui text-xs uppercase tracking-widest text-ivory/80 hover:text-ivory transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <GoldDivider />
      </div>

      {/* Bottom bar: copyright left, language switcher right */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 pb-safe">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs uppercase tracking-widest text-ivory/70">
            {copyright}
          </p>
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
