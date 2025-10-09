'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArticlesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/learn/news');
  }, [router]);
  return null;
}
