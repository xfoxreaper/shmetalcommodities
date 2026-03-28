import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { locales } from '@/lib/locales';
import { contact } from '../../../content/contact';
import { blogPosts } from '../../../content/blog';
import {
  Typography,
  Container,
  Section,
  GoldDivider,
  NoiseTexture,
  MetalCard,
  FadeIn,
  WorldMap,
  Button,
  SectionLabel,
  StatsBar,
  NumberedPillar,
  InsightCard,
  QuoteBand,
  CTASection,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'home');
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    ...base,
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tServices = await getTranslations({ locale, namespace: 'services' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });

  const pillars = ['independent', 'experienced', 'trusted'] as const;
  const metals = [
    { id: 'copper', texture: 'copper' as const },
    { id: 'aluminium', texture: 'aluminium' as const },
    { id: 'zinc', texture: 'zinc' as const },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative bg-navy animate-fade-in flex flex-col items-center justify-center min-h-dvh -mt-[var(--navbar-h)] pt-[120px] pb-[60px]">
        <Image src="/images/hero-bg.jpg" alt="" fill priority className="object-cover opacity-20" sizes="100vw" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[url('/images/hero-skyline.svg')] bg-bottom bg-no-repeat bg-cover opacity-40" />
        <NoiseTexture opacity={0.06} />
        <Container className="relative z-10 flex flex-col items-center text-center gap-8 flex-1 justify-center">
          <Typography variant="label" className="text-gold tracking-[0.25em]">
            {t('established')}
          </Typography>
          <Typography variant="display" className="text-ivory" locale={locale}>
            {t('tagline')}
          </Typography>
          <Typography variant="body" className="text-ivory max-w-2xl text-center opacity-90">
            {t('subTagline')}
          </Typography>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="/contact">
              <Button variant="primary" className="bg-gold text-navy border-gold hover:bg-gold/90 hover:text-navy">
                {t('ctaPrimary')}
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-ivory border-ivory/60 hover:bg-ivory/10 hover:text-ivory">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </div>
        </Container>

        <div className="relative z-10 pb-6 animate-bounce" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ivory/50">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Stats ── */}
      <Section background="ivory" padding="tight">
        <Container>
          <FadeIn>
            <StatsBar stats={[
              { value: t('stats.founded'), label: t('stats.foundedLabel') },
              { value: t('stats.years'), label: t('stats.yearsLabel') },
              { value: t('stats.metals'), label: t('stats.metalsLabel') },
              { value: t('stats.reach'), label: t('stats.reachLabel') },
            ]} />
          </FadeIn>
        </Container>
      </Section>

      {/* ── Our Metals ── */}
      <Section background="navy">
        <Container>
          <FadeIn>
            <SectionLabel align="center" variant="light">{t('ourMarkets')}</SectionLabel>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metals.map((metal, i) => (
              <FadeIn key={metal.id} delay={i * 150}>
                <MetalCard
                  name={tServices(`${metal.id}.name`)}
                  grades={tServices(`${metal.id}.grades`)}
                  description={tServices(`${metal.id}.description`)}
                  texture={metal.texture}
                />
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-widest text-gold hover:text-ivory transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t('exploreMarkets')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Our Approach ── */}
      <Section background="ivory">
        <Container>
          <SectionLabel align="center">{t('ourApproach')}</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {pillars.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <NumberedPillar
                  number={i + 1}
                  title={t(`approach.${key}.title`)}
                  description={t(`approach.${key}.description`)}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Latest Insights ── */}
      <Section background="ivory" padding="compact">
        <Container>
          <FadeIn>
            <div className="mb-10 flex items-center gap-6">
              <GoldDivider width="40px" />
              <Typography variant="label" className="text-navy/60">
                {t('latestInsights')}
              </Typography>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 150}>
                <InsightCard slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-10 text-center">
              <Link
                href="/insights"
                className="font-ui text-sm uppercase tracking-widest text-navy hover:text-gold transition-colors"
              >
                {t('viewAllInsights')} →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Global Presence ── */}
      <Section background="navy" padding="compact">
        <Container>
          <FadeIn>
            <div className="mb-8 flex items-center justify-center gap-6">
              <GoldDivider width="40px" />
              <Typography variant="label" className="text-ivory/60">
                {t('globalPresence')}
              </Typography>
              <GoldDivider width="40px" />
            </div>
            <WorldMap />
          </FadeIn>
        </Container>
      </Section>

      {/* ── Heritage Quote ── */}
      <QuoteBand quote={tAbout('pullQuote')} attribution={t('quoteAttribution')} />

      {/* ── Contact CTA ── */}
      <CTASection
        heading={t('ctaHeading')}
        body={t('ctaBody')}
        buttonText={t('ctaButton')}
        buttonHref="/contact"
        email={contact.email}
        locale={locale}
      />
    </>
  );
}
