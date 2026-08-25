"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "../menu/menu";
import styles from "./dropdown-menu.module.scss";

/* ── Context ──────────────────────────────────────── */

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

import { createContext, use } from "react";

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  open: false,
  setOpen: () => {},
});

/* ── Root ─────────────────────────────────────────── */

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuContext value={{ open, setOpen }}>
      <div className={`${styles.dropdown} ${className ?? ""}`}>{children}</div>
    </DropdownMenuContext>
  );
}

/* ── Trigger ──────────────────────────────────────── */

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export function DropdownMenuTrigger({
  children,
  asChild,
  className,
}: DropdownMenuTriggerProps) {
  const { open, setOpen } = use(DropdownMenuContext);
  const ref = useRef<HTMLButtonElement>(null);

  const triggerProps = {
    ref,
    type: "button" as const,
    "aria-expanded": open,
    "aria-haspopup": "true" as const,
    "data-state": open ? "open" : "closed",
    className: `${styles.dropdown__trigger} ${className ?? ""}`,
    onClick: () => setOpen((o) => !o),
  };

  if (asChild) {
    const child = children as React.ReactElement;
    return React.cloneElement(child, triggerProps as Record<string, unknown>);
  }

  return <button {...triggerProps}>{children}</button>;
}

/* ── Content ──────────────────────────────────────── */

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export function DropdownMenuContent({
  children,
  className,
  align = "end",
}: DropdownMenuContentProps) {
  const { open, setOpen } = use(DropdownMenuContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    },
    [setOpen],
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleClickOutside, handleEscape]);

  if (!open) return null;

  const alignClass =
    align === "start"
      ? styles["dropdown__content--start"]
      : align === "center"
        ? styles["dropdown__content--center"]
        : "";

  return (
    <div
      ref={ref}
      className={`${styles.dropdown__content} ${alignClass} ${className ?? ""}`}
    >
      <Menu onClose={() => setOpen(false)} className={styles.dropdown__menu}>
        {children}
      </Menu>
    </div>
  );
}

/* ── Item (re-exports MenuItem with same API) ─────── */

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  className?: string;
}

export function DropdownMenuItem({
  children,
  onClick,
  destructive,
  className,
}: DropdownMenuItemProps) {
  return (
    <MenuItem destructive={destructive} className={className} onClick={onClick}>
      {children}
    </MenuItem>
  );
}
