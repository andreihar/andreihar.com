'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className='relative w-16 h-8 flex items-center bg-gray-300 cursor-pointer rounded-full p-1'>
        <div className='absolute w-6 h-6 rounded-full bg-gray-400 shadow-md'></div>
      </div>
    );
  }

  return (
    <button onClick={() => {
      console.log(`Current theme: ${resolvedTheme}`);
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      console.log(`New theme: ${newTheme}`);
      setTheme(newTheme);
    }} aria-label="Toggle Theme"
      className='relative w-16 h-8 flex items-center dark:bg-gray-500 bg-primary-500 cursor-pointer rounded-full p-1'
    >
      <div className={`absolute w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${resolvedTheme === 'dark' ? 'translate-x-8 bg-gray-900' : 'bg-white'}`}
      ></div>
      {resolvedTheme === 'dark' ? (
        <FaMoon className='text-white absolute left-2' size={18} />
      ) : (
        <FaSun className='text-white absolute right-2' size={18} />
      )}
    </button>
  );
}