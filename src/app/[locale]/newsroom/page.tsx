import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { pressReleases, typeLabels } from '../../../../content/newsroom';
import {
  Section,
  Container,
  Typography,
  GoldDivider,
  PageHeader,
  FadeIn,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'newsroom');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/newsroom',
        de: '/de/newsroom',
        zh: '/zh/newsroom',
        ar: '/ar/newsroom',
      },
    },
  };
}

export default async function NewsroomPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'newsroom' });

  return (
    <div className="animate-fade-in">
      <PageHeader title={t('heading')} locale={locale} />

      <Section background="ivory">
        <Container>
          <div className="max-w-3xl mx-auto">
            {pressReleases.length === 0 && (
              <Typography variant="body" className="text-charcoal/60 text-center">
                No press releases yet.
              </Typography>
            )}

            {pressReleases.map((release, i) => (
              <FadeIn key={release.slug} delay={i * 80}>
                <article>
                  {i > 0 && <GoldDivider className="my-8" />}

                  <div className="flex flex-wrap items-center gap-3 mb-3">
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

                  <Typography variant="h3" as="h2" className="mb-2">
                    <Link
                      href={`/newsroom/${release.slug}`}
                      locale={locale as 'en' | 'de' | 'zh' | 'ar'}
                      className="text-navy hover:text-gold transition-colors duration-150"
                    >
                      {release.title}
                    </Link>
                  </Typography>

                  <Typography variant="body" className="text-charcoal/70">
                    {release.excerpt}
                  </Typography>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
