"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* ── Types ────────────────────────────────────────────────────────────── */

export type OnboardingStep =
  | "welcome"
  | "profile"
  | "preferences"
  | "team"
  | "complete";

export interface ProfileData {
  fullName: string;
  email: string;
  role: string;
  bio: string;
}

export interface PreferencesData {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  digestFrequency: "daily" | "weekly" | "never";
  language: string;
}

export interface TeamData {
  teamName: string;
  teamSize: "1" | "2-5" | "6-20" | "21-50" | "50+";
  inviteMembers: string[];
}

export interface OnboardingData {
  profile: Partial<ProfileData>;
  preferences: Partial<PreferencesData>;
  team: Partial<TeamData>;
}

export interface OnboardingState {
  /* Current step */
  currentStep: OnboardingStep;
  stepHistory: OnboardingStep[];

  /* Collected data */
  data: OnboardingData;

  /* Validation */
  errors: Partial<Record<OnboardingStep, Record<string, string>>>;
  touched: Partial<Record<OnboardingStep, Record<string, boolean>>>;

  /* Completion */
  isComplete: boolean;
  completedAt: string | null;

  /* Actions */
  setStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;

  updateProfile: (data: Partial<ProfileData>) => void;
  updatePreferences: (data: Partial<PreferencesData>) => void;
  updateTeam: (data: Partial<TeamData>) => void;

  setFieldError: (step: OnboardingStep, field: string, error: string) => void;
  clearFieldError: (step: OnboardingStep, field: string) => void;
  clearStepErrors: (step: OnboardingStep) => void;
  setFieldTouched: (step: OnboardingStep, field: string) => void;

  validateStep: (step: OnboardingStep) => boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  /* Helpers */
  canGoNext: () => boolean;
  canGoPrev: () => boolean;
  getStepIndex: (step: OnboardingStep) => number;
}

/* ── Constants ────────────────────────────────────────────────────────── */

const STEP_ORDER: OnboardingStep[] = [
  "welcome",
  "profile",
  "preferences",
  "team",
  "complete",
];

const STEP_LABELS: Record<OnboardingStep, string> = {
  welcome: "Welcome",
  profile: "Profile",
  preferences: "Preferences",
  team: "Team",
  complete: "Complete",
};

const INITIAL_DATA: OnboardingData = {
  profile: {},
  preferences: {
    theme: "system",
    notifications: true,
    digestFrequency: "weekly",
    language: "en",
  },
  team: {},
};

const INITIAL_STATE: Omit<
  OnboardingState,
  | "setStep"
  | "nextStep"
  | "prevStep"
  | "goToStep"
  | "updateProfile"
  | "updatePreferences"
  | "updateTeam"
  | "setFieldError"
  | "clearFieldError"
  | "clearStepErrors"
  | "setFieldTouched"
  | "validateStep"
  | "completeOnboarding"
  | "resetOnboarding"
  | "canGoNext"
  | "canGoPrev"
  | "getStepIndex"
> = {
  currentStep: "welcome",
  stepHistory: ["welcome"],
  data: INITIAL_DATA,
  errors: {},
  touched: {},
  isComplete: false,
  completedAt: null,
};

/* ── Validation Helpers ──────────────────────────────────────────────── */

const validateProfile = (data: unknown): Record<string, string> => {
  const d = data as Partial<ProfileData>;
  const errors: Record<string, string> = {};
  if (!d.fullName?.trim()) errors.fullName = "Full name is required";
  if (!d.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    errors.email = "Invalid email format";
  }
  if (!d.role?.trim()) errors.role = "Role is required";
  return errors;
};

const validatePreferences = (data: unknown): Record<string, string> => {
  const d = data as Partial<PreferencesData>;
  const errors: Record<string, string> = {};
  if (!d.theme) errors.theme = "Theme is required";
  if (!d.language?.trim()) errors.language = "Language is required";
  return errors;
};

const validateTeam = (data: unknown): Record<string, string> => {
  const d = data as Partial<TeamData>;
  const errors: Record<string, string> = {};
  if (!d.teamName?.trim()) errors.teamName = "Team name is required";
  if (!d.teamSize) errors.teamSize = "Team size is required";
  return errors;
};

const validators: Partial<
  Record<OnboardingStep, (data: unknown) => Record<string, string>>
> = {
  profile: validateProfile,
  preferences: validatePreferences,
  team: validateTeam,
};

