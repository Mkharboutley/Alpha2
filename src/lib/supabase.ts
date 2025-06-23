import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WeddingInvitation = {
  id: string;
  attendee_name: string;
  confirmed_at: string;
  qr_scanned_at?: string;
  scan_count: number;
  created_at: string;
  updated_at: string;
};