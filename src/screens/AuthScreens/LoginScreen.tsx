import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../../styles/designSystem';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {BackArrow, IconBase} from '../../components/icons';
import {RootNavigationProp} from '../../types/navigation';
import {Path} from 'react-native-svg';
import SocialAuthService from '../../services/SocialAuthService';

// Google Icon Component
const GoogleIcon: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = '#000000',
}) => (
  <IconBase size={size} color={color} viewBox="0 0 48 48">
    <Path
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      fill="#FFC107"
    />
    <Path
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      fill="#FF3D00"
    />
    <Path
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      fill="#4CAF50"
    />
    <Path
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      fill="#1976D2"
    />
  </IconBase>
);

// Apple Icon Component
const AppleIcon: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = '#000000',
}) => (
  <IconBase size={size} color={color} viewBox="0 0 384 512">
    <Path
      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      fill={color}
    />
  </IconBase>
);

const LoginScreen: React.FC = () => {
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [logoAnimation] = useState(new Animated.Value(0));
  const [isSocialLoginInProgress, setIsSocialLoginInProgress] = useState<
    'google' | 'apple' | null
  >(null);

  const navigation = useNavigation<RootNavigationProp>();

  // Animate logo on mount
  useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [logoAnimation]);

  const validateUserEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateUserPassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLoginButtonPress = async () => {
    const isEmailValid = validateUserEmail(userEmailInput);
    const isPasswordValid = validateUserPassword(userPasswordInput);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setIsLoginInProgress(true);

      // Implement actual login logic here
      // await authService.login(userEmailInput, userPasswordInput);

      // Navigate to main app after successful login
      // navigationController.navigate('MainApp');
    } catch (loginError) {
      console.error('LoginScreen.tsx - Login error:', loginError);
      Alert.alert(
        'Login Failed',
        'There was a problem signing you in. Please check your credentials and try again.',
      );
    } finally {
      setIsLoginInProgress(false);
    }
  };

  const handleForgotPasswordPress = () => {
    // navigationController.navigate('ForgotPassword');
  };

  const handleRegisterNavigationPress = () => {
    navigation.navigate('Register' as never);
  };

  const handleBackPress = () => {
    navigation.navigate('Onboarding', {screen: 'Welcome'});
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setIsSocialLoginInProgress(provider);

      const credentials = await (provider === 'google'
        ? SocialAuthService.signInWithGoogle()
        : SocialAuthService.signInWithApple());

      // Here you would typically check if the user exists in your backend
      // For this example, we'll simulate a check
      const userExists = false; // Replace with actual API call

      if (userExists) {
        // Navigate to main app
        navigation.navigate('Main');
      } else {
        // User doesn't exist, navigate to registration with pre-filled data
        navigation.navigate('Auth', {
          screen: 'Register',
          params: {
            socialCredentials: credentials,
          },
        });
      }
    } catch (error: any) {
      console.error('LoginScreen.tsx - Social login error:', error);

      // Don't show alert for user-initiated cancellations
      if (!error.message?.includes('cancelled')) {
        Alert.alert(
          'Login Failed',
          error.message ||
            'An error occurred during social login. Please try again.',
        );
      }
    } finally {
      setIsSocialLoginInProgress(null);
    }
  };

  const logoScale = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const logoOpacity = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        accessibilityLabel="Go back"
        accessibilityRole="button">
        <BackArrow size={24} color={DesignSystem.colors.textPrimary} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentContainer}>
            {/* App Logo */}
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{scale: logoScale}],
                  opacity: logoOpacity,
                },
              ]}>
              {/* <Image source={require('../../assets/logo.png')} style={styles.logoImage} /> */}
              <Text style={styles.appTitleText}>Curly Hair AI</Text>
              <View style={styles.logoDivider} />
              <Text style={styles.appTaglineText}>
                Your Hair Journey Starts Here
              </Text>
            </Animated.View>

            {/* Welcome Text */}
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeHeaderText}>Welcome Back</Text>
              <Text style={styles.welcomeSubheaderText}>
                Sign in to continue to your personalized hair care experience
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Input
                label="Email Address"
                value={userEmailInput}
                onChangeText={text => {
                  setUserEmailInput(text);
                  if (emailError) validateUserEmail(text);
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
                testID="login-email-input"
              />

              <Input
                label="Password"
                value={userPasswordInput}
                onChangeText={text => {
                  setUserPasswordInput(text);
                  if (passwordError) validateUserPassword(text);
                }}
                placeholder="Enter your password"
                secureTextEntry
                error={passwordError}
                testID="login-password-input"
              />

              <TouchableOpacity
                onPress={handleForgotPasswordPress}
                style={styles.forgotPasswordButton}
                testID="forgot-password-button">
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleLoginButtonPress}
                loading={isLoginInProgress}
                disabled={isLoginInProgress}
                variant="primary"
                icon="login"
                iconPosition="right"
                testID="login-submit-button"
                style={styles.loginButton}
              />

              {/* Social Login Options */}
              <View style={styles.socialLoginContainer}>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      isSocialLoginInProgress === 'google' &&
                        styles.socialButtonDisabled,
                    ]}
                    onPress={() => handleSocialLogin('google')}
                    disabled={isSocialLoginInProgress !== null}
                    accessibilityLabel="Sign in with Google"
                    accessibilityRole="button">
                    {isSocialLoginInProgress === 'google' ? (
                      <ActivityIndicator
                        size="small"
                        color={DesignSystem.colors.primary}
                      />
                    ) : (
                      <>
                        <GoogleIcon size={20} />
                        <Text style={styles.socialButtonText}>Google</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      isSocialLoginInProgress === 'apple' &&
                        styles.socialButtonDisabled,
                    ]}
                    onPress={() => handleSocialLogin('apple')}
                    disabled={isSocialLoginInProgress !== null}
                    accessibilityLabel="Sign in with Apple"
                    accessibilityRole="button">
                    {isSocialLoginInProgress === 'apple' ? (
                      <ActivityIndicator
                        size="small"
                        color={DesignSystem.colors.primary}
                      />
                    ) : (
                      <>
                        <AppleIcon size={20} />
                        <Text style={styles.socialButtonText}>Apple</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Register Link */}
            <View style={styles.registerLinkContainer}>
              <Text style={styles.registerPromptText}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={handleRegisterNavigationPress}
                testID="register-link">
                <Text style={styles.registerLinkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: DesignSystem.spacing.lg,
    paddingVertical: DesignSystem.spacing.xl,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.xl,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appTitleText: {
    fontSize: DesignSystem.typography.fontSize.heading1,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.primary,
    marginTop: DesignSystem.spacing.md,
  },
  logoDivider: {
    width: 40,
    height: 2,
    backgroundColor: DesignSystem.colors.primaryLight,
    marginVertical: DesignSystem.spacing.sm,
  },
  appTaglineText: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
  },
  welcomeTextContainer: {
    marginBottom: DesignSystem.spacing.xl,
  },
  welcomeHeaderText: {
    fontSize: DesignSystem.typography.fontSize.heading2,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
    marginBottom: DesignSystem.spacing.xs,
  },
  welcomeSubheaderText: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textSecondary,
    lineHeight: DesignSystem.typography.lineHeight.relaxed,
  },
  formContainer: {
    marginBottom: DesignSystem.spacing.xl,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: DesignSystem.spacing.xs,
    marginBottom: DesignSystem.spacing.lg,
  },
  forgotPasswordText: {
    color: DesignSystem.colors.primary,
    fontSize: DesignSystem.typography.fontSize.caption,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
  },
  loginButton: {
    marginTop: DesignSystem.spacing.md,
  },
  socialLoginContainer: {
    marginTop: DesignSystem.spacing.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: DesignSystem.colors.border,
  },
  dividerText: {
    paddingHorizontal: DesignSystem.spacing.md,
    color: DesignSystem.colors.textTertiary,
    fontSize: DesignSystem.typography.fontSize.caption,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    marginHorizontal: DesignSystem.spacing.xs,
    paddingVertical: DesignSystem.spacing.md,
    borderWidth: 1,
    borderColor: DesignSystem.colors.border,
    borderRadius: DesignSystem.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DesignSystem.colors.card,
    flexDirection: 'row',
    gap: DesignSystem.spacing.sm,
  },
  socialButtonText: {
    fontSize: DesignSystem.typography.fontSize.body,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPromptText: {
    color: DesignSystem.colors.textSecondary,
    fontSize: DesignSystem.typography.fontSize.caption,
  },
  registerLinkText: {
    color: DesignSystem.colors.primary,
    fontSize: DesignSystem.typography.fontSize.caption,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  socialButtonDisabled: {
    opacity: 0.6,
  },
});

export default LoginScreen;
