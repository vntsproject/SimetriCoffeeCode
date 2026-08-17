import { createClient } from "@supabase/supabase-js";
import { envError } from "@/lib/utils";

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw envError("NEXT_PUBLIC_SUPABASE_URL");
  if (!key || key.includes("ISI_DENGAN")) throw envError("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}
