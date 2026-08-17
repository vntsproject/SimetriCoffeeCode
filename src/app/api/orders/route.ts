import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createOrderSchema } from "@/lib/validations/order";
import { orderCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const payload = createOrderSchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();
    const ids = payload.items.map((item) => item.menuItemId);
    const { data: menuItems, error } = await supabase.from("menu_items").select("id,name,price,is_available").in("id", ids).eq("is_available", true);
    if (error) throw error;
    if (!menuItems || menuItems.length !== ids.length) return NextResponse.json({ error: "Beberapa menu tidak tersedia." }, { status: 400 });
    const rows = payload.items.map((item) => {
      const menu = menuItems.find((entry) => entry.id === item.menuItemId)!;
      return { menu_item_id: menu.id, menu_item_name: menu.name, quantity: item.quantity, unit_price: menu.price, subtotal: menu.price * item.quantity };
    });
    const total = rows.reduce((sum, item) => sum + item.subtotal, 0);
    const code = orderCode("ORD");
    const { data: order, error: orderError } = await supabase.from("orders").insert({ order_code: code, table_number: payload.tableNumber, customer_name: payload.customerName || null, notes: payload.notes || null, total_amount: total, status: "pending" }).select("id").single();
    if (orderError) throw orderError;
    const { error: itemsError } = await supabase.from("order_items").insert(rows.map((row) => ({ ...row, order_id: order.id })));
    if (itemsError) throw itemsError;
    return NextResponse.json({ orderCode: code, totalAmount: total });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Order belum bisa dikirim." }, { status: 400 });
  }
}
