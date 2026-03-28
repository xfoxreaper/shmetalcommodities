import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { company } from '../../../../content/company';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Section,
  Container,
  Typography,
  GoldDivider,
  PullQuote,
} from '@/components/ui';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'about');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/about',
        de: '/de/about',
        zh: '/zh/about',
        ar: '/ar/about',
      },
    },
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="animate-fade-in">
      <Section background="ivory">
        <Container>
          {/* T-321: heading + GoldDivider */}
          <Typography variant="h1" className="mb-6">
            {t('heading')}
          </Typography>
          <GoldDivider className="mb-10" />

          {/* T-322: body paragraphs from content/company.ts */}
          <div className="space-y-6 max-w-3xl">
            {company.about.paragraphs.map((paragraph, index) => (
              <div key={index}>
                {/* PLACEHOLDER: paragraph content */}
                <Typography variant="body">{paragraph}</Typography>
              </div>
            ))}
          </div>

          {/* T-323: pull quote */}
          {/* PLACEHOLDER: pull quote */}
          <PullQuote>{company.about.pullQuote}</PullQuote>

          {/* T-324: credential line */}
          <Typography variant="label">
            {t('credential')}
          </Typography>
        </Container>
      </Section>
    </div>
  );
}
