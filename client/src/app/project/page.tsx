import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/layout/Layout';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import ItemsList from '@/components/layout/ItemsList';
import text from '@/data/text.json';

export async function generateMetadata() {
  const metas = await getAllPostsMeta('project');
  return generateSEO({ title: text.project.title, description: text.project.desc, images: [generateStorageImgUrl({ header: true, id: `${metas[0].id}/banner` })], url: 'project', section: 'Project', tags: metas[0].builtW });
}

const Projects = async () => {
  const metas = await getAllPostsMeta('project').then((posts) => posts.map((post) => ({ ...post, views: 0, likes: 0 })));
  return (
    <Layout className='my-20 pt-14'>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
          {text.project.title}
        </h1>
        <p className="text-center text-xl text-base">{text.project.desc}</p>
      </div>
      <ItemsList posts={metas} />
    </Layout>
  );
};

export default Projects;