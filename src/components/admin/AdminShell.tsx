"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ListOrdered, CalendarCheck, Coffee, Armchair, LogOut } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/tables", label: "Tables", icon: Armchair }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { if (!data.session) router.replace("/admin/login"); else setReady(true); });
  }, [router]);
  async function logout() { const supabase = createBrowserSupabaseClient(); await supabase?.auth.signOut(); await fetch("/api/admin/session", { method: "DELETE" }); router.replace("/admin/login"); }
  if (!ready) return <div className="min-h-screen pt-32 text-center">Loading admin...</div>;
  return (
    <section className="min-h-screen bg-warmCafe pt-24">
      <div className="container-premium grid gap-6 pb-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-2xl border border-lineCafe bg-whiteCafe p-4 lg:block"><h2 className="mb-5 px-3 text-sm font-bold tracking-[0.12em]">SIMETRI ADMIN</h2><nav className="grid gap-1">{links.map((link) => { const Icon = link.icon; return <Link key={link.href} href={link.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold", pathname === link.href ? "bg-blackCafe text-whiteCafe" : "hover:bg-warmCafe")}><Icon className="h-4 w-4" />{link.label}</Link>; })}<button onClick={logout} className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-warmCafe"><LogOut className="h-4 w-4" />Logout</button></nav></aside>
        <div>{children}</div>
      </div>
      <nav className="fixed inset-x-4 bottom-4 z-40 flex justify-around rounded-full border border-lineCafe bg-whiteCafe p-2 shadow-soft lg:hidden">{links.map((link) => { const Icon = link.icon; return <Link key={link.href} href={link.href} aria-label={link.label} className={cn("grid h-11 w-11 place-items-center rounded-full", pathname === link.href && "bg-blackCafe text-whiteCafe")}><Icon className="h-5 w-5" /></Link>; })}</nav>
    </section>
  );
}
