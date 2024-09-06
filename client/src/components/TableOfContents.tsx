'use client';
import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h1, h2');
    const newHeadings: Heading[] = [];
    let currentH1: Heading | null = null;

    headingElements.forEach((heading) => {
      const newHeading: Heading = {
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName === 'H1' ? 1 : 2,
      };

      if (newHeading.level === 1) {
        currentH1 = newHeading;
        newHeadings.push(newHeading);
      } else if (newHeading.level === 2 && currentH1) {
        if (!currentH1.children) {
          currentH1.children = [];
        }
        currentH1.children.push(newHeading);
      }
    });

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

  const renderHeadings = (headings: Heading[]) => {
    return (
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`${activeId === heading.id ? 'border-l-4 pl-2 border-primary font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} transition-all duration-300 ease-in-out`}>
            <a href={`#${heading.id}`} className="hover:text-primary">{heading.text}</a>
            {heading.children && <ul className="ml-4">{renderHeadings(heading.children)}</ul>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav>
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      {renderHeadings(headings)}
    </nav>
  );
};

export default TableOfContents;