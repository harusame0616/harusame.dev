import { createClient } from "@supabase/supabase-js";
import type { Database } from "types/supabase";

let supabase: ReturnType<typeof createClient<Database>> | undefined;

export function getSupabaseClient() {
  if (supabase) {
    return supabase;
  }

  supabase = createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
  );

  return supabase;
}
