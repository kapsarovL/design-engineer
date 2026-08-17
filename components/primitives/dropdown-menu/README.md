# DropdownMenu

Click-triggered popover menu built on the [Menu](../menu/README.md) primitive. Supports alignment, keyboard navigation, and click-outside/escape dismissal.

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/primitives/dropdown-menu/dropdown-menu";
```

## Props

### DropdownMenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Composition of Trigger + Content. |

### DropdownMenuTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Trigger element (typically a Button). |
| `asChild` | `boolean` | `false` | Render as child element. |

### DropdownMenuContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"start" \| "center" \| "end"` | `"start"` | Horizontal alignment relative to trigger. |
| `children` | `React.ReactNode` | — | Menu items and separators. |
| `className` | `string` | — | Additional CSS class. |

### DropdownMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Item content. |
| `destructive` | `boolean` | `false` | Applies danger styling. |
| `disabled` | `boolean` | `false` | Disables the item. |
| `onSelect` | `() => void` | — | Called when item is selected. |
| `className` | `string` | — | Additional CSS class. |

### DropdownMenuSeparator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="secondary" size="sm">Actions ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Archive</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With destructive action

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="sm">⋯</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>View</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### End-aligned

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="sm">⋯</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Accessibility

- Trigger has `aria-haspopup="menu"` and `aria-expanded` toggled on open/close.
- Content uses `role="menu"` and items use `role="menuitem"`.
- Focus is managed: opening focuses the first item; arrow keys navigate; Escape closes.
- Click outside or pressing Escape closes the menu.
- Menu auto-closes after item selection.

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens menu (on trigger) |
| `ArrowDown` | Next item |
| `ArrowUp` | Previous item |
| `Home` | First item |
| `End` | Last item |
| `Escape` | Closes menu |
| `Enter` | Selects focused item |
