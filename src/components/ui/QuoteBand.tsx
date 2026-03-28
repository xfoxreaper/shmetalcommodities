import { Container } from './Container';
import { NoiseTexture } from './NoiseTexture';
import { FadeIn } from './FadeIn';

interface QuoteBandProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export function QuoteBand({ quote, attribution, className = '' }: QuoteBandProps) {
  return (
    <section className={['relative bg-navy py-14 md:py-20 overflow-hidden', className].filter(Boolean).join(' ')}>
      <NoiseTexture opacity={0.06} />
      <Container className="relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden="true"
              className="font-display text-5xl sm:text-6xl leading-none text-gold/40 select-none -mb-2"
            >
              &ldquo;
            </span>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed text-ivory max-w-3xl">
              {quote}
            </blockquote>
            {attribution && (
              <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-ivory/50 mt-6">
                {attribution}
              </span>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
