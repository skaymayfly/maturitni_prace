// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qkvgysypnkfchisoqffx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdmd5c3lwbmtmY2hpc29xZmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjgzNDQsImV4cCI6MjA1MDU0NDM0NH0.Nr-m0b8leLdtEq74s9nnSc0rl8YixsfTscx1Jvbz01w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);