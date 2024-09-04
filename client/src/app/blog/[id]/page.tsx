import { getPostBySlug } from '@/lib/mdx';
import BlogComponent from '@/components/BlogComponent';

const Page = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const { meta, source } = await getPostBySlug(params.id ?? '', 'blog');

  return (
    <>
      <div className="relative p-5 text-center bg-center bg-no-repeat bg-cover min-h-[450px]" style={{ backgroundImage: `url(https://miro.medium.com/v2/1*oJZaHzxUAtD8Lp87MHDs8w.jpeg)` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="flex justify-center items-end h-full pt-20 pb-5">
            <div className="text-white uppercase">
              <h1 className="mb-3">{meta.title}</h1>
              <h4 className="mb-3">{meta.description}</h4>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className='container prose'>
          {source}
        </div>
      </main>
    </>
  );
};

export default Page;