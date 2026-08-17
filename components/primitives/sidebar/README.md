# Sidebar

Collapsible navigation sidebar with header, content, footer, groups, and items. Uses context for open/close state.

## Import

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/primitives/sidebar/sidebar";
```

## Props

### SidebarProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `true` | Initial open state. |
| `children` | `React.ReactNode` | — | Layout containing Sidebar + main content. |

### Sidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"left" \| "right"` | `"left"` | Which side the sidebar attaches to. |
| `children` | `React.ReactNode` | — | Sidebar content. |
| `className` | `string` | — | Additional CSS class. |
| `ref` | `React.Ref<HTMLElement>` | — | Ref forwarded to `<aside>`. |

### SidebarTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `"☰"` | Trigger content. |
| `className` | `string` | — | Additional CSS class. |

### SidebarHeader, SidebarContent, SidebarFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Section content. |
| `className` | `string` | — | Additional CSS class. |

### SidebarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional group heading. |
| `children` | `React.ReactNode` | — | Group items. |
| `className` | `string` | — | Additional CSS class. |

### SidebarItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Item label. |
| `active` | `boolean` | `false` | Highlights as current page. |
| `href` | `string` | — | If provided, renders as `<a>`. Otherwise renders as `<button>`. |
| `icon` | `React.ReactNode` | — | Icon before the label. |
| `onClick` | `() => void` | — | Click handler (button mode only). |
| `className` | `string` | — | Additional CSS class. |

### SidebarSeparator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class. |

## Examples

### Basic layout

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <h2>My App</h2>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup label="Navigation">
        <SidebarItem href="/dashboard" active icon={<Icon name="home" />}>
          Dashboard
        </SidebarItem>
        <SidebarItem href="/settings" icon={<Icon name="settings" />}>
          Settings
        </SidebarItem>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarItem href="/logout">Sign out</SidebarItem>
    </SidebarFooter>
  </Sidebar>
  <main>
    <SidebarTrigger />
    {/* page content */}
  </main>
</SidebarProvider>
```

### Custom trigger

```tsx
<SidebarTrigger>
  <Icon name="menu" size="sm" />
</SidebarTrigger>
```

### Programmatic toggle

```tsx
function MyComponent() {
  const { open, toggle } = useSidebar();
  return <button onClick={toggle}>{open ? "Close" : "Open"}</button>;
}
```

## Accessibility

- Sidebar uses `<aside>` with `data-state="open" | "closed"` for CSS hooks.
- `SidebarTrigger` has `aria-label="Toggle sidebar"`.
- `SidebarItem` with `active` sets `aria-current="page"` on links.
- Link items (`href`) render as `<a>`; button items render as `<button>` — both are natively accessible.
- Focus management follows natural DOM order.
