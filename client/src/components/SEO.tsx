import { getTranslations } from 'next-intl/server';
import { getPathname, Locale } from '@/i18n/routing';
import {forename, surname, twitter} from '@/data/values'

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
  const name = t('name', { f: forename, s: surname });
  const finalTitle = title ? `${title} | ${name}` : name;
  const localisedPathname = getPathname({ locale, href: url as any });
  url = localisedPathname.substring(1);

  const metadata: any = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000'),
    description,
    keywords: [...tags, name, forename, surname].join(', '),
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
      site: `@${twitter}`,
      creator: `@${twitter}`,
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