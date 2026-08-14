"use client";

import { createContext, use, useId } from "react";
import styles from "./form-field.module.scss";

/* ── Context ──────────────────────────────────────── */

interface FormFieldContextValue {
  id: string;
  invalid: boolean;
  disabled: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  id: "",
  invalid: false,
  disabled: false,
});

export function useFormField() {
  return use(FormFieldContext);
}

/* ── Root ─────────────────────────────────────────── */

interface FormFieldProps {
  children: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  children,
  invalid = false,
  disabled = false,
  className,
}: FormFieldProps) {
  const id = useId();
  const ctx = { id, invalid, disabled };
  return (
    <FormFieldContext value={ctx}>
      <div className={`${styles.formField} ${className ?? ""}`}>{children}</div>
    </FormFieldContext>
  );
}

/* ── Label ────────────────────────────────────────── */

interface FormFieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormFieldLabel({
  children,
  required,
  className,
  ref,
  ...props
}: FormFieldLabelProps & { ref?: React.Ref<HTMLLabelElement> }) {
  const { id } = useFormField();
  return (
    <label
      ref={ref}
      htmlFor={`${id}-input`}
      className={`${styles.formField__label} ${className ?? ""}`}
      {...props}
    >
      {children}
      {required && <span className={styles.formField__required}>*</span>}
    </label>
  );
}

/* ── Input ────────────────────────────────────────── */

interface FormFieldInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {}

export function FormFieldInput({
  className,
  ref,
  ...props
}: FormFieldInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const { id, invalid, disabled } = useFormField();
  return (
    <input
      ref={ref}
      id={`${id}-input`}
      aria-describedby={invalid ? `${id}-error` : undefined}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={`${styles.formField__input} ${invalid ? styles["formField__input--invalid"] : ""} ${className ?? ""}`}
      {...props}
    />
  );
}

/* ── Textarea ─────────────────────────────────────── */

interface FormFieldTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {}

export function FormFieldTextarea({
  className,
  ref,
  ...props
}: FormFieldTextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const { id, invalid, disabled } = useFormField();
  return (
    <textarea
      ref={ref}
      id={`${id}-input`}
      aria-describedby={invalid ? `${id}-error` : undefined}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={`${styles.formField__input} ${styles["formField__input--textarea"]} ${invalid ? styles["formField__input--invalid"] : ""} ${className ?? ""}`}
      {...props}
    />
  );
}

/* ── HelperText ───────────────────────────────────── */

interface FormFieldHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormFieldHelper({
  children,
  className,
  ref,
  ...props
}: FormFieldHelperProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  const { id } = useFormField();
  return (
    <p
      ref={ref}
      id={`${id}-helper`}
      className={`${styles.formField__helper} ${className ?? ""}`}
      {...props}
    >
      {children}
    </p>
  );
}

/* ── Error ────────────────────────────────────────── */

interface FormFieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormFieldError({
  children,
  className,
  ref,
  ...props
}: FormFieldErrorProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  const { id, invalid } = useFormField();
  if (!invalid || !children) return null;
  return (
    <p
      ref={ref}
      id={`${id}-error`}
      role="alert"
      className={`${styles.formField__error} ${className ?? ""}`}
      {...props}
    >
      {children}
    </p>
  );
}
