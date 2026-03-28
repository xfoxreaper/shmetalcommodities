import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Section,
  Container,
  Typography,
  PageHeader,
  FadeIn,
  StatsBar,
  QuoteBand,
  NumberedPillar,
  SectionLabel,
  CTASection,
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

      {/* Section 2: Heritage Narrative + Stats */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <div className="max-w-2xl mx-auto space-y-5 text-center">
              <Typography variant="body">{t('para1')}</Typography>
              <Typography variant="body">{t('para2')}</Typography>
              <Typography variant="body">{t('para3')}</Typography>
            </div>
          </FadeIn>
          <div className="mt-14 pt-14 border-t border-gold/20">
            <StatsBar stats={stats} />
          </div>
        </Container>
      </Section>

      {/* Section 3: Pull Quote */}
      <QuoteBand quote={t('pullQuote')} />

      {/* Section 4: Heritage Timeline */}
      <Section background="ivory" padding="compact">
        <Container>
          <SectionLabel align="center">{t('historyLabel')}</SectionLabel>

          <div className="space-y-12 md:space-y-16">
            {/* 1873: Founded in Hamburg */}
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/history-office.jpg"
                    alt="The original SH Metal Commodities office, Hamburg, circa 1912"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <span className="font-display text-4xl md:text-5xl font-light text-gold">{t('timeline.founded.year')}</span>
                  <Typography variant="h3" className="text-navy mt-3 mb-3">
                    {t('timeline.founded.title')}
                  </Typography>
                  <Typography variant="body" className="text-charcoal/80">
                    {t('timeline.founded.description')}
                  </Typography>
                </div>
              </div>
            </FadeIn>

            {/* 1920s: Hamburg Port */}
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <span className="font-display text-4xl md:text-5xl font-light text-gold">{t('timeline.hamburg.year')}</span>
                  <Typography variant="h3" className="text-navy mt-3 mb-3">
                    {t('timeline.hamburg.title')}
                  </Typography>
                  <Typography variant="body" className="text-charcoal/80">
                    {t('timeline.hamburg.description')}
                  </Typography>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/hamburg-port.jpg"
                    alt="Hamburg port in the early twentieth century — the hub of European metal trade"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>

            {/* 1960s: Dubai Expansion */}
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/dubai-port.jpg"
                    alt="Early Dubai port operations — SH Metal Commodities' expansion into Middle Eastern markets"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <span className="font-display text-4xl md:text-5xl font-light text-gold">{t('timeline.dubai.year')}</span>
                  <Typography variant="h3" className="text-navy mt-3 mb-3">
                    {t('timeline.dubai.title')}
                  </Typography>
                  <Typography variant="body" className="text-charcoal/80">
                    {t('timeline.dubai.description')}
                  </Typography>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Section 5: Values */}
      <Section background="navy">
        <Container>
          <SectionLabel align="center" variant="light">
            {t('valuesLabel')}
          </SectionLabel>
          <div className="max-w-2xl mx-auto space-y-10">
            {valueKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 100}>
                <div className="flex gap-6 items-start">
                  <span className="font-display text-4xl font-light text-gold shrink-0 w-12">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Typography variant="h3" className="text-ivory mb-2">
                      {t(`values.${key}.title`)}
                    </Typography>
                    <Typography variant="body" className="text-ivory/85">
                      {t(`values.${key}.description`)}
                    </Typography>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <CTASection
        heading={t('ctaButton')}
        buttonText={t('ctaButton')}
        buttonHref="/contact"
      />
    </div>
  );
}
