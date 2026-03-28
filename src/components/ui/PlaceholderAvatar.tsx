interface PlaceholderAvatarProps {
  initials: string;
  size?: number;
  className?: string;
}

export function PlaceholderAvatar({
  initials,
  size = 80,
  className = '',
}: PlaceholderAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={['rounded-full flex-shrink-0', className].filter(Boolean).join(' ')}
    >
      <circle cx="40" cy="40" r="40" fill="#4A5568" />
      <text
        x="40"
        y="40"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={size * 0.35}
        fontFamily="Josefin Sans, sans-serif"
        fontWeight="600"
        letterSpacing="1"
      >
        {initials.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}
