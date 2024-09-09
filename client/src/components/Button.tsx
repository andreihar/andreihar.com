import Link from 'next/link';

interface ButtonProps {
  href?: string;
  text: string;
  type?: 'a' | 'link' | 'button';
  onClick?: () => void;
  size?: string;
  mobileSize?: string;
}

const Button: React.FC<ButtonProps> = ({ href, text, type = 'button', onClick, size = 'text-base px-6 py-3', mobileSize = 'text-sm px-4 py-2' }) => {
  const className = `button transition-all duration-300 ease-in-out inline-block relative font-bold leading-none z-10 overflow-hidden duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] text-transparent border-2 border-transparent hover:text-white ${size}`;

  switch (type) {
    case 'a':
      return <a className={className} href={href}>{text}</a>;
    case 'link':
      return <Link className={className} href={href || ''}>{text}</Link>;
    case 'button':
    default:
      return <button className={className} onClick={onClick}>{text}</button>;
  }
};

export default Button;