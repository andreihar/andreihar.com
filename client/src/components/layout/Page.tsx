import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import text from '@/data/text.json';
import { ViewsAndLikesProvider, ViewsCounter, LikesCounter, LikeButton } from '@/components/widgets/ViewsAndLikes';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import TechIcons from '@/components/widgets/TechIcons';
import Comments from '@/components/widgets/Comments';
import Layout from '@/components/layout/Layout';
import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents from '@/components/content/TableOfContents';
import { HiOutlineClock, HiOutlineEye, HiOutlineThumbUp, HiOutlineUser, HiLink } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

type PageProps = {
  id: string;
  title: string;
  description: string;
  published: Date;
  source: string;
  tags?: string[];
  time?: number;
  team?: number;
  builtW?: string[];
  github?: string;
  website?: string;
  type: 'blog' | 'project';
};

const Page = ({ id, title, description, published, source, tags, time, team, builtW, github, website, type }: PageProps): JSX.Element => {
  return (
    <ViewsAndLikesProvider type={type} id={id} showWords updateViewOnLoad>
      <div className="relative p-5 text-center bg-center bg-no-repeat bg-cover min-h-[550px] h-auto flex flex-col justify-end" style={{ backgroundImage: `url(${generateStorageImgUrl({ header: true, blog: type === 'blog', id: `${id}/banner` })})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative p-8 mt-[80px]">
          <div className="text-left text-white space-y-7 w-full lg:max-w-[65%]">
            {builtW && <TechIcons technologies={builtW} showTooltip className="text-3xl text-gray-300" />}
            {tags && <p className="text-sm text-gray-400">{tags.join(', ')}</p>}
            <h1 className="text-3xl leading-[1.5] md:text-5xl md:leading-[1.5] font-bold">{title}</h1>
            <h2 className="text-lg leading-[1.5] md:text-xl md:leading-[1.5] text-gray-200">{description}</h2>
            <p className="text-sm text-gray-300 flex flex-wrap items-center">
              {type === 'blog' ? (
                <span className="inline-flex items-center gap-1">
                  <HiOutlineClock className="inline-block text-base" />
                  {`${time} ${text.page.min}`}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <HiOutlineUser className="inline-block text-base" />
                  {team === 1 ? text.page.solo : `${team} ${text.page.team}`}
                </span>
              )}
              <span className="mx-2">━</span>
              <span className="inline-flex items-center gap-1">
                <HiOutlineEye className="inline-block text-base" />
                <ViewsCounter />
              </span>
              <span className="mx-2">━</span>
              <span className="inline-flex items-center gap-1">
                <HiOutlineThumbUp className="inline-block text-base" />
                <LikesCounter />
              </span>
            </p>
          </div>
        </div>
      </div>
      <Layout>
        <div className="my-5 flex justify-between items-center">
          <p className="w-1/2 text-base text-gray-500 dark:text-gray-400">
            {`${published.getDate()} ${published.toLocaleString('default', { month: 'long' })}, ${published.getFullYear()}`}
            {type === 'blog' && <span className="text-gray-300 dark:text-gray-600 mx-2">━</span>}
            {type === 'blog' && <strong>{text.page.by}</strong>}
            {[{ href: github, icon: <SiGithub className="inline-block text-base align-middle" />, label: text.page.repo }, { href: website, icon: <HiLink className="inline-block text-base align-middle" />, label: text.page.demo }
            ].map(
              (link, index) =>
                link.href && (<React.Fragment key={index}>
                  <span className="text-gray-300 dark:text-gray-600 mx-2">━</span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 align-middle text-primary font-bold capitalize relative underline-slide transition-colors duration-300 ease-in-out">
                    {link.icon}
                    <span className="align-middle">{link.label}</span>
                  </a>
                </React.Fragment>)
            )}
          </p>
          <div className="w-1/2 flex justify-end">
            <LikeButton />
          </div>
        </div>
        <hr className='dark:border-gray-600' />
        <main className='lg:grid lg:grid-cols-[auto,250px] lg:gap-10 my-6 flex flex-col lg:flex-row'>
          <article className='order-2 lg:order-1 break-words whitespace-normal mx-auto mt-4 w-full'>
            <MDXRemote source={source} components={MDXComponents} />
          </article>
          <aside className='order-1 lg:order-2 py-4'>
            <div className='sticky top-36'>
              <TableOfContents />
            </div>
          </aside>
        </main>
        <div>
          <div className="flex flex-wrap gap-2">
            {tags && tags.map((tag, index) => (
              <div key={index} className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white dark:from-gray-700 dark:to-gray-600">{tag}</div>
            ))}
            {builtW && builtW.map((tag, index) => (
              <div key={index} className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white dark:from-gray-700 dark:to-gray-600">{tag}</div>
            ))}
          </div>
        </div>
        <Comments key={id} />
      </Layout>
    </ViewsAndLikesProvider>
  );
};

export default Page;