
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rkvdrcpzfdbkoouxbtwp.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdmRyY3B6ZmRia29vdXhidHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzkwMjIsImV4cCI6MjA1NzgxNTAyMn0.XLkxvFT3GUrDlT4D0BA2Sy2AclS90vMiDgzGV7PW1oY";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
