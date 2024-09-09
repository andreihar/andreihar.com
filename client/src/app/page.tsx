import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import Anim from '@/components/Anim';
import RotatingText from '@/components/widgets/RotatingText';
import { getAllPostsMeta } from '@/lib/mdx';
import Project from '@/components/content/Project';
import Blog from '@/components/content/Blog';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Home = async () => {
  const projectMetas = await getAllPostsMeta('project').then((metas) => metas.filter((meta) => ['chharm-cooks', 'footy-ai', 'taibun', 'memory-lane', 'emotion-recognition', 'ar-homographies'].includes(meta.id)));
  const blogMetas = (await getAllPostsMeta('blog')).slice(0, 3);

  return (
    <main>
      <div id="hero" className="min-h-screen h-screen flex items-center bg-black font-normal text-white px-6 md:px-14 z-[-1] leading-tight bg-gradient-to-bl from-[#82C91E00] to-[#062343]">
        <Layout className="container mx-auto px-4 md:px-6 py-20">
          <h1 className="hero-title text-4xl md:text-7xl font-bold mb-8 text-center md:text-left">
            <Anim delay={0.2} duration={0.5} hidden={{ opacity: 0, x: -20 }} className="mb-10">
              <span>
                Hi, my name is
                <Anim delay={0.6} duration={0.5} hidden={{ opacity: 0, scale: 0.75 }} className="inline-block ml-2 md:ml-4 bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
                  Andrei
                </Anim>
              </span>
            </Anim>
            <Anim delay={1.3} duration={0.5} hidden={{ opacity: 0 }} className="mt-10">
              I'm a<RotatingText />
            </Anim>
          </h1>
          <Anim delay={1.6} duration={0.5} hidden={{ opacity: 0, y: 20 }} className="text-center md:text-left">
            <div className="text-gray-400 font-bold relative text-lg mb-6">
              <a href='https://github.com/andreihar' target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 align-middle underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
                <FaGithub className="inline-block align-middle" />
                <span className="align-middle">andreihar</span>
              </a>
              <a href='https://linkedin.com/in/andreihar' target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 align-middle underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
                <FaLinkedin className="inline-block align-middle" />
                <span className="align-middle">andreihar</span>
              </a>
            </div>
          </Anim>
          <Anim delay={1.9} duration={0.5} hidden={{ opacity: 0 }}>
            <div className="text-center md:text-left">
              <Button text="Resume" size="text-xl px-10 py-4" mobileSize="text-md" />
            </div>
          </Anim>
          <a id="scroll-btn" href="#about" className="absolute h-14 w-8 border-2 border-white m-auto left-0 right-0 bottom-8 rounded-full"></a>
        </Layout>
      </div>
      <Layout className="my-20 pt-14">
        <div className="flex flex-col items-center pb-10">
          <h1 id="about" className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-center text-xl text-base">A collection of musings and reflections</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto px-5">
          <div className="w-full md:max-w-lg mb-10 md:mb-0">
            <p className="mb-5 text-lg md:text-xl leading-relaxed md:leading-loose">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, velit alias eius non illum beatae atque
              repellat ratione qui veritatis repudiandae adipisci maiores. At inventore necessitatibus deserunt
              exercitationem cumque earum omnis ipsum rem accusantium quis, quas quia, accusamus provident suscipit magni!
              Expedita sint ad dolore, commodi labore nihil velit earum ducimus nulla quae nostrum fugit aut, deserunt
              reprehenderit libero enim!</p>
            <div className="text-center md:text-left">
              <Button type='link' text="About Me" href="/about" size="text-lg px-8 py-4" mobileSize="text-base px-6 py-3" />
            </div>
          </div>
          <div className="col-left w-64 h-90 mx-auto md:mx-0">
            <div className="about-img relative w-full h-full border-10 border-white">
              <img src="./about.jpg" alt="img" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Layout>
      <Layout className='my-20 pt-14'>
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-center text-xl text-base">Some of my creations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projectMetas.map((meta) => (
            <Project key={meta.id} meta={meta} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button type='link' text="View All Projects" href="/project" size="text-lg px-8 py-4" mobileSize="text-base px-6 py-3" />
        </div>
      </Layout>
      <Layout className='my-20 pt-14'>
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-5xl font-bold pb-4 text-center bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
            Latest Posts
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogMetas.map((meta) => (
            <Blog key={meta.id} meta={meta} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button type='link' text="View All Posts" href="/blog" size="text-lg px-8 py-4" mobileSize="text-base px-6 py-3" />
        </div>
      </Layout>
    </main>
  );
};

export default Home;