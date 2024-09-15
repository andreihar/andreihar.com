import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/layout/Layout';
import Blog from '@/components/content/Blog';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import Anim from '@/components/Anim';
import text from '@/data/text.json';

export async function generateMetadata() {
  const metas = await getAllPostsMeta('blog');
  return generateSEO({ title: text.blog.title, description: text.blog.desc, images: [generateStorageImgUrl({ header: true, blog: true, id: `${metas[0].id}/banner` })], url: 'blog', section: 'Blog', tags: metas[0].tags });
}

const Blogs = async () => {
  const metas = await getAllPostsMeta('blog');
  return (
    <Layout className='my-20 pt-14'>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
          {text.blog.title}
        </h1>
        <p className="text-center text-xl text-base">{text.blog.desc}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metas.map((post, index) => (
          <Anim key={post.id} delay={0.2 + index * 0.1} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
            <Blog meta={post} />
          </Anim>
        ))}
      </div>
    </Layout>
  );
};

export default Blogs;