// Supabase-klient konfiguration.
// Supabase bruges som auth-provider (login/registrering) via deres Auth-modul.
// Denne fil opretter én global klient som resten af appen bruger.

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Supabase projekt-URL og offentlig anon-nøgle (sikker at have i frontend)
const supabaseUrl = 'https://huovrepkphcreksicvgm.supabase.co';
const supabaseAnonKey = 'sb_publishable_JFE7OVsAku_4JkiNdJGOiw_4LRmFeAM';

// Web-storage adapter — på web bruger vi localStorage i stedet for AsyncStorage
// fordi AsyncStorage kun virker på native (iOS/Android)
const webStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};

// Opret Supabase-klienten med platform-specifik storage
// autoRefreshToken: token fornyes automatisk inden udløb
// persistSession: sessionen gemmes så brugeren forbliver logget ind
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? webStorage : AsyncStorage,autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
