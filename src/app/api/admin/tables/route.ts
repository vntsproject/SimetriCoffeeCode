import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { tableAdminSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const payload = tableAdminSchema.parse(await request.json());
  const { data, error } = await auth.admin.from("cafe_tables").insert({ table_number: payload.tableNumber, capacity: payload.capacity, is_active: payload.isActive }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ table: data });
}
