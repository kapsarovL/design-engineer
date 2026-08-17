# Avatar

Displays a user profile image with fallback initials and optional status indicator.

## Import

```tsx
import { Avatar, AvatarGroup } from "@/components/primitives/avatar/avatar";
```

## Props

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL. Falls back to initials on error. |
| `alt` | `string` | `""` | Alt text for the image. First 2 characters used as fallback initials. |
| `fallback` | `string` | — | Override fallback initials (overrides `alt` slicing). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Visual size. |
| `status` | `"online" \| "offline" \| "busy"` | — | Status indicator dot. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLSpanElement>` | — | Ref forwarded to the root `<span>`. |

### AvatarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | — | Avatar components to group. |

## Examples

### Basic

```tsx
<Avatar src="/photo.jpg" alt="Jane Doe" />
```

### With fallback

```tsx
<Avatar alt="Jane Doe" />          {/* Shows "Ja" */}
<Avatar fallback="JD" />           {/* Shows "JD" */}
```

### Sizes

```tsx
<Avatar src="/photo.jpg" alt="Jane" size="sm" />
<Avatar src="/photo.jpg" alt="Jane" size="md" />
<Avatar src="/photo.jpg" alt="Jane" size="lg" />
<Avatar src="/photo.jpg" alt="Jane" size="xl" />
```

### With status

```tsx
<Avatar src="/photo.jpg" alt="Jane" status="online" />
<Avatar src="/photo.jpg" alt="Jane" status="busy" />
```

### Grouped

```tsx
<AvatarGroup>
  <Avatar src="/a.jpg" alt="A" />
  <Avatar src="/b.jpg" alt="B" />
  <Avatar src="/c.jpg" alt="C" />
</AvatarGroup>
```

## Accessibility

- `alt` text is provided to the `<img>` element.
- Status indicator uses `title` attribute for screen reader context.
- Image errors are handled silently — fallback initials render without user-visible breakage.
