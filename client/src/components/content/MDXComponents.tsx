import { Children, cloneElement, isValidElement } from 'react';
import StorageImg from '@/components/widgets/StorageImg';
import YouTubeEmbed from '@/components/widgets/YouTubeEmbed';

const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '');
};

const MDXComponents = {
  StorageImg,
  YouTubeEmbed,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <h1 id={generateId(props.children as string)} className="text-3xl md:text-4xl font-bold py-3" {...props} />;
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <h2 id={generateId(props.children as string)} className="text-2xl md:text-3xl font-semibold py-2" {...props} />;
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-medium py-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-lg leading-loose mb-8" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary font-bold inline-block relative underline-slide transition-colors duration-300 ease-in-out" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }} {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 ps-4 italic mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-none mb-8 ms-12" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li>
      {Children.map(props.children, child =>
        isValidElement(child) ? cloneElement(child as React.ReactElement<any>, { className: `${child.props.className || ''} text-lg leading-loose mb-4` }) : child
      )}
    </li>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-base" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4" {...props} />
  ),
};

export default MDXComponents;