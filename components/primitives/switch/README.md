# Switch

Toggle between two states (on/off). Supports controlled and uncontrolled modes, sizes, and labels.

## Import

```tsx
import { Switch } from "@/components/primitives/switch/switch";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled). |
| `onCheckedChange` | `(checked: boolean) => void` | — | Called when state changes. |
| `disabled` | `boolean` | `false` | Disables the switch. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Visual size. |
| `label` | `string` | — | Accessible label (renders as `aria-label`). |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | Ref forwarded to `<button>`. |

## Examples

### Basic (uncontrolled)

```tsx
<Switch defaultChecked />
```

### Controlled

```tsx
const [on, setOn] = useState(false);

<Switch checked={on} onCheckedChange={setOn} />
<p>State: {on ? "On" : "Off"}</p>
```

### With label

```tsx
<Switch label="Enable notifications" />
```

### Sizes

```tsx
<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />
```

### Disabled

```tsx
<Switch disabled />
<Switch disabled defaultChecked />
```

### In a form

```tsx
<FormField>
  <FormFieldLabel>Dark mode</FormFieldLabel>
  <Switch onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
</FormField>
```

## Accessibility

- Uses `role="switch"` with `aria-checked` — screen readers announce "on" / "off".
- `label` prop sets `aria-label` for context.
- `data-state="on" | "off"` for CSS styling hooks.
- Focusable via `Tab`, activated via `Enter` or `Space`.
- `disabled` prop prevents interaction and communicates state.

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Toggles switch |
| `Space` | Toggles switch |
| `Tab` | Moves focus to/from switch |
