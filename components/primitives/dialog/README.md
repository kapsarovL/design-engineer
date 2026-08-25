# Dialog

Modal dialog built on the native `<dialog>` element with custom styling and compound parts for header, title, body, description, footer, and a close control.

## Import

```tsx
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/primitives/dialog/dialog";
```

## Props

### Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controlled open state. |
| `onClose` | `() => void` | — | Called when the dialog requests to close. |
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | — | Dialog composition. |

### DialogHeader, DialogTitle, DialogBody, DialogDescription, DialogFooter

All accept `className`, `children`, and native HTML attributes. `DialogTitle` renders an `<h2>`, `DialogDescription` renders a `<p>`.

### DialogClose

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Renders as the child element via `React.cloneElement` (e.g. `<Button>`). |
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | `"Close"` | Close control content. |

## Examples

### Basic

```tsx
<Dialog isOpen={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Confirm action</DialogTitle>
    <DialogDescription>
      Are you sure you want to proceed?
    </DialogDescription>
  </DialogHeader>
  <DialogBody>
    <p>This cannot be undone.</p>
  </DialogBody>
  <DialogFooter>
    <DialogClose>Cancel</DialogClose>
    <Button variant="destructive">Delete</Button>
  </DialogFooter>
</Dialog>
```

### Close with a custom trigger (asChild)

```tsx
<DialogFooter>
  <DialogClose asChild>
    <Button variant="ghost">Cancel</Button>
  </DialogClose>
  <Button variant="primary" onClick={confirm}>Confirm</Button>
</DialogFooter>
```

## Accessibility

- Uses the native `<dialog>` element — provides built-in `aria-modal`, focus trapping, and Escape handling.
- `DialogTitle` is required for screen reader context.
- `DialogDescription` links via `aria-describedby`.
- Focus is trapped within the dialog when open.
- Clicking the backdrop closes the dialog via native `<dialog>` behavior.
- `DialogClose` provides an explicit close control.

## Keyboard

| Key | Action |
|-----|--------|
| `Escape` | Closes the dialog |
| `Tab` | Traps focus within dialog |
| `Shift+Tab` | Reverse focus trap |
