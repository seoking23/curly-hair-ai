import {supabase} from '../lib/supabase';
import {User, Session, AuthError} from '@supabase/supabase-js';

// Types for authentication responses and user data
export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  hair_type?: string;
  porosity?: string;
  density?: string;
  created_at: string;
  last_login: string;
  login_count: number;
  feature_usage: Record<string, number>;
}

/**
 * Authentication service to handle all auth-related operations with Supabase
 */
class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(
    email: string,
    password: string,
    fullName: string,
    hairData?: {
      hairType?: string;
      porosity?: string;
      density?: string;
    },
  ): Promise<AuthResponse> {
    try {
      console.log('authService.ts - Attempting to sign up user:', email);

      const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            hair_type: hairData?.hairType || '',
            porosity: hairData?.porosity || '',
            density: hairData?.density || '',
          },
        },
      });

      if (error) throw error;

      // If signup was successful, create a profile record in the profiles table
      if (data?.user) {
        await this.createUserProfile(data.user.id, {
          email,
          fullName,
          hairType: hairData?.hairType,
          porosity: hairData?.porosity,
          density: hairData?.density,
        });
      }

      return {
        user: data?.user || null,
        session: data?.session || null,
        error: null,
      };
    } catch (error) {
      console.error('authService.ts - Sign up error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign in a user with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('authService.ts - Attempting to sign in user:', email);

      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Track user login
      if (data?.user) {
        await this.trackUserLogin(data.user.id);
      }

      return {
        user: data?.user || null,
        session: data?.session || null,
        error: null,
      };
    } catch (error) {
      console.error('authService.ts - Sign in error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<{error: AuthError | null}> {
    try {
      console.log('authService.ts - Signing out user');
      const {error} = await supabase.auth.signOut();
      if (error) throw error;
      return {error: null};
    } catch (error) {
      console.error('authService.ts - Sign out error:', error);
      return {error: error as AuthError};
    }
  }

  /**
   * Get the current session
   */
  async getSession(): Promise<{
    session: Session | null;
    error: AuthError | null;
  }> {
    try {
      const {data, error} = await supabase.auth.getSession();
      if (error) throw error;
      return {session: data.session, error: null};
    } catch (error) {
      console.error('authService.ts - Get session error:', error);
      return {session: null, error: error as AuthError};
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<{
    user: User | null;
    error: AuthError | null;
  }> {
    try {
      const {data, error} = await supabase.auth.getUser();
      if (error) throw error;
      return {user: data.user, error: null};
    } catch (error) {
      console.error('authService.ts - Get current user error:', error);
      return {user: null, error: error as AuthError};
    }
  }

  /**
   * Reset password for a user
   */
  async resetPassword(email: string): Promise<{error: AuthError | null}> {
    try {
      console.log('authService.ts - Sending password reset for:', email);
      const {error} = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return {error: null};
    } catch (error) {
      console.error('authService.ts - Reset password error:', error);
      return {error: error as AuthError};
    }
  }

  /**
   * Update user password
   */
  async updatePassword(
    newPassword: string,
  ): Promise<{error: AuthError | null}> {
    try {
      console.log('authService.ts - Updating user password');
      const {error} = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return {error: null};
    } catch (error) {
      console.error('authService.ts - Update password error:', error);
      return {error: error as AuthError};
    }
  }

  /**
   * Create a user profile in the profiles table
   */
  private async createUserProfile(
    userId: string,
    profileData: {
      email: string;
      fullName: string;
      hairType?: string;
      porosity?: string;
      density?: string;
    },
  ): Promise<void> {
    try {
      console.log('authService.ts - Creating user profile for:', userId);

      const {error} = await supabase.from('user_profiles').insert({
        id: userId,
        email: profileData.email,
        full_name: profileData.fullName,
        hair_type: profileData.hairType || null,
        porosity: profileData.porosity || null,
        density: profileData.density || null,
        login_count: 1,
        feature_usage: {},
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      });

      if (error) {
        console.error('authService.ts - Error creating user profile:', error);
      }
    } catch (error) {
      console.error('authService.ts - Create user profile error:', error);
    }
  }

  /**
   * Track user login
   */
  private async trackUserLogin(userId: string): Promise<void> {
    try {
      console.log('authService.ts - Tracking login for user:', userId);

      // First, get the current profile
      const {data, error} = await supabase
        .from('user_profiles')
        .select('login_count')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('authService.ts - Error fetching user profile:', error);
        return;
      }

      // Update login count and timestamp
      const loginCount = (data?.login_count || 0) + 1;
      const {error: updateError} = await supabase
        .from('user_profiles')
        .update({
          login_count: loginCount,
          last_login: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        console.error(
          'authService.ts - Error updating login info:',
          updateError,
        );
      }
    } catch (error) {
      console.error('authService.ts - Track user login error:', error);
    }
  }

  /**
   * Track feature usage
   */
  async trackFeatureUsage(userId: string, featureName: string): Promise<void> {
    try {
      console.log(
        `authService.ts - Tracking feature usage: ${featureName} for user: ${userId}`,
      );

      // Get current feature usage
      const {data, error} = await supabase
        .from('user_profiles')
        .select('feature_usage')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('authService.ts - Error fetching feature usage:', error);
        return;
      }

      // Update feature usage count
      const featureUsage = data?.feature_usage || {};
      featureUsage[featureName] = (featureUsage[featureName] || 0) + 1;

      const {error: updateError} = await supabase
        .from('user_profiles')
        .update({
          feature_usage: featureUsage,
        })
        .eq('id', userId);

      if (updateError) {
        console.error(
          'authService.ts - Error updating feature usage:',
          updateError,
        );
      }
    } catch (error) {
      console.error('authService.ts - Track feature usage error:', error);
    }
  }

  /**
   * Get user profile data
   */
  async getUserProfile(
    userId: string,
  ): Promise<{profile: UserProfile | null; error: Error | null}> {
    try {
      console.log('authService.ts - Getting profile for user:', userId);

      const {data, error} = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      return {
        profile: data as UserProfile,
        error: null,
      };
    } catch (error) {
      console.error('authService.ts - Get user profile error:', error);
      return {
        profile: null,
        error: error as Error,
      };
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    profileData: Partial<
      Omit<
        UserProfile,
        | 'id'
        | 'email'
        | 'created_at'
        | 'last_login'
        | 'login_count'
        | 'feature_usage'
      >
    >,
  ): Promise<{error: Error | null}> {
    try {
      console.log('authService.ts - Updating profile for user:', userId);

      const {error} = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', userId);

      if (error) throw error;

      return {error: null};
    } catch (error) {
      console.error('authService.ts - Update user profile error:', error);
      return {error: error as Error};
    }
  }
}

export const authService = new AuthService();
export default authService;
