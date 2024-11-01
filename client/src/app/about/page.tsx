import Image from 'next/image';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiMysql, SiPython, SiTensorflow, SiPytorch, SiAndroid, SiAngular, SiBootstrap, SiExpress, SiFirebase, SiFlask, SiKeras, SiZalando, SiMui, SiNumpy, SiPostgresql, SiUnity, SiC, SiCplusplus, SiCsharp, SiPandas } from 'react-icons/si';
import { FaJava, FaPen } from 'react-icons/fa';
import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import Contact from '@/components/layout/Contact';
import Anim from '@/components/Anim';
import { generateMetadata as generateSEO } from '@/components/SEO';
import text from '@/data/text.json';

export async function generateMetadata() {
  return generateSEO({
    title: text.about.title,
    description: text.about.desc,
    images: ['/img/studying.jpg'],
    url: 'about',
    section: 'About',
    tags: ['About', 'Profile', 'Background', 'Skills', 'Experiences', ...Object.values(text.home.rotating).slice(0, 4), ...text.values.location.split(', ')],
  });
}

const tech = (name: string, icon: React.ComponentType<{ className?: string; }>) => ({ name, icon });

const techStack = {
  frontend: [
    tech('React', SiReact), tech('Next.js', SiNextdotjs), tech('Angular', SiAngular),
    tech('Tailwind CSS', SiTailwindcss), tech('Bootstrap', SiBootstrap), tech('Material-UI', SiMui),
    tech('TypeScript', SiTypescript),
  ],
  backend: [
    tech('Node.js', SiNodedotjs), tech('Express', SiExpress), tech('Flask', SiFlask),
    tech('Firebase', SiFirebase), tech('PostgreSQL', SiPostgresql), tech('MySQL', SiMysql),
  ],
  ai_ml: [
    tech('Python', SiPython), tech('TensorFlow', SiTensorflow), tech('PyTorch', SiPytorch),
    tech('Keras', SiKeras), tech('NumPy', SiNumpy), tech('Pandas', SiPandas),
  ],
  other: [
    tech('Android', SiAndroid), tech('Java', FaJava), tech('Unity', SiUnity), tech('C', SiC),
    tech('C++', SiCplusplus), tech('C#', SiCsharp), tech('MATLAB', SiZalando),
  ],
};

const TimelineItem: React.FC<{ title: string; date: string; institution: string; desc: string; note?: string; }> = ({ title, date, institution, desc, note }) => (
  <li className="relative pb-8">
    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
    <div className="relative flex items-start space-x-3">
      <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, scale: 0.5 }}>
        <div className="h-10 w-10 bg-primary-600 rounded-full ring-8 ring-white dark:ring-gray-800 flex items-center justify-center">
          <FaPen className="text-white h-5 w-5" />
        </div>
      </Anim>
      <div className="min-w-0 flex-1 pl-3">
        <Anim delay={0.3} duration={0.5} hidden={{ opacity: 0 }}>
          <div className="text-xl text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">{title}</span>
            <span className="whitespace-nowrap">{date}</span>
          </div>
          {note && <span className="text-lg text-gray-500 dark:text-gray-400">{note}</span>}
        </Anim>
        <Anim delay={0.4} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{institution}</h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">{desc}</p>
          </div>
        </Anim>
      </div>
    </div>
  </li>
);

export default function About() {
  return (
    <main>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold pb-2 text-center">{text.about.title}</h1>
          <h2 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">{text.values.name}</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto px-5">
          <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="w-full md:max-w-lg mb-10 md:mb-0">
            <p className="mb-5 text-lg md:text-xl leading-relaxed md:leading-loose">
              {text.about.text}
            </p>
            <div className="text-center md:text-left">
              <Button type='a' text={text.about.resume} href="/resume.pdf" size="text-lg px-8 py-4" target="_blank" rel="noopener noreferrer" />
            </div>
          </Anim>
          <Anim delay={0.4} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="w-64 h-90 mx-auto md:mx-0 relative" style={{ height: '360px' }}>
            <div className="about-img relative w-full h-full border-10 border-white">
              <Image src="/img/studying.jpg" alt={text.values.name} fill className="object-cover" />
            </div>
          </Anim>
        </div>
      </Layout>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold pb-2 text-center">{text.about.tech}</h1>
          <p className="text-center text-xl text-base pb-4">{text.about.techDesc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-5">
          {Object.entries(techStack).map(([category, technologies], index) => (
            <Anim key={category} delay={0.2 + index * 0.1} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {category.includes('_') ? category.replace('_', ' & ').toUpperCase() : category}
              </h2>
              <div className="space-y-4">
                {technologies.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-4">
                    <tech.icon className="text-4xl text-primary" />
                    <span className="text-xl font-semibold">{tech.name}</span>
                  </div>
                ))}
              </div>
            </Anim>
          ))}
        </div>
      </Layout>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold pb-4 text-center">{text.about.education}</h1>
        </div>
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <ul className="-mb-8">
            {Object.values(text.about.edu).map((item: { title: string; date: string; institution: string; desc: string; note?: string; }) => ({ title: item.title, date: item.date, institution: item.institution, desc: item.desc, note: item.note })).map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </ul>
        </div>
      </Layout>
      <Contact />
    </main>
  );
}