import { getPostBySlug } from '@/lib/mdx';
import Page from '@/components/layout/Page';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateMetadata({ params }: { params: { id: string; }; }) {
  const post = await getPostBySlug(params.id ?? '', 'project');
  return generateSEO({ title: post.title, description: post.description, images: [generateStorageImgUrl({ header: true, id: `${post.id}/banner` })], url: `project/${post.id}`, section: 'Project', tags: post.builtW, published: post.published });
}

const ProjectPage = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const post = await getPostBySlug(params.id ?? '', 'project');
  return <Page {...post} type="project" />;
};

export default ProjectPage;