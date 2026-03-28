import { Typography } from './Typography';
import { GoldDivider } from './GoldDivider';

interface SectionLabelProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark'; // light = on navy (gold/ivory text), dark = on ivory (navy text)
  className?: string;
}

export function SectionLabel({ children, align = 'left', variant = 'dark', className = '' }: SectionLabelProps) {
  const textColor = variant === 'light' ? 'text-gold' : 'text-gold-text';

  if (align === 'center') {
    return (
      <div className={['flex flex-col items-center text-center mb-12', className].filter(Boolean).join(' ')}>
        <Typography variant="label" className={[textColor, 'mb-4'].join(' ')}>
          {children}
        </Typography>
        <GoldDivider width="60px" />
      </div>
    );
  }

  return (
    <div className={['mb-10 flex items-center gap-6', className].filter(Boolean).join(' ')}>
      <GoldDivider width="40px" />
      <Typography variant="label" className={textColor}>
        {children}
      </Typography>
    </div>
  );
}
