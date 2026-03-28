import Image from 'next/image';

interface ImageBandProps {
  src: string;
  alt: string;
  height?: string; // Tailwind height class like 'h-[300px] md:h-[400px]'
  overlayOpacity?: string; // like 'bg-navy/30'
}

export function ImageBand({
  src,
  alt,
  height = 'h-[250px] md:h-[350px]',
  overlayOpacity = 'bg-navy/30'
}: ImageBandProps) {
  return (
    <div className={['relative', height].join(' ')}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className={['absolute inset-0', overlayOpacity].join(' ')} />
    </div>
  );
}
