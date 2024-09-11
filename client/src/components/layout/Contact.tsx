'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaGithub, FaLinkedinIn, FaYoutube, FaEnvelope } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Button from '@/components/Button';

const socialMediaLinks = [
  { href: 'mailto:andreihar@mail.com', icon: FaEnvelope },
  { href: 'https://github.com/andreihar', icon: FaGithub },
  { href: 'https://linkedin.com/in/andreihar', icon: FaLinkedinIn },
  { href: 'https://youtube.com/@aharba', icon: FaYoutube },
];

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', newsletter: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.message) newErrors.message = 'Message is required.';
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
          window.alert('Message successfully sent!');
        }, (error) => {
          console.log('Failed to send message.', error.text);
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
    <div className="relative">
      <div className="absolute inset-0 bg-gray-900 md:w-1/3"></div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 mx-auto max-w-[1100px]">
        <div className="bg-gray-900 md:col-span-1 p-10 pb-0 text-white">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">Contact</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-primary">Touch</span>
          </h3>
          <p className="mt-4 leading-7 text-gray-200">
            Feel free to reach out for project inquiries, collaboration opportunities, or any questions you may have. I’m always open to new connections in tech and computer science. Drop me an email or connect with me on social media!
          </p>
          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4">Email</h4>
            <a href="mailto:andreihar@mail.com" className="mb-4 inline-flex text-2xl items-center gap-1 align-middle relative underline-slide transition-colors duration-300 ease-in-out hover:text-primary">
              <FaEnvelope className="inline-block align-middle text-primary" />
              <span className="align-middle ml-2 text-lg">andreihar@mail.com</span>
            </a>
            <h4 className="text-xl font-bold mb-4">Socials</h4>
            <div className="flex space-x-4 mb-6">
              {socialMediaLinks.slice(1).map(({ href, icon: Icon }, index) => (
                <a key={index} href={href} className="text-primary hover:text-white transition duration-150 ease-in-out">
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="md:col-span-2 p-10 pb-0 bg-white">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" value={formData.name} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="********@*****.**" value={formData.email} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">Message</label>
              <textarea id="message" name="message" value={formData.message} rows={10} onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} />
              {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
            </div>
            <div className="flex justify-between w-full px-3 mb-6">
              <Button text="Send Message" type="submit" size="text-lg px-8 py-4" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}