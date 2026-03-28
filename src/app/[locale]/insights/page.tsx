import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { blogPosts, categoryLabels } from '../../../../content/blog';
import {
  PageHeader,
  Container,
  Section,
  Typography,
  FadeIn,
  InsightCard,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'insights');
  const t = await getTranslations({ locale, namespace: 'insights' });

  return {
    ...base,
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `/${loc}/insights`])
      ),
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });

  return (
    <>
      <PageHeader title={t('heading')} locale={locale} />

      <Section background="ivory">
        <Container>
          {blogPosts.length === 0 ? (
            <FadeIn>
              <Typography variant="body" className="text-charcoal/60 text-center">
                Check back soon for market commentary and analysis.
              </Typography>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 100}>
                  <InsightCard
                    slug={post.slug}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl}
                    categoryLabel={categoryLabels[post.category]}
                    readMoreLabel={t('readMore')}
                    locale={locale}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
