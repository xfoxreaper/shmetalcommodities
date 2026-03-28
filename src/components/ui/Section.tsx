import { HTMLAttributes, ReactNode } from 'react';

type SectionBackground = 'navy' | 'ivory' | 'transparent';
type SectionPadding = 'default' | 'compact' | 'tight' | 'none';

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
  default: 'py-18 md:py-26',
  compact: 'py-12 md:py-16',
  tight: 'py-8 md:py-12',
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
