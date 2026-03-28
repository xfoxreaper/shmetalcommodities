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
    <Section background="navy" padding="none" className="pb-16 md:pb-20">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <Typography variant="h2" className="text-warm-white mb-6">
              {heading}
            </Typography>
            {body && (
              <Typography variant="body" className="text-warm-white/75 mb-10">
                {body}
              </Typography>
            )}
            <Link href={buttonHref} locale={locale}>
              <Button variant="ghost">{buttonText}</Button>
            </Link>
            {email && (
              <p className="mt-6 font-ui text-xs text-warm-white/50">
                {email}
              </p>
            )}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
