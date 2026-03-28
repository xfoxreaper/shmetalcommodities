import { ReactNode } from 'react';
import { Container } from './Container';
import { Typography } from './Typography';
import { GoldDivider } from './GoldDivider';
import { NoiseTexture } from './NoiseTexture';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  locale?: string;
  compact?: boolean;
}

export function PageHeader({ title, subtitle, locale, compact }: PageHeaderProps) {
  return (
    <header
      className={[
        'relative text-warm-white',
        compact
          ? 'pt-10 pb-10 md:pt-[72px] md:pb-[72px]'
          : 'pt-14 pb-14 md:pt-24 md:pb-24',
      ].join(' ')}
      style={{ background: 'linear-gradient(180deg, #0A1628, #0E1D35)' }}
    >
      <NoiseTexture />
      <Container className="relative z-10">
        <Typography variant="h1" locale={locale} className="text-warm-white">
          {title}
        </Typography>
        <div className="mt-6">
          <GoldDivider />
        </div>
        {subtitle && (
          <Typography variant="body" className="text-warm-white/80 mt-6 max-w-2xl">
            {subtitle}
          </Typography>
        )}
      </Container>
    </header>
  );
}
