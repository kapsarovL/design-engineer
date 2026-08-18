import type React from "react";
import styles from "./input.module.scss";

type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  /** Error message shown below the input. Also applies error border. */
  error?: string;
  /** Helper text shown below the input. Hidden when error is present. */
  helper?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  inputSize = "md",
  error,
  helper,
  iconStart,
  iconEnd,
  className,
  disabled,
  id,
  ref,
  ...props
}: InputProps) {
  const hasError = Boolean(error);
  const helperId = id ? `${id}-helper` : undefined;
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.inputWrapper} ${hasError ? styles.errorState : ""}`}
      >
        {iconStart && <span className={styles.iconStart}>{iconStart}</span>}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helper ? helperId : undefined}
          className={[
            styles.input,
            styles[inputSize],
            hasError && styles.error,
            iconStart && styles.hasIconStart,
            iconEnd && styles.hasIconEnd,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {iconEnd && <span className={styles.iconEnd}>{iconEnd}</span>}
      </div>
      {hasError && (
        <p
          id={errorId}
          className={[styles.helper, styles.errorText].join(" ")}
          role="alert"
        >
          {error}
        </p>
      )}
      {!hasError && helper && (
        <p id={helperId} className={styles.helper}>
          {helper}
        </p>
      )}
    </div>
  );
}
