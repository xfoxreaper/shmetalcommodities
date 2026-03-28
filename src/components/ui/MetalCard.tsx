import { ReactNode } from 'react';
import Image from 'next/image';
import { Typography } from './Typography';

type MetalTexture = 'copper' | 'aluminium' | 'zinc';

interface MetalCardProps {
  name: string;
  grades?: string;
  description: string;
  texture: MetalTexture;
  expanded?: boolean;
  children?: ReactNode;
}

const textureStyles: Record<MetalTexture, React.CSSProperties> = {
  copper: {
    background:
      'linear-gradient(135deg, hsl(15,32%,38%) 0%, hsl(12,28%,30%) 50%, hsl(18,30%,36%) 100%)',
  },
  aluminium: {
    background:
      'linear-gradient(135deg, hsl(200,5%,52%) 0%, hsl(200,4%,44%) 50%, hsl(205,5%,50%) 100%)',
  },
  zinc: {
    background:
      'linear-gradient(135deg, hsl(230,8%,46%) 0%, hsl(230,6%,38%) 50%, hsl(235,8%,44%) 100%)',
  },
};

// CSS-only noise overlay via SVG filter (applied via pseudo-element pattern using inline style)
const noiseOverlaySvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.35'/></svg>`;
const noiseDataUri = `url("data:image/svg+xml,${encodeURIComponent(noiseOverlaySvg)}")`;

// Per-metal material texture SVGs — extremely subtle, subliminal detail
const copperTextureSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='none'><g stroke='%23D4956A' stroke-width='0.5' opacity='0.4'><path d='M60 20 A40 40 0 0 1 100 60'/><path d='M60 30 A30 30 0 0 1 90 60'/><path d='M60 40 A20 20 0 0 1 80 60'/><path d='M60 80 A40 40 0 0 1 20 60' transform='rotate(180 60 60)'/></g></svg>`;
const aluminiumTextureSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='40' fill='none'><g stroke='%23C0C8D0' stroke-width='0.3' opacity='0.5'><line x1='0' y1='8' x2='100' y2='8'/><line x1='0' y1='20' x2='100' y2='20'/><line x1='0' y1='32' x2='100' y2='32'/></g></svg>`;
const zincTextureSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' fill='none'><g stroke='%239098B0' stroke-width='0.4' opacity='0.35'><polygon points='40,2 74,22 74,62 40,82 6,62 6,22'/><line x1='40' y1='2' x2='40' y2='82'/><line x1='6' y1='22' x2='74' y2='62'/><line x1='74' y1='22' x2='6' y2='62'/></g></svg>`;

const textureImages: Record<MetalTexture, string> = {
  copper: '/images/copper-texture.jpg',
  aluminium: '/images/aluminium-texture.jpg',
  zinc: '/images/zinc-texture.jpg',
};

const metalTextureDataUris: Record<MetalTexture, string> = {
  copper: `url("data:image/svg+xml,${encodeURIComponent(copperTextureSvg)}")`,
  aluminium: `url("data:image/svg+xml,${encodeURIComponent(aluminiumTextureSvg)}")`,
  zinc: `url("data:image/svg+xml,${encodeURIComponent(zincTextureSvg)}")`,
};

export function MetalCard({ name, grades, description, texture, expanded }: MetalCardProps) {
  return (
    <article
      className="relative overflow-hidden text-warm-white p-6 sm:p-8 flex flex-col h-full border border-gold/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={textureStyles[texture]}
    >
      {/* Photo texture background */}
      <Image
        src={textureImages[texture]}
        alt=""
        fill
        className="object-cover opacity-30 mix-blend-overlay"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
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
      {/* Per-metal material texture — subliminal detail */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: metalTextureDataUris[texture],
          backgroundRepeat: 'repeat',
          opacity: 0.1,
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
        <Typography variant="body" className={`text-warm-white/85 ${expanded ? '' : 'line-clamp-4'}`}>
          {description}
        </Typography>
      </div>
    </article>
  );
}
