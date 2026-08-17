# Dialog

Modal overlay for focused interactions. Built on the native `<dialog>` element with custom styling.

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/primitives/dialog/dialog";
```

## Props

### Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes. |
| `children` | `React.ReactNode` | — | Dialog composition. |

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |
| `children` | `React.ReactNode` | — | Content inside the dialog panel. |

### DialogTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Trigger element. |

### DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose

All accept `className`, `children`, and native HTML attributes.

## Examples

### Basic

```tsx
<Dialog>
  <DialogTrigger>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Confirm action</DialogTitle>
    <DialogDescription>
      Are you sure you want to proceed?
    </DialogDescription>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button variant="danger">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Controlled dialog</DialogTitle>
    <DialogBody>
      <p>This dialog's state is managed externally.</p>
    </DialogBody>
  </DialogContent>
</Dialog>
```

## Accessibility

- Uses native `<dialog>` element — provides built-in `aria-modal`, focus trapping, and Escape handling.
- `DialogTitle` is required — renders as `<h2>` inside the dialog.
- `DialogDescription` links via `aria-describedby` for screen reader context.
- Focus is trapped within the dialog when open.
- Clicking the backdrop closes the dialog (via native dialog behavior).
- `DialogClose` provides an explicit close button.

## Keyboard

| Key | Action |
|-----|--------|
| `Escape` | Closes the dialog |
| `Tab` | Traps focus within dialog |
| `Shift+Tab` | Reverse focus trap |
