import * as React from "react";
import styles from "./highlighted-text.module.scss";

interface HighlightedTextProps {
  text: string;
  highlight?: string;
}

export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  const query = highlight?.trim();
  if (!query) return <>{text}</>;

  // Capturing group => split() places matches at odd indices.
  // Avoids stateful regex.test() (lastIndex) misfires entirely.
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
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
