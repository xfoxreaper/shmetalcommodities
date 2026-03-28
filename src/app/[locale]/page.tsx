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
      {/* ── Section 1: HERO (navy, full viewport) ── */}
      <div
        className="relative bg-navy animate-fade-in flex flex-col items-center justify-center min-h-dvh"
        style={{ marginTop: '-88px', paddingTop: '120px', paddingBottom: '60px' }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        {/* Subtle skyline silhouette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/hero-skyline.svg)',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.4,
          }}
        />
        <NoiseTexture opacity={0.06} />
        <Container className="relative z-10 flex flex-col items-center text-center gap-8 flex-1 justify-center">
          {/* Est. label */}
          <Typography
            variant="label"
            className="text-gold tracking-[0.25em]"
          >
            {t('established')}
          </Typography>

          <Typography
            variant="display"
            className="text-ivory"
            locale={locale}
          >
            {t('tagline')}
          </Typography>

          <Typography
            variant="body"
            className="text-ivory max-w-2xl text-center opacity-90"
          >
            {t('subTagline')}
          </Typography>

          {/* Two CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-ui text-xs uppercase tracking-widest px-8 py-3.5 bg-gold text-navy hover:bg-gold/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center font-ui text-xs uppercase tracking-widest px-8 py-3.5 text-ivory border border-ivory/60 hover:bg-ivory/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="relative z-10 pb-6 animate-bounce" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ivory/50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Section 2: KEY FIGURES BAR (ivory, compact) ── */}
      <Section background="ivory" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <Container>
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
              {([
                { value: t('stats.founded'), label: t('stats.foundedLabel') },
                { value: t('stats.years'), label: t('stats.yearsLabel') },
                { value: t('stats.metals'), label: t('stats.metalsLabel') },
                { value: t('stats.reach'), label: t('stats.reachLabel') },
              ]).map((stat, i) => (
                <div
                  key={i}
                  className={[
                    'flex flex-col items-center text-center',
                    i > 0 ? 'md:border-l md:border-gold/30' : '',
                  ].join(' ')}
                >
                  <span className="font-display text-4xl sm:text-5xl font-light text-navy leading-none">
                    {stat.value}
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-navy/60 mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Section 3: OUR METALS (navy) ── */}
      <Section background="navy">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Typography variant="label" className="text-gold mb-4">
                {t('ourMarkets')}
              </Typography>
              <GoldDivider width="60px" />
            </div>
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

      {/* ── Section 4: OUR APPROACH (ivory) ── */}
      <Section background="ivory">
        <Container>
          <div className="flex flex-col items-center text-center mb-14">
            <Typography variant="label" className="text-navy mb-4">
              {t('ourApproach')}
            </Typography>
            <GoldDivider width="60px" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {pillars.map((key, i) => (
              <FadeIn key={key} delay={i * 150}>
                <div className="flex flex-col">
                  <span className="font-display text-3xl font-light text-gold mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Typography variant="h3" className="text-navy mb-3">
                    {t(`approach.${key}.title`)}
                  </Typography>
                  <GoldDivider width="40px" className="mb-4" />
                  <Typography variant="body" className="text-charcoal/80">
                    {t(`approach.${key}.description`)}
                  </Typography>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Latest Insights teaser ── */}
      <Section background="ivory" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
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
                <Link href={`/insights/${post.slug}`} className="group block">
                  <article className="bg-warm-white p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <Typography variant="label" className="text-gold mb-3">
                      {new Date(post.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </Typography>
                    <Typography variant="h3" className="text-navy mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </Typography>
                    <Typography variant="body" className="text-charcoal/70 line-clamp-3">
                      {post.excerpt}
                    </Typography>
                  </article>
                </Link>
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

      {/* ── Global Presence (navy) ── */}
      <Section background="navy" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
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

      {/* ── Section 5: HERITAGE QUOTE (navy, full-width band) ── */}
      <Section background="navy" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <Container className="flex flex-col items-center text-center">
          <FadeIn>
            {/* Decorative gold quotation mark */}
            <span
              className="font-display text-6xl sm:text-7xl leading-none text-gold/40 select-none mb-4 block text-center"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="max-w-3xl mx-auto">
              <Typography
                variant="display"
                className="text-ivory font-display text-2xl sm:text-3xl md:text-4xl italic font-light leading-relaxed"
              >
                {tAbout('pullQuote')}
              </Typography>
            </blockquote>

            <Typography variant="label" className="text-ivory/50 mt-6">
              {t('quoteAttribution')}
            </Typography>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-widest text-gold hover:text-ivory transition-colors duration-200 mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t('readOurStory')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Section 6: CONTACT CTA (navy, connected to footer) ── */}
      <Section background="navy" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <Container className="flex flex-col items-center text-center">
          <FadeIn>
            <GoldDivider width="60px" className="mb-10 mx-auto" />

            <Typography variant="h2" className="text-ivory mb-4">
              {t('ctaHeading')}
            </Typography>

            <Typography variant="body" className="text-ivory/80 max-w-xl mb-8 mx-auto">
              {t('ctaBody')}
            </Typography>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-ui text-xs uppercase tracking-widest px-8 py-3.5 text-gold border border-gold hover:bg-gold hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t('ctaButton')}
            </Link>

            <a
              href={`mailto:${contact.email}`}
              className="font-ui text-xs tracking-wider text-ivory/50 hover:text-gold transition-colors duration-200 mt-6 block"
            >
              {contact.email}
            </a>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
