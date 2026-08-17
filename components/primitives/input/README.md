# Input

Text input with optional size, icon slots, error state, and helper text.

## Import

```tsx
import { Input } from "@/components/primitives/input/input";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Input height and text size. |
| `error` | `string` | — | Error message. Applies error border and shows message below input. |
| `helper` | `string` | — | Helper text below input. Hidden when `error` is present. |
| `iconStart` | `React.ReactNode` | — | Icon before the input text. |
| `iconEnd` | `React.ReactNode` | — | Icon after the input text. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLInputElement>` | — | Ref forwarded to `<input>`. |

Plus all native `<input>` attributes (except `size`).

## Examples

### Basic

```tsx
<Input placeholder="Enter text" />
```

### Sizes

```tsx
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />
```

### With icons

```tsx
<Input iconStart={<Icon name="search" size="sm" />} placeholder="Search" />
<Input iconEnd={<Icon name="calendar" size="sm" />} placeholder="Pick date" />
```

### With error

```tsx
<Input error="Email is required" type="email" />
```

### With helper

```tsx
<Input helper="Must be at least 8 characters" type="password" />
```

### Disabled

```tsx
<Input disabled value="Read only" />
```

## Accessibility

- `aria-invalid` is set when `error` is present.
- `aria-describedby` links to error or helper text for screen reader context.
- Error message uses `role="alert"` for immediate announcement.
- `iconStart` and `iconEnd` should be decorative (`aria-hidden="true"` on the icon).
- Ensure `id` is set when pairing with a standalone `<label>`.
