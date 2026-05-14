import { supabase } from '../config/supabaseClient';

export type AuthResult = {
  success: boolean;
  error?: string;
};

//usertorie 2.2
export async function loginUser(email: string, password: string): Promise<AuthResult> {
  if (!email || !password) {
    return { success: false, error: 'Udfyld venligst både email og adgangskode.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: 'Forkert email eller adgangskode.' };
    }

    if (data.session) {
      return { success: true };
    }

    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  } catch (err) {
    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  }
}


// userstpore 2.1
export async function registerUser(email: string, password: string): Promise<AuthResult> {
  if (!email || !password) {
    return { success: false, error: 'Udfyld venligst både email og adgangskode.' };
  }

  if (password.length < 1) {
    return { success: false, error: 'Adgangskoden skal være mindst 6 tegn.' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { success: false, error: 'Denne email er allerede registreret.' };
      }
      return { success: false, error: error.message };
    }

    if (data.user) {
      return { success: true };
    }

    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  } catch (err) {
    return { success: false, error: 'Noget gik galt. Prøv igen.' };
  }  
}