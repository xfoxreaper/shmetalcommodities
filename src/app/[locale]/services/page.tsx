import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { services, brokerageModel } from '../../../../content/services';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { PageHeader, Container, Section, MetalCard, Button, Typography } from '@/components/ui';

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
      {/* T-341: Page header */}
      <PageHeader title={t('heading')} locale={locale} />

      {/* T-342 + T-343: Metal cards grid */}
      <Section background="transparent">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((metal) => (
              /* PLACEHOLDER: metal description */
              <MetalCard key={metal.id} {...metal} />
            ))}
          </div>
        </Container>
      </Section>

      {/* T-344: Brokerage model section */}
      <Section background="ivory">
        <Container>
          {/* PLACEHOLDER: brokerage model description */}
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="body">{brokerageModel}</Typography>
          </div>

          {/* T-345: CTA to contact page */}
          <div className="mt-10 flex justify-center">
            <Link href="/contact" locale={locale}>
              <Button variant="secondary">{t('cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
