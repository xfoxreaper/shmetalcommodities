import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { pressReleases, typeLabels } from '../../../../../content/newsroom';
import {
  Section,
  Container,
  Typography,
  PageHeader,
  FadeIn,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return pressReleases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const release = pressReleases.find((r) => r.slug === slug);
  if (!release) return {};

  return {
    title: release.title,
    description: release.excerpt,
    openGraph: {
      title: release.title,
      description: release.excerpt,
      type: 'article',
    },
    alternates: {
      languages: {
        en: `/en/newsroom/${slug}`,
        de: `/de/newsroom/${slug}`,
        zh: `/zh/newsroom/${slug}`,
        ar: `/ar/newsroom/${slug}`,
      },
    },
  };
}

export default async function NewsroomDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const release = pressReleases.find((r) => r.slug === slug);
  if (!release) notFound();

  const t = await getTranslations({ locale, namespace: 'newsroom' });

  return (
    <div className="animate-fade-in">
      <PageHeader title={release.title} locale={locale} />

      <Section background="ivory">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <time
                  dateTime={release.date}
                  className="font-ui text-xs uppercase tracking-widest text-gold"
                >
                  {new Date(release.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <span className="font-ui text-[10px] uppercase tracking-widest text-charcoal/50 border border-charcoal/20 px-2 py-0.5">
                  {typeLabels[release.type]}
                </span>
              </div>

              <div className="space-y-6">
                {release.paragraphs.map((paragraph, i) => (
                  <Typography key={i} variant="body">
                    {paragraph}
                  </Typography>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  href="/newsroom"
                  locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                  className="font-ui text-xs uppercase tracking-widest text-navy hover:text-gold transition-colors duration-150"
                >
                  &larr; {t('backToNewsroom')}
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </div>
  );
}
