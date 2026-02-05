'use client';

import { useRouter } from 'next/navigation';
import { SSOLogin } from '../../components/SSOLogin';

export default function SSOPage() {
  const router = useRouter();
  
  return <SSOLogin onReturnToApp={() => router.push('/studies')} />;
}
