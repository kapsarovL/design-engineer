# Code Standards

## React 19 Paradigms

- **Refs:** Pass `ref` as a standard prop. `forwardRef` is deprecated and banned for new components.
- **Actions:** Use `useActionState` for form submissions and server mutations.

## Feature-Sliced Design

- The `app/` directory is strictly for routing and layouts.
- Domain logic lives in `src/features/{feature-name}/` (actions, stores, components).
- Never mix domain logic into global state or routing files.

## TypeScript & Safety

- Strict mode enabled.
- Validate all incoming data (API routes, Server Actions, form inputs) via Zod before processing.
- Explicitly return `{ success, error }` objects from Server Actions.
