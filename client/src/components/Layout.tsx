import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <section className={`max-w-[1100px] px-4 mx-auto my-16 transition-colors ${className || ''}`}>
      {children}
    </section>
  );
}