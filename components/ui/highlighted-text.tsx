import * as React from "react";
import styles from "./highlighted-text.module.scss";

interface HighlightedTextProps {
  text: string;
  highlight?: string;
}

export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  if (!highlight || !highlight.trim()) return <>{text}</>;

  const regex = new RegExp(`(${highlight.trim()})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className={styles.highlight}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}
