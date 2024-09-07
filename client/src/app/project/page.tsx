import { getAllPostsMeta } from '@/lib/mdx';
import Layout from '@/components/Layout';
import Project from '@/components/Project';

const Page = async () => {
  const metas = await getAllPostsMeta('project');
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metas.map((meta) => (
          <Project key={meta.id} meta={meta} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;