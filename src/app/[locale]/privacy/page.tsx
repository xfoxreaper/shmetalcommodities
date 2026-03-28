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
    title: 'Privacy Policy — Datenschutzerklärung',
    description: 'Privacy policy and data protection information for SH Metal Commodities.',
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Datenschutzerklärung" locale={locale} />

      <Section background="ivory">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div>
              <Typography variant="h2" className="mb-4">
                1. Datenschutz auf einen Blick
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
                Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
                identifiziert werden können.
              </Typography>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h2" className="mb-4">
                2. Verantwortliche Stelle
              </Typography>
              <div className="space-y-1">
                <Typography variant="body">SH Metal Commodities</Typography>
                <Typography variant="body">Jungfernstieg 1</Typography>
                <Typography variant="body">20354 Hamburg, Deutschland</Typography>
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
              <Typography variant="h2" className="mb-4">
                3. Datenerfassung auf dieser Website
              </Typography>

              <Typography variant="h3" className="mb-3">
                Kontaktformular
              </Typography>
              <Typography variant="body" className="text-charcoal/80 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
                Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </Typography>

              <Typography variant="body" className="text-charcoal/80 mb-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
                lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
                zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich
                ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
                berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </Typography>

              <Typography variant="h3" className="mb-3">
                Server-Log-Dateien
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
                übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
                Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit
                der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit
                anderen Datenquellen wird nicht vorgenommen.
              </Typography>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h2" className="mb-4">
                4. Ihre Rechte
              </Typography>
              <Typography variant="body" className="text-charcoal/80 mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
                Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
                erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
                dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
                widerrufen.
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
                jederzeit an uns wenden.
              </Typography>
            </div>

            <GoldDivider />

            <div>
              <Typography variant="h2" className="mb-4">
                5. E-Mail-Versand
              </Typography>
              <Typography variant="body" className="text-charcoal/80">
                Für den Versand von E-Mails, die über das Kontaktformular ausgelöst werden,
                nutzen wir den Dienst Resend (Resend, Inc.). Ihre Daten werden dabei an
                Resend übermittelt und dort verarbeitet. Weitere Informationen zum
                Datenschutz von Resend finden Sie unter{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-gold transition-colors"
                >
                  resend.com/legal/privacy-policy
                </a>
                .
              </Typography>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
