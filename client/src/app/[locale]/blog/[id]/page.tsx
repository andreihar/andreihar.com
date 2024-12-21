import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import { Locale } from '@/i18n/routing';

type Props = {
  params: { locale: Locale; id: string; };
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta('blog');
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params: { locale, id } }: Props) {
  const post = await getPostBySlug(id ?? '', 'blog');
  const t = await getTranslations({ locale, namespace: 'Blog' });

  return generateSEO({
    locale,
    title: post.title,
    description: post.description,
    images: [generateStorageImgUrl({ header: true, blog: true, id: `${post.id}/banner` })],
    url: `/blog/${post.id}`,
    section: t('title'),
    tags: post.tags,
    published: post.published
  });
}

const BlogPage = async ({ params: { locale, id } }: Props): Promise<JSX.Element> => {
  setRequestLocale(locale);
  const post = await getPostBySlug(id ?? '', 'blog');
  return <Page post={post} />;
};

export default BlogPage;