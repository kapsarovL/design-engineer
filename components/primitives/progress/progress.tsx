"use client";

import styles from "./progress.module.scss";

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  "aria-label"?: string;
}

export function Progress({
  value,
  max = 100,
  className,
  "aria-label": ariaLabel,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={`${styles.progress} ${className ?? ""}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      <div
        className={styles.progress__bar}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
