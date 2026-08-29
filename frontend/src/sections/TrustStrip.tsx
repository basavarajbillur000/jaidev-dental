import { clinic } from "@/data/clinic";
import { Reveal } from "@/components/Reveal";

const stats = [
  { value: `${clinic.rating}/5`, label: "Google Rating", sub: "Rated by patients on Google" },
  { value: `${clinic.reviewCount}+`, label: "Patient Reviews", sub: "Verified Google reviews" },
  { value: "57", label: "Listed Treatments", sub: "On the clinic's Practo profile" },
  { value: clinic.area, label: "Location", sub: `${clinic.city}, Karnataka` },
];

export default function TrustStrip() {
  return (
    <section className="bg-white" data-testid="trust-strip">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-14 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="px-2 py-4 text-center sm:px-6">
            <p className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-azure-600">
              {s.label}
            </p>
            <p className="mt-1.5 text-xs text-navy-950/50">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
