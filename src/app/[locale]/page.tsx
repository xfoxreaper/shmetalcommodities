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
  NoiseTexture,
  MetalCard,
  FadeIn,
  Button,
  SectionLabel,
  InsightCard,
  QuoteBand,
  CTASection,
  WorldMap,
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

  const metals = [
    { id: 'copper', texture: 'copper' as const },
    { id: 'aluminium', texture: 'aluminium' as const },
    { id: 'zinc', texture: 'zinc' as const },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative bg-navy animate-fade-in flex flex-col items-center min-h-[100svh] -mt-[var(--navbar-h)] pt-[var(--navbar-h)]">
        <Image src="/images/hamburg-port.jpg" alt="" fill priority className="object-cover opacity-20" sizes="100vw" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[url('/images/hero-skyline.svg')] bg-bottom bg-no-repeat bg-cover opacity-40" />
        <NoiseTexture opacity={0.06} />
        <Container className="relative z-10 flex flex-col items-center text-center gap-6 flex-1 justify-center">
          <Typography variant="label" className="text-gold tracking-[0.25em]">
            {t('established')}
          </Typography>
          <Typography variant="display" className="text-ivory" locale={locale}>
            {t('tagline')}
          </Typography>
          <Typography variant="body" className="text-ivory max-w-lg text-center opacity-90 [text-wrap:balance]">
            {t('subTagline')}
          </Typography>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/contact">
              <Button variant="primary" className="bg-gold text-navy border-gold hover:bg-gold-light hover:text-navy px-8 py-3.5">
                {t('ctaPrimary')}
              </Button>
            </Link>
            <Link href="/about">
              <button className="font-ui text-xs uppercase tracking-widest text-ivory/70 hover:text-ivory transition-colors px-4 py-2">
                {t('ctaSecondary')} &rarr;
              </button>
            </Link>
          </div>
        </Container>

        <div className="relative z-10 w-full border-t border-ivory/10 bg-navy/40 backdrop-blur-sm py-6">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: t('stats.founded'), label: t('stats.foundedLabel') },
                { value: t('stats.years'), label: t('stats.yearsLabel') },
                { value: t('stats.metals'), label: t('stats.metalsLabel') },
                { value: t('stats.reach'), label: t('stats.reachLabel') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl text-ivory mb-1">{stat.value}</div>
                  <div className="font-ui text-xs uppercase tracking-widest text-ivory/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>

      {/* ── Our Metals ── */}
      <Section background="navy" padding="large">
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

      {/* ── Heritage Quote ── */}
      <QuoteBand quote={tAbout('pullQuote')} attribution={t('quoteAttribution')} />

      {/* ── Latest Insights ── */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <SectionLabel align="left">{t('latestInsights')}</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 150}>
                <InsightCard slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-8 text-center">
              <Link
                href="/insights"
                className="font-ui text-xs uppercase tracking-widest text-gold-text hover:text-navy transition-colors"
              >
                {t('viewAllInsights')} →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Global Presence ── */}
      <Section background="navy">
        <Container>
          <FadeIn>
            <SectionLabel align="center" variant="light">{t('globalPresence')}</SectionLabel>
          </FadeIn>
          <FadeIn>
            <WorldMap />
          </FadeIn>
        </Container>
      </Section>

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
