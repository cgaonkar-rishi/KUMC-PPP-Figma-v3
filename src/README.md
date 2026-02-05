# Participant Payment Portal - KUMC

A Next.js clinical research study management application for participant payments at the University of Kansas Medical Center.

## Features

- **Studies Management**: Comprehensive study tracking with role-based access control
- **Participant Management**: Track participants across multiple studies
- **Payment Processing**: Complete payment request workflow with batch processing
- **Funding & Reference Data**: Manage grants, awards, cost centers, and function codes
- **Organizations & Locations**: Hierarchical organization structure with location management
- **Security & User Management**: Role-based permissions with user and role administration
- **Reports**: Financial reporting, 1099 tax reports, and reconciliation
- **KU Branding**: Full KUMC branding with KU Blue colors (#0051BA)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner
- **Animations**: Motion (formerly Framer Motion)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with metadata
│   ├── template.tsx             # Layout template with providers
│   ├── providers.tsx            # App context providers
│   ├── page.tsx                 # Home page (redirects to /studies)
│   ├── dashboard/               # Dashboard page
│   ├── studies/                 # Studies management
│   ├── participants/            # Participants management
│   ├── funding/                 # Funding & reference data
│   ├── organizations/           # Organizations & locations
│   ├── security/                # Security & user management
│   ├── payments/                # Payment requests
│   ├── payments-wizard/         # Payment request wizard
│   ├── payment-batches/         # Payment batches
│   ├── completed-payments/      # Completed payments
│   ├── reports/[reportType]/    # Dynamic reports pages
│   ├── help/                    # Help & documentation
│   └── sso/                     # SSO login page
├── components/                   # React components
│   ├── Dashboard.tsx
│   ├── Studies.tsx
│   ├── Participants.tsx
│   ├── Funding.tsx
│   ├── OrganizationsLocations.tsx
│   ├── Security.tsx
│   ├── Payments.tsx
│   ├── PaymentRequestWizard.tsx
│   ├── PaymentBatches.tsx
│   ├── CompletedPayments.tsx
│   ├── Reports.tsx
│   ├── Help.tsx
│   ├── SSOLogin.tsx
│   ├── SidebarNext.tsx         # Next.js Sidebar with Link components
│   ├── HeaderNext.tsx          # Next.js Header
│   └── ...
├── utils/                       # Utility functions
│   └── permissions.ts           # RBAC utilities
├── styles/                      # Global styles
│   └── globals.css             # Tailwind + custom styles
└── public/                      # Static assets

```

## Features Overview

### Role-Based Access Control (RBAC)

The application implements a comprehensive RBAC system with three primary roles:

- **Admin**: Full system access
- **Study Coordinator**: Access to assigned studies
- **Reviewer**: View-only access

Role switching is available via the header for demo purposes.

### Studies Management

- Create and manage clinical research studies
- Multi-tab interface: Details, Locations, Participants, Funding, Payment Schedule
- Role-based filtering and permissions
- Support for parent-child study relationships

### Payment Processing

- Wizard-based payment request creation
- Queue-based workflow (Unassigned, My Queue, Completed)
- Batch processing capabilities
- Comprehensive payment tracking and reporting

### Funding System

- 5-tab reference data management:
  - Grants
  - Awards
  - Fund Codes
  - Cost Centers
  - Function Codes
- Smart dropdowns integrated throughout the app
- Full CRUD operations

### Organizations & Locations

- Hierarchical organization structure (University of Kansas as root)
- Location management with address and status tracking
- Parent-child organization relationships

## Development

### Adding New Pages

1. Create a new directory in `/app/` with your route name
2. Add a `page.tsx` file inside
3. Import and use your component
4. Add navigation links to Sidebar and Header as needed

### Styling Guidelines

- Use Tailwind CSS v4 classes
- Follow the existing KU Blue color scheme (#0051BA)
- Maintain consistent table layouts and designs
- Use the established component patterns

## License

Proprietary - University of Kansas Medical Center

## Support

For support and documentation, visit the Help & Documentation section in the application.
