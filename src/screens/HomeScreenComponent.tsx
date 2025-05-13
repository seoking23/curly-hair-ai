import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/ApplicationTypes';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenComponentProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreenComponent: React.FC<HomeScreenComponentProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={homeScreenStyles.safeAreaContainer}>
      <ScrollView contentContainerStyle={homeScreenStyles.scrollViewContainer}>
        <View style={homeScreenStyles.headerContainer}>
          <Image
            source={require('../assets/images/curly-hair-ai-logo.jpg')}
            style={homeScreenStyles.logoImage}
            // If you don't have this image yet, you can replace with a placeholder or remove
            // and create the asset later
          />
          <Text style={homeScreenStyles.applicationTitle}>CurlyHairAI</Text>
          <Text style={homeScreenStyles.applicationTagline}>
            Your Personalized Hair Care Journey
          </Text>
        </View>

        <View style={homeScreenStyles.contentContainer}>
          <Text style={homeScreenStyles.welcomeMessageText}>
            Welcome to CurlyHairAI, your ultimate hair care companion designed
            specifically for curly hair textures. Discover your unique hair type
            and get personalized care routines tailored just for you.
          </Text>

          <View style={homeScreenStyles.featuresContainer}>
            <Text style={homeScreenStyles.featuresSectionTitle}>
              What CurlyHairAI Offers:
            </Text>

            <View style={homeScreenStyles.featureItemContainer}>
              <Text style={homeScreenStyles.featureItemTitle}>
                📸 Hair Texture Analysis
              </Text>
              <Text style={homeScreenStyles.featureItemDescription}>
                Upload a photo of your hair to identify your specific texture
                type
              </Text>
            </View>

            <View style={homeScreenStyles.featureItemContainer}>
              <Text style={homeScreenStyles.featureItemTitle}>
                ✨ Personalized Care Routines
              </Text>
              <Text style={homeScreenStyles.featureItemDescription}>
                Get customized hair care regimens based on your unique hair type
              </Text>
            </View>

            <View style={homeScreenStyles.featureItemContainer}>
              <Text style={homeScreenStyles.featureItemTitle}>
                📝 Progress Tracking
              </Text>
              <Text style={homeScreenStyles.featureItemDescription}>
                Keep track of your hair growth and health journey
              </Text>
            </View>
          </View>
        </View>

        <View style={homeScreenStyles.actionsContainer}>
          <Button
            mode="contained"
            style={homeScreenStyles.actionButton}
            contentStyle={homeScreenStyles.actionButtonContent}
            labelStyle={homeScreenStyles.actionButtonLabel}
            onPress={() => navigation.navigate('HairAnalysis')}>
            Start Hair Analysis
          </Button>

          <Button
            mode="outlined"
            style={homeScreenStyles.secondaryActionButton}
            contentStyle={homeScreenStyles.actionButtonContent}
            labelStyle={homeScreenStyles.secondaryActionButtonLabel}
            onPress={() => navigation.navigate('UserProfile')}>
            View Your Profile
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const homeScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  applicationTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginTop: 10,
  },
  applicationTagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  contentContainer: {
    marginBottom: 30,
  },
  welcomeMessageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  featuresContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItemContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  featureItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 5,
  },
  featureItemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#6A0DAD',
  },
  actionButtonContent: {
    height: 50,
  },
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryActionButton: {
    borderRadius: 8,
    borderColor: '#6A0DAD',
    borderWidth: 2,
  },
  secondaryActionButtonLabel: {
    fontSize: 16,
    color: '#6A0DAD',
    fontWeight: 'bold',
  },
});
