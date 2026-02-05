// Role-Based Access Control (RBAC) Permission System
// Defines permissions for Admin, Study Coordinator, and Read Only users

export type UserRole = 'Admin' | 'Study Coordinator' | 'Read Only';

export interface User {
  id: number;
  role: UserRole;
  assignedStudies?: string[]; // Study numbers the user is assigned to
  assignedLocations?: string[]; // Locations the user has access to
  organizationId?: number;
  organizationName?: string;
}

export interface Study {
  studyNumber: string;
  id: number;
  [key: string]: any;
}

// ===========================
// STUDY PERMISSIONS
// ===========================

export const canViewStudies = (user: User): boolean => {
  // All roles can view studies
  return true;
};

export const canCreateStudy = (user: User): boolean => {
  // Admin and Study Coordinator can create studies
  return user.role === 'Admin' || user.role === 'Study Coordinator';
};

export const canEditStudy = (user: User, study: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator') {
    // Can edit only assigned studies
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false; // Read Only cannot edit
};

export const canDeleteStudy = (user: User, study?: Study): boolean => {
  // Only Admin can delete studies
  return user.role === 'Admin';
};

export const canArchiveStudy = (user: User, study: Study): boolean => {
  // Same as delete permissions
  return canDeleteStudy(user, study);
};

// ===========================
// PARTICIPANT PERMISSIONS
// ===========================

export const canViewParticipants = (user: User): boolean => {
  // All roles can view participants
  return true;
};

export const canCreateParticipant = (user: User): boolean => {
  // Admin and Study Coordinator can create participants
  return user.role === 'Admin' || user.role === 'Study Coordinator';
};

export const canEditParticipant = (user: User, study?: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator' && study) {
    // Can edit participants only for assigned studies
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false;
};

export const canDeleteParticipant = (user: User, study?: Study): boolean => {
  // Only Admin can delete participants
  return user.role === 'Admin';
};

export const canEnrollParticipant = (user: User, study: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator') {
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false;
};

// ===========================
// FUNDING PERMISSIONS
// ===========================

export const canViewFunding = (user: User): boolean => {
  // All roles can view funding data
  return true;
};

export const canCreateFundingReference = (user: User): boolean => {
  // Only Admin can create reference data (Grants, Awards, Funds, etc.)
  return user.role === 'Admin';
};

export const canEditFundingReference = (user: User): boolean => {
  // Only Admin can edit reference data
  return user.role === 'Admin';
};

export const canDeleteFundingReference = (user: User): boolean => {
  // Only Admin can delete reference data
  return user.role === 'Admin';
};

export const canAssignFundingToStudy = (user: User, study: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator') {
    // Can assign funding only to assigned studies
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false;
};

export const canUploadFundingData = (user: User): boolean => {
  // Only Admin can upload bulk funding data
  return user.role === 'Admin';
};

// ===========================
// ORGANIZATION & LOCATION PERMISSIONS
// ===========================

export const canViewOrganizations = (user: User): boolean => {
  // All roles can view organizations and locations
  return true;
};

export const canCreateOrganization = (user: User): boolean => {
  // Only Admin can create organizations
  return user.role === 'Admin';
};

export const canEditOrganization = (user: User): boolean => {
  // Only Admin can edit organizations
  return user.role === 'Admin';
};

export const canDeleteOrganization = (user: User): boolean => {
  // Only Admin can delete organizations
  return user.role === 'Admin';
};

export const canCreateLocation = (user: User): boolean => {
  // Only Admin can create locations
  return user.role === 'Admin';
};

export const canEditLocation = (user: User): boolean => {
  // Only Admin can edit locations
  return user.role === 'Admin';
};

export const canDeleteLocation = (user: User): boolean => {
  // Only Admin can delete locations
  return user.role === 'Admin';
};

// ===========================
// PAYMENT PERMISSIONS
// ===========================

export const canViewPayments = (user: User): boolean => {
  // All roles can view payments
  return true;
};

