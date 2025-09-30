# TechFlow Solutions - Corporate Website

## Overview

This is a corporate website for TechFlow Solutions, a technology consulting company. The application is a full-stack web application built with React and Express, featuring a modern UI for showcasing company services, information, and handling customer inquiries. The site includes sections for services, about information, testimonials, and a contact form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **Styling:** Tailwind CSS with shadcn/ui component library
- **Animations:** Framer Motion for smooth transitions and interactions
- **State Management:** TanStack Query (React Query) for server state
- **Form Handling:** React Hook Form with Zod validation

**Design Decisions:**
- Uses shadcn/ui "new-york" style variant for consistent, modern UI components
- Custom CSS variables for theming, including gradient colors derived from company branding
- Component-based architecture with reusable UI components in `client/src/components/ui/`
- Path aliases configured for cleaner imports (`@/` for client src, `@shared/` for shared code)

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM
- **Schema Validation:** Zod (via drizzle-zod)
- **Session Storage:** connect-pg-simple (PostgreSQL session store)

**API Structure:**
- RESTful API endpoints under `/api/` prefix
- Company content management endpoints (`/api/company-content`)
- Inquiry submission endpoint (`/api/inquiries`)
- Shared schema definitions between client and server via `shared/schema.ts`

**Design Decisions:**
- Middleware-based request/response logging for API routes
- JSON body parsing with raw body capture for webhook support
- In-memory storage implementation (`MemStorage`) with interface-based design for easy database migration
- Pre-populated default company content on initialization

### Data Storage

**Current Implementation:**
- In-memory storage using Map data structures
- Three main data models: Users, CompanyContent, Inquiries
- Default content initialization for company sections (about, contact, etc.)

**Database Schema (Drizzle ORM):**
- PostgreSQL dialect configured via Neon Database serverless driver
- Tables defined: `users`, `company_content`, `inquiries`
- UUID primary keys with automatic generation
- JSON column type for flexible content storage in `company_content`
- Timestamp tracking for content updates and inquiry submissions

**Migration Strategy:**
- Schema defined in `shared/schema.ts` for type safety across stack
- Drizzle Kit configured for schema migrations in `migrations/` directory
- Database URL expected via `DATABASE_URL` environment variable

### Build & Development

**Development Setup:**
- Vite for fast development server and HMR
- TSX for TypeScript execution in development
- Replit-specific plugins for enhanced development experience
- Source maps enabled for debugging

**Production Build:**
- Vite builds client to `dist/public/`
- esbuild bundles server to `dist/index.js`
- ESM module format throughout
- Static file serving in production mode

**Path Resolution:**
- TypeScript path aliases match Vite aliases
- Asset imports via `@assets/` alias for attached files (company logo)
- Bundler module resolution for modern import syntax

## External Dependencies

### Database & Backend Services
- **Neon Database:** Serverless PostgreSQL database provider (via `@neondatabase/serverless`)
- **Drizzle ORM:** Type-safe ORM for PostgreSQL with Zod schema integration
- **connect-pg-simple:** PostgreSQL-backed session store for Express

### UI & Frontend Libraries
- **Radix UI:** Headless accessible UI primitives (extensive component library)
- **shadcn/ui:** Pre-built components using Radix UI and Tailwind CSS
- **TanStack Query:** Async state management and data fetching
- **Framer Motion:** Animation library for page transitions and interactions
- **React Hook Form:** Performant form handling with `@hookform/resolvers` for Zod integration
- **Tailwind CSS:** Utility-first CSS framework with custom configuration
- **cmdk:** Command menu component
- **embla-carousel-react:** Carousel/slider component
- **date-fns:** Date utility library

### Development Tools
- **Vite:** Build tool and dev server
- **TypeScript:** Type safety across the stack
- **Replit Plugins:** Development experience enhancements (cartographer, dev banner, runtime error modal)

### Design System
- Custom gradient colors mapped from company logo (purple, pink, blue, orange, coral)
- CSS custom properties for theming
- Multiple font families: Inter (sans), Georgia (serif), Menlo (mono), plus Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono)