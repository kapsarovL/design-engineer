# Architecture Decisions

## Project Structure

- Single Next.js application at the repo root. The design system lives in `components/primitives/` as colocated, framework-coupled components — it is **not** a separately published package.
- A pnpm workspace contains only the `docs` site (`docs/`), which imports the live component source and `styles/tokens.scss` to render documentation.
- **No monorepo** (`packages/ui` / `apps/web`), **no** `tsup` build, and **no** Changesets versioning.

## State Management & Data Flow

- **Server State:** Handled natively by Next.js Server Components and React 19 Server Actions (`useActionState`).
- **Client State:** Zustand used strictly for transient, complex client-side workflows (e.g., multi-step forms).
- **URL State:** Prefer URL Search Params for shareable, persistent UI state over global stores.

## Styling

- SCSS Modules per component + global design tokens in `styles/tokens.scss`. **No Tailwind.**
- Tokens are CSS custom properties (light theme, plus `.dark` and `prefers-color-scheme` overrides).

## Database & ORM (PLANNED — not yet implemented)

- **Intended:** Drizzle ORM as the single source of truth for the database schema, with drizzle-zod deriving validation schemas from Postgres tables so frontend validation and DB constraints never drift.
- **Current status:** not installed or wired. No DB client, schema, or migration exists in the repo yet.
