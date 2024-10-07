'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode, CSSProperties } from 'react';

function Anim({ children, className, style, duration = 1, delay = 0, hidden = { opacity: 0, x: 0, y: 0, scale: 1 }, fadeOut = false, ...props }: { children: ReactNode, className?: string, style?: CSSProperties, duration?: number, delay?: number, hidden?: { opacity: number, x?: number, y?: number, scale?: number; }, fadeOut?: boolean; }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (fadeOut) {
      controls.start("fadeOut");
    } else if (inView) {
      controls.start("visible");
    }
  }, [controls, fadeOut, inView]);

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" transition={{ duration, delay }}
      variants={{ visible: { opacity: 1, x: 0, y: 0, scale: 1 }, hidden, fadeOut: { opacity: 0 } }}
      className={className} style={style} {...props}
    >
      {children}
    </motion.div>
  );
}

export default Anim;