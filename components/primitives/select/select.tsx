"use client";

import { useId } from "react";
import { Icon } from "../icon/icon";
import styles from "./select.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Select({
  options,
  placeholder,
  label,
  size = "md",
  className,
  id,
  ref,
  ...props
}: SelectProps & { ref?: React.Ref<HTMLSelectElement> }) {
  const generatedId = useId();
  const selectId = id ?? props.name ?? generatedId;
  return (
    <div
      className={`${styles.select} ${styles[`select--${size}`]} ${className ?? ""}`}
    >
      {label && (
        <label htmlFor={selectId} className={styles.select__label}>
          {label}
        </label>
      )}
      <div className={styles.select__wrapper}>
        <select
          ref={ref}
          id={selectId}
          className={styles.select__native}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size="sm"
          className={styles.select__chevron}
        />
      </div>
    </div>
  );
}
