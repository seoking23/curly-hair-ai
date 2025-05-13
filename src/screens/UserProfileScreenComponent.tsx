import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Chip,
  Avatar,
  Divider,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  RootStackParamList,
  UserHairProfile,
  HairTextureType,
} from '../types/ApplicationTypes';

type UserProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserProfile'
>;

interface UserProfileScreenComponentProps {
  navigation: UserProfileNavigationProp;
}

export const UserProfileScreenComponent: React.FC<
  UserProfileScreenComponentProps
> = ({navigation}) => {
  const [userProfile, setUserProfile] = useState<UserHairProfile>({
    userId: 'user-' + Date.now(),
    userHairTextureType: null,
    userHairPorosity: null,
    userHairDensity: null,
    userHairThickness: null,
    userHairLength: null,
    userHairGoals: [],
    userHairIssues: [],
    userHairImages: [],
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newHairGoal, setNewHairGoal] = useState<string>('');
  const [newHairIssue, setNewHairIssue] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load saved profile
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const savedProfileString = await AsyncStorage.getItem('user_profile');
        if (savedProfileString) {
          const savedProfile = JSON.parse(
            savedProfileString,
          ) as UserHairProfile;
          setUserProfile(savedProfile);
        }

        const savedProfileImage = await AsyncStorage.getItem('profile_image');
        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  // Save profile changes
  const saveProfile = async (updatedProfile: UserHairProfile) => {
    try {
      await AsyncStorage.setItem(
        'user_profile',
        JSON.stringify(updatedProfile),
      );
      if (profileImage) {
        await AsyncStorage.setItem('profile_image', profileImage);
      }
      Alert.alert('Success', 'Your profile has been updated');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save your profile');
    }
  };

  // Handle selecting profile image
  const handleSelectProfileImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      });

      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  // Add a hair goal
  const addHairGoal = () => {
    if (!newHairGoal.trim()) {
      Alert.alert('Error', 'Please enter a hair goal');
      return;
    }

    const updatedProfile = {
      ...userProfile,
      userHairGoals: [...userProfile.userHairGoals, newHairGoal.trim()],
    };

    setUserProfile(updatedProfile);
    setNewHairGoal('');
  };

  // Remove a hair goal
  const removeHairGoal = (index: number) => {
    const updatedGoals = [...userProfile.userHairGoals];
    updatedGoals.splice(index, 1);

    setUserProfile({
      ...userProfile,
      userHairGoals: updatedGoals,
    });
  };

  // Add a hair issue
  const addHairIssue = () => {
    if (!newHairIssue.trim()) {
      Alert.alert('Error', 'Please enter a hair issue');
      return;
    }

    const updatedProfile = {
      ...userProfile,
      userHairIssues: [...userProfile.userHairIssues, newHairIssue.trim()],
    };

    setUserProfile(updatedProfile);
    setNewHairIssue('');
  };

  // Remove a hair issue
  const removeHairIssue = (index: number) => {
    const updatedIssues = [...userProfile.userHairIssues];
    updatedIssues.splice(index, 1);

    setUserProfile({
      ...userProfile,
      userHairIssues: updatedIssues,
    });
  };

  // Save all profile changes
  const handleSaveProfile = () => {
    saveProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={userProfileStyles.safeAreaContainer}>
      <ScrollView contentContainerStyle={userProfileStyles.scrollViewContainer}>
        <View style={userProfileStyles.profileHeaderContainer}>
          <View style={userProfileStyles.profileImageContainer}>
            {profileImage ? (
              <Image
                source={{uri: profileImage}}
                style={userProfileStyles.profileImage}
              />
            ) : (
              <Avatar.Icon
                size={120}
                icon="account"
                style={userProfileStyles.profileAvatar}
                color="#FFF"
              />
            )}

            {isEditing && (
              <Button
                mode="contained"
                style={userProfileStyles.changeImageButton}
                onPress={handleSelectProfileImage}>
                Change Photo
              </Button>
            )}
          </View>

          <Text style={userProfileStyles.usernameText}>Hair Care Profile</Text>

          {!isEditing ? (
            <Button
              mode="contained"
              icon="pencil"
              onPress={() => setIsEditing(true)}
              style={userProfileStyles.editButton}>
              Edit Profile
            </Button>
          ) : (
            <View style={userProfileStyles.editButtonsContainer}>
              <Button
                mode="contained"
                icon="content-save"
                onPress={handleSaveProfile}
                style={userProfileStyles.saveButton}>
                Save
              </Button>
              <Button
                mode="outlined"
                icon="cancel"
                onPress={() => setIsEditing(false)}
                style={userProfileStyles.cancelButton}>
                Cancel
              </Button>
            </View>
          )}
        </View>

        <Card style={userProfileStyles.profileCard}>
          <Card.Title title="Hair Profile" />
          <Card.Content>
            <View style={userProfileStyles.profileItemContainer}>
              <Text style={userProfileStyles.profileItemLabel}>Hair Type:</Text>
              <Text style={userProfileStyles.profileItemValue}>
                {userProfile.userHairTextureType || 'Not analyzed yet'}
              </Text>
            </View>

            {isEditing ? (
              <>
                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Porosity:
                  </Text>
                  <TextInput
                    style={userProfileStyles.editInput}
                    value={userProfile.userHairPorosity || ''}
                    onChangeText={text =>
                      setUserProfile({
                        ...userProfile,
                        userHairPorosity: text || null,
                      })
                    }
                    placeholder="e.g., Low, Medium, High"
                  />
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Density:
                  </Text>
                  <TextInput
                    style={userProfileStyles.editInput}
                    value={userProfile.userHairDensity || ''}
                    onChangeText={text =>
                      setUserProfile({
                        ...userProfile,
                        userHairDensity: text || null,
                      })
                    }
                    placeholder="e.g., Low, Medium, High"
                  />
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Thickness:
                  </Text>
                  <TextInput
                    style={userProfileStyles.editInput}
                    value={userProfile.userHairThickness || ''}
                    onChangeText={text =>
                      setUserProfile({
                        ...userProfile,
                        userHairThickness: text || null,
                      })
                    }
                    placeholder="e.g., Fine, Medium, Coarse"
                  />
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Length:
                  </Text>
                  <TextInput
                    style={userProfileStyles.editInput}
                    value={userProfile.userHairLength || ''}
                    onChangeText={text =>
                      setUserProfile({
                        ...userProfile,
                        userHairLength: text || null,
                      })
                    }
                    placeholder="e.g., TWA, Shoulder Length, etc."
                  />
                </View>
              </>
            ) : (
              <>
                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Porosity:
                  </Text>
                  <Text style={userProfileStyles.profileItemValue}>
                    {userProfile.userHairPorosity || 'Not specified'}
                  </Text>
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Density:
                  </Text>
                  <Text style={userProfileStyles.profileItemValue}>
                    {userProfile.userHairDensity || 'Not specified'}
                  </Text>
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Thickness:
                  </Text>
                  <Text style={userProfileStyles.profileItemValue}>
                    {userProfile.userHairThickness || 'Not specified'}
                  </Text>
                </View>

                <View style={userProfileStyles.profileItemContainer}>
                  <Text style={userProfileStyles.profileItemLabel}>
                    Hair Length:
                  </Text>
                  <Text style={userProfileStyles.profileItemValue}>
                    {userProfile.userHairLength || 'Not specified'}
                  </Text>
                </View>
              </>
            )}

            <Divider style={userProfileStyles.divider} />

            <Text style={userProfileStyles.sectionTitle}>Hair Goals</Text>

            <View style={userProfileStyles.tagsContainer}>
              {userProfile.userHairGoals.map((goal, index) => (
                <Chip
                  key={`goal-${index}`}
                  style={userProfileStyles.tagChip}
                  onClose={isEditing ? () => removeHairGoal(index) : undefined}
                  closeIcon={isEditing ? 'close' : undefined}>
                  {goal}
                </Chip>
              ))}
            </View>

            {isEditing && (
              <View style={userProfileStyles.addTagContainer}>
                <TextInput
                  style={userProfileStyles.addTagInput}
                  value={newHairGoal}
                  onChangeText={setNewHairGoal}
                  placeholder="Add a hair goal"
                />
                <Button
                  mode="contained"
                  icon="plus"
                  onPress={addHairGoal}
                  style={userProfileStyles.addTagButton}>
                  Add
                </Button>
              </View>
            )}

            <Divider style={userProfileStyles.divider} />

            <Text style={userProfileStyles.sectionTitle}>Hair Concerns</Text>

            <View style={userProfileStyles.tagsContainer}>
              {userProfile.userHairIssues.map((issue, index) => (
                <Chip
                  key={`issue-${index}`}
                  style={userProfileStyles.tagChip}
                  onClose={isEditing ? () => removeHairIssue(index) : undefined}
                  closeIcon={isEditing ? 'close' : undefined}>
                  {issue}
                </Chip>
              ))}
            </View>

            {isEditing && (
              <View style={userProfileStyles.addTagContainer}>
                <TextInput
                  style={userProfileStyles.addTagInput}
                  value={newHairIssue}
                  onChangeText={setNewHairIssue}
                  placeholder="Add a hair concern"
                />
                <Button
                  mode="contained"
                  icon="plus"
                  onPress={addHairIssue}
                  style={userProfileStyles.addTagButton}>
                  Add
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          icon="hair-dryer"
          style={userProfileStyles.hairAnalysisButton}
          onPress={() => navigation.navigate('HairAnalysis')}>
          {userProfile.userHairTextureType
            ? 'Take New Hair Analysis'
            : 'Analyze My Hair Type'}
        </Button>

        {userProfile.userHairTextureType && (
          <Button
            mode="outlined"
            icon="information-outline"
            style={userProfileStyles.hairTypeInfoButton}
            onPress={() =>
              navigation.navigate('HairTypeDetails', {
                hairType: userProfile.userHairTextureType!,
              })
            }>
            Learn About My Hair Type
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const userProfileStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    padding: 20,
  },
  profileHeaderContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileAvatar: {
    backgroundColor: '#6A0DAD',
  },
  changeImageButton: {
    marginTop: 10,
    backgroundColor: '#6A0DAD',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#6A0DAD',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  saveButton: {
    marginRight: 10,
    backgroundColor: '#6A0DAD',
  },
  cancelButton: {
    borderColor: '#6A0DAD',
  },
  profileCard: {
    marginBottom: 20,
    borderRadius: 10,
  },
  profileItemContainer: {
    marginBottom: 15,
  },
  profileItemLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  profileItemValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  editInput: {
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagChip: {
    margin: 4,
    backgroundColor: '#EEE',
  },
  addTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addTagInput: {
    flex: 1,
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  addTagButton: {
    backgroundColor: '#6A0DAD',
  },
  hairAnalysisButton: {
    marginBottom: 10,
    backgroundColor: '#6A0DAD',
  },
  hairTypeInfoButton: {
    borderColor: '#6A0DAD',
  },
});
