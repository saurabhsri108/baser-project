import { createClient } from "@supabase/supabase-js";

const { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } = process.env;

const options = {};

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY,
  options
);
