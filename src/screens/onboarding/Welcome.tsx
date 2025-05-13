import React, {useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolateColor,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../types/navigation';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  AuthStackParamList,
  OnboardingStackParamList,
} from '../../types/navigation';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const imageFloat = useSharedValue(0);
  const aiFeatureScale = useSharedValue(0.95);
  const scrollY = useSharedValue(0);
  const buttonPulse = useSharedValue(1);
  const aiTitleRotate = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = withSpring(event.contentOffset.y, {
        damping: 15,
        stiffness: 80,
        mass: 1,
      });
    },
  });

  const startAnimations = useCallback(() => {
    // Smoother initial animations with better spring configuration
    titleOpacity.value = withDelay(
      300,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
        mass: 1,
      }),
    );
    subtitleOpacity.value = withDelay(
      800,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
        mass: 1,
      }),
    );
    buttonOpacity.value = withDelay(
      1300,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
        mass: 1,
      }),
    );

    // Smoother floating animation for the main image with gentler timing
    imageFloat.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(0, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        }),
      ),
      -1,
    );

    // Gentler AI feature container breathing animation
    aiFeatureScale.value = withRepeat(
      withSequence(
        withTiming(1.02, {
          duration: 3000,
          easing: Easing.inOut(Easing.cubic),
        }),
        withTiming(0.98, {
          duration: 3000,
          easing: Easing.inOut(Easing.cubic),
        }),
      ),
      -1,
    );

    // Smoother button pulse animation
    buttonPulse.value = withRepeat(
      withSequence(
        withTiming(1.03, {
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
        }),
        withTiming(1, {
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
        }),
      ),
      -1,
    );

    // Gentler AI title rotation
    aiTitleRotate.value = withRepeat(
      withSequence(
        withTiming(0.01, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(-0.01, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
        }),
      ),
      -1,
    );
  }, [
    titleOpacity,
    subtitleOpacity,
    buttonOpacity,
    imageFloat,
    aiFeatureScale,
    buttonPulse,
    aiTitleRotate,
  ]);

  useEffect(() => {
    startAnimations();
  }, [startAnimations]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      {
        translateY: withSpring(1 - titleOpacity.value * 50, {
          damping: 15,
          stiffness: 80,
          mass: 1,
        }),
      },
      {scale: 0.9 + titleOpacity.value * 0.1},
    ],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [
      {
        translateY: withSpring(1 - subtitleOpacity.value * 30, {
          damping: 15,
          stiffness: 80,
          mass: 1,
        }),
      },
      {scale: 0.95 + subtitleOpacity.value * 0.05},
    ],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      {
        translateY: withSpring(1 - buttonOpacity.value * 20, {
          damping: 15,
          stiffness: 80,
          mass: 1,
        }),
      },
      {scale: buttonPulse.value},
    ],
  }));

  const signInLinkStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      1500,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
        mass: 1,
      }),
    ),
    transform: [
      {
        translateY: withSpring(1 - buttonOpacity.value * 10, {
          damping: 15,
          stiffness: 80,
          mass: 1,
        }),
      },
    ],
  }));

  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: imageFloat.value * -10},
      {scale: 1 + imageFloat.value * 0.02},
    ],
    opacity: 0.8 + imageFloat.value * 0.2,
  }));

  const aiFeatureContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: aiFeatureScale.value},
      {translateY: withSpring(1 - buttonOpacity.value) * 20},
    ],
    opacity: buttonOpacity.value,
    backgroundColor: interpolateColor(
      aiFeatureScale.value,
      [0.98, 1.02],
      ['rgba(255, 255, 255, 0.65)', 'rgba(255, 255, 255, 0.8)'],
    ),
  }));

  const aiTitleStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${aiTitleRotate.value}rad`}],
  }));

  // Smoother feature item animations
  const featureItem1Style = useAnimatedStyle(() => ({
    opacity: withDelay(
      1500,
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
    ),
    transform: [
      {
        translateX: withDelay(
          1500,
          withSpring(0, {
            damping: 15,
            stiffness: 80,
            mass: 1,
            velocity: 0,
          }),
        ),
      },
    ],
  }));

  const featureItem2Style = useAnimatedStyle(() => ({
    opacity: withDelay(
      1700,
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
    ),
    transform: [
      {
        translateX: withDelay(
          1700,
          withSpring(0, {
            damping: 15,
            stiffness: 80,
            mass: 1,
            velocity: 0,
          }),
        ),
      },
    ],
  }));

  const featureItem3Style = useAnimatedStyle(() => ({
    opacity: withDelay(
      1900,
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
    ),
    transform: [
      {
        translateX: withDelay(
          1900,
          withSpring(0, {
            damping: 15,
            stiffness: 80,
            mass: 1,
            velocity: 0,
          }),
        ),
      },
    ],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <Animated.View style={[styles.imageContainer, imageContainerStyle]}>
          <Image
            source={require('../../assets/images/curly-hair-ai-logo.jpg')}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel="Silhouette of an African American woman - curly hair ai logo"
          />
        </Animated.View>

        <View style={styles.contentContainer}>
          <Animated.View style={titleStyle}>
            <Text style={styles.title}>
              Embrace Your Best, Natural Curly Girl Self
            </Text>
          </Animated.View>

          <Animated.View style={subtitleStyle}>
            <Text style={styles.subtitle}>
              <Text style={styles.bold}>Empower</Text> the{' '}
              <Text style={styles.bold}>beauty</Text>,{' '}
              <Text style={styles.bold}>strength</Text>, and{' '}
              <Text style={styles.bold}>versatility</Text> of natural curly hair
              with our{' '}
              <Text style={styles.bold}>cutting-edge AI technology</Text>. We
              use <Text style={styles.bold}>advanced algorithms</Text> to
              personalize your hair care journey, making us the first truly{' '}
              <Text style={styles.bold}>intelligent app</Text> designed
              specifically for curly hair.
            </Text>
          </Animated.View>

          <Animated.View
            style={[styles.aiFeatureContainer, aiFeatureContainerStyle]}>
            <Animated.View style={aiTitleStyle}>
              <Text style={styles.aiFeatureTitle}>Powered by Advanced AI</Text>
            </Animated.View>
            <View style={styles.aiFeatureList}>
              <Animated.View style={[styles.aiFeatureItem, featureItem1Style]}>
                <Text style={styles.aiFeatureText}>
                  • Personalized hair analysis
                </Text>
              </Animated.View>
              <Animated.View style={[styles.aiFeatureItem, featureItem2Style]}>
                <Text style={styles.aiFeatureText}>
                  • Smart product recommendations
                </Text>
              </Animated.View>
              <Animated.View style={[styles.aiFeatureItem, featureItem3Style]}>
                <Text style={styles.aiFeatureText}>
                  • Adaptive routine optimization
                </Text>
              </Animated.View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.buttonContainer, buttonStyle]}>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={() =>
                navigation.navigate('Onboarding', {
                  screen: 'HairTypeIntro',
                } as NavigatorScreenParams<OnboardingStackParamList>)
              }>
              Begin My AI Powered Hair Journey
            </Button>
          </Animated.View>

          <Animated.View style={[styles.signInContainer, signInLinkStyle]}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Auth', {
                  screen: 'Login',
                } as NavigatorScreenParams<AuthStackParamList>)
              }
              accessibilityLabel="Sign in to your account"
              accessibilityRole="button">
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  gradient: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 100,
  },
  contentContainer: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4A2C1E',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
    color: '#6D4C41',
    width: '100%',
    alignSelf: 'center',
  },
  aiFeatureContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiFeatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A2C1E',
    marginBottom: 8,
  },
  aiFeatureList: {
    alignItems: 'flex-start',
    width: '100%',
  },
  aiFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    opacity: 0,
    transform: [{translateX: 20}],
  },
  aiFeatureText: {
    fontSize: 14,
    color: '#6D4C41',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: width * 0.8,
    borderRadius: 30,
    backgroundColor: '#8D6E63',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: '#4A2C1E',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  signInText: {
    fontSize: 14,
    color: '#6D4C41',
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8D6E63',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
