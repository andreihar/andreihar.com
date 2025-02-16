import React from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useTranslations, useLocale, useFormatter } from 'next-intl';
import { BlogType, ProjectType } from '@/types/blog';
import { HiOutlineClock, HiOutlineEye, HiOutlineThumbUp, HiOutlineUser, HiLink } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { ViewsAndLikesProvider, ViewsCounter, LikesCounter, LikeButton } from '@/components/widgets/ViewsAndLikes';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';
import TechIcons from '@/components/widgets/TechIcons';
import Comments from '@/components/widgets/Comments';
import Layout from '@/components/layout/Layout';
import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents from '@/components/content/TableOfContents';
import ShareButton from '@/components/ShareButton';

interface PageProps {
  post: BlogType & { source: any; } | ProjectType & { source: any; };
}

const Page: React.FC<PageProps> = ({ post }) => {
  const { id, title, description, published, source } = post;
  const isBlog = 'tags' in post;
  const t = useTranslations('BlogPage');
  const t_values = useTranslations('Values');
  const locale = useLocale();
  const format = useFormatter();

  return (
    <ViewsAndLikesProvider type={isBlog ? 'blog' : 'project'} id={id} showWords updateViewOnLoad>
      <div className="relative p-5 text-center bg-center bg-no-repeat bg-cover min-h-[550px] h-auto flex flex-col justify-end" style={{ backgroundImage: `url(${generateStorageImgUrl({ header: true, blog: isBlog, id: `${id}/banner` })})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative p-8 mt-[80px]">
          <div className="flex justify-between items-start">
            <div className="text-start text-white space-y-7 w-full lg:max-w-[65%]">
              {'builtW' in post && <TechIcons technologies={post.builtW} showTooltip className="text-3xl text-gray-300" />}
              {'tags' in post && post.tags.map((tag, index) => (
                <span key={index} className="relative inline-block select-none items-center whitespace-nowrap rounded-lg bg-white bg-opacity-20 py-1 px-2 font-sans font-bold uppercase text-white dark:bg-opacity-20 dark:bg-white me-2" style={{ fontSize: '0.625rem' }}>
                  {tag}
                </span>
              ))}
              <h1 className="text-3xl leading-[1.5] md:text-5xl md:leading-[1.5] font-bold">{title}</h1>
              <h2 className="text-lg leading-[1.5] md:text-xl md:leading-[1.5] text-gray-200">{description}</h2>
              <p className="text-sm text-gray-300 flex flex-wrap items-center">
                {'tags' in post ? (
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineClock className="inline-block text-base" />
                    {t('min', { time: post.time })}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineUser className="inline-block text-base" />
                    {t('team', { team: post.team })}
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
            <div className="lg:max-w-[35%]">
              <div className="absolute bottom-5 end-0.5">
                <ShareButton title={title} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Layout>
        <div className="my-5 flex justify-between items-center">
          <p className="text-base text-gray-500 dark:text-gray-400 flex-grow">
            {isBlog && (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Image src={t_values('avatar')} alt={t_values('name', { f: t_values('f'), s: t_values('s') })} width={80} height={80} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-bold">{t_values('name', { f: t_values('f'), s: t_values('s') })}</p>
                  <p className="text-sm text-gray-500">{format.dateTime(published, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            )}
            {!isBlog && format.dateTime(published, { year: 'numeric', month: 'long', day: 'numeric' })}
            {'builtW' in post && [{ href: post.github, icon: <SiGithub className="inline-block text-base align-middle" />, label: t('repo') }, { href: post.website, icon: <HiLink className="inline-block text-base align-middle" />, label: t('demo') }
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
          <div className="flex justify-end">
            <LikeButton />
          </div>
        </div>
        <hr className='dark:border-gray-600' />
        <main className='lg:grid lg:grid-cols-[auto,250px] lg:gap-10 my-6 flex flex-col lg:flex-row'>
          <article className='order-2 lg:order-1 break-words whitespace-normal mx-auto mt-4 w-full'>
            <MDXRemote source={source} components={MDXComponents} />
          </article>
          <aside className='hidden lg:block order-2 py-4'>
            <div className='sticky top-36'>
              <TableOfContents />
            </div>
          </aside>
        </main>
        <div>
          <div className="flex flex-wrap gap-2">
            {('tags' in post ? post.tags : post.builtW).map((tag, index) => (
              <div key={index} className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white dark:from-gray-700 dark:to-gray-600">{tag}</div>
            ))}
          </div>
        </div>
        <Comments key={id} locale={locale} />
      </Layout>
    </ViewsAndLikesProvider>
  );
};

export default Page;