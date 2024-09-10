import Image from 'next/image';

type StorageImgType = {
  id: string;
  blog?: boolean;
  header?: boolean;
  alt: string;
  title?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'figure'>;

export const generateStorageImgUrl = ({ id, blog, header }: { id: string; blog?: boolean; header?: boolean; }): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  let imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const width = header ? 1000 : 875;
  imageUrl += `/w_${width}/c_fill${blog ? '/blog' : '/project'}/${id}`;
  return imageUrl;
};

export default function StorageImg({ id, blog, header, alt, title, className = '', style, ...rest }: StorageImgType) {
  const imageUrl = generateStorageImgUrl({ id, blog, header });

  if (header) return imageUrl;

  return (
    <figure className={`${className} mx-auto max-w-full mb-8 overflow-hidden rounded`} style={{ maxWidth: 875 || 'auto', ...style }} {...rest}>
      <Image src={imageUrl} alt={alt} title={title || alt} width={875} height={0} className="shadow-md dark:shadow-none rounded" />
      {title && <figcaption className="text-center mt-2 text-lg font-bold text-gray-800 dark:text-gray-200">{title}</figcaption>}
    </figure>
  );
}