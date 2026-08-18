import type React from "react";
import styles from "./button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  trailingIcon?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  loading = false,
  icon,
  iconPosition = "start",
  trailingIcon,
  className,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  const isIconOnly = icon && !children && !trailingIcon;

  return (
    <button
      ref={ref}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        pill && styles.pill,
        isIconOnly && styles.iconOnly,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      data-loading={loading ? "" : undefined}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        icon &&
        iconPosition === "start" && <span aria-hidden="true">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && trailingIcon && (
        <span className={styles.iconWrap} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {!loading && icon && iconPosition === "end" && (
        <span aria-hidden="true">{icon}</span>
      )}
    </button>
  );
}
