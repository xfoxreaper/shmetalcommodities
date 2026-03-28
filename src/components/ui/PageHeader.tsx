import { ReactNode } from 'react';
import { Container } from './Container';
import { Typography } from './Typography';
import { GoldDivider } from './GoldDivider';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  locale?: string;
  compact?: boolean;
}

export function PageHeader({ title, subtitle, locale, compact }: PageHeaderProps) {
  return (
    <header className="bg-navy text-warm-white" style={compact ? { paddingTop: '60px', paddingBottom: '60px' } : { paddingTop: '88px', paddingBottom: '88px' }}>
      <Container>
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
