import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import {
  PageHeader,
  Container,
  Section,
  MetalCard,
  Typography,
  FadeIn,
  ImageBand,
  QuoteBand,
  SectionLabel,
  CTASection,
} from '@/components/ui';
import type { MetalTexture } from '../../../../content/services';

type Props = {
  params: Promise<{ locale: string }>;
};

const metalKeys = [
  { key: 'copper', texture: 'copper' as MetalTexture },
  { key: 'aluminium', texture: 'aluminium' as MetalTexture },
  { key: 'zinc', texture: 'zinc' as MetalTexture },
] as const;

const tradingServiceKeys = ['priceRiskManagement', 'logistics'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'services');
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    ...base,
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `/${loc}/services`])
      ),
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <PageHeader
        title={t('heading')}
        subtitle={t('subtitle')}
        locale={locale}
      />

      {/* The three metals */}
      <Section background="navy" padding="large">
        <Container>
          <SectionLabel align="center" variant="light">{t('marketsLabel')}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metalKeys.map(({ key, texture }, i) => (
              <FadeIn key={key} delay={i * 150}>
                <MetalCard
                  name={t(`${key}.name`)}
                  grades={t(`${key}.grades`)}
                  description={t(`${key}.description`)}
                  texture={texture}
                  expanded
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Port logistics image divider */}
      <ImageBand
        src="/images/hamburg-port.jpg"
        alt="Historic Hamburg port — the foundation of our trading operations"
        overlayOpacity="bg-navy/40"
      />

      {/* How we trade */}
      <Section background="ivory">
        <Container>
          <SectionLabel align="left">{t('howWeTradeLabel')}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {tradingServiceKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <div>
                  <Typography variant="h3" className="text-navy mb-3">
                    {t(`${key}.name`)}
                  </Typography>
                  <div className="w-10 h-px bg-gold mb-4" aria-hidden="true" />
                  <Typography variant="body" className="text-charcoal/80">
                    {t(`${key}.description`)}
                  </Typography>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Principal model pull quote */}
      <QuoteBand quote={t('brokerageModel')} />

      {/* Closing CTA */}
      <CTASection
        heading={t('ctaHeading')}
        buttonText={t('cta')}
        buttonHref="/contact"
      />
    </>
  );
}
