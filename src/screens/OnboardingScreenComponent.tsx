import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/ApplicationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface OnboardingScreenComponentProps {
  navigation: OnboardingScreenNavigationProp;
}

export const OnboardingScreenComponent: React.FC<
  OnboardingScreenComponentProps
> = ({navigation}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Check if user has completed onboarding before
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboarding_completed',
        );
        if (onboardingCompleted === 'true') {
          // Skip to home if onboarding was completed
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, navigation]);

  // Handle continue to next screen
  const handleContinue = () => {
    navigation.navigate('OnboardingHairTypeEducation');
  };

  // Handle skip onboarding
  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <Image
          source={require('../assets/images/curly-hair-ai-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.welcomeTitle}>Welcome to CurlyHairAI</Text>

        <Text style={styles.welcomeDescription}>
          Your personal hair journey starts here. Discover your unique hair
          texture and get personalized care routines designed specifically for
          your hair type.
        </Text>

        <View style={styles.highlightsContainer}>
          <View style={styles.highlightItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🔍</Text>
            </View>
            <View style={styles.highlightTextContainer}>
              <Text style={styles.highlightTitle}>Hair Analysis</Text>
              <Text style={styles.highlightDescription}>
                Identify your exact hair texture type with our analysis tool
              </Text>
            </View>
          </View>

          <View style={styles.highlightItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>✨</Text>
            </View>
            <View style={styles.highlightTextContainer}>
              <Text style={styles.highlightTitle}>Custom Routines</Text>
              <Text style={styles.highlightDescription}>
                Get care routines tailored to your specific hair needs
              </Text>
            </View>
          </View>

          <View style={styles.highlightItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📊</Text>
            </View>
            <View style={styles.highlightTextContainer}>
              <Text style={styles.highlightTitle}>Track Progress</Text>
              <Text style={styles.highlightDescription}>
                Monitor your hair health journey over time
              </Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.continueButton}
          labelStyle={styles.buttonLabel}
          onPress={handleContinue}>
          Let's Get Started
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF', // Light purple background
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#6A0DAD',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
  highlightsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E2D5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  highlightTextContainer: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  highlightDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  continueButton: {
    width: width * 0.8,
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#6A0DAD',
    borderRadius: 28,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
