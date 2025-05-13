import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../types/navigation';
import {Header} from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const HairTypeIntroScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [selectedHairType, setSelectedHairType] = useState<
    (typeof hairTypes)[0] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hairTypes = [
    {
      type: '1A',
      description:
        'Pin-straight hair with no curl pattern. Very fine, thin, and shiny with high resistance to curling. Tends to get oily quickly and lacks volume at the roots.',
      image: require('../../assets/images/hair_type_1a.jpg'),
    },
    {
      type: '2A',
      description:
        'Fine, thin hair with a slight bend that forms a loose "S" pattern. Creates subtle waves from the mid-shaft to ends. Easily straightens but can become flat and oily at the roots.',
      image: require('../../assets/images/hair_type_2a.png'),
    },
    {
      type: '2B',
      description:
        'Wavy hair that forms more defined S-shaped waves, usually from the mid-length. Has more volume than 2A and tends to be frizz-prone, especially in humidity. Waves are more resistant to straightening.',
      image: require('../../assets/images/hair_type_2b.jpeg'),
    },
    {
      type: '2C',
      description:
        'Defined, coarse waves that start from the roots. Forms S-shaped waves that are thick and frizz-prone. Most resistant to straightening among type 2 hair, with waves that can border on curly.',
      image: require('../../assets/images/hair_type_2c.jpg'),
    },
    {
      type: '3A',
      description:
        'Large, loose curls that form a definite S-pattern with the circumference of a wine bottle cork. Curls are well-defined, springy, and maintain good curl definition with minimal frizz when properly moisturized.',
      image: require('../../assets/images/hair_type_3a.jpg'),
    },
    {
      type: '3B',
      description:
        'Bouncy, ringlet-style curls with the circumference of a Sharpie marker. Curls are well-defined, springy, and densely packed with a medium amount of frizz potential. May experience some shrinkage.',
      image: require('../../assets/images/hair_type_3b.jpg'),
    },
    {
      type: '3C',
      description:
        'Very tight, well-defined corkscrew curls with the circumference of a pencil. Dense, voluminous, and experiences significant shrinkage. Requires consistent moisture to maintain curl pattern and prevent frizz.',
      image: require('../../assets/images/hair_type_3c.jpg'),
    },
    {
      type: '4A',
      description:
        'Tightly coiled hair that forms small, springy S-pattern curls with the circumference of a crochet needle. Experiences up to 75% shrinkage, requires regular moisture, and has a very defined curl pattern when wet.',
      image: require('../../assets/images/hair_type_4a.jpg'),
    },
    {
      type: '4B',
      description:
        'Tightly coiled hair with a distinct Z-shaped pattern rather than an S-curl. Sharp angles in the strands create a cotton-like appearance. Experiences significant shrinkage and requires consistent moisture to prevent breakage.',
      image: require('../../assets/images/hair_type_4b.png'),
    },
    {
      type: '4C',
      description:
        'Extremely tight coils with a Z-pattern that is less defined than 4B. Has the most shrinkage of all hair types (up to 75-80%), is very delicate, and requires maximum moisture and gentle handling to maintain health.',
      image: require('../../assets/images/hair_type_4c.jpg'),
    },
  ];

  const handleHairTypePress = (hairType: (typeof hairTypes)[0]) => {
    setSelectedHairType(hairType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHairType(null);
  };

  const renderHairTypeModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalOverlay}>
        {selectedHairType && (
          <View style={styles.modalContent}>
            <ScrollView>
              <>
                <Image
                  source={selectedHairType.image}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalTitle}>
                    Type {selectedHairType.type}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedHairType.description}
                  </Text>
                </View>
              </>
            </ScrollView>
            <Button
              mode="contained"
              style={styles.modalCloseButton}
              onPress={closeModal}>
              Close
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );

  const renderGridItem = ({item}: {item: (typeof hairTypes)[0]}) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleHairTypePress(item)}
      accessibilityLabel={`View details for Type ${item.type}`}
      accessibilityRole="button">
      <Image source={item.image} style={styles.gridImage} resizeMode="cover" />
      <Text style={styles.gridItemTitle}>Type {item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.3)']}
        style={styles.bottomBlur}
      />
      <Header
        title="Understanding Your Hair Type"
        subtitle="Every curl pattern is unique. Let's discover yours to provide the best care routine."
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={hairTypes}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      {renderHairTypeModal()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Let's analyze your hair to determine your unique type and porosity
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={() => navigation.navigate('HairAnalysisOptions')}>
          Begin My Natural Hair Journey
        </Button>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const GRID_SPACING = 12;
const GRID_ITEM_WIDTH = (width - GRID_SPACING * 3) / 2;

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
  gridContainer: {
    padding: GRID_SPACING,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    aspectRatio: 1,
    margin: GRID_SPACING / 2,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
    color: '#4A2C1E',
    textAlign: 'center',
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
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
    color: '#4A2C1E',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6D4C41',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#8D6E63',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(224, 224, 224, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    zIndex: 2,
  },
  footerText: {
    fontSize: 14,
    color: '#6D4C41',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    borderRadius: 30,
    backgroundColor: '#8D6E63',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default HairTypeIntroScreen;
