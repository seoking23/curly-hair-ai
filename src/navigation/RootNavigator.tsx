import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {useAuth} from '../providers/AuthProvider';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();

// Custom animation configuration for cross-platform consistency
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  ...Platform.select({
    ios: {
      animationDuration: 300,
    },
    android: {
      animationDuration: 300,
    },
  }),
};

const RootNavigator = () => {
  const {user, isLoading} = useAuth();

  if (isLoading) {
    // You might want to show a loading screen here
    return null;
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {user ? (
        // User is signed in - show main app flow
        <Stack.Screen name="Main" component={OnboardingNavigator} />
      ) : (
        // No user signed in - show auth and onboarding flows
        <>
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animation: 'slide_from_right',
              // When navigating from Auth back to Onboarding, use slide_from_left
              ...Platform.select({
                ios: {
                  animationDuration: 300,
                },
                android: {
                  animationDuration: 300,
                },
              }),
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
