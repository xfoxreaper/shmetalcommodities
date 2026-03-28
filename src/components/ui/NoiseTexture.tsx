interface NoiseTextureProps {
  className?: string;
  opacity?: number;
}

// SVG feTurbulence noise as a data URI overlay — CSS-only, no JS needed
const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(#n)' opacity='0.4'/></svg>`;

const noiseDataUri = `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;

export function NoiseTexture({ className = '', opacity = 0.05 }: NoiseTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={['absolute inset-0 pointer-events-none', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundImage: noiseDataUri,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        opacity,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
