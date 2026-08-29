import { ArrowUpRight } from "lucide-react";
import { featuredServices } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";
import { useTreatmentModal } from "@/components/TreatmentModal";

export default function FeaturedServices() {
  const { show } = useTreatmentModal();
  return (
    <section className="bg-mist py-20 sm:py-28" data-testid="featured-services-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            chapter="02"
            eyebrow="Treatments"
            title={
              <>
                Featured <span className="font-serif font-medium italic text-azure-600">treatments</span>
              </>
            }
            lead="A selection from the clinic's publicly listed treatment profile."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.08}>
              <button
                onClick={() => show({ name: s.name, blurb: s.description, category: s.category })}
                data-testid={`featured-service-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group block w-full overflow-hidden rounded-3xl border border-softline bg-white text-left shadow-[0_10px_30px_-15px_rgba(11,25,44,0.1)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_45px_-15px_rgba(0,136,176,0.25)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-extrabold tracking-tight text-navy-950">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bodyink/80">{s.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-azure-600">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
