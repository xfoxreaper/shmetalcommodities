import { Link } from '@/i18n/navigation';
import { Container } from './Container';
import { Section } from './Section';
import { Typography } from './Typography';
import { Button } from './Button';
import { FadeIn } from './FadeIn';

interface CTASectionProps {
  heading: string;
  body?: string;
  buttonText: string;
  buttonHref: string;
  email?: string;
  locale?: string;
}

export function CTASection({
  heading,
  body,
  buttonText,
  buttonHref,
  email,
  locale,
}: CTASectionProps) {
  return (
    <Section background="navy" padding="compact">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <Typography variant="h3" className="text-ivory mb-6">
              {heading}
            </Typography>
            {body && (
              <Typography variant="body" className="text-ivory/75 mb-6">
                {body}
              </Typography>
            )}
            <Link href={buttonHref} locale={locale}>
              <Button variant="ghost">{buttonText}</Button>
            </Link>
            {email && (
              <p className="mt-4 font-ui text-xs text-ivory/40">
                {email}
              </p>
            )}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
