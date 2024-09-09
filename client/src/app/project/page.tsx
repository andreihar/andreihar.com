import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/layout/Layout';
import Project from '@/components/content/Project';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateMetadata() {
  const metas = await getAllPostsMeta('project');
  return generateSEO({ title: 'Projects', description: 'Explore my projects and blog posts', images: [generateStorageImgUrl({ header: true, id: `${metas[0].id}/banner` })], url: 'project', section: 'Project', tags: metas[0].tags });
}

const Projects = async () => {
  const metas = await getAllPostsMeta('project');
  return (
    <Layout className='my-20 pt-14'>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-center text-xl text-base">Explore my projects and blog posts.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metas.map((meta) => (
          <Project key={meta.id} meta={meta} />
        ))}
      </div>
    </Layout>
  );
};

export default Projects;