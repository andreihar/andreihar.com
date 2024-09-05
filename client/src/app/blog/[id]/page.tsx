import { getPostBySlug } from '@/lib/mdx';
import { HiOutlineClock, HiOutlineEye, HiOutlineThumbUp } from 'react-icons/hi';
import BlogComponent from '@/components/BlogComponent';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/MDXComponents';
import TableOfContents from '@/components/TableOfContents';
import StorageImg from '@/components/StorageImg';

const Page = async ({ params }: { params: { id: string; }; }): Promise<JSX.Element> => {
  const { meta, source } = await getPostBySlug(params.id ?? '', 'blog');
  const { id, title, description, published, time, tags, team, builtW, github, website, video } = meta;

  return (
    <>
      <div className="relative p-5 text-center bg-center bg-no-repeat bg-cover min-h-[550px] h-auto flex flex-col justify-end" style={{ backgroundImage: `url(${StorageImg({ header: true, id: 'theodorusclarence/projects/hexcape/hexcape-banner_xdulxw', width: 1000, alt: 'Banner' })})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative p-8 mt-[80px]">
          <div className="text-left text-white space-y-7 w-full lg:max-w-[65%]">
            <p className="text-sm text-gray-400">{tags?.join(', ')}</p>
            <h1 className="text-3xl leading-[1.5] md:text-5xl md:leading-[1.5] font-bold">{title}</h1>
            <h2 className="text-lg leading-[1.5] md:text-xl md:leading-[1.5] text-gray-200">{description}</h2>
            <p className="text-sm text-gray-300 flex flex-wrap items-center">
              {time && (
                <span className="inline-flex items-center gap-1">
                  <HiOutlineClock className="inline-block text-base" />
                  {`${time} min`}
                  <span className="mx-2">━</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <HiOutlineEye className="inline-block text-base" />
                {`5,123 views`}
              </span>
              <span className="mx-2">━</span>
              <span className="inline-flex items-center gap-1">
                <HiOutlineThumbUp className="inline-block text-base" />
                {`5,123 likes`}
              </span>
            </p>
          </div>
        </div>
      </div>
      <section className="max-w-[1100px] px-4 mx-auto mt-16 transition-colors">
        <div className="my-5">
          <p className="text-base text-gray-500 dark:text-gray-400">
            {`${published.getDate()} ${published.toLocaleString('default', { month: 'long' })}, ${published.getFullYear()}`}
            <span className="text-gray-300 dark:text-gray-600 mx-2">━</span>
            <strong>by Andrei Harbachov</strong>
          </p>
        </div>
        <hr className='dark:border-gray-600' />
        <main className='lg:grid lg:grid-cols-[auto,250px] lg:gap-10 my-6'>
          <article className='break-words whitespace-normal mx-auto mt-4 w-full'>
            <MDXRemote source={source} components={MDXComponents} />
          </article>
          <aside className='py-4'>
            <div className='sticky top-36'>
              <TableOfContents />
            </div>
          </aside>
        </main>
      </section>
    </>
  );
};

export default Page;