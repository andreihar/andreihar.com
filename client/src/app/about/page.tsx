import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiMysql, SiPython, SiTensorflow, SiPytorch, SiAndroid, SiAngular, SiBootstrap, SiExpress, SiFirebase, SiFlask, SiKeras, SiZalando, SiMui, SiNumpy, SiPostgresql, SiUnity, SiC, SiCplusplus, SiCsharp, SiPandas } from 'react-icons/si';
import { FaJava, FaPen } from 'react-icons/fa';

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
    description: 'Studied core computer science concepts including algorithms, data structures, and software engineering. Graduated with honors.',
  },
  {
    title: 'High School Degree',
    date: '2015 - 2020',
    institution: 'Burnaby South Secondary',
    description: 'Focused on machine learning, neural networks, and AI ethics. Completed a thesis on deep learning applications in natural language processing.',
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
      <div className="h-10 w-10 bg-primary-600 rounded-full ring-8 ring-white dark:ring-gray-800 flex items-center justify-center">
        <FaPen className="text-white h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 pl-3">
        <div className="text-xl text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">{title}</span>
          <span className="whitespace-nowrap">{date}</span>
        </div>
        <div className="mt-2">
          <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{institution}</h4>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{description}</p>
        </div>
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
          <div className="col-span-2 mb-10 md:mb-0">
            <p className="mb-5 text-lg md:text-xl leading-relaxed md:leading-loose">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, velit alias eius non illum beatae atque
              repellat ratione qui veritatis repudiandae adipisci maiores. At inventore necessitatibus deserunt
              exercitationem cumque earum omnis ipsum rem accusantium quis, quas quia, accusamus provident suscipit magni!
              Expedita sint ad dolore, commodi labore nihil velit earum ducimus nulla quae nostrum fugit aut, deserunt
              reprehenderit libero enim!
            </p>
            <div className="text-center md:text-left">
              <Button type='a' text="Download Resume" href="#" size="text-lg px-8 py-4" />
            </div>
          </div>
          <div className="w-64 h-90 mx-auto md:mx-0">
            <div className="about-img relative w-full h-full border-10 border-white">
              <img src="./img/studying.jpg" alt="Studying Hard" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Layout>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-4xl font-bold pb-2 text-center">Tech Stack</h1>
          <p className="text-center text-xl text-base pb-4">What I use</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-5">
          {Object.entries(techStack).map(([category, technologies]) => (
            <div key={category} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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
            </div>
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
    </main>
  );
};