export interface ComponentDoc {
  name: string;
  description: string;
  importPath: string;
  props: { name: string; type: string; default: string; description: string }[];
  examples: { label: string; code: string }[];
  accessibility: string[];
  keyboard?: { key: string; action: string }[];
}

export const docsData: ComponentDoc[] = [
  {
    name: "button",
    description:
      "Trigger an action or event, such as submitting a form, opening a dialog, or performing a delete operation.",
    importPath: "@/components/primitives/button/button",
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "destructive"',
        default: '"primary"',
        description: "Visual style variant",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "icon"',
        default: '"md"',
        description: "Button size",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Shows spinner and disables interaction",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        default: "—",
        description: "Icon element to render inside the button",
      },
      {
        name: "iconPosition",
        type: '"start" | "end"',
        default: '"start"',
        description: "Position of the icon relative to children",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Merges props onto child element instead of rendering a <button>",
      },
    ],
    examples: [
      {
        label: "Variants",
        code: `<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Delete</Button>`,
      },
      {
        label: "Sizes",
        code: `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`,
      },
      { label: "Loading", code: `<Button loading>Saving...</Button>` },
      {
        label: "With icon",
        code: `<Button icon={<PlusIcon />}>Add item</Button>`,
      },
    ],
    accessibility: [
      "Uses native <button> element for built-in keyboard and screen reader support",
      "Loading state sets aria-busy and disables the button",
      "Destructive variant does not change semantics — use Dialog for confirmation",
    ],
  },
  {
    name: "avatar",
    description:
      "Image with fallback, multiple sizes, and status indicators. Wraps an <img> with error handling.",
    importPath: "@/components/primitives/avatar/avatar",
    props: [
      { name: "src", type: "string", default: "—", description: "Image URL" },
      {
        name: "alt",
        type: "string",
        default: '""',
        description: "Alt text for the image",
      },
      {
        name: "fallback",
        type: "string",
        default: "—",
        description: "Text to show when image fails or is missing",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Avatar dimensions",
      },
      {
        name: "status",
        type: '"online" | "offline" | "away"',
        default: "—",
        description: "Status indicator dot",
      },
    ],
    examples: [
      {
        label: "Sizes",
        code: `<Avatar size="sm" alt="SM" />\n<Avatar size="md" alt="MD" />\n<Avatar size="lg" alt="LG" />`,
      },
      { label: "Fallback", code: `<Avatar fallback="AB" />` },
      { label: "Status", code: `<Avatar status="online" />` },
    ],
    accessibility: [
      " alt text is required for meaningful images",
      "Decorative avatars should use empty alt",
      "Fallback text is announced by screen readers",
    ],
  },
  {
    name: "input",
    description:
      "Text input with optional icon, error state, and size variants.",
    importPath: "@/components/primitives/input/input",
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Input height",
      },
      {
        name: "error",
        type: "boolean",
        default: "false",
        description: "Error styling and aria-invalid",
      },
      {
        name: "iconStart",
        type: "React.ReactNode",
        default: "—",
        description: "Icon at the start of the input",
      },
      {
        name: "iconEnd",
        type: "React.ReactNode",
        default: "—",
        description: "Icon at the end of the input",
      },
    ],
    examples: [
      {
        label: "Sizes",
        code: `<Input size="sm" placeholder="Small" />\n<Input size="md" placeholder="Medium" />\n<Input size="lg" placeholder="Large" />`,
      },
      {
        label: "With icons",
        code: `<Input iconStart={<SearchIcon />} placeholder="Search..." />`,
      },
      { label: "Error", code: `<Input error placeholder="Invalid" />` },
    ],
    accessibility: [
      "Uses native <input> with proper type attribute",
      "Error state sets aria-invalid",
      "Icons are decorative — hidden from screen readers",
    ],
  },
  {
    name: "label",
    description: "Form label with disabled state styling.",
    importPath: "@/components/primitives/label/label",
    props: [
      {
        name: "htmlFor",
        type: "string",
        default: "—",
        description: "Associates label with a form control",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Dimmed styling when associated control is disabled",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Label htmlFor="email">Email</Label>\n<Input id="email" />`,
      },
      { label: "Disabled", code: `<Label disabled>Name</Label>` },
    ],
    accessibility: [
      "Use htmlFor to associate with a form control",
      "Required fields should include indicator text, not color alone",
    ],
  },
  {
    name: "card",
    description:
      "Container for grouping related content with optional header, content, and footer sections.",
    importPath: "@/components/primitives/card/card",
    props: [
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "Card content",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n  </CardHeader>\n  <CardContent>Content here</CardContent>\n</Card>`,
      },
      {
        label: "With footer",
        code: `<Card>\n  <CardContent>Details</CardContent>\n  <CardFooter>\n    <Button>Action</Button>\n  </CardFooter>\n</Card>`,
      },
    ],
    accessibility: [
      "Uses semantic HTML — no special ARIA needed",
      "Interactive cards should use <button> or <a> as the clickable area",
    ],
  },
  {
    name: "tabs",
    description:
      "Tabbed interface for switching between content panels. Manages active tab state.",
    importPath: "@/components/primitives/tabs/tabs",
    props: [
      {
        name: "tabs",
        type: "{ title: string; value: string }[]",
        default: "—",
        description: "Array of tab definitions",
      },
      {
        name: "defaultValue",
        type: "string",
        default: "first tab value",
        description: "Initially selected tab",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Tabs\n  tabs={[\n    { title: "Tab A", value: "a" },\n    { title: "Tab B", value: "b" },\n  ]}\n/>`,
      },
    ],
    accessibility: [
      "Uses role=tablist, role=tab, and role=tabpanel",
      "Arrow keys navigate between tabs",
      "Tab panels are shown/hidden based on active tab",
    ],
    keyboard: [
      { key: "ArrowLeft", action: "Move to previous tab" },
      { key: "ArrowRight", action: "Move to next tab" },
      { key: "Home", action: "Move to first tab" },
      { key: "End", action: "Move to last tab" },
    ],
  },
  {
    name: "select",
    description:
      "Dropdown select with search, validation states, and grouped options.",
    importPath: "@/components/primitives/select/select",
    props: [
      {
        name: "options",
        type: "{ value: string; label: string }[]",
        default: "—",
        description: "List of options",
      },
      {
        name: "value",
        type: "string",
        default: "—",
        description: "Controlled selected value",
      },
      {
        name: "label",
        type: "string",
        default: "—",
        description: "Label text above the select",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Select..."',
        description: "Placeholder text",
      },
      {
        name: "error",
        type: "string",
        default: "—",
        description: "Error message to display",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the select",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Select\n  label="Country"\n  options={[{ value: "us", label: "US" }]}\n/>`,
      },
      { label: "Error", code: `<Select error="Required" options={[]} />` },
    ],
    accessibility: [
      "Uses native <select> for platform-native dropdown behavior",
      "Error message is linked via aria-describedby",
      "Label is associated with the select via htmlFor",
    ],
  },
  {
    name: "tooltip",
    description: "Hover/focus tooltip with configurable delay and positioning.",
    importPath: "@/components/primitives/tooltip/tooltip",
    props: [
      {
        name: "text",
        type: "string",
        default: "—",
        description: "Tooltip content",
      },
      {
        name: "delay",
        type: "number",
        default: "200",
        description: "Delay in ms before showing",
      },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        default: '"top"',
        description: "Position relative to trigger",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Tooltip text="Hello">\n  <Button>Hover me</Button>\n</Tooltip>`,
      },
      {
        label: "Custom delay",
        code: `<Tooltip text="Slow" delay={400}>\n  <Button>400ms</Button>\n</Tooltip>`,
      },
    ],
    accessibility: [
      "Uses role=tooltip with aria-describedby",
      "Trigger element receives aria-describedby pointing to the tooltip",
      "Tooltip is hidden from screen readers when not visible",
    ],
  },
  {
    name: "badge",
    description:
      "Status indicator, label, or counter with semantic color variants.",
    importPath: "@/components/primitives/badge/badge",
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "status"',
        default: '"default"',
        description: "Visual style",
      },
      {
        name: "type",
        type: '"info" | "warning" | "success" | "error" | "completed"',
        default: "—",
        description: "Semantic status (used with status variant)",
      },
    ],
    examples: [
      {
        label: "Variants",
        code: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Error</Badge>`,
      },
      {
        label: "Status",
        code: `<Badge variant="status" type="success">Active</Badge>`,
      },
    ],
    accessibility: [
      "Purely decorative badges should use aria-hidden",
      "Status badges convey meaning visually — ensure text alternative is available",
    ],
  },
  {
    name: "tag",
    description:
      "Dismissable label for filtering, categorization, or removable items.",
    importPath: "@/components/primitives/tag/tag",
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive"',
        default: '"default"',
        description: "Visual style",
      },
      {
        name: "onRemove",
        type: "() => void",
        default: "—",
        description: "Callback when dismiss button is clicked",
      },
      {
        name: "removable",
        type: "boolean",
        default: "false",
        description: "Shows dismiss button",
      },
    ],
    examples: [
      { label: "Basic", code: `<Tag>Filter</Tag>` },
      {
        label: "Removable",
        code: `<Tag removable onRemove={() => {}}>Close</Tag>`,
      },
    ],
    accessibility: [
      "Removable tags have an aria-label on the dismiss button",
      "Focus is managed — dismiss button is keyboard accessible",
    ],
  },
  {
    name: "dialog",
    description:
      "Modal dialog with overlay, header, body, footer, and focus trapping.",
    importPath: "@/components/primitives/dialog/dialog",
    props: [
      {
        name: "open",
        type: "boolean",
        default: "—",
        description: "Controlled open state",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        default: "—",
        description: "Callback when open state changes",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description:
          "Dialog content (DialogTitle, DialogBody, DialogFooter, DialogClose)",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Dialog open={open} onOpenChange={setOpen}>\n  <DialogTitle>Confirm</DialogTitle>\n  <DialogBody>\n    <p>Are you sure?</p>\n  </DialogBody>\n  <DialogFooter>\n    <DialogClose>Close</DialogClose>\n  </DialogFooter>\n</Dialog>`,
      },
    ],
    accessibility: [
      "Focus is trapped inside the dialog when open",
      "Escape key closes the dialog",
      "Clicking the overlay closes the dialog",
      "Focus returns to the trigger element on close",
      "Uses role=dialog and aria-modal=true",
    ],
    keyboard: [
      { key: "Escape", action: "Close the dialog" },
      { key: "Tab", action: "Move focus within the dialog (trapped)" },
    ],
  },
  {
    name: "form-field",
    description:
      "Form field wrapper with label, input, helper text, and error message composition.",
    importPath: "@/components/primitives/form-field/form-field",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description:
          "FormFieldLabel, FormFieldInput, FormFieldHelper, FormFieldError",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<FormField>\n  <FormFieldLabel>Email</FormFieldLabel>\n  <FormFieldInput placeholder="you@example.com" />\n</FormField>`,
      },
      {
        label: "With error",
        code: `<FormField>\n  <FormFieldLabel>Password</FormFieldLabel>\n  <FormFieldInput error />\n  <FormFieldError>Required</FormFieldError>\n</FormField>`,
      },
    ],
    accessibility: [
      "FormFieldLabel is associated with FormFieldInput via htmlFor/id",
      "Error messages are linked via aria-describedby",
      "Helper text is also linked via aria-describedby",
    ],
  },
  {
    name: "table",
    description:
      "Data table with header, body, and row components for structured content.",
    importPath: "@/components/primitives/table/table",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "TableHeader, TableBody, TableRow, TableHead, TableCell",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Value</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
      },
    ],
    accessibility: [
      "Uses semantic <table>, <thead>, <tbody>, <tr>, <th>, <td>",
      "TableHead cells use scope=col for screen readers",
      "Responsive overflow is handled via scroll container",
    ],
  },
  {
    name: "icon",
    description: "Icon primitive with named variants and consistent sizing.",
    importPath: "@/components/primitives/icon/icon",
    props: [
      {
        name: "name",
        type: "string",
        default: "—",
        description: "Icon identifier",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Icon dimensions",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        label: "Sizes",
        code: `<Icon name="home" size="sm" />\n<Icon name="home" size="md" />\n<Icon name="home" size="lg" />`,
      },
    ],
    accessibility: [
      "Decorative icons use aria-hidden=true",
      "Meaningful icons have a visible text label nearby",
    ],
  },
  {
    name: "separator",
    description: "Horizontal or vertical divider between content sections.",
    importPath: "@/components/primitives/separator/separator",
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Divider direction",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      { label: "Horizontal", code: `<Separator />` },
      {
        label: "Vertical",
        code: `<div style={{ display: "flex", gap: 16 }}>\n  <span>A</span>\n  <Separator orientation="vertical" style={{ height: 24 }} />\n  <span>B</span>\n</div>`,
      },
    ],
    accessibility: [
      "Uses role=separator with appropriate aria-orientation",
      "Purely decorative separators use aria-hidden",
    ],
  },
  {
    name: "toggle",
    description:
      "Pressable button toggle with on/off state, icon support, and size variants.",
    importPath: "@/components/primitives/toggle/toggle",
    props: [
      {
        name: "pressed",
        type: "boolean",
        default: "false",
        description: "Controlled pressed state",
      },
      {
        name: "onPressedChange",
        type: "(pressed: boolean) => void",
        default: "—",
        description: "Callback when pressed state changes",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Toggle size",
      },
      {
        name: "variant",
        type: '"default" | "outline"',
        default: '"default"',
        description: "Visual style",
      },
    ],
    examples: [
      {
        label: "Sizes",
        code: `<Toggle size="sm">S</Toggle>\n<Toggle size="md">M</Toggle>\n<Toggle size="lg">L</Toggle>`,
      },
      {
        label: "With icon",
        code: `<Toggle pressed={on} onPressedChange={setOn}>\n  <Icon name="home" />\n</Toggle>`,
      },
    ],
    accessibility: [
      "Uses role=button with aria-pressed for toggle state",
      "Keyboard: Enter or Space toggles the state",
    ],
    keyboard: [
      { key: "Enter", action: "Toggle pressed state" },
      { key: "Space", action: "Toggle pressed state" },
    ],
  },
  {
    name: "switch",
    description:
      "On/off switch with size variants and controlled/uncontrolled modes.",
    importPath: "@/components/primitives/switch/switch",
    props: [
      {
        name: "checked",
        type: "boolean",
        default: "false",
        description: "Controlled checked state",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        default: "—",
        description: "Callback when state changes",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Switch dimensions",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the switch",
      },
    ],
    examples: [
      {
        label: "Sizes",
        code: `<Switch size="sm" />\n<Switch size="md" />\n<Switch size="lg" />`,
      },
      {
        label: "Controlled",
        code: `<Switch checked={on} onCheckedChange={setOn} />`,
      },
    ],
    accessibility: [
      "Uses role=switch with aria-checked",
      "Keyboard: Enter or Space toggles the switch",
      "Label is associated via htmlFor/id or wrapping <label>",
    ],
    keyboard: [
      { key: "Enter", action: "Toggle switch" },
      { key: "Space", action: "Toggle switch" },
    ],
  },
  {
    name: "menu",
    description:
      "Keyboard-navigable menu with arrow key support, separators, and group labels.",
    importPath: "@/components/primitives/menu/menu",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "MenuItem, MenuSeparator, MenuGroup",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "—",
        description: "Callback when menu should close",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<Menu onClose={close}>\n  <MenuItem>Edit</MenuItem>\n  <MenuSeparator />\n  <MenuItem destructive>Delete</MenuItem>\n</Menu>`,
      },
    ],
    accessibility: [
      "Arrow keys navigate between items",
      "Escape closes the menu",
      "Each item is a focusable button",
      "Group labels use role=group with aria-label",
    ],
    keyboard: [
      { key: "ArrowDown", action: "Move to next item" },
      { key: "ArrowUp", action: "Move to previous item" },
      { key: "Home", action: "Move to first item" },
      { key: "End", action: "Move to last item" },
      { key: "Escape", action: "Close the menu" },
    ],
  },
  {
    name: "dropdown-menu",
    description:
      "Composes Menu with a trigger button, click-outside, and escape handling. Supports alignment options.",
    importPath: "@/components/primitives/dropdown-menu/dropdown-menu",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description:
          "DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        label: "Basic",
        code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button>Actions ▾</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem destructive>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      },
    ],
    accessibility: [
      "Trigger has aria-haspopup=true and aria-expanded",
      "Menu items are keyboard navigable via arrow keys",
      "Escape closes the menu and returns focus to trigger",
      "Click outside closes the menu",
    ],
    keyboard: [
      { key: "ArrowDown", action: "Move to next item" },
      { key: "ArrowUp", action: "Move to previous item" },
      { key: "Escape", action: "Close menu" },
    ],
  },
];
