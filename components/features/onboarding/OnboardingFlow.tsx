"use client";

import { useMemo } from "react";
import { Progress } from "@/components/primitives/progress";
import { WelcomeStep } from "./WelcomeStep";
import { ProfileStep } from "./ProfileStep";
import { PreferencesStep } from "./PreferencesStep";
import { TeamStep } from "./TeamStep";
import { CompleteStep } from "./CompleteStep";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import { useOnboardingStore, STEP_ORDER, STEP_LABELS } from "./store";
import styles from "./OnboardingFlow.module.scss";

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
