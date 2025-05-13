import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnimatedBackground from '../components/AnimatedBackground';
import {Platform} from 'react-native';

// Import screens
import WelcomeScreen from '../screens/onboarding/Welcome';
import HairTypeIntroScreen from '../screens/onboarding/HairTypeIntro';
import HairAnalysisOptionsScreen from '../screens/onboarding/HairAnalysisOptions';
import HairQuizScreen from '../screens/onboarding/HairQuiz';
import HairAnalysisScreen from '../screens/onboarding/HairAnalysis';
import ResultsScreen from '../screens/onboarding/Results';
import SignUpScreen from '../screens/auth/SignUp';

const Stack = createNativeStackNavigator();

// Wrap each screen component with AnimatedBackground
const withAnimatedBackground = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <AnimatedBackground>
      <WrappedComponent {...props} />
    </AnimatedBackground>
  );
};

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: 'transparent',
        },
        ...Platform.select({
          ios: {
            animationDuration: 300,
          },
          android: {
            animationDuration: 300,
          },
        }),
      }}>
      <Stack.Screen
        name="Welcome"
        component={withAnimatedBackground(WelcomeScreen)}
      />
      <Stack.Screen
        name="HairTypeIntro"
        component={withAnimatedBackground(HairTypeIntroScreen)}
      />
      <Stack.Screen
        name="HairAnalysisOptions"
        component={withAnimatedBackground(HairAnalysisOptionsScreen)}
      />
      <Stack.Screen
        name="HairQuiz"
        component={withAnimatedBackground(HairQuizScreen)}
      />
      <Stack.Screen
        name="HairAnalysis"
        component={withAnimatedBackground(HairAnalysisScreen)}
      />
      <Stack.Screen
        name="Results"
        component={withAnimatedBackground(ResultsScreen)}
      />
      <Stack.Screen
        name="SignUp"
        component={withAnimatedBackground(SignUpScreen)}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
