'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, ReactNode } from 'react';

function Anim({ children, className, duration = 1, delay = 0, hidden = { opacity: 0, x: 0, y: 0, scale: 1 }, fadeOut = false, ...props }: { children: ReactNode, className?: string, duration?: number, delay?: number, hidden?: { opacity: number, x?: number, y?: number, scale?: number; }, fadeOut?: boolean; }) {
  const controls = useAnimation();

  useEffect(() => {
    if (fadeOut) {
      controls.start("fadeOut");
    } else {
      controls.start("visible");
    }
  }, [controls, fadeOut]);

  return (
    <motion.div
      animate={controls}
      initial="hidden"
      transition={{ duration, delay }}
      variants={{
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
        hidden,
        fadeOut: { opacity: 0 }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Anim;