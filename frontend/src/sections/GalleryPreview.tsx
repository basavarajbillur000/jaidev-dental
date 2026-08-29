import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/data/clinic";
import { SectionHead, Reveal } from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPreview() {
  return (
    <section className="bg-mist py-20 sm:py-28" data-testid="gallery-preview-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            chapter="08"
            eyebrow="Inside the clinic"
            title={
              <>
                A look inside
              </>
            }
            lead="Real photographs from the clinic in Govind Shetty Palya, Electronic City."
          />
          <Reveal delay={0.2}>
            <Link
              to="/gallery"
              data-testid="gallery-view-all-link"
              className="group inline-flex items-center gap-2.5 rounded-full border border-navy-950/15 px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:border-azure-600 hover:text-azure-600"
            >
              Full gallery
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <GalleryGrid items={galleryItems.filter((g) => !g.placeholder)} />
        </div>
      </div>
    </section>
  );
}
