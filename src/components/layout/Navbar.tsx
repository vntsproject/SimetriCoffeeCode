"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const darkHero = pathname === "/";

  useEffect(() => {
    const update = () => setIsTop(window.scrollY < 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const transparent = darkHero && isTop;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium", transparent ? "bg-transparent text-whiteCafe" : "border-b border-lineCafe bg-whiteCafe/95 text-blackCafe shadow-[0_8px_30px_rgba(14,14,14,0.04)] backdrop-blur-xl")}>
      <nav className="container-premium flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SIMETRI COFFEE ROASTERS home">
          <span className={cn("relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border", transparent ? "border-whiteCafe/50 bg-whiteCafe" : "border-lineCafe bg-whiteCafe")}>
            <Image src="/images/logo-simetri-coffee.png" alt="Logo SIMETRI COFFEE" fill className="object-contain p-1" priority />
          </span>
          <span className="hidden text-sm font-bold tracking-[0.12em] sm:block">SIMETRI</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={cn("text-sm font-semibold transition opacity-80 hover:opacity-100", pathname === link.href && "opacity-100")}>{link.label}</Link>)}
        </div>
        <div className="hidden md:block">
          <Link href="/admin/login" className={cn("inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold transition-all duration-500", transparent ? "border-whiteCafe/70 bg-transparent text-whiteCafe hover:bg-whiteCafe hover:text-blackCafe" : "border-blackCafe bg-blackCafe text-whiteCafe hover:bg-whiteCafe hover:text-blackCafe")}>Login as Admin</Link>
        </div>
        <button aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full border border-current/20 md:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-whiteCafe text-blackCafe md:hidden">
            <div className="container-premium flex h-20 items-center justify-between">
              <span className="text-sm font-bold tracking-[0.12em]">SIMETRI</span>
              <button aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-lineCafe" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="container-premium grid gap-4 pt-10">
              {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-lineCafe py-5 text-3xl font-semibold">{link.label}</Link>)}
              <Link href="/admin/login" onClick={() => setOpen(false)} className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-blackCafe px-6 text-sm font-semibold text-whiteCafe">Login as Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