/* ── Store ────────────────────────────────────────────────────────────── */

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      /* Navigation */
      setStep: (step: OnboardingStep) =>
        set((state) => ({
          currentStep: step,
          stepHistory: state.stepHistory.includes(step)
            ? state.stepHistory
            : [...state.stepHistory, step],
        })),

      nextStep: () => {
        const { currentStep, validateStep, goToStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        if (currentIndex < STEP_ORDER.length - 1) {
          const nextStep = STEP_ORDER[currentIndex + 1];
          if (validateStep(currentStep)) {
            goToStep(nextStep);
          }
        }
      },

      prevStep: () => {
        const { currentStep, goToStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        if (currentIndex > 0) {
          goToStep(STEP_ORDER[currentIndex - 1]);
        }
      },

      goToStep: (step: OnboardingStep) => {
        const { currentStep, validateStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        const targetIndex = STEP_ORDER.indexOf(step);

        // Validate current step when moving forward
        if (targetIndex > currentIndex && !validateStep(currentStep)) {
          return;
        }

        set((state) => ({
          currentStep: step,
          stepHistory: state.stepHistory.includes(step)
            ? state.stepHistory
            : [...state.stepHistory, step],
        }));
      },

      /* Data updates */
      updateProfile: (data: Partial<ProfileData>) =>
        set((state) => ({
          data: { ...state.data, profile: { ...state.data.profile, ...data } },
        })),

      updatePreferences: (data: Partial<PreferencesData>) =>
        set((state) => ({
          data: {
            ...state.data,
            preferences: { ...state.data.preferences, ...data },
          },
        })),

      updateTeam: (data: Partial<TeamData>) =>
        set((state) => ({
          data: { ...state.data, team: { ...state.data.team, ...data } },
        })),

      /* Validation */
      setFieldError: (step: OnboardingStep, field: string, error: string) =>
        set((state) => ({
          errors: {
            ...state.errors,
            [step]: { ...state.errors[step], [field]: error },
          },
        })),

      clearFieldError: (step: OnboardingStep, field: string) =>
        set((state) => {
          const stepErrors = state.errors[step]
            ? { ...state.errors[step] }
            : {};
          delete stepErrors[field];
          const newErrors = { ...state.errors, [step]: stepErrors };
          if (Object.keys(stepErrors).length === 0) delete newErrors[step];
          return { errors: newErrors };
        }),

      clearStepErrors: (step: OnboardingStep) =>
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[step];
          return { errors: newErrors };
        }),

      setFieldTouched: (step: OnboardingStep, field: string) =>
        set((state) => ({
          touched: {
            ...state.touched,
            [step]: { ...state.touched[step], [field]: true },
          },
        })),

      validateStep: (step: OnboardingStep) => {
        const { data, setFieldError, clearStepErrors } = get();
        const validator = validators[step];
        if (!validator) return true;

        const stepData = data[step as keyof OnboardingData];
        const errors = validator(stepData);

        if (Object.keys(errors).length > 0) {
          for (const [field, error] of Object.entries(errors)) {
            setFieldError(step, field, error);
          }
          return false;
        }

        clearStepErrors(step);
        return true;
      },

      /* Completion */
      completeOnboarding: () =>
        set({
          isComplete: true,
          completedAt: new Date().toISOString(),
          currentStep: "complete",
        }),

      resetOnboarding: () =>
        set({
          ...INITIAL_STATE,
          // Keep persisted data if needed, but reset UI state
        }),

      /* Helpers */
      canGoNext: () => {
        const { currentStep } = get();
        const index = STEP_ORDER.indexOf(currentStep);
        return index < STEP_ORDER.length - 1;
      },

      canGoPrev: () => {
        const { currentStep } = get();
        return STEP_ORDER.indexOf(currentStep) > 0;
      },

      getStepIndex: (step: OnboardingStep) => STEP_ORDER.indexOf(step),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
        isComplete: state.isComplete,
        completedAt: state.completedAt,
      }),
    },
  ),
);

/* ── Selectors ────────────────────────────────────────────────────────── */

export const selectCurrentStep = (state: OnboardingState) => state.currentStep;
export const selectStepIndex = (state: OnboardingState) =>
  STEP_ORDER.indexOf(state.currentStep);
export const selectStepProgress = (state: OnboardingState) => {
  const index = STEP_ORDER.indexOf(state.currentStep);
  const total = STEP_ORDER.length - 1; // exclude 'complete' from progress
  return Math.min((index / total) * 100, 100);
};
export const selectProfileData = (state: OnboardingState) => state.data.profile;
export const selectPreferencesData = (state: OnboardingState) =>
  state.data.preferences;
export const selectTeamData = (state: OnboardingState) => state.data.team;
export const selectStepErrors =
  (step: OnboardingStep) => (state: OnboardingState) =>
    state.errors[step] || {};
export const selectIsComplete = (state: OnboardingState) => state.isComplete;
export const selectCanGoNext = (state: OnboardingState) => state.canGoNext();
export const selectCanGoPrev = (state: OnboardingState) => state.canGoPrev();

/* ── Constants Export ─────────────────────────────────────────────────── */

export { STEP_ORDER, STEP_LABELS };
