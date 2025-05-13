import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, HairTextureType} from '../types/ApplicationTypes';

type HairTypeDetailsRouteProp = RouteProp<
  RootStackParamList,
  'HairTypeDetails'
>;
type HairTypeDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HairTypeDetails'
>;

interface HairTypeDetailsScreenComponentProps {
  route: HairTypeDetailsRouteProp;
  navigation: HairTypeDetailsNavigationProp;
}

interface HairTypeInfo {
  description: string;
  characteristics: string[];
  commonChallenges: string[];
  careRecommendations: string[];
  suitableProducts: string[];
}

export const HairTypeDetailsScreenComponent: React.FC<
  HairTypeDetailsScreenComponentProps
> = ({route}) => {
  const {hairType} = route.params;

  // Hair type details
  const hairTypeInfoMap: Record<HairTextureType, HairTypeInfo> = {
    [HairTextureType.TYPE_3A]: {
      description:
        'Type 3A hair has well-defined, loose curls that have a diameter similar to a piece of sidewalk chalk. It typically has a lot of shine and body.',
      characteristics: [
        'Loose, S-pattern curls',
        'Curls about an inch in diameter',
        'Generally shiny hair',
        'Curls with definite looping pattern',
        'Bouncy and springy texture',
      ],
      commonChallenges: [
        'Frizz, especially in humid conditions',
        'Curls may flatten easily',
        'Prone to dryness',
        'Can be weighed down by heavy products',
      ],
      careRecommendations: [
        'Use lightweight, water-based moisturizers',
        'Avoid heavy oils and butters that can weigh down curls',
        'Regular deep conditioning treatments',
        'Use diffuser when blow-drying',
        "Consider the 'Curly Girl Method' for washing",
      ],
      suitableProducts: [
        'Lightweight leave-in conditioners',
        'Curl-enhancing gels or mousses',
        'Sulfate-free shampoos',
        'Humectant-rich products',
      ],
    },
    [HairTextureType.TYPE_3B]: {
      description:
        "Type 3B curls are more defined and springy. They're tighter than 3A curls and have a circumference similar to that of a Sharpie marker.",
      characteristics: [
        'Medium-tight, springy curls',
        'Curls with circumference of a Sharpie marker',
        'More volume at the roots compared to 3A',
        'Well-defined ringlets',
        'Usually has a mixture of textures',
      ],
      commonChallenges: [
        'High tendency for frizz',
        'Dryness and dehydration',
        'Shrinkage (about 25-50%)',
        'Can be prone to breakage',
        'Tangles and knots',
      ],
      careRecommendations: [
        'Regular moisture with light to medium-weight products',
        'Weekly deep conditioning',
        'Protective styling during harsh weather',
        'Detangle gently when wet',
        'Use satin/silk pillowcase to prevent friction',
      ],
      suitableProducts: [
        'Creamy leave-in conditioners',
        'Medium-hold styling gels',
        'Curl-defining creams',
        'Light or medium oils (jojoba, grapeseed)',
      ],
    },
    [HairTextureType.TYPE_3C]: {
      description:
        'Type 3C curls are tight corkscrews that range in circumference from a pencil to a straw. This hair type is very voluminous, prone to frizz, and can experience a significant amount of shrinkage.',
      characteristics: [
        'Tight, densely packed curls',
        'Curls similar to a pencil or drinking straw in diameter',
        'Significant volume and fullness',
        'Tends to be coarse in texture',
        'Defined S-pattern when stretched',
      ],
      commonChallenges: [
        'High shrinkage (up to 50-75%)',
        'Very prone to dryness',
        'Highly susceptible to frizz',
        'Tangling and knots',
        'Breakage if not properly moisturized',
      ],
      careRecommendations: [
        'Frequent deep conditioning (weekly)',
        'Hydration-focused regimen',
        'Regular use of leave-in conditioners',
        'Protective styling to retain length',
        'Minimal heat styling',
        'Pre-poo treatments',
      ],
      suitableProducts: [
        'Rich, creamy conditioners',
        'Heavier styling creams and butters',
        'Natural oils like olive, avocado, and castor oil',
        'Anti-humectants for humid climates',
        'Protein treatments',
      ],
    },
    [HairTextureType.TYPE_4A]: {
      description:
        "Type 4A hair features tight coils with an 'S' pattern that is clearly visible. The coils are springy and have the circumference of a crochet needle.",
      characteristics: [
        'Tight, well-defined coils',
        'S-pattern visible when stretched',
        'Springy texture with good elasticity',
        'Coil diameter similar to a crochet needle',
        'Dense and voluminous',
      ],
      commonChallenges: [
        'Significant shrinkage (up to 70%)',
        'Prone to extreme dryness',
        'Fragility and breakage potential',
        'Difficulty retaining moisture',
        'Tangles and single-strand knots',
      ],
      careRecommendations: [
        'Focus on moisture retention',
        'LOC or LCO method (Liquid, Oil, Cream)',
        'Gentle detangling from ends to roots',
        'Protective styling',
        'Regular deep conditioning with heat',
        'Minimal manipulation routines',
      ],
      suitableProducts: [
        'Heavy creams and butters',
        'Penetrating oils like coconut and olive',
        'Thick leave-in conditioners',
        'Clay masks for gentle cleansing',
        'Aloe vera juice for hydration',
      ],
    },
    [HairTextureType.TYPE_4B]: {
      description:
        "Type 4B hair has a less defined pattern of curls and more of a 'Z' pattern as the hair bends with sharp angles. The strands are densely packed and can feel very soft.",
      characteristics: [
        'Z-shaped pattern rather than S-pattern',
        'Sharp, angled bends in the hair shaft',
        'Less defined curl pattern than 4A',
        'Appears fluffy when dry',
        'Densely packed strands',
        'Soft texture when properly moisturized',
      ],
      commonChallenges: [
        'Extreme shrinkage (up to 75%)',
        'Very high moisture needs',
        'Extremely fragile at the bends',
        'Difficulty achieving definition',
        'Dryness leading to breakage',
      ],
      careRecommendations: [
        'Heavy sealing to lock in moisture',
        'Minimal manipulation styles',
        'Stretching techniques to reduce breakage',
        'Regular protein treatments',
        'Hot oil treatments',
        'Frequent deep conditioning',
      ],
      suitableProducts: [
        'Ultra-moisturizing butters (shea, mango)',
        'Heavy oils like castor oil and black seed oil',
        'Thick, rich deep conditioners',
        'Whipped butter blends',
        'Moisturizing styling gels for definition',
      ],
    },
    [HairTextureType.TYPE_4C]: {
      description:
        'Type 4C is the tightest, most densely packed curl pattern. The curls are so tight they may not be visible to the naked eye. The hair can shrink up to 75% of its actual length.',
      characteristics: [
        'Extremely tight coil pattern, sometimes not visibly defined',
        'Maximum shrinkage (up to 75-80%)',
        'Very dense and thick appearance',
        'Delicate and fragile texture',
        'Can appear cotton-like when dry',
      ],
      commonChallenges: [
        'Extreme dryness',
        'Maximum shrinkage of all hair types',
        'Most prone to breakage',
        'Most difficult to achieve and maintain definition',
        'Tangles easily',
      ],
      careRecommendations: [
        'Maximum moisture regimen',
        'Protective styling majority of the time',
        'Tension-free styling methods',
        'Finger detangling primarily',
        'Pre-poo with oils before washing',
        'Regular scalp massages for blood circulation',
      ],
      suitableProducts: [
        'Heaviest creams and butters available',
        'Thick, penetrating oils',
        'Maximum moisture deep conditioners',
        'Butter-based styling products',
        'Emollient-rich leave-ins',
        'Hair grease or pomades for sealing',
      ],
    },
  };

  const currentHairTypeInfo = hairTypeInfoMap[hairType] as HairTypeInfo;

  return (
    <SafeAreaView style={hairTypeDetailsStyles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={hairTypeDetailsStyles.scrollViewContainer}>
        <Text style={hairTypeDetailsStyles.hairTypeTitle}>{hairType}</Text>

        <Card style={hairTypeDetailsStyles.infoCard}>
          <Card.Title title="Description" />
          <Card.Content>
            <Text style={hairTypeDetailsStyles.descriptionText}>
              {currentHairTypeInfo.description}
            </Text>
          </Card.Content>
        </Card>

        <Card style={hairTypeDetailsStyles.infoCard}>
          <Card.Title title="Characteristics" />
          <Card.Content>
            {currentHairTypeInfo.characteristics.map(
              (characteristic: string, index: number) => (
                <View
                  key={`char-${index}`}
                  style={hairTypeDetailsStyles.bulletPointContainer}>
                  <Text style={hairTypeDetailsStyles.bulletPoint}>•</Text>
                  <Text style={hairTypeDetailsStyles.bulletText}>
                    {characteristic}
                  </Text>
                </View>
              ),
            )}
          </Card.Content>
        </Card>

        <Card style={hairTypeDetailsStyles.infoCard}>
          <Card.Title title="Common Challenges" />
          <Card.Content>
            {currentHairTypeInfo.commonChallenges.map(
              (challenge: string, index: number) => (
                <View
                  key={`challenge-${index}`}
                  style={hairTypeDetailsStyles.bulletPointContainer}>
                  <Text style={hairTypeDetailsStyles.bulletPoint}>•</Text>
                  <Text style={hairTypeDetailsStyles.bulletText}>
                    {challenge}
                  </Text>
                </View>
              ),
            )}
          </Card.Content>
        </Card>

        <Card style={hairTypeDetailsStyles.infoCard}>
          <Card.Title title="Care Recommendations" />
          <Card.Content>
            {currentHairTypeInfo.careRecommendations.map(
              (recommendation: string, index: number) => (
                <View
                  key={`rec-${index}`}
                  style={hairTypeDetailsStyles.bulletPointContainer}>
                  <Text style={hairTypeDetailsStyles.bulletPoint}>•</Text>
                  <Text style={hairTypeDetailsStyles.bulletText}>
                    {recommendation}
                  </Text>
                </View>
              ),
            )}
          </Card.Content>
        </Card>

        <Card style={hairTypeDetailsStyles.infoCard}>
          <Card.Title title="Recommended Product Types" />
          <Card.Content>
            {currentHairTypeInfo.suitableProducts.map(
              (product: string, index: number) => (
                <View
                  key={`product-${index}`}
                  style={hairTypeDetailsStyles.bulletPointContainer}>
                  <Text style={hairTypeDetailsStyles.bulletPoint}>•</Text>
                  <Text style={hairTypeDetailsStyles.bulletText}>
                    {product}
                  </Text>
                </View>
              ),
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const hairTypeDetailsStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    padding: 20,
  },
  hairTypeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 5,
    color: '#6A0DAD',
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
    color: '#444',
  },
});
