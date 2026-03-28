import type { ElementType, HTMLAttributes } from 'react';

type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'label'
  | 'pullquote';

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'span'
  | 'div'
  | 'blockquote'
  | 'label';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  as?: TypographyElement;
  locale?: string;
}

const variantDefaults: Record<TypographyVariant, TypographyElement> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  label: 'span',
  pullquote: 'blockquote',
};

const variantClasses: Record<TypographyVariant, string> = {
  display:
    'font-display text-5xl sm:text-7xl md:text-8xl font-light tracking-widest leading-none',
  h1: 'font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight',
  h2: 'font-display text-3xl sm:text-4xl font-light tracking-wide leading-snug',
  h3: 'font-display text-2xl sm:text-3xl font-light tracking-wide leading-snug',
  body: 'font-body text-base sm:text-lg leading-relaxed',
  label:
    'font-ui text-xs uppercase tracking-widest font-semibold',
  pullquote:
    'font-display text-2xl sm:text-3xl italic font-light leading-relaxed',
};

// When locale is zh, switch display/heading fonts to CJK
const cjkOverride = 'font-cjk';

export function Typography({
  variant,
  as,
  locale,
  className = '',
  children,
  ...props
}: TypographyProps) {
  const Tag = (as ?? variantDefaults[variant]) as ElementType;
  const isCJK = locale === 'zh';
  const isDisplayOrHeading = ['display', 'h1', 'h2', 'h3'].includes(variant);
  const fontOverride = isCJK && isDisplayOrHeading ? cjkOverride : '';

  const classes = [variantClasses[variant], fontOverride, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...(props as HTMLAttributes<HTMLElement>)}>
      {children}
    </Tag>
  );
}
