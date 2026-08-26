"use client";

import Image from "next/image";
import type React from "react";
import { useCallback, useState } from "react";
import styles from "./avatar.module.scss";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "offline" | "busy";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  ref?: React.Ref<HTMLSpanElement>;
}

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  status,
  className,
  ref,
  ...props
}: AvatarProps) {
  const [imgError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const showImage = src && !imgError;
  const initials = fallback ?? alt.slice(0, 2);

  return (
    <span
      ref={ref}
      className={[styles.avatar, styles[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="64px"
          className={styles.image}
          onError={handleImageError}
        />
      ) : (
        <span className={styles.fallback}>{initials}</span>
      )}
      {status && (
        <span
          className={[
            styles.status,
            styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`],
          ].join(" ")}
          title={`Status: ${status}`}
        />
      )}
    </span>
  );
}

/* ── Avatar Group ─────────────────────────────────── */

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export function AvatarGroup({
  className,
  children,
  ref,
  ...props
}: AvatarGroupProps) {
  return (
    <div
      ref={ref}
      className={[styles.group, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
