# Progress Tracker

## Completed

- [x] Workspace monorepo initialization (`apps/web`, `packages/ui`).
- [x] UI package build configuration (`tsup`, `esbuild-sass-plugin`).
- [x] SCSS token infrastructure (`_colors`, `_spacing`, etc.).
- [x] Base atomic components implemented: `Button`, `Input`, `Checkbox`.
- [x] `FormField` context molecule for a11y linking.
- [x] Neon PostgreSQL connection and Drizzle ORM initialization.
- [x] Drizzle schema definition (`users` table) and Zod integration.
- [x] Next.js Server Action wired to client form (`StepOne.tsx`).
- [x] Icon component with SVG sprite system (`components/primitives/icon/`, `public/sprites/icons.svg`).
- [x] Badge component — local, token-driven, status/priority/default variants.
- [x] Card component — local, composable (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
- [x] Tooltip component — wraps `nextjs-components` via deep import, local SCSS styling.
- [x] Dialog component — local implementation using native `<dialog>` element. Compound parts: Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose. Backdrop blur, focus trapping, Escape to close.
- [x] Dialog showcase section on page — default dialog, small/large size variants. Sidebar nav entry added.
- [x] Icon component — SVG sprite system with 16 icons (check, close, plus, search, arrow-right, arrow-left, chevron-down, chevron-right, alert-circle, info, trash, edit, settings, user, home, loader). 4 sizes (sm/md/lg/xl). Uses `currentColor` for recoloring.
- [x] Icon showcase section — available icons grid, size comparison, in-context usage with Button and Badge.
- [x] Typography tokens — font families (sans/mono), 8-step type scale (xs–4xl), 5 weights, 5 line-heights, 3 letter-spacing values. All token-driven.
- [x] Typography showcase section — type scale demo, weight showcase, font family samples.
- [x] Separator component — `<div>` with `role="separator"`, horizontal/vertical orientation, decorative mode. Uses `--color-border` token.
- [x] Separator showcase section — horizontal with content, vertical with labels, in-context between buttons.
- [x] Toggle component — two-state button with `aria-pressed`, controlled/uncontrolled modes, 3 sizes (sm/md/lg), active state with `--color-primary-light` background. `data-state="on"` / `"off"`.
- [x] Toggle showcase section — default states, sizes, with icons, icon-only with `aria-label`.
- [x] Card showcase section — full card (header/content/footer), interactive hover cards, minimal card with icon. Sidebar nav entry added.
- [x] Code examples registry updated — Card entry added (17 total).
- [x] Tabs component — local implementation with ARIA roles.
- [x] Select component — local implementation with SVG chevron icon.
- [x] DropdownMenu component — local implementation (Root, Trigger, Content, Item).
- [x] TagGroup component — local implementation (TagGroup, TagList, Tag, TagDismiss) with context.
- [x] Dark mode `:root` overrides in `tokens.scss` (`.dark` class).
- [x] Auto dark mode via `prefers-color-scheme` media query.
- [x] Fixed `reset.scss` → `resets.scss` import, migrated `@import` → `@use`.
- [x] Fixed `resets.scss` typos (`sans-seri` → `sans-serif`, `-webkit-font-monospace` → `-webkit-font-smoothing`).
- [x] Fixed `app/variables.module.scss` invalid selector (`appRoot {` → `.appRoot {`).
- [x] Fixed `top-nav.tsx` — missing `Tooltip` import, `content` → `text` prop, missing `task-actions` server action.
- [x] Fixed `select/selecet.tsx` filename typo.
- [x] Added `transpilePackages: ["nextjs-components"]` to `next.config.ts`.
- [x] FormField context molecule — composable (FormField, FormFieldLabel, FormFieldInput, FormFieldTextarea, FormFieldHelper, FormFieldError) with `useFormField` hook for a11y wiring.
- [x] Astro docs site — `docs/` workspace package with 11 static pages, live component demos, sidebar nav, token-driven styling.
- [x] All gates pass: `biome check`, `tsc --noEmit`, `pnpm build`.
- [x] Button primitive — 4 variants (primary, secondary, ghost, destructive), 3 sizes (sm, md, lg), loading spinner, icon support.
- [x] Table primitive — composable (Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption) with striped/bordered/compact options.
- [x] Avatar primitive — image with error fallback, 4 sizes (sm, md, lg, xl), status indicator (online, offline, busy), AvatarGroup.
- [x] Enhanced tokens.scss — added shadow-2xl, shadow-3xl, shadow-focus, shadow-focus-destructive, shadow-inset, shadow-overlay (light + dark + auto dark mode).
- [x] Label primitive — form label with required indicator (asterisk), a11y biome suppress for primitive pattern.
- [x] Input primitive — 3 sizes (sm/md/lg), error state with aria-invalid + role="alert", helper text, icon start/end slots, disabled state. Uses `inputSize` prop (avoids native `size` conflict).
- [x] Extended tokens.scss — added semantic colors (success, warning, error, info with bg/text variants), input tokens (bg, border, focus, placeholder, disabled) across light + dark + auto dark mode.
- [x] Page updated with Label + Input showcase (sizes, states, icons), updated component table to 12 rows.
- [x] Sidebar primitive — compound component: SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarSeparator. Uses `useSidebar()` hook for open/close state. Supports left/right sides, active state, icon+label, href or button rendering. Collapsible with smooth width+opacity transition.
- [x] Barrel exports for Badge, Tabs, Sidebar.
- [x] Page restructured — Sidebar serves as left-side page navigation listing all component sections with anchor links. TopBar with SidebarTrigger + scrollable content area.
- [x] Code examples registry (`app/code-examples.ts`) — source code strings for all 14 component sections (Button, Avatar, Label+Input, Tabs, Select, Tooltip, Badge, Dialog, FormField, Table, Icon, Typography, Shadows, Color Tokens).
- [x] CodePanel component (`components/code-panel/code-panel.tsx`) — slide-in panel from right with dark code block, copy button, Escape to close, prefers-reduced-motion support.
- [x] CodePanel wired into page — SidebarItem onClick opens code panel for the selected component. State management via `useState<string | null>`.
- [x] Section width constraint — `.sectionInner` with `max-width: 960px` centers and narrows showcase content.
- [x] All gates pass: `tsc --noEmit` (0 errors), `pnpm build` (success).

## In Progress / Next Steps

- [ ] Complete multi-step onboarding Zustand store integration.

## Notes

- `nextjs-components` barrel import causes missing `@react-stately/datepicker` build error + 319 tsc errors. Deep-importing individual submodules avoids this. However, most submodule sources (Modal, Menu, Tabs) have internal type errors (implicit `any`, untyped params). Implemented Dialog, Tabs, Select, DropdownMenu as local components to avoid these issues.
- Tooltip is the only component that wraps `nextjs-components` (deep import). All other primitives are local.
- Context files (`context/*.md`) describe a monorepo (`apps/web`, `packages/ui`) with Feature-Sliced Design (`src/features/`) — actual project is flat with `components/primitives/` as the design system. Context is aspirational.
