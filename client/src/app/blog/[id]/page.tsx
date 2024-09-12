import { getPostBySlug } from '@/lib/mdx';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateMetadata({ params }: { params: { id: string; }; }) {
  const post = await getPostBySlug(params.id ?? '', 'blog');
  return generateSEO({ title: post.title, description: post.description, images: [generateStorageImgUrl({ header: true, blog: true, id: `${post.id}/banner` })], url: `blog/${post.id}`, section: 'Blog', tags: post.tags, published: post.published });
}

const BlogPage = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const post = await getPostBySlug(params.id ?? '', 'blog');
  return <Page {...post} type="blog" />;
};

export default BlogPage;