import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-lineCafe bg-whiteCafe shadow-[0_12px_40px_rgba(14,14,14,0.04)] transition-all duration-300 ease-premium", className)} {...props} />;
}
