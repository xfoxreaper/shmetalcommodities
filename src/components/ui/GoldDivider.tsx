interface GoldDividerProps {
  width?: string;
  className?: string;
}

export function GoldDivider({ width, className = '' }: GoldDividerProps) {
  return (
    <hr
      className={['border-none h-px', className].filter(Boolean).join(' ')}
      style={{
        background: width ? '#B89A5A' : 'linear-gradient(90deg, transparent, #B89A5A, transparent)',
        ...(width ? { width } : {}),
      }}
      aria-hidden="true"
    />
  );
}
