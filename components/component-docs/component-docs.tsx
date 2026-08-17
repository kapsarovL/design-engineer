"use client";

import { useState } from "react";
import type { ComponentDoc } from "./data";
import styles from "./component-docs.module.scss";

/* ── Inline docs block shown after each component's code ────── */

interface ComponentDocsProps {
  doc: ComponentDoc;
}

export function ComponentDocs({ doc }: ComponentDocsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.compDocs}>
      <button
        type="button"
        className={styles.compDocsToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.compDocsIcon}>{open ? "▾" : "›"}</span>
        Docs
      </button>

      {open && (
        <div className={styles.compDocsBody}>
          {/* Description */}
          <p className={styles.compDocsDesc}>{doc.description}</p>

          {/* Import */}
          <div className={styles.compDocsImport}>
            <span className={styles.compDocsImportLabel}>Import</span>
            <code className={styles.compDocsImportCode}>
              {`import { ${doc.name} } from ${doc.importPath}`}
            </code>
          </div>

          {/* Props */}
          <h4 className={styles.compDocsHeading}>Props</h4>
          <div className={styles.compDocsTableWrap}>
            <table className={styles.compDocsTable}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {doc.props.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <code>{p.name}</code>
                    </td>
                    <td>
                      <code>{p.type}</code>
                    </td>
                    <td>
                      <code>{p.default}</code>
                    </td>
                    <td>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Examples */}
          <h4 className={styles.compDocsHeading}>Examples</h4>
          <div className={styles.compDocsExamples}>
            {doc.examples.map((ex) => (
              <div key={ex.label} className={styles.compDocsExample}>
                <span className={styles.compDocsExampleLabel}>{ex.label}</span>
                <pre className={styles.compDocsCode}>
                  <code>{ex.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Accessibility */}
          <h4 className={styles.compDocsHeading}>Accessibility</h4>
          <ul className={styles.compDocsA11yList}>
            {doc.accessibility.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          {/* Keyboard */}
          {doc.keyboard && doc.keyboard.length > 0 && (
            <>
              <h4 className={styles.compDocsHeading}>Keyboard</h4>
              <div className={styles.compDocsTableWrap}>
                <table className={styles.compDocsTable}>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.keyboard.map((k) => (
                      <tr key={k.key}>
                        <td>
                          <code>{k.key}</code>
                        </td>
                        <td>{k.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
