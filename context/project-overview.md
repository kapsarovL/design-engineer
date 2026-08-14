# Project Overview

## Core Mission

Deliver a highly scalable, token-driven web application and consumable design system. The architecture supports rapid feature iteration while maintaining strict visual consistency and performance.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Drizzle ORM
- **Styling:** SCSS Modules (No Tailwind)
- **Validation:** Zod

## Workspace Structure (NPM/Yarn Workspaces)

- `apps/web`: The primary Next.js consumer application.
- `packages/ui`: The standalone, framework-agnostic design system package built with `tsup`.
