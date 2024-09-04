import React, { createContext, useContext, useState, ReactNode } from 'react';
import supabase from '../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  error: Error | null;
  signUpNewUser: (email: string, name: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(Boolean);

  async function signUpNewUser(email, name, password) {
    setLoading(true);
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      },
    })

    setUser(data.user);
    setSession(data.session);
    setError(err);
    setLoading(false);
  }

  async function signInWithEmail(email, password) {
    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setUser(data.user);
    setSession(data.session);
    setError(err);
    setLoading(false);
  }

  async function signOut() {
    const { error: err } = await supabase.auth.signOut()

    setUser(null);
    setSession(null);
    setError(err);
  }

  return (
    <AuthContext.Provider value={{ loading, user, session, error, signUpNewUser, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
