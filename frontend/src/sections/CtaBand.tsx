import { Phone, MessageCircle } from "lucide-react";
import { clinic, waLink } from "@/data/clinic";
import { Reveal } from "@/components/Reveal";
import { useAppointment } from "@/components/Appointment";

export default function CtaBand() {
  const { open } = useAppointment();
  return (
    <section className="bg-navy-950 py-20 text-white sm:py-24" data-testid="cta-band-section">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-azure-500">
            Appointments open today
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Ready for a{" "}
            <span className="font-serif font-medium italic text-azure-500">healthier smile?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
            Book a visit at {clinic.area}'s multispeciality dental clinic — or simply call and
            talk to us first.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => open()}
              data-testid="cta-book-button"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-950 transition-colors duration-300 hover:bg-azure-100"
            >
              Book an Appointment
            </button>
            <a
              href={clinic.phoneHref}
              data-testid="cta-call-button"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-4" />
              {clinic.phoneDisplay}
            </a>
            <a
              href={waLink(clinic.whatsappText)}
              target="_blank"
              rel="noreferrer"
              data-testid="cta-whatsapp-button"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
