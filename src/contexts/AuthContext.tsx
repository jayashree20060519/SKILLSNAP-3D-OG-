import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/db/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
  return data;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password validation helper
export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least 1 uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least 1 number' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Password must contain at least 1 special character' };
  }
  return { valid: true, message: '' };
}

// Transform backend errors to user-friendly messages
function getFriendlyErrorMessage(error: any): string {
  const errorMsg = error?.message || String(error);
  
  // Authentication errors
  if (errorMsg.includes('Invalid login credentials') || errorMsg.includes('Invalid')) {
    return 'Invalid email or password. Please try again.';
  }
  if (errorMsg.includes('Email not confirmed')) {
    return 'Please verify your email address.';
  }
  if (errorMsg.includes('User not found')) {
    return 'No account found. Please sign up first.';
  }
  if (errorMsg.includes('User already registered') || errorMsg.includes('already')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (errorMsg.includes('Password')) {
    return 'Password does not meet requirements. Please use a stronger password.';
  }
  if (errorMsg.includes('email')) {
    return 'Please enter a valid email address.';
  }
  
  // Network errors
  if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  // Generic fallback - never show technical errors
  return 'Something went wrong. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    const profileData = await getProfile(user.id);
    setProfile(profileData);
  };

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id).then(setProfile);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id).then(setProfile);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(getFriendlyErrorMessage(error));
      }
      return { error: null };
    } catch (error: any) {
      return { error: new Error(getFriendlyErrorMessage(error)) };
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    try {
      // Validate password
      const validation = validatePassword(password);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        throw new Error(getFriendlyErrorMessage(error));
      }
      return { error: null };
    } catch (error: any) {
      return { error: new Error(getFriendlyErrorMessage(error)) };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signInWithEmail, 
      signUpWithEmail, 
      signOut, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
