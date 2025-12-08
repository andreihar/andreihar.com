'use client';
import Button from '@/components/Button';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('Contact');

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
  );
}