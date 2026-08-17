"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { fallbackMenu, fallbackTables, menuCategories } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";

const checkoutSchema = z.object({ customerName: z.string().max(80).optional(), notes: z.string().max(500).optional() });
type CheckoutValues = z.infer<typeof checkoutSchema>;
type MenuItem = { id: string; name: string; description: string | null; price: number; category: string; is_available: boolean };
type Cart = Record<string, number>;

export function OrderFlow() {
  const params = useSearchParams();
  const tableFromQr = Number(params.get("table"));
  const [table, setTable] = useState<number | null>(Number.isFinite(tableFromQr) && tableFromQr > 0 ? tableFromQr : null);
  const [items, setItems] = useState<MenuItem[]>(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState<(typeof menuCategories)[number]["slug"]>(menuCategories[0].slug);
  const [cart, setCart] = useState<Cart>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  useEffect(() => {
    fetch("/api/menu").then((r) => r.ok ? r.json() : null).then((data) => { if (data?.items?.length) setItems(data.items); }).catch(() => undefined);
  }, []);

  const selectedItems = useMemo(() => Object.entries(cart).map(([id, quantity]) => ({ item: items.find((entry) => entry.id === id), quantity })).filter((entry): entry is { item: MenuItem; quantity: number } => Boolean(entry.item)), [cart, items]);
  const total = selectedItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const filtered = items.filter((item) => item.category === activeCategory && item.is_available);
  const step = table ? selectedItems.length ? "Cart" : "Menu" : "Table";

  function change(id: string, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const copy = { ...current };
      if (next === 0) delete copy[id]; else copy[id] = next;
      return copy;
    });
  }

  async function submit(values: CheckoutValues) {
    if (!table || selectedItems.length === 0) return;
    setLoading(true); setMessage(null);
    const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tableNumber: table, customerName: values.customerName || "", notes: values.notes || "", items: selectedItems.map(({ item, quantity }) => ({ menuItemId: item.id, quantity })) }) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setMessage(data.error || "Order belum bisa dikirim."); return; }
    setMessage("Order berhasil dikirim. Nomor order: " + data.orderCode);
    setCart({}); reset();
  }

  return (
    <section className="min-h-screen bg-whiteCafe pt-28">
      <div className="container-premium pb-20">
        <div className="mb-8 max-w-3xl"><Badge>Table → Menu → Cart → Confirm</Badge><h1 className="mt-5 text-4xl font-semibold md:text-6xl">Order Menu</h1><p className="mt-4 text-lg text-blackCafe/65">Pilih meja, pilih menu, dan kami siapkan pesananmu.</p></div>
        <div className="mb-8 flex flex-wrap gap-2">{["Table", "Menu", "Cart", "Confirm"].map((item) => <span key={item} className={"rounded-full border px-4 py-2 text-sm font-semibold " + (item === step ? "border-blackCafe bg-blackCafe text-whiteCafe" : "border-lineCafe text-blackCafe/55")}>{item}</span>)}</div>
        {!table ? (
          <Card className="p-5"><h2 className="mb-4 text-xl font-semibold">Pilih nomor meja</h2><div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">{fallbackTables.map((entry) => <button key={entry.table_number} onClick={() => setTable(entry.table_number)} className="rounded-xl border border-lineCafe p-5 font-semibold transition hover:border-blackCafe hover:bg-warmCafe">Meja {entry.table_number}<span className="block text-xs font-normal text-blackCafe/50">{entry.capacity} orang</span></button>)}</div><p className="mt-5 text-sm text-blackCafe/55">Setiap barcode meja nantinya diarahkan ke /order?table=N agar meja otomatis terpilih.</p></Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-5 flex items-center justify-between gap-4"><div><p className="text-sm text-blackCafe/55">Meja terpilih</p><h2 className="text-2xl font-semibold">Meja {table}</h2></div><Button variant="secondary" onClick={() => setTable(null)}>Ganti meja</Button></div>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">{menuCategories.map((cat) => <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} className={"shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition " + (activeCategory === cat.slug ? "border-blackCafe bg-blackCafe text-whiteCafe" : "border-lineCafe bg-whiteCafe")}>{cat.name}</button>)}</div>
              {filtered.length === 0 ? <Card className="p-8 text-center text-blackCafe/55">Menu belum tersedia di kategori ini.</Card> : <div className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <Card key={item.id} className="p-5 hover:-translate-y-1"><div className="flex min-h-36 flex-col justify-between"><div><h3 className="text-lg font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-blackCafe/58">{item.description}</p></div><div className="mt-5 flex items-center justify-between"><strong>{formatRupiah(item.price)}</strong><div className="flex items-center gap-2"><button aria-label="Kurangi" onClick={() => change(item.id, -1)} className="grid h-9 w-9 place-items-center rounded-full border border-lineCafe"><Minus className="h-4 w-4" /></button><span className="w-6 text-center font-semibold">{cart[item.id] || 0}</span><button aria-label="Tambah" onClick={() => change(item.id, 1)} className="grid h-9 w-9 place-items-center rounded-full bg-blackCafe text-whiteCafe"><Plus className="h-4 w-4" /></button></div></div></div></Card>)}</div>}
            </div>
            <Card className="sticky bottom-4 top-28 h-fit p-5 lg:bottom-auto"><div className="mb-4 flex items-center gap-2"><ShoppingBag className="h-5 w-5" /><h2 className="text-xl font-semibold">Cart</h2></div>{selectedItems.length === 0 ? <p className="rounded-xl bg-warmCafe p-4 text-sm text-blackCafe/60">Belum ada menu dipilih.</p> : <div className="grid gap-3">{selectedItems.map(({ item, quantity }) => <div key={item.id} className="flex justify-between gap-3 border-b border-lineCafe pb-3 text-sm"><span>{quantity}x {item.name}</span><strong>{formatRupiah(item.price * quantity)}</strong></div>)}<div className="flex justify-between pt-2 text-lg font-semibold"><span>Total</span><span>{formatRupiah(total)}</span></div><form onSubmit={handleSubmit(submit)} className="mt-3 grid gap-3"><Input placeholder="Nama customer (optional)" {...register("customerName")} />{errors.customerName && <p className="text-sm text-red-600">{errors.customerName.message}</p>}<Textarea placeholder="Catatan (optional)" {...register("notes")} />{errors.notes && <p className="text-sm text-red-600">{errors.notes.message}</p>}<Button disabled={loading} type="submit" className="w-full">{loading ? "Mengirim..." : "Submit Order"}</Button></form></div>}{message && <p className="mt-4 rounded-xl bg-warmCafe p-4 text-sm font-semibold">{message}</p>}</Card>
          </div>
        )}
      </div>
    </section>
  );
}
