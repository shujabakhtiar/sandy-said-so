"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string; // Changed to string (UUID)
  email: string;
  name?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any, redirectTo?: string) => Promise<void>; // Deprecated in favor of direct supabase calls in components, but kept for signature compatibility if needed or wrapper
  signup: (data: any) => Promise<void>; // Deprecated
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const checkAuth = async () => {
    try {
      const { data: { user: sbUser } } = await supabase.auth.getUser();
      if (sbUser) {
        setUser({
          id: sbUser.id,
          email: sbUser.email!,
          name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkAuth();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (data: any, redirectTo?: string) => {
    // Legacy support or wrapper around supabase
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (redirectTo) router.push(redirectTo);
  };

  const signup = async (data: any) => {
     // Wrapper around supabase
     const { email, password, name } = data;
     const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
     });
     if (error) throw error;
     router.push("/login?message=Check your email to confirm sign up");
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
