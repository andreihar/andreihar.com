import { Link } from '@/i18n/routing';

interface ButtonProps {
  href?: string;
  text: string;
  type?: 'a' | 'link' | 'button' | 'submit';
  onClick?: () => void;
  size?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ href, text, type = 'button', onClick, size = 'text-base px-6 py-3', target, rel }) => {
  const className = `button font-jost transition-all duration-300 ease-in-out inline-block relative font-bold capitalize leading-none bg-clip-text z-10 overflow-hidden duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] text-transparent border-2 border-transparent hover:text-white ${size}`;

  switch (type) {
    case 'a':
      return <a className={className} href={href} target={target} rel={rel}>{text}</a>;
    case 'link':
      return <Link className={className} href={href as any || ''}>{text}</Link>;
    case 'submit':
      return <button type="submit" className={className} onClick={onClick}>{text}</button>;
    case 'button':
    default:
      return <button type="button" className={className} onClick={onClick}>{text}</button>;
  }
};

export default Button;