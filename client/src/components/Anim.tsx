'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode, CSSProperties } from 'react';

function Anim({ children, className, style, duration = 0.5, delay = 0, hidden = {}, fadeOut = false, ...props }: { children: ReactNode, className?: string, style?: CSSProperties, duration?: number, delay?: number, hidden?: { opacity?: number, x?: number, y?: number, scale?: number; }, fadeOut?: boolean; }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (fadeOut) {
      controls.start("fadeOut");
    } else if (inView) {
      controls.start("visible");
    }
  }, [controls, fadeOut, inView]);

  const isRtl = typeof window !== 'undefined' && document.documentElement.dir === 'rtl';
  const defaultVals = { opacity: 0, x: 0, y: 20, scale: 1 };
  const adjusted = {
    ...defaultVals, ...hidden,
    x: isRtl ? -(hidden.x ?? defaultVals.x) : hidden.x ?? defaultVals.x,
  };

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" transition={{ duration, delay }}
      variants={{ visible: { opacity: 1, x: 0, y: 0, scale: 1 }, hidden: adjusted, fadeOut: { opacity: 0 } }}
      className={className} style={style} {...props}
    >
      {children}
    </motion.div>
  );
}

export default Anim;