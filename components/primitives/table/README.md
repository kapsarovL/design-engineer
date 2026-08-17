# Table

Data table with compound sub-components for header, body, footer, rows, cells, and caption. Supports striped, bordered, and compact variants.

## Import

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/primitives/table/table";
```

## Props

### Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Alternating row backgrounds. |
| `bordered` | `boolean` | `false` | Adds border and rounded corners. |
| `compact` | `boolean` | `false` | Reduces cell padding. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLTableElement>` | — | Ref forwarded to `<table>`. |

Plus all native `<table>` attributes.

### Sub-components

All sub-components extend their respective HTML element attributes and accept `className` and `ref`:

| Component | Element | Description |
|-----------|---------|-------------|
| `TableHeader` | `<thead>` | Table header section. |
| `TableBody` | `<tbody>` | Table body section. |
| `TableFooter` | `<tfoot>` | Table footer section. |
| `TableRow` | `<tr>` | Table row. |
| `TableHead` | `<th>` | Header cell. |
| `TableCell` | `<td>` | Data cell. |
| `TableCaption` | `<caption>` | Table caption / title. |

## Examples

### Basic

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Project A</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Project B</TableCell>
      <TableCell>Draft</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Striped and bordered

```tsx
<Table striped bordered>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

### Compact

```tsx
<Table compact>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

### With caption and footer

```tsx
<Table bordered>
  <TableCaption>Project overview</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Tasks</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alpha</TableCell>
      <TableCell>12</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell>12</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Accessibility

- Uses native HTML table elements — screen readers interpret structure automatically.
- `TableCaption` provides a visible title and is announced by screen readers.
- `TableHead` uses `<th>` — cells are announced as column/row headers.
- Ensure all tables have a `<thead>` for header context.
- For sortable columns, add `aria-sort="ascending" | "descending" | "none"` to `<TableHead>`.
- Responsive: on small screens, consider wrapping in a scrollable container rather than hiding columns.
