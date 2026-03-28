import { Typography } from './Typography';
import { GoldDivider } from './GoldDivider';

interface NumberedPillarProps {
  number: number;
  title: string;
  description: string;
  variant?: 'dark' | 'light'; // dark = on ivory, light = on navy
}

export function NumberedPillar({ number, title, description, variant = 'dark' }: NumberedPillarProps) {
  const titleColor = variant === 'light' ? 'text-ivory' : 'text-navy';
  const bodyColor = variant === 'light' ? 'text-ivory/90' : 'text-charcoal/80';

  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-light text-gold mb-4">
        {String(number).padStart(2, '0')}
      </span>
      <Typography variant="h3" className={`${titleColor} mb-3`}>
        {title}
      </Typography>
      <GoldDivider width="40px" className="mb-4" />
      <Typography variant="body" className={bodyColor}>
        {description}
      </Typography>
    </div>
  );
}
