import { useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { categories, treatments } from "@/data/clinic";
import { useTreatmentModal } from "@/components/TreatmentModal";
import CtaBand from "@/sections/CtaBand";

const filters = [{ id: "all", short: "All" }, ...categories];

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { show } = useTreatmentModal();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter(
      (t) =>
        (filter === "all" || t.category === filter) &&
        (!q || t.name.toLowerCase().includes(q))
    );
  }, [query, filter]);

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.short ?? id;

  return (
    <>
      <PageHero
        eyebrow="Treatments & surgeries"
        title={
          <>
            All 57 listed treatments
          </>
        }
        lead="Every treatment and surgery on the clinic's public Practo profile — searchable and grouped by category. Tap any card for an overview."
      />

      <section className="bg-mist py-16 sm:py-20" data-testid="services-catalog">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative">
              <Search className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-navy-950/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a dental treatment…"
                aria-label="Search treatments"
                data-testid="services-search-input"
                className="w-full rounded-full border border-softline bg-white py-4 pl-12 pr-5 text-sm font-semibold text-navy-950 outline-none transition-colors placeholder:text-navy-950/35 focus:border-azure-600"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  data-testid={`services-filter-${f.id}`}
                  aria-pressed={filter === f.id}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    filter === f.id
                      ? "bg-navy-950 text-white"
                      : "border border-softline bg-white text-navy-950/65 hover:border-azure-600 hover:text-azure-600"
                  }`}
                >
                  {f.short}
                </button>
              ))}
            </div>
          </Reveal>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-navy-950/50" data-testid="services-result-count">
            Showing {visible.length} of {treatments.length} treatments
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.05} y={16}>
                <button
                  onClick={() => show(t)}
                  data-testid={`service-card-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group flex h-full w-full flex-col rounded-3xl border border-softline bg-white p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-azure-600/30 hover:shadow-[0_20px_40px_-18px_rgba(0,136,176,0.2)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-azure-600">
                    {categoryName(t.category)}
                  </span>
                  <h2 className="mt-2.5 font-display text-lg font-extrabold tracking-tight text-navy-950">
                    {t.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-bodyink/80">{t.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-wider text-navy-950/50 transition-colors group-hover:text-azure-600">
                    Details
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-navy-950/20 bg-white p-12 text-center" data-testid="services-empty-state">
              <p className="font-display text-xl font-extrabold text-navy-950">No matches for “{query}”</p>
              <p className="mt-2 text-sm text-bodyink">
                Try another term, or call the clinic — the team will point you to the right treatment.
              </p>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
