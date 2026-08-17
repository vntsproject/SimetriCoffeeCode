import { valueCards } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Values() {
  return (
    <section className="section-padding bg-warmCafe">
      <div className="container-premium">
        <Reveal className="mb-10 max-w-2xl"><p className="section-kicker">Our Values</p><h2 className="mt-4 text-4xl font-semibold md:text-6xl">What We Stand For</h2></Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {valueCards.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.title} delay={index * 0.04}><Card className="h-full p-6 hover:-translate-y-1 hover:shadow-soft"><Icon className="mb-8 h-6 w-6" /><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-7 text-blackCafe/62">{item.description}</p></Card></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
