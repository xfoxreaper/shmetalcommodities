import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { locales } from '@/lib/locales';
import { blogPosts, categoryLabels } from '../../../../../content/blog';
import {
  PageHeader,
  Container,
  Section,
  Typography,
  FadeIn,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: `${post.title} | SH Metal Commodities`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `/${loc}/insights/${slug}`])
      ),
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'insights' });

  return (
    <>
      <PageHeader title={post.title} locale={locale} compact />

      <Section background="ivory" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
        <Container className="max-w-3xl">
          <FadeIn>
            {/* Meta labels */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Typography variant="label" className="text-charcoal/60">
                {post.author}
              </Typography>
              <span aria-hidden="true" className="text-charcoal/20 text-xs">|</span>
              <Typography variant="caption" className="text-charcoal/50">
                {formatDate(post.date)}
              </Typography>
              <span aria-hidden="true" className="text-charcoal/20 text-xs">|</span>
              <Typography variant="caption" className="text-gold">
                {categoryLabels[post.category]}
              </Typography>
            </div>

            {/* Featured image */}
            {post.imageUrl && (
              <div className="relative aspect-[16/9] mb-10 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            {/* Body paragraphs */}
            <div className="space-y-6">
              {post.paragraphs.map((paragraph, i) => (
                <Typography key={i} variant="body" className="text-charcoal">
                  {paragraph}
                </Typography>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-14 pt-8 border-t border-charcoal/10">
              <Link
                href="/insights"
                locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                className="font-ui text-xs uppercase tracking-widest text-gold hover:text-navy transition-colors duration-200"
              >
                &larr; {t('backToInsights')}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
