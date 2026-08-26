"use client";

import { createContext, use, useCallback, useState } from "react";
import styles from "./sidebar.module.scss";

/* ── Context ──────────────────────────────────────── */

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: true,
  toggle: () => {},
});

export function useSidebar() {
  return use(SidebarContext);
}

/* ── Provider ─────────────────────────────────────── */

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return (
    <SidebarContext value={{ open, toggle }}>
      <div className={styles.layout}>{children}</div>
    </SidebarContext>
  );
}

/* ── Root ─────────────────────────────────────────── */

interface SidebarProps {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

export function Sidebar({
  children,
  side = "left",
  className,
  ref,
}: SidebarProps) {
  const { open } = use(SidebarContext);
  return (
    <aside
      ref={ref}
      data-state={open ? "open" : "closed"}
      data-side={side}
      className={[styles.sidebar, !open && styles.sidebar__collapsed, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </aside>
  );
}

/* ── Trigger ──────────────────────────────────────── */

interface SidebarTriggerProps {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function SidebarTrigger({
  children = "☰",
  className,
  ref,
}: SidebarTriggerProps) {
  const { toggle } = use(SidebarContext);
  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      className={[styles.trigger, className].filter(Boolean).join(" ")}
      aria-label="Toggle sidebar"
    >
      {children}
    </button>
  );
}

/* ── Header ───────────────────────────────────────── */

interface SidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/* ── Content ──────────────────────────────────────── */

interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={[styles.content, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/* ── Footer ───────────────────────────────────────── */

interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div className={[styles.footer, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/* ── Group ────────────────────────────────────────── */

interface SidebarGroupProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function SidebarGroup({
  children,
  label,
  className,
}: SidebarGroupProps) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(" ")}>
      {label && <span className={styles.groupLabel}>{label}</span>}
      {children}
    </div>
  );
}

/* ── Item ─────────────────────────────────────────── */

interface SidebarItemProps {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  trailing?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
}

export function SidebarItem({
  children,
  active,
  href,
  icon,
  onClick,
  trailing,
  className,
  ref,
}: SidebarItemProps) {
  const rowClasses = [styles.item, active && styles.item__active, className]
    .filter(Boolean)
    .join(" ");

  const main = href ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={styles.itemMain}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemLabel}>{children}</span>
    </a>
  ) : (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={styles.itemMain}
      onClick={onClick}
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemLabel}>{children}</span>
    </button>
  );

  return (
    <div className={rowClasses}>
      {main}
      {trailing && <span className={styles.itemTrailing}>{trailing}</span>}
    </div>
  );
}

/* ── Separator ────────────────────────────────────── */

interface SidebarSeparatorProps {
  className?: string;
}

export function SidebarSeparator({ className }: SidebarSeparatorProps) {
  return (
    <hr className={[styles.separator, className].filter(Boolean).join(" ")} />
  );
}
