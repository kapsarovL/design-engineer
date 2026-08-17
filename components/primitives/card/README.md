# Card

Container for grouping related content with optional header, body, and footer sections.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@/components/primitives/card/card";
```

## Props

All sub-components extend `React.HTMLAttributes<HTMLDivElement>` and accept `className` and `ref`.

| Component | Description |
|-----------|-------------|
| `Card` | Root container with border and background. |
| `CardHeader` | Top section — typically title + description. |
| `CardTitle` | Heading element inside header. |
| `CardDescription` | Subtitle / description text. |
| `CardBody` | Main content area. |
| `CardFooter` | Bottom section — typically actions. |

## Examples

### Basic

```tsx
<Card>
  <CardBody>
    <p>Simple card content.</p>
  </CardBody>
</Card>
```

### Full composition

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project settings</CardTitle>
    <CardDescription>Manage your project preferences.</CardDescription>
  </CardHeader>
  <CardBody>
    <Input placeholder="Project name" />
  </CardBody>
  <CardFooter>
    <Button variant="primary">Save</Button>
    <Button variant="ghost">Cancel</Button>
  </CardFooter>
</Card>
```

### With className

```tsx
<Card className="my-custom-card">
  <CardBody>Content</CardBody>
</Card>
```

## Accessibility

- Uses semantic HTML structure — `<div>` with visual grouping via border/background.
- `CardTitle` renders as `<h3>` — maintain heading hierarchy (don't skip levels).
- Ensure sufficient contrast between card background and page background.
