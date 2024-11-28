import { getTranslations } from 'next-intl/server';

type GenerateMetadataProps = {
  title?: string;
  description: string;
  images: string[];
  url: string;
  section: string;
  tags?: string[];
  published?: Date;
};

export async function generateMetadata({ title, description, images, url, section, tags = [], published }: GenerateMetadataProps) {
  const t = await getTranslations('Values');
  const finalTitle = title ? `${title} | ${t('name')}` : t('name');

  const metadata: any = {
    description,
    keywords: [...tags, t('name'), ...t('name').split(' '), t('name').split(' ')[1].slice(0, 3)].join(', '),
    openGraph: {
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
      title: finalTitle,
      description,
      images,
      site_name: t('name'),
      locale: 'en',
      article: {
        authors: [t('name')],
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