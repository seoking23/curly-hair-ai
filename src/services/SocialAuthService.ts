import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

interface GoogleUser {
  email: string;
  id: string;
  name: string | null;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export interface SocialAuthCredentials {
  email: string;
  fullName?: string;
  socialId: string;
  socialProvider: 'google' | 'apple';
  accessToken?: string;
}

const STORAGE_KEY = 'SOCIAL_AUTH_CREDENTIALS';

function isGoogleUser(user: any): user is GoogleUser {
  return (
    typeof user === 'object' &&
    user !== null &&
    typeof user.email === 'string' &&
    typeof user.id === 'string' &&
    (user.name === null || typeof user.name === 'string')
  );
}

class SocialAuthService {
  private static instance: SocialAuthService;

  private constructor() {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId:
        '482579012827-bbeutbsuqvijc7chqi16igq6he2kbvp5.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '482579012827-bbeutbsuqvijc7chqi16igq6he2kbvp5.apps.googleusercontent.com',
    });
  }

  public static getInstance(): SocialAuthService {
    if (!SocialAuthService.instance) {
      SocialAuthService.instance = new SocialAuthService();
    }
    return SocialAuthService.instance;
  }

  async signInWithGoogle(): Promise<SocialAuthCredentials> {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      if ('user' in signInResult && isGoogleUser(signInResult.user)) {
        const tokens = await GoogleSignin.getTokens();
        const credentials: SocialAuthCredentials = {
          email: signInResult.user.email,
          fullName: signInResult.user.name || undefined,
          socialId: signInResult.user.id,
          socialProvider: 'google',
          accessToken: tokens.accessToken,
        };

        await this.storeCredentials(credentials);
        return credentials;
      }

      throw new Error('Failed to get user info from Google Sign-In');
    } catch (error: any) {
      console.error('SocialAuthService.ts - Google Sign-In Error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google sign in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Play services not available or outdated');
      } else {
        throw new Error('Unknown error during Google sign in');
      }
    }
  }

  async signInWithApple(): Promise<SocialAuthCredentials> {
    if (Platform.OS !== 'ios') {
      throw new Error('Apple Sign In is only available on iOS devices');
    }

    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const credentialsState = await appleAuth.getCredentialStateForUser(
        appleAuthResponse.user,
      );

      if (credentialsState === AppleAuthCredentialState.AUTHORIZED) {
        const credentials: SocialAuthCredentials = {
          email: appleAuthResponse.email ?? '',
          fullName: `${appleAuthResponse.fullName?.givenName ?? ''} ${
            appleAuthResponse.fullName?.familyName ?? ''
          }`.trim(),
          socialId: appleAuthResponse.user,
          socialProvider: 'apple',
          accessToken: appleAuthResponse.identityToken ?? undefined,
        };

        await this.storeCredentials(credentials);
        return credentials;
      } else {
        throw new Error('Apple Sign In failed: User not authorized');
      }
    } catch (error: any) {
      console.error('SocialAuthService.ts - Apple Sign-In Error:', error);
      throw new Error(error.message || 'Unknown error during Apple sign in');
    }
  }

  async getStoredCredentials(): Promise<SocialAuthCredentials | null> {
    try {
      const credentialsJson = await AsyncStorage.getItem(STORAGE_KEY);
      return credentialsJson ? JSON.parse(credentialsJson) : null;
    } catch (error) {
      console.error(
        'SocialAuthService.ts - Error retrieving stored credentials:',
        error,
      );
      return null;
    }
  }

  private async storeCredentials(
    credentials: SocialAuthCredentials,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    } catch (error) {
      console.error('SocialAuthService.ts - Error storing credentials:', error);
      throw new Error('Failed to store social auth credentials');
    }
  }

  async clearStoredCredentials(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        'SocialAuthService.ts - Error clearing credentials:',
        error,
      );
      throw new Error('Failed to clear social auth credentials');
    }
  }
}

export default SocialAuthService.getInstance();
