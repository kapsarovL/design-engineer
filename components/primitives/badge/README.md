# Badge

Compact label for status, priority, or categorical metadata.

## Import

```tsx
import { Badge } from "@/components/primitives/badge/badge";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"status" \| "priority" \| "default"` | `"default"` | Visual variant controlling color treatment. |
| `type` | `string` | `"default"` | Semantic sub-type (e.g. `"success"`, `"error"`, `"warning"`). Applied as a CSS modifier class. |
| `children` | `React.ReactNode` | — | Badge content. |
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic

```tsx
<Badge>New</Badge>
```

### Status variant

```tsx
<Badge variant="status" type="success">Active</Badge>
<Badge variant="status" type="error">Failed</Badge>
<Badge variant="status" type="warning">Pending</Badge>
```

### Priority variant

```tsx
<Badge variant="priority" type="high">P1</Badge>
<Badge variant="priority" type="medium">P2</Badge>
<Badge variant="priority" type="low">P3</Badge>
```

## Accessibility

- Badge is a `<span>` — purely decorative. No ARIA role needed.
- Ensure sufficient color contrast between badge background and text. Use `type` modifiers that map to tokens with adequate contrast ratios.
