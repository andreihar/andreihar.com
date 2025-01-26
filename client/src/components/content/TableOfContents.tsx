'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
};

const TableOfContents = () => {
  const t = useTranslations('BlogPage');
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
            const activeElement = document.querySelector(`#toc-${entry.target.id}`);
            if (activeElement) {
              activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
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
          <li id={`toc-${heading.id}`} key={heading.id} className={`${activeId === heading.id ? 'border-s-4 ps-2 border-primary font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} transition-all duration-300 ease-in-out`}>
            <a href={`#${heading.id}`} className="hover:text-primary">{heading.text}</a>
            {heading.children && (
              <ul className="ms-4">
                {heading.children.map((child) => (
                  <li id={`toc-${child.id}`} key={child.id} className={`${activeId === child.id ? 'border-s-4 ps-2 border-primary font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} transition-all duration-300 ease-in-out`}>
                    <a href={`#${child.id}`} className="hover:text-primary">{child.text}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav>
      <h2 className="text-xl font-bold mb-4">{t('toc')}</h2>
      <div className="lg:max-h-[55vh] text-xl overflow-y-auto">
        {renderHeadings(headings)}
      </div>
    </nav>
  );
};

export default TableOfContents;