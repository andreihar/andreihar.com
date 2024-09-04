import { getPostBySlug } from '@/lib/mdx';

const Page = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const { meta, content } = await getPostBySlug(params.id ?? '', 'blog');

  return (
    <section className='py-24'>
      <div className='container py-4 prose'>{content}</div>
    </section>
  );
};

export default Page;