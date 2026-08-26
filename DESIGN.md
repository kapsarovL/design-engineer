---
name: Prismaflux Design System
description: Token-driven React + SCSS component library, dark-first on a Vercel-neutral scale with a single blue accent.
colors:
  primary: "#0070f3"
  primary-hover: "#0061d6"
  primary-dark: "#0050b3"
  primary-light: "#e6f0ff"
  primary-text: "#0050b3"
  on-primary: "#ffffff"
  bg: "#faf9fb"
  surface: "#f3f1f6"
  surface-hover: "#eae7f0"
  surface-card: "#ffffff"
  text: "#1a1625"
  text-secondary: "#524c63"
  text-muted: "#7c7591"
  border: "#e4e0ed"
  border-hover: "#ccc7d8"
  overlay: "rgba(26, 22, 37, 0.55)"
  overlay-strong: "rgba(0, 0, 0, 0.5)"
  overlay-stronger: "rgba(0, 0, 0, 0.45)"
  success: "#22a06b"
  success-bg: "#e3fcef"
  success-text: "#006644"
  warning: "#e97b1a"
  warning-bg: "#fef0d4"
  warning-text: "#7a4a08"
  error: "#e03e3e"
  error-bg: "#fcebea"
  error-text: "#ae2a19"
  info: "#0070f3"
  info-bg: "#e6f0ff"
  info-text: "#0050b3"
typography:
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  display:
    fontFamily: "var(--font-heading)"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  heading1:
    fontSize: "2.25rem"
    fontWeight: 700
  heading2:
    fontSize: "1.5rem"
    fontWeight: 700
  label:
    fontSize: "0.75rem"
    fontWeight: 600
    textTransform: uppercase
    letterSpacing: "0.025em"
typescale:
  - name: text-2xs
    value: 0.625rem
  - name: text-2xs-loose
    value: 0.6875rem
  - name: text-xs
    value: 0.75rem
  - name: text-sm
    value: 0.8125rem
  - name: text-sm-loose
    value: 0.875rem
  - name: text-base
    value: 0.9375rem
  - name: text-base-loose
    value: 1rem
  - name: text-lg-tight
    value: 1.0625rem
  - name: text-lg
    value: 1.125rem
  - name: text-xl
    value: 1.25rem
  - name: text-2xl
    value: 1.5rem
  - name: text-2xl-loose
    value: 1.75rem
  - name: text-3xl
    value: 1.875rem
  - name: text-3xl-loose
    value: 2rem
  - name: text-4xl
    value: 2.25rem
  - name: text-4xl-loose
    value: 2.5rem
  - name: text-5xl
    value: 4rem
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 48px
  3xl: 64px
  4xl: 80px
  5xl: 96px
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px
  3xl: 24px
  squircle: 32px
  pill: 9999px
duration:
  fast: 150ms
  normal: 250ms
  slow: 500ms
  reveal: 700ms
