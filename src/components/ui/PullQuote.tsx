import { ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  className?: string;
}

export function PullQuote({ children, className = '' }: PullQuoteProps) {
  return (
    <blockquote
      className={[
        'border-s-[4px] border-gold',
        'ps-8 py-6 my-14',
        'font-display text-2xl sm:text-3xl italic font-light leading-relaxed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </blockquote>
  );
}
