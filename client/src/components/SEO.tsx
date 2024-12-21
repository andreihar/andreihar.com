import { getTranslations } from 'next-intl/server';
import { getPathname, Locale } from '@/i18n/routing';

type GenerateMetadataProps = {
  locale: Locale;
  title?: string;
  description: string;
  images: string[];
  url: string;
  section: string;
  tags?: string[];
  published?: Date;
};

export async function generateMetadata({ locale, title, description, images, url, section, tags = [], published }: GenerateMetadataProps) {
  const t = await getTranslations('Values');
  const name = t('name', { f: t('f'), s: t('s') });
  const finalTitle = title ? `${title} | ${name}` : name;
  const localisedPathname = getPathname({ locale, href: url as any });
  url = localisedPathname.substring(1);

  const metadata: any = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000'),
    description,
    keywords: [...tags, name, t('f'), t('s')].join(', '),
    openGraph: {
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
      title: finalTitle,
      description,
      images,
      site_name: name,
      locale,
      article: {
        authors: [name],
        section,
        tags,
        publishedTime: published ? published.toISOString() : undefined,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${t('twitter')}`,
      creator: `@${t('twitter')}`,
      url,
      title: finalTitle,
      description,
      images,
    },
  };

  if (title) {
    metadata.title = title;
  }

  return metadata;
}