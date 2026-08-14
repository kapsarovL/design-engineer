# UI & Design System Context

## Core Principles

- **Token-Driven:** All colors, spacing, typography, and radii pull from `_tokens.scss`. No hardcoded hex or pixel values in components.
- **CSS Custom Properties:** Tokens are exposed via `:root` CSS variables to allow runtime theming (e.g., dark mode) without SCSS recompilation.
- **Atomic Composition:** Complex components are built by composing smaller primitives (e.g., `FormField` composes `Label`, `Input`, `HelperText`).

## Component Rules

- Use CSS Modules (`Component.module.scss`).
- BEM naming convention inside modules (`.wrapper--error`, `.icon--leading`).
- Maximum SCSS nesting depth: 2 levels.
- Context APIs (like `useFieldContext`) are used to implicitly wire accessibility attributes (`id`, `htmlFor`, `aria-invalid`) across composed atomic components.
