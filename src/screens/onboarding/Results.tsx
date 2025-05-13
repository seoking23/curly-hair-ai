import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Alert,
  Text,
  TextStyle,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ScreenNavigationProp,
  ResultsScreenRouteProp,
} from '../../types/navigation';
import {DesignSystem} from '../../styles/designSystem';
import {Header} from '../../components/Header';
import {Card} from '../../components/Card';
import {ResultsCard} from '../../components/ResultsCard';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Import custom SVG icons
import {
  SatinBonnetIcon,
  MoistureSealIcon,
  ProtectiveStyleIcon,
  TrimEndsIcon,
  HeatProtectantIcon,
  MinimizeHeatIcon,
  WashFrequencyIcon,
  DeepConditionIcon,
  ProteinTreatmentIcon,
  DetangleIcon,
  WetStylingIcon,
  HeatCuticleIcon,
  AvoidHeatIcon,
  ShampooIcon,
  CoWashIcon,
  ConditionerIcon,
  LeaveInConditionerIcon,
  CurlCreamIcon,
  StylingGelIcon,
  ProteinTreatmentProductIcon,
  ScalpTreatmentIcon,
  MousseIcon,
  ArrowRight,
  SaveIcon,
} from '../../components/icons';
import ResultsWatermark from '../../components/ResultsWatermark';
import {saveAndShareResults} from '../../utils/resultsShareService';

// Define proper types for hairType and porosity
type HairTypeKey =
  | '1'
  | '2A'
  | '2B'
  | '2C'
  | '3A'
  | '3B'
  | '3C'
  | '4A'
  | '4B'
  | '4C';
type PorosityKey = 'Low' | 'Medium' | 'High';

// Hair type image mapping
const hairTypeImages = {
  '1': require('../../assets/images/hair_type_1a.jpg'),
  '2A': require('../../assets/images/hair_type_2a.png'),
  '2B': require('../../assets/images/hair_type_2b.jpeg'),
  '2C': require('../../assets/images/hair_type_2c.jpg'),
  '3A': require('../../assets/images/hair_type_3a.jpg'),
  '3B': require('../../assets/images/hair_type_3b.jpg'),
  '3C': require('../../assets/images/hair_type_3c.jpg'),
  '4A': require('../../assets/images/hair_type_4a.jpg'),
  '4B': require('../../assets/images/hair_type_4b.png'),
  '4C': require('../../assets/images/hair_type_4c.jpg'),
} as const;

// Map routine text to appropriate icon component
const getRoutineIcon = (routineText: string) => {
  if (routineText.includes('Wash')) {
    return <WashFrequencyIcon size={20} color={DesignSystem.colors.primary} />;
  } else if (routineText.includes('Deep condition')) {
    return <DeepConditionIcon size={20} color={DesignSystem.colors.primary} />;
  } else if (routineText.includes('Protein treatment')) {
    return (
      <ProteinTreatmentIcon size={20} color={DesignSystem.colors.primary} />
    );
  } else if (routineText.includes('Detangle')) {
    return <DetangleIcon size={20} color={DesignSystem.colors.primary} />;
  } else if (routineText.includes('Style on wet')) {
    return <WetStylingIcon size={20} color={DesignSystem.colors.primary} />;
  } else if (routineText.includes('Use heat to help open cuticles')) {
    return <HeatCuticleIcon size={20} color={DesignSystem.colors.primary} />;
  } else if (routineText.includes('Avoid excessive heat')) {
    return <AvoidHeatIcon size={20} color={DesignSystem.colors.primary} />;
  }
  // Default icon if no match
  return (
    <Icon name="clock-outline" size={20} color={DesignSystem.colors.primary} />
  );
};

// Map care instruction text to appropriate icon component
const getCareInstructionIcon = (instructionText: string) => {
  if (instructionText.includes('satin') || instructionText.includes('silk')) {
    return <SatinBonnetIcon size={20} color={DesignSystem.colors.info} />;
  } else if (instructionText.includes('Seal moisture')) {
    return <MoistureSealIcon size={20} color={DesignSystem.colors.info} />;
  } else if (instructionText.includes('protective styling')) {
    return <ProtectiveStyleIcon size={20} color={DesignSystem.colors.info} />;
  } else if (instructionText.includes('Trim ends')) {
    return <TrimEndsIcon size={20} color={DesignSystem.colors.info} />;
  } else if (instructionText.includes('heat protectant')) {
    return <HeatProtectantIcon size={20} color={DesignSystem.colors.info} />;
  } else if (instructionText.includes('Minimize heat')) {
    return <MinimizeHeatIcon size={20} color={DesignSystem.colors.info} />;
  }
  // Default icon if no match
  return <Icon name="information" size={20} color={DesignSystem.colors.info} />;
};

