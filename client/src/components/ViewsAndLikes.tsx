'use client';

import { useState, useEffect, createContext, useContext, ReactNode, CSSProperties } from 'react';
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

    if (typeof window !== 'undefined') {
      const viewKey = `${type}-${id}-viewed`;
      if (!localStorage.getItem(viewKey)) {
        updateView(type, id);
        localStorage.setItem(viewKey, 'true');
      }
    }
  }, [type, id, getStats, updateView]);

  return (
    <ViewsAndLikesContext.Provider value={{ views, likes, setLikes, type, id }}>
      {children}
    </ViewsAndLikesContext.Provider>
  );
};

const formatCount = (count: number, singular: string, plural: string) => {
  return `${new Intl.NumberFormat().format(count)} ${count === 1 ? singular : plural}`;
};

const ViewsCounter: React.FC = () => {
  const { views } = useViewsAndLikes();
  return formatCount(views, 'view', 'views');
};

const LikesCounter: React.FC = () => {
  const { likes } = useViewsAndLikes();
  return formatCount(likes, 'like', 'likes');
};

const LikeButton: React.FC = () => {
  const { likes, setLikes, type, id } = useViewsAndLikes();
  const { updateLike } = useMeta();
  const [fillPercentage, setFillPercentage] = useState(0);
  const likeKey = `${type}-${id}-likes`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLikes = parseInt(localStorage.getItem(likeKey) || '0', 10);
      setFillPercentage((userLikes / 5) * 100);
    }
  }, [type, id]);

  const handleLike = async () => {
    if (typeof window !== 'undefined') {
      const currentLikes = parseInt(localStorage.getItem(likeKey) || '0', 10);
      if (currentLikes < 5) {
        await updateLike(type, id);
        setLikes(likes + 1);
        localStorage.setItem(likeKey, (currentLikes + 1).toString());
        setFillPercentage(((currentLikes + 1) / 5) * 100);
      }
    }
  };

  const buttonStyle: CSSProperties = {
    '--fill-percentage': `${fillPercentage}%`,
  } as CSSProperties;

  return (
    <button onClick={handleLike} className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 dark:bg-neutral-200 font-medium text-neutral-200 dark:text-neutral-800 transition-all duration-300 hover:w-32 active:bg-neutral-600 dark:active:bg-neutral-400" style={buttonStyle}>
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 z-10">
        I like it!
      </div>
      <div className="absolute right-3.5 z-10">
        <HiOutlineThumbUp className="h-5 w-5 transition-transform duration-300 group-active:scale-125 group-active:rotate-12" />
      </div>
      <div className="absolute inset-0 bg-primary transition-all duration-300 bottom-0 pointer-events-none z-0" style={{ height: 'var(--fill-percentage)' }}></div>
    </button>
  );
};

export { ViewsAndLikesProvider, ViewsCounter, LikesCounter, LikeButton };