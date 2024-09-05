'use client';

import React, { useEffect, useState } from 'react';

const TableOfContents = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number; }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h1, h2');
    const newHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: heading.tagName === 'H1' ? 1 : 2,
    }));

    setHeadings(newHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    headingElements.forEach((heading) => observer.observe(heading));
    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <nav>
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${heading.level === 2 ? '4' : ''} ${activeId === heading.id ? 'border-l-4 pl-2 border-primary font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} transition-all duration-300 ease-in-out`}>
            <a href={`#${heading.id}`} className="hover:text-primary">{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;