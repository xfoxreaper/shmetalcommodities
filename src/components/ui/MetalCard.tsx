import { ReactNode } from 'react';
import { Typography } from './Typography';

type MetalTexture = 'copper' | 'aluminium' | 'zinc';

interface MetalCardProps {
  name: string;
  grades?: string;
  description: string;
  texture: MetalTexture;
  children?: ReactNode;
}

const textureStyles: Record<MetalTexture, React.CSSProperties> = {
  copper: {
    background:
      'linear-gradient(135deg, hsl(15,40%,28%) 0%, hsl(15,35%,22%) 50%, hsl(20,38%,30%) 100%)',
  },
  aluminium: {
    background:
      'linear-gradient(135deg, hsl(210,10%,38%) 0%, hsl(210,8%,30%) 50%, hsl(215,12%,36%) 100%)',
  },
  zinc: {
    background:
      'linear-gradient(135deg, hsl(220,15%,32%) 0%, hsl(220,12%,26%) 50%, hsl(225,14%,30%) 100%)',
  },
};

// CSS-only noise overlay via SVG filter (applied via pseudo-element pattern using inline style)
const noiseOverlaySvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.35'/></svg>`;
const noiseDataUri = `url("data:image/svg+xml,${encodeURIComponent(noiseOverlaySvg)}")`;

export function MetalCard({ name, grades, description, texture }: MetalCardProps) {
  return (
    <article
      className="relative overflow-hidden text-warm-white p-8 min-h-[260px] flex flex-col justify-between"
      style={textureStyles[texture]}
    >
      {/* CSS-only noise texture overlay for material feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: noiseDataUri,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.6,
        }}
      />
      <div className="relative z-10">
        <Typography variant="h2" className="text-warm-white mb-3">
          {name}
        </Typography>
        {grades && (
          <p className="font-ui text-xs uppercase tracking-widest text-gold/80 mb-4">{grades}</p>
        )}
        <div className="w-12 h-px bg-gold mb-6" aria-hidden="true" />
        <Typography variant="body" className="text-warm-white/85">
          {description}
        </Typography>
      </div>
    </article>
  );
}
