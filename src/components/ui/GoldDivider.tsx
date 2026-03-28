interface GoldDividerProps {
  width?: string;
  className?: string;
}

export function GoldDivider({ width, className = '' }: GoldDividerProps) {
  return (
    <hr
      className={['border-none h-px bg-gold', className].filter(Boolean).join(' ')}
      style={width ? { width } : undefined}
      aria-hidden="true"
    />
  );
}
