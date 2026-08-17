import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().min(1).max(20)
});

export const createOrderSchema = z.object({
  tableNumber: z.number().int().min(1).max(200),
  customerName: z.string().max(80).optional().or(z.literal("")),
  notes: z.string().max(500).optional().or(z.literal("")),
  items: z.array(orderItemSchema).min(1, "Pilih minimal satu menu.")
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "preparing", "served", "completed", "cancelled"])
});
