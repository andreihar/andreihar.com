'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { FaGithub, FaLinkedinIn, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Button from '@/components/Button';

export default function Contact() {
  const t_values = useTranslations('Values');
  const t = useTranslations('Contact');

  const socialMediaLinks = [
    { href: `mailto:${t_values('email')}`, icon: FaEnvelope, name: 'Email' },
    { href: `https://github.com/${t_values('github')}`, icon: FaGithub, name: 'GitHub' },
    { href: `https://linkedin.com/in/${t_values('linkedin')}`, icon: FaLinkedinIn, name: 'LinkedIn' },
    { href: `https://youtube.com/@${t_values('youtube')}`, icon: FaYoutube, name: 'YouTube' },
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '', newsletter: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name) newErrors.name = t('form.require', { value: t('form.name') });
    if (!formData.email) newErrors.email = t('form.require', { value: t('form.email') });
    if (!formData.message) newErrors.message = t('form.require', { value: t('form.message') });
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID || '';
      const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID || '';
      const userID = process.env.NEXT_PUBLIC_USER_ID || '';

      emailjs.sendForm(serviceID, templateID, e.currentTarget, userID)
        .then(() => {
          window.alert(t('form.success'));
        }, (error) => {
          console.log(t('form.error'), error.text);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
            <a href={`mailto:${t_values('email')}`} className="me-4 mb-4 inline-flex text-2xl items-center gap-1 align-middle relative underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
              <FaEnvelope className="inline-block align-middle text-primary" />
              <span className="align-middle ms-2 text-lg">{t_values('email')}</span>
            </a>
            <p className="mb-4 inline-flex text-2xl items-center gap-1 align-middle">
              <FaMapMarkerAlt className="inline-block align-middle text-primary" />
              <span className="align-middle ms-2 text-lg">{t_values('location')}</span>
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
        <form onSubmit={handleSubmit} className="md:col-span-2 p-10 pb-0">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">{t('form.name')}</label>
              <input id="name" name="name" type="text" placeholder={t('form.placeholder')} value={formData.name} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">{t('form.email')}</label>
              <input id="email" name="email" type="email" placeholder="********@*****.**" value={formData.email} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">{t('form.message')}</label>
              <textarea id="message" name="message" value={formData.message} rows={10} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
            </div>
            <div className="flex justify-between w-full px-3 mb-6">
              <Button text={t('form.send')} type="submit" size="text-lg px-8 py-4" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}