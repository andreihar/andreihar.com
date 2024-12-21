import { getAllPostsMeta } from '@/lib/mdx';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Layout from '@/components/layout/Layout';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import { generateMetadata as generateSEO } from '@/components/SEO';
import ItemsList from '@/components/layout/ItemsList';
import { Locale } from '@/i18n/routing';

type Props = {
  params: { locale: Locale; };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const metas = await getAllPostsMeta('project');
  const t = await getTranslations({ locale, namespace: 'Project' });

  return generateSEO({
    locale,
    title: t('title'),
    description: t('desc'),
    images: [generateStorageImgUrl({ header: true, id: `${metas[0].id}/banner` })],
    url: 'project',
    section: t('title'),
    tags: metas[0].builtW
  });
}

const Projects = async ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  const metas = await getAllPostsMeta('project').then((posts) => posts.map((post) => ({ ...post, views: 0, likes: 0 })));
  const t = await getTranslations('Project');

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

export default Projects;