import text from '@/data/text.json';

type GenerateMetadataProps = {
  title?: string;
  description: string;
  images: string[];
  url: string;
  section: string;
  tags?: string[];
  published?: Date;
};

export function generateMetadata({ title, description, images, url, section, tags = [], published }: GenerateMetadataProps) {
  const finalTitle = title ? `${title} | ${text.values.name}` : text.values.name;

  const metadata: any = {
    description,
    keywords: [...tags, text.values.name, ...text.values.name.split(' '), text.values.name.split(' ')[1].slice(0, 3)].join(', '),
    openGraph: {
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
      title: finalTitle,
      description,
      images,
      site_name: text.values.name,
      locale: 'en',
      article: {
        authors: [text.values.name],
        section,
        tags,
        publishedTime: published ? published.toISOString() : undefined,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${text.values.twitter}`,
      creator: `@${text.values.twitter}`,
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