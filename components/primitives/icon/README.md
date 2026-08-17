# Icon

Renders an SVG icon from a sprite sheet. Always hidden from screen readers.

## Import

```tsx
import { Icon } from "@/components/primitives/icon/icon";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Icon name in the sprite sheet (`/sprites/icons.svg#<name>`). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Icon size. |
| `className` | `string` | — | Additional CSS class. |

Plus all native `<svg>` attributes.

## Examples

### Basic

```tsx
<Icon name="search" />
<Icon name="plus" size="sm" />
<Icon name="trash" size="lg" />
```

### In a button

```tsx
<Button>
  <Icon name="plus" size="sm" />
  Add item
</Button>
```

## Accessibility

- Renders with `aria-hidden="true"` and `focusable="false"` — decorative icons are invisible to screen readers.
- For meaningful icons (not decorative), use `aria-label` on the parent element instead.
- Icon-only interactive elements must have visible text or `aria-label`:

```tsx
<Button aria-label="Delete item">
  <Icon name="trash" size="sm" />
</Button>
```
