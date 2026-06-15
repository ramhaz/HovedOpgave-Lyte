// Auth service — håndterer login og registrering via Supabase Auth.
// Returnerer altid et AuthResult-objekt med success/error så UI kan vise feedback.

import { supabase } from '../config/supabaseClient';

// Resultat-type der bruges af både login og registrering
export type AuthResult = {
  success: boolean;
  error?: string;
};

// US 2.2 – Login: sender email+password til Supabase og returnerer resultat
export async function loginUser(email: string, password: string): Promise<AuthResult> {
  // Validering: tjek at begge felter er udfyldt
  if (!email || !password) {
    return { success: false, error: 'Udfyld venligst både email og adgangskode.' };
  }

  try {
    // Kald Supabase Auth med email/password login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: 'Forkert email eller adgangskode.' };
    }

    // Hvis vi fik en session tilbage, er login succesfuldt
    if (data.session) {
      return { success: true };
    }

    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  } catch (err) {
    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  }
}

// US 2.1 – Registrering: opretter ny bruger i Supabase Auth
export async function registerUser(email: string, password: string): Promise<AuthResult> {
  // Validering: tjek at begge felter er udfyldt
  if (!email || !password) {
    return { success: false, error: 'Udfyld venligst både email og adgangskode.' };
  }

  if (password.length < 1) {
    return { success: false, error: 'Adgangskoden skal være mindst 6 tegn.' };
  }

  try {
    // Kald Supabase Auth signUp for at oprette en ny bruger
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Tjek om emailen allerede er i brug
      if (error.message.includes('already registered')) {
        return { success: false, error: 'Denne email er allerede registreret.' };
      }
      return { success: false, error: error.message };
    }

    // Hvis vi fik en bruger tilbage, er registreringen succesfuld
    if (data.user) {
      return { success: true };
    }

    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  } catch (err) {
    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  }
}