import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://huovrepkphcreksicvgm.supabase.co';
const supabaseAnonKey = 'sb_publishable_JFE7OVsAku_4JkiNdJGOiw_4LRmFeAM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
