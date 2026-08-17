import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { tableAdminSchema } from "@/lib/validations/admin";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const { id } = await context.params;
  const payload = tableAdminSchema.parse(await request.json());
  const { error } = await auth.admin.from("cafe_tables").update({ table_number: payload.tableNumber, capacity: payload.capacity, is_active: payload.isActive }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const { id } = await context.params;
  const { error } = await auth.admin.from("cafe_tables").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
