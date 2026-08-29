import { HeartHandshake, LayoutGrid, Route, MapPin } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { clinic } from "@/data/clinic";

const cards = [
  {
    icon: HeartHandshake,
    title: "Patient-Focused Care",
    desc: "Clear, approachable dental care designed around the patient's needs — never rushed, never pushy.",
  },
  {
    icon: LayoutGrid,
    title: "Multispeciality Range",
    desc: "A broad range of dental treatments listed through the clinic's public treatment profile — 57 in all.",
  },
  {
    icon: Route,
    title: "Clear Treatment Journey",
    desc: "Understand the available treatments, the steps involved and how to reach the clinic — before you visit.",
  },
  {
    icon: MapPin,
    title: "Electronic City Location",
    desc: `Located in ${clinic.addressShort} — easy to reach from across Electronic City Phase II.`,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20 sm:py-28" data-testid="why-choose-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          chapter="05"
          eyebrow="Why Jaidev"
          title={
            <>
              Why patients choose Jaidev
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div
                className="group h-full rounded-3xl border border-softline bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-azure-600/30 hover:shadow-[0_20px_40px_-18px_rgba(0,136,176,0.2)]"
                data-testid={`why-card-${i + 1}`}
              >
                <span className="font-mono text-xs text-navy-950/35">0{i + 1}</span>
                <span className="mt-4 inline-flex size-12 items-center justify-center rounded-2xl bg-azure-50 text-azure-600 transition-colors duration-500 group-hover:bg-navy-950 group-hover:text-white">
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-navy-950">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-bodyink/85">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
