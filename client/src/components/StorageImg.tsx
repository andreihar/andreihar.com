import React from 'react';

type StorageImgType = {
  id: string;
  blog?: boolean;
  header?: boolean;
  height?: string | number;
  width?: string | number;
  alt: string;
  title?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'figure'>;

export default function StorageImg({ id, blog, header, height, width, alt, title, className = '', style, ...rest }: StorageImgType) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  let imageUrl = baseUrl;
  if (width)
    imageUrl += `/w_${width}`;
  if (height)
    imageUrl += `/h_${height}`;
  imageUrl += `/c_fill${blog ? '/blog' : '/project'}/${id}`;

  if (header) {
    return imageUrl;
  }

  return (
    <figure className={`${className} mx-auto max-w-full mb-8 overflow-hidden rounded`} style={{ maxWidth: width || 'auto', ...style }} {...rest}>
      <img src={imageUrl} alt={alt} title={title || alt} width={width} height={height} className="shadow-md dark:shadow-none rounded" />
      {title && <figcaption className="text-center mt-2 text-lg font-bold text-gray-800 dark:text-gray-200">{title}</figcaption>}
    </figure>
  );
}