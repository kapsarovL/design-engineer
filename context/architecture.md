# Architecture Decisions

## Monorepo Setup

- Code is divided between standalone packages (`@prismaflux/design-system`) and applications (`apps/web`) to enforce decoupling.
- Changesets is used for versioning and publishing the UI package.

## State Management & Data Flow

- **Server State:** Handled natively by Next.js Server Components and React 19 Server Actions (`useActionState`).
- **Client State:** Zustand used strictly for transient, complex client-side workflows (e.g., multi-step forms).
- **URL State:** Prefer URL Search Params for shareable, persistent UI state over global stores.

## Database & ORM

- Drizzle ORM acts as the single source of truth for the database schema.
- Drizzle-Zod is used to automatically derive validation schemas from Postgres tables, ensuring frontend validation and database constraints never drift.
