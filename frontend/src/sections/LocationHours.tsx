import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import { clinic } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";

export default function LocationHours() {
  const today = new Date().getDay(); // 0 = Sunday
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section className="bg-white py-20 sm:py-28" data-testid="location-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          chapter="09"
          eyebrow="Find us"
          title={
            <>
              Visit Jaidev{" "}
              <span className="font-serif font-medium italic text-azure-600">Multispeciality</span>{" "}
              Dental Care
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            <Reveal>
              <div className="rounded-3xl border border-softline bg-mist p-7" data-testid="location-address-card">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-azure-600">
                  <MapPin className="size-4" /> Address
                </p>
                <address className="mt-4 text-base font-semibold not-italic leading-relaxed text-navy-950">
                  {clinic.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <p className="mt-3 inline-block rounded-full bg-azure-50 px-3.5 py-1.5 text-xs font-bold text-azure-600">
                  Landmark: {clinic.landmark}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={clinic.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="location-directions-button"
                    className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
                  >
                    <Navigation className="size-4" />
                    Get Directions
                  </a>
                  <a
                    href={clinic.phoneHref}
                    data-testid="location-call-button"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-950/15 bg-white px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:border-azure-600 hover:text-azure-600"
                  >
                    <Phone className="size-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-softline bg-white p-7" data-testid="opening-hours-card">
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
          </div>

          <Reveal delay={0.15} className="min-h-[24rem]">
            <div className="h-full overflow-hidden rounded-3xl border border-softline shadow-[0_20px_45px_-20px_rgba(11,25,44,0.2)]">
              <iframe
                title="Jaidev Multispeciality Dental Care on Google Maps"
                src={clinic.mapsEmbed}
                className="h-full min-h-[24rem] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                data-testid="location-map"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
