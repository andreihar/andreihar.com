import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/layout/Layout';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import text from '@/data/text.json';
import BlogList from '@/components/layout/BlogList';

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
      <BlogList posts={metas} />
    </Layout>
  );
};

export default Blogs;