"use client";

import { useEffect, useRef } from "react";
import styles from "./dialog.module.scss";

/* ── Root ─────────────────────────────────────────── */

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (isOpen && !el.open) {
      el.showModal();
    } else if (!isOpen && el.open) {
      el.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleClose = () => onClose();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className={`${styles.dialog} ${className ?? ""}`}>
      {children}
    </dialog>
  );
}

/* ── Header ───────────────────────────────────────── */

export function DialogHeader({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) {
  return (
    <header
      ref={ref}
      className={`${styles.dialog__header} ${className ?? ""}`}
      {...props}
    >
      {children}
    </header>
  );
}

/* ── Title ────────────────────────────────────────── */

export function DialogTitle({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <h2
      ref={ref}
      className={`${styles.dialog__title} ${className ?? ""}`}
      {...props}
    >
      {children}
    </h2>
  );
}

/* ── Body ─────────────────────────────────────────── */

export function DialogBody({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`${styles.dialog__body} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Description ──────────────────────────────────── */

export function DialogDescription({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.Ref<HTMLParagraphElement>;
}) {
  return (
    <p
      ref={ref}
      className={`${styles.dialog__description} ${className ?? ""}`}
      {...props}
    >
      {children}
    </p>
  );
}

/* ── Footer ───────────────────────────────────────── */

export function DialogFooter({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) {
  return (
    <footer
      ref={ref}
      className={`${styles.dialog__footer} ${className ?? ""}`}
      {...props}
    >
      {children}
    </footer>
  );
}

/* ── Close ────────────────────────────────────────── */

export function DialogClose({
  className,
  children = "Close",
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.dialog__close} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
