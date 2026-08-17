# Toggle

Pressable button that toggles between active and inactive states. Used for on/off actions in toolbars.

## Import

```tsx
import { Toggle } from "@/components/primitives/toggle/toggle";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressed` | `boolean` | — | Controlled pressed state. |
| `defaultPressed` | `boolean` | `false` | Initial pressed state (uncontrolled). |
| `onPressedChange` | `(pressed: boolean) => void` | — | Called when state changes. |
| `disabled` | `boolean` | `false` | Disables the toggle. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Visual size. |
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | — | Toggle content (typically an icon). |
| `ref` | `React.Ref<HTMLButtonElement>` | — | Ref forwarded to `<button>`. |

## Examples

### Basic (uncontrolled)

```tsx>
<Toggle defaultPressed>
  <Icon name="bold" size="sm" />
</Toggle>
```

### Controlled

```tsx
const [bold, setBold] = useState(false);

<Toggle pressed={bold} onPressedChange={setBold}>
  <Icon name="bold" size="sm" />
</Toggle>
```

### Toolbar group

```tsx
<div role="toolbar" aria-label="Text formatting">
  <Toggle>
    <Icon name="bold" size="sm" />
  </Toggle>
  <Toggle>
    <Icon name="italic" size="sm" />
  </Toggle>
  <Toggle>
    <Icon name="underline" size="sm" />
  </Toggle>
</div>
```

### Sizes

```tsx
<Toggle size="sm"><Icon name="star" size="sm" /></Toggle>
<Toggle size="md"><Icon name="star" size="md" /></Toggle>
<Toggle size="lg"><Icon name="star" size="lg" /></Toggle>
```

### Disabled

```tsx
<Toggle disabled>
  <Icon name="lock" size="sm" />
</Toggle>
```

## Accessibility

- Uses `role="button"` with `aria-pressed` — screen readers announce "pressed" / "not pressed".
- `data-state="on" | "off"` for CSS styling hooks.
- Focusable via `Tab`, activated via `Enter` or `Space`.
- When used in a toolbar, wrap with `role="toolbar"` and provide `aria-label`.

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Toggles pressed state |
| `Space` | Toggles pressed state |
| `Tab` | Moves focus to/from toggle |
