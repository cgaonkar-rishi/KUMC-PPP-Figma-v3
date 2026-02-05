'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../utils/permissions';
import { toast } from 'sonner@2.0.3';

interface AppContextType {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  handleRoleChange: (newRole: UserRole) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Admin');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentUserRole(newRole);
    toast.success(`Role changed to ${newRole}`, {
      description: `You now have ${newRole === 'Admin' ? 'full system access' : newRole === 'Study Coordinator' ? 'access to assigned studies' : 'view-only access'}.`,
      duration: 3000,
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        handleRoleChange,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
