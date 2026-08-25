# Project Overview

## Core Mission

Deliver a highly scalable, token-driven web application and consumable design system. The architecture supports rapid feature iteration while maintaining strict visual consistency and performance.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** SCSS Modules + global design tokens (`styles/tokens.scss`). **No Tailwind.**
- **Client state:** Zustand for transient, complex client-side workflows (e.g., multi-step onboarding).
- **Docs site:** Astro 7 package (`docs/`) that imports the live component source and tokens.
- **Tooling:** pnpm workspaces, Biome (lint/format), Vitest (tests), Vite (test runner).

### Planned infrastructure (not yet wired)

- **Database / ORM / Validation:** PostgreSQL (Neon), Drizzle ORM, and Zod are the *intended* stack but are **not yet installed or wired** — no DB client, schema, or migration exists in the repo. Treat as planned, not delivered.

## Workspace Structure (single app — no monorepo)

- `app/` — Next.js App Router entry (pages, layouts).
- `components/primitives/` — the design system: one folder per primitive (`button/`, `dialog/`, …), each with implementation (`.tsx`), styles (`.module.scss`), a local `index.ts` barrel, and `README.md`. All primitives are re-exported through `components/primitives/index.ts`.
- `components/features/`, `components/layout/`, `components/code-panel/`, `components/component-docs/` — app-level composition and documentation UI.
- `styles/` — global SCSS (`tokens.scss`, `premium.scss`, `globals.scss`, `resets.scss`).
- `docs/` — standalone Astro documentation site (a pnpm workspace member) that consumes `components/` and `styles/tokens.scss` live.
- `public/` — static assets (incl. the SVG icon sprite).

The design system is colocated in the Next.js app and is **not** published as a separate npm package. There is no `packages/ui` / `apps/web` split, no `tsup` build step, and no Changesets versioning.
