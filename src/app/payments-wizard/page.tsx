'use client';

import { useRouter } from 'next/navigation';
import { PaymentRequestWizard } from '../../components/PaymentRequestWizard';

export default function PaymentsWizardPage() {
  const router = useRouter();
  
  return <PaymentRequestWizard onBack={() => router.push('/payments')} />;
}
