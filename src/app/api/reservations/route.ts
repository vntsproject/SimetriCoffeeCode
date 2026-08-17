import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createReservationSchema } from "@/lib/validations/reservation";
import { activeReservationStatuses, addHours, orderCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const payload = createReservationSchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();
    const startDate = new Date(payload.startTime);
    const endDate = addHours(startDate, 3);
    const { data: table, error: tableError } = await supabase.from("cafe_tables").select("id,table_number,is_active").eq("id", payload.tableId).single();
    if (tableError || !table?.is_active) return NextResponse.json({ error: "Meja tidak tersedia." }, { status: 400 });
    const { data: overlaps, error: overlapError } = await supabase.from("reservations").select("id").eq("table_id", payload.tableId).in("status", activeReservationStatuses()).lt("start_time", endDate.toISOString()).gt("end_time", startDate.toISOString());
    if (overlapError) throw overlapError;
    if (overlaps?.length) return NextResponse.json({ error: "Meja sudah terisi pada slot tersebut." }, { status: 409 });
    const ids = payload.items.map((item) => item.menuItemId);
    const { data: menuItems, error } = await supabase.from("menu_items").select("id,name,price,is_available").in("id", ids).eq("is_available", true);
    if (error) throw error;
    if (!menuItems || menuItems.length !== ids.length) return NextResponse.json({ error: "Beberapa menu tidak tersedia." }, { status: 400 });
    const rows = payload.items.map((item) => { const menu = menuItems.find((entry) => entry.id === item.menuItemId)!; return { menu_item_id: menu.id, menu_item_name: menu.name, quantity: item.quantity, unit_price: menu.price, subtotal: menu.price * item.quantity }; });
    const total = rows.reduce((sum, item) => sum + item.subtotal, 0);
    const code = orderCode("RSV");
    const { data: reservation, error: reservationError } = await supabase.from("reservations").insert({ reservation_code: code, customer_name: payload.customerName, whatsapp_number: payload.whatsappNumber, party_size: payload.partySize, table_id: payload.tableId, table_number: table.table_number, start_time: startDate.toISOString(), end_time: endDate.toISOString(), notes: payload.notes || null, status: "pending_confirmation", total_amount: total }).select("id").single();
    if (reservationError) throw reservationError;
    const { error: itemsError } = await supabase.from("reservation_items").insert(rows.map((row) => ({ ...row, reservation_id: reservation.id })));
    if (itemsError) throw itemsError;
    return NextResponse.json({ reservationCode: code, totalAmount: total });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Reservasi belum bisa dikirim." }, { status: 400 });
  }
}
