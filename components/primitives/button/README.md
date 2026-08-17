# Button

Interactive trigger for actions and events. Supports variants, sizes, icons, loading state, and polymorphic rendering via `asChild`.

## Import

```tsx
import { Button } from "@/components/primitives/button/button";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "danger" \| "ghost" \| "link"` | `"primary"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Touch target and text size. |
| `asChild` | `boolean` | `false` | Renders as child element via `Slot` (e.g. `<Link>`). |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | — | Button content. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | Ref forwarded to root element. |

Plus all native `<button>` attributes.

## Examples

### Variants

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="link">Learn more</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With icons

```tsx
<Button>
  <Icon name="plus" size="sm" />
  Add item
</Button>

<Button variant="danger">
  Delete
  <Icon name="trash" size="sm" />
</Button>
```

### Loading state

```tsx
<Button disabled>
  <span className="spinner" />
  Saving…
</Button>
```

Use `data-loading` attribute on the button for CSS hooks:

```css
button[data-loading] {
  pointer-events: none;
  opacity: 0.7;
}
```

### As child (polymorphic)

```tsx
import Link from "next/link";

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

## Accessibility

- Native `<button>` element — keyboard and screen reader accessible by default.
- `disabled` attribute prevents interaction and communicates state to assistive tech.
- Loading state uses `data-loading` attribute — add `aria-busy="true"` and `aria-live="polite"` if the action is long-running.
- Icon-only buttons must have `aria-label`:

```tsx
<Button aria-label="Close dialog">
  <Icon name="close" size="sm" />
</Button>
```

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Activates button |
| `Space` | Activates button |
