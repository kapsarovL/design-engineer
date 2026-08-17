# Select

Native `<select>` wrapper with consistent styling, sizes, error state, and icon slot.

## Import

```tsx
import { Select } from "@/components/primitives/select/select";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Select height and text size. |
| `error` | `string` | — | Error message. Applies error border and shows message below. |
| `helper` | `string` | — | Helper text below select. Hidden when `error` is present. |
| `icon` | `React.ReactNode` | — | Icon prefix inside the select. |
| `placeholder` | `string` | — | Placeholder text for the first empty option. |
| `disabled` | `boolean` | `false` | Disables the select. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLSelectElement>` | — | Ref forwarded to `<select>`. |

Plus all native `<select>` attributes.

## Examples

### Basic

```tsx
<Select>
  <option value="">Select an option</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</Select>
```

### With placeholder

```tsx
<Select placeholder="Choose a role">
  <option value="admin">Admin</option>
  <option value="editor">Editor</option>
  <option value="viewer">Viewer</option>
</Select>
```

### Sizes

```tsx
<Select size="sm">...</Select>
<Select size="md">...</Select>
<Select size="lg">...</Select>
```

### With error

```tsx
<Select error="Please select a valid option">
  <option value="">Select</option>
  <option value="a">A</option>
</Select>
```

## Accessibility

- Native `<select>` — fully accessible by default.
- `aria-invalid` and `aria-describedby` set when `error` is present.
- Error message uses `role="alert"`.
- Placeholder `<option>` should have `value=""` to indicate no selection.
