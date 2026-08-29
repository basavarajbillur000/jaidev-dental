import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems } from "@/data/clinic";
import CtaBand from "@/sections/CtaBand";

const filters = ["All", "Clinic", "Interior", "Treatment", "Doctors", "Team"] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Inside the clinic
          </>
        }
        lead="Real photographs from Jaidev Multispeciality Dental Care, Electronic City. Items marked as placeholders will be swapped for clinic photography."
      />

      <section className="bg-mist py-16 sm:py-20" data-testid="gallery-page-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2" aria-label="Filter gallery">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-testid={`gallery-filter-${f.toLowerCase()}`}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    filter === f
                      ? "bg-navy-950 text-white"
                      : "border border-softline bg-white text-navy-950/65 hover:border-azure-600 hover:text-azure-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="mt-10">
            {visible.length > 0 ? (
              <GalleryGrid items={visible} />
            ) : (
              <div className="rounded-3xl border border-dashed border-navy-950/20 bg-white p-12 text-center" data-testid="gallery-empty-state">
                <p className="text-sm font-semibold text-navy-950/60">
                  Photos for this category are being added by the clinic.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
