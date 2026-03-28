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
      {/* Top section: Logo + descriptor, centered */}
      <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <Link href="/" aria-label="SH Metal Commodities — Home">
            <Image
              src="/images/logo.png"
              width={280}
              height={152}
              alt="SH Metal Commodities"
              className="w-[140px] sm:w-[160px] h-auto"
            />
          </Link>
          <p className="font-ui text-xs uppercase tracking-widest text-ivory/80">
            {t('footer.descriptor')}
          </p>
          <p className="font-ui text-xs tracking-widest text-ivory/60">
            Est. 1873, Hamburg
          </p>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-[1100px] mx-auto px-6">
        <GoldDivider />
      </div>

      {/* Middle section: 3-column grid */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
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

          {/* Column 2: Contact + Language */}
          <div>
            <h3 className="font-ui text-xs uppercase tracking-widest text-gold mb-5">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-2 mb-6">
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

            <h3 className="font-ui text-xs uppercase tracking-widest text-gold mb-4">
              Language
            </h3>
            <LanguageSwitcher variant="footer" />
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

      {/* Gold divider */}
      <div className="max-w-[1100px] mx-auto px-6">
        <GoldDivider />
      </div>

      {/* Bottom bar: copyright */}
      <div className="max-w-[1100px] mx-auto px-6 py-8 pb-safe">
        <p className="font-ui text-xs uppercase tracking-widest text-ivory/70 text-center">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
