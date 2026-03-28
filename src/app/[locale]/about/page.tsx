import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Section,
  Container,
  Typography,
  GoldDivider,
  NoiseTexture,
  PageHeader,
  FadeIn,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'about');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/about',
        de: '/de/about',
        zh: '/zh/about',
        ar: '/ar/about',
      },
    },
  };
}

const stats = [
  { value: '1873', label: 'Founded' },
  { value: '150+', label: 'Years of Trading' },
  { value: '3', label: 'Core Metals' },
  { value: 'Hamburg', label: 'Headquarters' },
];

const valueKeys = ['integrity', 'discipline', 'relationships'] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="animate-fade-in">
      {/* Section 1: Navy PageHeader */}
      <PageHeader
        title={t('heading')}
        subtitle={t('credential')}
        locale={locale}
      />

      {/* Section 2: Heritage Narrative */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <div className="space-y-6 max-w-3xl">
              <Typography variant="body">{t('para1')}</Typography>
              <Typography variant="body">{t('para2')}</Typography>
              <Typography variant="body">{t('para3')}</Typography>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Section 3: Pull Quote Band */}
      <section className="relative bg-navy py-20 md:py-28 overflow-hidden">
        <NoiseTexture opacity={0.06} />
        <Container className="relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="font-display text-gold text-7xl md:text-8xl leading-none select-none -mb-4"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-3xl sm:text-4xl italic font-light leading-relaxed text-ivory max-w-3xl">
                {t('pullQuote')}
              </blockquote>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Section 4: Key Figures */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl md:text-5xl text-navy mb-2">
                    {stat.value}
                  </div>
                  <div className="font-ui text-xs uppercase tracking-widest text-charcoal/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Section 5: Values + CTA */}
      <Section background="ivory" style={{ paddingTop: 0 }}>
        <Container>
          {/* Values label */}
          <div className="mb-12">
            <Typography variant="label" className="text-charcoal/60 mb-4 block">
              {t('valuesLabel')}
            </Typography>
            <GoldDivider />
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {valueKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <div>
                  <span className="font-ui text-xs text-gold tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Typography variant="h3" className="mt-3 mb-4">
                    {t(`values.${key}.title`)}
                  </Typography>
                  <GoldDivider width="40px" className="mb-4" />
                  <Typography variant="body" className="text-charcoal/80">
                    {t(`values.${key}.description`)}
                  </Typography>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-ui text-xs uppercase tracking-widest px-8 py-3.5 bg-navy text-warm-white border border-gold hover:bg-gold hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                {t('ctaButton')}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
