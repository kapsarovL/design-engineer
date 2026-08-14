import type * as React from "react";
import styles from "./card.module.scss";

/* ── Card ─────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({
  interactive = false,
  className,
  children,
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`${styles.card} ${interactive ? styles["card--interactive"] : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardHeader ───────────────────────────────────── */

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  className,
  children,
  ref,
  ...props
}: CardHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`${styles.card__header} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardTitle ────────────────────────────────────── */

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  className,
  children,
  ref,
  ...props
}: CardTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) {
  return (
    <h3
      ref={ref}
      className={`${styles.card__title} ${className ?? ""}`}
      {...props}
    >
      {children}
    </h3>
  );
}

/* ── CardDescription ──────────────────────────────── */

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({
  className,
  children,
  ref,
  ...props
}: CardDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={`${styles.card__description} ${className ?? ""}`}
      {...props}
    >
      {children}
    </p>
  );
}

/* ── CardContent ──────────────────────────────────── */

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  className,
  children,
  ref,
  ...props
}: CardContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`${styles.card__content} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardFooter ───────────────────────────────────── */

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  className,
  children,
  ref,
  ...props
}: CardFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`${styles.card__footer} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
