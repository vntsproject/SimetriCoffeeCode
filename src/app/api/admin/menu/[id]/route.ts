import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { menuAdminSchema } from "@/lib/validations/admin";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const { id } = await context.params;
  const payload = menuAdminSchema.parse(await request.json());
  const { error } = await auth.admin.from("menu_items").update({ category_id: payload.categoryId || null, name: payload.name, description: payload.description || null, price: payload.price, image_url: payload.imageUrl || null, is_available: payload.isAvailable, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const { id } = await context.params;
  const { error } = await auth.admin.from("menu_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
