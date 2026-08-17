import { Reveal } from "@/components/ui/Reveal";

const gallery = Array.from({ length: 6 }, (_, i) => "/images/gallery/gallery-" + (i + 1) + ".jpg");

export function Gallery() {
  return (
    <section className="section-padding bg-whiteCafe">
      <div className="container-premium">
        <Reveal className="mb-10 text-center"><p className="section-kicker">Our Gallery</p><h2 className="mt-4 text-4xl font-semibold md:text-6xl">Visual Journey</h2></Reveal>
        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {gallery.map((src, index) => (
            <Reveal key={src} delay={index * 0.04} className={index === 0 || index === 3 ? "md:row-span-2" : ""}>
              <div className="flex h-full min-h-[220px] items-end rounded-2xl border border-lineCafe bg-gradient-to-br from-whiteCafe via-warmCafe to-blackCafe/10 p-5 text-sm font-semibold text-blackCafe/55">
                {/* Replace with real image later: {src} */}
                Gallery image coming soon
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
