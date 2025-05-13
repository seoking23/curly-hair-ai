import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import {Text, TextInput, Checkbox} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProp,
  SignUpScreenRouteProp,
} from '../../types/navigation';
import {BackArrow, ArrowRight} from '../../components/icons';
import {useAuth} from '../../providers/AuthProvider';
import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthStackParamList} from '../../types/navigation';

const windowWidth = Dimensions.get('window').width;

const SignUpScreen = () => {
  const navigationController = useNavigation<AuthNavigationProp>();
  const route = useRoute<SignUpScreenRouteProp>();
  const {signUp} = useAuth();
  const [isSignUpInProgress, setIsSignUpInProgress] = useState(false);
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [userFullNameInput, setUserFullNameInput] = useState('');
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepPosition] = useState(new Animated.Value(0));
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
  });

  // Field validation states
  const [emailValidation, setEmailValidation] = useState({
    isValid: true,
    message: '',
  });
  const [nameValidation, setNameValidation] = useState({
    isValid: true,
    message: '',
  });

  // Form steps
  const formSteps = [
    {title: 'Your Profile', subtitle: "Let's get to know you"},
    {title: 'Create Account', subtitle: 'Set up your login details'},
    {title: 'Almost Done', subtitle: 'Review and accept terms'},
  ];

  // Animate between steps
  useEffect(() => {
    Animated.timing(stepPosition, {
      toValue: -currentStepIndex * windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStepIndex, stepPosition]);

  // Email validation function
  const validateUserEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailValidation({
        isValid: false,
        message: 'Email is required',
      });
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailValidation({
        isValid: false,
        message: 'Please enter a valid email address',
      });
      return false;
    } else {
      setEmailValidation({
        isValid: true,
        message: '',
      });
      return true;
    }
  };

  // Name validation function
  const validateUserName = (name: string) => {
    if (!name.trim()) {
      setNameValidation({
        isValid: false,
        message: 'Name is required',
      });
      return false;
    } else if (name.trim().length < 2) {
      setNameValidation({
        isValid: false,
        message: 'Name must be at least 2 characters',
      });
      return false;
    } else {
      setNameValidation({
        isValid: true,
        message: '',
      });
      return true;
    }
  };

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let feedback = '';

    if (password.length > 7) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 0) feedback = 'Password is too weak';
    else if (score <= 2) feedback = 'Password could be stronger';
    else if (score <= 4) feedback = 'Good password';
    else feedback = 'Strong password';

    setPasswordStrength({score, feedback});
    return score > 2;
  };

  const handleNextStep = () => {
    if (currentStepIndex === 0) {
      if (!validateUserName(userFullNameInput)) return;
    } else if (currentStepIndex === 1) {
      if (!validateUserEmail(userEmailInput)) return;
      if (userPasswordInput.length < 8) {
        Alert.alert('Password Error', 'Password must be at least 8 characters');
        return;
      }
      if (!checkPasswordStrength(userPasswordInput)) {
        Alert.alert('Password Error', 'Please create a stronger password');
        return;
      }
    }

    if (currentStepIndex < formSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSignUpSubmission = async () => {
    if (!userEmailInput || !userPasswordInput || !userFullNameInput) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!hasAcceptedTerms) {
      Alert.alert(
        'Terms Required',
        'Please agree to the terms and conditions to continue',
      );
      return;
    }

    setIsSignUpInProgress(true);

    try {
      // Sign up with our auth service, including the hair analysis data
      await signUp(userEmailInput, userPasswordInput, userFullNameInput, {
        hairType: route.params?.hairType ?? '',
        porosity: route.params?.porosity ?? '',
        density: route.params?.density ?? '',
        thickness: route.params?.thickness ?? '',
        elasticity: route.params?.elasticity ?? '',
        scalpCondition: route.params?.scalpCondition ?? '',
        productCompatibility: route.params?.productCompatibility ?? '',
        maintenanceLevel: route.params?.maintenanceLevel ?? '',
        recommendedProducts: route.params?.recommendedProducts ?? [],
        recommendedRoutine: route.params?.recommendedRoutine ?? [],
        careInstructions: route.params?.careInstructions ?? [],
      });

      Alert.alert(
        'Verification Email Sent',
        'Please check your email and follow the instructions to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigationController.navigate('Auth', {
                screen: 'Login',
              } as NavigatorScreenParams<AuthStackParamList>);
            },
          },
        ],
      );
    } catch (signUpError: any) {
      console.error('SignUp.tsx - Sign up error:', signUpError);
      Alert.alert(
        'Sign Up Failed',
        signUpError.message ||
          'There was a problem creating your account. Please try again.',
      );
    } finally {
      setIsSignUpInProgress(false);
    }
  };

  const handleLoginNavigation = () => {
    navigationController.navigate('Auth', {
      screen: 'Login',
    } as NavigatorScreenParams<AuthStackParamList>);
  };

  const renderPasswordStrengthIndicator = () => {
    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#30D158'];
    const strengthColor = colors[Math.min(passwordStrength.score, 4)];

    return (
      <View style={styles.passwordStrengthContainer}>
        <View style={styles.strengthBarsContainer}>
          {[0, 1, 2, 3, 4].map(index => (
            <View
              key={index}
              style={[
                styles.strengthBar,
                {
                  backgroundColor:
                    index <= passwordStrength.score ? strengthColor : '#E0E0E0',
                },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.strengthText, {color: strengthColor}]}>
          {passwordStrength.feedback}
        </Text>
      </View>
    );
  };

  const renderGoBackButton = () => {
    // Only show back button if we're not on the first step or if we can navigate back
    if (currentStepIndex === 0 && !navigationController.canGoBack()) {
      return null;
    }

    const handleGoBack = () => {
      if (currentStepIndex > 0) {
        // If we're in the multi-step form, go to previous step
        handlePreviousStep();
      } else {
        // Otherwise navigate back to previous screen
        navigationController.goBack();
      }
    };

    return (
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={handleGoBack}
        accessibilityLabel="Go back"
        accessibilityRole="button"
        testID="goBackButton">
        <BackArrow color="#8D6E63" size={24} />
      </TouchableOpacity>
    );
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {renderGoBackButton()}
        {formSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepDot,
              currentStepIndex === index ? styles.stepDotActive : {},
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{formSteps[currentStepIndex].title}</Text>
          <Text style={styles.subtitle}>
            {formSteps[currentStepIndex].subtitle}
          </Text>
        </View>

        {/* Form Carousel */}
        <Animated.View
          style={[
            styles.formCarousel,
            {
              transform: [{translateX: stepPosition}],
              width: formSteps.length * windowWidth,
            },
          ]}>
          {/* Step 1: Personal Info */}
          <View style={[styles.formStep, {width: windowWidth}]}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                value={userFullNameInput}
                onChangeText={text => {
                  setUserFullNameInput(text);
                  validateUserName(text);
                }}
                placeholder="Enter your full name"
                style={[
                  styles.textInput,
                  !nameValidation.isValid && styles.textInputError,
                ]}
                mode="outlined"
                outlineColor="#D7CCC8"
                activeOutlineColor="#8D6E63"
                error={!nameValidation.isValid}
              />
              {!nameValidation.isValid && (
                <Text style={styles.errorText}>{nameValidation.message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Step 2: Account Info */}
          <View style={[styles.formStep, {width: windowWidth}]}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                value={userEmailInput}
                onChangeText={text => {
                  setUserEmailInput(text);
                  validateUserEmail(text);
                }}
                placeholder="Enter your email"
                style={[
                  styles.textInput,
                  !emailValidation.isValid && styles.textInputError,
                ]}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                outlineColor="#D7CCC8"
                activeOutlineColor="#8D6E63"
                error={!emailValidation.isValid}
              />
              {!emailValidation.isValid && (
                <Text style={styles.errorText}>{emailValidation.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={userPasswordInput}
                  onChangeText={text => {
                    setUserPasswordInput(text);
                    checkPasswordStrength(text);
                  }}
                  placeholder="Create a password"
                  style={styles.textInput}
                  mode="outlined"
                  secureTextEntry={!isPasswordVisible}
                  outlineColor="#D7CCC8"
                  activeOutlineColor="#8D6E63"
                  right={
                    <TextInput.Icon
                      icon={isPasswordVisible ? 'eye-off' : 'eye'}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
              </View>
              {userPasswordInput.length > 0 &&
                renderPasswordStrengthIndicator()}
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handlePreviousStep}>
                <BackArrow size={20} color="#8D6E63" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Next</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Step 3: Terms and Create Account */}
          <View style={[styles.formStep, {width: windowWidth}]}>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Account Summary</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>{userFullNameInput}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Email:</Text>
                <Text style={styles.summaryValue}>{userEmailInput}</Text>
              </View>
            </View>

            <View style={styles.termsContainer}>
              <Checkbox.Item
                label="I agree to the Terms & Conditions and Privacy Policy"
                status={hasAcceptedTerms ? 'checked' : 'unchecked'}
                onPress={() => setHasAcceptedTerms(!hasAcceptedTerms)}
                color="#8D6E63"
                labelStyle={styles.termsText}
                uncheckedColor="#D7CCC8"
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handlePreviousStep}>
                <BackArrow size={20} color="#8D6E63" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.createAccountButton,
                  (!hasAcceptedTerms || isSignUpInProgress) &&
                    styles.disabledButton,
                ]}
                onPress={handleSignUpSubmission}
                disabled={!hasAcceptedTerms || isSignUpInProgress}>
                {isSignUpInProgress ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text style={styles.createAccountButtonText}>
                      Create Account
                    </Text>
                    <ArrowRight
                      size={20}
                      color="#FFFFFF"
                      style={styles.buttonIcon}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={handleLoginNavigation}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
    position: 'relative',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D7CCC8',
    marginHorizontal: 5,
  },
  stepDotActive: {
    backgroundColor: '#8D6E63',
    width: 20,
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6D4C41',
    lineHeight: 22,
  },
  formCarousel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  formStep: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D4C41',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
  },
  textInputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordStrengthContainer: {
    marginTop: 10,
  },
  strengthBarsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  termsContainer: {
    marginVertical: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#6D4C41',
    flexWrap: 'wrap',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#8D6E63',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  backButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#8D6E63',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#8D6E63',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  createAccountButton: {
    backgroundColor: '#8D6E63',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#D7CCC8',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2C1E',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  summaryLabel: {
    width: 80,
    fontSize: 14,
    color: '#6D4C41',
    fontWeight: '600',
  },
  summaryValue: {
    flex: 1,
    fontSize: 14,
    color: '#4A2C1E',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6D4C41',
    fontSize: 14,
  },
  loginButton: {
    padding: 4,
  },
  loginButtonText: {
    color: '#8D6E63',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
    zIndex: 10,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default SignUpScreen;
