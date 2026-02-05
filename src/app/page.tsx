'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to studies page by default
    router.push('/studies');
  }, [router]);

  return null;
}
