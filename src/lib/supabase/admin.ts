import { createClient } from "@supabase/supabase-js";
import { envError } from "@/lib/utils";

export function createAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw envError("NEXT_PUBLIC_SUPABASE_URL");
  if (!key || key.includes("ISI_DENGAN")) throw envError("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return { ok: false as const, status: 401, message: "Sesi admin tidak ditemukan." };
  const admin = createAdminSupabaseClient();
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) return { ok: false as const, status: 401, message: "Sesi admin tidak valid." };
  const { data: profile, error } = await admin.from("profiles").select("role,email").eq("id", userData.user.id).single();
  if (error || profile?.role !== "admin") return { ok: false as const, status: 403, message: "Akses khusus admin." };
  return { ok: true as const, admin, user: userData.user };
}
