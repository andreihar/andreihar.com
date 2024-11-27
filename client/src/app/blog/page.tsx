import { getAllPostsMeta } from '@/lib/mdx';
import { getTranslations } from 'next-intl/server';
import Layout from '@/components/layout/Layout';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import ItemsList from '@/components/layout/ItemsList';

export async function generateMetadata() {
  const metas = await getAllPostsMeta('blog');
  const t = await getTranslations('Blog');

  return generateSEO({ title: t('title'), description: t('desc'), images: [generateStorageImgUrl({ header: true, blog: true, id: `${metas[0].id}/banner` })], url: 'blog', section: 'Blog', tags: metas[0].tags });
}

const Blogs = async () => {
  const metas = await getAllPostsMeta('blog').then((posts) => posts.map((post) => ({ ...post, views: 0, likes: 0 })));
  const t = await getTranslations('Blog');

  return (
    <Layout className='my-20 pt-14'>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-center text-xl text-base">{t('desc')}</p>
      </div>
      <ItemsList posts={metas} />
    </Layout>
  );
};

export default Blogs;