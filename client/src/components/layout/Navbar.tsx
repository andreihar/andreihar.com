'use client';
import Logo from '@/components/Logo';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Link, Locale, Pathnames, routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const nextLocale = locale === routing.locales[0] ? routing.locales[1] : routing.locales[0];
  const languageDisplayName = new Intl.DisplayNames([nextLocale], { type: 'language' }).of(nextLocale) || nextLocale;

  useEffect(() => {
    setIsMounted(true);
    if (window.scrollY > 0) {
      setIsScrolled(true);
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLocaleChange = () => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      router.replace({ pathname, params: params }, { locale: nextLocale });
    });
  };

  const menuItems: { title: string; href: Pathnames; isLocaleChange?: boolean; }[] = [
    { title: t('Home.title'), href: "/" },
    { title: t('Project.title'), href: "/project" },
    { title: t('Blog.title'), href: "/blog" },
    { title: t('About.title'), href: "/about" },
    { title: languageDisplayName, href: "/", isLocaleChange: true }
  ];

  if (!isMounted) {
    return null;
  }

  const header = pathname === '/' || pathname.startsWith('/project/') || pathname.startsWith('/blog/');
  const textColorClass = header && !isScrolled ? 'text-white dark:text-white' : 'text-base';
  const isRtl = typeof window !== 'undefined' && document.documentElement.dir === 'rtl';

  return (
    <nav className={`fixed z-50 left-0 top-0 w-screen h-16 ${header ? (isScrolled ? 'bg-white shadow-md dark:bg-dark' : 'bg-transparent') : 'bg-white shadow-md dark:bg-dark'} transition-all duration-300 ease-in-out`}>
      <div className="h-full">
        <div className="flex items-center justify-between w-full h-full max-w-[1300px] px-2.5 mx-auto">
          <div className="flex items-center h-full">
            <Link href='/' aria-label="Home" className={`text-base font-medium tracking-widest no-underline ${textColorClass} uppercase p-5 block hover:text-primary transition-colors duration-300 ease-in-out`}>
              <Logo height={60} />
            </Link>
          </div>
          <div className="flex items-center h-full">
            {/* Desktop Menu */}
            <ul className="hidden md:flex md:flex-row md:items-center">
              {menuItems.map((item, index) => {
                const isActiveRoute = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const className = `tracking-widest font-jost no-underline ${textColorClass} uppercase p-5 block group-hover:text-primary transition-colors duration-300 ease-in-out font-jest`;
                return (
                  <li key={index} className="md:inline-block group">
                    {item.isLocaleChange ? (
                      <button onClick={handleLocaleChange} data-after={item.title} className={`${className} font-medium`}>{item.title}</button>
                    ) : (
                      <Link href={item.href as any} data-after={item.title} className={`${className} ${isActiveRoute ? 'text-primary font-bold' : 'font-medium'}`}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* Mobile Menu */}
            <ul className={`${isActive ? 'start-0' : 'start-full'} list-none absolute bg-white dark:bg-dark w-screen h-screen top-0 flex flex-col justify-center items-center z-10 overflow-x-hidden transition-[${isRtl ? 'right' : 'left'}] duration-500 ease-in-out md:hidden`}>
              {menuItems.map((item, index) => {
                const isActiveRoute = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const className = `text-[1.8rem] text-center tracking-widest font-jost no-underline uppercase p-5 block after:content-[attr(data-after)] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:text-[13rem] after:tracking-[50px] after:text-gray-100 dark:after:text-gray-800 after:z-[-1] after:transition-all after:duration-300 group-hover:after:scale-50 group-hover:after:tracking-normal group-hover:text-primary transition-colors duration-300 ease-in-out`;
                return (
                  <li key={index} className="group">
                    {item.isLocaleChange ? (
                      <button onClick={handleLocaleChange} data-after={item.title} className={`${className} font-medium`}>{item.title}</button>
                    ) : (
                      <Link href={item.href as any} data-after={item.title} className={`${className} ${isActiveRoute ? 'text-primary font-bold' : 'font-medium'}`} onClick={() => setIsActive(false)}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center h-full">
            <ThemeSwitch />
            <button onClick={() => setIsActive(!isActive)} className="z-50 text-gray-500 w-10 h-10 relative focus:outline-none bg-transparent md:hidden">
              <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {[{ act: 'rotate-45', in: '-translate-y-1.5' }, { act: 'opacity-0', in: '' }, { act: '-rotate-45', in: 'translate-y-1.5' }].map((line, index) => (
                  <span key={index} aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isActive ? line.act : line.in}`}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}