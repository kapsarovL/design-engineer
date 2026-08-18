"use client";

import type * as React from "react";
import styles from "./toggle.module.scss";

type ToggleSize = "sm" | "md" | "lg";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: ToggleSize;
}

export function Toggle({
  pressed = false,
  onPressedChange,
  size = "md",
  className,
  children,
  ref,
  ...props
}: ToggleProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      className={`${styles.toggle} ${styles[`toggle--${size}`]} ${pressed ? styles["toggle--active"] : ""} ${className ?? ""}`}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
}
