# Separator

Horizontal rule for visual division between sections.

## Import

```tsx
import { Separator } from "@/components/primitives/separator/separator";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLHRElement>` | — | Ref forwarded to `<hr>`. |

Plus all native `<hr>` attributes.

## Examples

### Basic

```tsx
<Separator />
```

### Between sections

```tsx
<Card>
  <CardBody>Content above</CardBody>
  <Separator />
  <CardBody>Content below</CardBody>
</Card>
```

### With className

```tsx
<Separator className="my-4" />
```

## Accessibility

- Uses native `<hr>` with `role="separator"` — semantically correct for screen readers.
- No interactive behavior — purely visual.
