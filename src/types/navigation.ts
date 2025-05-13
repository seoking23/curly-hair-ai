import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {SocialAuthCredentials} from '../services/SocialAuthService';

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: {
    socialCredentials?: SocialAuthCredentials;
  };
  ForgotPassword: undefined;
  SignUp: {
    hairType: string;
    porosity: string;
    density: string;
    thickness: string;
    elasticity: string;
    scalpCondition: string;
    productCompatibility: string;
    maintenanceLevel: string;
    recommendedProducts: string[];
    recommendedRoutine: string[];
    careInstructions: string[];
  };
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  HairTypeIntro: undefined;
  HairAnalysisOptions: undefined;
  HairQuiz: undefined;
  HairAnalysis: undefined;
  Results: undefined;
  SignUp: {
    hairType: string;
    porosity: string;
    density: string;
    thickness: string;
    elasticity: string;
    scalpCondition: string;
    productCompatibility: string;
    maintenanceLevel: string;
    recommendedProducts: string[];
    recommendedRoutine: string[];
    careInstructions: string[];
  };
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type OnboardingNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;
