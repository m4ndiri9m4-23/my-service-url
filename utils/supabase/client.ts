
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const createClient = () =>
  createSupabaseClient(
    supabaseUrl!,
    supabaseKey!
  );