components:
  button-base:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    height: 36px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    focusRing: "{colors.primary}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    boxShadow: "{shadows.glow-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
    borderColor: "{colors.border-hover}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.text}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-hover}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
  button-destructive-hover:
    backgroundColor: "color-mix(in oklch, {colors.error} 90%, black)"
    boxShadow: "{shadows.glow-error}"
  button-size-sm:
    height: 32px
    fontSize: "0.8125rem"
    rounded: "{rounded.sm}"
  button-size-md:
    height: 36px
    fontSize: "0.875rem"
  button-size-lg:
    height: 40px
    fontSize: "0.9375rem"
  button-disabled:
    opacity: 0.5
---

## Overview

The Prismaflux Design System is a token-driven component library built with React 19 and SCSS Modules. It is dark-first — every color, shadow, and surface token is defined for light, black-and-white, dark, and auto-dark modes, all driven by a single source of truth in `styles/tokens.scss`. One accent color dominates: `#0070f3`, applied as `--color-primary` and its tinted family.

The system follows strict implementation rules: CSS custom properties only (no raw hex in component code), BEM-ish SCSS Modules with a maximum of three nesting levels, fluid typography with `clamp()`, CSS Grid + `minmax` for responsive layouts, GPU-safe animation (transform/opacity only), WCAG AA accessibility by default, and a spring-based micro-motion layer.

## Colors

- **Primary** is a single blue (#0070f3) with four derived surfaces: `primary` (fill), `primary-hover`, `primary-light` (tint for backgrounds), and `primary-text` (contrast text on the tint). Used only for the primary action and the focus ring.
- **Neutrals** form a layered surface stack: `bg` → `surface` → `surface-card`, with `text` / `text-secondary` / `text-muted` stepped for hierarchy. Borders use `border` / `border-hover`, never a colored left accent.
- **Semantics** (`success`, `warning`, `error`, `info`) each carry a background tint + text token pair rather than reusing primary.
- **Dark mode** is a full re-map under `.dark` (and `.bw` for the B&W theme), not a brightness filter. `--color-primary` stays `#0070f3` in dark (it becomes `--color-info`); `--color-text` becomes `#ededed`.

## Typography

- **Display** is the site heading, sized with `clamp(2.5rem, 7vw, 4.5rem)` for fluid scaling, weight 700, `-0.025em` tracking.
- **Body** is `0.935rem` (`--text-base`) / 1.5 leading / weight 400, measure capped at 65ch in `.main p`.
- **Scale** is a 3-step token run: `xs` (10px) → `lg` (15px) → `xl` (16px) → `2xl` (18px) → `3xl` (24px) → `4xl` (36px), with five weights (400/500/600/700/800) and three line-heights.
- Font stack: `var(--font-sans)` (Jakarta/Inter, system sans-serif) for UI, `var(--font-mono)` (Geist Mono) for code.

## Layout

- **Page grid**: `.layout` is a 240px sidebar + 1fr main, on a `var(--color-bg)` canvas.
- **Content**: `.main` is centered at `max-width: 900px` with `padding: 40px 80px`; on ≤768px it drops to a 40px / 60px margin stack.
- **Showcase surface**: each component lives in `.showcaseSection` — a card on `var(--color-surface-card)` with a bezel border, rounded `var(--radius-bezel)`, and a `:hover` lift of `translateY(-2px)`. Sections carry a `.reveal` entrance (opacity + translate) that resolves to `transform: none` once shown, so it never traps `position: sticky` children.
- **Density tokens**: `--section-gap` (32px) and `--section-padding-x/y`.

## Elevation & Depth

- Three-layer shadow vocabulary. **Subtle** (`-sm`/`-md`) for card shells, **floating** (`-lg`/`-xl`/`-2xl`) for raised surfaces, **hero** (`-hero`, a dual blue bloom) for the page hero.
- **Inset** (`-inset`) for pressed surfaces; **ambient** (`-ambient`) for the blue field behind the hero.
- **Focus rings** are token-colored glows (`--shadow-focus` = 3px blue, `--shadow-focus-destructive` = 3px red), applied via `:focus-visible` only.

## Shapes

- A single radius scale runs `xs` (4px) through `3xl` (24px), plus `squircle` (32px) and `pill` (9999px).
- **Buttons** are the only pill-capable element (via the `pill` prop → `var(--radius-pill)`); cards and panels cap at `lg`/`xl`.
- Border treatment is a 1px token line (`color-border`); no colored left borders or hard-offset block shadows.

## Components

### Button

- **Variants** (via `--variant` class): `primary` (blue fill / white text), `secondary` (surface + border), `ghost` (transparent), `destructive` (error fill). Each uses `color-mix(in oklch, …)` for hover darkening.
- **Sizes**: `sm` (32px), `md` (36px), `lg` (40px). Touch targets sized to the label.
- **States**: `loading` shows a `1em` spinning ring and forces `disabled`; `:hover` is `scale(0.98)`, `:active` `scale(0.96)`. `:focus-visible` renders `--shadow-focus`; `:disabled` drops opacity to 0.5 and is pointer-events-off.
- **Icon handling**: a leading `icon` auto-becomes icon-only (square, `aspect-ratio: 1`, no padding) when there's no label; `iconPosition: "end"` moves it; `trailingIcon` renders a separate `--space-2`-gapped slot.
- **Polymorphism**: `asChild` clones a single child element and merges the button's classes + props onto it (e.g. render as an `<a>` or `<Link>`).
- **Motion**: one authored press scale (0.98/0.96), not per-variant animation. Hover lift on `.showcaseSection` is the surface motion; button micro-interactions are spring-timed via `--transition-fast`.

## Do's and Don'ts

- **Do** use `--color-primary` only for the primary action and focus; reuse the semantic color families for their named intents.
- **Do** render icon-only buttons with an `aria-label`. Set `type="button"` on any trigger that isn't a form submit (native default is `submit`).
- **Do** let `.reveal` resolve to `transform: none; will-change: auto` — never leave a `translateY(0)` or `will-change: transform` on a container with `position: sticky` children.
- **Don't** reach for raw hex or pixel values inside components; read from the token layer.
- **Don't** put a `transform` ancestor (hover lift, parallax) above a sticky panel — it silently cancels stickiness.
- **Don't** restyle the focus ring per variant; theme it from `--color-primary` / `--color-error`.
