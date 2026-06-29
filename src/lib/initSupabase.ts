import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;


export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const initSupabaseClient = () => {
  if (typeof supabaseClient !== "undefined") {
    return {
      enabled: true,
      supabaseClient: supabaseClient,
    };
  }
  return {
    enabled: false,
    supabaseClient: undefined,
  };
};
