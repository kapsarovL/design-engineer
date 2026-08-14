import { Tooltip as GeistTooltip } from "nextjs-components/src/components/tooltip";
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
  return (
    <GeistTooltip
      text={text}
      position={side}
      delayTime={delay}
      invert={false}
      tooltipClassName={styles.popup}
      className={`${styles.trigger} ${className ?? ""}`}
    >
      {children}
    </GeistTooltip>
  );
}
