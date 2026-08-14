import type * as React from "react";
import styles from "./badge.module.scss";

export interface BadgeProps {
  variant?: "status" | "priority" | "default";
  type?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  type = "default",
  children,
  className,
}: BadgeProps) {
  const badgeClass = [
    styles.badge,
    styles[variant],
    type ? styles[type] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={badgeClass}>{children}</span>;
}
