"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type Values = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "simetricoffee@gmail.com" } });
  async function submit(values: Values) {
    setLoading(true); setMessage(null);
    const supabase = createBrowserSupabaseClient();
    if (!supabase) { setMessage("Supabase env belum lengkap. Isi .env.local terlebih dahulu."); setLoading(false); return; }
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error || !data.session) { setMessage(error?.message || "Login gagal."); setLoading(false); return; }
    const res = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + data.session.access_token } });
    if (!res.ok) { setMessage("Akun ini belum memiliki role admin."); setLoading(false); return; }
    router.replace("/admin/dashboard");
  }
  return <section className="min-h-screen bg-warmCafe pt-28"><div className="container-premium grid min-h-[70vh] place-items-center"><Card className="w-full max-w-md p-6"><p className="section-kicker">Admin</p><h1 className="mt-4 text-4xl font-semibold">Login as Admin</h1><p className="mt-3 text-sm leading-6 text-blackCafe/60">Masuk untuk mengelola order, reservasi, menu, dan meja.</p><form onSubmit={handleSubmit(submit)} className="mt-7 grid gap-3"><Input placeholder="Email" {...register("email")} />{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}<Input type="password" placeholder="Password" {...register("password")} />{errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}<Button disabled={loading} type="submit" className="w-full">{loading ? "Masuk..." : "Login"}</Button></form>{message && <p className="mt-4 rounded-xl bg-whiteCafe p-4 text-sm font-semibold">{message}</p>}</Card></div></section>;
}
