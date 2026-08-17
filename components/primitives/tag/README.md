# Tag

Compact label for categorization with optional dismiss. Composes with `TagGroup`, `TagList`, and `TagDismiss`.

## Import

```tsx
import {
  Tag,
  TagGroup,
  TagList,
  TagDismiss,
} from "@/components/primitives/tag/tag";
```

## Props

### Tag

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "status" \| "priority"` | `"default"` | Visual variant. |
| `removable` | `boolean` | `false` | Shows dismiss button. |
| `onRemove` | `() => void` | — | Called when dismiss button is clicked. |
| `children` | `React.ReactNode` | — | Tag content. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLLIElement>` | — | Ref forwarded to `<li>`. |

### TagGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Tag list content. |
| `onRemove` | `(key: string) => void` | — | Global remove handler for all tags in group. |
| `className` | `string` | — | Additional CSS class. |

### TagList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Tag items. |
| `label` | `string` | — | Visible label for the list. |
| `className` | `string` | — | Additional CSS class. |

### TagDismiss

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | — | Click handler. |
| `label` | `string` | `"Remove"` | Accessible label for the button. |
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic

```tsx
<Tag>React</Tag>
<Tag variant="status">Active</Tag>
<Tag variant="priority">P1</Tag>
```

### Removable

```tsx
<Tag removable onRemove={() => console.log("removed")}>
  Filter: Active
</Tag>
```

### Tag list with label

```tsx
<TagList label="Technologies">
  <Tag>TypeScript</Tag>
  <Tag>React</Tag>
  <Tag>Next.js</Tag>
</TagList>
```

### Tag group (bulk remove)

```tsx
<TagGroup onRemove={(key) => removeFilter(key)}>
  <TagList>
    <Tag removable>Status: Active</Tag>
    <Tag removable>Priority: P1</Tag>
  </TagList>
</TagGroup>
```

### Standalone dismiss

```tsx
<Tag>
  Filter: Draft
  <TagDismiss onClick={() => clearFilter()} />
</Tag>
```

## Accessibility

- `Tag` renders as `<li>` inside a `<ul>` (via `TagList`).
- Dismiss button has `aria-label="Remove <tag text>"` for screen readers.
- `TagDismiss` is a `<button>` — keyboard accessible by default.
- `TagList` uses `role="list"` semantics via `<ul>`.
