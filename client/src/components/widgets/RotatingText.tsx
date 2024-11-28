'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Anim from '@/components/Anim';

const intervalTime = 3000;
const fadeDuration = 0.7;

const RotatingText: React.FC = () => {
  const t = useTranslations('Home');
  const words = [1, 2, 3, 4].map(key => t(`rotating.${key}`));
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
  const prefix = currentWord.toLowerCase().startsWith("a") ? t('rotating.an') : t('rotating.a');

  return (
    <div className="inline-block">
      <span>{t('rotating.im')} {prefix}&nbsp;</span>
      <Anim key={currentWordIndex} duration={fadeDuration} hidden={{ opacity: 0 }} fadeOut={!visible} className="transition-opacity inline-block">
        <span>
          {currentWord}
        </span>
      </Anim>
    </div>
  );
};

export default RotatingText;