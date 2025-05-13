import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Card, ActivityIndicator, RadioButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RootStackParamList,
  HairTextureType,
  UserHairProfile,
} from '../types/ApplicationTypes';
import {hairAnalysisService} from '../services/hairAnalysisService';

type OnboardingHairTypeSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingHairTypeSelection'
>;

interface OnboardingHairTypeSelectionScreenComponentProps {
  navigation: OnboardingHairTypeSelectionNavigationProp;
}

export const OnboardingHairTypeSelectionScreenComponent: React.FC<
  OnboardingHairTypeSelectionScreenComponentProps
> = ({navigation}) => {
  const [selectedHairType, setSelectedHairType] =
    useState<HairTextureType | null>(null);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<HairTextureType | null>(
    null,
  );
  const [selectionMethod, setSelectionMethod] = useState<'manual' | 'analysis'>(
    'manual',
  );

  // Handle image selection
  const handleSelectImage = async (useCamera: boolean) => {
    const options = {
      mediaType: 'photo' as const,
      quality: 1,
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    try {
      const result = useCamera
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert(
          'Error',
          'There was an error selecting your image. Please try again.',
        );
      } else if (
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        setSelectedImageUri(result.assets[0].uri);
        setAnalysisResult(null); // Reset any previous analysis
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert(
        'Error',
        'There was an error selecting your image. Please try again.',
      );
    }
  };

  // Analyze hair texture using AI service
  const analyzeHairTexture = async () => {
    if (!selectedImageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await hairAnalysisService.analyzeHairImage(
        selectedImageUri,
      );

      setAnalysisResult(result.hairType);
      setSelectedHairType(result.hairType);

      // If confidence is low, show a warning
      if (result.confidence < 0.7) {
        Alert.alert(
          'Analysis Note',
          'The hair type analysis is not completely certain. Please verify the result or try uploading a clearer image.',
          [
            {
              text: 'OK',
              onPress: () =>
                console.log('User acknowledged low confidence result'),
            },
          ],
        );
      }

      // Show recommendations if available
      const recommendations = result.metadata?.recommendations;
      if (recommendations && recommendations.length > 0) {
        console.log('Hair care recommendations:', recommendations);
      }
    } catch (error) {
      console.error('Error analyzing hair texture:', error);
      Alert.alert(
        'Analysis Error',
        'There was an error analyzing your hair texture. Please try again.',
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle continuing to the app
  const handleContinue = async () => {
    if (!selectedHairType) {
      Alert.alert(
        'Error',
        'Please select your hair type or complete the analysis first',
      );
      return;
    }

    // Create a user profile with the selected hair type
    const userHairProfile: UserHairProfile = {
      userId: 'user-' + Date.now(),
      userHairTextureType: selectedHairType,
      userHairPorosity: null,
      userHairDensity: null,
      userHairThickness: null,
      userHairLength: null,
      userHairGoals: [],
      userHairIssues: [],
      userHairImages: selectedImageUri ? [selectedImageUri] : [],
    };

    try {
      // Save user profile
      await AsyncStorage.setItem(
        'user_profile',
        JSON.stringify(userHairProfile),
      );

      // Mark onboarding as completed
      await AsyncStorage.setItem('onboarding_completed', 'true');

      // Navigate to home screen
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
      Alert.alert(
        'Error',
        'Failed to save your hair profile. Please try again.',
      );
    }
  };

  const handleBackToPrevious = () => {
    navigation.goBack();
  };

  // Hair type selection with images
  const renderHairTypeSelection = () => {
    return (
      <ScrollView>
        <Text style={styles.instructionText}>
          Select the hair type that most closely matches your natural texture:
        </Text>

        <RadioButton.Group
          onValueChange={(value: string) =>
            setSelectedHairType(value as HairTextureType)
          }
          value={selectedHairType || ''}>
          {Object.values(HairTextureType).map(hairType => (
            <TouchableOpacity
              key={hairType}
              onPress={() => setSelectedHairType(hairType)}
              style={styles.hairTypeOption}>
              <View style={styles.hairTypeImageContainer}>
                <Image
                  source={getHairTypeImage(hairType)}
                  style={styles.hairTypeOptionImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.hairTypeTextContainer}>
                <Text style={styles.hairTypeLabel}>{hairType}</Text>
                <RadioButton.Android value={hairType} />
              </View>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </ScrollView>
    );
  };

  // Analysis section
  const renderAnalysisSection = () => {
    return (
      <ScrollView>
        <Text style={styles.instructionText}>
          Upload a clear photo of your hair to analyze your texture type:
        </Text>

        <View style={styles.imageSelectionContainer}>
          {selectedImageUri ? (
            <Card style={styles.selectedImageCard}>
              <Card.Cover
                source={{uri: selectedImageUri}}
                style={styles.selectedImage}
              />
              <Card.Actions>
                <Button
                  icon="refresh"
                  onPress={() => setSelectedImageUri(null)}>
                  Change Image
                </Button>
              </Card.Actions>
            </Card>
          ) : (
            <View style={styles.imageUploadPlaceholder}>
              <Text style={styles.imageUploadText}>No image selected</Text>
              <View style={styles.imageButtonsContainer}>
                <Button
                  mode="contained"
                  icon="camera"
                  style={styles.imageButton}
                  onPress={() => handleSelectImage(true)}>
                  Take Photo
                </Button>
                <Button
                  mode="contained"
                  icon="image"
                  style={styles.imageButton}
                  onPress={() => handleSelectImage(false)}>
                  Browse Gallery
                </Button>
              </View>
            </View>
          )}
        </View>

        {selectedImageUri && !isAnalyzing && !analysisResult && (
          <Button
            mode="contained"
            icon="magnify"
            style={styles.analyzeButton}
            onPress={analyzeHairTexture}>
            Analyze My Hair
          </Button>
        )}

        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#6A0DAD" />
            <Text style={styles.analyzingText}>
              Analyzing your hair texture...
            </Text>
          </View>
        )}

        {analysisResult && (
          <Card style={styles.resultsContainer}>
            <Card.Content>
              <Text style={styles.resultsTitleText}>Analysis Results:</Text>
              <Text style={styles.hairTypeText}>
                Your hair is {analysisResult}
              </Text>
              <Text style={styles.resultsDescription}>
                This analysis is based on the visual pattern and characteristics
                of your hair in the uploaded image.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    );
  };

  // Get the appropriate image for a hair type
  const getHairTypeImage = (hairType: HairTextureType) => {
    switch (hairType) {
      case HairTextureType.TYPE_1A:
        return require('../assets/images/hair_type_1a.jpg');
      case HairTextureType.TYPE_2A:
        return require('../assets/images/hair_type_2a.png');
      case HairTextureType.TYPE_2B:
        return require('../assets/images/hair_type_2b.jpeg');
      case HairTextureType.TYPE_2C:
        return require('../assets/images/hair_type_2c.jpg');
      case HairTextureType.TYPE_3A:
        return require('../assets/images/hair_type_3a.jpg');
      case HairTextureType.TYPE_3B:
        return require('../assets/images/hair_type_3b.jpg');
      case HairTextureType.TYPE_3C:
        return require('../assets/images/hair_type_3c.jpg');
      case HairTextureType.TYPE_4A:
        return require('../assets/images/hair_type_4a.jpg');
      case HairTextureType.TYPE_4B:
        return require('../assets/images/hair_type_4b.png');
      case HairTextureType.TYPE_4C:
        return require('../assets/images/hair_type_4c.jpg');
      default:
        return require('../assets/images/hair_type_3a.jpg');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackToPrevious}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identify Your Hair Type</Text>
      </View>

      <View style={styles.toggleContainer}>
        <Button
          mode={selectionMethod === 'manual' ? 'contained' : 'outlined'}
          style={styles.toggleButton}
          onPress={() => setSelectionMethod('manual')}>
          Manual Selection
        </Button>
        <Button
          mode={selectionMethod === 'analysis' ? 'contained' : 'outlined'}
          style={styles.toggleButton}
          onPress={() => setSelectionMethod('analysis')}>
          Photo Analysis
        </Button>
      </View>

      <View style={styles.contentContainer}>
        {selectionMethod === 'manual'
          ? renderHairTypeSelection()
          : renderAnalysisSection()}
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          mode="contained"
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={!selectedHairType}>
          Continue to Your Hair Care Journey
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#6A0DAD',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginRight: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  hairTypeOption: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  hairTypeImageContainer: {
    width: 100,
    height: 100,
  },
  hairTypeOptionImage: {
    width: '100%',
    height: '100%',
  },
  hairTypeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  hairTypeLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  imageSelectionContainer: {
    marginBottom: 25,
  },
  selectedImageCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedImage: {
    height: 300,
    borderRadius: 0,
  },
  imageUploadPlaceholder: {
    height: 250,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageUploadText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  imageButton: {
    width: '45%',
    backgroundColor: '#6A0DAD',
  },
  analyzeButton: {
    marginTop: 10,
    marginBottom: 25,
    backgroundColor: '#6A0DAD',
    height: 50,
    justifyContent: 'center',
  },
  analyzingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  analyzingText: {
    fontSize: 16,
    color: '#6A0DAD',
    marginTop: 15,
  },
  resultsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  resultsTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  hairTypeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 15,
  },
  resultsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtonsContainer: {
    padding: 20,
  },
  continueButton: {
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#6A0DAD',
    borderRadius: 28,
  },
});
