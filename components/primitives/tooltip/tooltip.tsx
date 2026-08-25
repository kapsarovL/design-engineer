"use client";

import React, { useId } from "react";
import styles from "./tooltip.module.scss";

type TooltipSide = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  className?: string;
}

export function Tooltip({
  text,
  children,
  side = "top",
  delay = 150,
  className,
}: TooltipProps) {
  const id = useId();
  const wrapperStyle = {
    "--tooltip-delay": `${delay}ms`,
  } as React.CSSProperties;

  const popup = (
    <span
      role="tooltip"
      id={id}
      className={`${styles.popup} ${styles[`popup--${side}`]}`}
    >
      {text}
    </span>
  );

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return (
      <span
        className={`${styles.wrapper} ${className ?? ""}`}
        style={wrapperStyle}
      >
        {React.cloneElement(child, {
          className: `${styles.trigger} ${child.props.className ?? ""}`.trim(),
          "aria-describedby": id,
        } as Record<string, unknown>)}
        {popup}
      </span>
    );
  }

  return (
    <span
      className={`${styles.wrapper} ${className ?? ""}`}
      style={wrapperStyle}
    >
      {children}
      {popup}
    </span>
  );
}
