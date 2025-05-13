import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Card,
  Button,
  Checkbox,
  Chip,
  TextInput,
  Divider,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RootStackParamList,
  HairCareRoutineStep,
  HairTextureType,
} from '../types/ApplicationTypes';

type HairCareRoutineRouteProp = RouteProp<
  RootStackParamList,
  'HairCareRoutine'
>;
type HairCareRoutineNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HairCareRoutine'
>;

interface HairCareRoutineScreenComponentProps {
  route: HairCareRoutineRouteProp;
  navigation: HairCareRoutineNavigationProp;
}

export const HairCareRoutineScreenComponent: React.FC<
  HairCareRoutineScreenComponentProps
> = ({route, navigation}) => {
  const {userHairProfile} = route.params;

  // State to track routine steps
  const [routineSteps, setRoutineSteps] = useState<HairCareRoutineStep[]>([]);
  const [newProduct, setNewProduct] = useState<string>('');
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null,
  );

  // Load or create routine based on hair type
  useEffect(() => {
    const loadSavedRoutine = async () => {
      try {
        const savedRoutineString = await AsyncStorage.getItem(
          'hair_care_routine',
        );

        if (savedRoutineString) {
          const savedRoutine = JSON.parse(
            savedRoutineString,
          ) as HairCareRoutineStep[];
          setRoutineSteps(savedRoutine);
        } else {
          // Create default routine based on hair type
          const defaultRoutine = createDefaultRoutine(
            userHairProfile.userHairTextureType,
          );
          setRoutineSteps(defaultRoutine);
          // Save the default routine
          await AsyncStorage.setItem(
            'hair_care_routine',
            JSON.stringify(defaultRoutine),
          );
        }
      } catch (error) {
        console.error('Error loading routine:', error);
        Alert.alert('Error', 'Failed to load your hair care routine');

        // Create a default routine as fallback
        const defaultRoutine = createDefaultRoutine(
          userHairProfile.userHairTextureType,
        );
        setRoutineSteps(defaultRoutine);
      }
    };

    loadSavedRoutine();
  }, [userHairProfile]);

  // Save routine changes
  const saveRoutine = async (updatedRoutine: HairCareRoutineStep[]) => {
    try {
      await AsyncStorage.setItem(
        'hair_care_routine',
        JSON.stringify(updatedRoutine),
      );
    } catch (error) {
      console.error('Error saving routine:', error);
      Alert.alert('Error', 'Failed to save your changes');
    }
  };

  // Toggle step completion status
  const toggleStepCompletion = (stepId: string) => {
    const updatedSteps = routineSteps.map(step =>
      step.stepId === stepId
        ? {...step, stepIsComplete: !step.stepIsComplete}
        : step,
    );

    setRoutineSteps(updatedSteps);
    saveRoutine(updatedSteps);
  };

  // Add a product to a step
  const addProductToStep = (stepId: string) => {
    if (!newProduct.trim()) {
      Alert.alert('Error', 'Please enter a product name');
      return;
    }

    const updatedSteps = routineSteps.map(step =>
      step.stepId === stepId
        ? {...step, stepProducts: [...step.stepProducts, newProduct.trim()]}
        : step,
    );

    setRoutineSteps(updatedSteps);
    saveRoutine(updatedSteps);
    setNewProduct('');
    setSelectedStepIndex(null);
  };

  // Remove a product from a step
  const removeProductFromStep = (stepId: string, productIndex: number) => {
    const updatedSteps = routineSteps.map(step => {
      if (step.stepId === stepId) {
        const updatedProducts = [...step.stepProducts];
        updatedProducts.splice(productIndex, 1);
        return {...step, stepProducts: updatedProducts};
      }
      return step;
    });

    setRoutineSteps(updatedSteps);
    saveRoutine(updatedSteps);
  };

  // Create a default routine based on hair type
  const createDefaultRoutine = (
    hairType: HairTextureType | null,
  ): HairCareRoutineStep[] => {
    const commonSteps: HairCareRoutineStep[] = [
      {
        stepId: 'pre-poo',
        stepName: 'Pre-Poo Treatment',
        stepDescription:
          'Apply oils or conditioner to dry hair before shampooing to protect strands from harsh cleansers',
        stepFrequency: 'Weekly',
        stepProducts: ['Coconut oil', 'Olive oil'],
        stepIsComplete: false,
        stepDuration: '30 minutes',
      },
      {
        stepId: 'cleanse',
        stepName: 'Cleansing',
        stepDescription: 'Wash scalp and hair to remove buildup and impurities',
        stepFrequency: 'Weekly',
        stepProducts: ['Sulfate-free shampoo'],
        stepIsComplete: false,
        stepDuration: '5 minutes',
      },
      {
        stepId: 'deep-condition',
        stepName: 'Deep Conditioning',
        stepDescription:
          'Apply treatment to add moisture and nutrients to hair',
        stepFrequency: 'Weekly',
        stepProducts: ['Moisture-rich deep conditioner'],
        stepIsComplete: false,
        stepDuration: '30 minutes',
      },
      {
        stepId: 'leave-in',
        stepName: 'Leave-in Conditioner',
        stepDescription: 'Apply lightweight conditioner to keep hair hydrated',
        stepFrequency: 'Weekly or as needed',
        stepProducts: ['Water-based leave-in conditioner'],
        stepIsComplete: false,
        stepDuration: '2 minutes',
      },
      {
        stepId: 'style',
        stepName: 'Styling',
        stepDescription: 'Apply products to define curls and coils',
        stepFrequency: 'Weekly or as needed',
        stepProducts: ['Curl cream', 'Styling gel'],
        stepIsComplete: false,
        stepDuration: '10 minutes',
      },
      {
        stepId: 'protect',
        stepName: 'Protective Styling',
        stepDescription:
          'Wear styles that protect ends and minimize manipulation',
        stepFrequency: 'As needed',
        stepProducts: ['Hair pins', 'Satin scrunchies'],
        stepIsComplete: false,
        stepDuration: 'Varies',
      },
      {
        stepId: 'night-routine',
        stepName: 'Nighttime Routine',
        stepDescription:
          'Protect hair while sleeping to prevent breakage and dryness',
        stepFrequency: 'Daily',
        stepProducts: ['Satin bonnet', 'Silk pillowcase'],
        stepIsComplete: false,
        stepDuration: '5 minutes',
      },
    ];

    // Add specific steps based on hair type
    if (!hairType) return commonSteps;

    switch (hairType) {
      case HairTextureType.TYPE_4A:
      case HairTextureType.TYPE_4B:
      case HairTextureType.TYPE_4C:
        // Add more moisture-focused steps for type 4 hair
        return [
          ...commonSteps,
          {
            stepId: 'loc-method',
            stepName: 'LOC Method',
            stepDescription:
              'Apply Liquid, Oil, then Cream to lock in moisture',
            stepFrequency: 'Every 2-3 days',
            stepProducts: ['Water spray', 'Jojoba oil', 'Shea butter cream'],
            stepIsComplete: false,
            stepDuration: '10 minutes',
          },
          {
            stepId: 'scalp-massage',
            stepName: 'Scalp Massage',
            stepDescription:
              'Massage scalp to stimulate blood flow and promote growth',
            stepFrequency: '2-3 times per week',
            stepProducts: ['Scalp oil', 'Massage tool'],
            stepIsComplete: false,
            stepDuration: '5 minutes',
          },
        ];
      case HairTextureType.TYPE_3A:
      case HairTextureType.TYPE_3B:
      case HairTextureType.TYPE_3C:
        // Add curl-enhancing steps for type 3 hair
        return [
          ...commonSteps,
          {
            stepId: 'refresh-curls',
            stepName: 'Curl Refreshing',
            stepDescription: 'Revive curls between wash days',
            stepFrequency: 'Every 2-3 days',
            stepProducts: ['Water spray', 'Curl refresher'],
            stepIsComplete: false,
            stepDuration: '5 minutes',
          },
        ];
      default:
        return commonSteps;
    }
  };

  return (
    <SafeAreaView style={hairCareRoutineStyles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={hairCareRoutineStyles.scrollViewContainer}>
        <Card style={hairCareRoutineStyles.profileCard}>
          <Card.Content>
            <Text style={hairCareRoutineStyles.profileCardTitle}>
              Your Hair Profile
            </Text>
            <Text style={hairCareRoutineStyles.hairTypeText}>
              Hair Type:{' '}
              {userHairProfile.userHairTextureType || 'Not specified'}
            </Text>
          </Card.Content>
        </Card>

        <Text style={hairCareRoutineStyles.sectionTitle}>
          Your Personalized Hair Care Routine
        </Text>

        <Text style={hairCareRoutineStyles.instructionsText}>
          Follow this routine tailored to your specific hair type. Check off
          steps as you complete them and customize products to your preferences.
        </Text>

        {routineSteps.map((step, index) => (
          <Card
            key={step.stepId}
            style={[
              hairCareRoutineStyles.routineStepCard,
              step.stepIsComplete && hairCareRoutineStyles.completedStepCard,
            ]}>
            <Card.Content>
              <View style={hairCareRoutineStyles.stepHeaderContainer}>
                <Checkbox
                  status={step.stepIsComplete ? 'checked' : 'unchecked'}
                  onPress={() => toggleStepCompletion(step.stepId)}
                  color="#6A0DAD"
                />
                <View style={hairCareRoutineStyles.stepTitleContainer}>
                  <Text
                    style={[
                      hairCareRoutineStyles.stepNameText,
                      step.stepIsComplete &&
                        hairCareRoutineStyles.completedStepText,
                    ]}>
                    {step.stepName}
                  </Text>
                  <Chip
                    style={hairCareRoutineStyles.frequencyChip}
                    textStyle={hairCareRoutineStyles.frequencyChipText}>
                    {step.stepFrequency}
                  </Chip>
                </View>
              </View>

              <Text style={hairCareRoutineStyles.stepDescriptionText}>
                {step.stepDescription}
              </Text>

              <View style={hairCareRoutineStyles.durationContainer}>
                <Text style={hairCareRoutineStyles.durationLabel}>
                  Duration:{' '}
                </Text>
                <Text style={hairCareRoutineStyles.durationText}>
                  {step.stepDuration}
                </Text>
              </View>

              <Divider style={hairCareRoutineStyles.divider} />

              <Text style={hairCareRoutineStyles.productsLabel}>
                Recommended Products:
              </Text>

              <View style={hairCareRoutineStyles.productsContainer}>
                {step.stepProducts.map((product, productIndex) => (
                  <Chip
                    key={`${step.stepId}-product-${productIndex}`}
                    style={hairCareRoutineStyles.productChip}
                    onClose={() =>
                      removeProductFromStep(step.stepId, productIndex)
                    }
                    closeIcon="close">
                    {product}
                  </Chip>
                ))}
              </View>

              {selectedStepIndex === index ? (
                <View style={hairCareRoutineStyles.addProductContainer}>
                  <TextInput
                    style={hairCareRoutineStyles.addProductInput}
                    value={newProduct}
                    onChangeText={setNewProduct}
                    placeholder="Enter product name"
                    autoFocus
                  />
                  <Button
                    mode="contained"
                    onPress={() => addProductToStep(step.stepId)}
                    style={hairCareRoutineStyles.addProductButton}>
                    Add
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => setSelectedStepIndex(null)}
                    style={hairCareRoutineStyles.cancelButton}>
                    Cancel
                  </Button>
                </View>
              ) : (
                <Button
                  mode="text"
                  icon="plus"
                  onPress={() => setSelectedStepIndex(index)}
                  style={hairCareRoutineStyles.addProductTriggerButton}>
                  Add Product
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}

        <View style={hairCareRoutineStyles.actionButtonsContainer}>
          <Button
            mode="contained"
            style={hairCareRoutineStyles.hairInfoButton}
            onPress={() => {
              if (userHairProfile.userHairTextureType) {
                navigation.navigate('HairTypeDetails', {
                  hairType: userHairProfile.userHairTextureType,
                });
              }
            }}>
            View Hair Type Information
          </Button>

          <Button
            mode="outlined"
            icon="camera"
            style={hairCareRoutineStyles.takeNewPhotoButton}
            onPress={() => navigation.navigate('HairAnalysis')}>
            Take New Hair Photo
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const hairCareRoutineStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
  },
  profileCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  hairTypeText: {
    fontSize: 16,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  routineStepCard: {
    marginBottom: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6A0DAD',
  },
  completedStepCard: {
    borderLeftColor: '#4CAF50',
    opacity: 0.8,
  },
  stepHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  stepNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  completedStepText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  frequencyChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    height: 24,
  },
  frequencyChipText: {
    fontSize: 12,
  },
  stepDescriptionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  durationContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  durationLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    marginVertical: 10,
  },
  productsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  productChip: {
    margin: 4,
    backgroundColor: '#EEE',
  },
  addProductContainer: {
    marginTop: 10,
  },
  addProductInput: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  addProductButton: {
    marginBottom: 5,
    backgroundColor: '#6A0DAD',
  },
  cancelButton: {
    borderColor: '#6A0DAD',
  },
  addProductTriggerButton: {
    marginTop: 5,
  },
  actionButtonsContainer: {
    marginTop: 20,
  },
  hairInfoButton: {
    marginBottom: 10,
    backgroundColor: '#6A0DAD',
  },
  takeNewPhotoButton: {
    borderColor: '#6A0DAD',
  },
});
