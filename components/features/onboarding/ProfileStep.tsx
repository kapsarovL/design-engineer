"use client";

import { useCallback } from "react";
import { OnboardingStep } from "./OnboardingStep";
import {
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldTextarea,
  FormFieldHelper,
} from "@/components/primitives/form-field/form-field";
import { Select } from "@/components/primitives/select/select";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import { useOnboardingStore, selectProfileData } from "./store";
import styles from "./ProfileStep.module.scss";

const ROLES = [
  { value: "designer", label: "Designer" },
  { value: "developer", label: "Developer" },
  { value: "pm", label: "Product Manager" },
  { value: "founder", label: "Founder" },
  { value: "other", label: "Other" },
];

export function ProfileStep() {
  const {
    updateProfile,
    setFieldTouched,
    clearFieldError,
    validateStep,
    currentStep,
    nextStep,
    prevStep,
  } = useOnboardingStore();

  const profile = useOnboardingStore(selectProfileData);

  const handleChange = useCallback(
    (field: keyof typeof profile, value: string) => {
      updateProfile({ [field]: value });
      clearFieldError(currentStep, field);
    },
    [updateProfile, clearFieldError, currentStep],
  );

  const handleBlur = useCallback(
    (field: keyof typeof profile) => {
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
      title="Your Profile"
      description="Tell us about yourself so we can personalize your experience."
      stepNumber={2}
      totalSteps={4}
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <FormField>
          <FormFieldLabel required>Full Name</FormFieldLabel>
          <FormFieldInput
            placeholder="Alex Morgan"
            value={profile.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
          />
          <FormFieldHelper>This will be your display name</FormFieldHelper>
        </FormField>

        <FormField>
          <FormFieldLabel required>Email Address</FormFieldLabel>
          <FormFieldInput
            type="email"
            placeholder="alex@example.com"
            value={profile.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          <FormFieldHelper>We'll never share your email</FormFieldHelper>
        </FormField>

        <div className={styles.field}>
          <label htmlFor="role-select" className={styles.label}>
            Role <span className={styles.required}>*</span>
          </label>
          <Select
            id="role-select"
            placeholder="Select your role"
            value={profile.role || ""}
            onChange={(e) => handleChange("role", e.target.value)}
            onBlur={() => handleBlur("role")}
            options={ROLES}
            size="lg"
          />
        </div>

        <FormField>
          <FormFieldLabel>Bio (Optional)</FormFieldLabel>
          <FormFieldTextarea
            placeholder="Tell us a bit about yourself..."
            value={profile.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
          />
          <FormFieldHelper>Max 200 characters</FormFieldHelper>
        </FormField>

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
