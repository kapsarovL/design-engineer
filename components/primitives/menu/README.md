# Menu

Reusable menu primitive with arrow-key navigation, groups, and separators. Used as the building block for [DropdownMenu](../dropdown-menu/README.md).

## Import

```tsx
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
} from "@/components/primitives/menu/menu";
```

## Props

### Menu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Menu items, separators, and groups. |
| `className` | `string` | — | Additional CSS class. |

### MenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Item content. |
| `destructive` | `boolean` | `false` | Applies danger styling. |
| `disabled` | `boolean` | `false` | Disables the item. |
| `onSelect` | `() => void` | — | Called when item is selected. |
| `className` | `string` | — | Additional CSS class. |

### MenuSeparator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |

### MenuGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional group heading. |
| `children` | `React.ReactNode` | — | Group items. |
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic

```tsx
<Menu>
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
  <MenuSeparator />
  <MenuItem>Help</MenuItem>
</Menu>
```

### With groups

```tsx
<Menu>
  <MenuGroup label="Account">
    <MenuItem>Profile</MenuItem>
    <MenuItem>Billing</MenuItem>
    <MenuItem>Settings</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuGroup label="Actions">
    <MenuItem destructive>Sign out</MenuItem>
  </MenuGroup>
</Menu>
```

### Destructive item

```tsx
<Menu>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <MenuSeparator />
  <MenuItem destructive>Delete</MenuItem>
</Menu>
```

## Accessibility

- Root uses `role="menu"` and `tabIndex={0}` — receives focus.
- Items use `role="menuitem"` and `tabIndex={-1}`.
- `MenuSeparator` renders as `<hr>` with implicit separator role.
- `MenuGroup` uses `role="group"` with `aria-label` when a label is provided.
- Disabled items are visually muted but still focusable (follows WAI-ARIA menu pattern).

## Keyboard

| Key | Action |
|-----|--------|
| `ArrowDown` | Focus next item |
| `ArrowUp` | Focus previous item |
| `Home` | Focus first item |
| `End` | Focus last item |
| `Enter` | Select focused item |
| `Escape` | Close menu (if wrapped in DropdownMenu) |
