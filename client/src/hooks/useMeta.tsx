interface Stats {
  views: number;
  likes: number;
}

interface UseMetaReturn {
  getStats: (category: string, name: string) => Promise<Stats>;
  updateView: (category: string, name: string) => Promise<Stats>;
  updateLike: (category: string, name: string) => Promise<Stats>;
}

const useMeta = (): UseMetaReturn => {
  const backendUrl = 'http://127.0.0.1:5000';

  const getStats = async (category: string, name: string): Promise<Stats> => {
    try {
      const response = await fetch(`${backendUrl}/get_stats/${category}/${name}`);
      if (!response.ok) {
        throw new Error('Failed to get stats');
      }
      const data: Stats = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return { views: 0, likes: 0 };
    }
  };

  const updateView = async (category: string, name: string): Promise<Stats> => {
    try {
      const response = await fetch(`${backendUrl}/update_view/${category}/${name}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to update view');
      }
      const updatedStats: Stats = await response.json();
      return updatedStats;
    } catch (err) {
      console.error(err);
      return { views: 0, likes: 0 };
    }
  };

  const updateLike = async (category: string, name: string): Promise<Stats> => {
    try {
      const response = await fetch(`${backendUrl}/update_like/${category}/${name}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to update like');
      }
      const updatedStats: Stats = await response.json();
      return updatedStats;
    } catch (err) {
      console.error(err);
      return { views: 0, likes: 0 };
    }
  };

  return {
    getStats,
    updateView,
    updateLike,
  };
};

export default useMeta;