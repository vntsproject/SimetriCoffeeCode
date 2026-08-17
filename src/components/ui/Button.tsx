import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "hero";
const variants: Record<Variant, string> = {
  primary: "bg-blackCafe text-whiteCafe border-blackCafe hover:bg-whiteCafe hover:text-blackCafe",
  secondary: "bg-whiteCafe text-blackCafe border-lineCafe hover:border-blackCafe",
  ghost: "bg-transparent text-blackCafe border-transparent hover:bg-blackCafe/5",
  hero: "bg-whiteCafe text-blackCafe border-whiteCafe hover:bg-transparent hover:text-whiteCafe"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode };
export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return <button className={cn("inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-300 ease-premium hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} {...props}>{children}</button>;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant; children: ReactNode };
export function LinkButton({ className, variant = "primary", href, children, ...props }: LinkButtonProps) {
  return <Link href={href} className={cn("inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-300 ease-premium hover:-translate-y-0.5", variants[variant], className)} {...props}>{children}</Link>;
}
