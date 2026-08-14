import type * as React from "react";
import styles from "./icon.module.scss";

const SPRITE_PATH = "/sprites/icons.svg#";

type IconSize = "sm" | "md" | "lg" | "xl";

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: IconSize;
}

export function Icon({
  name,
  size = "md",
  className,
  ref,
  ...props
}: IconProps & { ref?: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={ref}
      className={`${styles.icon} ${styles[`icon--${size}`]} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`${SPRITE_PATH}${name}`} />
    </svg>
  );
}
