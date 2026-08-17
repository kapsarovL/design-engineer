"use client";

import { OnboardingStep } from "./OnboardingStep";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import styles from "./WelcomeStep.module.scss";

export function WelcomeStep() {
  return (
    <OnboardingStep
      title="Welcome to Design Engineer"
      description="Let's get you set up in just a few steps. We'll customize your experience, connect your team, and get you ready to ship."
      stepNumber={1}
      totalSteps={4}
    >
      <div className={styles.illustration}>
        <Icon name="home" size="xl" />
      </div>

      <ul className={styles.features}>
        <li className={styles.feature}>
          <Icon name="check" size="sm" className={styles.featureIcon} />
          <span>Token-driven design system with SCSS</span>
        </li>
        <li className={styles.feature}>
          <Icon name="check" size="sm" className={styles.featureIcon} />
          <span>Accessible, composable React primitives</span>
        </li>
        <li className={styles.feature}>
          <Icon name="check" size="sm" className={styles.featureIcon} />
          <span>Dark mode, theming, and responsive by default</span>
        </li>
        <li className={styles.feature}>
          <Icon name="check" size="sm" className={styles.featureIcon} />
          <span>Type-safe with TypeScript and Zod validation</span>
        </li>
      </ul>

      <div className={styles.cta}>
        <Button variant="primary" size="lg" icon={<Icon name="arrow-right" />}>
          Get Started
        </Button>
      </div>
    </OnboardingStep>
  );
}
