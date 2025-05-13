import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import {User, Session} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';
import authService, {UserProfile} from '../services/authService';

// Interface for the authentication context
interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    hairData?: any,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  trackFeatureUsage: (featureName: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load user profile
  const loadUserProfile = async (userId: string) => {
    try {
      const {profile} = await authService.getUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('AuthContext.tsx - Error loading user profile:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('AuthContext.tsx - Initializing auth state');

    setIsLoading(true);

    // Get initial session
    const initializeAuth = async () => {
      try {
        const {session: currentSession} = await authService.getSession();
        setSession(currentSession);

        if (currentSession?.user) {
          setUser(currentSession.user);
          await loadUserProfile(currentSession.user.id);
        }
      } catch (error) {
        console.error('AuthContext.tsx - Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('AuthContext.tsx - Auth state changed:', event);

        setSession(newSession);

        if (newSession?.user) {
          setUser(newSession.user);
          await loadUserProfile(newSession.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }

        setIsLoading(false);
      },
    );

    // Clean up subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign up a new user
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    hairData?: any,
  ) => {
    setIsLoading(true);
    try {
      const {error} = await authService.signUp(
        email,
        password,
        fullName,
        hairData,
      );
      if (error) throw error;
    } catch (error) {
      console.error('AuthContext.tsx - Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in an existing user
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const {error} = await authService.signIn(email, password);
      if (error) throw error;
    } catch (error) {
      console.error('AuthContext.tsx - Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out the current user
  const signOut = async () => {
    try {
      const {error} = await authService.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('AuthContext.tsx - Sign out error:', error);
      throw error;
    }
  };

  // Reset user password
  const resetPassword = async (email: string) => {
    try {
      const {error} = await authService.resetPassword(email);
      if (error) throw error;
    } catch (error) {
      console.error('AuthContext.tsx - Reset password error:', error);
      throw error;
    }
  };

  // Update user password
  const updatePassword = async (newPassword: string) => {
    try {
      const {error} = await authService.updatePassword(newPassword);
      if (error) throw error;
    } catch (error) {
      console.error('AuthContext.tsx - Update password error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      console.error(
        'AuthContext.tsx - Cannot update profile: No user logged in',
      );
      return;
    }

    try {
      const {error} = await authService.updateUserProfile(user.id, profileData);
      if (error) throw error;

      // Refresh profile after update
      await refreshProfile();
    } catch (error) {
      console.error('AuthContext.tsx - Update profile error:', error);
      throw error;
    }
  };

  // Track feature usage
  const trackFeatureUsage = async (featureName: string) => {
    if (!user) {
      console.error(
        'AuthContext.tsx - Cannot track feature usage: No user logged in',
      );
      return;
    }

    try {
      await authService.trackFeatureUsage(user.id, featureName);
    } catch (error) {
      console.error(
        `AuthContext.tsx - Error tracking feature usage (${featureName}):`,
        error,
      );
    }
  };

  // Refresh user profile data
  const refreshProfile = async () => {
    if (!user) {
      console.error(
        'AuthContext.tsx - Cannot refresh profile: No user logged in',
      );
      return;
    }

    try {
      await loadUserProfile(user.id);
    } catch (error) {
      console.error('AuthContext.tsx - Error refreshing profile:', error);
    }
  };

  // Context value to be provided
  const value: AuthContextType = {
    user,
    session,
    userProfile,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    trackFeatureUsage,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
