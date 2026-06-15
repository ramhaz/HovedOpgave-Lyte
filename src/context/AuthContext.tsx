// US 2.2 – AuthContext: global autentificeringstilstand for hele appen.
// Bruger React Context API til at dele login-session med alle komponenter.
// Supabase håndterer selve auth — denne context wrapper bare sessionen.

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../config/supabaseClient';

// Type-definition for hvad AuthContext stiller til rådighed
type AuthContextType = {
  session: Session | null;   // Supabase session med brugerdata og token
  isLoading: boolean;        // true mens vi tjekker om brugeren er logget ind
  isLoggedIn: boolean;       // hurtig boolean — er der en aktiv session?
  logout:() => Promise<void>;
};

// Opret context med default-værdier (bruges hvis ingen Provider wrapper)
const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  isLoggedIn: false,
  logout: async () => {}
});

// AuthProvider wrapper hele appen og giver adgang til auth-state via useAuth()
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logger brugeren ud via Supabase
  const logout = async () => {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    // Ved app-start: hent eksisterende session fra storage (hvis brugeren var logget ind)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Lyt på auth-ændringer i realtid (login, logout, token refresh)
    // Når brugeren logger ind/ud opdateres session automatisk
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup: afmeld listener når komponenten unmountes
    return () => subscription.unsubscribe();
  }, []);

  // Giv alle child-komponenter adgang til session, login-status og logout
  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isLoggedIn: !!session, // konverter session til boolean
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — gør det nemt at bruge auth i enhver komponent: const { session } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}