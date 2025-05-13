// Hair texture types according to common classification systems
export enum HairTextureType {
  TYPE_1A = 'Type 1A - Straight',
  TYPE_2A = 'Type 2A - Loose Coils',
  TYPE_2B = 'Type 2B - Springy Coils',
  TYPE_2C = 'Type 2C - Tight Coils',
  TYPE_3A = 'Type 3A - Loose Curls',
  TYPE_3B = 'Type 3B - Springy Curls',
  TYPE_3C = 'Type 3C - Tight Curls',
  TYPE_4A = 'Type 4A - Coily',
  TYPE_4B = 'Type 4B - Zigzag Pattern',
  TYPE_4C = 'Type 4C - Tight Coils',
}

// Hair care routine step interface
export interface HairCareRoutineStep {
  stepId: string;
  stepName: string;
  stepDescription: string;
  stepFrequency: string; // e.g., "Daily", "Weekly", "Bi-weekly", "Monthly"
  stepProducts: string[];
  stepIsComplete: boolean;
  stepDuration: string; // e.g., "5 minutes", "30 minutes"
}

// User hair profile interface
export interface UserHairProfile {
  userId: string;
  userHairTextureType: HairTextureType | null;
  userHairPorosity: string | null;
  userHairDensity: string | null;
  userHairThickness: string | null;
  userHairLength: string | null;
  userHairGoals: string[];
  userHairIssues: string[];
  userHairImages: string[]; // Array of file URIs
}

// Navigation parameter types for type-safe navigation
export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingHairTypeEducation: undefined;
  OnboardingHairTypeSelection: undefined;
  Home: undefined;
  HairAnalysis: undefined;
  HairCareRoutine: {userHairProfile: UserHairProfile};
  UserProfile: undefined;
  HairTypeDetails: {hairType: HairTextureType};
};
