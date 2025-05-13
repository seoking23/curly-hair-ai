import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Card, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  HairTextureType,
  UserHairProfile,
} from '../types/ApplicationTypes';

type HairAnalysisScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HairAnalysis'
>;

interface HairAnalysisScreenComponentProps {
  navigation: HairAnalysisScreenNavigationProp;
}

export const HairAnalysisScreenComponent: React.FC<
  HairAnalysisScreenComponentProps
> = ({navigation}) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzedHairType, setAnalyzedHairType] =
    useState<HairTextureType | null>(null);

  // Handle image selection
  const handleSelectImage = async (useCamera: boolean) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    try {
      const result = useCamera
        ? await launchCamera(options as CameraOptions)
        : await launchImageLibrary(options as ImageLibraryOptions);

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
        setAnalyzedHairType(null); // Reset any previous analysis
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert(
        'Error',
        'There was an error selecting your image. Please try again.',
      );
    }
  };

  // Simulate hair analysis
  // In a real app, this would connect to a machine learning service
  const analyzeHairTexture = () => {
    if (!selectedImageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, randomly select a hair type
      const hairTypes = Object.values(HairTextureType);
      const randomHairType =
        hairTypes[Math.floor(Math.random() * hairTypes.length)];

      setAnalyzedHairType(randomHairType);
      setIsAnalyzing(false);
    }, 3000);
  };

  // Create a user profile with the analyzed hair type and continue to routine
  const handleContinueToRoutine = () => {
    if (!analyzedHairType) {
      Alert.alert('Error', 'Please complete the hair analysis first');
      return;
    }

    const userHairProfile: UserHairProfile = {
      userId: 'user-' + Date.now(), // In a real app, this would be a proper user ID
      userHairTextureType: analyzedHairType,
      userHairPorosity: null, // These would be set in a more comprehensive analysis
      userHairDensity: null,
      userHairThickness: null,
      userHairLength: null,
      userHairGoals: [],
      userHairIssues: [],
      userHairImages: selectedImageUri ? [selectedImageUri] : [],
    };

    navigation.navigate('HairCareRoutine', {userHairProfile});
  };

  // Navigate to hair type details page
  const viewHairTypeDetails = () => {
    if (analyzedHairType) {
      navigation.navigate('HairTypeDetails', {hairType: analyzedHairType});
    }
  };

  return (
    <SafeAreaView style={hairAnalysisScreenStyles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={hairAnalysisScreenStyles.scrollViewContainer}>
        <Text style={hairAnalysisScreenStyles.screenTitle}>
          Hair Texture Analysis
        </Text>

        <Text style={hairAnalysisScreenStyles.instructionsText}>
          Upload a clear image of your hair to analyze your texture type. For
          best results, take a picture in natural lighting with your hair in its
          natural state.
        </Text>

        <View style={hairAnalysisScreenStyles.imageSelectionContainer}>
          {selectedImageUri ? (
            <Card style={hairAnalysisScreenStyles.selectedImageCard}>
              <Card.Cover
                source={{uri: selectedImageUri}}
                style={hairAnalysisScreenStyles.selectedImage}
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
            <View style={hairAnalysisScreenStyles.imageUploadPlaceholder}>
              <Text style={hairAnalysisScreenStyles.imageUploadText}>
                No image selected
              </Text>
              <View style={hairAnalysisScreenStyles.imageButtonsContainer}>
                <Button
                  mode="contained"
                  icon="camera"
                  style={hairAnalysisScreenStyles.imageButton}
                  onPress={() => handleSelectImage(true)}>
                  Take Photo
                </Button>
                <Button
                  mode="contained"
                  icon="image"
                  style={hairAnalysisScreenStyles.imageButton}
                  onPress={() => handleSelectImage(false)}>
                  Browse Gallery
                </Button>
              </View>
            </View>
          )}
        </View>

        {selectedImageUri && !isAnalyzing && !analyzedHairType && (
          <Button
            mode="contained"
            icon="magnify"
            style={hairAnalysisScreenStyles.analyzeButton}
            onPress={analyzeHairTexture}>
            Analyze My Hair
          </Button>
        )}

        {isAnalyzing && (
          <View style={hairAnalysisScreenStyles.analyzingContainer}>
            <ActivityIndicator size="large" color="#6A0DAD" />
            <Text style={hairAnalysisScreenStyles.analyzingText}>
              Analyzing your hair texture...
            </Text>
          </View>
        )}

        {analyzedHairType && (
          <View style={hairAnalysisScreenStyles.resultsContainer}>
            <Text style={hairAnalysisScreenStyles.resultsTitleText}>
              Your Hair Analysis Results:
            </Text>
            <Text style={hairAnalysisScreenStyles.hairTypeText}>
              {analyzedHairType}
            </Text>

            <Button
              mode="text"
              icon="information-outline"
              style={hairAnalysisScreenStyles.moreInfoButton}
              onPress={viewHairTypeDetails}>
              Learn more about this hair type
            </Button>

            <Button
              mode="contained"
              style={hairAnalysisScreenStyles.continueButton}
              onPress={handleContinueToRoutine}>
              Get My Personalized Hair Care Routine
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const hairAnalysisScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 25,
    textAlign: 'center',
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  moreInfoButton: {
    marginBottom: 15,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#6A0DAD',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
  },
});
