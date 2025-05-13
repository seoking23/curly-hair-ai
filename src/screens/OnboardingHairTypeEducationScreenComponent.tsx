import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {Button, ProgressBar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, HairTextureType} from '../types/ApplicationTypes';

type OnboardingHairTypeEducationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingHairTypeEducation'
>;

interface OnboardingHairTypeEducationScreenComponentProps {
  navigation: OnboardingHairTypeEducationNavigationProp;
}

interface HairTypeEducationItem {
  id: string;
  type: HairTextureType;
  image: any; // This would be a require() for image assets
  title: string;
  description: string;
  characteristics: string[];
}

export const OnboardingHairTypeEducationScreenComponent: React.FC<
  OnboardingHairTypeEducationScreenComponentProps
> = ({navigation}) => {
  const [selectedHairType, setSelectedHairType] =
    useState<HairTypeEducationItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Define data for the educational slides
  const hairTypeData: HairTypeEducationItem[] = [
    {
      id: '1',
      type: HairTextureType.TYPE_1A,
      image: require('../assets/images/hair_type_1a.jpg'),
      title: 'Type 1A - Pin-Straight',
      description:
        'Type 1A hair is completely straight with no natural curl or wave pattern. The strands are usually very fine and thin.',
      characteristics: [
        'Pin-straight from root to tip',
        'Very fine and thin texture',
        'Highly resistant to curling',
        'Prone to oiliness',
        'Lacks natural volume',
      ],
    },
    {
      id: '2',
      type: HairTextureType.TYPE_2A,
      image: require('../assets/images/hair_type_2a.png'),
      title: 'Type 2A - Gentle Waves',
      description:
        'Type 2A hair has a slight bend that creates a loose "S" pattern, typically forming from the mid-shaft to the ends.',
      characteristics: [
        'Fine, thin texture',
        'Subtle S-pattern waves',
        'Easily straightens',
        'Can become flat at roots',
        'Minimal frizz tendency',
      ],
    },
    {
      id: '3',
      type: HairTextureType.TYPE_2B,
      image: require('../assets/images/hair_type_2b.jpeg'),
      title: 'Type 2B - Defined Waves',
      description:
        'Type 2B hair forms more defined S-shaped waves, usually starting from the mid-length of the hair shaft.',
      characteristics: [
        'More defined S-waves',
        'Medium texture',
        'Frizz-prone in humidity',
        'More volume than 2A',
        'Resistant to straightening',
      ],
    },
    {
      id: '4',
      type: HairTextureType.TYPE_2C,
      image: require('../assets/images/hair_type_2c.jpg'),
      title: 'Type 2C - Coarse Waves',
      description:
        'Type 2C hair has defined, coarse waves that start from the roots and can border on curly texture.',
      characteristics: [
        'Thick, coarse waves',
        'Waves start at roots',
        'Most frizz-prone of type 2',
        'Very resistant to straightening',
        'Can appear almost curly',
      ],
    },
    {
      id: '5',
      type: HairTextureType.TYPE_3A,
      image: require('../assets/images/hair_type_3a.jpg'),
      title: 'Type 3A - Loose Curls',
      description:
        'Type 3A hair forms large, loose curls with a definite S-pattern, about the width of a wine bottle cork.',
      characteristics: [
        'Large, loose curl pattern',
        'Well-defined S-shaped curls',
        'Good curl definition',
        'Springy texture',
        'Manageable frizz level',
      ],
    },
    {
      id: '6',
      type: HairTextureType.TYPE_3B,
      image: require('../assets/images/hair_type_3b.jpg'),
      title: 'Type 3B - Springy Curls',
      description:
        'Type 3B features bouncy, ringlet-style curls with the circumference of a Sharpie marker.',
      characteristics: [
        'Springy ringlet curls',
        'Dense curl pattern',
        'Medium frizz potential',
        'Some shrinkage',
        'Well-defined texture',
      ],
    },
    {
      id: '7',
      type: HairTextureType.TYPE_3C,
      image: require('../assets/images/hair_type_3c.jpg'),
      title: 'Type 3C - Tight Curls',
      description:
        'Type 3C consists of very tight, well-defined corkscrew curls with the circumference of a pencil.',
      characteristics: [
        'Tight corkscrew curls',
        'High density and volume',
        'Significant shrinkage',
        'Needs consistent moisture',
        'Prone to frizz',
      ],
    },
    {
      id: '8',
      type: HairTextureType.TYPE_4A,
      image: require('../assets/images/hair_type_4a.jpg'),
      title: 'Type 4A - Coily',
      description:
        'Type 4A features tightly coiled hair forming small, springy S-pattern curls with the width of a crochet needle.',
      characteristics: [
        'Small, springy coils',
        'Defined S-pattern',
        'Up to 75% shrinkage',
        'Needs regular moisture',
        'Very defined when wet',
      ],
    },
    {
      id: '9',
      type: HairTextureType.TYPE_4B,
      image: require('../assets/images/hair_type_4b.png'),
      title: 'Type 4B - Zigzag Pattern',
      description:
        'Type 4B hair has a distinct Z-shaped pattern rather than an S-curl, creating a cotton-like appearance.',
      characteristics: [
        'Sharp Z-pattern angles',
        'Cotton-like texture',
        'High shrinkage rate',
        'Requires consistent moisture',
        'Prone to breakage',
      ],
    },
    {
      id: '10',
      type: HairTextureType.TYPE_4C,
      image: require('../assets/images/hair_type_4c.jpg'),
      title: 'Type 4C - Tight Coils',
      description:
        'Type 4C has extremely tight coils with a less defined Z-pattern than 4B, requiring maximum moisture and gentle handling.',
      characteristics: [
        'Extremely tight coils',
        'Highest shrinkage (75-80%)',
        'Very delicate texture',
        'Needs maximum moisture',
        'Requires gentle handling',
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < hairTypeData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    } else {
      // If we're on the last slide, navigate to the next screen
      navigation.navigate('OnboardingHairTypeSelection');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({index: prevIndex, animated: true});
    }
  };

  const handleHairTypePress = (item: HairTypeEducationItem) => {
    setSelectedHairType(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHairType(null);
  };

  const renderHairTypeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {selectedHairType && (
              <>
                <Image
                  source={selectedHairType.image}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalTitle}>
                    {selectedHairType.title}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedHairType.description}
                  </Text>
                  <Text style={styles.characteristicsTitle}>
                    Key Characteristics:
                  </Text>
                  {selectedHairType.characteristics.map(
                    (characteristic, index) => (
                      <View key={index} style={styles.characteristicItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.characteristicText}>
                          {characteristic}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              </>
            )}
          </ScrollView>
          <Button
            mode="contained"
            style={styles.modalCloseButton}
            onPress={closeModal}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );

  const renderGridItem = ({item}: {item: HairTypeEducationItem}) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleHairTypePress(item)}
      accessibilityLabel={`View details for ${item.title}`}
      accessibilityRole="button">
      <Image source={item.image} style={styles.gridImage} resizeMode="cover" />
      <Text style={styles.gridItemTitle}>{item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Understanding Hair Types</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar
          progress={(currentIndex + 1) / hairTypeData.length}
          color="#6A0DAD"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>
          {currentIndex + 1} of {hairTypeData.length}
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={hairTypeData}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      {renderHairTypeModal()}

      <View style={styles.navigationButtonsContainer}>
        <Button
          mode="outlined"
          style={[styles.navigationButton, styles.prevButton]}
          labelStyle={styles.navigationButtonLabel}
          onPress={handlePrevious}
          disabled={currentIndex === 0}>
          Previous
        </Button>

        <Button
          mode="contained"
          style={[styles.navigationButton, styles.nextButton]}
          labelStyle={styles.navigationButtonLabel}
          onPress={handleNext}>
          {currentIndex === hairTypeData.length - 1 ? 'Continue' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');
const GRID_SPACING = 12;
const GRID_ITEM_WIDTH = (width - GRID_SPACING * 3) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  gridContainer: {
    padding: GRID_SPACING,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    aspectRatio: 1,
    margin: GRID_SPACING / 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '80%',
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  modalTextContent: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  characteristicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  characteristicItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
    color: '#6A0DAD',
  },
  characteristicText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#6A0DAD',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  navigationButton: {
    width: '48%',
    height: 50,
    justifyContent: 'center',
  },
  navigationButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  prevButton: {
    borderColor: '#6A0DAD',
  },
  nextButton: {
    backgroundColor: '#6A0DAD',
  },
});
