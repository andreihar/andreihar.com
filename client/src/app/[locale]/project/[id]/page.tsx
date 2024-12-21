import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

type Props = {
  params: { locale: string; id: string; };
};

export async function generateStaticParams() {
  const projects = await getAllPostsMeta('project');
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params: { locale, id } }: Props) {
  const post = await getPostBySlug(id ?? '', 'project');
  const t = await getTranslations({ locale, namespace: 'Project' });

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

const ProjectPage = async ({ params: { locale, id } }: Props): Promise<JSX.Element> => {
  setRequestLocale(locale);
  const post = await getPostBySlug(id ?? '', 'project');
  return <Page post={post} />;
};

export default ProjectPage;