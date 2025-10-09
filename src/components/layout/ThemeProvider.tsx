'use client';

import { useEffect } from 'react';
import { client, queries } from '@/lib/sanity';

type Theme = {
  brand500?: string;
  brand600?: string;
  brand700?: string;
  brand800?: string;
  surfacePrimary?: string;
  surfaceSecondary?: string;
  surfaceInverse?: string;
  contentPrimary?: string;
  contentSecondary?: string;
  contentInverse?: string;
  borderPrimary?: string;
  borderSecondary?: string;
  borderFocus?: string;
};

function applyTheme(theme?: Theme) {
  if (!theme) return;
  const root = document.documentElement;
  const setVar = (name: string, value?: string) => {
    if (value) root.style.setProperty(name, value);
  };

  setVar('--color-brand-500', theme.brand500);
  setVar('--color-brand-600', theme.brand600);
  setVar('--color-brand-700', theme.brand700);
  setVar('--color-brand-800', theme.brand800);

  setVar('--color-surface-primary', theme.surfacePrimary);
  setVar('--color-surface-secondary', theme.surfaceSecondary);
  setVar('--color-surface-inverse', theme.surfaceInverse);

  setVar('--color-content-primary', theme.contentPrimary);
  setVar('--color-content-secondary', theme.contentSecondary);
  setVar('--color-content-inverse', theme.contentInverse);

  setVar('--color-border-primary', theme.borderPrimary);
  setVar('--color-border-secondary', theme.borderSecondary);
  setVar('--color-border-focus', theme.borderFocus);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    client.fetch(queries.siteSettings)
      .then((data) => applyTheme(data?.theme))
      .catch(() => {});
  }, []);

  return children as any;
}


