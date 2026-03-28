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

export function PageHeader({ title, subtitle, locale }: PageHeaderProps) {
  return (
    <header
      className="relative text-warm-white pt-16 pb-16 md:pt-24 md:pb-24"
      style={{ background: 'linear-gradient(180deg, var(--color-navy), #0E1D35)' }}
    >
      <NoiseTexture />
      <Container className="relative z-10">
        <Typography variant="h1" locale={locale} className="text-warm-white">
          {title}
        </Typography>
        <div className="mt-4 w-16">
          <GoldDivider width="64px" />
        </div>
        {subtitle && (
          <Typography variant="body" className="text-warm-white/85 mt-5 max-w-2xl">
            {subtitle}
          </Typography>
        )}
      </Container>
    </header>
  );
}
