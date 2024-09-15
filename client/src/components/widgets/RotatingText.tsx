'use client';
import { useEffect, useState } from 'react';
import Anim from '@/components/Anim';
import text from '@/data/text.json';

const words = Object.values(text.home.rotating).slice(0, 4);
const intervalTime = 3000;
const fadeDuration = 0.7;

const RotatingText: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisible(true);
      }, fadeDuration * 1000);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const currentWord = words[currentWordIndex];
  const prefix = currentWord.toLowerCase().startsWith("a") ? text.home.rotating.an : text.home.rotating.a;

  return (
    <div className="inline-block">
      <span>{text.home.rotating.im} {prefix}&nbsp;</span>
      <Anim key={currentWordIndex} duration={fadeDuration} hidden={{ opacity: 0 }} fadeOut={!visible} className="transition-opacity inline-block">
        <span>
          {currentWord}
        </span>
      </Anim>
    </div>
  );
};

export default RotatingText;