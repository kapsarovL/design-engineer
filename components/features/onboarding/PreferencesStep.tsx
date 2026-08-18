"use client";

import { useCallback } from "react";
import { OnboardingStep } from "./OnboardingStep";
import { Select } from "@/components/primitives/select/select";
import { Switch } from "@/components/primitives/switch/switch";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import { useOnboardingStore, selectPreferencesData } from "./store";
import styles from "./PreferencesStep.module.scss";

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

const DIGEST_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "never", label: "Never" },
];

export function PreferencesStep() {
  const {
    updatePreferences,
    setFieldTouched,
    clearFieldError,
    validateStep,
    currentStep,
    nextStep,
    prevStep,
  } = useOnboardingStore();

  const preferences = useOnboardingStore(selectPreferencesData);

  const handleChange = useCallback(
    (field: keyof typeof preferences, value: string | boolean) => {
      updatePreferences({ [field]: value });
      clearFieldError(currentStep, field);
    },
    [updatePreferences, clearFieldError, currentStep],
  );

  const handleBlur = useCallback(
    (field: keyof typeof preferences) => {
      setFieldTouched(currentStep, field);
      validateStep(currentStep);
    },
    [setFieldTouched, validateStep, currentStep],
  );

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      nextStep();
    }
  }, [validateStep, currentStep, nextStep]);

  return (
    <OnboardingStep
      title="Preferences"
      description="Customize your experience with theme, notifications, and language settings."
      stepNumber={3}
      totalSteps={4}
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Appearance</h3>
          <div className={styles.field}>
            <label htmlFor="theme-select" className={styles.label}>
              Theme
            </label>
            <Select
              id="theme-select"
              placeholder="Select theme"
              value={preferences.theme || "system"}
              onChange={(e) => handleChange("theme", e.target.value)}
              onBlur={() => handleBlur("theme")}
              options={THEME_OPTIONS}
              size="lg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Notifications</h3>
          <div className={styles.toggleRow}>
            <div>
              <span className={styles.toggleLabel}>Email Notifications</span>
              <p className={styles.toggleDesc}>
                Receive product updates and announcements
              </p>
            </div>
            <Switch
              checked={preferences.notifications ?? true}
              onCheckedChange={(checked) =>
                handleChange("notifications", checked)
              }
              onBlur={() => handleBlur("notifications")}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="digest-select" className={styles.label}>
              Digest Frequency
            </label>
            <Select
              id="digest-select"
              placeholder="Select frequency"
              value={preferences.digestFrequency || "weekly"}
              onChange={(e) => handleChange("digestFrequency", e.target.value)}
              onBlur={() => handleBlur("digestFrequency")}
              options={DIGEST_OPTIONS}
              size="lg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Language</h3>
          <div className={styles.field}>
            <label htmlFor="language-select" className={styles.label}>
              Preferred Language
            </label>
            <Select
              id="language-select"
              placeholder="Select language"
              value={preferences.language || "en"}
              onChange={(e) => handleChange("language", e.target.value)}
              onBlur={() => handleBlur("language")}
              options={LANGUAGE_OPTIONS}
              size="lg"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={prevStep}>
            <Icon name="arrow-left" /> Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Continue <Icon name="arrow-right" />
          </Button>
        </div>
      </form>
    </OnboardingStep>
  );
}
