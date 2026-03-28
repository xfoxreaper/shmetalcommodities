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
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={['rounded-full flex-shrink-0', className].filter(Boolean).join(' ')}
    >
      {/* Navy background */}
      <circle cx="100" cy="100" r="100" fill="#0A1628" />

      {/* Outer ring — thin gold circle */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#B89A5A" strokeWidth="0.75" />

      {/* Inner ring — thinner gold circle */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#B89A5A" strokeWidth="0.5" opacity="0.5" />

      {/* Small decorative diamond at top */}
      <path d="M100 16 L103 20 L100 24 L97 20 Z" fill="#B89A5A" opacity="0.6" />

      {/* Initials */}
      <text
        x="100"
        y="100"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#B89A5A"
        fontSize="42"
        fontFamily="'Cormorant Garamond', 'Georgia', serif"
        fontWeight="300"
        letterSpacing="4"
      >
        {initials.slice(0, 3).toUpperCase()}
      </text>

      {/* Thin line below initials */}
      <line x1="70" y1="122" x2="130" y2="122" stroke="#B89A5A" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
