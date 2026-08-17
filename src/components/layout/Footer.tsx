import Image from "next/image";
import Link from "next/link";
import { Clock, Instagram, MapPin, MessageCircle } from "lucide-react";
import { business, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-blackCafe py-14 text-whiteCafe">
      <div className="container-premium">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1.2fr_0.8fr]">
          <div>
            <div className="mb-5 flex items-center gap-3"><span className="relative h-12 w-12 overflow-hidden rounded-full bg-whiteCafe"><Image src="/images/logo-simetri-coffee.png" alt="Logo SIMETRI COFFEE" fill className="object-contain p-1" /></span><strong>{business.shortName}</strong></div>
            <p className="max-w-sm text-sm leading-7 text-whiteCafe/65">Kopi yang rapi, ruang yang tenang, dan waktu yang terasa lebih pelan di Bekasi.</p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Quick Link</h2>
            <div className="grid gap-3 text-sm text-whiteCafe/65">{navLinks.map((link) => <Link key={link.href} href={link.href} className="hover:text-whiteCafe">{link.label}</Link>)}<Link href="/admin/login" className="hover:text-whiteCafe">Login as Admin</Link></div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Contact</h2>
            <div className="grid gap-4 text-sm leading-6 text-whiteCafe/65"><p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" />{business.address}</p><a className="flex gap-3 hover:text-whiteCafe" href={"https://wa.me/" + business.whatsapp}><MessageCircle className="mt-1 h-4 w-4 shrink-0" />WhatsApp {business.phone}</a><p className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0" />{business.hours}</p></div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Follow Us</h2>
            <a href={business.instagramUrl} target="_blank" className="inline-flex h-11 items-center gap-2 rounded-full border border-whiteCafe/20 px-5 text-sm font-semibold transition hover:bg-whiteCafe hover:text-blackCafe" rel="noreferrer"><Instagram className="h-4 w-4" />Instagram</a>
          </div>
        </div>
        <div className="mt-12 border-t border-whiteCafe/15 pt-6 text-sm text-whiteCafe/55">© Simetri Coffee and Roaster 2026</div>
      </div>
    </footer>
  );
}
