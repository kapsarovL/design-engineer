import type * as React from "react";
import styles from "./separator.module.scss";

type SeparatorOrientation = "horizontal" | "vertical";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

export function Separator({
  orientation = "horizontal",
  decorative = false,
  className,
  ref,
  ...props
}: SeparatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      className={`${styles.separator} ${styles[`separator--${orientation}`]} ${className ?? ""}`}
      {...props}
    />
  );
}
