import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { getTranslations } from 'next-intl/server';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateStaticParams() {
  const posts = await getAllPostsMeta('blog');
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: { id: string; }; }) {
  const post = await getPostBySlug(params.id ?? '', 'blog');
  const t = await getTranslations('Blog');

  return generateSEO({
    title: post.title,
    description: post.description,
    images: [generateStorageImgUrl({ header: true, blog: true, id: `${post.id}/banner` })],
    url: `blog/${post.id}`,
    section: t('title'),
    tags: post.tags,
    published: post.published
  });
}

const BlogPage = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const post = await getPostBySlug(params.id ?? '', 'blog');
  return <Page post={post} />;
};

export default BlogPage;