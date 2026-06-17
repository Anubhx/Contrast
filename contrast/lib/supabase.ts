import { createClient } from '@supabase/supabase-js';

// Type definition for our Supabase schema
export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string;
          url: string;
          url_hash: string;
          domain: string;
          overall_score: number;
          result: Record<string, unknown>;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          url: string;
          url_hash: string;
          domain: string;
          overall_score: number;
          result: Record<string, unknown>;
          created_at?: string;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          url?: string;
          url_hash?: string;
          domain?: string;
          overall_score?: number;
          result?: Record<string, unknown>;
          created_at?: string;
          expires_at?: string | null;
        };
      };
      rate_limits: {
        Row: {
          ip: string;
          request_count: number;
          window_start: string;
        };
        Insert: {
          ip: string;
          request_count?: number;
          window_start?: string;
        };
        Update: {
          ip?: string;
          request_count?: number;
          window_start?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // Uses the Service Role Key to bypass RLS and allow secure server-side operations
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
