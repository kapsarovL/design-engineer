"use client";

import type { ReactNode } from "react";
import styles from "./OnboardingStep.module.scss";

export interface OnboardingStepProps {
  title: string;
  description: string;
  children: ReactNode;
  stepNumber?: number;
  totalSteps?: number;
}

export function OnboardingStep({
  title,
  description,
  children,
  stepNumber,
  totalSteps,
}: OnboardingStepProps) {
  return (
    <section className={styles.step} data-step={stepNumber}>
      <header className={styles.header}>
        {stepNumber !== undefined && totalSteps !== undefined && (
          <span className={styles.stepIndicator}>
            Step {stepNumber} of {totalSteps}
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
