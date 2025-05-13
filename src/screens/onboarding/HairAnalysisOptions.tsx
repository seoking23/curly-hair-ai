import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../types/navigation';
import {Header} from '../../components/Header';
import Paywall from '../../components/Paywall';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(Button);

const HairAnalysisOptionsScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [isPaywallVisible, setIsPaywallVisible] = useState(false);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const quizCardScale = useSharedValue(0.95);
  const quizCardOpacity = useSharedValue(0);
  const premiumCardScale = useSharedValue(0.95);
  const premiumCardOpacity = useSharedValue(0);
  const premiumBadgeScale = useSharedValue(0.8);
  const iconFloat = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Start animations in sequence
    headerOpacity.value = withDelay(
      300,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
      }),
    );

    quizCardOpacity.value = withDelay(
      500,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
      }),
    );
    quizCardScale.value = withDelay(
      500,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
      }),
    );

    premiumCardOpacity.value = withDelay(
      700,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
      }),
    );
    premiumCardScale.value = withDelay(
      700,
      withSpring(1, {
        damping: 15,
        stiffness: 80,
      }),
    );

    premiumBadgeScale.value = withDelay(
      900,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
      }),
    );

    // Continuous floating animation for icons
    iconFloat.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(0, {
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
        }),
      ),
      -1,
    );

    // Button pulse animation
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
        }),
      ),
      -1,
    );
  }, [
    headerOpacity,
    quizCardOpacity,
    quizCardScale,
    premiumCardOpacity,
    premiumCardScale,
    premiumBadgeScale,
    iconFloat,
    buttonScale,
  ]);

  // Animated styles
  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [
      {
        translateY: withSpring(20 - headerOpacity.value * 20, {
          damping: 15,
          stiffness: 80,
        }),
      },
    ],
  }));

  const quizCardStyle = useAnimatedStyle(() => ({
    opacity: quizCardOpacity.value,
    transform: [
      {scale: quizCardScale.value},
      {
        translateY: withSpring(20 - quizCardOpacity.value * 20, {
          damping: 15,
          stiffness: 80,
        }),
      },
    ],
  }));

  const premiumCardStyle = useAnimatedStyle(() => ({
    opacity: premiumCardOpacity.value,
    transform: [
      {scale: premiumCardScale.value},
      {
        translateY: withSpring(20 - premiumCardOpacity.value * 20, {
          damping: 15,
          stiffness: 80,
        }),
      },
    ],
  }));

  const premiumBadgeStyle = useAnimatedStyle(() => ({
    transform: [{scale: premiumBadgeScale.value}],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: iconFloat.value * -8},
      {scale: 1 + iconFloat.value * 0.05},
    ],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{scale: buttonScale.value}],
  }));

  const handleQuizPress = () => {
    navigation.navigate('Onboarding', {screen: 'HairQuiz'});
  };

  const handleImageAnalysisPress = () => {
    setIsPaywallVisible(true);
  };

  const handlePaywallClose = () => {
    setIsPaywallVisible(false);
  };

  const handleSubscribe = async () => {
    try {
      console.log(
        'HairAnalysisOptions.tsx: Processing $25/month subscription...',
      );
      setIsPaywallVisible(false);
      navigation.navigate('Onboarding', {screen: 'HairAnalysis'});
    } catch (error) {
      console.error('HairAnalysisOptions.tsx: Subscription failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={headerStyle}>
        <Header
          title="Choose Your Analysis Method"
          subtitle="Select the best way to discover your hair type"
          onBackPress={() => navigation.goBack()}
        />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View style={[styles.optionCard, quizCardStyle]}>
          <Animated.View style={iconStyle}>
            <Image
              source={require('../../assets/images/quiz-icon.png')}
              style={styles.optionIcon}
              resizeMode="contain"
              accessibilityLabel="Quiz icon"
            />
          </Animated.View>
          <Animated.Text style={styles.optionTitle}>AI Hair Quiz</Animated.Text>
          <Animated.Text style={styles.optionDescription}>
            Answer a series of questions about your hair characteristics and let
            our AI determine your hair type and care needs.
          </Animated.Text>
          <Animated.View style={styles.priceContainer}>
            <Animated.Text style={styles.freeText}>Free</Animated.Text>
          </Animated.View>
          <AnimatedButton
            mode="contained"
            style={[styles.optionButton, buttonStyle]}
            contentStyle={styles.buttonContent}
            onPress={handleQuizPress}
            accessibilityLabel="Start hair quiz"
            accessibilityHint="Begin the AI hair quiz to determine your hair type">
            Start Quiz
          </AnimatedButton>
        </Animated.View>

        <Animated.View
          style={[styles.optionCard, styles.premiumCard, premiumCardStyle]}>
          <Animated.View style={[styles.premiumBadge, premiumBadgeStyle]}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </Animated.View>
          <Animated.View style={iconStyle}>
            <Image
              source={require('../../assets/images/camera-icon.png')}
              style={styles.optionIcon}
              resizeMode="contain"
              accessibilityLabel="Camera icon"
            />
          </Animated.View>
          <Animated.Text style={styles.optionTitle}>
            AI Image Analysis
          </Animated.Text>
          <Animated.Text style={styles.optionDescription}>
            Upload photos of your hair and get instant analysis using our most
            advanced AI technology for the most accurate results.
          </Animated.Text>
          <Animated.View style={styles.priceContainer}>
            <Animated.Text style={styles.priceText}>$25</Animated.Text>
            <Animated.Text style={styles.periodText}>/month</Animated.Text>
          </Animated.View>
          <AnimatedButton
            mode="contained"
            style={[styles.optionButton, styles.premiumButton, buttonStyle]}
            contentStyle={styles.buttonContent}
            onPress={handleImageAnalysisPress}
            accessibilityLabel="Try AI image analysis"
            accessibilityHint="Subscribe to premium AI image analysis for $25 per month">
            Try Image Analysis
          </AnimatedButton>
        </Animated.View>
      </View>

      <Paywall
        visible={isPaywallVisible}
        onClose={handlePaywallClose}
        onSubscribe={handleSubscribe}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumCard: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  optionIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A2C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 16,
    color: '#6D4C41',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2C1E',
  },
  periodText: {
    fontSize: 16,
    color: '#6D4C41',
    marginLeft: 4,
  },
  freeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D4C41',
    marginLeft: 4,
  },
  optionButton: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#8D6E63',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  premiumButton: {
    backgroundColor: '#FFD700',
  },
  premiumBadge: {
    position: 'absolute',
    top: -12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    zIndex: 1,
  },
  premiumText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HairAnalysisOptionsScreen;
