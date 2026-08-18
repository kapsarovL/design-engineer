"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";
import { Avatar, AvatarGroup } from "@/components/primitives/avatar/avatar";
import { Badge } from "@/components/primitives/badge/badge";
import { Button } from "@/components/primitives/button/button";
import { ComponentDocs } from "@/components/component-docs/component-docs";
import { docsData } from "@/components/component-docs/data";
import {
  FormField,
  FormFieldError,
  FormFieldHelper,
  FormFieldInput,
  FormFieldLabel,
} from "@/components/primitives/form-field/form-field";
import { Input } from "@/components/primitives/input/input";
import { Label } from "@/components/primitives/label/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/primitives/sidebar/sidebar";
import { Select } from "@/components/primitives/select/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table/table";
import { Tabs } from "@/components/primitives/tabs/tabs";
import { Tooltip } from "@/components/primitives/tooltip/tooltip";
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/primitives/dialog/dialog";
import { Icon } from "@/components/primitives/icon/icon";
import { Separator } from "@/components/primitives/separator/separator";
import { Toggle } from "@/components/primitives/toggle/toggle";
import { Switch } from "@/components/primitives/switch/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/primitives/dropdown-menu/dropdown-menu";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
} from "@/components/primitives/menu/menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/primitives/card/card";
import { OnboardingFlow } from "@/components/features/onboarding";
import { CodePanel } from "@/components/code-panel/code-panel";
import { codeExamples } from "./code-examples";
import styles from "./variables.module.scss";

const navItems = [
  { id: "button", label: "Button", icon: "◻" },
  { id: "avatar", label: "Avatar", icon: "●" },
  { id: "label-input", label: "Label + Input", icon: "◉" },
  { id: "card", label: "Card", icon: "▢" },
  { id: "tabs", label: "Tabs", icon: "≡" },
  { id: "select", label: "Select", icon: "▾" },
  { id: "tooltip", label: "Tooltip", icon: "💬" },
  { id: "badge", label: "Badge", icon: "◆" },
  { id: "dialog", label: "Dialog", icon: "◻" },
  { id: "form-field", label: "FormField", icon: "▤" },
  { id: "table", label: "Table", icon: "▥" },
  { id: "icon", label: "Icon", icon: "⚡" },
  { id: "typography", label: "Typography", icon: "Aa" },
  { id: "separator", label: "Separator", icon: "—" },
  { id: "toggle", label: "Toggle", icon: "◎" },
  { id: "switch", label: "Switch", icon: "◑" },
  { id: "menu", label: "Menu", icon: "☰" },
  { id: "dropdown-menu", label: "DropdownMenu", icon: "▾" },
  { id: "onboarding", label: "Onboarding", icon: "→" },
  { id: "shadows", label: "Shadows", icon: "▧" },
  { id: "colors", label: "Color Tokens", icon: "◈" },
];

const demoRows = [
  {
    name: "Button",
    status: "shipped" as const,
    variant: "Primary/Secondary/Ghost/Destructive",
  },
  { name: "Table", status: "shipped" as const, variant: "Composable 8-part" },
  {
    name: "Avatar",
    status: "shipped" as const,
    variant: "Sizes + Status + Group",
  },
  {
    name: "Input",
    status: "shipped" as const,
    variant: "Sizes + Error + Icons",
  },
  { name: "Label", status: "shipped" as const, variant: "Required indicator" },
  { name: "Badge", status: "shipped" as const, variant: "Status/Priority" },
  {
    name: "Dialog",
    status: "shipped" as const,
    variant: "Native <dialog> + compound parts",
  },
  { name: "Tooltip", status: "shipped" as const, variant: "nextjs-components" },
  { name: "Select", status: "shipped" as const, variant: "Native select" },
  {
    name: "Switch",
    status: "shipped" as const,
    variant: "Sizes + Controlled/Uncontrolled",
  },
  {
    name: "Menu",
    status: "shipped" as const,
    variant: "Arrow-key nav + Groups + Separators",
  },
  {
    name: "DropdownMenu",
    status: "shipped" as const,
    variant: "Composes Menu + Click-outside + Escape",
  },
  { name: "Tabs", status: "shipped" as const, variant: "ARIA roles" },
  { name: "TagGroup", status: "shipped" as const, variant: "Context-driven" },
  {
    name: "FormField",
    status: "shipped" as const,
    variant: "useFormField hook",
  },
  {
    name: "Sidebar",
    status: "shipped" as const,
    variant: "Provider + compound parts",
  },
];

const statusColors: Record<string, "completed" | "progress" | "todo"> = {
  shipped: "completed",
};

