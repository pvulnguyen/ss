import { createClient } from '@supabase/supabase-js';

// These keys are safe to use in a browser.
// https://supabase.com/docs/guides/api/api-keys
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);
