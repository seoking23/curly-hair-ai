import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {ImageAsset} from '../utils/types/ImageTypes.ts';

interface ImagePickerProps {
  onImageSelected: (image: ImageAsset) => void;
  image: ImageAsset | null;
  placeholderText?: string;
  loading?: boolean;
  style?: any;
}

export const PhotoPicker = ({
  onImageSelected,
  image,
  placeholderText = 'Take or select a photo',
  loading = false,
  style,
}: ImagePickerProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleImageSelection = async (useCamera: boolean) => {
    setMenuVisible(false);

    const options: CameraOptions & ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
      saveToPhotos: false,
    };

    try {
      const result: ImagePickerResponse = useCamera
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      if (result.didCancel || !result.assets || result.assets.length === 0) {
        return;
      }

      if (result.errorCode) {
        console.error(
          'ImagePicker.tsx - Error selecting image:',
          result.errorMessage,
        );
        return;
      }

      onImageSelected(result.assets[0] as ImageAsset);
    } catch (error) {
      console.error('ImagePicker.tsx - Image selection error:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {image ? (
        <View style={styles.imageContainer}>
          {loading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator
                size="large"
                color={DesignSystem.colors.primary}
              />
            </View>
          ) : null}
          <Image
            source={{uri: image.uri}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => setMenuVisible(true)}>
            <Icon name="camera" size={20} color={DesignSystem.colors.card} />
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.placeholder}
          onPress={() => setMenuVisible(true)}>
          <Icon
            name="camera-plus"
            size={40}
            color={DesignSystem.colors.primary}
          />
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        </TouchableOpacity>
      )}

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleImageSelection(true)}>
            <Icon name="camera" size={24} color={DesignSystem.colors.primary} />
            <Text style={styles.menuItemText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleImageSelection(false)}>
            <Icon
              name="image-multiple"
              size={24}
              color={DesignSystem.colors.primary}
            />
            <Text style={styles.menuItemText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.cancelMenuItem]}
            onPress={() => setMenuVisible(false)}>
            <Text style={styles.cancelMenuItemText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {menuVisible && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setMenuVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: DesignSystem.borderRadius.md,
    overflow: 'hidden',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButton: {
    position: 'absolute',
    bottom: DesignSystem.spacing.md,
    right: DesignSystem.spacing.md,
    backgroundColor: DesignSystem.colors.primary,
    borderRadius: DesignSystem.borderRadius.pill,
    paddingVertical: DesignSystem.spacing.xs,
    paddingHorizontal: DesignSystem.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeButtonText: {
    color: DesignSystem.colors.card,
    fontSize: DesignSystem.typography.fontSize.caption,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
    marginLeft: DesignSystem.spacing.xs,
  },
  placeholder: {
    width: '100%',
    height: 220,
    borderRadius: DesignSystem.borderRadius.md,
    backgroundColor: DesignSystem.colors.surface,
    borderWidth: 2,
    borderColor: DesignSystem.colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: DesignSystem.spacing.md,
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
    textAlign: 'center',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: DesignSystem.colors.card,
    borderTopLeftRadius: DesignSystem.borderRadius.lg,
    borderTopRightRadius: DesignSystem.borderRadius.lg,
    padding: DesignSystem.spacing.md,
    ...DesignSystem.shadows.large,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DesignSystem.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.divider,
  },
  menuItemText: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textPrimary,
    marginLeft: DesignSystem.spacing.md,
  },
  cancelMenuItem: {
    justifyContent: 'center',
    borderBottomWidth: 0,
    marginTop: DesignSystem.spacing.sm,
  },
  cancelMenuItemText: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.error,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
});
