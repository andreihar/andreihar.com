'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Anim from '@/components/Anim';

const intervalTime = 3000;
const fadeDuration = 0.7;

const RotatingText: React.FC = () => {
  const t = useTranslations('Home');
  const words = Array.from({ length: 100 }, (_, i) => i + 1).map(i => t.has(`rotating.${i}`) ? t(`rotating.${i}`) : null).filter((word): word is string => word !== null);
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
  }, [words.length]);

  return (
    <div className="inline-block">
      {t.rich('rotating.sentence', {
        c: (chunks) => <Anim key={currentWordIndex} duration={fadeDuration} hidden={{ opacity: 0 }} fadeOut={!visible} className="transition-opacity inline-block">{chunks}</Anim>, prefix: /^[aeiou]/i.test(words[currentWordIndex]), word: words[currentWordIndex]
      })}
    </div>
  );
};

export default RotatingText;