import { HTMLAttributes, ReactNode } from 'react';

type SectionBackground = 'navy' | 'ivory' | 'transparent';
type SectionPadding = 'large' | 'default' | 'compact' | 'tight' | 'none';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: SectionBackground;
  padding?: SectionPadding;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const backgroundClasses: Record<SectionBackground, string> = {
  navy: 'bg-navy text-warm-white',
  ivory: 'bg-ivory text-charcoal',
  transparent: 'bg-transparent',
};

const paddingClasses: Record<SectionPadding, string> = {
  large: 'py-20 md:py-28',
  default: 'py-14 md:py-20',
  compact: 'py-10 md:py-14',
  tight: 'py-6 md:py-10',
  none: '',
};

export function Section({
  children,
  background = 'transparent',
  padding = 'default',
  as: Tag = 'section',
  className = '',
  ...props
}: SectionProps) {
  return (
    <Tag
      className={[
        paddingClasses[padding],
        backgroundClasses[background],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
