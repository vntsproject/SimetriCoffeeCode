import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-11 w-full rounded-xl border border-lineCafe bg-whiteCafe px-4 text-sm outline-none transition focus:border-blackCafe", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-24 w-full rounded-xl border border-lineCafe bg-whiteCafe px-4 py-3 text-sm outline-none transition focus:border-blackCafe", className)} {...props} />;
}
