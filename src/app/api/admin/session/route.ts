import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("simetri_admin_session", "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("simetri_admin_session");
  return response;
}
