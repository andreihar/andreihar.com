import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { getTranslations } from 'next-intl/server';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateStaticParams() {
  const projects = await getAllPostsMeta('project');
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: { id: string; }; }) {
  const post = await getPostBySlug(params.id ?? '', 'project');
  const t = await getTranslations('Project');

  return generateSEO({
    title: post.title,
    description: post.description,
    images: [generateStorageImgUrl({ header: true, id: `${post.id}/banner` })],
    url: `project/${post.id}`,
    section: t('title'),
    tags: post.builtW,
    published: post.published
  });
}

const ProjectPage = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const post = await getPostBySlug(params.id ?? '', 'project');
  return <Page post={post} />;
};

export default ProjectPage;