"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";
import styles from "./accordion.module.scss";

interface AccordionContextValue {
  open: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}

export function Accordion({
  type = "single",
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(() => {
    const initial = defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : [];
    return new Set(initial);
  });

  const toggle = (value: string) => {
    setOpen((prev) => {
      const next = new Set(type === "multiple" ? prev : []);
      if (prev.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div
        className={
          className ? `${styles.accordion} ${className}` : styles.accordion
        }
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export function AccordionItem({
  value,
  title,
  children,
  disabled = false,
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("AccordionItem must be used within an <Accordion>");
  }
  const isOpen = ctx.open.has(value);
  const reactId = useId();
  const triggerId = `accordion-trigger-${reactId}`;
  const panelId = `accordion-panel-${reactId}`;

  return (
    <div className={styles.item} data-state={isOpen ? "open" : "closed"}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => ctx.toggle(value)}
        >
          <span className={styles.triggerLabel}>{title}</span>
          <span className={styles.chevron} aria-hidden="true">
            ▾
          </span>
        </button>
      </h3>
      <section
        id={panelId}
        aria-labelledby={triggerId}
        className={styles.panel}
        hidden={!isOpen}
      >
        <div className={styles.panelInner}>{children}</div>
      </section>
    </div>
  );
}
