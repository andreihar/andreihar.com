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
  const finalTitle = title ? `${title} | Andrei Harbachov` : 'Andrei Harbachov';

  const metadata: any = {
    description,
    keywords: [...tags, 'Andrei Harbachov'].join(', '),
    openGraph: {
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
      title: finalTitle,
      description,
      images,
      site_name: 'Andrei Harbachov',
      locale: 'en',
      article: {
        authors: ['Andrei Harbachov'],
        section,
        tags,
        publishedTime: published ? published.toISOString() : undefined,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@andrei_har',
      creator: '@andrei_har',
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