"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { fallbackMenu, fallbackTables, menuCategories } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";

const reservationSchema = z.object({ customerName: z.string().min(2, "Nama wajib diisi."), whatsappNumber: z.string().min(8, "Nomor WhatsApp belum valid."), partySize: z.coerce.number().int().min(1), notes: z.string().max(500).optional() });
type ReservationValues = z.infer<typeof reservationSchema>;
type MenuItem = { id: string; name: string; description: string | null; price: number; category: string; is_available: boolean };
type TableEntry = { id: string; table_number: number; capacity: number; is_active?: boolean; available?: boolean };
type Cart = Record<string, number>;
const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

export function ReservationFlow() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("18:00");
  const [tables, setTables] = useState<TableEntry[]>(fallbackTables.map((t) => ({ ...t, available: true })));
  const [selectedTable, setSelectedTable] = useState<TableEntry | null>(null);
  const [items, setItems] = useState<MenuItem[]>(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].slug);
  const [cart, setCart] = useState<Cart>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReservationValues>({ resolver: zodResolver(reservationSchema), defaultValues: { partySize: 2 } });
  const startTime = new Date(date + "T" + time + ":00+07:00").toISOString();

  useEffect(() => { fetch("/api/menu").then((r) => r.ok ? r.json() : null).then((data) => { if (data?.items?.length) setItems(data.items); }).catch(() => undefined); }, []);
  useEffect(() => {
    setSelectedTable(null);
    fetch("/api/tables/available?startTime=" + encodeURIComponent(startTime)).then((r) => r.ok ? r.json() : null).then((data) => { if (data?.tables?.length) setTables(data.tables); }).catch(() => setTables(fallbackTables.map((t) => ({ ...t, available: true }))));
  }, [startTime]);

  const selectedItems = useMemo(() => Object.entries(cart).map(([id, quantity]) => ({ item: items.find((entry) => entry.id === id), quantity })).filter((entry): entry is { item: MenuItem; quantity: number } => Boolean(entry.item)), [cart, items]);
  const total = selectedItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const filtered = items.filter((item) => item.category === activeCategory && item.is_available);
  function change(id: string, delta: number) { setCart((current) => { const next = Math.max(0, (current[id] || 0) + delta); const copy = { ...current }; if (next === 0) delete copy[id]; else copy[id] = next; return copy; }); }

  async function submit(values: ReservationValues) {
    if (!selectedTable || selectedItems.length === 0) { setMessage("Pilih meja dan minimal satu menu untuk reservasi."); return; }
    setLoading(true); setMessage(null);
    const response = await fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, tableId: selectedTable.id, startTime, notes: values.notes || "", items: selectedItems.map(({ item, quantity }) => ({ menuItemId: item.id, quantity })) }) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) { setMessage(data.error || "Reservasi belum bisa dikirim."); return; }
    setMessage("Reservasi kamu berhasil dikirim dan menunggu konfirmasi admin. Kode: " + data.reservationCode);
    setCart({}); setSelectedTable(null); reset({ partySize: 2, customerName: "", whatsappNumber: "", notes: "" });
  }

  return (
    <section className="min-h-screen bg-whiteCafe pt-28">
      <div className="container-premium pb-20">
        <div className="mb-8 max-w-3xl"><Badge>3-hour seating window</Badge><h1 className="mt-5 text-4xl font-semibold md:text-6xl">Reservation</h1><p className="mt-4 text-lg text-blackCafe/65">Pilih waktu terbaikmu, kami siapkan mejanya.</p></div>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-8">
            <Card className="p-5"><h2 className="mb-4 text-xl font-semibold">Tanggal dan jam kedatangan</h2><div className="grid gap-4 md:grid-cols-[220px_1fr]"><Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} /><div className="flex gap-2 overflow-x-auto pb-1">{slots.map((slot) => <button key={slot} onClick={() => setTime(slot)} className={"shrink-0 rounded-full border px-4 py-2 text-sm font-semibold " + (time === slot ? "border-blackCafe bg-blackCafe text-whiteCafe" : "border-lineCafe")}>{slot}</button>)}</div></div><p className="mt-4 text-sm text-blackCafe/55">Durasi reservasi otomatis 3 jam. Meja yang overlap dengan reservasi aktif tidak tersedia.</p></Card>
            <Card className="p-5"><h2 className="mb-4 text-xl font-semibold">Pilih meja</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{tables.map((table) => { const available = table.available !== false; const selected = selectedTable?.id === table.id; return <button key={table.id} disabled={!available} onClick={() => setSelectedTable(table)} className={"rounded-xl border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-45 " + (selected ? "border-blackCafe bg-blackCafe text-whiteCafe" : available ? "border-lineCafe bg-whiteCafe hover:border-blackCafe" : "border-lineCafe bg-blackCafe/5")}><strong>Table {table.table_number}</strong><span className="mt-1 block text-xs opacity-70">{available ? selected ? "Selected" : "Available" : "Reserved"} · {table.capacity} orang</span></button>; })}</div></Card>
            <Card className="p-5"><h2 className="mb-4 text-xl font-semibold">Pilih menu reservasi</h2><div className="mb-5 flex gap-2 overflow-x-auto pb-1">{menuCategories.map((cat) => <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} className={"shrink-0 rounded-full border px-4 py-2 text-sm font-semibold " + (activeCategory === cat.slug ? "border-blackCafe bg-blackCafe text-whiteCafe" : "border-lineCafe")}>{cat.name}</button>)}</div><div className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <div key={item.id} className="rounded-xl border border-lineCafe p-4"><h3 className="font-semibold">{item.name}</h3><p className="mt-1 text-sm text-blackCafe/55">{formatRupiah(item.price)}</p><div className="mt-4 flex items-center gap-2"><button aria-label="Kurangi" onClick={() => change(item.id, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-lineCafe"><Minus className="h-4 w-4" /></button><span className="w-6 text-center font-semibold">{cart[item.id] || 0}</span><button aria-label="Tambah" onClick={() => change(item.id, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-blackCafe text-whiteCafe"><Plus className="h-4 w-4" /></button></div></div>)}</div></Card>
          </div>
          <Card className="sticky bottom-4 top-28 h-fit p-5 lg:bottom-auto"><h2 className="mb-4 text-xl font-semibold">Detail reservasi</h2><div className="mb-5 rounded-xl bg-warmCafe p-4 text-sm leading-6 text-blackCafe/65"><strong className="text-blackCafe">Pembayaran placeholder</strong><br />Reservasi dikonfirmasi setelah pembayaran atau menu order diverifikasi admin.</div><div className="mb-4 grid gap-2 text-sm">{selectedTable && <p>Meja: <strong>{selectedTable.table_number}</strong></p>}<p>Waktu: <strong>{date} {time}</strong></p>{selectedItems.map(({ item, quantity }) => <div key={item.id} className="flex justify-between border-b border-lineCafe pb-2"><span>{quantity}x {item.name}</span><strong>{formatRupiah(item.price * quantity)}</strong></div>)}<div className="flex justify-between pt-2 text-lg font-semibold"><span>Total</span><span>{formatRupiah(total)}</span></div></div><form onSubmit={handleSubmit(submit)} className="grid gap-3"><Input placeholder="Nama" {...register("customerName")} />{errors.customerName && <p className="text-sm text-red-600">{errors.customerName.message}</p>}<Input placeholder="Nomor WhatsApp" {...register("whatsappNumber")} />{errors.whatsappNumber && <p className="text-sm text-red-600">{errors.whatsappNumber.message}</p>}<Input type="number" placeholder="Jumlah orang" {...register("partySize")} />{errors.partySize && <p className="text-sm text-red-600">{errors.partySize.message}</p>}<Textarea placeholder="Catatan optional" {...register("notes")} /><Button disabled={loading} type="submit" className="w-full">{loading ? "Mengirim..." : "Request Reservation"}</Button></form>{message && <p className="mt-4 rounded-xl bg-warmCafe p-4 text-sm font-semibold">{message}</p>}</Card>
        </div>
      </div>
    </section>
  );
}
