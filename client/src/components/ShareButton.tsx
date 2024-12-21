'use client';
import { FaShareAlt, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface ShareButtonProps {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const t = useTranslations('Values');
  const t_text = useTranslations('BlogPage');
  const pathname = usePathname();
  const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${pathname.substring(1)}`;

  const socialMedia = [
    { name: 'Twitter', href: `https://x.com/intent/post?url=${link}&text=${t_text('body', { title, name: `@${t('twitter')}` })}`, icon: FaTwitter },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`, icon: FaLinkedin },
    { name: 'Mail', href: `mailto:?subject=${t_text('subject')}&body=${t_text('body', { title, name: t('name', { f: t('f'), s: t('s') }) })}${link}`, icon: FaEnvelope },
  ];

  return (
    <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 dark:bg-neutral-200 font-medium text-neutral-200 dark:text-neutral-800 transition-all duration-300 hover:w-40 active:bg-neutral-600 dark:active:bg-neutral-400">
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100 z-10">
        {socialMedia.map((platform, index) => (
          <a key={index} href={platform.href} target="_blank" rel="noopener noreferrer" className="mx-0.5">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-neutral-950 dark:bg-neutral-200 transition-colors duration-300 hover:bg-gray-700 dark:hover:bg-gray-400">
              <platform.icon className="h-6 w-6 text-white dark:text-neutral-800" />
            </div>
          </a>
        ))}
      </div>
      <div className="absolute right-3.5 z-10 transition-transform duration-300 group-hover:translate-x-12">
        <FaShareAlt className="h-5 w-5 transition-transform duration-300 group-active:scale-125 group-active:rotate-12" />
      </div>
    </button>
  );
};

export default ShareButton;