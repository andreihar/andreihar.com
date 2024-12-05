import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ViewsAndLikesProvider, ViewsCounter, LikesCounter } from '@/components/widgets/ViewsAndLikes';
import { BlogType } from '@/types/blog';
import { HiOutlineClock, HiOutlineEye, HiOutlineThumbUp } from 'react-icons/hi';
import { generateStorageImgUrl } from '@/components/widgets/StorageImg';

const Blog: React.FC<{ meta: BlogType; }> = ({ meta }) => {
  const { id, title, description, tags, time, published } = meta;
  const imageUrl = generateStorageImgUrl({ header: true, blog: true, id: `${id}/banner` });
  const t = useTranslations('Values');

  return (
    <ViewsAndLikesProvider type="blog" id={id}>
      <Link href={`/blog/${id}`} className="block group">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden group">
          <div className="relative overflow-hidden">
            <div className="flex flex-wrap gap-2 absolute top-2 left-2 z-10">
              {tags.map((tag, index) => (
                <div key={index} className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1 px-2 font-sans font-bold uppercase text-white dark:from-gray-700 dark:to-gray-600" style={{ fontSize: '0.625rem' }}>
                  {tag}
                </div>
              ))}
            </div>
            <Image alt={`Banner of ${title}`} src={imageUrl} width={0} height={0} sizes="100vw" className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
          </div>
          <div className="relative p-4 dark:text-white">
            <div className="relative">
              <Image alt={t('name', { f: t('f'), s: t('s') })} src={t('avatar')} width={48} height={48} className="absolute top-0 transform -mt-10 w-12 h-12 rounded-full border-2 border-white z-10" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 mb-4">{`${published.getDate()} ${published.toLocaleString('default', { month: 'long' })}, ${published.getFullYear()}`}</div>
            <h1 className="block text-md font-semibold leading-tight text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out group-hover:text-primary">
              {title}
            </h1>
            <p className="text-sm mt-2 text-black dark:text-gray-300">
              {description}
            </p>
            <div className="flex justify-end gap-4 mt-6 text-gray-500 dark:text-gray-400 text-xs">
              <div className="flex items-center">
                <HiOutlineClock className="w-5 h-5 mr-1" />
                {time}
              </div>
              <div className="flex items-center">
                <HiOutlineEye className="w-5 h-5 mr-1" />
                <ViewsCounter />
              </div>
              <div className="flex items-center">
                <HiOutlineThumbUp className="w-5 h-5 mr-1" />
                <LikesCounter />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ViewsAndLikesProvider>
  );
};

export default Blog;