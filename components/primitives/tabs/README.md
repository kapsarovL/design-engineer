# Tabs

Tabbed navigation with controlled and uncontrolled modes. Renders only the tab list — content switching is handled by the consumer.

## Import

```tsx
import { Tabs } from "@/components/primitives/tabs/tabs";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | — | Array of tab definitions. |
| `defaultValue` | `string` | First tab's `value` | Initial active tab (uncontrolled). |
| `value` | `string` | — | Controlled active tab. |
| `onChange` | `(value: string) => void` | — | Called when active tab changes. |
| `disabled` | `boolean` | `false` | Disables all tabs. |
| `className` | `string` | — | Additional CSS class. |

### Tab type

```ts
interface Tab {
  title: string;       // Display text
  value: string;       // Unique identifier
  icon?: React.ReactNode; // Optional icon before title
}
```

## Examples

### Basic (uncontrolled)

```tsx
<Tabs
  tabs={[
    { title: "Overview", value: "overview" },
    { title: "Settings", value: "settings" },
    { title: "Members", value: "members" },
  ]}
/>
```

### With icons

```tsx
<Tabs
  tabs={[
    { title: "General", value: "general", icon: <Icon name="settings" size="sm" /> },
    { title: "Security", value: "security", icon: <Icon name="lock" size="sm" /> },
  ]}
/>
```

### Controlled

```tsx
const [tab, setTab] = useState("overview");

<Tabs
  tabs={[
    { title: "Overview", value: "overview" },
    { title: "Settings", value: "settings" },
  ]}
  value={tab}
  onChange={setTab}
/>

{/* Render content based on active tab */}
{tab === "overview" && <OverviewPanel />}
{tab === "settings" && <SettingsPanel />}
```

### Disabled

```tsx
<Tabs
  disabled
  tabs={[
    { title: "Active", value: "active" },
    { title: "Locked", value: "locked" },
  ]}
/>
```

## Accessibility

- Container uses `role="tablist"`.
- Each tab uses `role="tab"` with `aria-selected` and `data-state="active" | "inactive"`.
- `aria-disabled` communicates disabled state.
- Focus follows natural tab order.

### Content panel pairing

Since this component only renders the tab list, pair with content panels using `aria-labelledby`:

```tsx
const [tab, setTab] = useState("overview");

<>
  <Tabs tabs={tabs} value={tab} onChange={setTab} />
  <div role="tabpanel" aria-labelledby={`tab-${tab}`}>
    {/* content */}
  </div>
</>
```

## Keyboard

| Key | Action |
|-----|--------|
| `ArrowRight` | Next tab (expected browser behavior in `role="tablist"`) |
| `ArrowLeft` | Previous tab |
| `Home` | First tab |
| `End` | Last tab |
| `Enter` / `Space` | Select focused tab |
