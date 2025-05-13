// This file contains type declarations for modules without their own type definitions

declare module 'react-native-image-picker' {
  export interface ImagePickerResponse {
    didCancel?: boolean;
    errorCode?: string;
    errorMessage?: string;
    assets?: Array<{
      uri: string;
      width?: number;
      height?: number;
      type?: string;
      fileName?: string;
      fileSize?: number;
    }>;
  }

  export interface ImageLibraryOptions {
    mediaType?: 'photo' | 'video' | 'mixed';
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    includeBase64?: boolean;
    selectionLimit?: number;
  }

  export interface CameraOptions extends ImageLibraryOptions {
    saveToPhotos?: boolean;
    cameraType?: 'front' | 'back';
  }

  export function launchImageLibrary(
    options: ImageLibraryOptions,
    callback?: (response: ImagePickerResponse) => void,
  ): Promise<ImagePickerResponse>;

  export function launchCamera(
    options: CameraOptions,
    callback?: (response: ImagePickerResponse) => void,
  ): Promise<ImagePickerResponse>;
}
