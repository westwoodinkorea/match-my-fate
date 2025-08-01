// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pwmlafpvfcqcnomhpuqe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bWxhZnB2ZmNxY25vbWhwdXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODIzMjMsImV4cCI6MjA2NzU1ODMyM30.pr-oejty2ykRvA8v2OdXDMpMUmrA26qw67meIfqsrqY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});