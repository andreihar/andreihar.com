import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getAllPostsMeta } from '@/lib/mdx';
import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import Anim from '@/components/Anim';
import RotatingText from '@/components/widgets/RotatingText';
import Project from '@/components/content/Project';
import Blog from '@/components/content/Blog';
import Contact from '@/components/layout/Contact';
import { generateMetadata as generateSEO } from '@/components/SEO';
import { Locale } from '@/i18n/routing';

type Props = {
  params: { locale: Locale; };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const t_values = await getTranslations({ locale, namespace: 'Values' });

  return generateSEO({
    locale,
    description: t('desc', { name: t_values('name', { f: t_values('f'), s: t_values('s') }) }),
    images: ['/img/hero.jpg'],
    url: '/',
    section: t('title'),
    tags: [t('title'), ...t('tags').split(', '), ...Array.from({ length: 100 }, (_, i) => i + 1).map(i => t_values.has(`Home.rotating.${i}`) ? t_values(`Home.rotating.${i}`) : null).filter((word): word is string => word !== null), ...t_values('location').split(', ')],
  });
}

const Home = async ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  const projectMetas = await getAllPostsMeta('project').then((metas) => metas.filter((meta) => ['chharm-cooks', 'footy-ai', 'taibun', 'memory-lane', 'emotion-recognition', 'ar-homographies'].includes(meta.id)));
  const blogMetas = (await getAllPostsMeta('blog')).slice(0, 3);
  const t = await getTranslations('Home');
  const t_values = await getTranslations('Values');

  return (
    <main>
      <div className="min-h-screen flex flex-col justify-between bg-black font-normal text-white px-6 md:px-14 z-[-1] leading-tight bg-gradient-to-bl from-[#82C91E00] to-[#062343]">
        <div className="flex-grow flex items-center">
          <Layout className="container mx-auto px-4 md:px-6">
            <h1 className="hero-title text-4xl md:text-7xl font-bold mb-8 text-center md:text-left">
              <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, x: -20 }} className="mb-10">
                <span>
                  {t.rich('myName', {
                    c: (chunks) => <Anim delay={0.6} duration={0.5} hidden={{ opacity: 0, scale: 0.75 }} className="inline-block bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">{chunks}</Anim>, name: t_values('f')
                  })}
                </span>
              </Anim>
              <Anim delay={1.3} duration={0.5} hidden={{ opacity: 0 }} className="mt-10">
                <RotatingText />
              </Anim>
            </h1>
            <Anim delay={1.6} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="text-center md:text-left">
              <div className="text-gray-400 font-bold relative text-lg mb-6">
                <a href={`https://github.com/${t_values('github')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 align-middle relative underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
                  <FaGithub className="inline-block align-middle" />
                  <span className="align-middle">{t_values('github')}</span>
                </a>
                <a href={`https://linkedin.com/in/${t_values('linkedin')}`} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex items-center gap-1 align-middle relative underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
                  <FaLinkedin className="inline-block align-middle" />
                  <span className="align-middle">{t_values('linkedin')}</span>
                </a>
              </div>
            </Anim>
            <Anim delay={1.9} duration={0.5} hidden={{ opacity: 0 }}>
              <div className="text-center md:text-left pd-30">
                <Button type='a' text={t('resume')} href="/resume.pdf" size="text-xl px-10 py-4" target="_blank" rel="noopener noreferrer" />
              </div>
            </Anim>
          </Layout>
        </div>
        <Anim delay={2.7} duration={0.5} hidden={{ opacity: 0 }} className="flex justify-center items-end pb-10">
          <a id="scroll" href="#intro" className="relative h-10 w-6 border-2 border-white rounded-full flex flex-col items-center justify-center">
            <span className="flex justify-center absolute bottom-[-1.5rem] w-32 text-xs text-white tracking-wider font-semibold whitespace-nowrap">{t('scroll')}</span>
          </a>
        </Anim>
      </div>
      <Layout className="my-20 pt-14">
        <div id="intro" className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto px-5">
          <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="w-full md:max-w-lg mb-10 md:mb-0">
            <p className="mb-5 text-lg md:text-xl leading-relaxed md:leading-loose">
              {t('about')}
            </p>
            <div className="text-center md:text-left">
              <Button type='link' text={t('aboutBtn')} href="/about" size="text-lg px-8 py-4" />
            </div>
          </Anim>
          <Anim delay={0.4} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="w-64 h-90 mx-auto md:mx-0 relative" style={{ height: '360px' }}>
            <div className="about-img relative w-full h-full border-10 border-white">
              <Image src="/img/hero.jpg" alt={t_values('name', { f: t_values('f'), s: t_values('s') })} fill className="object-cover" />
            </div>
          </Anim>
        </div>
      </Layout>
      <Layout className='my-20 pt-14'>
        <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="flex flex-col items-center pb-10">
          <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
            {t('projects')}
          </h1>
          <p className="text-center text-xl text-base">{t('projectsDesc')}</p>
        </Anim>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projectMetas.map((meta, index) => (
            <Anim key={meta.id} delay={0.2 + index * 0.1} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
              <Project meta={meta} />
            </Anim>
          ))}
        </div>
        <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="flex justify-center mt-6">
          <Button type='link' text={t('projectsBtn')} href="/project" size="text-lg px-8 py-4" />
        </Anim>
      </Layout>
      <Layout className='my-20 pt-14'>
        <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="flex flex-col items-center pb-10">
          <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
            {t('blog')}
          </h1>
        </Anim>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogMetas.map((meta, index) => (
            <Anim key={meta.id} delay={0.2 + index * 0.1} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
              <Blog meta={meta} />
            </Anim>
          ))}
        </div>
        <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="flex justify-center mt-6">
          <Button type='link' text={t('blogBtn')} href="/blog" size="text-lg px-8 py-4" />
        </Anim>
      </Layout>
      <Contact />
    </main>
  );
};

export default Home;