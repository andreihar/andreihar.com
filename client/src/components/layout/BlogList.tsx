'use client';
import { useState, useEffect, useRef } from 'react';
import { HiSearch, HiChevronDown, HiCalendar, HiEye, HiThumbUp } from 'react-icons/hi';
import Blog from '@/components/content/Blog';
import Anim from '@/components/Anim';
import useMeta from '@/hooks/useMeta';
import { BlogType } from '@/types/blog';
import text from '@/data/text.json';

interface BlogListProps {
  posts: BlogType[];
}

const sortOptions = [
  { label: text.filter.date, value: 'date', icon: HiCalendar },
  { label: text.filter.views, value: 'views', icon: HiEye },
  { label: text.filter.likes, value: 'likes', icon: HiThumbUp }
];

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const { getStats } = useMeta();
  const [postsWithStats, setPostsWithStats] = useState<(BlogType & { views: number; likes: number; })[]>([]);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<(BlogType & { views: number; likes: number; })[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(sortOptions[0].value);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPostsWithStats(posts.map(post => ({ ...post, views: 0, likes: 0 })));
  }, [posts]);

  useEffect(() => {
    const fetchStats = async () => {
      const postsWithStats = await Promise.all(posts.map(async (post) => {
        const stats = await getStats('blog', post.id);
        return { ...post, views: stats.views, likes: stats.likes };
      }));
      setPostsWithStats(postsWithStats);
      setFilteredPosts(postsWithStats);
    };
    fetchStats();
  }, [posts]);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  useEffect(() => {
    let results = postsWithStats.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory === 'views') {
      results = results.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    } else if (selectedCategory === 'likes') {
      results = results.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    } else {
      results = results.sort((a, b) => b.published.getTime() - a.published.getTime());
    }

    if (activeTags.length > 0) {
      results = results.filter(post => activeTags.every(tag => post.tags.includes(tag)));
    }
    setFilteredPosts(results);
  }, [search, selectedCategory, activeTags, postsWithStats]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const getTagClass = (tag: string) => {
    if (activeTags.includes(tag))
      return 'cursor-pointer bg-primary-100 text-primary-900 dark:bg-primary-500 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-400';
    if (activeTags.length > 0 && !filteredPosts.some(post => post.tags.includes(tag)))
      return 'cursor-not-allowed text-white bg-gray-400';
    return 'cursor-pointer text-gray-300 dark:text-gray-400 bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 hover:text-white dark:hover:text-white';
  };

  return (
    <div>
      <form className="max-w-lg mx-auto">
        <label htmlFor="default-search" className="sr-only">{text.filter.search}</label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <HiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input type="search" id="default-search" className="block w-full p-3 ps-12 text-gray-900 border border-gray-300 rounded-s-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-white" placeholder={`${text.filter.search}...`} value={search} onChange={(e) => handleSearch(e.target.value)} />
          <div ref={dropdownRef} className="relative">
            <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 font-medium text-center text-gray-900 bg-gray-50 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:text-white dark:border-gray-700 whitespace-nowrap" type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {(() => {
                const selectedOption = sortOptions.find(item => item.value === selectedCategory);
                return (
                  <>
                    {selectedOption && <selectedOption.icon className="w-5 h-5 mr-2" />}
                    {selectedOption?.label}
                    <HiChevronDown className="w-4 h-4 ms-2.5" />
                  </>
                );
              })()}
            </button>
            {dropdownOpen && (
              <div id="dropdown" className="z-50 absolute right-0 mt-1 bg-gray-50 border border-gray-300 rounded-lg shadow-lg w-44 dark:bg-gray-800 dark:border-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  {sortOptions.map((option) => (
                    <li key={option.value}>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect(option.value)}>
                        <option.icon className="w-5 h-5 mr-2" />
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-4 max-w-lg mx-auto justify-center">
        {allTags.map((tag) => (
          <div key={tag} className={`relative grid select-none items-center whitespace-nowrap rounded-lg py-1 px-2 font-sans font-bold uppercase ${getTagClass(tag)} transition-colors duration-300 ease-in-out`} style={{ fontSize: '0.625rem' }} onClick={() => !(activeTags.length > 0 && !filteredPosts.some(post => post.tags.includes(tag))) && handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredPosts.map((post, index) => (
          <Anim key={post.id} delay={0.2 + index * 0.1} duration={0.5} hidden={{ opacity: 0, y: 20 }}>
            <Blog meta={post} />
          </Anim>
        ))}
      </div>
    </div>
  );
};

export default BlogList;