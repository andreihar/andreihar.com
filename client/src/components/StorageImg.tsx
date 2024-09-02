import Image from 'next/image';

type StorageImgType = {
  id: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  aspect?: {
    width: number;
    height: number;
  };
} & React.ComponentPropsWithoutRef<'figure'>;

export default function StorageImg({ id, height, width, alt, title, className = '', style, aspect, ...rest }: StorageImgType) {
  width = +width;
  height = +height;
  const cloudName = 'theodorusclarence';
  const aspectRatio = aspect ? aspect.height / aspect.width : height / width;
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const transformations = aspect ? `,c_fill,ar_${aspect.width}:${aspect.height},w_${width}` : '';
  const RESIZE_MAX_WIDTH = 1000;
  const resizedToMaxWidth = width >= RESIZE_MAX_WIDTH;

  return (
    <figure className={`${className} overflow-hidden rounded shadow dark:shadow-none ${width <= 800 ? 'mx-auto w-full' : ''}`} style={{ maxWidth: width <= 800 ? width : undefined, ...style }} {...rest}>
      <div style={{ position: 'relative', height: 0, paddingTop: `${aspectRatio * 100}%` }} className='img-blur'>
        <style jsx>{`
          .img-blur::before {
            content: '';
            position: absolute;
            inset: 0;
            filter: blur(20px);
            z-index: 0;
            background-image: url(${`${baseUrl}/e_blur:1000,q_1${transformations}/${id}`});
            background-position: center center;
            background-size: 100%;
          }
        `}</style>
        <div className='absolute left-0 top-0'>
          <Image src={`${baseUrl}${transformations}/${id}`} alt={alt} title={title || alt}
            width={resizedToMaxWidth ? Math.min(width, RESIZE_MAX_WIDTH) : width}
            height={resizedToMaxWidth ? (RESIZE_MAX_WIDTH * height) / width : height}
          />
        </div>
      </div>
      {title && <figcaption className="text-center mt-2">{title}</figcaption>}
    </figure>
  );
}