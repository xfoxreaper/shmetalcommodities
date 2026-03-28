import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import {
  PageHeader,
  Section,
  Container,
  Typography,
  GoldDivider,
} from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...(await generatePageMetadata(locale, 'home')),
    title: 'Impressum',
    description: 'Legal disclosure for SH Metal Commodities GmbH, Hamburg, Germany.',
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Impressum" locale={locale} compact />

      <Section background="ivory">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div>
              <Typography variant="h2" className="mb-4">
                Angaben gemäß § 5 DDG
              </Typography>
              <div className="space-y-1">
                <Typography variant="body">SH Metal Commodities</Typography>
                <Typography variant="body">Jungfernstieg 1</Typography>
                <Typography variant="body">20354 Hamburg</Typography>
                <Typography variant="body">Deutschland</Typography>
              </div>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h3" className="mb-3">
                Vertreten durch
              </Typography>
              <Typography variant="body">
                Wolf Rudiger Harms, Geschäftsführer
              </Typography>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h3" className="mb-3">
                Kontakt
              </Typography>
              <div className="space-y-1">
                <Typography variant="body">
                  E-Mail:{' '}
                  <a
                    href="mailto:rudi@shcommodities.de"
                    className="text-navy hover:text-gold transition-colors"
                  >
                    rudi@shcommodities.de
                  </a>
                </Typography>
              </div>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h3" className="mb-3">
                Haftungsausschluss
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
                Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit,
                Vollständigkeit und Aktualität der bereitgestellten Inhalte.
                Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers.
              </Typography>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h3" className="mb-3">
                Urheberrecht
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
                des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers.
              </Typography>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
