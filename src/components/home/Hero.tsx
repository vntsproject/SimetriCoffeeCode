"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { business } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-blackCafe text-whiteCafe">
      <Image src="/images/background-main-page.png" alt="Suasana SIMETRI COFFEE ROASTERS" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-blackCafe/55 via-blackCafe/35 to-blackCafe/60" />
      <div className="container-premium relative flex min-h-[92vh] items-end pb-16 pt-32 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-whiteCafe/25 bg-whiteCafe/10 px-4 py-2 text-sm font-semibold backdrop-blur"><Star className="h-4 w-4 fill-whiteCafe" />{business.rating} · {business.reviews} · Bekasi</p>
          <h1 className="text-balance text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">SIMETRI COFFEE ROASTERS</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-whiteCafe/78 md:text-xl">Tempat singgah untuk kopi, percakapan, pekerjaan, dan momen yang berjalan pelan.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><LinkButton href="/order" variant="hero">Pesan Sekarang</LinkButton><LinkButton href="/reservation" variant="secondary" className="border-whiteCafe/40 bg-transparent text-whiteCafe hover:bg-whiteCafe hover:text-blackCafe">Reservasi Meja</LinkButton></div>
        </motion.div>
      </div>
    </section>
  );
}