// Map product text to appropriate icon component
const getProductIcon = (productText: string) => {
  if (productText.includes('shampoo')) {
    return <ShampooIcon size={20} color={DesignSystem.colors.success} />;
  } else if (productText.includes('co-wash')) {
    return <CoWashIcon size={20} color={DesignSystem.colors.success} />;
  } else if (
    productText.includes('Deep conditioner') ||
    (productText.includes('conditioner') && !productText.includes('leave-in'))
  ) {
    return <ConditionerIcon size={20} color={DesignSystem.colors.success} />;
  } else if (productText.includes('Leave-in conditioner')) {
    return (
      <LeaveInConditionerIcon size={20} color={DesignSystem.colors.success} />
    );
  } else if (productText.includes('cream') || productText.includes('butter')) {
    return <CurlCreamIcon size={20} color={DesignSystem.colors.success} />;
  } else if (
    productText.includes('gel') ||
    productText.includes('edge control')
  ) {
    return <StylingGelIcon size={20} color={DesignSystem.colors.success} />;
  } else if (productText.includes('Protein treatment')) {
    return (
      <ProteinTreatmentProductIcon
        size={20}
        color={DesignSystem.colors.success}
      />
    );
  } else if (productText.includes('Scalp') || productText.includes('oil')) {
    return <ScalpTreatmentIcon size={20} color={DesignSystem.colors.success} />;
  } else if (
    productText.includes('mousse') ||
    productText.includes('volumizing')
  ) {
    return <MousseIcon size={20} color={DesignSystem.colors.success} />;
  }
  // Default icon if no match
  return (
    <Icon name="check-circle" size={20} color={DesignSystem.colors.success} />
  );
};

const ResultsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const {
    hairType,
    porosity,
    density,
    thickness,
    elasticity,
    scalpCondition,
    productCompatibility,
    maintenanceLevel,
    recommendedProducts,
    recommendedRoutine,
    careInstructions,
  } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Create a ref for the results container to capture it as an image
  const resultsContainerRef = useRef(null);

  // Enable LayoutAnimation for Android
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  useEffect(() => {
    // Configure the animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Start the fade and slide animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After initial animations complete, trigger content expansion
      setTimeout(() => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            400, // duration
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity,
          ),
        );
        setContentLoaded(true);
      }, 300);
    });
  }, [fadeAnim, slideAnim]);

  const hairTypeInfo = {
    '1': {
      description: 'Straight hair with no natural curl pattern',
      tips: ['Use volumizing products', 'Avoid heavy oils'],
    },
    '2A': {
      description: 'Slight wave, barely noticeable S-pattern',
      tips: ['Use lightweight products', 'Enhance natural waves'],
    },
    '2B': {
      description: 'Defined S-waves throughout hair',
      tips: ['Use curl-enhancing products', 'Avoid heavy styling'],
    },
    '2C': {
      description: 'Well-defined S-waves, almost curly',
      tips: ['Use moisturizing products', 'Define waves while damp'],
    },
    '3A': {
      description: 'Loose curls with a well-defined S-shape',
      tips: ['Use lightweight products', 'Diffuse to enhance curls'],
    },
    '3B': {
      description: 'Springy, tight curls with volume',
      tips: ['Deep condition regularly', 'Avoid heavy oils'],
    },
    '3C': {
      description: 'Tight, dense corkscrew curls',
      tips: ['Co-wash frequently', 'Use leave-in conditioners'],
    },
    '4A': {
      description: 'Tightly coiled S-pattern curls',
      tips: ['Seal moisture with oils', 'Regular deep treatments'],
    },
    '4B': {
      description: 'Z-pattern curls with less definition',
      tips: ['LOC/LCO method for moisture', 'Protect at night with satin'],
    },
    '4C': {
      description: 'Extremely tight, less defined coils',
      tips: ['Maximum moisture routines', 'Gentle detangling methods'],
    },
  };

  const porosityInfo = {
    Low: {
      description: 'Hair that resists moisture absorption',
      tips: ['Use heat to open cuticles', 'Try lightweight products'],
    },
    Medium: {
      description: 'Balanced moisture absorption and retention',
      tips: ['Maintain current moisture balance', 'Regular protein treatments'],
    },
    High: {
      description: 'Hair that absorbs moisture quickly but loses it easily',
      tips: ['Seal moisture with oils/butters', 'Regular protein treatments'],
    },
  };

  const densityInfo = {
    Low: {
      description: 'Fewer hair strands per square inch',
      tips: ['Volumizing products', 'Lightweight styling techniques'],
    },
    Medium: {
      description: 'Average amount of hair strands',
      tips: ['Balance moisture and protein', 'Most styling methods work well'],
    },
    High: {
      description: 'Many hair strands per square inch',
      tips: ['Layered haircuts for management', 'Section hair when styling'],
    },
  };

  // Use type assertion for lookup
  const currentHairType =
    hairTypeInfo[hairType as HairTypeKey] || hairTypeInfo['4B'];
  const currentPorosity =
    porosityInfo[porosity as PorosityKey] || porosityInfo.Medium;
  const currentDensity =
    densityInfo[density as PorosityKey] || densityInfo.Medium;

  // Get the appropriate image for the hair type
  const getHairTypeImage = (type: string) => {
    const key = type as keyof typeof hairTypeImages;
    return hairTypeImages[key] || hairTypeImages['4B']; // Default to 4B if type not found
  };

  // Function to handle saving the results
  const handleSaveResults = async (shareAfterSave: boolean = false) => {
    try {
      setIsSaving(true);

      // Prepare the results data
      const resultsData = {
        hairType,
        porosity,
        density,
        thickness,
        elasticity,
        scalpCondition,
        productCompatibility,
        maintenanceLevel,
        recommendedProducts,
        recommendedRoutine,
        careInstructions,
      };

      // Save and optionally share the results
      await saveAndShareResults(
        resultsData,
        resultsContainerRef,
        shareAfterSave,
      );
    } catch (error) {
      console.error('Results.tsx: Error saving results:', error);
      Alert.alert(
        'Error Saving Results',
        'There was an error saving your results. Please try again.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Your Hair Analysis"
        subtitle="Personalized results based on your hair"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          ref={resultsContainerRef}
          style={[
            styles.resultsContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <Card style={styles.heroCard}>
            <View style={styles.hairTypeHeader}>
              <View>
                <Text style={styles.hairTypeTitle}>Your Hair Type</Text>
                <Text style={styles.hairTypeValue}>{hairType}</Text>
              </View>
              <Image
                source={getHairTypeImage(hairType)}
                style={styles.hairTypeImage}
                accessibilityLabel={`Hair type ${hairType} illustration`}
              />
            </View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {currentHairType.description}
            </Text>
            {currentHairType.tips.map((tip, index) => (
              <View
                key={`tip-${index}`}
                style={[
                  styles.tipRow,
                  contentLoaded ? {} : {opacity: 0, height: 0},
                ]}>
                <View style={styles.bulletPoint} />
                <Text style={styles.hairTypeTip}>{tip}</Text>
              </View>
            ))}
          </Card>

          <ResultsCard
            title="Key Characteristics"
            items={[
              {
                label: 'Hair Type',
                value: hairType,
                description: currentHairType.description,
              },
              {
                label: 'Porosity',
                value: porosity,
                description: currentPorosity.description,
              },
              {
                label: 'Density',
                value: density,
                description: currentDensity.description,
              },
              {
                label: 'Thickness',
                value: thickness,
                description: 'Individual strand thickness',
              },
              {
                label: 'Elasticity',
                value: elasticity,
                description: 'Hair stretch and bounce-back',
              },
              {
                label: 'Scalp Condition',
                value: scalpCondition,
                description: 'Overall scalp health',
              },
              {
                label: 'Product Compatibility',
                value: productCompatibility,
                description: 'How hair responds to products',
              },
              {
                label: 'Maintenance Level',
                value: maintenanceLevel,
                description: 'Required care intensity',
              },
            ]}
            style={styles.characteristicsCard}
          />

          <Card style={styles.recommendationsCard}>
            <Text style={styles.sectionTitle}>Recommended Products</Text>
            <View style={styles.divider} />
            {recommendedProducts.map((product, index) => (
              <View key={`product-${index}`} style={styles.listItem}>
                {getProductIcon(product)}
                <Text style={styles.listItemText}>{product}</Text>
              </View>
            ))}
          </Card>

          <Card style={styles.recommendationsCard}>
            <Text style={styles.sectionTitle}>Recommended Routine</Text>
            <View style={styles.divider} />
            {recommendedRoutine.map((routine, index) => (
              <View key={`routine-${index}`} style={styles.listItem}>
                {getRoutineIcon(routine)}
                <Text style={styles.listItemText}>{routine}</Text>
              </View>
            ))}
          </Card>

          <Card style={styles.recommendationsCard}>
            <Text style={styles.sectionTitle}>Care Instructions</Text>
            <View style={styles.divider} />
            {careInstructions.map((instruction, index) => (
              <View key={`instruction-${index}`} style={styles.listItem}>
                {getCareInstructionIcon(instruction)}
                <Text style={styles.listItemText}>{instruction}</Text>
              </View>
            ))}
          </Card>

          {/* Add watermark for screenshots */}
          <ResultsWatermark />
        </Animated.View>

        <View style={styles.actionButtons}>
          <CustomButton
            title="Create Account"
            icon={<ArrowRight size={20} color="#FFFFFF" />}
            onPress={() =>
              navigation.navigate('SignUp', {
                hairType,
                porosity,
                density,
                thickness,
                elasticity,
                scalpCondition,
                productCompatibility,
                maintenanceLevel,
                recommendedProducts,
                recommendedRoutine,
                careInstructions,
              })
            }
            style={styles.createAccountButton}
            accessibilityLabel="Create account to save your hair analysis results"
          />

          <CustomButton
            title={isSaving ? 'Saving...' : 'Save Results'}
            variant="secondary"
            icon={
              isSaving ? (
                <ActivityIndicator
                  size="small"
                  color={DesignSystem.colors.primary}
                />
              ) : (
                <SaveIcon size={20} color={DesignSystem.colors.primary} />
              )
            }
            onPress={() => handleSaveResults(true)}
            style={styles.saveButton}
            disabled={isSaving}
            accessibilityLabel="Save your hair analysis results"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
  },
  scrollContent: {
    padding: DesignSystem.spacing.lg,
  },
  resultsContainer: {
    marginBottom: DesignSystem.spacing.lg,
  },
  heroCard: {
    backgroundColor: DesignSystem.colors.primaryLight,
    marginBottom: DesignSystem.spacing.lg,
    padding: DesignSystem.spacing.xl,
    borderRadius: DesignSystem.borderRadius.lg,
    elevation: 4,
    shadowColor: DesignSystem.colors.shadow,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  hairTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.lg,
    paddingBottom: DesignSystem.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  hairTypeTitle: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
    marginBottom: DesignSystem.spacing.sm,
  },
  hairTypeValue: {
    fontSize: DesignSystem.typography.fontSize.heading1,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
  },
  hairTypeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: DesignSystem.colors.card,
    backgroundColor: DesignSystem.colors.background,
    resizeMode: 'cover',
  },
  descriptionTitle: {
    fontSize: DesignSystem.typography.fontSize.heading4,
    fontWeight: '700',
    color: '#4A2C1E',
  },
  descriptionText: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textSecondary,
    marginBottom: DesignSystem.spacing.md,
  },
  descriptionContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: DesignSystem.borderRadius.md,
    padding: DesignSystem.spacing.lg,
    marginBottom: DesignSystem.spacing.lg,
    borderWidth: 1,
    borderColor: '#1B5E20',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  hairTypeDescription: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: '#FFFFFF',
    lineHeight: DesignSystem.typography.lineHeight.relaxed,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  tipsTitle: {
    fontSize: DesignSystem.typography.fontSize.heading4,
    fontWeight: '700',
    color: '#4A2C1E',
    marginBottom: DesignSystem.spacing.md,
    marginTop: DesignSystem.spacing.lg,
  },
  tipsContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: DesignSystem.borderRadius.md,
    padding: DesignSystem.spacing.lg,
    marginBottom: DesignSystem.spacing.md,
    borderWidth: 1,
    borderColor: '#FFE082',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DesignSystem.spacing.md,
    paddingVertical: DesignSystem.spacing.xs,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA000',
    marginRight: DesignSystem.spacing.sm,
    marginTop: DesignSystem.spacing.xs,
  },
  hairTypeTip: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: '#5D4037',
    flex: 1,
  },
  characteristicsCard: {
    marginBottom: DesignSystem.spacing.lg,
  },
  recommendationsCard: {
    padding: DesignSystem.spacing.lg,
    marginBottom: DesignSystem.spacing.lg,
  },
  sectionTitle: {
    fontSize: DesignSystem.typography.fontSize.heading3,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
    marginBottom: DesignSystem.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: DesignSystem.colors.divider,
    marginBottom: DesignSystem.spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.md,
  },
  listItemText: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textSecondary,
    marginLeft: DesignSystem.spacing.md,
    flex: 1,
  },
  actionButtons: {
    marginTop: DesignSystem.spacing.lg,
  },
  createAccountButton: {
    marginBottom: DesignSystem.spacing.md,
  },
  saveButton: {
    marginBottom: DesignSystem.spacing.xl,
  },
  collapsedContainer: {
    maxHeight: 20,
    overflow: 'hidden',
    opacity: 0.7,
  },
  expandedContainer: {
    maxHeight: 500, // Large enough to fit content
    opacity: 1,
  },
});

export default ResultsScreen;
