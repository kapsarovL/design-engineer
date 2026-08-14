import type React from "react";
import styles from "./label.module.scss";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Shows a red asterisk after the label text. */
  required?: boolean;
  ref?: React.Ref<HTMLLabelElement>;
}

export function Label({
  required = false,
  className,
  children,
  ref,
  ...props
}: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Primitive component — htmlFor is set at usage site
    <label
      ref={ref}
      className={[styles.label, required && styles.required, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {required && <span aria-hidden="true">*</span>}
    </label>
  );
}
