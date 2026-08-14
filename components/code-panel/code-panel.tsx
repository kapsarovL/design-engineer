"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./code-panel.module.scss";

interface CodePanelProps {
  open: boolean;
  title: string;
  source: string;
  onClose: () => void;
}

export function CodePanel({ open, title, source, onClose }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
  }, [source]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}
      <div
        className={`${styles.panel} ${open ? styles.panel__open : ""}`}
        role="dialog"
        aria-label={`${title} source code`}
      >
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
            >
              {copied ? "✓ Copied" : "⧉ Copy"}
            </button>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <pre className={styles.code}>
          <code>{source}</code>
        </pre>
      </div>
    </>
  );
}
