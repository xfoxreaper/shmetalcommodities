export interface BlogPost {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'copper' | 'aluminium' | 'zinc' | 'markets' | 'industry' | 'company';
  excerpt: string;
  paragraphs: string[]; // Array of paragraph strings
  author: string;
  imageUrl?: string;
}

// Category display names
export const categoryLabels: Record<BlogPost['category'], string> = {
  copper: 'Copper',
  aluminium: 'Aluminium',
  zinc: 'Zinc',
  markets: 'Markets',
  industry: 'Industry',
  company: 'Company',
};

// Posts will be imported from individual files and merged
import { copperPosts } from './blog-copper';
import { aluminiumPosts } from './blog-aluminium';
import { zincPosts } from './blog-zinc';
import { industryPosts } from './blog-industry';
import { tradePosts } from './blog-trade';

export const blogPosts: BlogPost[] = [
  ...copperPosts,
  ...aluminiumPosts,
  ...zincPosts,
  ...industryPosts,
  ...tradePosts,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
