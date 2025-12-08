import ContactForm from '@/components/layout/ContactForm';
import { email, github, linkedin, youtube } from '@/data/values';
import { getLocation } from '@/lib/location';
import { useTranslations } from 'next-intl';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa';

export default async function Contact({ locale }: { locale: string; }) {
  const t = useTranslations('Contact');
  const locationArray = await getLocation(locale);
  const locationString = locationArray.join(', ');

  const socialMediaLinks = [
    { href: `mailto:${email}`, icon: FaEnvelope, name: 'Email' },
    { href: `https://github.com/${github}`, icon: FaGithub, name: 'GitHub' },
    { href: `https://linkedin.com/in/${linkedin}`, icon: FaLinkedinIn, name: 'LinkedIn' },
    { href: `https://youtube.com/@${youtube}`, icon: FaYoutube, name: 'YouTube' },
  ];

  return (
    <div className="relative bg-white">
      <div className="absolute inset-0 bg-gray-900 md:w-1/3"></div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 mx-auto max-w-[1100px]">
        <div className="bg-gray-900 md:col-span-1 p-10 pb-0 text-white">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">{t('title')}</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold capitalize tracking-tight">
            {t.rich('touch', { c: (chunks) => <span className="text-primary">{chunks}</span> })}
          </h3>
          <p className="mt-4 leading-7 text-gray-200">
            {t('desc')}
          </p>
          <div className="mt-8">
            <a href={`mailto:${email}`} className="me-4 mb-4 inline-flex text-2xl items-center gap-1 align-middle relative underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
              <FaEnvelope className="inline-block align-middle text-primary" />
              <span className="align-middle ms-2 text-lg">{email}</span>
            </a>
            <p className="mb-4 inline-flex text-2xl items-center gap-1 align-middle">
              <FaMapMarkerAlt className="inline-block align-middle text-primary" />
              <span className="align-middle ms-2 text-lg">{locationString}</span>
            </p>
            <h4 className="text-xl font-bold my-4">{t('socials')}</h4>
            <div className="flex space-x-4 rtl:space-x-reverse mb-6">
              {socialMediaLinks.slice(1).map(({ href, icon: Icon, name }, index) => (
                <a key={index} href={href} aria-label={name} className="text-primary hover:text-white transition duration-150 ease-in-out">
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}