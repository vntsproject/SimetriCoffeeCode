import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { menuAdminSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const payload = menuAdminSchema.parse(await request.json());
  const { data, error } = await auth.admin.from("menu_items").insert({ category_id: payload.categoryId || null, name: payload.name, description: payload.description || null, price: payload.price, image_url: payload.imageUrl || null, is_available: payload.isAvailable }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ item: data });
}
