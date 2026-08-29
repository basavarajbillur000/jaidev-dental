import { Star, ArrowUpRight, Quote } from "lucide-react";
import { clinic } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";

export default function ReviewsSection() {
  return (
    <section className="bg-white py-20 sm:py-28" data-testid="reviews-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          align="center"
          chapter="07"
          eyebrow="Social proof"
          title={
            <>
              What our <span className="font-serif font-medium italic text-azure-600">patients say</span>
            </>
          }
        />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-softline bg-mist p-8 text-center sm:p-12">
            <p className="font-display text-7xl font-extrabold tracking-tight text-navy-950 sm:text-8xl" data-testid="reviews-rating-value">
              {clinic.rating}
              <span className="text-2xl font-bold text-navy-950/40"> / 5</span>
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-navy-950/60">
              {clinic.reviewCount} reviews on Google
            </p>
            <a
              href={clinic.mapsLink}
              target="_blank"
              rel="noreferrer"
              data-testid="reviews-view-google-button"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
            >
              View Google Reviews
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <div
                className="flex h-full flex-col items-start gap-4 rounded-3xl border border-dashed border-navy-950/20 bg-white p-7"
                data-testid={`review-placeholder-${i + 1}`}
              >
                <Quote className="size-6 text-azure-600/50" />
                <p className="text-sm leading-relaxed text-navy-950/55">
                  Patient review excerpts are never edited or invented. Verified Google review
                  text will appear here once supplied by the clinic.
                </p>
                <span className="mt-auto rounded-full bg-mist px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-navy-950/45">
                  Review placeholder
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