/* ── Showcase Content (memoized — no parent state) ── */
const ShowcaseContent = memo(function ShowcaseContent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const sections = container.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { root: container, threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    sections.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.pageScroll} data-scroll-container ref={scrollRef}>
      <div className={styles.sectionInner}>
        {/* ── Hero ─────────────────────────────────────── */}
        <section id="hero" className={styles.heroSection}>
          {/* Ambient glow behind hero */}
          <div
            className="ambientGlow ambientGlowPrimary"
            style={{
              top: "-80px",
              right: "-60px",
              width: "500px",
              height: "400px",
            }}
          />
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Design System v1.0</span>
            <h1 className={styles.heroTitle}>
              Component primitives built for
              <br />
              real product teams
            </h1>
            <p className={styles.heroSubtitle}>
              22 accessible components with compound APIs, SCSS Modules,
              four-theme token architecture, and a premium motion layer.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Button variant="primary" size="lg" icon={<span>→</span>}>
              Explore components
            </Button>
            <Button variant="ghost" size="lg">
              View tokens
            </Button>
          </div>
        </section>

        {/* ── Buttons ───────────────────────────────── */}
        <section id="button" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Button</h2>
          <p className={styles.sectionDesc}>
            Variants, sizes, loading states, and icon support.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Variants</span>
            <div className={styles.row}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.measureRow}>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>sm — 32px</span>
                <Button size="sm">Small</Button>
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>md — 36px</span>
                <Button size="md">Medium</Button>
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>lg — 40px</span>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                sm: h-2rem px-3 text-xs
              </span>
              <span className={styles.measureToken}>
                md: h-2.25rem px-4 text-sm
              </span>
              <span className={styles.measureToken}>
                lg: h-2.5rem px-5 text-base
              </span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>States</span>
            <div className={styles.row}>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Icon</span>
            <div className={styles.row}>
              <Button variant="secondary" icon={<span>+</span>}>
                New Item
              </Button>
              <Button
                variant="destructive"
                icon={<span>✕</span>}
                iconPosition="end"
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                icon={<span>⚙</span>}
                aria-label="Settings"
              />
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "button")!} />
        </section>

        {/* ── Avatar ────────────────────────────────── */}
        <section id="avatar" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Media
          </span>
          <h2 className={styles.sectionTitle}>Avatar</h2>
          <p className={styles.sectionDesc}>
            Image with error fallback, sizes, and status indicators.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.measureRow}>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>sm — 24px</span>
                <Avatar size="sm" alt="SM" />
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>md — 32px</span>
                <Avatar size="md" alt="MD" />
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>lg — 40px</span>
                <Avatar size="lg" alt="LG" />
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>xl — 56px</span>
                <Avatar size="xl" alt="XL" />
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>sm: 24×24</span>
              <span className={styles.measureToken}>md: 32×32</span>
              <span className={styles.measureToken}>lg: 40×40</span>
              <span className={styles.measureToken}>xl: 56×56</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Status</span>
            <div className={styles.row}>
              <Avatar size="lg" alt="ON" status="online" />
              <Avatar size="lg" alt="OFF" status="offline" />
              <Avatar size="lg" alt="BUSY" status="busy" />
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Image + Fallback</span>
            <div className={styles.row}>
              <Avatar
                size="lg"
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="GitHub"
              />
              <Avatar size="lg" alt="Broken" fallback="BR" />
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Group</span>
            <div className={styles.row}>
              <AvatarGroup>
                <Avatar size="md" alt="A" />
                <Avatar size="md" alt="B" />
                <Avatar size="md" alt="C" />
                <Avatar size="md" alt="+3" fallback="+3" />
              </AvatarGroup>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "avatar")!} />
        </section>

        {/* ── Label + Input ─────────────────────────── */}
        <section
          id="label-input"
          className={`${styles.showcaseSection} reveal`}
        >
          <h2 className={styles.sectionTitle}>Label + Input</h2>
          <p className={styles.sectionDesc}>
            Form controls with sizes, error states, helper text, and icon slots.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <Label htmlFor="size-sm" required>
                  Small
                </Label>
                <Input id="size-sm" inputSize="sm" placeholder="Small input" />
                <span className={styles.measureLabel}>
                  h-32px · px-3 · text-xs
                </span>
              </div>
              <div className={styles.formField}>
                <Label htmlFor="size-md">Medium</Label>
                <Input id="size-md" inputSize="md" placeholder="Medium input" />
                <span className={styles.measureLabel}>
                  h-36px · px-3 · text-sm
                </span>
              </div>
              <div className={styles.formField}>
                <Label htmlFor="size-lg">Large</Label>
                <Input id="size-lg" inputSize="lg" placeholder="Large input" />
                <span className={styles.measureLabel}>
                  h-40px · px-4 · text-base
                </span>
              </div>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>States</span>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <Label htmlFor="state-default">Default</Label>
                <Input id="state-default" placeholder="Type something…" />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="state-error">Error</Label>
                <Input
                  id="state-error"
                  error="This field is required"
                  placeholder="Missing value"
                />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="state-disabled">Disabled</Label>
                <Input
                  id="state-disabled"
                  disabled
                  placeholder="Disabled input"
                />
              </div>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Icons</span>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <Label htmlFor="icon-start">Search</Label>
                <Input
                  id="icon-start"
                  placeholder="Search…"
                  iconStart={<span>🔍</span>}
                />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="icon-end">Email</Label>
                <Input
                  id="icon-end"
                  placeholder="user@example.com"
                  iconEnd={<span>✓</span>}
                  helper="We'll never share your email"
                />
              </div>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "input")!} />
          <ComponentDocs doc={docsData.find((d) => d.name === "label")!} />
        </section>

        {/* ── Card ──────────────────────────────────── */}
        <section id="card" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Card</h2>
          <p className={styles.sectionDesc}>
            Compound component for content surfaces. Compose with{" "}
            <code className={styles.inlineCode}>CardHeader</code>,{" "}
            <code className={styles.inlineCode}>CardContent</code>, and{" "}
            <code className={styles.inlineCode}>CardFooter</code>.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <Card style={{ maxWidth: "24rem" }}>
              <CardHeader>
                <CardTitle>Project Update</CardTitle>
                <CardDescription>
                  Here's what changed in the latest release.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Shipped 12 new components, fixed 8 bugs, and improved build
                  performance by 40%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">
                  View Changelog
                </Button>
                <Button variant="ghost" size="sm">
                  Dismiss
                </Button>
              </CardFooter>
            </Card>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>header: py-6 px-6</span>
              <span className={styles.measureToken}>content: p-6</span>
              <span className={styles.measureToken}>footer: pb-6 px-6</span>
              <span className={styles.measureToken}>gap: 2 (0.5rem)</span>
              <span className={styles.measureToken}>radius: lg</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Interactive</span>
            <div className={styles.row}>
              <Card interactive style={{ maxWidth: "16rem" }}>
                <CardContent>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Hover me
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Interactive cards lift on hover.
                  </p>
                </CardContent>
              </Card>
              <Card interactive style={{ maxWidth: "16rem" }}>
                <CardContent>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Me too
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Shadow increases from sm to md.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>
              Minimal (no header/footer)
            </span>
            <Card style={{ maxWidth: "24rem" }}>
              <CardContent>
                <div
                  className={styles.row}
                  style={{ alignItems: "center", gap: "0.75rem" }}
                >
                  <Icon name="alert-circle" size="lg" />
                  <div>
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                      }}
                    >
                      Heads up
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      You have 3 unread notifications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "card")!} />
        </section>

        {/* ── Tabs ──────────────────────────────────── */}
        <section id="tabs" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Tabs</h2>
          <p className={styles.sectionDesc}>
            Controlled and uncontrolled tab navigation with ARIA roles.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <Tabs
              defaultValue="overview"
              tabs={[
                { title: "Overview", value: "overview" },
                { title: "Analytics", value: "analytics" },
                { title: "Settings", value: "settings" },
              ]}
            />
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                trigger: h-9 px-3 text-sm
              </span>
              <span className={styles.measureToken}>
                active: border-b-2 color-primary
              </span>
              <span className={styles.measureToken}>gap: 0</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Icons</span>
            <Tabs
              defaultValue="home"
              tabs={[
                { title: "Home", value: "home", icon: <span>🏠</span> },
                { title: "Search", value: "search", icon: <span>🔍</span> },
                {
                  title: "Profile",
                  value: "profile",
                  icon: <span>👤</span>,
                },
              ]}
            />
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Disabled</span>
            <Tabs
              defaultValue="a"
              disabled
              tabs={[
                { title: "Tab A", value: "a" },
                { title: "Tab B", value: "b" },
                { title: "Tab C", value: "c" },
              ]}
            />
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "tabs")!} />
        </section>

        {/* ── Select ────────────────────────────────── */}
        <section id="select" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Select</h2>
          <p className={styles.sectionDesc}>
            Native select with custom styling, sizes, and chevron icon.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.formRow}>
              <Select
                label="Small"
                size="sm"
                placeholder="Pick an option"
                options={[
                  { value: "a", label: "Option A" },
                  { value: "b", label: "Option B" },
                  { value: "c", label: "Option C" },
                ]}
              />
              <Select
                label="Large"
                size="lg"
                placeholder="Pick an option"
                options={[
                  { value: "x", label: "Choice X" },
                  { value: "y", label: "Choice Y" },
                  { value: "z", label: "Choice Z" },
                ]}
              />
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                sm: h-32px px-3 text-sm
              </span>
              <span className={styles.measureToken}>
                md: h-36px px-3 text-sm (default)
              </span>
              <span className={styles.measureToken}>
                lg: h-40px px-4 text-base
              </span>
              <span className={styles.measureToken}>radius: md</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>States</span>
            <div className={styles.formRow}>
              <Select
                label="Default"
                placeholder="Select…"
                options={[
                  { value: "1", label: "First" },
                  { value: "2", label: "Second" },
                  { value: "3", label: "Third" },
                ]}
              />
              <Select
                label="With value"
                defaultValue="b"
                options={[
                  { value: "a", label: "Apple" },
                  { value: "b", label: "Banana" },
                  { value: "c", label: "Cherry" },
                ]}
              />
              <Select
                label="Disabled"
                disabled
                options={[{ value: "x", label: "Locked" }]}
              />
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "select")!} />
        </section>

        {/* ── Tooltip ───────────────────────────────── */}
        <section id="tooltip" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Tooltip</h2>
          <p className={styles.sectionDesc}>
            Contextual hint on hover, wrapping{" "}
            <code className={styles.inlineCode}>nextjs-components</code> via
            deep import.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Positions</span>
            <div className={styles.row}>
              <Tooltip text="Top tooltip" side="top">
                <Button variant="secondary" size="sm">
                  Top
                </Button>
              </Tooltip>
              <Tooltip text="Right tooltip" side="right">
                <Button variant="secondary" size="sm">
                  Right
                </Button>
              </Tooltip>
              <Tooltip text="Bottom tooltip" side="bottom">
                <Button variant="secondary" size="sm">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip text="Left tooltip" side="left">
                <Button variant="secondary" size="sm">
                  Left
                </Button>
              </Tooltip>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>offset: 8px</span>
              <span className={styles.measureToken}>padding: 6px 10px</span>
              <span className={styles.measureToken}>radius: md</span>
              <span className={styles.measureToken}>fontSize: text-xs</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Custom Delay</span>
            <div className={styles.row}>
              <Tooltip text="Fast (100ms)" delay={100}>
                <Button size="sm">100ms</Button>
              </Tooltip>
              <Tooltip text="Default (150ms)">
                <Button size="sm">150ms</Button>
              </Tooltip>
              <Tooltip text="Slow (400ms)" delay={400}>
                <Button size="sm">400ms</Button>
              </Tooltip>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "tooltip")!} />
        </section>

        {/* ── Badge ─────────────────────────────────── */}
        <section id="badge" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Badge</h2>
          <p className={styles.sectionDesc}>
            Status, priority, and default badge variants.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Status</span>
            <div className={styles.row}>
              <Badge variant="status" type="todo">
                Todo
              </Badge>
              <Badge variant="status" type="in_progress">
                In Progress
              </Badge>
              <Badge variant="status" type="completed">
                Completed
              </Badge>
              <Badge variant="status" type="in_review">
                In Review
              </Badge>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Priority</span>
            <div className={styles.row}>
              <Badge variant="priority" type="low">
                Low
              </Badge>
              <Badge variant="priority" type="medium">
                Medium
              </Badge>
              <Badge variant="priority" type="high">
                High
              </Badge>
              <Badge variant="priority" type="urgent">
                Urgent
              </Badge>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <div className={styles.row}>
              <Badge>v1.0.0</Badge>
              <Badge type="shipped">Shipped</Badge>
              <Badge type="beta">Beta</Badge>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                h-24px · px-2 · text-xs
              </span>
              <span className={styles.measureToken}>radius: full (9999px)</span>
              <span className={styles.measureToken}>border: 1px solid</span>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "badge")!} />
          <ComponentDocs doc={docsData.find((d) => d.name === "tag")!} />
        </section>

        {/* ── Dialog ───────────────────────────────── */}
        <section id="dialog" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Dialog</h2>
          <p className={styles.sectionDesc}>
            Modal overlay using native{" "}
            <code className={styles.inlineCode}>&lt;dialog&gt;</code> element
            with backdrop, close button, and compound parts.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <div className={styles.row}>
              <Button
                variant="primary"
                onClick={() =>
                  (
                    document.getElementById("demo-dialog") as HTMLDialogElement
                  )?.showModal()
                }
              >
                Open Dialog
              </Button>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                backdrop: blur + 40% black
              </span>
              <span className={styles.measureToken}>padding: 1.5rem</span>
              <span className={styles.measureToken}>radius: lg</span>
              <span className={styles.measureToken}>focus-trap + Escape</span>
            </div>
            <dialog id="demo-dialog" className={styles.dialog}>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed? This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  This is a modal dialog built on the native{" "}
                  <code className={styles.inlineCode}>&lt;dialog&gt;</code>{" "}
                  element. It traps focus and supports Escape to close.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button
                  variant="primary"
                  onClick={() =>
                    (
                      document.getElementById(
                        "demo-dialog",
                      ) as HTMLDialogElement
                    )?.close()
                  }
                >
                  Confirm
                </Button>
              </DialogFooter>
            </dialog>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.row}>
              <Button
                variant="secondary"
                onClick={() =>
                  (
                    document.getElementById(
                      "demo-dialog-sm",
                    ) as HTMLDialogElement
                  )?.showModal()
                }
              >
                Small
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  (
                    document.getElementById(
                      "demo-dialog-lg",
                    ) as HTMLDialogElement
                  )?.showModal()
                }
              >
                Large
              </Button>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>default: max-w 32rem</span>
              <span className={styles.measureToken}>small: max-w 24rem</span>
              <span className={styles.measureToken}>large: max-w 48rem</span>
              <span className={styles.measureToken}>padding: 1.5rem</span>
              <span className={styles.measureToken}>radius: lg</span>
            </div>
            <dialog
              id="demo-dialog-sm"
              className={styles.dialog}
              style={{ maxWidth: "24rem" }}
            >
              <DialogHeader>
                <DialogTitle>Small Dialog</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  Max-width 24rem. Use for simple confirmations.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </dialog>
            <dialog
              id="demo-dialog-lg"
              className={styles.dialog}
              style={{ maxWidth: "48rem" }}
            >
              <DialogHeader>
                <DialogTitle>Large Dialog</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  Max-width 48rem. Use for forms or detailed content.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </dialog>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "dialog")!} />
        </section>

        {/* ── FormField ─────────────────────────────── */}
        <section id="form-field" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Forms
          </span>
          <h2 className={styles.sectionTitle}>FormField</h2>
          <p className={styles.sectionDesc}>
            Self-contained compound component with auto-generated IDs and a11y
            wiring.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Basic</span>
            <div className={styles.formRow}>
              <FormField>
                <FormFieldLabel>Name</FormFieldLabel>
                <FormFieldInput placeholder="Enter your name" />
                <FormFieldHelper>Your display name</FormFieldHelper>
              </FormField>
              <FormField>
                <FormFieldLabel required>Email</FormFieldLabel>
                <FormFieldInput placeholder="you@example.com" type="email" />
              </FormField>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                label: text-sm weight-medium
              </span>
              <span className={styles.measureToken}>
                input: h-36px px-3 text-sm
              </span>
              <span className={styles.measureToken}>
                helper: text-xs color-muted
              </span>
              <span className={styles.measureToken}>gap: 0.375rem</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Error State</span>
            <div className={styles.formRow}>
              <FormField invalid>
                <FormFieldLabel required>Username</FormFieldLabel>
                <FormFieldInput placeholder="Choose a username" />
                <FormFieldError>This field is required</FormFieldError>
              </FormField>
              <FormField>
                <FormFieldLabel>Bio</FormFieldLabel>
                <FormFieldInput placeholder="Tell us about yourself" />
                <FormFieldHelper>Max 160 characters</FormFieldHelper>
              </FormField>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "form-field")!} />
        </section>

        {/* ── Table ─────────────────────────────────── */}
        <section id="table" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Data Display
          </span>
          <h2 className={styles.sectionTitle}>Table</h2>
          <p className={styles.sectionDesc}>
            Composable data table with striped, bordered, and compact variants.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <div className={styles.tableWrap}>
              <Table bordered>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Badge variant="status" type={statusColors[row.status]}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.variant}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                cell: py-3 px-4 text-sm
              </span>
              <span className={styles.measureToken}>
                header: py-2 px-4 text-xs weight-semibold
              </span>
              <span className={styles.measureToken}>border: 1px solid</span>
              <span className={styles.measureToken}>row-hover: bg-surface</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Striped + Compact</span>
            <div className={styles.tableWrap}>
              <Table striped compact bordered>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>--shadow-sm</TableCell>
                    <TableCell>0 1px 2px 0 rgba(0,0,0,0.05)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>--shadow-lg</TableCell>
                    <TableCell>0 10px 15px -3px rgba(0,0,0,0.08)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>--shadow-2xl</TableCell>
                    <TableCell>0 25px 50px -12px rgba(0,0,0,0.25)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>--shadow-focus</TableCell>
                    <TableCell>0 0 0 3px rgba(0,96,209,0.3)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "table")!} />
        </section>

        {/* ── Icon ──────────────────────────────────── */}
        <section id="icon" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Content
          </span>
          <h2 className={styles.sectionTitle}>Icon</h2>
          <p className={styles.sectionDesc}>
            SVG sprite system with 4 sizes. Icons use{" "}
            <code className={styles.inlineCode}>currentColor</code> for easy
            recoloring.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Available Icons</span>
            <div className={styles.row}>
              {[
                "check",
                "close",
                "plus",
                "search",
                "arrow-right",
                "arrow-left",
                "chevron-down",
                "chevron-right",
                "alert-circle",
                "info",
                "trash",
                "edit",
                "settings",
                "user",
                "home",
                "loader",
              ].map((name) => (
                <div key={name} className={styles.iconDemo}>
                  <Icon name={name} size="lg" />
                  <span className={styles.iconLabel}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.row} style={{ alignItems: "flex-end" }}>
              <div className={styles.iconDemo}>
                <Icon name="star" size="sm" />
                <span className={styles.iconLabel}>sm</span>
              </div>
              <div className={styles.iconDemo}>
                <Icon name="star" size="md" />
                <span className={styles.iconLabel}>md</span>
              </div>
              <div className={styles.iconDemo}>
                <Icon name="star" size="lg" />
                <span className={styles.iconLabel}>lg</span>
              </div>
              <div className={styles.iconDemo}>
                <Icon name="star" size="xl" />
                <span className={styles.iconLabel}>xl</span>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>sm: 16×16</span>
              <span className={styles.measureToken}>md: 20×20</span>
              <span className={styles.measureToken}>lg: 24×24</span>
              <span className={styles.measureToken}>xl: 32×32</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>In Context</span>
            <div className={styles.row}>
              <Button variant="primary" icon={<Icon name="plus" />}>
                Add Item
              </Button>
              <Button variant="destructive" icon={<Icon name="trash" />}>
                Delete
              </Button>
              <Button
                variant="ghost"
                icon={<Icon name="settings" />}
                aria-label="Settings"
              />
              <Badge variant="status" type="completed">
                <Icon name="check" /> Shipped
              </Badge>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "icon")!} />
        </section>

        {/* ── Typography ────────────────────────────── */}
        <section id="typography" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Content
          </span>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.sectionDesc}>
            Type scale, weights, and font families — all token-driven.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Type Scale</span>
            <div className={styles.typeScale}>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-4xl</span>
                <span
                  style={{
                    fontSize: "var(--text-4xl)",
                    fontWeight: 700,
                    lineHeight: "var(--leading-tight)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Display
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-3xl</span>
                <span
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: 700,
                    lineHeight: "var(--leading-tight)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Heading 1
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-2xl</span>
                <span
                  style={{
                    fontSize: "var(--text-2xl)",
                    fontWeight: 600,
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  Heading 2
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-xl</span>
                <span
                  style={{
                    fontSize: "var(--text-xl)",
                    fontWeight: 600,
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  Heading 3
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-lg</span>
                <span style={{ fontSize: "var(--text-lg)", fontWeight: 500 }}>
                  Subheading
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-base</span>
                <span
                  style={{
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  Body text — the quick brown fox jumps over the lazy dog.
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-sm</span>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  Small — used for labels, captions, and helper text.
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--text-xs</span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    lineHeight: "var(--leading-normal)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  OVERLINE — UPPERCASE LABEL
                </span>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                8 steps: xs (12px) → 4xl (36px)
              </span>
              <span className={styles.measureToken}>scale ratio: ~1.25</span>
              <span className={styles.measureToken}>
                font: Jakarta Sans (sans) · Geist Mono
              </span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Weights</span>
            <div className={styles.typeScale}>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--weight-regular</span>
                <span style={{ fontWeight: 400, fontSize: "var(--text-lg)" }}>
                  Regular 400
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--weight-medium</span>
                <span style={{ fontWeight: 500, fontSize: "var(--text-lg)" }}>
                  Medium 500
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--weight-semibold</span>
                <span style={{ fontWeight: 600, fontSize: "var(--text-lg)" }}>
                  Semibold 600
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--weight-bold</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-lg)" }}>
                  Bold 700
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--weight-extrabold</span>
                <span style={{ fontWeight: 800, fontSize: "var(--text-lg)" }}>
                  Extrabold 800
                </span>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                5 weights: 400 · 500 · 600 · 700 · 800
              </span>
              <span className={styles.measureToken}>
                line-height: 1.5 (body)
              </span>
              <span className={styles.measureToken}>
                tracking: normal · tight · wide
              </span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Font Families</span>
            <div className={styles.typeScale}>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--font-sans</span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Jakarta Sans — The quick brown fox jumps over the lazy dog
                </span>
              </div>
              <div className={styles.typeRow}>
                <span className={styles.typeToken}>--font-mono</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Geist Mono — 0x4F6D7A const fn()
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Separator ────────────────────────────── */}
        <section id="separator" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Content
          </span>
          <h2 className={styles.sectionTitle}>Separator</h2>
          <p className={styles.sectionDesc}>
            Visual divider between content sections. Supports horizontal and
            vertical orientation.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Horizontal</span>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                margin: "0 0 0.75rem",
              }}
            >
              Content above the separator.
            </p>
            <Separator />
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                margin: "0.75rem 0 0",
              }}
            >
              Content below the separator.
            </p>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>height: 1px</span>
              <span className={styles.measureToken}>
                color: var(--color-border)
              </span>
              <span className={styles.measureToken}>width: 100%</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Vertical</span>
            <div className={styles.row} style={{ height: "2rem" }}>
              <span style={{ fontSize: "var(--text-sm)" }}>Left</span>
              <Separator orientation="vertical" />
              <span style={{ fontSize: "var(--text-sm)" }}>Center</span>
              <Separator orientation="vertical" />
              <span style={{ fontSize: "var(--text-sm)" }}>Right</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>In Context</span>
            <div className={styles.row}>
              <Button variant="primary" size="sm">
                Save
              </Button>
              <Separator orientation="vertical" style={{ height: "1.25rem" }} />
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Separator orientation="vertical" style={{ height: "1.25rem" }} />
              <Button variant="ghost" size="sm">
                Delete
              </Button>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "separator")!} />
        </section>

        {/* ── Toggle ───────────────────────────────── */}
        <section id="toggle" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Toggle</h2>
          <p className={styles.sectionDesc}>
            Two-state button with{" "}
            <code className={styles.inlineCode}>aria-pressed</code>. Use for
            toolbar actions like bold, italic, or pin.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <div className={styles.row}>
              <Toggle onPressedChange={() => {}}>Toggle</Toggle>
              <Toggle pressed onPressedChange={() => {}}>
                Pressed
              </Toggle>
              <Toggle disabled onPressedChange={() => {}}>
                Disabled
              </Toggle>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.measureRow}>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>sm — 32px</span>
                <Toggle size="sm" onPressedChange={() => {}}>
                  Small
                </Toggle>
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>md — 36px</span>
                <Toggle size="md" onPressedChange={() => {}}>
                  Medium
                </Toggle>
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>lg — 40px</span>
                <Toggle size="lg" onPressedChange={() => {}}>
                  Large
                </Toggle>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                sm: h-2rem px-2 text-xs
              </span>
              <span className={styles.measureToken}>
                md: h-2.25rem px-2.5 text-sm
              </span>
              <span className={styles.measureToken}>
                lg: h-2.5rem px-3 text-base
              </span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Icons</span>
            <div className={styles.row}>
              <Toggle onPressedChange={() => {}}>
                <Icon name="settings" size="sm" /> Settings
              </Toggle>
              <Toggle pressed onPressedChange={() => {}}>
                <Icon name="check" size="sm" /> Pinned
              </Toggle>
              <Toggle onPressedChange={() => {}}>
                <Icon name="edit" size="sm" /> Edit
              </Toggle>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Icon Only</span>
            <div className={styles.row}>
              <Toggle size="sm" onPressedChange={() => {}} aria-label="Bold">
                <Icon name="check" size="sm" />
              </Toggle>
              <Toggle
                size="md"
                onPressedChange={() => {}}
                aria-label="Settings"
              >
                <Icon name="settings" size="sm" />
              </Toggle>
              <Toggle size="lg" onPressedChange={() => {}} aria-label="Home">
                <Icon name="home" size="sm" />
              </Toggle>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "toggle")!} />
        </section>

        {/* ── Switch ───────────────────────────────── */}
        <section id="switch" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Primitives
          </span>
          <h2 className={styles.sectionTitle}>Switch</h2>
          <p className={styles.sectionDesc}>
            Toggle control with{" "}
            <code className={styles.inlineCode}>role="switch"</code> and{" "}
            <code className={styles.inlineCode}>aria-checked</code>. Use for
            binary settings like notifications, dark mode, or feature flags.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Default</span>
            <div className={styles.row}>
              <Switch defaultChecked={false} onCheckedChange={() => {}} />
              <Switch defaultChecked onCheckedChange={() => {}} />
              <Switch disabled onCheckedChange={() => {}} />
              <Switch disabled defaultChecked onCheckedChange={() => {}} />
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Sizes</span>
            <div className={styles.measureRow}>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>sm — 18px</span>
                <Switch size="sm" onCheckedChange={() => {}} />
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>md — 22px</span>
                <Switch size="md" onCheckedChange={() => {}} />
              </div>
              <div className={styles.measureItem}>
                <span className={styles.measureLabel}>lg — 26px</span>
                <Switch size="lg" onCheckedChange={() => {}} />
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>sm: 2rem × 1.125rem</span>
              <span className={styles.measureToken}>md: 2.5rem × 1.375rem</span>
              <span className={styles.measureToken}>lg: 3rem × 1.625rem</span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Label</span>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <div className={styles.row}>
                  <Switch id="notifications" onCheckedChange={() => {}} />
                  <Label htmlFor="notifications">Notifications</Label>
                </div>
              </div>
              <div className={styles.formField}>
                <div className={styles.row}>
                  <Switch
                    id="darkmode"
                    defaultChecked
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor="darkmode">Dark mode</Label>
                </div>
              </div>
              <div className={styles.formField}>
                <div className={styles.row}>
                  <Switch
                    id="disabled-switch"
                    disabled
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor="disabled-switch">Disabled</Label>
                </div>
              </div>
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "switch")!} />
        </section>

        {/* ── Menu ───────────────────────────────────── */}
        <section id="menu" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Navigation
          </span>
          <h2 className={styles.sectionTitle}>Menu</h2>
          <p className={styles.sectionDesc}>
            Reusable menu primitive with arrow-key navigation, separators, and
            groups. Used as the building block for DropdownMenu.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Basic</span>
            <div style={{ display: "flex", gap: "var(--space-6)" }}>
              <div style={{ position: "relative" }}>
                <Menu>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuSeparator />
                  <MenuItem>Help</MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Groups</span>
            <div style={{ position: "relative" }}>
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
            </div>
          </div>
          <ComponentDocs doc={docsData.find((d) => d.name === "menu")!} />
        </section>

        {/* ── DropdownMenu ────────────────────────────── */}
        <section
          id="dropdown-menu"
          className={`${styles.showcaseSection} reveal`}
        >
          <h2 className={styles.sectionTitle}>DropdownMenu</h2>
          <p className={styles.sectionDesc}>
            Composes Menu with a trigger button and click-outside/escape
            handling. Supports alignment options.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Basic</span>
            <div style={{ display: "flex", gap: "var(--space-4)" }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Actions ▾
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>With Destructive</span>
            <div style={{ display: "flex", gap: "var(--space-4)" }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <MenuSeparator />
                  <DropdownMenuItem destructive>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ComponentDocs
            doc={docsData.find((d) => d.name === "dropdown-menu")!}
          />
        </section>

        {/* ── Shadows ───────────────────────────────── */}
        <section id="shadows" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Tokens
          </span>
          <h2 className={styles.sectionTitle}>Shadows</h2>
          <p className={styles.sectionDesc}>
            Elevation scale from subtle to dramatic.
          </p>

          <div className={styles.shadowGrid}>
            {(["sm", "md", "lg", "xl", "2xl"] as const).map((level) => (
              <div
                key={level}
                className={styles.shadowCard}
                style={{ boxShadow: `var(--shadow-${level})` }}
              >
                <span className={styles.shadowLabel}>--shadow-{level}</span>
              </div>
            ))}
          </div>
          <div className={styles.measureTokens}>
            <span className={styles.measureToken}>sm: 0 1px 2px</span>
            <span className={styles.measureToken}>md: 0 4px 6px</span>
            <span className={styles.measureToken}>lg: 0 10px 15px</span>
            <span className={styles.measureToken}>xl: 0 20px 25px</span>
            <span className={styles.measureToken}>2xl: 0 25px 50px</span>
          </div>
        </section>

        {/* ── Color Tokens ──────────────────────────── */}
        <section id="colors" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Tokens
          </span>
          <h2 className={styles.sectionTitle}>Color Tokens</h2>
          <p className={styles.sectionDesc}>
            Semantic color system — primary, status, priority, and semantic
            palettes.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Primary</span>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <span className={styles.colorName}>primary</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-primary-hover)" }}
              >
                <span className={styles.colorName}>primary-hover</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-primary-light)" }}
              >
                <span className={styles.colorNameDark}>primary-light</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-primary-text)" }}
              >
                <span className={styles.colorName}>primary-text</span>
              </div>
            </div>
            <div className={styles.measureTokens}>
              <span className={styles.measureToken}>
                4 tints: base · hover · light · text
              </span>
              <span className={styles.measureToken}>
                dark mode: auto via prefers-color-scheme
              </span>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Semantic</span>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-success)" }}
              >
                <span className={styles.colorName}>success</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--color-success-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className={styles.colorNameDark}>success-bg</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-success-text)" }}
              >
                <span className={styles.colorName}>success-text</span>
              </div>
            </div>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-warning)" }}
              >
                <span className={styles.colorName}>warning</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--color-warning-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className={styles.colorNameDark}>warning-bg</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-warning-text)" }}
              >
                <span className={styles.colorName}>warning-text</span>
              </div>
            </div>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-error)" }}
              >
                <span className={styles.colorName}>error</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--color-error-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className={styles.colorNameDark}>error-bg</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-error-text)" }}
              >
                <span className={styles.colorName}>error-text</span>
              </div>
            </div>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-info)" }}
              >
                <span className={styles.colorName}>info</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--color-info-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className={styles.colorNameDark}>info-bg</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--color-info-text)" }}
              >
                <span className={styles.colorName}>info-text</span>
              </div>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Status</span>
            <div className={styles.colorRow}>
              {(["todo", "progress", "completed", "review"] as const).map(
                (s) => (
                  <div
                    key={s}
                    className={styles.statusChip}
                    style={{
                      backgroundColor: `var(--color-status-${s}-bg)`,
                      color: `var(--color-status-${s}-text)`,
                    }}
                  >
                    {s}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Priority</span>
            <div className={styles.colorRow}>
              {(["low", "medium", "high", "urgent"] as const).map((p) => (
                <div
                  key={p}
                  className={styles.statusChip}
                  style={{
                    backgroundColor: `var(--color-priority-${p}-bg)`,
                    color: `var(--color-priority-${p}-text)`,
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Input</span>
            <div className={styles.colorRow}>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                }}
              >
                <span className={styles.colorNameDark}>input-bg</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--input-border)" }}
              >
                <span className={styles.colorName}>input-border</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--input-border-focus)" }}
              >
                <span className={styles.colorName}>input-focus</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: "var(--input-placeholder)" }}
              >
                <span className={styles.colorName}>placeholder</span>
              </div>
              <div
                className={styles.colorSwatch}
                style={{
                  backgroundColor: "var(--input-disabled-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className={styles.colorNameDark}>disabled-bg</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Onboarding ──────────────────────────── */}
        <section id="onboarding" className={`${styles.showcaseSection} reveal`}>
          <span className="eyebrow">
            <span className="eyebrowDot"></span> Features
          </span>
          <h2 className={styles.sectionTitle}>Onboarding Flow</h2>
          <p className={styles.sectionDesc}>
            Multi-step onboarding with Zustand state management, validation,
            persistence, and compound step components.
          </p>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Live Demo</span>
            <div className={styles.onboardingWrapper}>
              <OnboardingFlow />
            </div>
          </div>

          <div className={styles.componentBlock}>
            <span className={styles.blockLabel}>Features</span>
            <ul className={styles.featureList}>
              <li>
                <strong>Zustand store</strong> with persist middleware for
                localStorage sync
              </li>
              <li>
                <strong>Step validation</strong> with inline error messages
              </li>
              <li>
                <strong>Navigation guards</strong> — can't proceed with invalid
                data
              </li>
              <li>
                <strong>Progress tracking</strong> with visual step indicator
              </li>
              <li>
                <strong>Compound components</strong> — Welcome, Profile,
                Preferences, Team, Complete
              </li>
              <li>
                <strong>Type-safe</strong> with TypeScript and Zod-ready
                validation
              </li>
            </ul>
          </div>
          {(() => {
            const onboardingDoc = docsData.find((d) => d.name === "onboarding");
            return onboardingDoc ? <ComponentDocs doc={onboardingDoc} /> : null;
          })()}
        </section>
      </div>
    </div>
  );
});

export default function Home() {
  const [panelId, setPanelId] = useState<string | null>(null);
  const [bw, setBw] = useState(false);

  const toggleBw = useCallback(() => {
    startTransition(() => {
      setBw((prev) => !prev);
    });
  }, []);

  /* Sync B&W class on <html> — separate from render */
  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("bw", bw);
  }, [bw]);

  const openPanel = useCallback((id: string) => {
    startTransition(() => {
      setPanelId(id);
    });
  }, []);

  const closePanel = useCallback(() => {
    startTransition(() => {
      setPanelId(null);
    });
  }, []);

  const panel = panelId ? codeExamples[panelId] : null;

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <span>⚡</span>
          <span>Design Engine</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Primitives">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={<span>{item.icon}</span>}
                onClick={() => openPanel(item.id)}
              >
                {item.label}
              </SidebarItem>
            ))}
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup label="Tokens">
            <SidebarItem
              icon={<span>▧</span>}
              onClick={() => openPanel("shadows")}
            >
              Shadows
            </SidebarItem>
            <SidebarItem
              icon={<span>◈</span>}
              onClick={() => openPanel("colors")}
            >
              Colors
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<span>v1.0</span>}>13 primitives</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <SidebarTrigger />
          <span className={styles.pageTitle}>Component Showcase</span>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "var(--space-2)",
              alignItems: "center",
            }}
          >
            <Button
              variant={bw ? "primary" : "ghost"}
              size="sm"
              onClick={toggleBw}
              className="magneticBtn"
            >
              {bw ? "◆ Color" : "○ B&W"}
            </Button>
          </div>
        </div>

        <ShowcaseContent />
      </main>

      <CodePanel
        open={!!panel}
        title={panel?.title ?? ""}
        source={panel?.source ?? ""}
        onClose={closePanel}
      />
    </SidebarProvider>
  );
}
