import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../config/supabaseClient';

//userstorie 2.2

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout:() => Promise<void>; 
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  isLoggedIn: false,
  logout: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 const logout = async () => {
      await supabase.auth.signOut(); 
    }

  useEffect(() => {
    // Hent eksisterende session ved app-start
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Lyt på auth-ændringer (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isLoggedIn: !!session,
        logout,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}