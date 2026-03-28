export interface PressRelease {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'announcement' | 'market-commentary' | 'sustainability' | 'event';
  excerpt: string;
  paragraphs: string[];
}

export const typeLabels: Record<PressRelease['type'], string> = {
  announcement: 'Announcement',
  'market-commentary': 'Market Commentary',
  sustainability: 'Sustainability',
  event: 'Event',
};

import { companyReleases } from './newsroom-company';
import { marketReleases } from './newsroom-market';
import { eventReleases } from './newsroom-events';

export const pressReleases: PressRelease[] = [
  ...companyReleases,
  ...marketReleases,
  ...eventReleases,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
