# Label

Form label with optional required indicator.

## Import

```tsx
import { Label } from "@/components/primitives/label/label";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Shows a red asterisk after the label text. |
| `children` | `React.ReactNode` | — | Label text. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLLabelElement>` | — | Ref forwarded to `<label>`. |

Plus all native `<label>` attributes (e.g. `htmlFor`).

## Examples

### Basic

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

### Required

```tsx
<Label htmlFor="password" required>Password</Label>
<Input id="password" type="password" />
```

### With description

```tsx
<Label htmlFor="username">Username</Label>
<Input id="username" />
<p id="username-helper">3-20 characters, letters and numbers only.</p>
```

## Accessibility

- Renders as a native `<label>` — clicking focuses the associated input via `htmlFor`.
- Required asterisk uses `aria-hidden="true"` — purely visual. Use `aria-required="true"` on the input itself for screen readers:

```tsx
<Label htmlFor="email" required>Email</Label>
<Input id="email" type="email" aria-required="true" />
```
