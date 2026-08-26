"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./theme-playground.module.scss";

const STORAGE_KEY = "ds-theme-overrides";

const RADIUS_DEFAULTS: Record<string, number> = {
  "--radius-xs": 4,
  "--radius-sm": 6,
  "--radius-md": 8,
  "--radius-lg": 12,
  "--radius-xl": 16,
  "--radius-2xl": 20,
  "--radius-3xl": 24,
  "--radius-squircle": 32,
};

const SPACE_DEFAULTS: Record<string, number> = {
  "--space-0-5": 2,
  "--space-1": 4,
  "--space-1-5": 6,
  "--space-2": 8,
  "--space-3": 12,
  "--space-4": 16,
  "--space-5": 20,
  "--space-6": 24,
  "--space-8": 32,
  "--space-10": 40,
  "--space-12": 48,
  "--space-16": 64,
  "--space-20": 80,
  "--space-24": 96,
};

interface Controls {
  accent: string;
  radiusScale: number;
  spaceScale: number;
}

const DEFAULT_CONTROLS: Controls = {
  accent: "#0070f3",
  radiusScale: 1,
  spaceScale: 1,
};

function buildOverrides(c: Controls): Record<string, string> {
  const o: Record<string, string> = { "--color-primary": c.accent };
  for (const [k, base] of Object.entries(RADIUS_DEFAULTS)) {
    o[k] = `${Math.round(base * c.radiusScale)}px`;
  }
  for (const [k, base] of Object.entries(SPACE_DEFAULTS)) {
    o[k] = `${Math.round(base * c.spaceScale)}px`;
  }
  return o;
}

interface ThemePlaygroundProps {
  open: boolean;
  onClose: () => void;
}

export function ThemePlayground({ open, onClose }: ThemePlaygroundProps) {
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const skipApply = useRef(true);

  // Seed from saved state (or the computed accent) once on mount.
  useEffect(() => {
    const root = document.documentElement;
    const computed = getComputedStyle(root)
      .getPropertyValue("--color-primary")
      .trim();
    let saved: Controls | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw) as Controls;
    } catch {
      saved = null;
    }
    setControls(
      saved ?? {
        ...DEFAULT_CONTROLS,
        accent: computed || DEFAULT_CONTROLS.accent,
      },
    );
    skipApply.current = false;
  }, []);

  // Apply overrides + persist whenever controls change.
  useEffect(() => {
    if (skipApply.current) return;
    const root = document.documentElement;
    const ov = buildOverrides(controls);
    for (const [k, v] of Object.entries(ov)) root.style.setProperty(k, v);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [controls]);

  // Escape to close + focus management.
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 50);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      clearTimeout(focusTimer);
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    const css =
      ":root {\n" +
      Object.entries(buildOverrides(controls))
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n") +
      "\n}";
    await navigator.clipboard.writeText(css);
    setCopied(true);
  };

  const handleReset = () => {
    const root = document.documentElement;
    for (const k of Object.keys(buildOverrides(DEFAULT_CONTROLS))) {
      root.style.removeProperty(k);
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    skipApply.current = true;
    setControls(DEFAULT_CONTROLS);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-label="Theme playground"
        tabIndex={-1}
        inert={open ? undefined : true}
      >
        <div className={styles.header}>
          <span className={styles.title}>Theme Playground</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close theme playground"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="tp-accent">
              Accent color
            </label>
            <div className={styles.row}>
              <input
                id="tp-accent"
                type="color"
                className={styles.colorInput}
                value={controls.accent}
                onChange={(e) =>
                  setControls((c) => ({ ...c, accent: e.target.value }))
                }
              />
              <code className={styles.value}>{controls.accent}</code>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="tp-radius">
              Radius scale
            </label>
            <input
              id="tp-radius"
              type="range"
              min={0.5}
              max={2}
              step={0.05}
              className={styles.slider}
              style={{ accentColor: controls.accent }}
              value={controls.radiusScale}
              onChange={(e) =>
                setControls((c) => ({
                  ...c,
                  radiusScale: Number(e.target.value),
                }))
              }
            />
            <code className={styles.value}>
              {controls.radiusScale.toFixed(2)}×
            </code>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="tp-space">
              Spacing density
            </label>
            <input
              id="tp-space"
              type="range"
              min={0.5}
              max={1.5}
              step={0.05}
              className={styles.slider}
              style={{ accentColor: controls.accent }}
              value={controls.spaceScale}
              onChange={(e) =>
                setControls((c) => ({
                  ...c,
                  spaceScale: Number(e.target.value),
                }))
              }
            />
            <code className={styles.value}>
              {controls.spaceScale.toFixed(2)}×
            </code>
          </div>

          <p className={styles.hint}>
            Changes apply live and persist locally. Reset restores the default
            design tokens.
          </p>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="button" className={styles.copyBtn} onClick={handleCopy}>
            {copied ? "✓ Copied" : "⧉ Copy tokens"}
          </button>
        </div>
      </div>
    </>
  );
}
