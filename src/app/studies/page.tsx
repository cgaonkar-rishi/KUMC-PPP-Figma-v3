'use client';

import { Studies } from '../../components/Studies';
import { useAppContext } from '../providers';

export default function StudiesPage() {
  const { currentUserRole } = useAppContext();
  
  return <Studies currentUserRole={currentUserRole} />;
}
