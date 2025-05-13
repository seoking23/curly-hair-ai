import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const RegisterScreen: React.FC = () => {
  const [userFullNameInput, setUserFullNameInput] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [userConfirmPasswordInput, setUserConfirmPasswordInput] = useState('');
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const navigationController = useNavigation();

  const handleRegisterButtonPress = async () => {
    try {
      // Validate inputs
      if (!userFullNameInput.trim()) {
        Alert.alert('Registration Error', 'Please enter your full name');
        return;
      }

      if (!userEmailInput.trim()) {
        Alert.alert('Registration Error', 'Please enter your email address');
        return;
      }

      if (!userPasswordInput) {
        Alert.alert('Registration Error', 'Please enter a password');
        return;
      }

      if (userPasswordInput.length < 8) {
        Alert.alert(
          'Registration Error',
          'Password must be at least 8 characters long',
        );
        return;
      }

      if (userPasswordInput !== userConfirmPasswordInput) {
        Alert.alert('Registration Error', 'Passwords do not match');
        return;
      }

      if (!hasAcceptedTerms) {
        Alert.alert(
          'Registration Error',
          'Please accept the Terms and Conditions',
        );
        return;
      }

      setIsRegistrationInProgress(true);

      // Implement actual registration logic here
      // await authService.register(userFullNameInput, userEmailInput, userPasswordInput);

      // Navigate to next step after successful registration
      // navigationController.navigate('OnboardingFlow');
    } catch (registrationError) {
      console.error(
        'RegisterScreen.tsx - Registration error:',
        registrationError,
      );
      Alert.alert(
        'Registration Failed',
        'There was a problem creating your account. Please try again.',
      );
    } finally {
      setIsRegistrationInProgress(false);
    }
  };

  const handleLoginNavigationPress = () => {
    navigationController.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={registerScreenStyles.safeAreaContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={registerScreenStyles.keyboardAvoidingContainer}>
        <ScrollView
          contentContainerStyle={registerScreenStyles.scrollViewContent}>
          <View style={registerScreenStyles.registerContainer}>
            {/* App Logo */}
            <View style={registerScreenStyles.logoContainer}>
              {/* <Image source={require('../../assets/logo.png')} style={registerScreenStyles.logoImage} /> */}
              <Text style={registerScreenStyles.appTitleText}>
                Your App Name
              </Text>
            </View>

            <Text style={registerScreenStyles.createAccountHeaderText}>
              Create Account
            </Text>
            <Text style={registerScreenStyles.createAccountSubheaderText}>
              Sign up to get started with our services
            </Text>

            {/* Full Name Input */}
            <View style={registerScreenStyles.inputContainer}>
              <Text style={registerScreenStyles.inputLabelText}>Full Name</Text>
              <TextInput
                style={registerScreenStyles.textInputField}
                value={userFullNameInput}
                onChangeText={setUserFullNameInput}
                placeholder="Enter your full name"
                placeholderTextColor="#A0A0A0"
                autoCapitalize="words"
                testID="register-name-input"
              />
            </View>

            {/* Email Input */}
            <View style={registerScreenStyles.inputContainer}>
              <Text style={registerScreenStyles.inputLabelText}>Email</Text>
              <TextInput
                style={registerScreenStyles.textInputField}
                value={userEmailInput}
                onChangeText={setUserEmailInput}
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="register-email-input"
              />
            </View>

            {/* Password Input */}
            <View style={registerScreenStyles.inputContainer}>
              <Text style={registerScreenStyles.inputLabelText}>Password</Text>
              <View style={registerScreenStyles.passwordInputContainer}>
                <TextInput
                  style={registerScreenStyles.passwordTextField}
                  value={userPasswordInput}
                  onChangeText={setUserPasswordInput}
                  placeholder="Create a password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  testID="register-password-input"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={registerScreenStyles.passwordVisibilityButton}
                  testID="toggle-password-visibility">
                  <Text>{isPasswordVisible ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={registerScreenStyles.passwordHintText}>
                Password must be at least 8 characters long
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View style={registerScreenStyles.inputContainer}>
              <Text style={registerScreenStyles.inputLabelText}>
                Confirm Password
              </Text>
              <View style={registerScreenStyles.passwordInputContainer}>
                <TextInput
                  style={registerScreenStyles.passwordTextField}
                  value={userConfirmPasswordInput}
                  onChangeText={setUserConfirmPasswordInput}
                  placeholder="Confirm your password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  testID="register-confirm-password-input"
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={registerScreenStyles.passwordVisibilityButton}
                  testID="toggle-confirm-password-visibility">
                  <Text>{isConfirmPasswordVisible ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <View style={registerScreenStyles.termsContainer}>
              <TouchableOpacity
                style={registerScreenStyles.termsCheckbox}
                onPress={() => setHasAcceptedTerms(!hasAcceptedTerms)}
                testID="terms-checkbox">
                <View
                  style={[
                    registerScreenStyles.checkbox,
                    hasAcceptedTerms && registerScreenStyles.checkboxSelected,
                  ]}>
                  {hasAcceptedTerms && (
                    <Text style={registerScreenStyles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={registerScreenStyles.termsTextContainer}>
                <Text style={registerScreenStyles.termsText}>
                  I agree to the{' '}
                  <Text style={registerScreenStyles.termsLinkText}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text style={registerScreenStyles.termsLinkText}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                registerScreenStyles.registerButton,
                !hasAcceptedTerms &&
                  registerScreenStyles.registerButtonDisabled,
              ]}
              onPress={handleRegisterButtonPress}
              disabled={isRegistrationInProgress || !hasAcceptedTerms}
              testID="register-submit-button">
              {isRegistrationInProgress ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={registerScreenStyles.registerButtonText}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={registerScreenStyles.loginLinkContainer}>
              <Text style={registerScreenStyles.loginPromptText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={handleLoginNavigationPress}
                testID="login-link">
                <Text style={registerScreenStyles.loginLinkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const registerScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  registerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
  createAccountHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  createAccountSubheaderText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  textInputField: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#333333',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  passwordTextField: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  passwordVisibilityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  passwordHintText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 6,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  termsCheckbox: {
    marginRight: 10,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4A90E2',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    flexWrap: 'wrap',
  },
  termsLinkText: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: '#4A90E2',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginPromptText: {
    color: '#666666',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
