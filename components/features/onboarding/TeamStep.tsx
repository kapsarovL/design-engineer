"use client";

import { useCallback, useState } from "react";
import { OnboardingStep } from "./OnboardingStep";
import {
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldHelper,
} from "@/components/primitives/form-field/form-field";
import { Select } from "@/components/primitives/select/select";
import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import { Tag } from "@/components/primitives/tag/tag";
import { Input } from "@/components/primitives/input/input";
import { useOnboardingStore, selectTeamData } from "./store";
import styles from "./TeamStep.module.scss";

const TEAM_SIZES = [
  { value: "1", label: "Just me" },
  { value: "2-5", label: "2–5 members" },
  { value: "6-20", label: "6–20 members" },
  { value: "21-50", label: "21–50 members" },
  { value: "50+", label: "50+ members" },
];

export function TeamStep() {
  const {
    updateTeam,
    setFieldTouched,
    clearFieldError,
    validateStep,
    currentStep,
    prevStep,
    completeOnboarding,
  } = useOnboardingStore();

  const team = useOnboardingStore(selectTeamData);
  const [inviteInput, setInviteInput] = useState("");
  const [inviteMembers, setInviteMembers] = useState<string[]>(
    team.inviteMembers || [],
  );

  const handleChange = useCallback(
    (field: keyof typeof team, value: string | string[]) => {
      updateTeam({ [field]: value } as Partial<typeof team>);
      clearFieldError(currentStep, field);
    },
    [updateTeam, clearFieldError, currentStep],
  );

  const handleBlur = useCallback(
    (field: keyof typeof team) => {
      setFieldTouched(currentStep, field);
      validateStep(currentStep);
    },
    [setFieldTouched, validateStep, currentStep],
  );

  const handleAddInvite = useCallback(() => {
    const email = inviteInput.trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (!inviteMembers.includes(email)) {
        const newMembers = [...inviteMembers, email];
        setInviteMembers(newMembers);
        handleChange("inviteMembers", newMembers);
      }
      setInviteInput("");
    }
  }, [inviteInput, inviteMembers, handleChange]);

  const handleRemoveInvite = useCallback(
    (email: string) => {
      const newMembers = inviteMembers.filter((m) => m !== email);
      setInviteMembers(newMembers);
      handleChange("inviteMembers", newMembers);
    },
    [inviteMembers, handleChange],
  );

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      completeOnboarding();
    }
  }, [validateStep, currentStep, completeOnboarding]);

  return (
    <OnboardingStep
      title="Your Team"
      description="Set up your team and invite collaborators to start working together."
      stepNumber={4}
      totalSteps={4}
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <FormField>
          <FormFieldLabel required>Team Name</FormFieldLabel>
          <FormFieldInput
            placeholder="Acme Design Co."
            value={team.teamName || ""}
            onChange={(e) => handleChange("teamName", e.target.value)}
            onBlur={() => handleBlur("teamName")}
          />
          <FormFieldHelper>This will be your workspace name</FormFieldHelper>
        </FormField>

        <div className={styles.field}>
          <label htmlFor="team-size-select" className={styles.label}>
            Team Size <span className={styles.required}>*</span>
          </label>
          <Select
            id="team-size-select"
            placeholder="Select team size"
            value={team.teamSize || ""}
            onChange={(e) => handleChange("teamSize", e.target.value)}
            onBlur={() => handleBlur("teamSize")}
            options={TEAM_SIZES}
            size="large"
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Invite Team Members (Optional)
          </h3>
          <p className={styles.sectionDesc}>
            Add collaborators by email. They'll receive an invitation to join
            your workspace.
          </p>

          <div className={styles.inviteInput}>
            <Input
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddInvite()}
              placeholder="colleague@example.com"
              inputSize="md"
            />
            <Button
              variant="secondary"
              onClick={handleAddInvite}
              disabled={!inviteInput.trim()}
            >
              Add
            </Button>
          </div>

          {inviteMembers.length > 0 && (
            <div className={styles.inviteList}>
              {inviteMembers.map((email) => (
                <Tag
                  key={email}
                  variant="default"
                  removable
                  onRemove={() => handleRemoveInvite(email)}
                  className={styles.inviteTag}
                >
                  {email}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={prevStep}>
            <Icon name="arrow-left" /> Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Complete Setup <Icon name="check" />
          </Button>
        </div>
      </form>
    </OnboardingStep>
  );
}
