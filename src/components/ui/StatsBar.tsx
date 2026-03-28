import { FadeIn } from './FadeIn';

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-4xl md:text-5xl text-navy mb-2">
              {stat.value}
            </div>
            <div className="font-ui text-xs uppercase tracking-widest text-charcoal/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
