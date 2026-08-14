"use client";

import { createContext, use, useCallback, useMemo } from "react";
import { Icon } from "../icon/icon";
import styles from "./tag.module.scss";

/* ── Context ──────────────────────────────────────── */

interface TagGroupContextValue {
  onRemove?: (key: string) => void;
}

const TagGroupContext = createContext<TagGroupContextValue>({});

/* ── TagGroup ─────────────────────────────────────── */

interface TagGroupProps {
  children: React.ReactNode;
  onRemove?: (key: string) => void;
  className?: string;
}

export function TagGroup({ children, onRemove, className }: TagGroupProps) {
  const ctx = useMemo(() => ({ onRemove }), [onRemove]);
  return (
    <TagGroupContext value={ctx}>
      <div className={`${styles.tagGroup} ${className ?? ""}`}>{children}</div>
    </TagGroupContext>
  );
}

/* ── TagList ──────────────────────────────────────── */

interface TagListProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function TagList({ children, label, className }: TagListProps) {
  return (
    <div className={`${styles.tagList} ${className ?? ""}`}>
      {label && <span className={styles.tagList__label}>{label}</span>}
      <ul className={styles.tagList__items}>{children}</ul>
    </div>
  );
}

/* ── Tag ──────────────────────────────────────────── */

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "status" | "priority";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  ref?: React.Ref<HTMLLIElement>;
}

export function Tag({
  children,
  variant = "default",
  removable = false,
  onRemove,
  className,
  ref,
}: TagProps & { ref?: React.Ref<HTMLLIElement> }) {
  const _groupCtx = use(TagGroupContext);
  const handleRemove = useCallback(() => {
    onRemove?.();
  }, [onRemove]);

  return (
    <li
      ref={ref}
      className={`${styles.tag} ${styles[`tag--${variant}`]} ${className ?? ""}`}
    >
      <span className={styles.tag__label}>{children}</span>
      {removable && (
        <button
          type="button"
          className={styles.tag__dismiss}
          onClick={handleRemove}
          aria-label={`Remove ${children}`}
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </li>
  );
}

/* ── TagDismiss ───────────────────────────────────── */

interface TagDismissProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export function TagDismiss({
  onClick,
  label = "Remove",
  className,
}: TagDismissProps) {
  return (
    <button
      type="button"
      className={`${styles.tag__dismiss} ${className ?? ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon name="close" size="sm" />
    </button>
  );
}
