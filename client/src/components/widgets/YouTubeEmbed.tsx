'use client';
import { useLocale } from "next-intl";

const YouTubeEmbed: React.FC<{ video: string; }> = ({ video }) => {
  const locale = useLocale();

  return (
    <div className="relative pt-[56.25%] mb-8">
      <iframe
        src={`https://www.youtube.com/embed/${video}?showinfo=0&rel=0&hl=${locale}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute top-0 start-0 w-full h-full"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;