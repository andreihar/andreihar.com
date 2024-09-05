'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { HiOutlineEye, HiOutlineThumbUp } from 'react-icons/hi';
import useMeta from '@/hooks/useMeta';

interface ViewsAndLikesContextProps {
  views: number;
  likes: number;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  type: string;
  id: string;
}

const ViewsAndLikesContext = createContext<ViewsAndLikesContextProps | null>(null);

const useViewsAndLikes = () => {
  const context = useContext(ViewsAndLikesContext);
  if (!context) {
    throw new Error('useViewsAndLikes must be used within a ViewsAndLikesProvider');
  }
  return context;
};

interface ViewsAndLikesProviderProps {
  children: ReactNode;
  type: string;
  id: string;
}

const ViewsAndLikesProvider: React.FC<ViewsAndLikesProviderProps> = ({ children, type, id }) => {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const { getStats, updateView } = useMeta();

  useEffect(() => {
    const fetchData = async () => {
      const stats = await getStats(type, id);
      setViews(stats.views);
      setLikes(stats.likes);
    };

    fetchData();

    const viewKey = `${type}-${id}-viewed`;
    if (!localStorage.getItem(viewKey)) {
      updateView(type, id);
      localStorage.setItem(viewKey, 'true');
    }
  }, [type, id, getStats, updateView]);

  return (
    <ViewsAndLikesContext.Provider value={{ views, likes, setLikes, type, id }}>
      {children}
    </ViewsAndLikesContext.Provider>
  );
};

const ViewsAndLikesCounters: React.FC = () => {
  const { views, likes } = useViewsAndLikes();

  const formatCount = (count: number, singular: string, plural: string) => `${count} ${count === 1 ? singular : plural}`;

  return (
    <>
      <span className="inline-flex items-center gap-1">
        <HiOutlineEye className="inline-block text-base" />
        {formatCount(views, 'view', 'views')}
      </span>
      <span className="mx-2">━</span>
      <span className="inline-flex items-center gap-1">
        <HiOutlineThumbUp className="inline-block text-base" />
        {formatCount(likes, 'like', 'likes')}
      </span>
    </>
  );
};

const LikeButton: React.FC = () => {
  const { setLikes, type, id } = useViewsAndLikes();
  const { updateLike } = useMeta();

  const handleLike = async () => {
    const likeKey = `${type}-${id}-likes`;
    const currentLikes = parseInt(localStorage.getItem(likeKey) || '0', 10);
    if (currentLikes < 5) {
      const updatedStats = await updateLike(type, id);
      setLikes(updatedStats.likes);
      localStorage.setItem(likeKey, (currentLikes + 1).toString());
    }
  };

  return (
    <button onClick={handleLike} className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 dark:bg-neutral-200 font-medium text-neutral-200 dark:text-neutral-800 transition-all duration-300 hover:w-32 active:bg-neutral-600 dark:active:bg-neutral-400">
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
        I like it!
      </div>
      <div className="absolute right-3.5">
        <HiOutlineThumbUp className="h-5 w-5 transition-transform duration-300 group-active:scale-125 group-active:rotate-12" />
      </div>
    </button>
  );
};

export { ViewsAndLikesProvider, ViewsAndLikesCounters, LikeButton };