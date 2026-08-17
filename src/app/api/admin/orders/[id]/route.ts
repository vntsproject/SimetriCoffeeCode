import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { updateOrderStatusSchema } from "@/lib/validations/order";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const { id } = await context.params;
  const payload = updateOrderStatusSchema.parse(await request.json());
  const { error } = await auth.admin.from("orders").update({ status: payload.status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
