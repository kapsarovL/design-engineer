"use client";

import { useMemo } from "react";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import { Progress } from "@/components/primitives/progress";
import { CompleteStep } from "./CompleteStep";
import styles from "./OnboardingFlow.module.scss";
import { PreferencesStep } from "./PreferencesStep";
import { ProfileStep } from "./ProfileStep";
import { STEP_LABELS, STEP_ORDER, useOnboardingStore } from "./store";
import { TeamStep } from "./TeamStep";
import { WelcomeStep } from "./WelcomeStep";

const stepComponents = {
  welcome: WelcomeStep,
  profile: ProfileStep,
  preferences: PreferencesStep,
  team: TeamStep,
  complete: CompleteStep,
} as const;

export function OnboardingFlow() {
  const { currentStep, isComplete, getStepIndex } = useOnboardingStore();

  const stepIndex = useMemo(
    () => getStepIndex(currentStep),
    [currentStep, getStepIndex],
  );
  const totalSteps = STEP_ORDER.length - 1; // exclude 'complete'
  const progress = isComplete ? 100 : (stepIndex / totalSteps) * 100;

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.progressWrapper}>
          <Progress value={progress} max={100} className={styles.progress} />
          <div className={styles.stepLabels}>
            {STEP_ORDER.filter((s) => s !== "complete").map((step, index) => (
              <span
                key={step}
                className={`${styles.stepLabel} ${
                  index < stepIndex
                    ? styles.completed
                    : index === stepIndex
                      ? styles.active
                      : ""
                }`}
              >
                {STEP_LABELS[step]}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <CurrentStepComponent />
      </main>

      {isComplete && (
        <footer className={styles.completionBanner}>
          <div className={styles.completionContent}>
            <Icon name="check" size="lg" className={styles.completionIcon} />
            <div>
              <p className={styles.completionTitle}>Setup Complete!</p>
              <p className={styles.completionDesc}>
                You're ready to start using Design Engineer.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <Icon name="arrow-left" /> Restart
          </Button>
        </footer>
      )}
    </div>
  );
}
