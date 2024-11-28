import { FaGithub, FaLinkedinIn, FaYoutube, FaEnvelope } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import Logo from '@/components/Logo';

export default function Footer() {
  const t = useTranslations('Values');
  const t_values = useTranslations('Values');
  const socialMediaLinks = [
    { href: `mailto:${t_values('email')}`, icon: FaEnvelope, name: 'Email' },
    { href: `https://github.com/${t_values('github')}`, icon: FaGithub, name: 'GitHub' },
    { href: `https://linkedin.com/in/${t_values('linkedin')}`, icon: FaLinkedinIn, name: 'LinkedIn' },
    { href: `https://youtube.com/@${t_values('youtube')}`, icon: FaYoutube, name: 'YouTube' },
  ];

  const startingYear = 2024;
  const currentYear = new Date().getFullYear();
  const displayYear = startingYear === currentYear ? `${startingYear}` : `${startingYear} - ${currentYear}`;

  return (
    <footer className="w-full max-w-screen-xl mx-auto p-4 md:py-8 m-4">
      <div className="inline-flex items-center justify-center w-full mb-12 lg:mb-14">
        <div className="w-full h-px mx-auto py-0.5 divider" />
        <div className="absolute px-4 -translate-x-1/2 left-1/2 bg-white dark:bg-[#121212] text-primary">
          <Logo height={60} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{t_values('name')}</h1>
        </div>
        <div className="mb-6 flex justify-center space-x-3 md:space-x-6">
          {socialMediaLinks.map(({ href, icon: Icon, name }, index) => (
            <a key={index} href={href} aria-label={name} type="button" className="rounded-full bg-transparent uppercase leading-normal text-surface transition duration-150 ease-in-out hover:text-primary-600 focus:outline-none focus:ring-0 dark:text-white dark:hover:text-primary-400" data-twe-ripple-init>
              <Icon className="text-3xl" />
            </a>
          ))}
        </div>
      </div>
      <span className="block text-gray-600 text-center dark:text-gray-300">@ {t_values('name')}, {displayYear}</span>
    </footer>
  );
}