# FormField

Compound component for building accessible form fields with label, input, helper text, and error messaging. Manages ID generation and ARIA relationships via context.

## Import

```tsx
import {
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldTextarea,
  FormFieldHelper,
  FormFieldError,
} from "@/components/primitives/form-field/form-field";
```

## Props

### FormField

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `invalid` | `boolean` | `false` | Marks field as invalid. Applies error styling and shows error message. |
| `disabled` | `boolean` | `false` | Disables all child inputs. |
| `children` | `React.ReactNode` | — | Field composition (Label, Input, Helper, Error). |
| `className` | `string` | — | Additional CSS class. |

### FormFieldLabel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Shows red asterisk after label text. |
| `children` | `React.ReactNode` | — | Label text. |

Plus all native `<label>` attributes.

### FormFieldInput

Extends `React.InputHTMLAttributes<HTMLInputElement>` (omits `id` — auto-generated).

### FormFieldTextarea

Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` (omits `id` — auto-generated).

### FormFieldHelper

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Helper text. Hidden when error is present. |

### FormFieldError

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Error message. Only renders when `invalid` is true. |

## Examples

### Basic field

```tsx
<FormField>
  <FormFieldLabel>Email</FormFieldLabel>
  <FormFieldInput type="email" placeholder="you@example.com" />
  <FormFieldHelper>We'll never share your email.</FormFieldHelper>
</FormField>
```

### With error

```tsx
<FormField invalid>
  <FormFieldLabel required>Password</FormFieldLabel>
  <FormFieldInput type="password" />
  <FormFieldError>Password must be at least 8 characters.</FormFieldError>
</FormField>
```

### Textarea

```tsx
<FormField>
  <FormFieldLabel>Bio</FormFieldLabel>
  <FormFieldTextarea placeholder="Tell us about yourself" />
</FormField>
```

### Disabled

```tsx
<FormField disabled>
  <FormFieldLabel>Username</FormFieldLabel>
  <FormFieldInput value="johndoe" />
</FormField>
```

## Accessibility

- Auto-generates unique IDs for label `htmlFor`, input `id`, and error `aria-describedby`.
- `FormFieldError` uses `role="alert"` for screen reader announcement.
- `FormFieldInput` sets `aria-invalid` when `invalid` is true.
- `FormFieldInput` sets `aria-describedby` pointing to error or helper text.
- `FormFieldLabel` links to input via `htmlFor`.
- Required indicator uses `aria-hidden="true"` on the asterisk (visual only).
- Disabled state propagates to all child inputs.
