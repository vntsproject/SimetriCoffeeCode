import { NextResponse } from "next/server";
import { fallbackTables } from "@/lib/constants";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { activeReservationStatuses, addHours } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("startTime");
    if (!start) return NextResponse.json({ error: "startTime wajib diisi." }, { status: 400 });
    const startDate = new Date(start);
    const endDate = addHours(startDate, 3);
    const supabase = createAdminSupabaseClient();
    const { data: tables, error: tableError } = await supabase.from("cafe_tables").select("*").eq("is_active", true).order("table_number");
    if (tableError) throw tableError;
    const { data: reservations, error: reservationError } = await supabase.from("reservations").select("table_id").in("status", activeReservationStatuses()).lt("start_time", endDate.toISOString()).gt("end_time", startDate.toISOString());
    if (reservationError) throw reservationError;
    const blocked = new Set((reservations || []).map((item) => item.table_id));
    return NextResponse.json({ tables: (tables || []).map((table) => ({ ...table, available: !blocked.has(table.id) })) });
  } catch {
    return NextResponse.json({ tables: fallbackTables.map((table) => ({ ...table, available: true })) });
  }
}
