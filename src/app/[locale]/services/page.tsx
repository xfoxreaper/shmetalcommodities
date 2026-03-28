import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { contact } from '../../../../content/contact';
import {
  PageHeader,
  Container,
  Section,
  MetalCard,
  Typography,
  GoldDivider,
  FadeIn,
  ImageBand,
  QuoteBand,
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
        compact
      />

      {/* The three metals */}
      <Section background="ivory" padding="compact">
        <Container>
          <div className="mb-10 flex items-center gap-6">
            <GoldDivider width="40px" />
            <Typography variant="label" className="text-navy/60">
              {t('marketsLabel')}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metalKeys.map(({ key, texture }, i) => (
              <FadeIn key={key} delay={i * 150}>
                <MetalCard
                  name={t(`${key}.name`)}
                  grades={t(`${key}.grades`)}
                  description={t(`${key}.description`)}
                  texture={texture}
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
      <Section background="ivory" padding="none" className="pb-12 md:pb-16">
        <Container>
          <div className="mb-10 flex items-center gap-6">
            <GoldDivider width="40px" />
            <Typography variant="label" className="text-navy/60">
              {t('howWeTradeLabel')}
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {tradingServiceKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <div>
                  <Typography variant="h3" className="text-navy mb-4">
                    {t(`${key}.name`)}
                  </Typography>
                  <div className="w-10 h-px bg-gold mb-6" aria-hidden="true" />
                  <Typography variant="body" className="text-charcoal">
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

      {/* CTA section */}
      <CTASection
        heading={t('ctaHeading')}
        body={t('ctaBody')}
        buttonText={t('cta')}
        buttonHref="/contact"
        email={contact.email}
        locale={locale}
      />
    </>
  );
}
