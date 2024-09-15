import { FaGithub, FaLinkedinIn, FaYoutube, FaEnvelope } from 'react-icons/fa';
import text from '@/data/text.json';

const socialMediaLinks = [
  { href: `mailto:${text.values.email}`, icon: FaEnvelope },
  { href: `https://github.com/${text.values.github}`, icon: FaGithub },
  { href: `https://linkedin.com/in/${text.values.linkedin}`, icon: FaLinkedinIn },
  { href: `https://youtube.com/@${text.values.youtube}`, icon: FaYoutube },
];

export default function Footer() {
  const startingYear = 2024;
  const currentYear = new Date().getFullYear();
  const displayYear = startingYear === currentYear ? `${startingYear}` : `${startingYear} - ${currentYear}`;

  return (
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
      <div className="container pt-9">
        <div className="mb-6 flex justify-center space-x-2">
          {socialMediaLinks.map(({ href, icon: Icon }, index) => (
            <a key={index} href={href} type="button" className="rounded-full bg-transparent p-3 uppercase leading-normal text-surface transition duration-150 ease-in-out hover:text-primary-600 focus:outline-none focus:ring-0 dark:text-white dark:hover:text-primary-400" data-twe-ripple-init>
              <Icon className="text-3xl" />
            </a>
          ))}
        </div>
      </div>
      <div className="w-full p-4 text-center">{text.footer.copyright} {displayYear}</div>
    </footer>
  );
};