import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

export const supabase = createClient<Database>(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

