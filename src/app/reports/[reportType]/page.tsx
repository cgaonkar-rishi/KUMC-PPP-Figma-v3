'use client';

import { Reports } from '../../../components/Reports';
import { useParams } from 'next/navigation';

export default function ReportsPage() {
  const params = useParams();
  const reportType = params.reportType as string;
  
  return <Reports reportType={`reports-${reportType}`} />;
}
