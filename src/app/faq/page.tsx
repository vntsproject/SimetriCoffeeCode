import { Metadata } from "next";
import { AccordionItem } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "Support" };

const faqs = [
  ["What are your opening hours?", "SIMETRI COFFEE ROASTERS buka 24 jam."],
  ["Do I need a reservation?", "Tidak selalu. Walk-in tersedia, tetapi reservasi disarankan untuk jam ramai, meeting, atau rombongan."],
  ["What payment methods do you accept?", "Pembayaran dapat dilakukan di outlet. Untuk reservasi, konfirmasi pembayaran diverifikasi admin."],
  ["Is there Wi-Fi available?", "Tersedia Wi-Fi untuk pengunjung."],
  ["Do you have vegetarian or vegan options?", "Beberapa menu dapat disesuaikan. Silakan tanyakan staff untuk opsi terbaru."],
  ["Can I host a private event or meeting?", "Bisa. Hubungi WhatsApp untuk diskusi kebutuhan event atau meeting."],
  ["Do you sell coffee beans to take home?", "Tersedia coffee beans tertentu, tergantung stok."],
  ["Is there parking available?", "Tersedia area parkir di sekitar lokasi."]
] as const;

export default function FaqPage() {
  return (
    <section className="min-h-screen bg-whiteCafe pt-28">
      <div className="container-premium pb-20">
        <div className="mb-10 max-w-3xl"><p className="section-kicker">Support</p><h1 className="mt-5 text-4xl font-semibold md:text-6xl">Frequently Asked Questions</h1><p className="mt-4 text-lg text-blackCafe/65">Everything you need to know about Simetri Coffee Roasters.</p></div>
        <div className="rounded-2xl border border-lineCafe bg-whiteCafe px-5 md:px-8">{faqs.map(([question, answer]) => <AccordionItem key={question} question={question} answer={answer} />)}</div>
      </div>
    </section>
  );
}
