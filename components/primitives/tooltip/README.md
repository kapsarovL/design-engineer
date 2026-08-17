# Tooltip

Hover/focus-triggered informational popup. Uses native `<dialog>` with `popover` API for positioning.

## Import

```tsx
import { Tooltip } from "@/components/primitives/tooltip/tooltip";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | — | Tooltip content. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Position relative to trigger. |
| `delayDuration` | `number` | `300` | Milliseconds before showing. |
| `children` | `React.ReactNode` | — | Trigger element. |
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic

```tsx
<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>
```

### Different sides

```tsx
<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" side="left">
  <Button>Left</Button>
</Tooltip>
```

### Custom delay

```tsx
<Tooltip content="Appears quickly" delayDuration={100}>
  <Button>Fast tooltip</Button>
</Tooltip>

<Tooltip content="Appears slowly" delayDuration={800}>
  <Button>Slow tooltip</Button>
</Tooltip>
```

### With icon

```tsx
<Tooltip content="This field is required">
  <Icon name="info" size="sm" />
</Tooltip>
```

## Accessibility

- Trigger should be focusable (use `<button>` or add `tabIndex={0}`).
- Tooltip content is announced to screen readers via the `<dialog>` element.
- Tooltip closes on Escape key.
- Tooltip closes when trigger loses focus.
- Delay prevents accidental triggers for motor-impaired users.

## Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Focuses trigger (shows tooltip) |
| `Escape` | Closes tooltip |
| `Shift+Tab` | Blurs trigger (hides tooltip) |
