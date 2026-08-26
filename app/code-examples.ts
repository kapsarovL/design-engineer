export interface CodeExample {
  title: string;
  source: string;
}

export const codeExamples: Record<string, CodeExample> = {
  button: {
    title: "Button",
    source: `import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";

// Variants
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Pill
<Button pill>Pill</Button>

// Leading + trailing icons
<Button icon={<Icon name="plus" size="sm" />}>New item</Button>
<Button variant="destructive" icon={<Icon name="trash" size="sm" />} iconPosition="end">
  Delete
</Button>
<Button trailingIcon={<Icon name="arrow-right" size="sm" />}>Continue</Button>

// Icon-only (needs aria-label)
<Button aria-label="Add" icon={<Icon name="plus" size="sm" />} />
<Button variant="ghost" aria-label="Settings" icon={<Icon name="settings" size="sm" />} />

// States
<Button disabled>Disabled</Button>
<Button loading>Saving…</Button>

// Polymorphic — merge onto an anchor
<Button asChild>
  <a href="/settings">Open settings</a>
</Button>`,
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
  accordion: {
    title: "Accordion",
    source: `import { Accordion, AccordionItem } from "@/components/primitives/accordion/accordion";

// Single-open, first item open by default
<Accordion type="single" defaultValue="a">
  <AccordionItem value="a" title="What is the design system?">
    <p>A token-driven, accessible React + SCSS component library.</p>
  </AccordionItem>
  <AccordionItem value="b" title="How do I theme it?">
    <p>Adjust accent, radius, and spacing tokens live in the playground.</p>
  </AccordionItem>
</Accordion>

// Multiple-open, with a disabled item
<Accordion type="multiple" defaultValue={["x"]}>
  <AccordionItem value="x" title="First">Content</AccordionItem>
  <AccordionItem value="y" title="Second">Content</AccordionItem>
  <AccordionItem value="z" title="Third" disabled>Content</AccordionItem>
</Accordion>`,
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
  switch: {
    title: "Switch",
    source: `import { Switch } from "@/components/primitives/switch/switch";

// Uncontrolled — manages its own state
<Switch defaultChecked />
<Switch defaultChecked={false} />

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} />

// Sizes: sm, md (default), lg
<Switch size="sm" />
<Switch size="lg" />

// With label
<Switch id="notifications" defaultChecked />
<label htmlFor="notifications">Notifications</label>

// Disabled
<Switch disabled />
<Switch disabled defaultChecked />`,
  },
  menu: {
    title: "Menu",
    source: `import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
} from "@/components/primitives/menu/menu";

// Basic
<Menu>
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
  <MenuSeparator />
  <MenuItem>Help</MenuItem>
</Menu>

// With groups
<Menu>
  <MenuGroup label="Account">
    <MenuItem>Profile</MenuItem>
    <MenuItem>Billing</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuGroup label="Actions">
    <MenuItem destructive>Sign out</MenuItem>
  </MenuGroup>
</Menu>`,
  },
  "dropdown-menu": {
    title: "DropdownMenu",
    source: `import { Button } from "@/components/primitives/button/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/primitives/dropdown-menu/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary" size="sm">Actions ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  "tag-group": {
    title: "TagGroup",
    source: `import {
  TagGroup,
  TagList,
  Tag,
} from "@/components/primitives/tag/tag";

// Basic group with variants
<TagGroup>
  <Tag>Default</Tag>
  <Tag variant="status">Status</Tag>
  <Tag variant="priority">Priority</Tag>
  <Tag removable onRemove={() => {}}>Removable</Tag>
</TagGroup>

// Labelled list
<TagList label="Filters">
  <Tag>React</Tag>
  <Tag>SCSS</Tag>
  <Tag removable onRemove={remove}>Draft</Tag>
</TagList>`,
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
  onboarding: {
    title: "Onboarding Flow",
    source: `import { OnboardingFlow } from "@/components/features/onboarding";

// Full onboarding flow with all steps
<OnboardingFlow />

// Or use individual steps with custom orchestration
import {
  WelcomeStep,
  ProfileStep,
  PreferencesStep,
  TeamStep,
  CompleteStep,
  useOnboardingStore,
} from "@/components/features/onboarding";

// Store provides:
// - useOnboardingStore() - full state + actions
// - selectProfileData, selectPreferencesData, selectTeamData
// - nextStep(), prevStep(), goToStep(step)
// - validateStep(step), completeOnboarding(), resetOnboarding()
// - Persists to localStorage automatically

// Custom step component example:
// <ProfileStep />
// <PreferencesStep />
// etc.`, // <-- End of onboarding source
  },
  progress: {
    title: "Progress",
    source: `import { Progress } from "@/components/primitives/progress/progress";

// Determinate (0-100)
<Progress value={35} aria-label="Setup progress" />
<Progress value={70} aria-label="Upload progress" />

// Custom maximum
<Progress value={3} max={4} aria-label="Step 3 of 4" />`,
  },
  sidebar: {
    title: "Sidebar",
    source: `import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
} from "@/components/primitives/sidebar/sidebar";
import { Icon } from "@/components/primitives/icon/icon";

<SidebarProvider>
  <Sidebar side="left">
    <SidebarHeader>Workspace</SidebarHeader>
    <SidebarContent>
      <SidebarItem active icon={<Icon name="home" />}>Home</SidebarItem>
      <SidebarItem icon={<Icon name="user" />}>Profile</SidebarItem>
      <SidebarItem icon={<Icon name="settings" />}>Settings</SidebarItem>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
  },
};
