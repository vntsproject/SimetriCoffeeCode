import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL || "simetricoffee@gmail.com";
const password = process.env.ADMIN_PASSWORD;

if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL belum diisi.");
if (!serviceRole || serviceRole.includes("ISI_DENGAN")) throw new Error("SUPABASE_SERVICE_ROLE_KEY belum diisi. Jangan gunakan key ini di frontend.");
if (!password || password.includes("ISI_PASSWORD")) throw new Error("ADMIN_PASSWORD belum diisi di .env.local.");

const supabase = createClient(url, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) throw listError;
  let user = listed.users.find((entry) => entry.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) throw error;
    user = data.user;
    console.log("Admin auth user created:", email);
  } else {
    console.log("Admin auth user already exists:", email);
  }
  const { error: profileError } = await supabase.from("profiles").upsert({ id: user.id, email, role: "admin" }, { onConflict: "id" });
  if (profileError) throw profileError;
  console.log("Admin profile is ready with role=admin.");
}

main().catch((error) => { console.error(error.message); process.exit(1); });
