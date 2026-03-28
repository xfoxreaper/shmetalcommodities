import { Typography } from './Typography';
import { GoldDivider } from './GoldDivider';

interface NumberedPillarProps {
  number: number;
  title: string;
  description: string;
}

export function NumberedPillar({ number, title, description }: NumberedPillarProps) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-light text-gold mb-4">
        {String(number).padStart(2, '0')}
      </span>
      <Typography variant="h3" className="text-navy mb-3">
        {title}
      </Typography>
      <GoldDivider width="40px" className="mb-4" />
      <Typography variant="body" className="text-charcoal/80">
        {description}
      </Typography>
    </div>
  );
}
