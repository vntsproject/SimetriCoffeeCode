import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const highlights = ["Coffee", "Space", "Comfort", "Community"];

export function About() {
  return (
    <section className="section-padding bg-whiteCafe">
      <div className="container-premium grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <Reveal><p className="section-kicker">About Us</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Kopi yang rapi, ruang yang tenang.</h2></Reveal>
        <Reveal delay={0.1} className="grid gap-7">
          <p className="text-lg leading-8 text-blackCafe/68">SIMETRI COFFEE ROASTERS adalah coffee shop premium di Bekasi untuk kamu yang ingin menikmati kopi berkualitas, bekerja dengan nyaman, meeting kecil, atau sekadar duduk santai di suasana pinggir danau.</p>
          <p className="leading-7 text-blackCafe/62">Kami menjaga pengalaman tetap sederhana: ambience nyaman, harga reasonable, pilihan dine-in, takeaway, no-contact delivery, outdoor seating, prayer room, dan service yang terasa hangat tanpa berlebihan.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{highlights.map((item) => <Card key={item} className="p-5 text-center text-sm font-semibold hover:-translate-y-1">{item}</Card>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
