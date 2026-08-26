"use client";

import { Button } from "@/components/primitives/button/button";
import { Icon } from "@/components/primitives/icon/icon";
import styles from "./CompleteStep.module.scss";
import { OnboardingStep } from "./OnboardingStep";
import {
  selectPreferencesData,
  selectProfileData,
  selectTeamData,
  useOnboardingStore,
} from "./store";

export function CompleteStep() {
  const { resetOnboarding } = useOnboardingStore();
  const profile = useOnboardingStore(selectProfileData);
  const preferences = useOnboardingStore(selectPreferencesData);
  const team = useOnboardingStore(selectTeamData);

  const handleRestart = () => {
    resetOnboarding();
  };

  const handleGoToDashboard = () => {
    // In a real app this would route to the dashboard.
  };

  return (
    <OnboardingStep
      title="You're All Set!"
      description="Your workspace is ready. Here's a summary of your setup."
    >
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Icon name="user" size="lg" />
          </div>
          <div className={styles.summaryContent}>
            <h3 className={styles.summaryTitle}>Profile</h3>
            <p className={styles.summaryValue}>
              {profile.fullName || "Not set"}
            </p>
            <p className={styles.summarySubValue}>
              {profile.email || "Not set"}
            </p>
            <p className={styles.summarySubValue}>
              {profile.role || "Not set"}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Icon name="settings" size="lg" />
          </div>
          <div className={styles.summaryContent}>
            <h3 className={styles.summaryTitle}>Preferences</h3>
            <p className={styles.summaryValue}>
              {preferences.theme === "system" ? "System" : preferences.theme}
            </p>
            <p className={styles.summarySubValue}>
              Notifications: {preferences.notifications ? "On" : "Off"}
            </p>
            <p className={styles.summarySubValue}>
              Digest: {preferences.digestFrequency || "Weekly"}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Icon name="home" size="lg" />
          </div>
          <div className={styles.summaryContent}>
            <h3 className={styles.summaryTitle}>Team</h3>
            <p className={styles.summaryValue}>{team.teamName || "Not set"}</p>
            <p className={styles.summarySubValue}>
              Size: {team.teamSize || "Not set"}
            </p>
            <p className={styles.summarySubValue}>
              Invites: {team.inviteMembers?.length || 0}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={handleRestart}>
          <Icon name="arrow-left" /> Restart Setup
        </Button>
        <Button
          variant="primary"
          onClick={handleGoToDashboard}
          icon={<Icon name="arrow-right" />}
        >
          Go to Dashboard
        </Button>
      </div>
    </OnboardingStep>
  );
}
