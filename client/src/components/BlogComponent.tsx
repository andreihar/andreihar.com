'use client';

import { useState, useEffect } from 'react';
import useMeta from '@/hooks/useMeta';

const StatsComponent: React.FC<{ id: string; }> = ({ id }) => {
  const [stats, setStats] = useState<{ views: number; likes: number; }>({ views: 0, likes: 0 });
  const { getStats, updateView, updateLike } = useMeta();

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats('blog', id);
      setStats(data);
    };
    fetchStats();
  }, [id]);

  const handleView = async () => {
    await updateView('blog', id);
  };

  const handleLike = async () => {
    const updatedStats = await updateLike('blog', id);
    if (updatedStats) {
      setStats(prevStats => ({
        views: prevStats.views,
        likes: prevStats.likes + 1
      }));
    }
  };

  return (
    <div>
      <div>
        <p>Views: {stats.views}</p>
        <p>Likes: {stats.likes}</p>
      </div>
      <button onClick={handleView}>Update View</button>
      <button onClick={handleLike}>Update Like</button>
    </div>
  );
};

export default StatsComponent;