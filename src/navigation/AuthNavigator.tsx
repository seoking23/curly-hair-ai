import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignUpScreen from '../screens/auth/SignUp';
import AnimatedBackground from '../components/AnimatedBackground';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();

// Wrap each screen component with AnimatedBackground
const withAnimatedBackground = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <AnimatedBackground>
      <WrappedComponent {...props} />
    </AnimatedBackground>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={withAnimatedBackground(LoginScreen)}
        options={{
          animation: 'slide_from_right',
          // When going back from Login to Welcome, we want to slide from left
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
      <Stack.Screen
        name="SignUp"
        component={withAnimatedBackground(SignUpScreen)}
        options={{
          animation: 'slide_from_right',
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
    </Stack.Navigator>
  );
};

export default AuthNavigator;
