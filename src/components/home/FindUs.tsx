import { ExternalLink, MapPin } from "lucide-react";
import { business } from "@/lib/constants";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FindUs() {
  return (
    <section className="section-padding bg-whiteCafe pt-0">
      <div className="container-premium grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-stretch">
        <Reveal><p className="section-kicker">Find Us</p><h2 className="mt-4 text-4xl font-semibold md:text-6xl">Temukan kami di Bekasi.</h2><p className="mt-6 leading-7 text-blackCafe/65">{business.address}</p><div className="mt-7"><LinkButton href={business.mapsUrl}>Open in Google Maps <ExternalLink className="h-4 w-4" /></LinkButton></div></Reveal>
        <Reveal delay={0.1}><a href={business.mapsUrl} target="_blank" rel="noreferrer" className="group grid min-h-[360px] place-items-center rounded-2xl border border-lineCafe bg-warmCafe p-8 text-center transition hover:-translate-y-1 hover:shadow-soft"><div><MapPin className="mx-auto mb-5 h-10 w-10" /><p className="text-2xl font-semibold">Simetri Coffee Roasters Bekasi</p><p className="mt-3 text-blackCafe/60">Klik untuk membuka arah di Google Maps.</p></div></a></Reveal>
      </div>
    </section>
  );
}
