import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../types/navigation';
import {DesignSystem} from '../../styles/designSystem';
import {Header} from '../../components/Header';
import {Button} from '../../components/Button';
import {PhotoPicker} from '../../components/ImagePicker';
import {ImageAsset} from '../../utils/types/ImageTypes.ts';
import LinearGradient from 'react-native-linear-gradient';

const HairAnalysisScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [image, setImage] = useState<ImageAsset | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleImageSelected = (selectedImage: ImageAsset) => {
    setImage(selectedImage);
  };

  const analyzeHair = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setAnalyzing(true);

    // In a real app, you would upload the image to your backend or AI service
    // For demo purposes, we'll simulate a delay and then navigate
    setTimeout(() => {
      setAnalyzing(false);
      navigation.navigate('Results', {
        hairType: '4B', // This would come from your analysis
        porosity: 'Medium',
        density: 'High',
        thickness: 'Medium',
        elasticity: 'High',
        scalpCondition: 'Healthy',
        productCompatibility: 'Good',
        maintenanceLevel: 'Medium',
        recommendedProducts: ['Product A', 'Product B'],
        recommendedRoutine: ['Routine A', 'Routine B'],
        careInstructions: ['Instruction 1', 'Instruction 2'],
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.3)']}
        style={styles.bottomBlur}
      />
      <Header
        title="Analyze Your Hair"
        subtitle="Let's discover your unique texture"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionBox}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>1</Text>
            </View>
            <Text style={styles.instructionText}>
              Take a clear photo of your natural hair in good lighting
            </Text>
          </View>

          <View style={styles.instructionBox}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>2</Text>
            </View>
            <Text style={styles.instructionText}>
              Make sure your curls/coils are visible and not stretched
            </Text>
          </View>

          <View style={styles.instructionBox}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>3</Text>
            </View>
            <Text style={styles.instructionText}>
              Your hair should be clean and free of products for best results
            </Text>
          </View>
        </View>

        <PhotoPicker
          image={image}
          onImageSelected={handleImageSelected}
          placeholderText="Take or select a photo of your hair"
          loading={analyzing}
          style={styles.imagePicker}
        />

        <Button
          title="Analyze My Hair"
          icon="hair-dryer-outline"
          onPress={analyzeHair}
          disabled={!image || analyzing}
          loading={analyzing}
          style={styles.analyzeButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bottomBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: DesignSystem.spacing.lg,
    position: 'relative',
    zIndex: 2,
  },
  instructionsContainer: {
    marginBottom: DesignSystem.spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: DesignSystem.spacing.md,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: DesignSystem.spacing.sm,
    borderRadius: 12,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8D6E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSystem.spacing.md,
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontSize: DesignSystem.typography.fontSize.small,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
  },
  instructionText: {
    flex: 1,
    fontSize: DesignSystem.typography.fontSize.body,
    color: '#4A2C1E',
  },
  imagePicker: {
    marginBottom: DesignSystem.spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: DesignSystem.spacing.md,
  },
  analyzeButton: {
    marginTop: DesignSystem.spacing.lg,
  },
});

export default HairAnalysisScreen;
