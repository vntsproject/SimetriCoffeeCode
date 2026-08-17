import { z } from "zod";

export const reservationItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().min(1).max(20)
});

export const createReservationSchema = z.object({
  customerName: z.string().min(2, "Nama wajib diisi.").max(80),
  whatsappNumber: z.string().min(8, "Nomor WhatsApp belum valid.").max(24),
  partySize: z.number().int().min(1).max(30),
  tableId: z.string().min(1),
  startTime: z.string().datetime(),
  notes: z.string().max(500).optional().or(z.literal("")),
  items: z.array(reservationItemSchema).min(1, "Reservasi wajib memilih menu.")
});

export const updateReservationStatusSchema = z.object({
  status: z.enum(["pending_payment", "pending_confirmation", "confirmed", "cancelled", "completed"])
});
