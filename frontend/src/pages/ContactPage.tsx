import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal, SectionHead } from "@/components/Reveal";
import { AppointmentForm } from "@/components/Appointment";
import { clinic, waLink } from "@/data/clinic";

export default function ContactPage() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Book your{" "}
            <span className="font-serif font-medium italic text-azure-500">visit</span>
          </>
        }
        lead="Request an appointment below, call the clinic, or message on WhatsApp — whichever is easiest for you."
      />

      <section className="bg-mist py-16 sm:py-20" data-testid="contact-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div className="grid content-start gap-5">
            <Reveal>
              <div className="rounded-3xl border border-softline bg-white p-7" data-testid="contact-info-card">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-navy-950">
                  {clinic.name}
                </h2>
                <address className="mt-4 space-y-4 text-sm not-italic leading-relaxed text-bodyink">
                  <p className="flex gap-3">
                    <MapPin className="mt-0.5 size-4.5 shrink-0 text-azure-600" />
                    <span>
                      {clinic.addressLines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                      <span className="mt-1.5 inline-block rounded-full bg-azure-50 px-3 py-1 text-xs font-bold text-azure-600">
                        {clinic.landmark}
                      </span>
                    </span>
                  </p>
                  <a
                    href={clinic.phoneHref}
                    data-testid="contact-phone-link"
                    className="flex items-center gap-3 font-display text-lg font-extrabold text-navy-950 transition-colors hover:text-azure-600"
                  >
                    <Phone className="size-4.5 shrink-0 text-azure-600" />
                    {clinic.phoneDisplay}
                  </a>
                </address>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={clinic.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-directions-button"
                    className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-bold text-white transition-colors duration-300 hover:bg-azure-600"
                  >
                    <Navigation className="size-3.5" />
                    Get Directions
                  </a>
                  <a
                    href={waLink(clinic.whatsappText)}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-whatsapp-button"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-950/15 px-5 py-2.5 text-xs font-bold text-navy-950 transition-colors hover:border-brand-teal hover:text-brand-teal"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-softline bg-white p-7" data-testid="contact-hours-card">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-azure-600">
                  <Clock className="size-4" /> Opening hours
                </p>
                <ul className="mt-4 divide-y divide-softline">
                  {clinic.hours.map((h, i) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between py-2.5 text-sm ${
                        i === todayIndex ? "font-bold text-navy-950" : "text-bodyink/80"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {h.day}
                        {i === todayIndex && (
                          <span className="rounded-full bg-brand-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-xs">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-3xl border border-softline">
                <iframe
                  title="Jaidev Multispeciality Dental Care on Google Maps"
                  src={clinic.mapsEmbed}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="contact-map"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-softline bg-white p-7 sm:p-9" data-testid="contact-form-card">
              <SectionHead
                chapter=""
                eyebrow="Appointment request"
                title={
                  <span className="text-2xl sm:text-3xl">Tell us when you'd like to come in</span>
                }
              />
              <div className="mt-7">
                <AppointmentForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
