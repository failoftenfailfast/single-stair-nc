'use client';

import { useEffect } from 'react';
import { client, queries } from '@/lib/sanity';

type Theme = {
  brand500?: string | { hex?: string };
  brand600?: string | { hex?: string };
  brand700?: string | { hex?: string };
  brand800?: string | { hex?: string };
  surfacePrimary?: string | { hex?: string };
  surfaceSecondary?: string | { hex?: string };
  surfaceInverse?: string | { hex?: string };
  contentPrimary?: string | { hex?: string };
  contentSecondary?: string | { hex?: string };
  contentInverse?: string | { hex?: string };
  borderPrimary?: string | { hex?: string };
  borderSecondary?: string | { hex?: string };
  borderFocus?: string | { hex?: string };
};

function applyTheme(theme?: Theme) {
  if (!theme) return;
  const root = document.documentElement;
  const setVar = (name: string, value?: string) => {
    if (value) root.style.setProperty(name, value);
  };

  const toHex = (v?: string | { hex?: string }) => {
    if (!v) return undefined;
    return typeof v === 'string' ? v : v.hex;
  };

  setVar('--color-brand-500', toHex(theme.brand500));
  setVar('--color-brand-600', toHex(theme.brand600));
  setVar('--color-brand-700', toHex(theme.brand700));
  setVar('--color-brand-800', toHex(theme.brand800));

  setVar('--color-surface-primary', toHex(theme.surfacePrimary));
  setVar('--color-surface-secondary', toHex(theme.surfaceSecondary));
  setVar('--color-surface-inverse', toHex(theme.surfaceInverse));

  setVar('--color-content-primary', toHex(theme.contentPrimary));
  setVar('--color-content-secondary', toHex(theme.contentSecondary));
  setVar('--color-content-inverse', toHex(theme.contentInverse));

  setVar('--color-border-primary', toHex(theme.borderPrimary));
  setVar('--color-border-secondary', toHex(theme.borderSecondary));
  setVar('--color-border-focus', toHex(theme.borderFocus));
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    client.fetch(queries.siteSettings)
      .then((data) => applyTheme(data?.theme))
      .catch(() => {});
  }, []);

  return children as any;
}


