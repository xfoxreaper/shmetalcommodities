import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { metals, tradingServices, principalModel } from '../../../../content/services';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { PageHeader, Container, Section, MetalCard, Button, Typography, GoldDivider, NoiseTexture } from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

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
        subtitle={principalModel}
        locale={locale}
      />

      {/* The three metals — navy with noise */}
      <Section background="navy">
        <div className="relative">
          <NoiseTexture opacity={0.04} />
          <Container className="relative z-10">
            <div className="mb-12 flex items-center gap-6">
              <GoldDivider width="40px" />
              <Typography variant="label" className="text-ivory/60">
                Markets We Trade
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {metals.map((metal) => (
                <MetalCard key={metal.id} {...metal} />
              ))}
            </div>
          </Container>
        </div>
      </Section>

      {/* How we trade — ivory */}
      <Section background="ivory">
        <Container>
          <div className="mb-12 flex items-center gap-6">
            <GoldDivider width="40px" />
            <Typography variant="label" className="text-navy/60">
              How We Trade
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {tradingServices.map((service) => (
              <div key={service.id}>
                <Typography variant="h3" className="text-navy mb-4">
                  {service.name}
                </Typography>
                <div className="w-10 h-px bg-gold mb-6" aria-hidden="true" />
                <Typography variant="body" className="text-charcoal">
                  {service.description}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA — navy */}
      <Section background="navy">
        <Container>
          <div className="flex flex-col items-center text-center gap-6">
            <Typography variant="h3" className="text-ivory">
              Speak to Our Team
            </Typography>
            <GoldDivider width="40px" />
            <Typography variant="body" className="text-ivory/70 max-w-xl">
              Whether you are a producer seeking a reliable offtake partner or a consumer looking for a trusted supply relationship, we are open to enquiries.
            </Typography>
            <Link href="/contact" locale={locale}>
              <Button variant="primary">{t('cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
