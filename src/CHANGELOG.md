# Changelog - Participant Payment Portal

All notable changes to the Participant Payment Portal project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-02-02

### Major Release - KUMC Branded Clinical Research Study Management Application

This major version represents a complete, production-ready clinical research study management application with comprehensive branding alignment to University of Kansas Medical Center (KUMC) standards.

### Added

#### Core Features
- **Dashboard** - Comprehensive overview with KPI panels and data grids
  - Payment request statistics and trends
  - Study enrollment metrics
  - Participant activity monitoring
  - Quick action cards for common tasks

- **Studies Management** - Complete study lifecycle management
  - Study creation and editing
  - Protocol management
  - Enrollment tracking
  - Study status workflows

- **Participants Management** - Full participant data management
  - Participant registration and verification
  - Participant code system (replaced Participant ID)
  - Demographics tracking (DOB, Address columns added)
  - Enrollment status tracking
  - Removed Registration Date column per requirements

- **Payment Request System** - Advanced queue-based approval workflow
  - Five-tab queue system:
    - Pending Review
    - Approved
    - Rejected
    - Completed
    - All Requests
  - Payment request wizard with step-by-step creation
  - Receipt upload functionality with drag-and-drop
  - Mileage calculator for drive/mileage reimbursements
  - Automatic tax withholding functionality
  - Workflow history tracking with comprehensive audit trail
  - Payment request status management

- **Funding Management** - Financial resource tracking
  - Grant and funding source management
  - Budget allocation tracking
  - Funding source assignment to studies

- **Organizations & Locations** - Facility management
  - Organization hierarchy management
  - Location tracking and assignment
  - Department and unit organization

- **Reports & Analytics** - Data insights and reporting
  - Custom report generation
  - Payment analytics
  - Study performance metrics

- **Security & Permissions** - Role-based access control
  - User role management
  - Permission assignment
  - Access control lists

#### Advanced Features
- **Participant Verification Modal** - Identity verification workflow
  - Photo ID verification
  - Document upload
  - Verification status tracking

- **Address Verification** - Address validation and standardization
  - USPS address validation integration (mock)
  - Address standardization
  - Multiple address support

- **Mileage Calculator** - Automated mileage reimbursement calculation
  - Distance calculation
  - Rate configuration
  - Reimbursement amount calculation

- **Tax Withholding** - Automatic tax calculation
  - Configurable tax rates
  - Tax withholding reports
  - Compliance tracking

- **Workflow History** - Comprehensive audit trail
  - All payment request state changes
  - User action tracking
  - Timestamp recording
  - Detailed audit modals

#### UI/UX Components
- **Responsive Navigation**
  - Collapsible sidebar with smooth transitions
  - KUMC branded header with logo
  - Breadcrumb navigation
  - Active page highlighting

- **Header Components**
  - User profile icon with "Welcome Back" greeting
  - Static "Participant Payment Portal" branding (removed dynamic page titles)
  - Notification dropdown with unread count badges
  - Settings dropdown menu
  - User profile dropdown
  - Help and support access

- **Data Tables**
  - Sortable columns
  - Filterable data
  - Pagination
  - Row selection
  - Bulk actions
  - Export functionality

- **Modal Dialogs**
  - Participant verification
  - Address verification
  - Confirmation dialogs
  - Workflow history viewer

- **Form Components**
  - Multi-step wizards
  - File upload with drag-and-drop
  - Date pickers
  - Select dropdowns
  - Validation and error handling

#### Branding & Design
- **KUMC Brand Implementation**
  - KU Blue primary color (#0051BA)
  - KU Blue Dark secondary color (#003f7f)
  - Removed all gradients in favor of solid colors
  - Standardized typography across all components
  - Consistent button styles and border radius
  - White logo background
  - Professional, clinical aesthetic

- **Accessibility Features**
  - WCAG 2.1 AA compliance
  - Keyboard navigation support
  - Screen reader optimization
  - Focus indicators
  - ARIA labels and roles
  - Color contrast compliance

#### Technical Implementation
- **React Components** - Modern component architecture
  - Functional components with hooks
  - TypeScript interfaces
  - Reusable UI components
  - Component composition patterns

- **State Management**
  - Local state with useState
  - Effect hooks for side effects
  - Ref management for DOM access
  - Event handling and propagation

- **Styling System**
  - Tailwind CSS v4
  - Custom CSS variables for brand colors
  - Responsive design patterns
  - Mobile-first approach

- **Libraries & Dependencies**
  - lucide-react for icons
  - sonner@2.0.3 for toast notifications
  - react-hook-form@7.55.0 for form handling
  - date-fns for date manipulation
  - recharts for data visualization

### Changed
- **Participants Table** - Updated column structure
  - "Participant ID" renamed to "Participant Code"
  - Removed "Registration Date" column
  - Added "DOB" column
  - Added "Address" column

- **Header Design** - Simplified and branded
  - Removed dynamic page icon and title
  - Added static "Participant Payment Portal" label
  - Added user profile icon next to "Welcome Back"
  - Improved visual hierarchy

- **Toast Notifications** - Standardized implementation
  - All sonner imports now use versioned format `'sonner@2.0.3'`
  - Resolved "Failed to fetch" errors
  - Consistent toast styling across components

### Fixed
- **User Profile Icon** - Now displays correctly in header
- **Toast Import Errors** - Standardized all sonner@2.0.3 imports across:
  - Dashboard.tsx
  - Studies.tsx
  - Participants.tsx
  - EnrollmentPanel.tsx
- **Header Display** - Removed redundant icon and dynamic title

### Documentation
- KU_BRANDING_GUIDE.md - Comprehensive branding guidelines
- KU_BRANDING_IMPLEMENTATION.md - Implementation details
- PARTICIPANT_VERIFICATION_FEATURE.md - Feature documentation
- ACCESSIBILITY_FIXES_PHASE1.md - Accessibility compliance notes
- WCAG_ACCESSIBILITY_AUDIT.md - Accessibility audit results

### Navigation Structure
```
├── Dashboard
├── Studies
├── Participants
├── Payments (Payment Requests)
├── Reports
└── Settings (Dropdown)
    ├── Organizations & Locations
    ├── Funding and Grants
    └── Roles and Permissions
```

### Data Architecture
- Studies → Participants (one-to-many)
- Studies → Funding Sources (many-to-many)
- Participants → Payment Requests (one-to-many)
- Payment Requests → Workflow History (one-to-many)
- Organizations → Locations (one-to-many)
- Users → Roles → Permissions (many-to-many)

---

## [1.0.0] - Previous Version
- Initial implementation of hospital admin template conversion
- Basic navigation and routing
- Initial component structure

---

## Future Roadmap

### Planned Features
- Backend integration with Supabase
- Real-time collaboration features
- Advanced reporting and analytics
- Document management system
- Email notification system
- Calendar and scheduling integration
- Mobile application
- API integration for external systems
- Batch payment processing
- Advanced search and filtering
- Data export in multiple formats
- Custom dashboard configuration

---

**Note**: This application is designed for clinical research study management and participant payment processing. It prioritizes data security, audit compliance, and HIPAA considerations for protected health information (PHI).
