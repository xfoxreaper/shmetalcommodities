import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { pressReleases } from '../../../../content/newsroom';
import {
  Section,
  Container,
  Typography,
  GoldDivider,
  PageHeader,
  FadeIn,
  StatsBar,
  QuoteBand,
  NumberedPillar,
  ImageBand,
  SectionLabel,
  Button,
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

      {/* Company office photograph */}
      <ImageBand
        src="/images/history-office.jpg"
        alt="The original SH Metal Commodities office, Hamburg, circa 1912"
        height="h-[300px] md:h-[400px]"
        overlayOpacity="bg-navy/30"
      />
      <div className="bg-ivory text-center py-3">
        <span className="font-ui text-[11px] uppercase tracking-widest text-charcoal/50">
          The original SH Metal Commodities office, Hamburg — circa 1912
        </span>
      </div>

      {/* Section 3: Pull Quote Band */}
      <QuoteBand quote={t('pullQuote')} />

      {/* Heritage Timeline */}
      <Section background="navy">
        <Container>
          <SectionLabel align="center" variant="light">{t('historyLabel')}</SectionLabel>

          <div className="space-y-16 md:space-y-24">
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
                  <span className="font-display text-5xl md:text-6xl font-light text-gold">{t('timeline.founded.year')}</span>
                  <Typography variant="h3" className="text-ivory mt-4 mb-4">
                    {t('timeline.founded.title')}
                  </Typography>
                  <Typography variant="body" className="text-ivory/80">
                    {t('timeline.founded.description')}
                  </Typography>
                </div>
              </div>
            </FadeIn>

            {/* 1920s: Hamburg Port */}
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <span className="font-display text-5xl md:text-6xl font-light text-gold">{t('timeline.hamburg.year')}</span>
                  <Typography variant="h3" className="text-ivory mt-4 mb-4">
                    {t('timeline.hamburg.title')}
                  </Typography>
                  <Typography variant="body" className="text-ivory/80">
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
                  <span className="font-display text-5xl md:text-6xl font-light text-gold">{t('timeline.dubai.year')}</span>
                  <Typography variant="h3" className="text-ivory mt-4 mb-4">
                    {t('timeline.dubai.title')}
                  </Typography>
                  <Typography variant="body" className="text-ivory/80">
                    {t('timeline.dubai.description')}
                  </Typography>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Section 4: Key Figures */}
      <Section background="ivory">
        <Container>
          <StatsBar stats={stats} />
        </Container>
      </Section>

      {/* Latest from Our Newsroom teaser */}
      <Section background="ivory" padding="none" className="pb-8 md:pb-10">
        <Container>
          <FadeIn>
            <div className="mb-8">
              <Typography variant="label" className="text-charcoal/60 mb-4 block">
                Latest News
              </Typography>
              <GoldDivider />
            </div>
            <div className="space-y-6 max-w-3xl">
              {pressReleases.slice(0, 2).map((release) => (
                <Link key={release.slug} href={`/newsroom/${release.slug}`} className="block group">
                  <Typography variant="label" className="text-gold mb-1">
                    {new Date(release.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </Typography>
                  <Typography variant="h3" className="text-navy group-hover:text-gold transition-colors">
                    {release.title}
                  </Typography>
                </Link>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Section 5: Values + CTA */}
      <Section background="ivory" padding="none" className="pb-18 md:pb-26">
        <Container>
          {/* Values label */}
          <SectionLabel align="left" variant="dark">
            {t('valuesLabel')}
          </SectionLabel>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {valueKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <NumberedPillar
                  number={i + 1}
                  title={t(`values.${key}.title`)}
                  description={t(`values.${key}.description`)}
                />
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn>
            <div className="text-center">
              <Link href="/contact">
                <Button>{t('ctaButton')}</Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
