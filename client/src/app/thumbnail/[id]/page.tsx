export default function ThumbnailPage({ params }: { params: { id: string; }; }) {
  const { id } = params;
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <img src={thumbnailUrl} alt={`Thumbnail for video ${id}`} width={1280} height={720} />
  );
}