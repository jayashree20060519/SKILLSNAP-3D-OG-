// src/contexts/AuthContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/db/supabase";
import type { User } from "@supabase/supabase-js";

// ================= PROFILE TYPE =================
export interface Profile {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at?: string;
}

// ================= GET PROFILE =================
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Profile fetch error:", error.message);
    return null;
  }

  return data;
}

// ================= CONTEXT TYPE =================
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;

  signUpWithEmail: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;

  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ================= PROVIDER =================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // ================= REFRESH PROFILE =================
  const refreshProfile = async (userId?: string) => {
    const id = userId || user?.id;

    if (!id) {
      setProfile(null);
      return;
    }

    const data = await getProfile(id);
    setProfile(data);
  };

  // ================= INIT AUTH =================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      setUser(sessionUser);

      if (sessionUser) {
        await refreshProfile(sessionUser.id);
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) {
          setTimeout(() => refreshProfile(sessionUser.id), 200);
        } else {
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ================= SIGN IN =================
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  // ================= SIGN UP (FIXED SAFE) =================
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) throw error;

      const userId = data.user?.id;

      // 🔥 SAFE CHECK (IMPORTANT FIX)
      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          username: fullName || "",
          email: cleanEmail,
          role: "user",
        });

        if (profileError) {
          console.error("Profile insert error:", profileError.message);
        }
      }

      return { error: null };
    } catch (err: any) {
      console.error("Signup error:", err.message);
      return { error: err };
    }
  };

  // ================= SIGN OUT =================
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ================= HOOK =================
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
}
