import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import { generateStorageImgUrl } from '@/components/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateMetadata() {
  const metas = await getAllPostsMeta('blog');
  return generateSEO({ title: 'Blog', description: 'A collection of musings and reflections', images: [generateStorageImgUrl({ header: true, blog: true, id: `${metas[0].id}/banner` })], url: 'blog', section: 'Blog', tags: metas[0].tags });
}

const Blogs = async () => {
  const metas = await getAllPostsMeta('blog');
  return (
    <Layout className='my-20 pt-14'>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-center text-xl text-base">A collection of musings and reflections</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metas.map((meta) => (
          <Blog key={meta.id} meta={meta} />
        ))}
      </div>
    </Layout>
  );
};

export default Blogs;