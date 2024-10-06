'use client';
import Giscus, { Repo, Theme } from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-8">
      <Giscus
        key={resolvedTheme}
        repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as Repo) || ''}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
        category='General'
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ''}
        mapping='pathname'
        reactionsEnabled='0'
        emitMetadata='0'
        inputPosition="top"
        theme={resolvedTheme as Theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}