import { Phone } from "lucide-react";
import { clinic, images } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";
import { useAppointment } from "@/components/Appointment";

const chapters = [
  {
    num: "01",
    title: "Consultation & imaging",
    desc: "Your teeth, gums and jaw are examined, and scans are taken where needed, before any decision is made.",
  },
  {
    num: "02",
    title: "A plan you understand",
    desc: "Options, steps, sittings and costs are explained in plain language — you approve the plan before treatment begins.",
  },
  {
    num: "03",
    title: "Placement & follow-up",
    desc: "The implant is placed as planned, healing is reviewed, and a custom crown completes the replacement tooth.",
  },
];

export default function ImplantsEditorial() {
  const { open } = useAppointment();
  return (
    <section className="bg-navy-950 py-20 text-white sm:py-28" data-testid="implants-editorial-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHead
            dark
            chapter="04"
            eyebrow="Featured treatment"
            title={
              <>
                Restore your smile with{" "}
                <span className="font-serif font-medium italic text-azure-500">dental implants</span>
              </>
            }
            lead="Dental implants are listed among the clinic's treatments for replacing missing teeth. If you're considering one, here's how the journey typically unfolds at the clinic."
          />
          <div className="mt-10 space-y-0">
            {chapters.map((c, i) => (
              <Reveal key={c.num} delay={i * 0.1}>
                <div className="flex gap-6 border-t border-white/10 py-6 last:border-b">
                  <span className="font-mono text-sm text-azure-500">{c.num}</span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => open("Dental Implants")}
                data-testid="implants-book-consultation-button"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors duration-300 hover:bg-azure-100"
              >
                Book a Consultation
              </button>
              <a
                href={clinic.phoneHref}
                data-testid="implants-call-button"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-4" />
                {clinic.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.editorial}
              alt="Dentist performing a precision dental procedure"
              loading="lazy"
              className="aspect-[4/4.6] w-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-navy-950/60 p-5 backdrop-blur-xl">
            <p className="font-serif text-lg italic leading-snug text-white/90">
              "A missing tooth deserves a plan, not a guess — imaging first, treatment second."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
