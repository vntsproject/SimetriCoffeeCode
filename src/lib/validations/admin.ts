import { z } from "zod";

export const menuAdminSchema = z.object({
  categoryId: z.string().optional().nullable(),
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional().nullable(),
  price: z.number().int().min(0),
  imageUrl: z.string().url().optional().nullable().or(z.literal("")),
  isAvailable: z.boolean().default(true)
});

export const tableAdminSchema = z.object({
  tableNumber: z.number().int().min(1).max(999),
  capacity: z.number().int().min(1).max(50),
  isActive: z.boolean().default(true)
});
