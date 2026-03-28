import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Typography } from './Typography';

interface InsightCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  categoryLabel?: string;
  readMoreLabel?: string;
  locale?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function InsightCard({
  slug,
  title,
  date,
  excerpt,
  imageUrl,
  categoryLabel,
  readMoreLabel = 'Read more',
  locale,
}: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      locale={locale as 'en' | 'de' | 'zh' | 'ar'}
      className="group flex flex-col bg-warm-white overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-navy overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-[#0E1D35]" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <Typography variant="caption" className="text-charcoal/50">
            {formatDate(date)}
          </Typography>
          {categoryLabel && (
            <>
              <span aria-hidden="true" className="text-charcoal/20 text-xs">|</span>
              <Typography variant="caption" className="text-gold">
                {categoryLabel}
              </Typography>
            </>
          )}
        </div>

        <Typography variant="h3" as="h2" className="text-navy mb-3 line-clamp-2">
          {title}
        </Typography>

        <Typography variant="body" className="text-charcoal/70 mb-4 line-clamp-3">
          {excerpt}
        </Typography>

        <span className="mt-auto font-ui text-xs uppercase tracking-widest text-gold group-hover:text-navy transition-colors duration-200">
          {readMoreLabel} &rarr;
        </span>
      </div>
    </Link>
  );
}
