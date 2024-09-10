import Button from '@/components/Button';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Contact from '@/components/layout/Contact';
import Anim from '@/components/Anim';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiMysql, SiPython, SiTensorflow, SiPytorch, SiAndroid, SiAngular, SiBootstrap, SiExpress, SiFirebase, SiFlask, SiKeras, SiZalando, SiMui, SiNumpy, SiPostgresql, SiUnity, SiC, SiCplusplus, SiCsharp, SiPandas } from 'react-icons/si';
import { FaJava, FaPen } from 'react-icons/fa';
import { generateMetadata as generateSEO } from '@/components/SEO';

export async function generateMetadata() {
  return generateSEO({
    title: 'About',
    description: 'Learn more about Andrei Harbachov, his background, skills, and experiences.',
    images: ['/img/studying.jpg'],
    url: 'about',
    section: 'About',
    tags: ['Andrei Harbachov', 'About', 'Profile', 'Background', 'Skills', 'Experiences'],
  });
}

const techStack = {
  frontend: [
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Angular', icon: SiAngular },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Bootstrap', icon: SiBootstrap },
    { name: 'Material-UI', icon: SiMui },
    { name: 'TypeScript', icon: SiTypescript },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'Flask', icon: SiFlask },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MySQL', icon: SiMysql },
  ],
  ai_ml: [
    { name: 'Python', icon: SiPython },
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'PyTorch', icon: SiPytorch },
    { name: 'Keras', icon: SiKeras },
    { name: 'NumPy', icon: SiNumpy },
    { name: 'Pandas', icon: SiPandas },
  ],
  other: [
    { name: 'Android', icon: SiAndroid },
    { name: 'Java', icon: FaJava },
    { name: 'Unity', icon: SiUnity },
    { name: 'C', icon: SiC },
    { name: 'C++', icon: SiCplusplus },
    { name: 'C#', icon: SiCsharp },
    { name: 'MATLAB', icon: SiZalando },
  ],
};

const timelineData = [
  {
    title: 'Bachelor of Science in Computer Science',
    date: '2020 - 2024',
    institution: 'Simon Fraser University',
    description: 'Specialised in Artificial Intelligence and Visual Computing. Gained a strong foundation in core computer science topics such as Algorithms, Data Structures, and Software Engineering. Developed expertise in Machine Learning, Computer Vision, Natural Language Processing, and Computational Photography through hands-on projects and coursework. Achieved Honour Roll recognition from 2022 onwards for academic excellence.',
  },
  {
    title: 'High School Diploma',
    date: '2015 - 2020',
    institution: 'Burnaby South Secondary',
    description: 'Graduated with distinction, earning a place on the Principal’s List and achieving 100% in AP Computer Science. Learned web development and object-oriented programming while cultivating a strong passion for coding through personal projects.',
  }
];

interface TimelineItemProps {
  title: string;
  date: string;
  institution: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, institution, description }) => (
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
        </Anim>
        <Anim delay={0.4} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{institution}</h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">{description}</p>
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
          <h1 className="text-4xl font-bold pb-2 text-center">About</h1>
          <h2 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">Andrei Harbachov</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-xl mx-auto px-5">
          <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="col-span-2 mb-10 md:mb-0">
            <p className="mb-5 text-lg md:text-xl leading-relaxed md:leading-loose">
              Hello, I’m Andrei, a Simon Fraser University graduate with a Bachelor of Science in Computer Science, specialising in Artificial Intelligence and Visual Computing. My programming journey began in middle school and has grown into a diverse skill set across Web Development, Machine Learning, and Computer Vision. I’m constantly exploring new technologies and applying them to real-world problems. On this website, you’ll find my projects, blog posts, and thoughts on tech. I’m always eager to connect, collaborate, and learn — feel free to reach out!
            </p>
            <div className="text-center md:text-left">
              <Button type='a' text="See Resume" href="/resume.pdf" size="text-lg px-8 py-4" target="_blank" rel="noopener noreferrer" />
            </div>
          </Anim>
          <Anim delay={0.4} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="w-64 h-90 mx-auto md:mx-0">
            <div className="about-img relative w-full h-full border-10 border-white">
              <Image src="/img/studying.jpg" alt="Studying Hard" fill className="object-cover" />
            </div>
          </Anim>
        </div>
      </Layout>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold pb-2 text-center">Tech Stack</h1>
          <p className="text-center text-xl text-base pb-4">Tools & technologies I use to build innovative solutions</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-5">
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
          <h1 className="text-4xl font-bold pb-4 text-center">Background Education</h1>
        </div>
        <div className="max-w-screen-xl mx-auto px-5 relative">
          <ul className="-mb-8">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </ul>
        </div>
      </Layout>
      <Contact />
    </main>
  );
}