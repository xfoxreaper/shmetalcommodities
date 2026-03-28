import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { blogPosts, categoryLabels } from '../../../../content/blog';
import {
  PageHeader,
  Container,
  Section,
  Typography,
  FadeIn,
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });

  return (
    <>
      <PageHeader title={t('heading')} locale={locale} compact />

      <Section background="ivory" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
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
                  <Link
                    href={`/insights/${post.slug}`}
                    locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                    className="group block bg-warm-white overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] bg-navy overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-navy to-[#0E1D35]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Typography variant="caption" className="text-charcoal/50">
                          {formatDate(post.date)}
                        </Typography>
                        <span aria-hidden="true" className="text-charcoal/20 text-xs">|</span>
                        <Typography variant="caption" className="text-gold">
                          {categoryLabels[post.category]}
                        </Typography>
                      </div>

                      <Typography variant="h3" as="h2" className="text-navy mb-3 text-xl sm:text-xl md:text-2xl">
                        {post.title}
                      </Typography>

                      <Typography variant="body" className="text-charcoal/70 text-base sm:text-base md:text-base leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </Typography>

                      <span className="font-ui text-xs uppercase tracking-widest text-gold group-hover:text-navy transition-colors duration-200">
                        {t('readMore')} &rarr;
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
