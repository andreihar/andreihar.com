import Layout from '@/components/Layout';
import { HiOutlineClock, HiOutlineEye, HiOutlineThumbUp, HiOutlineSearch, HiOutlineChevronDown } from 'react-icons/hi';

const Page = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative">
            <img alt="Artificial Intelligence in Education: Enhancing Learning Experiences" src="https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-16.webp" className="w-full h-48 object-cover" />
          </div>
          <div className="relative p-4">
            <div className="relative">
              <img alt="Andrei Harbachov" src="https://avatars.githubusercontent.com/u/95883512?v=4" className="absolute top-0 transform -mt-10 w-12 h-12 rounded-full border-2 border-white z-10" />
            </div>
            <div className="text-xs text-gray-500 mt-6 mb-4">03 Aug 2024</div>
            <a href="/post/artificial-intelligence-in-education-enhancing-learning-experiences" className="block text-sm font-semibold leading-tight text-gray-900 hover:underline line-clamp-2">
              Artificial Intelligence in Education: Enhancing Learning Experiences
            </a>
            <div className="flex justify-end gap-4 mt-6 text-gray-500">
              <div className="flex items-center">
                <HiOutlineClock className="w-5 h-5" />
                <span className="ml-1 text-xs">2.41k</span>
              </div>
              <div className="flex items-center">
                <HiOutlineEye className="w-5 h-5" />
                <span className="ml-1 text-xs">3.95k</span>
              </div>
              <div className="flex items-center">
                <HiOutlineThumbUp className="w-5 h-5" />
                <span className="ml-1 text-xs">3.13k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;