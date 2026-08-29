import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { categories, treatmentsByCategory } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";
import CategoryIcon from "@/components/CategoryIcon";
import { useTreatmentModal } from "@/components/TreatmentModal";

export default function ServiceExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { show } = useTreatmentModal();

  return (
    <section className="bg-white py-20 sm:py-28" data-testid="service-explorer-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          chapter="03"
          eyebrow="57 listed treatments"
          title={
            <>
              Every treatment, organised
            </>
          }
          lead="The clinic's Practo profile lists 57 treatments and surgeries. Explore them here, grouped into clear categories — tap any treatment for a quick overview."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const list = treatmentsByCategory(c.id);
            const isOpen = expanded === c.id;
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.07}>
                <div
                  className={`h-full rounded-3xl border bg-white p-6 transition-all duration-500 ${
                    isOpen
                      ? "border-azure-600/40 shadow-[0_25px_50px_-20px_rgba(0,136,176,0.25)]"
                      : "border-softline hover:border-azure-600/30 hover:shadow-[0_18px_40px_-18px_rgba(11,25,44,0.15)]"
                  }`}
                  data-testid={`service-category-${c.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-azure-50 text-azure-600">
                      <CategoryIcon name={c.icon} className="size-5" />
                    </span>
                    <span className="rounded-full bg-mist px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-navy-950/60">
                      {list.length} treatments
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-navy-950">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bodyink/80">{c.description}</p>

                  <button
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                    data-testid={`service-category-explore-${c.id}`}
                    aria-expanded={isOpen}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-azure-600 transition-colors hover:text-navy-950"
                  >
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                      <Plus className="size-4" />
                    </motion.span>
                    {isOpen ? "Close" : "Explore"}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex flex-wrap gap-2 border-t border-softline pt-4">
                          {list.map((t) => (
                            <button
                              key={t.name}
                              onClick={() => show(t)}
                              data-testid={`treatment-chip-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              className="rounded-full border border-softline bg-mist px-3.5 py-1.5 text-xs font-semibold text-navy-950/80 transition-colors hover:border-azure-600 hover:bg-azure-50 hover:text-azure-600"
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Link
            to="/services"
            data-testid="explorer-view-all-link"
            className="group inline-flex items-center gap-2.5 rounded-full border border-navy-950/15 px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:border-azure-600 hover:text-azure-600"
          >
            Search all 57 treatments
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
