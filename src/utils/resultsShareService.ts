import {Platform, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import {PermissionsAndroid} from 'react-native';

// Define the type for the hair analysis results
export interface HairAnalysisResults {
  hairType: string;
  porosity: string;
  density: string;
  thickness: string;
  elasticity: string;
  scalpCondition: string;
  productCompatibility: string;
  maintenanceLevel: string;
  recommendedProducts: string[];
  recommendedRoutine: string[];
  careInstructions: string[];
}

/**
 * Request storage permissions for Android devices
 * @returns Promise<boolean> - Whether permissions were granted
 */
const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message:
          'CurlyHairAI needs access to your storage to save your hair analysis results.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error(
      'resultsShareService.ts: Error requesting storage permission:',
      err,
    );
    return false;
  }
};

/**
 * Save the hair analysis results as a JSON file
 * @param results - The hair analysis results to save
 * @returns Promise<string> - The path to the saved file
 */
export const saveResultsAsJson = async (
  results: HairAnalysisResults,
): Promise<string> => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      throw new Error('Storage permission not granted');
    }

    // Create a directory for the app if it doesn't exist
    const dirPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/CurlyHairAI`
        : `${RNFS.ExternalDirectoryPath}/CurlyHairAI`;

    const dirExists = await RNFS.exists(dirPath);
    if (!dirExists) {
      await RNFS.mkdir(dirPath);
    }

    // Create a filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `hair-analysis-${timestamp}.json`;
    const filePath = `${dirPath}/${fileName}`;

    // Convert results to JSON string
    const jsonResults = JSON.stringify(results, null, 2);

    // Write the file
    await RNFS.writeFile(filePath, jsonResults, 'utf8');

    return filePath;
  } catch (error) {
    console.error(
      'resultsShareService.ts: Error saving results as JSON:',
      error,
    );
    throw error;
  }
};

/**
 * Capture a screenshot of the results view
 * @param viewRef - Reference to the view to capture
 * @returns Promise<string> - The path to the saved image
 */
export const captureResultsAsImage = async (
  viewRef: React.RefObject<any>,
): Promise<string> => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      throw new Error('Storage permission not granted');
    }

    // Create a directory for the app if it doesn't exist
    const dirPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/CurlyHairAI`
        : `${RNFS.ExternalDirectoryPath}/CurlyHairAI`;

    const dirExists = await RNFS.exists(dirPath);
    if (!dirExists) {
      await RNFS.mkdir(dirPath);
    }

    // Create a filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `hair-analysis-${timestamp}.png`;
    const filePath = `${dirPath}/${fileName}`;

    // Capture the view as an image
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 0.8,
      result: 'tmpfile',
    });

    // Copy the temporary file to our app directory
    await RNFS.copyFile(uri, filePath);

    return filePath;
  } catch (error) {
    console.error(
      'resultsShareService.ts: Error capturing results as image:',
      error,
    );
    throw error;
  }
};

/**
 * Share the hair analysis results
 * @param filePath - Path to the file to share
 * @param fileType - Type of file ('json' or 'image')
 * @returns Promise<void>
 */
export const shareResults = async (
  filePath: string,
  fileType: 'json' | 'image',
): Promise<void> => {
  try {
    const mimeType = fileType === 'json' ? 'application/json' : 'image/png';
    const shareOptions = {
      title: 'Share Your Hair Analysis Results',
      message: 'Check out my hair analysis results from CurlyHairAI!',
      url: `file://${filePath}`,
      type: mimeType,
    };

    await Share.open(shareOptions);
  } catch (error: any) {
    // User cancelled the share action
    if (error.message && error.message.includes('User did not share')) {
      return;
    }
    console.error('resultsShareService.ts: Error sharing results:', error);
    throw error;
  }
};

/**
 * Save and share the hair analysis results
 * @param results - The hair analysis results
 * @param viewRef - Reference to the view to capture (optional)
 * @param shareAfterSave - Whether to share the results after saving
 * @returns Promise<void>
 */
export const saveAndShareResults = async (
  results: HairAnalysisResults,
  viewRef?: React.RefObject<any>,
  shareAfterSave: boolean = false,
): Promise<void> => {
  try {
    // Save results as JSON
    const jsonFilePath = await saveResultsAsJson(results);

    // If viewRef is provided, also save as image
    let imagePath: string | null = null;
    if (viewRef) {
      imagePath = await captureResultsAsImage(viewRef);
    }

    // Show success message
    Alert.alert(
      'Results Saved',
      `Your hair analysis results have been saved${
        shareAfterSave ? ' and are ready to share' : ''
      }. Create an account to access them anytime!`,
      [
        {
          text: 'OK',
          style: 'cancel',
        },
        ...(shareAfterSave && imagePath
          ? [
              {
                text: 'Share Image',
                onPress: () => shareResults(imagePath!, 'image'),
              },
            ]
          : []),
        ...(shareAfterSave
          ? [
              {
                text: 'Share Data',
                onPress: () => shareResults(jsonFilePath, 'json'),
              },
            ]
          : []),
      ],
    );
  } catch (error) {
    console.error(
      'resultsShareService.ts: Error in saveAndShareResults:',
      error,
    );
    Alert.alert(
      'Error Saving Results',
      'There was an error saving your results. Please try again.',
    );
  }
};
