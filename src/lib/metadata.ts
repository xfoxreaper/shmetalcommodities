import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

/**
 * Generate Next.js Metadata for a page by reading translated title and
 * description from the `<namespace>.meta` key in the locale message file.
 *
 * Usage in a page:
 *   export async function generateMetadata({ params }: { params: { locale: string } }) {
 *     return generatePageMetadata(params.locale, 'about');
 *   }
 */
export async function generatePageMetadata(
  locale: string,
  namespace: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}
