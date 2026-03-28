import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import {
  Typography,
  Container,
  Section,
  GoldDivider,
  NoiseTexture,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'home');
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    ...base,
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      {/* Hero — full viewport, extends behind transparent navbar */}
      <div className="relative min-h-[100dvh] -mt-16 bg-navy flex items-center justify-center animate-fade-in">
        <NoiseTexture opacity={0.06} />
        <Container className="relative z-10 flex flex-col items-center text-center py-32 gap-8">
          <Typography
            variant="display"
            className="text-ivory"
            locale={locale}
          >
            {t('tagline')}
          </Typography>

          <Typography
            variant="body"
            className="text-ivory max-w-2xl text-center opacity-90"
          >
            {t('subTagline')}
          </Typography>

          <Link
            href="/about"
            className="inline-flex items-center justify-center font-ui text-xs uppercase tracking-widest px-8 py-3.5 text-ivory border border-gold hover:bg-gold hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t('cta')}
          </Link>
        </Container>
      </div>

      {/* Trust bar */}
      <Section background="ivory">
        <Container>
          <div className="flex items-center justify-center gap-6">
            <GoldDivider width="60px" />
            <Typography variant="label" className="text-navy">
              {t('trustBar')}
            </Typography>
            <GoldDivider width="60px" />
          </div>
        </Container>
      </Section>
    </>
  );
}
