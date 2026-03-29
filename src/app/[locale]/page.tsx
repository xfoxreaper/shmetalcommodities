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
  SectionLabel,
  InsightCard,
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

  const metals = ['copper', 'aluminium', 'zinc'];

  return (
    <>
      {/* ── Unified Hero ── */}
      <div className="relative bg-navy animate-fade-in flex flex-col h-[100svh] -mt-[var(--navbar-h)] pt-[var(--navbar-h)]">
        <Image src="/images/hamburg-port.jpg" alt="" fill priority className="object-cover opacity-20" sizes="100vw" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[url('/images/hero-skyline.svg')] bg-bottom bg-no-repeat bg-cover opacity-40" />
        <NoiseTexture opacity={0.06} />

        {/* ── Main content ── */}
        <Container className="relative z-10 flex flex-col justify-center flex-1 py-8 md:py-12">
          <div className="max-w-3xl">
            <Typography variant="label" className="text-gold tracking-[0.25em] mb-4">
              {tAbout('credential')}
            </Typography>
            <Typography variant="display" className="text-ivory mb-6 md:mb-8" locale={locale}>
              {tAbout('heading')}
            </Typography>
            <div className="space-y-4 text-ivory/80 font-body text-sm md:text-base leading-relaxed">
              <p>{tAbout('para1')}</p>
              <p>{tAbout('para2')}</p>
              <p>{tAbout('para3')}</p>
            </div>
          </div>
        </Container>

        {/* ── Stats + Quote strip ── */}
        <div className="relative z-10 w-full border-t border-ivory/10 bg-navy/40 backdrop-blur-sm">
          <Container className="py-5 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 flex-1">
                {[
                  { value: t('stats.founded'), label: t('stats.foundedLabel') },
                  { value: t('stats.years'), label: t('stats.yearsLabel') },
                  { value: t('stats.metals'), label: t('stats.metalsLabel') },
                  { value: t('stats.reach'), label: t('stats.reachLabel') },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="font-display text-2xl md:text-3xl text-ivory mb-0.5">{stat.value}</div>
                    <div className="font-ui text-[10px] uppercase tracking-widest text-ivory/50">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block w-px h-10 bg-ivory/15" />
              <p className="font-display text-sm md:text-base italic text-gold/80 text-center md:text-right md:max-w-[14rem] leading-snug">
                {tAbout('pullQuote')}
              </p>
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
              <FadeIn key={metal} delay={i * 150}>
                <MetalCard
                  name={tServices(`${metal}.name`)}
                  grades={tServices(`${metal}.grades`)}
                  description={tServices(`${metal}.description`)}
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

      {/* ── Latest Insights ── */}
      <Section background="ivory">
        <Container>
          <FadeIn>
            <SectionLabel align="left">{t('latestInsights')}</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 150}>
                <InsightCard slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} imageUrl={post.imageUrl} />
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
      <section className="relative bg-navy overflow-hidden">
        {/* Map — full bleed, no container constraint */}
        <div className="relative">
          <FadeIn>
            <WorldMap />
          </FadeIn>
          {/* Overlay content on top of map */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none z-20 pb-10 md:pb-14">
            <Typography variant="label" className="text-gold tracking-[0.25em] mb-3">
              {t('globalPresence')}
            </Typography>
            <Typography variant="body" className="text-ivory/50 text-center text-sm max-w-md">
              {t('globalPresenceSubtitle')}
            </Typography>
          </div>
        </div>
      </section>

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
