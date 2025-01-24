'use client';
import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { TransitionRouter } from 'next-transition-router';

export function Providers({ children }: { children: React.ReactNode; }) {
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const secondLayer = useRef<HTMLDivElement | null>(null);
  const firstLayerControls = useAnimation();
  const secondLayerControls = useAnimation();

  const leaveAnimation = async (next: () => void) => {
    await firstLayerControls.start({
      y: '100%',
      transition: { duration: 0 },
    });
    await secondLayerControls.start({
      y: '100%',
      transition: { duration: 0 },
    });
    await firstLayerControls.start({
      y: 0,
      transition: { duration: 0.4, ease: 'circInOut' },
    });
    await secondLayerControls.start({
      y: 0,
      transition: { duration: 0.2, ease: 'circInOut' },
    });
    next();
  };

  const enterAnimation = async (next: () => void) => {
    await secondLayerControls.start({
      y: '-100%',
      transition: { duration: 0.4, ease: 'circInOut' },
    });
    await firstLayerControls.start({
      y: '-100%',
      transition: { duration: 0.2, ease: 'circInOut' },
    });
    next();
  };

  return (
    <TransitionRouter auto={true} leave={leaveAnimation} enter={enterAnimation}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <motion.div ref={firstLayer} initial={{ y: '100%' }} animate={firstLayerControls} className="fixed inset-0 z-50 translate-y-full bg-primary" />
      <motion.div ref={secondLayer} initial={{ y: '100%' }} animate={secondLayerControls} className="fixed inset-0 z-50 translate-y-full bg-white dark:bg-dark" />
    </TransitionRouter>
  );
}