"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/primitives/icon/icon";
import styles from "./command-palette.module.scss";

interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const ACTIONS: Command[] = [
  {
    id: "toggle-theme",
    label: "Toggle light / dark theme",
    group: "Actions",
    run: () => window.dispatchEvent(new CustomEvent("app:toggle-theme")),
  },
  {
    id: "open-playground",
    label: "Open theme playground",
    group: "Actions",
    run: () =>
      window.dispatchEvent(new CustomEvent("app:open-theme-playground")),
  },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [navCommands, setNavCommands] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const commands = useMemo(() => [...ACTIONS, ...navCommands], [navCommands]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, commands]);

  // On open: capture trigger, reset, and collect section targets from the DOM.
  useEffect(() => {
    if (!open) {
      (triggerRef.current as HTMLElement | null)?.focus?.();
      return;
    }
    triggerRef.current = document.activeElement;
    setQuery("");
    setActive(0);
    const nav: Command[] = [];
    document
      .querySelectorAll("[data-scroll-container] section[id]")
      .forEach((section) => {
        const id = section.id;
        if (!id || id === "hero") return;
        const heading = section.querySelector("h2");
        const label = heading?.textContent?.trim() || id;
        nav.push({
          id: `nav-${id}`,
          label: `Go to ${label}`,
          group: "Navigate",
          hint: id,
          run: () => {
            const el = document.getElementById(id);
            if (!el) return;
            const reduce = window.matchMedia?.(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            el.scrollIntoView({
              behavior: reduce ? "auto" : "smooth",
              block: "start",
            });
            el.setAttribute("tabindex", "-1");
            (el as HTMLElement).focus({ preventScroll: true });
          },
        });
      });
    setNavCommands(nav);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered, active]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(
        (i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) {
        cmd.run();
        onClose();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClose();
      }}
      aria-hidden={!open}
    >
      <div
        className={`${styles.palette} ${open ? styles.paletteOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        inert={open ? undefined : true}
      >
        <div className={styles.search}>
          <Icon name="search" size="sm" />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search components and actions…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={handleKeyDown}
            aria-label="Command palette search"
            aria-controls="command-list"
            aria-activedescendant={
              filtered[active] ? `cmd-${filtered[active].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <div
          id="command-list"
          className={styles.list}
          role="listbox"
          aria-label="Commands"
        >
          {filtered.length === 0 && (
            <div className={styles.empty}>No results</div>
          )}
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              id={`cmd-${cmd.id}`}
              role="option"
              aria-selected={i === active}
              tabIndex={-1}
              className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                cmd.run();
                onClose();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  cmd.run();
                  onClose();
                }
              }}
            >
              <span className={styles.itemLabel}>{cmd.label}</span>
              {cmd.hint && <span className={styles.itemHint}>{cmd.hint}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
