'use client';

import { usePathname } from 'next/navigation';
import { AppProvider, useAppContext } from './providers';
import { SidebarNext } from '../components/SidebarNext';
import { HeaderNext } from '../components/HeaderNext';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUserRole, handleRoleChange, isSidebarCollapsed, setIsSidebarCollapsed } = useAppContext();

  // Don't show layout for SSO login page
  if (pathname === '/sso') {
    return <>{children}</>;
  }

  // Map pathname to page name for header display
  const getPageFromPathname = (path: string): string => {
    if (path === '/') return 'studies';
    if (path.startsWith('/reports/')) {
      const reportType = path.split('/')[2];
      return `reports-${reportType}`;
    }
    return path.substring(1); // Remove leading slash
  };

  const currentPage = getPageFromPathname(pathname);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col flex-1">
        <HeaderNext 
          currentPage={currentPage}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentUserRole={currentUserRole}
          onRoleChange={handleRoleChange}
        />
        <div className="flex flex-1 overflow-hidden">
          <SidebarNext
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Template({ children }: { children: React.ReactNode}) {
  return (
    <AppProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppProvider>
  );
}