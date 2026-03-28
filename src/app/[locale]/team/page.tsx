// Leadership page — SH Metal Commodities
// Single-founder profile layout replacing the previous team grid.

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { team } from '../../../../content/team';
import { generatePageMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import {
  PageHeader,
  Container,
  Section,
  Typography,
  GoldDivider,
  PlaceholderAvatar,
  Button,
  FadeIn,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'team');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/team',
        de: '/de/team',
        zh: '/zh/team',
        ar: '/ar/team',
      },
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });

  const founder = team[0];

  // Split bio at first period+space into two paragraphs
  const splitIndex = founder.bio.indexOf('. ');
  const bioParagraph1 =
    splitIndex !== -1 ? founder.bio.slice(0, splitIndex + 1) : founder.bio;
  const bioParagraph2 =
    splitIndex !== -1 ? founder.bio.slice(splitIndex + 2) : '';

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={t('heading')}
        subtitle={t('subtitle')}
        locale={locale}
      />

      {/* Founder Profile */}
      <Section background="ivory">
        <Container>
          <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">
            {/* Left column — avatar, name, title */}
            <div className="flex flex-col items-center md:items-start">
              <PlaceholderAvatar initials={founder.initials} size={200} />

              <Typography
                variant="h2"
                locale={locale}
                className="mt-6 text-navy text-center md:text-left"
              >
                {founder.name}
              </Typography>

              <Typography
                variant="label"
                className="mt-2 text-charcoal/70 text-center md:text-left"
              >
                {founder.title}
              </Typography>

              <div className="mt-4 w-full max-w-[200px]">
                <GoldDivider />
              </div>

              {founder.linkedIn && (
                <a
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 font-ui text-xs uppercase tracking-widest text-gold hover:text-navy transition-colors duration-200"
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* Right column — bio */}
            <div className="space-y-6">
              <Typography variant="body" className="text-charcoal">
                {bioParagraph1}
              </Typography>
              {bioParagraph2 && (
                <Typography variant="body" className="text-charcoal">
                  {bioParagraph2}
                </Typography>
              )}
            </div>
          </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <div className="text-center">
              <Typography variant="h3" className="text-navy">
                {t('ctaHeading')}
              </Typography>
              <div className="mt-6">
                <Link href="/contact">
                  <Button>{t('ctaButton')}</Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
