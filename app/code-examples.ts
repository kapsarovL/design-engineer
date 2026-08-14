export interface CodeExample {
  title: string;
  source: string;
}

export const codeExamples: Record<string, CodeExample> = {
  button: {
    title: "Button",
    source: `import { Button } from "@/components/primitives/button/button";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>

// Icons
<Button variant="secondary" icon={<span>+</span>}>
  New Item
</Button>
<Button variant="destructive" icon={<span>✕</span>} iconPosition="end">
  Delete
</Button>
<Button variant="ghost" icon={<span>⚙</span>} aria-label="Settings" />`,
  },
  avatar: {
    title: "Avatar",
    source: `import { Avatar, AvatarGroup } from "@/components/primitives/avatar/avatar";

// Sizes
<Avatar size="sm" alt="SM" />
<Avatar size="md" alt="MD" />
<Avatar size="lg" alt="LG" />
<Avatar size="xl" alt="XL" />

// Status
<Avatar size="lg" alt="ON" status="online" />
<Avatar size="lg" alt="OFF" status="offline" />
<Avatar size="lg" alt="BUSY" status="busy" />

// Image + Fallback
<Avatar size="lg" src="https://..." alt="GitHub" />
<Avatar size="lg" src="broken-url" alt="Broken" fallback="BR" />

// Group
<AvatarGroup>
  <Avatar size="md" alt="A" />
  <Avatar size="md" alt="B" />
  <Avatar size="md" alt="+3" fallback="+3" />
</AvatarGroup>`,
  },
  "label-input": {
    title: "Label + Input",
    source: `import { Label } from "@/components/primitives/label/label";
import { Input } from "@/components/primitives/input/input";

// Sizes (inputSize to avoid native size conflict)
<Label htmlFor="sm" required>Small</Label>
<Input id="sm" inputSize="sm" placeholder="Small input" />

<Label htmlFor="md">Medium</Label>
<Input id="md" inputSize="md" placeholder="Medium input" />

// Error state
<Input id="err" error="This field is required" placeholder="Missing" />

// Disabled
<Input id="dis" disabled placeholder="Disabled" />

// Icons
<Input id="s" placeholder="Search…" iconStart={<span>🔍</span>} />
<Input id="e" placeholder="Email" iconEnd={<span>✓</span>} helper="Helper text" />`,
  },
  card: {
    title: "Card",
    source: `import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from "@/components/primitives/card/card";

// Full card with header, content, footer
<Card>
  <CardHeader>
    <CardTitle>Project Update</CardTitle>
    <CardDescription>Here's what changed.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Shipped 12 new components.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">View</Button>
  </CardFooter>
</Card>

// Interactive — lifts on hover
<Card interactive>
  <CardContent>Hoverable card</CardContent>
</Card>

// Minimal — just content
<Card>
  <CardContent>Simple surface</CardContent>
</Card>`,
  },
  tabs: {
    title: "Tabs",
    source: `import { Tabs } from "@/components/primitives/tabs/tabs";

// Default
<Tabs
  defaultValue="overview"
  tabs={[
    { title: "Overview", value: "overview" },
    { title: "Analytics", value: "analytics" },
    { title: "Settings", value: "settings" },
  ]}
/>

// With icons
<Tabs
  defaultValue="home"
  tabs={[
    { title: "Home", value: "home", icon: <span>🏠</span> },
    { title: "Search", value: "search", icon: <span>🔍</span> },
  ]}
/>

// Disabled
<Tabs defaultValue="a" disabled tabs={[...]} />`,
  },
  select: {
    title: "Select",
    source: `import { Select } from "@/components/primitives/select/select";

// With label + placeholder
<Select
  label="Pick one"
  size="small"
  placeholder="Select…"
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ]}
/>

// Pre-selected value
<Select
  label="Fruit"
  defaultValue="b"
  options={[
    { value: "a", label: "Apple" },
    { value: "b", label: "Banana" },
    { value: "c", label: "Cherry" },
  ]}
/>

// Large size
<Select label="Large" size="large" options={[...]} />

// Disabled
<Select label="Locked" disabled options={[{ value: "x", label: "X" }]} />`,
  },
  tooltip: {
    title: "Tooltip",
    source: `import { Tooltip } from "@/components/primitives/tooltip/tooltip";
import { Button } from "@/components/primitives/button/button";

// Positions
<Tooltip text="Top tooltip" side="top">
  <Button size="sm">Top</Button>
</Tooltip>
<Tooltip text="Right tooltip" side="right">
  <Button size="sm">Right</Button>
</Tooltip>
<Tooltip text="Bottom tooltip" side="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>
<Tooltip text="Left tooltip" side="left">
  <Button size="sm">Left</Button>
</Tooltip>

// Custom delay (ms)
<Tooltip text="Fast" delay={100}>
  <Button size="sm">100ms</Button>
</Tooltip>
<Tooltip text="Slow" delay={400}>
  <Button size="sm">400ms</Button>
</Tooltip>`,
  },
  badge: {
    title: "Badge",
    source: `import { Badge } from "@/components/primitives/badge/badge";

// Status
<Badge variant="status" type="todo">Todo</Badge>
<Badge variant="status" type="in_progress">In Progress</Badge>
<Badge variant="status" type="completed">Completed</Badge>
<Badge variant="status" type="in_review">In Review</Badge>

// Priority
<Badge variant="priority" type="low">Low</Badge>
<Badge variant="priority" type="medium">Medium</Badge>
<Badge variant="priority" type="high">High</Badge>
<Badge variant="priority" type="urgent">Urgent</Badge>

// Default
<Badge>v1.0.0</Badge>
<Badge type="shipped">Shipped</Badge>
<Badge type="beta">Beta</Badge>`,
  },
  dialog: {
    title: "Dialog",
    source: `import {
  Dialog, DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter, DialogClose,
} from "@/components/primitives/dialog/dialog";
import { Button } from "@/components/primitives/button/button";

// Open dialog via ref or state
<button onClick={() => dialogRef.current?.showModal()}>
  Open
</button>

// Compound structure
<dialog ref={dialogRef}>
  <DialogHeader>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogDescription>
      Are you sure? This cannot be undone.
    </DialogDescription>
  </DialogHeader>
  <DialogBody>
    <p>Dialog content here.</p>
  </DialogBody>
  <DialogFooter>
    <DialogClose>Cancel</DialogClose>
    <Button onClick={() => dialogRef.current?.close()}>
      Confirm
    </Button>
  </DialogFooter>
</dialog>`,
  },
  "form-field": {
    title: "FormField",
    source: `import {
  FormField, FormFieldLabel, FormFieldInput,
  FormFieldHelper, FormFieldError,
} from "@/components/primitives/form-field/form-field";

// Basic — auto-generated IDs, a11y wiring
<FormField>
  <FormFieldLabel>Name</FormFieldLabel>
  <FormFieldInput placeholder="Enter your name" />
  <FormFieldHelper>Your display name</FormFieldHelper>
</FormField>

// Required
<FormField>
  <FormFieldLabel required>Email</FormFieldLabel>
  <FormFieldInput placeholder="you@example.com" type="email" />
</FormField>

// Error state
<FormField invalid>
  <FormFieldLabel required>Username</FormFieldLabel>
  <FormFieldInput placeholder="Choose a username" />
  <FormFieldError>This field is required</FormFieldError>
</FormField>`,
  },
  table: {
    title: "Table",
    source: `import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from "@/components/primitives/table/table";

// Default with border
<Table bordered>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Button</TableCell>
      <TableCell>Shipped</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Striped + compact
<Table striped compact bordered>
  ...
</Table>`,
  },
  icon: {
    title: "Icon",
    source: `import { Icon } from "@/components/primitives/icon/icon";

// SVG sprite system — 16 available icons
<Icon name="check" />
<Icon name="close" />
<Icon name="plus" />
<Icon name="search" />
<Icon name="trash" />
<Icon name="settings" />

// Sizes: sm (0.875rem), md (1rem), lg (1.25rem), xl (1.5rem)
<Icon name="star" size="sm" />
<Icon name="star" size="md" />
<Icon name="star" size="lg" />
<Icon name="star" size="xl" />

// In context — uses currentColor for recoloring
<Button icon={<Icon name="plus" />}>Add Item</Button>
<Badge><Icon name="check" /> Shipped</Badge>`,
  },
  separator: {
    title: "Separator",
    source: `import { Separator } from "@/components/primitives/separator/separator";

// Horizontal (default)
<Separator />

// Vertical
<Separator orientation="vertical" />

// Decorative — removes role="separator" from a11y tree
<Separator decorative />

// In context — between buttons
<Button>Save</Button>
<Separator orientation="vertical" style={{ height: "1.25rem" }} />
<Button>Cancel</Button>`,
  },
  toggle: {
    title: "Toggle",
    source: `import { Toggle } from "@/components/primitives/toggle/toggle";
import { Icon } from "@/components/primitives/icon/icon";

// Uncontrolled — manages its own state
<Toggle>Toggle</Toggle>

// Controlled
<Toggle pressed={isBold} onPressedChange={setIsBold}>
  Bold
</Toggle>

// Sizes: sm, md (default), lg
<Toggle size="sm">Small</Toggle>
<Toggle size="lg">Large</Toggle>

// With icon
<Toggle pressed={isPinned} onPressedChange={setIsPinned}>
  <Icon name="check" size="sm" /> Pinned
</Toggle>

// Icon-only (needs aria-label)
<Toggle aria-label="Settings">
  <Icon name="settings" size="sm" />
</Toggle>`,
  },
  shadows: {
    title: "Shadows",
    source: `// Usage in SCSS
.card {
  box-shadow: var(--shadow-sm);
}
.card:hover {
  box-shadow: var(--shadow-md);
}
.dialog {
  box-shadow: var(--shadow-overlay);
}

// Usage in inline styles
<div style={{ boxShadow: "var(--shadow-lg)" }}>
  Elevated surface
</div>

// Focus rings
<input style={{ boxShadow: "var(--shadow-focus)" }} />

// Tokens: --shadow-sm, --shadow-md, --shadow-lg,
// --shadow-xl, --shadow-2xl, --shadow-focus,
// --shadow-focus-destructive, --shadow-inset, --shadow-overlay`,
  },
  colors: {
    title: "Color Tokens",
    source: `// Usage in SCSS
.badge--success {
  background-color: var(--color-success);
  color: var(--color-primary-text);
}
.alert--error {
  border-color: var(--color-error);
}

// Usage in inline styles
<div style={{ color: "var(--color-primary)" }}>
  Primary text
</div>
<div style={{ backgroundColor: "var(--color-primary-light)" }}>
  Light background
</div>

// Status colors
<Badge style={{ backgroundColor: "var(--color-status-todo-bg)" }}>
  Todo
</Badge>

// Dark mode — tokens auto-switch via .dark class
// All tokens defined in styles/tokens.scss`,
  },
  typography: {
    title: "Typography",
    source: `// Usage in SCSS
.heading {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
.code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

// Usage in inline styles
<h1 style={{
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-3xl)",
  fontWeight: "var(--weight-bold)",
}}>
  Page Title
</h1>
<p style={{
  fontSize: "var(--text-base)",
  lineHeight: "var(--leading-normal)",
}}>
  Body text at 15px with 1.5 line height.
</p>
<code style={{ fontFamily: "var(--font-mono)" }}>
  const x = 42;
</code>`,
  },
};
