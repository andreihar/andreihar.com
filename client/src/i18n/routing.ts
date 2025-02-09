import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/project': { en: '/project', fr: '/projet' },
    '/project/[id]': { en: '/project/[id]', fr: '/projet/[id]' },
    '/blog': { en: '/blog', fr: '/blog' },
    '/blog/[id]': { en: '/blog/[id]', fr: '/blog/[id]' },
    '/about': { en: '/about', fr: '/a-propos' },
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);