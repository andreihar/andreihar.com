import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ur', 'en'],
  defaultLocale: 'ur',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/project': { ur: '/project', en: '/project' },
    '/project/[id]': { ur: '/project/[id]', en: '/project/[id]' },
    '/blog': { ur: '/blog', en: '/blog' },
    '/blog/[id]': { ur: '/blog/[id]', en: '/blog/[id]' },
    '/about': { ur: '/ke-baare-mein', en: '/about' },
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);