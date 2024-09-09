'use client';
import { useEffect, useState } from 'react';
import Anim from '@/components/Anim';

const words = [" Full-Stack Dev", "n AI Scientist", " Programmer"];
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

  return (
    <div className="inline-block">
      <Anim
        key={currentWordIndex}
        duration={fadeDuration}
        hidden={{ opacity: 0 }}
        fadeOut={!visible}
        className="transition-opacity"
      >
        <span style={{ whiteSpace: 'pre' }}>
          {words[currentWordIndex]}
        </span>
      </Anim>
    </div>
  );
};

export default RotatingText;