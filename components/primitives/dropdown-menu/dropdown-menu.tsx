"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  className?: string;
}

export function DropdownMenuTrigger({
  children,
  className,
}: DropdownMenuTriggerProps) {
  const { open, setOpen } = use(DropdownMenuContext);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-haspopup="true"
      className={`${styles.dropdown__trigger} ${className ?? ""}`}
      onClick={() => setOpen((o) => !o)}
    >
      {children}
    </button>
  );
}

/* ── Content ──────────────────────────────────────── */

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuContent({
  children,
  className,
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

  return (
    <div
      ref={ref}
      role="menu"
      className={`${styles.dropdown__content} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ── Item ─────────────────────────────────────────── */

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
  const { setOpen } = use(DropdownMenuContext);

  return (
    <button
      type="button"
      role="menuitem"
      className={`${styles.dropdown__item} ${destructive ? styles["dropdown__item--destructive"] : ""} ${className ?? ""}`}
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