export const canCreatePaymentRequest = (user: User, study?: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator' && study) {
    // Can create payment requests only for assigned studies
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false;
};

export const canApprovePayment = (user: User): boolean => {
  // Only Admin can approve payments
  return user.role === 'Admin';
};

export const canRejectPayment = (user: User): boolean => {
  // Only Admin can reject payments
  return user.role === 'Admin';
};

export const canProcessPayment = (user: User): boolean => {
  // Only Admin can mark payments as processed
  return user.role === 'Admin';
};

// ===========================
// PAYMENT SCHEDULE PERMISSIONS
// ===========================

export const canViewPaymentSchedule = (user: User): boolean => {
  // All roles can view payment schedules
  return true;
};

export const canEditPaymentSchedule = (user: User, study: Study): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator') {
    return user.assignedStudies?.includes(study.studyNumber) ?? false;
  }
  
  return false;
};

export const canCreateMilestone = (user: User, study: Study): boolean => {
  return canEditPaymentSchedule(user, study);
};

export const canDeleteMilestone = (user: User, study: Study): boolean => {
  return canEditPaymentSchedule(user, study);
};

// ===========================
// SYSTEM SETTINGS PERMISSIONS
// ===========================

export const canAccessSettings = (user: User): boolean => {
  // Only Admin can access system settings
  return user.role === 'Admin';
};

export const canManageUsers = (user: User): boolean => {
  // Only Admin can manage users
  return user.role === 'Admin';
};

export const canManageRoles = (user: User): boolean => {
  // Only Admin can manage roles
  return user.role === 'Admin';
};

// ===========================
// UPLOAD/EXPORT PERMISSIONS
// ===========================

export const canUploadData = (user: User, dataType: 'studies' | 'participants' | 'funding' | 'milestones'): boolean => {
  if (user.role === 'Admin') return true;
  
  if (user.role === 'Study Coordinator') {
    // Study Coordinators can upload participants and milestones for their assigned studies
    return dataType === 'participants' || dataType === 'milestones';
  }
  
  return false;
};

export const canExportData = (user: User): boolean => {
  // Admin and Study Coordinator can export data
  return user.role === 'Admin' || user.role === 'Study Coordinator';
};

// ===========================
// UI HELPER FUNCTIONS
// ===========================

export const getPermissionMessage = (action: string, user: User, context?: string): string => {
  const roleMessages: Record<UserRole, string> = {
    'Admin': 'You have full access to perform this action.',
    'Study Coordinator': context 
      ? `You can only ${action} for studies you are assigned to. ${context}`
      : `You can only ${action} for assigned studies.`,
    'Read Only': `You do not have permission to ${action}. Read Only users can only view data.`
  };
  
  return roleMessages[user.role];
};

export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    'Admin': 'from-[#0051BA] to-[#003A70]', // KU Blue gradient
    'Study Coordinator': 'from-green-600 to-green-700',
    'Read Only': 'from-gray-500 to-gray-600'
  };
  
  return colors[role];
};

export const getRoleBadgeColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    'Admin': 'bg-blue-100 text-blue-800 ring-blue-600/20',
    'Study Coordinator': 'bg-green-100 text-green-800 ring-green-600/20',
    'Read Only': 'bg-gray-100 text-gray-800 ring-gray-600/20'
  };
  
  return colors[role];
};

export const getRoleIcon = (role: UserRole): string => {
  const icons: Record<UserRole, string> = {
    'Admin': '👑', // Crown
    'Study Coordinator': '📋', // Clipboard
    'Read Only': '👁️' // Eye
  };
  
  return icons[role];
};

export const getRoleDescription = (role: UserRole): string => {
  const descriptions: Record<UserRole, string> = {
    'Admin': 'Full system access with all permissions',
    'Study Coordinator': 'Manage assigned studies and participants',
    'Read Only': 'View-only access to all data'
  };
  
  return descriptions[role];
};
