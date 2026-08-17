import type React from "react";
import styles from "./switch.module.scss";

type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state for uncontrolled usage. */
  defaultChecked?: boolean;
  /** Callback when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "md",
  disabled,
  className,
  ref,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : defaultChecked;

  const handleClick = () => {
    if (disabled) return;
    onCheckedChange?.(!isChecked);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      data-state={isChecked ? "on" : "off"}
      className={[
        styles.switch,
        styles[`switch--${size}`],
        isChecked && styles["switch--on"],
        disabled && styles["switch--disabled"],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      {...props}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
}
