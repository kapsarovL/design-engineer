"use client";

import { useState } from "react";
import styles from "./tabs.module.scss";

interface Tab {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Tabs({
  tabs,
  defaultValue,
  value,
  onChange,
  disabled,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(
    defaultValue ?? tabs[0]?.value ?? "",
  );
  const active = value ?? internal;

  const handleChange = (val: string) => {
    if (disabled) return;
    setInternal(val);
    onChange?.(val);
  };

  return (
    <div role="tablist" className={`${styles.tabs} ${className ?? ""}`}>
      {tabs.map((tab) => {
        const isSelected = tab.value === active;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isSelected}
            aria-disabled={disabled}
            data-state={isSelected ? "active" : "inactive"}
            className={styles.tabs__trigger}
            onClick={() => handleChange(tab.value)}
          >
            {tab.icon && <span className={styles.tabs__icon}>{tab.icon}</span>}
            {tab.title}
          </button>
        );
      })}
    </div>
  );
}
