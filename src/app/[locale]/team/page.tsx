// Leadership page — SH Metal Commodities
// Single-founder editorial profile layout.

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { team } from '../../../../content/team';
import { generatePageMetadata } from '@/lib/metadata';
import {
  PageHeader,
  Container,
  Section,
  Typography,
  GoldDivider,
  PlaceholderAvatar,
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

      {/* Founder Profile — centered editorial layout */}
      <Section background="ivory" padding="large">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              {/* Avatar + identity */}
              <div className="flex flex-col items-center text-center mb-10">
                <PlaceholderAvatar initials={founder.initials} size={128} />

                <Typography
                  variant="h2"
                  locale={locale}
                  className="mt-6 text-navy"
                >
                  {founder.name}
                </Typography>

                <Typography
                  variant="label"
                  className="mt-2 text-gold-text"
                >
                  {founder.title}
                </Typography>

                <div className="mt-4 w-16">
                  <GoldDivider width="64px" />
                </div>

                {founder.linkedIn && (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 font-ui text-xs uppercase tracking-widest text-gold hover:text-navy transition-colors duration-200"
                  >
                    LinkedIn &rarr;
                  </a>
                )}
              </div>

              {/* Bio */}
              <div className="max-w-2xl mx-auto space-y-5">
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
    </div>
  );
}
