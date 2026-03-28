import { HTMLAttributes, ReactNode } from 'react';

type SectionBackground = 'navy' | 'ivory' | 'transparent';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: SectionBackground;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const backgroundClasses: Record<SectionBackground, string> = {
  navy: 'bg-navy text-warm-white',
  ivory: 'bg-ivory text-charcoal',
  transparent: 'bg-transparent',
};

export function Section({
  children,
  background = 'transparent',
  as: Tag = 'section',
  className = '',
  ...props
}: SectionProps) {
  return (
    <Tag
      className={[
        'py-18 md:py-26',
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
