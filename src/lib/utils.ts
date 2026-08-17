import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export function orderCode(prefix = "SMT") {
  return prefix + "-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function activeReservationStatuses() {
  return ["pending_payment", "pending_confirmation", "confirmed"];
}

export function envError(name: string) {
  return new Error("Environment variable " + name + " belum diisi. Lengkapi .env.local sebelum menjalankan fitur ini.");
}
