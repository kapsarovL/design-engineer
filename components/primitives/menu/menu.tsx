"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type React from "react";
import styles from "./menu.module.scss";

/* ── Context ──────────────────────────────────────── */

interface MenuContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerItem: (el: HTMLElement) => void;
  unregisterItem: (el: HTMLElement) => void;
  close: () => void;
}

const MenuContext = createContext<MenuContextValue>({
  activeIndex: 0,
  setActiveIndex: () => {},
  registerItem: () => {},
  unregisterItem: () => {},
  close: () => {},
});

/* ── Menu (root) ──────────────────────────────────── */

export interface MenuProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Menu({ children, className, onClose }: MenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<HTMLElement[]>([]);

  const registerItem = useCallback((el: HTMLElement) => {
    if (!itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  }, []);

  const unregisterItem = useCallback((el: HTMLElement) => {
    const idx = itemRefs.current.indexOf(el);
    if (idx !== -1) itemRefs.current.splice(idx, 1);
  }, []);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const focusItem = useCallback((index: number) => {
    const items = itemRefs.current;
    if (items.length === 0) return;
    const clamped = ((index % items.length) + items.length) % items.length;
    items[clamped]?.focus();
    setActiveIndex(clamped);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusItem(activeIndex + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusItem(activeIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          focusItem(0);
          break;
        case "End":
          e.preventDefault();
          focusItem(itemRefs.current.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [activeIndex, focusItem, close],
  );

  return (
    <MenuContext
      value={{
        activeIndex,
        setActiveIndex,
        registerItem,
        unregisterItem,
        close,
      }}
    >
      <div
        role="menu"
        tabIndex={0}
        className={`${styles.menu} ${className ?? ""}`}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </MenuContext>
  );
}

/* ── MenuItem ─────────────────────────────────────── */

export interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
}

export function MenuItem({
  destructive = false,
  className,
  children,
  onClick,
  ...props
}: MenuItemProps) {
  const { setActiveIndex, registerItem, unregisterItem, close } =
    useContext(MenuContext);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerItem(el);
    return () => {
      unregisterItem(el);
    };
  }, [registerItem, unregisterItem]);

  const handleFocus = useCallback(() => {
    if (ref.current) {
      const parent = ref.current.closest("[role='menu']");
      if (!parent) return;
      const items = Array.from(
        parent.querySelectorAll<HTMLElement>("[role='menuitem']"),
      );
      const idx = items.indexOf(ref.current);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [setActiveIndex]);

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      data-destructive={destructive ? "" : undefined}
      className={`${styles.menu__item} ${destructive ? styles["menu__item--destructive"] : ""} ${className ?? ""}`}
      onFocus={handleFocus}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── MenuSeparator ────────────────────────────────── */

export interface MenuSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <hr className={`${styles.menu__separator} ${className ?? ""}`} {...props} />
  );
}

/* ── MenuGroup ────────────────────────────────────── */

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function MenuGroup({
  label,
  className,
  children,
  ...props
}: MenuGroupProps) {
  return (
    <div className={`${styles.menu__group} ${className ?? ""}`} {...props}>
      {label && (
        <div className={styles.menu__label} aria-hidden="true">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
