// Study Status Reference Data
// This is the single source of truth for study statuses across the application

export const STUDY_STATUSES = {
  ACTIVE: 'Active',
  STUDY_STARTED: 'Study Started',
  STUDY_COMPLETED: 'Study Completed',
  CANCELLED_WITHDRAWN: 'Cancelled/Withdrawn',
} as const;

export type StudyStatus = typeof STUDY_STATUSES[keyof typeof STUDY_STATUSES];

// Array for dropdowns and filters
export const STUDY_STATUS_OPTIONS: StudyStatus[] = [
  STUDY_STATUSES.ACTIVE,
  STUDY_STATUSES.STUDY_STARTED,
  STUDY_STATUSES.STUDY_COMPLETED,
  STUDY_STATUSES.CANCELLED_WITHDRAWN,
];

// Color mapping for status badges
export const getStudyStatusColor = (status: StudyStatus): string => {
  switch (status) {
    case STUDY_STATUSES.ACTIVE:
      return 'bg-green-100 text-green-800';
    case STUDY_STATUSES.STUDY_STARTED:
      return 'bg-blue-100 text-blue-800';
    case STUDY_STATUSES.STUDY_COMPLETED:
      return 'bg-gray-100 text-gray-800';
    case STUDY_STATUSES.CANCELLED_WITHDRAWN:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Status descriptions for tooltips/help text
export const STUDY_STATUS_DESCRIPTIONS: Record<StudyStatus, string> = {
  [STUDY_STATUSES.ACTIVE]: 'Study is active and ready to begin',
  [STUDY_STATUSES.STUDY_STARTED]: 'Study has started and is in progress',
  [STUDY_STATUSES.STUDY_COMPLETED]: 'Study has been completed',
  [STUDY_STATUSES.CANCELLED_WITHDRAWN]: 'Study has been cancelled or withdrawn',
};